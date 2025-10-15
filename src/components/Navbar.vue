<template>
  <header class="sticky top-0 z-30 pt-6">
    <div class="cosmic-container-wide">
      <div class="aether-shell aether-gradient-border overflow-hidden">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute inset-0 celestial-weave opacity-80"></div>
          <div class="absolute inset-0 nebula-grid"></div>
          <div class="aether-float absolute -left-32 top-0 h-72 w-72 rounded-full bg-indigo-200/45 blur-[220px] dark:bg-indigo-500/25"></div>
          <div class="aether-wave absolute -right-40 bottom-[-35%] h-[26rem] w-[26rem] rounded-full bg-sky-200/40 blur-[220px] dark:bg-sky-500/20"></div>
        </div>
        <div class="relative z-10 flex flex-col gap-8 px-6 py-7 sm:px-8 lg:px-12">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex flex-1 flex-wrap items-center gap-4">
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/85 text-slate-500 shadow-inner transition hover:-translate-y-0.5 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 lg:hidden"
                @click="$emit('toggle-sidebar')"
                aria-label="Buka navigasi"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.75h16.5M3.75 12h16.5m-16.5 6.25h16.5" />
                </svg>
              </button>
              <div class="space-y-2">
                <span class="aether-chip text-indigo-500">Aether Command</span>
                <div class="space-y-1">
                  <p class="text-lg font-semibold text-slate-900 dark:text-white">
                    {{ greeting }}, {{ user?.nama ?? 'Administrator' }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ formattedDate }}</p>
                </div>
              </div>
              <div class="ml-0 flex flex-wrap gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500 sm:ml-6">
                <span class="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/70 px-3 py-1 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200">
                  <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                  {{ atlasSummary.active }} aktif
                </span>
                <span class="inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/70 px-3 py-1 text-amber-600 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200">
                  onboarding {{ atlasSummary.onboarding }}
                </span>
                <span class="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50/70 px-3 py-1 text-sky-600 dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-sky-200">
                  engagement {{ atlasSummary.engagementAverage }}/100
                </span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <div class="relative hidden items-center gap-3 rounded-full border border-white/65 bg-white/80 px-4 py-2 text-sm text-slate-500 shadow-inner transition hover:-translate-y-0.5 hover:border-indigo-300/70 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 lg:flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="search"
                  placeholder="Cari modul, pegawai, atau laporan"
                  class="w-56 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500"
                />
              </div>
              <ThemeToggle compact />
              <button
                type="button"
                class="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/85 text-slate-500 shadow-inner transition hover:-translate-y-0.5 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
                aria-label="Notifikasi terbaru"
              >
                <span class="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-white bg-rose-500 shadow-[0_0_0_2px_rgba(255,255,255,0.8)] dark:border-slate-900"></span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.311 6.022c1.733.64 3.56 1.085 5.454 1.31M8.25 21h7.5" />
                </svg>
              </button>
              <AccountSwitcher />
            </div>
          </div>

          <div class="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div
                v-for="tile in heroTiles"
                :key="tile.id"
                class="group relative overflow-hidden rounded-[26px] border border-white/65 bg-white/80 p-4 text-sm shadow-[0_26px_85px_-60px_rgba(15,23,42,0.5)] transition hover:-translate-y-1 hover:border-indigo-300/60 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10"
              >
                <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div :class="['absolute inset-0 rounded-[26px]', tile.overlay]"></div>
                </div>
                <div class="relative space-y-4">
                  <div class="flex items-center justify-between gap-2">
                    <p class="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-slate-400 dark:text-slate-500">
                      {{ tile.label }}
                    </p>
                    <span class="aether-badge">{{ tile.delta }}</span>
                  </div>
                  <p class="text-2xl font-semibold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-sky-200">
                    {{ tile.value }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ tile.caption }}</p>
                  <div class="mt-2 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
                      :style="{ width: tile.progress }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="aether-panel overflow-hidden p-5 text-sm">
              <div class="pointer-events-none absolute inset-0 opacity-80">
                <div class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-indigo-200/35 via-transparent to-transparent dark:from-indigo-500/20"></div>
              </div>
              <div class="relative space-y-5">
                <div class="flex items-center justify-between text-xs uppercase tracking-[0.38em] text-slate-400 dark:text-slate-500">
                  <span>Orbit kru</span>
                  <span>Realtime</span>
                </div>
                <div class="grid gap-3">
                  <div
                    v-for="segment in orbitSegments"
                    :key="segment.id"
                    class="aether-card flex items-center justify-between gap-4 rounded-[22px] border border-white/65 bg-white/70 px-4 py-3 text-xs font-medium text-slate-500 transition hover:-translate-y-0.5 hover:border-indigo-300/70 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                  >
                    <div class="flex flex-1 items-center gap-3">
                      <span class="aether-icon-sm text-base font-semibold text-indigo-500 dark:text-indigo-200">{{ segment.code }}</span>
                      <div class="flex-1 space-y-2">
                        <p class="text-sm font-semibold text-slate-800 dark:text-white">{{ segment.title }}</p>
                        <p>{{ segment.subtitle }}</p>
                        <div class="h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
                          <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" :style="{ width: segment.meter }"></div>
                        </div>
                      </div>
                    </div>
                    <div class="text-right text-[0.7rem] uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">
                      <p>{{ segment.progress }}</p>
                      <p class="mt-1 text-xs font-semibold text-indigo-500 dark:text-indigo-200">{{ segment.note }}</p>
                    </div>
                  </div>
                </div>
                <div class="aether-divider"></div>
                <div class="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    {{ atlasSummary.wellbeingAverage }} indeks wellbeing
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-rose-500"></span>
                    {{ atlasSummary.highRisk }} risiko tinggi
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-sky-500"></span>
                    {{ atlasSummary.leadershipAverage }} kesiapan leaders
                  </div>
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
import { employeeAtlas } from '../data/employeeAtlas';

const auth = useAuthStore();
const user = computed(() => auth.state.user);

const atlasSummary = (() => {
  let active = 0;
  let onboarding = 0;
  let rotation = 0;
  let highRisk = 0;
  let wellbeingTotal = 0;
  let engagementTotal = 0;
  let readinessTotal = 0;
  let leadershipTotal = 0;
  let tenureTotal = 0;
  const programCount = new Map<string, number>();

  for (const entry of employeeAtlas) {
    if (entry.status === 'Aktif') active += 1;
    if (entry.status === 'Onboarding') onboarding += 1;
    if (entry.status === 'Rotasi') rotation += 1;
    if (entry.riskLevel === 'Tinggi') highRisk += 1;
    wellbeingTotal += entry.wellbeingScore;
    engagementTotal += entry.engagementScore;
    readinessTotal += entry.readinessIndex;
    leadershipTotal += entry.leadershipReadiness;
    tenureTotal += entry.tenureYears;

    const count = programCount.get(entry.flagshipProgram) ?? 0;
    programCount.set(entry.flagshipProgram, count + 1);
  }

  const total = employeeAtlas.length || 1;
  let topProgram = 'Accelerate';
  let topProgramCount = 0;
  programCount.forEach((value, key) => {
    if (value > topProgramCount) {
      topProgram = key;
      topProgramCount = value;
    }
  });

  const wellbeingAverage = Math.round(wellbeingTotal / total);
  const engagementAverage = Math.round(engagementTotal / total);
  const readinessAverage = Math.round(readinessTotal / total);
  const leadershipAverage = Math.round(leadershipTotal / total);
  const tenureAverage = Math.round((tenureTotal / total) * 10) / 10;

  return {
    total,
    active,
    onboarding,
    rotation,
    highRisk,
    wellbeingAverage,
    engagementAverage,
    readinessAverage,
    leadershipAverage,
    tenureAverage,
    topProgram,
    topProgramCount
  };
})();

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
    id: 'active',
    label: 'Kru aktif',
    value: atlasSummary.active.toLocaleString('id-ID'),
    caption: `Dari ${atlasSummary.total.toLocaleString('id-ID')} total kru`,
    delta: `+${atlasSummary.rotation} rotasi`,
    progress: `${Math.min(100, Math.round((atlasSummary.active / atlasSummary.total) * 100))}%`,
    overlay: 'bg-gradient-to-br from-indigo-200/35 via-transparent to-emerald-200/25 dark:from-indigo-500/20 dark:to-emerald-500/15'
  },
  {
    id: 'readiness',
    label: 'Readiness index',
    value: `${atlasSummary.readinessAverage}%`,
    caption: 'Rerata kesiapan promosi',
    delta: atlasSummary.readinessAverage > 65 ? '+stabil' : '+monitor',
    progress: `${Math.min(100, atlasSummary.readinessAverage)}%`,
    overlay: 'bg-gradient-to-br from-indigo-200/30 via-transparent to-sky-200/25 dark:from-indigo-500/18 dark:to-sky-500/15'
  },
  {
    id: 'engagement',
    label: 'Engagement energi',
    value: `${atlasSummary.engagementAverage}/100`,
    caption: 'Pulse kru site & kantor pusat',
    delta: atlasSummary.engagementAverage >= 80 ? '+prima' : '+perlu boost',
    progress: `${Math.min(100, atlasSummary.engagementAverage)}%`,
    overlay: 'bg-gradient-to-br from-sky-200/30 via-transparent to-indigo-200/25 dark:from-sky-500/18 dark:to-indigo-500/15'
  },
  {
    id: 'program',
    label: 'Program unggulan',
    value: atlasSummary.topProgram,
    caption: `${atlasSummary.topProgramCount.toLocaleString('id-ID')} peserta aktif`,
    delta: `+${atlasSummary.onboarding} onboarding`,
    progress: `${Math.min(100, Math.round((atlasSummary.topProgramCount / atlasSummary.total) * 100) + 20)}%`,
    overlay: 'bg-gradient-to-br from-emerald-200/30 via-transparent to-sky-200/20 dark:from-emerald-500/18 dark:to-sky-500/12'
  }
]);

const orbitSegments = computed(() => [
  {
    id: 'wellbeing',
    code: 'WB',
    title: 'Wellbeing crew',
    subtitle: 'Energi kerja lintas site',
    progress: `${atlasSummary.wellbeingAverage}/100`,
    note: atlasSummary.wellbeingAverage >= 75 ? 'stabil' : 'awasi',
    meter: `${Math.min(100, atlasSummary.wellbeingAverage)}%`
  },
  {
    id: 'engage',
    code: 'EG',
    title: 'Keterlibatan',
    subtitle: 'Partisipasi modul & forum',
    progress: `${atlasSummary.engagementAverage}/100`,
    note: atlasSummary.engagementAverage >= 78 ? 'tinggi' : 'boost',
    meter: `${Math.min(100, atlasSummary.engagementAverage)}%`
  },
  {
    id: 'leadership',
    code: 'LD',
    title: 'Pipeline leader',
    subtitle: 'Leadership readiness rata-rata',
    progress: `${atlasSummary.leadershipAverage}%`,
    note: atlasSummary.leadershipAverage >= 60 ? 'siaga' : 'coach',
    meter: `${Math.min(100, atlasSummary.leadershipAverage)}%`
  },
  {
    id: 'tenure',
    code: 'TN',
    title: 'Tenure crew',
    subtitle: 'Rerata masa kerja (tahun)',
    progress: `${atlasSummary.tenureAverage} th`,
    note: atlasSummary.tenureAverage >= 5 ? 'mapan' : 'tumbuh',
    meter: `${Math.min(100, Math.round((atlasSummary.tenureAverage / 12) * 100))}%`
  }
]);
</script>
