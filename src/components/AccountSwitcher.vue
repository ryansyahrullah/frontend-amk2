<template>
  <div v-if="canSwitch" ref="containerRef" class="relative">
    <Button
      variant="ghost"
      size="sm"
      class="hidden h-10 items-center rounded-full bg-gradient-to-r from-primary to-info px-5 text-sm font-semibold !text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:brightness-105 hover:shadow-xl hover:shadow-primary/30 hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary/70 dark:from-primary/80 dark:to-info/70 dark:shadow-primary/30 dark:hover:brightness-110 dark:hover:shadow-primary/40 dark:focus-visible:ring-offset-slate-900 lg:inline-flex"
      @click.stop="toggleMenu"
      :aria-expanded="menuOpen"
    >
      <span class="whitespace-nowrap">Ganti Akun</span>
    </Button>
    <Button
      variant="ghost"
      size="sm"
      class="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-primary to-info px-5 text-sm font-semibold !text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:brightness-105 hover:shadow-xl hover:shadow-primary/30 hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary/70 dark:from-primary/80 dark:to-info/70 dark:shadow-primary/30 dark:hover:brightness-110 dark:hover:shadow-primary/40 dark:focus-visible:ring-offset-slate-900 lg:hidden"
      @click.stop="toggleMenu"
      aria-label="Ganti akun"
      :aria-expanded="menuOpen"
    >
      <span class="whitespace-nowrap">Ganti Akun</span>
    </Button>
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="menuOpen"
        class="absolute right-0 top-12 w-64 rounded-2xl border border-slate-200/80 bg-white/95 p-3 text-slate-700 shadow-2xl backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/95 dark:text-slate-200"
      >
        <p class="px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Pilih akun
        </p>
        <ul class="mt-2 space-y-1">
          <li v-for="role in roles" :key="role">
            <button
              type="button"
              class="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              :class="roleButtonClass(role)"
              @click="handleSelect(role)"
            >
              <div class="flex items-center justify-between gap-3">
                <span>{{ roleLabel(role) }}</span>
                <span
                  v-if="role === activeRole"
                  class="text-[10px] font-bold uppercase tracking-wider text-primary"
                >
                  Aktif
                </span>
              </div>
              <p v-if="roleDescription(role)" class="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">
                {{ roleDescription(role) }}
              </p>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from './Button.vue';
import { useAuthStore } from '../stores/auth';
import type { UserRole } from '../types';
import { roleDescriptionMap, roleLabelMap } from '../constants/roles';
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
const router = useRouter();
const { availableRoles } = storeToRefs(auth);

const roles = availableRoles;
const activeRole = computed(() => auth.state.user?.role ?? null);
const activeRoleLabel = computed(() => {
  if (!activeRole.value) {
    return 'Pilih Akun';
  }
  return roleLabel(activeRole.value);
});
const canSwitch = computed(() => roles.value.length > 1);

const menuOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const roleLabel = (role: UserRole) => roleLabelMap[role] ?? role;
const roleDescription = (role: UserRole) => roleDescriptionMap[role];

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const handleSelect = async (role: UserRole) => {
  if (role === activeRole.value) {
    closeMenu();
    return;
  }

  try {
    await auth.switchRole(role);
    await router.push(auth.getDefaultRoute());
  } catch (error) {
    console.error('Gagal mengganti akun', error);
  } finally {
    closeMenu();
  }
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (!containerRef.value || containerRef.value.contains(target)) {
    return;
  }
  closeMenu();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const roleButtonClass = (role: UserRole) => {
  const isActive = role === activeRole.value;
  return isActive
    ? 'border border-primary/40 bg-gradient-to-r from-primary to-info text-white shadow-[0_12px_30px_-12px_rgba(37,99,235,0.45)] dark:from-primary/80 dark:to-info/70'
    : 'border border-transparent bg-slate-50/70 text-slate-600 hover:border-primary/30 hover:bg-white dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-primary/40 dark:hover:bg-slate-800';
};
</script>
