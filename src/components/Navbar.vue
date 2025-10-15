<template>
  <header class="sticky top-0 z-30 pt-6">
    <div class="safe-container-wide">
      <div class="nova-shell nova-gradient-border overflow-hidden">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute -left-32 top-0 h-72 w-72 rounded-full bg-sky-200/45 blur-[200px] dark:bg-sky-500/25"></div>
          <div class="absolute -right-36 bottom-[-30%] h-[22rem] w-[22rem] rounded-full bg-emerald-200/45 blur-[200px] dark:bg-purple-500/25"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-white/75 via-white/40 to-white/10 dark:from-white/5 dark:via-white/5 dark:to-white/0"></div>
        </div>
        <div class="relative z-10 flex flex-col gap-6 px-5 py-6 sm:px-7 lg:px-10">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex flex-1 flex-wrap items-center gap-4">
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-slate-500 shadow-inner transition hover:-translate-y-0.5 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 lg:hidden"
                @click="$emit('toggle-sidebar')"
                aria-label="Buka navigasi"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.75h16.5M3.75 12h16.5m-16.5 6.25h16.5" />
                </svg>
              </button>
              <div class="space-y-2">
                <span class="nova-chip text-sky-500">Luminara Control Center</span>
                <div class="space-y-1">
                  <p class="text-lg font-semibold text-slate-900 dark:text-white">
                    {{ greeting }}, {{ user?.nama ?? 'Administrator' }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ formattedDate }}</p>
                </div>
              </div>
              <div class="ml-0 flex flex-wrap gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500 sm:ml-6">
                <span class="inline-flex items-center gap-2 rounded-full border border-sky-200/50 bg-sky-50/80 px-3 py-1 text-sky-600 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
                  <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                  {{ atlasSummary.active }} aktif
                </span>
                <span class="inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/70 px-3 py-1 text-amber-600 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200">
                  onboarding {{ atlasSummary.onboarding }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <div class="relative hidden items-center gap-3 rounded-full border border-white/65 bg-white/80 px-4 py-2 text-sm text-slate-500 shadow-inner transition hover:-translate-y-0.5 hover:border-sky-300/70 hover:text-sky-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 lg:flex">
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
                class="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/85 text-slate-500 shadow-inner transition hover:-translate-y-0.5 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
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
          <div class="nova-divider"></div>
          <div class="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
            <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div
                v-for="tile in heroTiles"
                :key="tile.id"
                class="group relative overflow-hidden rounded-[24px] border border-white/60 bg-white/85 p-4 text-sm shadow-[0_18px_55px_-48px_rgba(15,23,42,0.5)] transition hover:-translate-y-1 hover:border-sky-300/70 hover:text-sky-600 dark:border-white/10 dark:bg-white/10"
              >
                <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div :class="['absolute inset-0 rounded-[24px]', tile.overlay]"></div>
                </div>
                <div class="relative space-y-3">
                  <p class="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                    {{ tile.label }}
                  </p>
                  <p class="text-2xl font-semibold text-slate-900 transition group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-200">
                    {{ tile.value }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ tile.caption }}</p>
                  <span class="nova-badge">{{ tile.delta }}</span>
                </div>
              </div>
            </div>
            <div class="nova-panel overflow-hidden p-5 text-sm">
              <div class="pointer-events-none absolute inset-0 opacity-80">
                <div class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-sky-200/40 via-transparent to-transparent dark:from-sky-500/20"></div>
              </div>
              <div class="relative space-y-5">
                <div class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                  <span>Ritme tim</span>
                  <span>Realtime</span>
                </div>
                <div class="grid gap-3">
                  <div
                    v-for="segment in rhythmSegments"
                    :key="segment.id"
                    class="nova-card flex items-center justify-between gap-4 rounded-[22px] border border-white/70 bg-white/80 px-4 py-3 text-xs font-medium text-slate-500 transition hover:-translate-y-0.5 hover:border-sky-300/70 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                  >
                    <div class="flex items-center gap-3">
                      <span class="nova-icon-sm text-base font-semibold text-sky-500 dark:text-sky-200">{{ segment.code }}</span>
                      <div class="space-y-1">
                        <p class="text-sm font-semibold text-slate-800 dark:text-white">{{ segment.title }}</p>
                        <p>{{ segment.subtitle }}</p>
                      </div>
                    </div>
                    <div class="text-right text-[0.7rem] uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                      <p>{{ segment.progress }}</p>
                      <p class="mt-1 text-xs font-semibold text-sky-500 dark:text-sky-200">{{ segment.note }}</p>
                    </div>
                  </div>
                </div>
                <div class="nova-divider"></div>
                <div class="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    {{ atlasSummary.wellbeingAverage }} indeks wellbeing
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-rose-500"></span>
                    {{ atlasSummary.highRisk }} risiko tinggi
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
  let highRisk = 0;
  let wellbeingTotal = 0;
  for (const entry of employeeAtlas) {
    if (entry.status === 'Aktif') active += 1;
    if (entry.status === 'Onboarding') onboarding += 1;
    if (entry.riskLevel === 'Tinggi') highRisk += 1;
    wellbeingTotal += entry.wellbeingScore;
  }
  const wellbeingAverage = Math.round(wellbeingTotal / employeeAtlas.length);
  return { active, onboarding, highRisk, wellbeingAverage };
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
    id: 'presence',
    label: 'Rasio hadir',
    value: '98,6%',
    caption: 'Site Kalimantan & Sulawesi',
    delta: '+0,6%',
    overlay: 'bg-gradient-to-br from-sky-100/40 via-transparent to-emerald-100/35 dark:from-sky-500/15 dark:to-emerald-500/15'
  },
  {
    id: 'training',
    label: 'Jam pelatihan',
    value: '1.842 jam',
    caption: 'Akumulasi Q3 seluruh lokasi',
    delta: '12 sesi aktif',
    overlay: 'bg-gradient-to-br from-indigo-100/35 via-transparent to-sky-100/30 dark:from-indigo-500/15 dark:to-sky-500/15'
  },
  {
    id: 'contract',
    label: 'Kontrak jatuh tempo',
    value: '24 pegawai',
    caption: 'Perlu perpanjangan 30 hari ke depan',
    delta: 'Prioritas',
    overlay: 'bg-gradient-to-br from-amber-100/35 via-transparent to-rose-100/30 dark:from-amber-500/15 dark:to-rose-500/15'
  },
  {
    id: 'engagement',
    label: 'Skor engagement',
    value: '88 / 100',
    caption: 'Pulse survei mingguan',
    delta: '+4,1 poin',
    overlay: 'bg-gradient-to-br from-emerald-100/35 via-transparent to-teal-100/30 dark:from-emerald-500/15 dark:to-teal-500/15'
  }
]);

const rhythmSegments = computed(() => [
  {
    id: 'onboarding',
    code: 'OB',
    title: 'Onboarding site baru',
    subtitle: 'Balikpapan & Kutai siap peluncuran',
    progress: '76%',
    note: '8 modul'
  },
  {
    id: 'compliance',
    code: 'CP',
    title: 'Audit kepatuhan dokumen',
    subtitle: 'Triwulan berjalan',
    progress: '91%',
    note: 'Zona hijau'
  },
  {
    id: 'development',
    code: 'DV',
    title: 'Percepatan kompetensi',
    subtitle: 'Supervisor lapangan batch 3',
    progress: '64%',
    note: '3 site fokus'
  }
]);
</script>
