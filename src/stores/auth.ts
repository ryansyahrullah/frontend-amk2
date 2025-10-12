import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import { isAxiosError } from 'axios';
import http from '../api/http';
import type { AuthResponse, LoginPayload, User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const storageKeyToken = 'amk_token';
const storageKeyUser = 'amk_user';

const roleHomeRoute: Record<UserRole, string> = {
  admin_hcgs: '/dashboard',
  pegawai: '/pegawai-saya/dashboard',
  admin_finance: '/finance',
  officer_site: '/officer-site',
  superadmin: '/superadmin/akun'
};

export const useAuthStore = defineStore('auth', () => {
  const state = reactive<AuthState>({
    user: null,
    token: null,
    loading: false,
    error: null
  });

  const storedToken = localStorage.getItem(storageKeyToken);
  const storedUser = localStorage.getItem(storageKeyUser);

  if (storedToken) {
    state.token = storedToken;
  }
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser) as User;
      state.user = {
        ...parsed,
        roles: parsed.roles ?? (parsed.role ? [parsed.role] : undefined)
      };
    } catch (error: unknown) {
      console.error('Gagal mengurai data pengguna dari localStorage', error);
      localStorage.removeItem(storageKeyUser);
    }
  }

  const isAuthenticated = computed(() => Boolean(state.token));

  const availableRoles = computed<UserRole[]>(() => {
    if (!state.user) return [];
    const unique = new Set<UserRole>();
    const userRoles = state.user.roles ?? [];
    userRoles.forEach((role) => unique.add(role));
    if (state.user.role) {
      unique.add(state.user.role);
    }
    return Array.from(unique);
  });

  const defaultRoute = computed(() => {
    const role = state.user?.role;
    if (!role) {
      return '/login';
    }
    return roleHomeRoute[role] ?? '/dashboard';
  });

  const hasRole = (roles?: UserRole[]) => {
    if (!roles || roles.length === 0) return true;
    const role = state.user?.role;
    return role ? roles.includes(role) : false;
  };

  const getDefaultRoute = () => defaultRoute.value;

  const login = async (payload: LoginPayload) => {
    state.loading = true;
    state.error = null;

    try {
      const credentials = {
        ...payload,
        nrp: payload.nrp.trim().toLowerCase()
      };
      const { data } = await http.post<AuthResponse>('/api/login', credentials);
      const userWithRoles: User = {
        ...data.user,
        roles: data.user.roles ?? [data.user.role]
      };
      state.user = userWithRoles;
      state.token = data.token;
      localStorage.setItem(storageKeyToken, data.token);
      localStorage.setItem(storageKeyUser, JSON.stringify(userWithRoles));
      return data;
    } catch (error: unknown) {
      let message = 'Terjadi kesalahan saat masuk.';
      if (isAxiosError(error)) {
        const serverMessage = (error.response?.data as { message?: string } | undefined)?.message;
        if (typeof serverMessage === 'string' && serverMessage.trim().length > 0) {
          message = serverMessage;
        }
      }
      state.error = message;
      throw new Error(message);
    } finally {
      state.loading = false;
    }
  };

  const logout = async () => {
    try {
      await http.post('/api/logout');
    } catch (error: unknown) {
      console.warn('Gagal melakukan logout ke server', error);
    } finally {
      localStorage.removeItem(storageKeyToken);
      localStorage.removeItem(storageKeyUser);
      state.user = null;
      state.token = null;
    }
  };

  const switchRole = async (role: UserRole) => {
    if (!state.user) {
      throw new Error('Pengguna belum masuk.');
    }

    const roles = availableRoles.value;
    if (!roles.includes(role)) {
      throw new Error('Role tidak tersedia untuk akun ini.');
    }

    if (state.user.role === role) {
      return;
    }

    try {
      const { data } = await http.post<{ user: User }>('/api/auth/switch-role', { role });
      const updatedUser: User = {
        ...state.user,
        ...data.user,
        roles: data.user.roles ?? roles
      };
      state.user = updatedUser;
      localStorage.setItem(storageKeyUser, JSON.stringify(updatedUser));
    } catch (error: unknown) {
      let message = 'Gagal mengganti akun.';
      if (isAxiosError(error)) {
        const serverMessage = (error.response?.data as { message?: string } | undefined)?.message;
        if (typeof serverMessage === 'string' && serverMessage.trim().length > 0) {
          message = serverMessage;
        }
      }
      throw new Error(message);
    }
  };

  const verifyPassword = async (password: string) => {
    if (!password || password.trim().length === 0) {
      throw new Error('Kata sandi wajib diisi.');
    }

    try {
      await http.post<{ valid: boolean }>('/api/auth/verify-password', {
        password: password.trim()
      });
      return true;
    } catch (error: unknown) {
      let message = 'Kata sandi tidak sesuai.';
      if (isAxiosError(error)) {
        const serverMessage = (error.response?.data as { message?: string } | undefined)?.message;
        if (typeof serverMessage === 'string' && serverMessage.trim().length > 0) {
          message = serverMessage;
        }
      }
      throw new Error(message);
    }
  };

  return {
    state,
    isAuthenticated,
    availableRoles,
    defaultRoute,
    hasRole,
    login,
    logout,
    switchRole,
    getDefaultRoute,
    verifyPassword
  };
});
