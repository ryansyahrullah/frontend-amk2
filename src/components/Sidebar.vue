<template>
  <transition name="fade">
    <div v-if="mobileOpen" class="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden" @click="$emit('close-mobile')"></div>
  </transition>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 flex h-screen w-full max-w-[21rem] flex-col space-y-6 border-r border-white/50 bg-white/75 px-5 py-6 backdrop-blur-[32px] transition-all duration-300 ease-out dark:border-white/10 dark:bg-white/5',
      mobileOpen ? 'translate-x-0 shadow-[0_60px_140px_-70px_rgba(14,116,144,0.55)]' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <div class="flex h-full flex-col gap-6 overflow-hidden">
      <div class="space-y-6 overflow-y-auto pb-24 pr-1 nova-gentle-scrollbar">
        <div class="nova-shell overflow-hidden p-6 text-sm">
          <div class="pointer-events-none absolute inset-0 opacity-80">
            <div class="absolute -left-20 top-0 h-40 w-40 rounded-full bg-sky-200/45 blur-[160px] dark:bg-sky-500/25"></div>
            <div class="absolute -right-24 bottom-[-35%] h-48 w-48 rounded-full bg-emerald-200/40 blur-[200px] dark:bg-purple-500/25"></div>
          </div>
          <div class="relative space-y-6">
            <div class="flex items-center justify-between gap-2">
              <span class="nova-chip text-sky-500">Luminara Portal</span>
              <span class="nova-pill text-[0.62rem] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{{ roleLabel }}</span>
            </div>
            <div class="space-y-3 text-slate-600 dark:text-slate-200">
              <h1 class="text-2xl font-semibold leading-tight text-slate-900 dark:text-white">PT Anugerah Mitra Kalimantan</h1>
              <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Dasbor HR dimensi baru dengan panel dinamis, animasi halus, dan insight lintas lokasi.
              </p>
            </div>
            <div class="grid grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div class="nova-card rounded-[22px] border border-white/70 bg-white/85 p-3 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.6rem] font-semibold uppercase tracking-[0.32em]">Pegawai</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{{ atlasSummary.total }}</p>
                <p class="mt-1 text-[0.68rem] text-slate-400">{{ atlasSummary.active }} aktif</p>
              </div>
              <div class="nova-card rounded-[22px] border border-white/70 bg-white/85 p-3 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.6rem] font-semibold uppercase tracking-[0.32em]">Lokasi</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{{ atlasSummary.locations }}</p>
                <p class="mt-1 text-[0.68rem] text-slate-400">Sebaran Kalimantan</p>
              </div>
              <div class="nova-card rounded-[22px] border border-white/70 bg-white/85 p-3 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.6rem] font-semibold uppercase tracking-[0.32em]">Onboarding</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{{ atlasSummary.onboarding }}</p>
                <p class="mt-1 text-[0.68rem] text-slate-400">Batch site baru</p>
              </div>
              <div class="nova-card rounded-[22px] border border-white/70 bg-white/85 p-3 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.6rem] font-semibold uppercase tracking-[0.32em]">Potensial</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{{ atlasSummary.highPotential }}</p>
                <p class="mt-1 text-[0.68rem] text-slate-400">Siap akselerasi</p>
              </div>
            </div>
            <div class="rounded-[22px] border border-white/70 bg-white/85 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
              <div class="flex items-center gap-3">
                <span class="nova-icon-sm text-sky-500 dark:text-sky-200">{{ atlasSummary.readinessAverage }}%</span>
                <div>
                  <p class="font-semibold text-slate-700 dark:text-white">Readiness index</p>
                  <p>Rerata kesiapan promosi triwulan ini.</p>
                </div>
              </div>
              <div class="mt-3 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
                <div class="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500" :style="{ width: readinessProgress }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="nova-panel space-y-4 p-5 text-xs text-slate-500 dark:text-slate-300">
          <div class="nova-section-title">
            <span>Status orbit</span>
            <span>Realtime</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="highlight in synergyHighlights"
              :key="highlight.id"
              class="group relative overflow-hidden rounded-[20px] border border-white/70 bg-white/85 p-3 text-xs transition hover:-translate-y-0.5 hover:border-sky-300/70 hover:text-sky-600 dark:border-white/10 dark:bg-white/10"
            >
              <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div :class="['absolute inset-0 rounded-[20px]', highlight.overlay]"></div>
              </div>
              <div class="relative space-y-2">
                <p class="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">{{ highlight.label }}</p>
                <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ highlight.value }}</p>
                <p>{{ highlight.caption }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-[20px] border border-dashed border-white/70 p-4 text-[0.7rem] leading-relaxed text-slate-500 dark:border-white/10 dark:text-slate-400">
            <p class="font-semibold text-slate-700 dark:text-white">Agenda penting</p>
            <ul class="mt-2 space-y-1">
              <li v-for="agenda in focusTimeline" :key="agenda.id" class="flex items-center justify-between gap-2">
                <span>{{ agenda.title }}</span>
                <span class="nova-pill text-[0.6rem] tracking-[0.28em] text-slate-400 dark:text-slate-500">{{ agenda.when }}</span>
              </li>
            </ul>
          </div>
        </div>

        <nav class="space-y-4 text-sm text-slate-500 transition dark:text-slate-300">
          <div class="px-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
            Navigasi utama
          </div>
          <div v-for="item in menuItems" :key="item.id" class="space-y-1">
            <RouterLink
              v-if="!item.children"
              :to="item.to"
              class="group relative flex items-center gap-3 rounded-[22px] border border-transparent bg-white/70 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-sky-50 hover:text-sky-500 dark:bg-white/5 dark:hover:border-sky-400/60"
              :class="[
                isRouteActive(item.to, item.exact)
                  ? 'border-sky-400/70 bg-sky-50 text-sky-600 shadow-[0_32px_85px_-60px_rgba(14,116,144,0.55)] dark:border-sky-500/50 dark:bg-sky-500/10 dark:text-sky-200'
                  : ''
              ]"
            >
              <span class="nova-icon-sm border border-white/70 bg-white/85 text-sky-500 transition group-[.border-sky-400\/70]:border-transparent group-[.border-sky-400\/70]:bg-sky-500/20 group-[.border-sky-400\/70]:text-sky-600 dark:border-white/10 dark:bg-white/10">
                <SidebarIcon :name="item.icon" />
              </span>
              <div class="flex-1">
                <p class="font-semibold text-slate-700 transition group-hover:text-sky-500 dark:text-slate-100">{{ item.label }}</p>
                <p class="text-[0.65rem] text-slate-400 group-[.border-sky-400/70]:text-sky-400 dark:text-slate-500">Akses modul utama</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-300 transition group-hover:text-sky-400 group-[.border-sky-400/70]:text-sky-200 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
              </svg>
            </RouterLink>
            <div v-else class="rounded-[24px] border border-white/70 bg-white/75 p-2 transition dark:border-white/10 dark:bg-white/5">
              <button
                type="button"
                class="flex w-full items-center justify-between gap-3 rounded-[20px] px-3 py-2.5 text-left font-semibold text-slate-600 transition hover:text-sky-500 dark:text-slate-200"
                :class="[
                  isParentActive(item)
                    ? 'bg-sky-50 text-sky-500 shadow-[0_30px_80px_-60px_rgba(14,116,144,0.55)] dark:bg-sky-500/10 dark:text-sky-200'
                    : ''
                ]"
                @click="handleParentClick(item)"
              >
                <span class="flex flex-1 items-center gap-3">
                  <span class="nova-icon-sm border border-white/70 bg-white/85 text-sky-500 transition group-[.bg-sky-50]:border-transparent group-[.bg-sky-50]:bg-sky-500/15 group-[.bg-sky-50]:text-sky-600 dark:border-white/10 dark:bg-white/10">
                    <SidebarIcon :name="item.icon" />
                  </span>
                  <span>{{ item.label }}</span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-400 transition-transform group-[.bg-sky-50]:text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  :class="isExpanded(item.id) ? 'rotate-180 text-sky-400 dark:text-sky-200' : ''"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <transition name="accordion">
                <div
                  v-if="isExpanded(item.id)"
                  class="mt-2 space-y-1 rounded-[20px] border border-white/70 bg-white/85 p-2 text-slate-500 shadow-inner transition dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
                >
                  <RouterLink
                    v-for="child in item.children"
                    :key="child.id"
                    :to="child.to"
                    class="group flex items-center justify-between gap-2 rounded-[18px] px-3 py-2 text-sm transition hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-500/10"
                    :class="[
                      isRouteActive(child.to, child.exact)
                        ? 'bg-sky-50 text-sky-500 shadow-[0_24px_65px_-52px_rgba(14,116,144,0.55)] dark:bg-sky-500/15 dark:text-sky-200'
                        : ''
                    ]"
                  >
                    <span class="flex items-center gap-3">
                      <span class="nova-icon-sm border border-white/70 bg-white/85 text-sky-500 transition group-[.bg-sky-50]:border-transparent group-[.bg-sky-50]:bg-sky-500/15 group-[.bg-sky-50]:text-sky-600 dark:border-white/10 dark:bg-white/10">
                        <SidebarIcon :name="child.icon" />
                      </span>
                      <span>{{ child.label }}</span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 group-[.bg-sky-50]:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
                    </svg>
                  </RouterLink>
                </div>
              </transition>
            </div>
          </div>
        </nav>
      </div>

      <div class="nova-panel space-y-4 p-5 text-sm text-slate-600 dark:text-slate-200">
        <div class="flex items-center gap-3">
          <div class="nova-avatar text-xs">{{ inisialUser }}</div>
          <div>
            <p class="font-semibold text-slate-900 dark:text-white">{{ user?.nama ?? 'Admin AMK PORTAL' }}</p>
            <p class="text-xs text-slate-400 dark:text-slate-500">{{ user?.email ?? 'admin@gmail.com' }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div class="rounded-[18px] border border-white/70 bg-white/85 px-3 py-2 dark:border-white/10 dark:bg-white/10">
            <p class="text-[0.58rem] uppercase tracking-[0.3em]">Shift</p>
            <p class="mt-1 font-semibold text-slate-800 dark:text-white">Pagi</p>
          </div>
          <div class="rounded-[18px] border border-white/70 bg-white/85 px-3 py-2 dark:border-white/10 dark:bg-white/10">
            <p class="text-[0.58rem] uppercase tracking-[0.3em]">Lokasi</p>
            <p class="mt-1 font-semibold text-slate-800 dark:text-white">Balikpapan</p>
          </div>
        </div>
        <button
          type="button"
          class="nova-glass-button w-full justify-center text-sky-600 hover:text-sky-500 dark:text-sky-200"
          @click="handleLogoutClick"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          Keluar
        </button>
        <div class="rounded-[18px] border border-white/70 bg-white/85 p-3 text-[0.72rem] leading-relaxed text-slate-500 transition dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
          <p class="font-semibold text-slate-700 dark:text-slate-100">Butuh bantuan?</p>
          <p class="mt-1">Hubungi tim HC melalui portal internal atau email support@amk.co.id</p>
        </div>
      </div>

      <ConfirmDialog
        v-model="showLogoutConfirm"
        title="Keluar dari AMK PORTAL"
        message="Apakah Anda yakin ingin keluar dari AMK PORTAL?"
        :loading="logoutLoading"
        @confirm="confirmLogout"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import ConfirmDialog from './ConfirmDialog.vue';
import type { UserRole } from '../types';
import SidebarIcon from './icons/SidebarIcon.vue';
import { roleLabelMap } from '../constants/roles';
import { employeeAtlas } from '../data/employeeAtlas';

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

const emit = defineEmits(['close-mobile']);

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const showLogoutConfirm = ref(false);
const logoutLoading = ref(false);

const expanded = ref<string[]>([]);

const menuItems = computed<MenuItem[]>(() => {
  const role = auth.state.user?.role as UserRole | undefined;

  const baseMenu: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dasbor',
      to: '/',
      icon: 'dashboard',
      exact: true
    },
    {
      id: 'pegawai',
      label: 'Data Pegawai',
      icon: 'pegawai',
      children: [
        {
          id: 'daftar-pegawai',
          label: 'Daftar Pegawai',
          to: '/pegawai',
          icon: 'list'
        },
        {
          id: 'cuti',
          label: 'Pengajuan Cuti',
          to: '/cuti',
          icon: 'leave'
        },
        {
          id: 'kesehatan',
          label: 'Kesehatan & BPJS',
          to: '/kesehatan',
          icon: 'health'
        }
      ]
    },
    {
      id: 'kontrak',
      label: 'Kontrak Kerja',
      to: '/kontrak',
      icon: 'contract'
    },
    {
      id: 'profil',
      label: 'Profil Pegawai',
      to: '/profil',
      icon: 'profile'
    },
    {
      id: 'gaji',
      label: 'Payroll & Gaji',
      to: '/gaji',
      icon: 'salary'
    },
    {
      id: 'keuangan',
      label: 'Keuangan Proyek',
      to: '/keuangan',
      icon: 'finance'
    },
    {
      id: 'site',
      label: 'Monitoring Site',
      to: '/site',
      icon: 'site'
    }
  ];

  if (role === 'superadmin' || role === 'admin') {
    baseMenu.splice(2, 0, {
      id: 'administrasi',
      label: 'Administrasi',
      icon: 'list',
      children: [
        {
          id: 'struktur-organisasi',
          label: 'Struktur Organisasi',
          to: '/struktur',
          icon: 'pegawai'
        },
        {
          id: 'penugasan',
          label: 'Penugasan Proyek',
          to: '/penugasan',
          icon: 'site'
        }
      ]
    });
  }

  return baseMenu;
});

const user = computed(() => auth.state.user);
const roleLabel = computed(() => {
  const role = user.value?.role;
  if (!role) return 'Pengguna';
  return roleLabelMap[role] ?? role;
});

const inisialUser = computed(() => {
  if (!user.value) return 'AD';
  return user.value.nama
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
});

const atlasSummary = (() => {
  let active = 0;
  let onboarding = 0;
  let rotation = 0;
  let highPotential = 0;
  let highRisk = 0;
  let readinessTotal = 0;
  const locations = new Set<string>();
  for (const item of employeeAtlas) {
    locations.add(item.location);
    if (item.status === 'Aktif') active += 1;
    if (item.status === 'Onboarding') onboarding += 1;
    if (item.status === 'Rotasi' || item.status === 'Mutasi') rotation += 1;
    if (item.potentialScore >= 90) highPotential += 1;
    if (item.riskLevel === 'Tinggi') highRisk += 1;
    readinessTotal += item.readinessIndex;
  }
  const readinessAverage = Math.round(readinessTotal / employeeAtlas.length);
  return {
    total: employeeAtlas.length,
    active,
    onboarding,
    rotation,
    highPotential,
    highRisk,
    locations: locations.size,
    readinessAverage
  };
})();

const readinessProgress = `${Math.min(100, Math.max(0, atlasSummary.readinessAverage))}%`;

const synergyHighlights = computed(() => [
  {
    id: 'rotation',
    label: 'Rotasi & Mutasi',
    value: `${atlasSummary.rotation} kru`,
    caption: 'Penyesuaian per empat site prioritas.',
    overlay: 'bg-gradient-to-br from-indigo-100/35 via-transparent to-sky-100/30 dark:from-indigo-500/15 dark:to-sky-500/15'
  },
  {
    id: 'risk',
    label: 'Alert risiko tinggi',
    value: `${atlasSummary.highRisk}`,
    caption: 'Perlu sesi coaching pekan ini.',
    overlay: 'bg-gradient-to-br from-rose-100/35 via-transparent to-amber-100/30 dark:from-rose-500/15 dark:to-amber-500/15'
  },
  {
    id: 'engagement',
    label: 'Skor wellbeing',
    value: `${atlasSummary.active > 0 ? Math.round((atlasSummary.active / atlasSummary.total) * 100) : 0}% aktif`,
    caption: 'Partisipasi program apresiasi.',
    overlay: 'bg-gradient-to-br from-emerald-100/35 via-transparent to-teal-100/30 dark:from-emerald-500/15 dark:to-teal-500/15'
  },
  {
    id: 'talent',
    label: 'Talent pipeline',
    value: `${atlasSummary.highPotential} kandidat`,
    caption: 'Siap untuk promosi lintas site.',
    overlay: 'bg-gradient-to-br from-sky-100/35 via-transparent to-emerald-100/30 dark:from-sky-500/15 dark:to-emerald-500/15'
  }
]);

const focusTimeline = computed(() => [
  { id: 'townhall', title: 'Townhall Kalimantan Timur', when: '7 Juni' },
  { id: 'coaching', title: 'Coaching supervisor site', when: '9 Juni' },
  { id: 'audit', title: 'Audit dokumen kontrak', when: '12 Juni' }
]);

watch(
  () => route.fullPath,
  () => {
    if (!props.mobileOpen) return;
    expanded.value = [];
    emit('close-mobile');
  }
);

const isRouteActive = (to?: string, exact = false) => {
  if (!to) return false;
  if (exact) {
    return route.path === to;
  }
  return route.path.startsWith(to);
};

const isParentActive = (item: MenuItem) => {
  if (!item.children) return false;
  return item.children.some((child) => isRouteActive(child.to, child.exact));
};

const isExpanded = (id: string) => expanded.value.includes(id);

const handleParentClick = (item: MenuItem) => {
  if (!item.children) return;
  if (isExpanded(item.id)) {
    expanded.value = expanded.value.filter((value) => value !== item.id);
  } else {
    expanded.value = [...expanded.value, item.id];
  }
};

const handleLogoutClick = () => {
  showLogoutConfirm.value = true;
};

const confirmLogout = async () => {
  logoutLoading.value = true;
  try {
    await auth.logout();
    await router.push('/login');
  } finally {
    logoutLoading.value = false;
  }
};
</script>
