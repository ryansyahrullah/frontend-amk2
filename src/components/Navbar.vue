<template>
  <header class="sticky top-0 z-30 bg-transparent">
    <div class="safe-container py-6">
      <div class="horizon-glass relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0">
          <div class="floating absolute -left-20 top-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl dark:bg-primary/35"></div>
          <div class="floating-slow absolute bottom-[-35%] right-[-10%] h-60 w-60 rounded-full bg-amber-200/50 blur-[160px] dark:bg-fuchsia-500/30"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_18%_0%,rgba(147,51,234,0.28),transparent_60%)]"></div>
          <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_55%)] dark:bg-[linear-gradient(130deg,rgba(148,163,184,0.16)_0%,rgba(148,163,184,0)_65%)]"></div>
        </div>
        <div class="relative space-y-8">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex flex-1 flex-col gap-6 lg:flex-row lg:items-center">
              <div class="flex items-start gap-4">
                <button
                  type="button"
                  class="inline-flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/60 bg-white/80 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                  @click="$emit('toggle-sidebar')"
                  aria-label="Buka navigasi"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
                <div class="space-y-2">
                  <span class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-primary dark:bg-primary/25 dark:text-primary/80">
                    Horizon Deck
                  </span>
                  <div class="space-y-1">
                    <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ greeting }}, {{ user?.nama ?? 'Administrator' }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ formattedDate }}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-1 items-center gap-3 rounded-[26px] border border-white/60 bg-white/75 px-4 py-3 text-sm shadow-inner transition focus-within:border-primary/60 focus-within:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] dark:border-white/10 dark:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
                </svg>
                <input
                  type="search"
                  placeholder="Cari pegawai, modul, atau aktivitas..."
                  class="w-full bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500"
                />
                <span class="hidden items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[0.65rem] font-semibold text-primary dark:border-primary/30 dark:bg-primary/20 dark:text-primary/80 lg:inline-flex">
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
                  class="relative inline-flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/60 bg-white/80 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                  aria-label="Notifikasi"
                >
                  <span class="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-white bg-rose-500 shadow-[0_0_0_2px_rgba(255,255,255,0.7)] dark:border-slate-900"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a4.5 4.5 0 0 1 4.5 4.5v1.047c0 .36.097.712.28 1.02l.944 1.636A1.5 1.5 0 0 1 16.427 17.25H7.573a1.5 1.5 0 0 1-1.297-2.247l.944-1.636a2.25 2.25 0 0 0 .28-1.02V11.25a4.5 4.5 0 0 1 4.5-4.5Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 19.5a2.25 2.25 0 0 0 4.5 0" />
                  </svg>
                </button>
              </div>
              <div class="relative overflow-hidden rounded-[26px] border border-white/60 bg-white/70 px-4 py-3 shadow-sm transition dark:border-white/10 dark:bg-white/10">
                <div class="pointer-events-none absolute inset-0 opacity-80">
                  <div class="absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/25"></div>
                </div>
                <div class="relative flex items-center gap-3 text-sm">
                  <div class="glow-ring flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold uppercase tracking-wide text-primary dark:bg-primary/25 dark:text-primary/80">
                    {{ inisialUser }}
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900 dark:text-white">{{ user?.nama ?? 'Administrator' }}</p>
                    <div class="mt-1 flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-500 dark:text-slate-400">
                      <span class="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2.5 py-1 font-semibold text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200">
                        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                        Aktif
                      </span>
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
              class="group relative overflow-hidden rounded-[24px] border border-white/60 bg-white/70 p-4 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_28px_75px_-45px_rgba(37,99,235,0.55)] dark:border-white/10 dark:bg-white/10"
            >
              <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
              </div>
              <div class="relative flex items-start justify-between gap-3">
                <div>
                  <p class="text-[0.62rem] uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">{{ tile.label }}</p>
                  <p class="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{{ tile.value }}</p>
                  <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ tile.caption }}</p>
                </div>
                <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold text-primary dark:bg-primary/25 dark:text-primary/80">
                  {{ tile.delta }}
                </span>
              </div>
            </div>
          </div>

          <div class="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <div class="nova-card p-6">
              <div class="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                <span>Navigator ritme operasional</span>
                <span>Kinerja realtime lintas site</span>
              </div>
              <div class="mt-6 grid gap-6 md:grid-cols-3">
                <div v-for="segment in rhythmSegments" :key="segment.id" class="space-y-4">
                  <div class="flex items-center gap-3">
                    <span :class="['flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold', segment.badge]">{{ segment.code }}</span>
                    <div>
                      <p class="text-sm font-semibold text-slate-800 dark:text-white">{{ segment.title }}</p>
                      <p class="text-xs text-slate-500 dark:text-slate-400">{{ segment.subtitle }}</p>
                    </div>
                  </div>
                  <div class="overflow-hidden rounded-2xl bg-white/70 shadow-inner dark:bg-white/5">
                    <div class="h-2 rounded-2xl bg-slate-200/80 dark:bg-slate-700">
                      <div :class="['h-2 rounded-2xl bg-gradient-to-r from-primary via-sky-400 to-emerald-400 dark:from-sky-400 dark:via-sky-500 dark:to-emerald-400']" :style="{ width: segment.progress }"></div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between text-[0.68rem] text-slate-500 dark:text-slate-400">
                    <span>{{ segment.progress }}</span>
                    <span class="flex items-center gap-1 text-primary dark:text-primary/80">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12 6 6 9-12" />
                      </svg>
                      {{ segment.note }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="nova-card space-y-5 p-6">
              <div class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                <span>Highlight hari ini</span>
                <span>Mode dual</span>
              </div>
              <div class="space-y-3">
                <div
                  v-for="highlight in highlights"
                  :key="highlight.id"
                  class="flex items-center gap-3 rounded-[20px] border border-white/60 bg-white/70 px-4 py-3 text-sm transition hover:border-primary/50 hover:bg-primary/5 dark:border-white/10 dark:bg-white/10"
                >
                  <span :class="['inline-flex h-9 w-9 items-center justify-center rounded-xl text-base', highlight.iconWrap]">
                    <svg v-if="highlight.icon === 'target'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75v4.5l2.25 2.25m5.25-2.25a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z" />
                    </svg>
                    <svg v-else-if="highlight.icon === 'flag'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
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
                  <span class="text-[0.7rem] font-semibold text-primary dark:text-primary/80">{{ highlight.value }}</span>
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
    iconWrap: 'bg-primary/10 text-primary dark:bg-primary/25 dark:text-primary/80',
    title: 'Safety drill terselesaikan',
    caption: 'Site Mahakam update pukul 08.00',
    value: '100%'
  },
  {
    id: 'dispatch',
    icon: 'flag',
    iconWrap: 'bg-emerald-100/70 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-200',
    title: 'Tim dispatch siap berangkat',
    caption: 'Distribusi kru shift malam',
    value: '12 kru'
  },
  {
    id: 'handover',
    icon: 'pulse',
    iconWrap: 'bg-amber-100/70 text-amber-600 dark:bg-amber-400/20 dark:text-amber-200',
    title: 'Handover kontrak vendor',
    caption: 'Proses digital tuntas hari ini',
    value: '4 dokumen'
  }
]);
</script>
