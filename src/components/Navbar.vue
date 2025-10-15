<template>
  <header class="sticky top-0 z-30 bg-transparent">
    <div class="safe-container py-6">
      <div class="ocean-shell overflow-hidden">
        <div class="pointer-events-none absolute inset-0">
          <div class="floating absolute -left-24 top-6 h-56 w-56 rounded-full bg-sky-200/40 blur-[160px]"></div>
          <div class="floating-slow absolute -right-28 bottom-[-40%] h-72 w-72 rounded-full bg-emerald-200/40 blur-[200px]"></div>
          <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_60%)] dark:bg-[linear-gradient(135deg,rgba(148,163,184,0.18)_0%,rgba(148,163,184,0)_65%)]"></div>
        </div>
        <div class="relative space-y-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex flex-1 flex-col gap-6 lg:flex-row lg:items-center">
              <div class="flex items-start gap-4">
                <button
                  type="button"
                  class="ocean-icon shadow-none border border-white/70 hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
                  aria-label="Buka navigasi"
                  @click="$emit('toggle-sidebar')"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
                <div class="space-y-2">
                  <span class="ocean-chip text-sky-500">CoachPro Portal</span>
                  <div class="space-y-1">
                    <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ greeting }}, {{ user?.nama ?? 'Administrator' }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ formattedDate }}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-1 items-center gap-3 rounded-[24px] border border-white/70 bg-white/85 px-4 py-3 text-sm shadow-inner transition focus-within:border-sky-400 focus-within:shadow-[0_0_0_2px_rgba(56,189,248,0.25)] dark:border-white/10 dark:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
                </svg>
                <input
                  type="search"
                  placeholder="Cari pegawai, modul, atau aktivitas..."
                  class="w-full bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500"
                />
                <span class="hidden items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[0.65rem] font-semibold text-sky-500 dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-200 lg:inline-flex">
                  ⌘K
                </span>
              </div>
            </div>
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
              <div class="flex items-center gap-3">
                <AccountSwitcher />
                <ThemeToggle :compact="true" />
                <button
                  type="button"
                  class="relative ocean-icon shadow-none border border-white/70 hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
                  aria-label="Notifikasi"
                >
                  <span class="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-white bg-rose-500 shadow-[0_0_0_2px_rgba(255,255,255,0.8)] dark:border-slate-900"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a4.5 4.5 0 0 1 4.5 4.5v1.047c0 .36.097.712.28 1.02l.944 1.636A1.5 1.5 0 0 1 16.427 17.25H7.573a1.5 1.5 0 0 1-1.297-2.247l.944-1.636a2.25 2.25 0 0 0 .28-1.02V11.25a4.5 4.5 0 0 1 4.5-4.5Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 19.5a2.25 2.25 0 0 0 4.5 0" />
                  </svg>
                </button>
              </div>
              <div class="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/85 px-4 py-3 text-sm shadow-sm transition dark:border-white/10 dark:bg-white/10">
                <div class="pointer-events-none absolute inset-0 opacity-80">
                  <div class="absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/20"></div>
                </div>
                <div class="relative flex items-center gap-3">
                  <div class="ocean-icon-sm text-sky-500 dark:text-sky-200">{{ inisialUser }}</div>
                  <div>
                    <p class="font-semibold text-slate-900 dark:text-white">{{ user?.nama ?? 'Administrator' }}</p>
                    <div class="mt-1 flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-500 dark:text-slate-400">
                      <span class="ocean-tag">Aktif</span>
                      <span>{{ roleLabel }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-4 lg:grid-cols-4">
            <div
              v-for="tile in heroTiles"
              :key="tile.id"
              class="ocean-card group p-5 hover:-translate-y-1 hover:border-sky-300/70 hover:shadow-[0_30px_90px_-60px_rgba(14,116,144,0.55)]"
            >
              <div class="relative flex items-start justify-between gap-4">
                <div>
                  <p class="text-[0.62rem] uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">{{ tile.label }}</p>
                  <p class="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{{ tile.value }}</p>
                  <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ tile.caption }}</p>
                </div>
                <span class="ocean-badge">{{ tile.delta }}</span>
              </div>
            </div>
          </div>

          <div class="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <div class="ocean-panel p-8">
              <div class="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                <span>Navigator ritme operasional</span>
                <span>Kinerja realtime lintas site</span>
              </div>
              <div class="mt-8 grid gap-6 md:grid-cols-3">
                <div v-for="segment in rhythmSegments" :key="segment.id" class="space-y-4 rounded-[26px] border border-white/70 bg-white/80 p-4 shadow-inner transition dark:border-white/10 dark:bg-white/5">
                  <div class="flex items-center gap-3">
                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sm font-semibold text-sky-500 dark:bg-sky-500/20 dark:text-sky-200">{{ segment.code }}</span>
                    <div>
                      <p class="text-sm font-semibold text-slate-800 dark:text-white">{{ segment.title }}</p>
                      <p class="text-xs text-slate-500 dark:text-slate-400">{{ segment.subtitle }}</p>
                    </div>
                  </div>
                  <div class="overflow-hidden rounded-2xl bg-slate-100/80 dark:bg-white/5">
                    <div class="h-2 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-emerald-400" :style="{ width: segment.progress }"></div>
                  </div>
                  <div class="flex items-center justify-between text-[0.68rem] text-slate-500 dark:text-slate-400">
                    <span>{{ segment.progress }}</span>
                    <span class="flex items-center gap-1 text-sky-500 dark:text-sky-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12 6 6 9-12" />
                      </svg>
                      {{ segment.note }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="ocean-panel space-y-5 p-8">
              <div class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                <span>Highlight hari ini</span>
                <span>Mode dual</span>
              </div>
              <div class="space-y-3">
                <div
                  v-for="highlight in highlights"
                  :key="highlight.id"
                  class="flex items-center gap-3 rounded-[22px] border border-white/70 bg-white/85 px-4 py-3 text-sm transition hover:border-sky-400/60 hover:bg-sky-50 dark:border-white/10 dark:bg-white/10"
                >
                  <span :class="['ocean-icon-sm', highlight.iconWrap]">
                    <svg
                      v-if="highlight.icon === 'target'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75v4.5l2.25 2.25m5.25-2.25a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z" />
                    </svg>
                    <svg
                      v-else-if="highlight.icon === 'flag'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 4.5h11.25a.75.75 0 0 1 .54 1.28l-2.72 2.72a1.5 1.5 0 0 0 0 2.12l2.72 2.72a.75.75 0 0 1-.54 1.28H6" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 19.5V4.5" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75 12 12l9.75-5.25M4.5 19.5l6-3.75M9.75 16.5l-7.5 3.75M19.5 19.5l-6-3.75" />
                    </svg>
                  </span>
                  <div class="flex-1">
                    <p class="font-semibold text-slate-800 dark:text-white">{{ highlight.title }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ highlight.caption }}</p>
                  </div>
                  <span class="text-[0.7rem] font-semibold text-sky-500 dark:text-sky-300">{{ highlight.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import ThemeToggle from './ThemeToggle.vue';
import AccountSwitcher from './AccountSwitcher.vue';
import { roleLabelMap } from '../constants/roles';

const auth = useAuthStore();
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

const now = ref(new Date());
let timer: number | undefined;

const formattedDate = computed(() =>
  now.value.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
);

const greeting = computed(() => {
  const hour = now.value.getHours();
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 19) return 'Selamat sore';
  return 'Selamat malam';
});

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 60_000);
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});

const heroTiles = computed(() => [
  {
    id: 'presence',
    label: 'Rasio hadir',
    value: '98,2%',
    caption: 'Site Kalimantan & Sulawesi',
    delta: '+0,8%'
  },
  {
    id: 'training',
    label: 'Pelatihan aktif',
    value: '24 sesi',
    caption: 'Program kompetensi Q3',
    delta: '6 baru'
  },
  {
    id: 'contract',
    label: 'Perpanjangan',
    value: '18 pegawai',
    caption: 'Kontrak jatuh tempo 30 hari',
    delta: 'Prioritas'
  },
  {
    id: 'engagement',
    label: 'Engagement',
    value: '87/100',
    caption: 'Pulse survei Q3',
    delta: '+4 skor'
  }
]);

const rhythmSegments = computed(() => [
  {
    id: 'onboarding',
    code: 'OB',
    title: 'Onboarding site baru',
    subtitle: 'Balikpapan, Samarinda',
    progress: '76%',
    note: '8 modul'
  },
  {
    id: 'compliance',
    code: 'CP',
    title: 'Kepatuhan dokumen',
    subtitle: 'Audit triwulan berjalan',
    progress: '91%',
    note: 'Zona hijau'
  },
  {
    id: 'development',
    code: 'DV',
    title: 'Percepatan skill',
    subtitle: 'Skema supervisor lapangan',
    progress: '64%',
    note: '3 site fokus'
  }
]);

const highlights = computed(() => [
  {
    id: 'safety',
    icon: 'target',
    iconWrap: 'bg-sky-100 text-sky-500 dark:bg-sky-500/20 dark:text-sky-200',
    title: 'Safety drill terselesaikan',
    caption: 'Site Mahakam update pukul 08.00',
    value: '100%'
  },
  {
    id: 'dispatch',
    icon: 'flag',
    iconWrap: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200',
    title: 'Tim dispatch siap berangkat',
    caption: 'Distribusi kru shift malam',
    value: '12 kru'
  },
  {
    id: 'handover',
    icon: 'pulse',
    iconWrap: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-200',
    title: 'Handover kontrak vendor',
    caption: 'Proses digital tuntas hari ini',
    value: '4 dokumen'
  }
]);
</script>
