<template>
  <transition name="fade">
    <div v-if="mobileOpen" class="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden" @click="$emit('close-mobile')"></div>
  </transition>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 flex h-screen w-full max-w-[19rem] flex-col space-y-5 border-r border-white/10 bg-slate-950/80 px-4 py-6 backdrop-blur-2xl transition-all duration-300 ease-out',
      mobileOpen ? 'translate-x-0 shadow-[0_40px_80px_-30px_rgba(30,64,175,0.75)]' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <div class="space-y-6 overflow-y-auto pr-1">
      <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/60 via-primary/30 to-sky-500/40 p-5 text-white shadow-[0_30px_70px_-20px_rgba(37,99,235,0.6)]">
        <div class="pointer-events-none absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/25 blur-3xl"></div>
        <p class="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">AMK Portal</p>
        <h1 class="mt-2 text-lg font-semibold leading-tight">Command Center</h1>
        <p class="mt-3 text-xs text-white/80">
          Kelola SDM, pantau aktivitas, dan jalankan proses HR secara terpadu.
        </p>
        <div class="mt-4 flex items-center gap-2 text-[0.7rem] text-white/80">
          <span class="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            Aktif
          </span>
          <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            Modul terbaru
          </span>
        </div>
      </div>

      <nav class="space-y-4 text-sm text-slate-200">
        <div class="px-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">Navigasi</div>
        <div v-for="item in menuItems" :key="item.id" class="space-y-1">
          <RouterLink
            v-if="!item.children"
            :to="item.to"
            class="group relative flex items-center gap-3 rounded-3xl border border-transparent bg-white/5 px-4 py-3 transition hover:border-primary/60 hover:bg-primary/10"
            :class="[
              isRouteActive(item.to, item.exact)
                ? 'border-primary/70 bg-primary/20 text-white shadow-[0_20px_40px_-20px_rgba(59,130,246,0.8)]'
                : 'text-slate-300'
            ]"
          >
            <span
              class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary group-[.border-primary\/70]:bg-white/20 group-[.border-primary\/70]:text-white"
            >
              <SidebarIcon :name="item.icon" />
            </span>
            <div class="flex-1">
              <p class="font-semibold">{{ item.label }}</p>
              <p class="text-[0.65rem] text-slate-400 group-[.border-primary/70]:text-white/80">Akses modul utama</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500 group-[.border-primary/70]:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
            </svg>
          </RouterLink>
          <div v-else class="rounded-3xl border border-white/5 bg-white/5 p-2">
            <button
              type="button"
              class="flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left font-semibold text-slate-200 transition hover:text-white"
              :class="[
                isParentActive(item)
                  ? 'bg-primary/20 text-white'
                  : ''
              ]"
              @click="handleParentClick(item)"
            >
              <span class="flex flex-1 items-center gap-3">
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary group-[.bg-primary/20]:bg-white/20 group-[.bg-primary/20]:text-white">
                  <SidebarIcon :name="item.icon" />
                </span>
                <span>{{ item.label }}</span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
                :class="isExpanded(item.id) ? 'rotate-180' : ''"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <transition name="accordion">
              <div
                v-if="isExpanded(item.id)"
                class="mt-2 space-y-1 rounded-2xl bg-slate-900/80 p-2"
              >
                <RouterLink
                  v-for="child in item.children"
                  :key="child.id"
                  :to="child.to"
                  class="group flex items-center justify-between gap-2 rounded-2xl px-3 py-2 text-sm transition hover:bg-primary/10 hover:text-white"
                  :class="[
                    isRouteActive(child.to, child.exact)
                      ? 'bg-primary/25 text-white shadow-[0_16px_30px_-18px_rgba(59,130,246,0.75)]'
                      : 'text-slate-300'
                  ]"
                >
                  <span class="flex items-center gap-3">
                    <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary group-[.bg-primary\/25]:bg-white/20 group-[.bg-primary\/25]:text-white">
                      <SidebarIcon :name="child.icon" />
                    </span>
                    <span>{{ child.label }}</span>
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
                  </svg>
                </RouterLink>
              </div>
            </transition>
          </div>
        </div>
      </nav>
    </div>

    <div class="space-y-4 rounded-3xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200 shadow-inner">
      <div class="flex items-center gap-3">
        <div class="gradient-ring flex h-12 w-12 items-center justify-center bg-primary/30 text-base font-semibold uppercase text-white">
          {{ inisialUser }}
        </div>
        <div>
          <p class="font-semibold">{{ user?.nama ?? 'Admin AMK PORTAL' }}</p>
          <p class="text-xs text-slate-400">{{ user?.email ?? 'admin@gmail.com' }}</p>
        </div>
      </div>
      <button
        type="button"
        class="shimmer flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-gradient-to-r from-rose-500/30 via-rose-400/25 to-amber-400/30 px-4 py-2 text-sm font-semibold text-white transition hover:from-rose-500/50 hover:via-rose-400/40 hover:to-amber-400/40"
        @click="handleLogoutClick"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        Keluar
      </button>
      <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-[0.7rem] leading-relaxed text-slate-400">
        <p class="font-semibold text-slate-200">Butuh bantuan?</p>
        <p class="mt-1 text-slate-400">Hubungi tim HC melalui portal internal atau email support@amk.co.id</p>
      </div>
    </div>

    <ConfirmDialog
      v-model="showLogoutConfirm"
      title="Keluar dari AMK PORTAL"
      message="Apakah Anda yakin ingin keluar dari AMK PORTAL?"
      :loading="logoutLoading"
      @confirm="confirmLogout"
    />
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import ConfirmDialog from './ConfirmDialog.vue';
import type { UserRole } from '../types';
import SidebarIcon from './icons/SidebarIcon.vue';

interface MenuChild {
  id: string;
  label: string;
  to: string;
  icon: IconName;
  exact?: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  to?: string;
  icon: IconName;
  children?: MenuChild[];
  exact?: boolean;
}

type IconName =
  | 'dashboard'
  | 'pegawai'
  | 'list'
  | 'leave'
  | 'health'
  | 'contract'
  | 'profile'
  | 'salary'
  | 'finance'
  | 'site';

const props = defineProps<{
  mobileOpen: boolean;
}>();

defineEmits(['close-mobile']);

const route = useRoute();
const router = useRouter();

const mobileOpen = computed(() => props.mobileOpen);
const showLogoutConfirm = ref(false);
const logoutLoading = ref(false);

const menuByRole: Record<UserRole, MenuItem[]> = {
  admin_hcgs: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'dashboard',
      exact: true
    },
    {
      id: 'pegawai',
      label: 'Kepegawaian',
      to: '/pegawai',
      icon: 'pegawai',
      children: [
        {
          id: 'pegawai-data',
          label: 'Data Pegawai',
          to: '/pegawai',
          icon: 'list',
          exact: true
        },
        {
          id: 'pegawai-cuti',
          label: 'Pengajuan Cuti',
          to: '/pegawai/pengajuan-cuti',
          icon: 'leave'
        },
        {
          id: 'pegawai-mcu',
          label: 'Pengajuan MCU',
          to: '/pegawai/pengajuan-mcu',
          icon: 'health'
        },
        {
          id: 'pegawai-kontrak',
          label: 'Buat Kontrak',
          to: '/pegawai/buat-kontrak',
          icon: 'contract'
        }
      ]
    }
  ],
  pegawai: [
    {
      id: 'pegawai-dashboard',
      label: 'Dashboard Pegawai',
      to: '/pegawai-saya/dashboard',
      icon: 'dashboard',
      exact: true
    },
    {
      id: 'pegawai-services',
      label: 'Kepegawaian Saya',
      to: '/pegawai-saya/biodata',
      icon: 'pegawai',
      children: [
        {
          id: 'pegawai-biodata',
          label: 'Biodata',
          to: '/pegawai-saya/biodata',
          icon: 'profile',
          exact: true
        },
        {
          id: 'pegawai-slip',
          label: 'Slip Gaji',
          to: '/pegawai-saya/slip-gaji',
          icon: 'salary'
        }
      ]
    },
    {
      id: 'pegawai-requests',
      label: 'Pengajuan',
      to: '/pegawai-saya/ajukan-cuti',
      icon: 'list',
      children: [
        {
          id: 'pegawai-apply-leave',
          label: 'Ajukan Cuti',
          to: '/pegawai-saya/ajukan-cuti',
          icon: 'leave'
        },
        {
          id: 'pegawai-apply-mcu',
          label: 'Ajukan MCU',
          to: '/pegawai-saya/ajukan-mcu',
          icon: 'health'
        }
      ]
    }
  ],
  admin_finance: [
    {
      id: 'finance-dashboard',
      label: 'Dashboard Finance',
      to: '/finance',
      icon: 'finance',
      exact: true
    }
  ],
  officer_site: [
    {
      id: 'officer-site-dashboard',
      label: 'Officer Site',
      to: '/officer-site',
      icon: 'site',
      exact: true
    }
  ],
  superadmin: [
    {
      id: 'superadmin-accounts',
      label: 'Kelola Role Pegawai',
      to: '/superadmin/akun',
      icon: 'pegawai',
      exact: true
    }
  ]
};

const auth = useAuthStore();

const menuItems = computed<MenuItem[]>(() => {
  const role = auth.state.user?.role;
  if (!role) return [];
  return menuByRole[role] ?? [];
});

const expandedKeys = ref<string[]>([]);

const isExpanded = (id: string) => expandedKeys.value.includes(id);

const ensureExpanded = (id: string) => {
  if (!isExpanded(id)) {
    expandedKeys.value.push(id);
  }
};

const collapseExpanded = (id: string) => {
  expandedKeys.value = expandedKeys.value.filter((key) => key !== id);
};

const toggleExpanded = (id: string) => {
  if (isExpanded(id)) {
    collapseExpanded(id);
  } else {
    ensureExpanded(id);
  }
};

const isRouteActive = (to?: string, exact = false) => {
  if (!to) return false;
  if (route.path === to) return true;
  if (exact) return false;
  if (route.path.startsWith(`${to}/`)) return true;
  if (route.path.startsWith(`${to}?`)) return true;
  return false;
};

const isParentActive = (item: MenuItem) => {
  const directActive = isRouteActive(item.to, item.exact);
  const childActive = item.children?.some((child) => isRouteActive(child.to, child.exact)) ?? false;
  return directActive || childActive;
};

const handleParentClick = (item: MenuItem) => {
  toggleExpanded(item.id);
};

watch(
  () => route.path,
  (path) => {
    menuItems.value.forEach((item) => {
      if (!item.children) return;
      const parentPath = item.to;
      const shouldExpand =
        (parentPath ? path.startsWith(parentPath) : false) ||
        item.children.some((child) => child.to && path.startsWith(child.to));
      if (shouldExpand) {
        ensureExpanded(item.id);
      }
    });
  },
  { immediate: true }
);

watch(
  () => menuItems.value,
  () => {
    expandedKeys.value = [];
    const activeParent = menuItems.value.find((item) => isParentActive(item));
    if (activeParent && activeParent.children) {
      ensureExpanded(activeParent.id);
    }
  },
  { immediate: true }
);

const user = computed(() => auth.state.user);

const inisialUser = computed(() => {
  if (!user.value) return 'AD';
  return user.value.nama
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
});

const handleLogoutClick = () => {
  showLogoutConfirm.value = true;
};

const confirmLogout = async () => {
  logoutLoading.value = true;
  try {
    await auth.logout();
    showLogoutConfirm.value = false;
    router.replace({ name: 'login' });
  } finally {
    logoutLoading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
