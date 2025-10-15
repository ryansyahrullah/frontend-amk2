<template>
  <div class="space-y-12 text-slate-700 transition-colors duration-500 dark:text-slate-200">
    <section class="grid gap-8 2xl:grid-cols-[1.6fr_1fr]">
      <div class="nova-shell overflow-hidden p-8">
        <div class="pointer-events-none absolute inset-0 opacity-80">
          <div class="absolute -left-32 top-0 h-56 w-56 rounded-full bg-sky-200/45 blur-[200px] dark:bg-sky-500/25"></div>
          <div class="absolute -right-20 bottom-[-35%] h-64 w-64 rounded-full bg-emerald-200/45 blur-[220px] dark:bg-purple-500/25"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-white/80 via-white/30 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/0"></div>
        </div>
        <div class="relative space-y-8">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <span class="nova-chip text-sky-500">Orbit kendali SDM</span>
            <span class="text-xs text-slate-400 dark:text-slate-500">Terakhir diperbarui {{ formattedRefresh }}</span>
          </div>
          <div class="space-y-4">
            <h1 class="text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
              Command center PT Anugerah Mitra Kalimantan
            </h1>
            <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-300">
              Pantau {{ atlasDigest.total }} pegawai aktif lintas {{ locationLeaders.length }} site dengan highlight kesiapan {{ atlasDigest.readinessAverage }}%, wellbeing {{ atlasDigest.wellbeingAverage }}/100, dan pipeline talenta unggulan siap akselerasi.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <Button
              class="nova-glass-button nova-sheen rounded-full border border-sky-300/50 bg-white/90 px-6 py-2 text-sm font-semibold text-sky-600 hover:text-sky-600 dark:border-sky-500/30 dark:bg-white/10 dark:text-sky-200"
              @click="refreshData"
            >
              Segarkan data
            </Button>
            <RouterLink to="/pegawai" class="inline-flex">
              <Button class="nova-glass-button nova-sheen rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_28px_80px_-50px_rgba(14,116,144,0.65)] hover:opacity-95">
                Kelola pegawai
              </Button>
            </RouterLink>
            <RouterLink to="/pegawai/pengajuan-cuti" class="inline-flex">
              <Button class="nova-glass-button rounded-full border border-white/60 bg-white/90 px-6 py-2 text-sm font-semibold text-slate-600 hover:text-sky-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                Pantau cuti
              </Button>
            </RouterLink>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <div
              v-for="item in heroMomentum"
              :key="item.label"
              class="group relative overflow-hidden rounded-[24px] border border-white/60 bg-white/85 p-4 text-sm shadow-[0_26px_70px_-58px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:border-sky-300/70 hover:text-sky-600 dark:border-white/10 dark:bg-white/10"
            >
              <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div class="absolute inset-0 rounded-[24px] bg-gradient-to-br from-sky-100/35 via-transparent to-emerald-100/30 dark:from-sky-500/15 dark:to-emerald-500/15"></div>
              </div>
              <div class="relative space-y-2">
                <p class="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">{{ item.label }}</p>
                <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ item.value }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.caption }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <div class="nova-panel overflow-hidden p-6 text-sm">
          <div class="pointer-events-none absolute inset-0 opacity-70">
            <div class="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-sky-200/40 via-transparent to-transparent dark:from-sky-500/20"></div>
          </div>
          <div class="relative space-y-5">
            <div class="nova-section-title">
              <span>Pulse harian</span>
              <span>Realtime</span>
            </div>
            <div class="grid gap-3">
              <div
                v-for="signal in missionPulse"
                :key="signal.id"
                class="flex items-center justify-between gap-4 rounded-[22px] border border-white/70 bg-white/85 px-4 py-3 text-xs text-slate-500 shadow-inner transition hover:-translate-y-0.5 hover:border-sky-300/70 hover:text-sky-600 dark:border-white/10 dark:bg-white/10"
              >
                <div class="flex items-center gap-3">
                  <span class="nova-icon-sm text-base font-semibold text-sky-500 dark:text-sky-200">{{ signal.code }}</span>
                  <div class="space-y-1">
                    <p class="text-sm font-semibold text-slate-800 dark:text-white">{{ signal.title }}</p>
                    <p>{{ signal.subtitle }}</p>
                  </div>
                </div>
                <div class="text-right text-[0.7rem] uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
                  <p>{{ signal.value }}</p>
                  <p class="mt-1 text-xs font-semibold text-sky-500 dark:text-sky-200">{{ signal.status }}</p>
                </div>
              </div>
            </div>
            <div class="rounded-[20px] border border-dashed border-white/70 p-4 text-xs leading-relaxed text-slate-500 dark:border-white/10 dark:text-slate-400">
              Fokuskan coaching pada tim dengan readiness di bawah 60% dan jadwalkan sesi check-in untuk kru rotasi terbaru.
            </div>
          </div>
        </div>
        <div class="nova-panel p-6 text-sm">
          <div class="nova-section-title">
            <span>Jalur cepat</span>
            <span>Pilih modul</span>
          </div>
          <div class="mt-4 space-y-3">
            <RouterLink
              v-for="action in quickActions"
              :key="action.id"
              :to="action.to"
              class="group flex items-center gap-3 rounded-[22px] border border-white/70 bg-white/85 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-sky-50 hover:text-sky-600 dark:border-white/10 dark:bg-white/10"
            >
              <span class="nova-icon-sm border border-white/70 bg-white/85 text-sky-500 transition group-hover:border-transparent group-hover:bg-sky-500/15 group-hover:text-sky-600 dark:border-white/10 dark:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="action.icon" />
                </svg>
              </span>
              <div class="flex-1">
                <p class="font-semibold text-slate-700 transition group-hover:text-sky-600 dark:text-slate-100">{{ action.label }}</p>
                <p class="text-xs text-slate-500 transition group-hover:text-sky-400 dark:text-slate-400">{{ action.description }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-300 transition group-hover:text-sky-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-4">
      <CardStat
        title="Total pegawai"
        :value="atlasDigest.total"
        description="Termasuk kru site dan tim kantor pusat."
        variant="primary"
        :trend-value="`+${atlasDigest.onboarding} onboarding`"
        trend-label="gelombang onboarding"
      />
      <CardStat
        title="Readiness rata-rata"
        :value="`${atlasDigest.readinessAverage}%`"
        description="Index kesiapan promosi seluruh pegawai."
        variant="emerald"
        :trend-value="`+${atlasDigest.onboarding > 0 ? 4 : 2} pts`"
      />
      <CardStat
        title="Kinerja rata-rata"
        :value="`${atlasDigest.performanceAverage}/100`"
        description="Rerata skor performa triwulan berjalan."
        variant="indigo"
        :trend-value="'+3,2%'"
      />
      <CardStat
        title="Kontrak perlu aksi"
        :value="atlasDigest.contractWindow"
        description="Readiness < 55% menandakan kontrak perlu pemantauan."
        variant="rose"
        :trend-value="`${atlasDigest.contractWindow > 18 ? '+' : '-'}${Math.abs(atlasDigest.contractWindow - 18)} vs target`"
        :trend-positive="atlasDigest.contractWindow <= 18"
      />
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
      <div class="nova-panel p-6">
        <div class="nova-section-title">
          <span>Distribusi lokasi</span>
          <span>Aktif {{ atlasDigest.active }}</span>
        </div>
        <div class="mt-5 space-y-4">
          <div
            v-for="location in locationLeaders"
            :key="location.location"
            class="rounded-[22px] border border-white/70 bg-white/85 p-4 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="font-semibold text-slate-800 dark:text-white">{{ location.location }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ location.total }} pegawai • {{ location.activePercent }}% aktif</p>
              </div>
              <span class="nova-pill text-[0.68rem] font-semibold text-sky-600 dark:text-sky-200">{{ location.total }} kru</span>
            </div>
            <div class="mt-3 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
              <div
                class="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500"
                :style="{ width: `${location.activePercent}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="nova-panel p-6">
        <div class="nova-section-title">
          <span>Talenta unggulan</span>
          <span>{{ topPotential.length }} kandidat</span>
        </div>
        <div class="mt-5 space-y-3">
          <div
            v-for="talent in topPotential"
            :key="talent.id"
            class="flex items-center justify-between gap-3 rounded-[20px] border border-white/70 bg-white/85 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-sky-300/70 dark:border-white/10 dark:bg-white/10"
          >
            <div>
              <p class="font-semibold text-slate-800 dark:text-white">{{ talent.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ talent.division }} • {{ talent.location }}</p>
            </div>
            <div class="text-right text-xs text-slate-500 dark:text-slate-400">
              <p>Perf {{ talent.performanceScore }}</p>
              <p>Pot {{ talent.potentialScore }}</p>
            </div>
          </div>
        </div>
        <div class="mt-6 rounded-[20px] border border-dashed border-white/70 p-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
          Jadwalkan forum akselerasi untuk talenta dengan skor potensi ≥ 92 guna mengisi kebutuhan supervisor baru.
        </div>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <div class="nova-panel p-6">
        <div class="nova-section-title">
          <span>Alert risiko</span>
          <span>{{ riskAlerts.length }} pegawai</span>
        </div>
        <div class="mt-4 space-y-3">
          <div
            v-for="alert in riskAlerts"
            :key="alert.id"
            class="flex items-center justify-between gap-3 rounded-[22px] border border-white/70 bg-white/85 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-rose-300/60 dark:border-white/10 dark:bg-white/10"
          >
            <div>
              <p class="font-semibold text-slate-800 dark:text-white">{{ alert.name }}</p>
              <p class="text-xs text-rose-500 dark:text-rose-300">{{ alert.division }} • {{ alert.location }}</p>
            </div>
            <div class="text-right text-xs text-slate-500 dark:text-slate-400">
              <p>Risk: {{ alert.riskLevel }}</p>
              <p>Readiness {{ alert.readinessIndex }}%</p>
            </div>
          </div>
        </div>
        <div class="mt-6 rounded-[20px] border border-dashed border-rose-200/70 p-4 text-xs text-rose-500 dark:border-rose-500/30 dark:text-rose-300">
          Prioritaskan coaching dan sesi wellbeing untuk kru dengan readiness di bawah 55% agar kontrak tetap stabil.
        </div>
      </div>
      <div class="nova-panel p-6">
        <div class="nova-section-title">
          <span>Pulsa wellbeing</span>
          <span>Skor {{ atlasDigest.wellbeingAverage }}/100</span>
        </div>
        <div class="mt-4 grid gap-3 text-sm">
          <div
            v-for="point in wellbeingTrend"
            :key="point.month"
            class="flex items-center gap-4 rounded-[22px] border border-white/70 bg-white/85 px-4 py-3 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
          >
            <span class="nova-pill text-[0.68rem] font-semibold text-sky-600 dark:text-sky-200">{{ point.month }}</span>
            <div class="flex-1">
              <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Pulse score</span>
                <span>{{ point.value }}</span>
              </div>
              <div class="mt-2 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
                <div class="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" :style="{ width: `${point.value}%` }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 rounded-[20px] border border-white/70 bg-white/85 p-4 text-xs leading-relaxed text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
          Program wellbeing digital menargetkan peningkatan indeks ke {{ Math.min(100, atlasDigest.wellbeingAverage + 4) }}/100 pada kuartal berikutnya.
        </div>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-3">
      <div class="nova-panel p-6">
        <div class="nova-section-title">
          <span>Program strategis</span>
          <span>Triwulan</span>
        </div>
        <div class="mt-5 space-y-4">
          <div
            v-for="program in missionPrograms"
            :key="program.id"
            class="rounded-[22px] border border-white/70 bg-white/85 p-4 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
          >
            <div class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
              <span>{{ program.owner }}</span>
              <span>{{ program.window }}</span>
            </div>
            <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{{ program.title }}</p>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ program.caption }}</p>
            <div class="mt-3 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
              <div class="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500" :style="{ width: `${program.progress}%` }"></div>
            </div>
            <p class="mt-2 text-xs font-semibold text-sky-500 dark:text-sky-300">{{ program.progress }}% selesai • {{ program.status }}</p>
          </div>
        </div>
      </div>
      <div class="nova-panel p-6">
        <div class="nova-section-title">
          <span>Quick wins</span>
          <span>Status</span>
        </div>
        <div class="mt-5 space-y-3">
          <div
            v-for="item in quickWins"
            :key="item.id"
            class="flex items-center justify-between gap-4 rounded-[22px] border border-white/70 bg-white/85 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-emerald-300/60 dark:border-white/10 dark:bg-white/10"
          >
            <div>
              <p class="font-semibold text-slate-800 dark:text-white">{{ item.title }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.caption }}</p>
            </div>
            <span class="nova-pill text-xs font-semibold text-emerald-600 dark:text-emerald-200">{{ item.status }}</span>
          </div>
        </div>
      </div>
      <div class="nova-panel p-6">
        <div class="nova-section-title">
          <span>Momentum tim</span>
          <span>Pembaruan internal</span>
        </div>
        <div class="mt-5 space-y-4">
          <div
            v-for="moment in engagementMoments"
            :key="moment.id"
            class="rounded-[22px] border border-white/70 bg-white/85 p-4 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
          >
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{{ moment.date }}</span>
              <span class="nova-pill text-[0.6rem] tracking-[0.3em] text-slate-400 dark:text-slate-500">{{ moment.type }}</span>
            </div>
            <p class="mt-2 text-sm font-semibold text-slate-800 dark:text-white">{{ moment.title }}</p>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ moment.summary }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Button from '../components/Button.vue';
import CardStat from '../components/CardStat.vue';
import { employeeAtlas } from '../data/employeeAtlas';

const atlasDigest = (() => {
  const locationCount = new Map<string, { total: number; active: number }>();
  const highPotential: typeof employeeAtlas[number][] = [];
  const riskHigh: typeof employeeAtlas[number][] = [];
  let active = 0;
  let onboarding = 0;
  let rotations = 0;
  let contractWindow = 0;
  let wellbeingTotal = 0;
  let performanceTotal = 0;
  let potentialTotal = 0;
  let readinessTotal = 0;

  for (const entry of employeeAtlas) {
    let location = locationCount.get(entry.location);
    if (!location) {
      location = { total: 0, active: 0 };
      locationCount.set(entry.location, location);
    }
    location.total += 1;
    if (entry.status === 'Aktif') {
      active += 1;
      location.active += 1;
    }
    if (entry.status === 'Onboarding') {
      onboarding += 1;
    }
    if (entry.status === 'Rotasi' || entry.status === 'Mutasi') {
      rotations += 1;
    }
    if (entry.readinessIndex <= 55) {
      contractWindow += 1;
    }
    if (entry.potentialScore >= 90 && entry.performanceScore >= 90) {
      highPotential.push(entry);
    }
    if (entry.riskLevel === 'Tinggi') {
      riskHigh.push(entry);
    }
    wellbeingTotal += entry.wellbeingScore;
    performanceTotal += entry.performanceScore;
    potentialTotal += entry.potentialScore;
    readinessTotal += entry.readinessIndex;
  }

  const total = employeeAtlas.length || 1;

  return {
    total: employeeAtlas.length,
    active,
    onboarding,
    rotations,
    contractWindow,
    wellbeingAverage: Math.round(wellbeingTotal / total),
    performanceAverage: Math.round(performanceTotal / total),
    potentialAverage: Math.round(potentialTotal / total),
    readinessAverage: Math.round(readinessTotal / total),
    locationCount,
    highPotential,
    riskHigh
  };
})();

const lastRefresh = ref(new Date());
const formattedRefresh = computed(() =>
  lastRefresh.value.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
);

const refreshData = () => {
  lastRefresh.value = new Date();
};

const heroMomentum = computed(() => [
  {
    label: 'Pegawai aktif',
    value: atlasDigest.active,
    caption: 'Termasuk kru lapangan dan kantor pusat.'
  },
  {
    label: 'Onboarding',
    value: atlasDigest.onboarding,
    caption: 'Gelombang orientasi site baru bulan ini.'
  },
  {
    label: 'Readiness',
    value: `${atlasDigest.readinessAverage}%`,
    caption: 'Index kesiapan promosi triwulan berjalan.'
  }
]);

const missionPulse = computed(() => [
  { id: 'absensi', code: 'AB', title: 'Absensi realtime', subtitle: 'Site Kalimantan Timur', value: '98,6%', status: 'Stabil' },
  { id: 'pelatihan', code: 'TR', title: 'Pelatihan aktif', subtitle: 'Supervisor batch 3', value: '12 sesi', status: 'Berjalan' },
  { id: 'kontrak', code: 'CT', title: 'Kontrak due', subtitle: '30 hari ke depan', value: `${atlasDigest.contractWindow}`, status: 'Pantau' }
]);

const quickActions = computed(() => [
  {
    id: 'pegawai',
    label: 'Kelola data pegawai',
    description: 'Perbarui biodata dan status kontrak.',
    to: '/pegawai',
    icon: 'M4.5 6h15M4.5 12h15M4.5 18h10'
  },
  {
    id: 'cuti',
    label: 'Setujui cuti',
    description: 'Pantau pengajuan cuti terbaru.',
    to: '/pegawai/pengajuan-cuti',
    icon: 'M4.5 8.25h15m-15 4.5h15m-15 4.5H12'
  },
  {
    id: 'kontrak',
    label: 'Review kontrak',
    description: 'Kontrak mendekati jatuh tempo.',
    to: '/pegawai/buat-kontrak',
    icon: 'M6 7.5h12M6 12h12m-12 4.5h7.5'
  }
]);

const locationLeaders = computed(() =>
  Array.from(atlasDigest.locationCount.entries())
    .map(([location, stats]) => ({
      location,
      total: stats.total,
      activePercent: stats.total ? Math.round((stats.active / stats.total) * 100) : 0
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)
);

const topPotential = computed(() =>
  [...atlasDigest.highPotential]
    .sort((a, b) => b.potentialScore + b.performanceScore - (a.potentialScore + a.performanceScore))
    .slice(0, 6)
);

const riskAlerts = computed(() =>
  [...atlasDigest.riskHigh]
    .sort((a, b) => a.readinessIndex - b.readinessIndex)
    .slice(0, 6)
);

const wellbeingTrend = computed(() => {
  const base = atlasDigest.wellbeingAverage;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
  return months.map((month, index) => ({
    month,
    value: Math.min(100, Math.max(55, base + (index - 3) * 2 + (index % 2 === 0 ? 3 : -2)))
  }));
});

const missionPrograms = computed(() => [
  {
    id: 'academy',
    title: 'Supervisor academy',
    caption: 'Mempercepat kompetensi supervisor site Balikpapan.',
    owner: 'HC Learning',
    window: 'Q3 2024',
    progress: Math.min(100, atlasDigest.readinessAverage + 8),
    status: 'On track'
  },
  {
    id: 'talent360',
    title: 'Talent 360 review',
    caption: 'Evaluasi talenta berpotensi tinggi lintas lokasi.',
    owner: 'HC Strategi',
    window: 'Jul - Agu',
    progress: Math.min(100, atlasDigest.potentialAverage),
    status: 'In progress'
  },
  {
    id: 'digital',
    title: 'Digital wellbeing',
    caption: 'Peluncuran modul wellbeing digital untuk kru site.',
    owner: 'HC Experience',
    window: 'Agu - Sep',
    progress: Math.min(100, atlasDigest.wellbeingAverage - 5),
    status: 'Plan'
  }
]);

const quickWins = computed(() => [
  { id: 'geotag', title: 'Geotag absensi', caption: 'Aktif di 5 lokasi prioritas.', status: 'Live' },
  { id: 'mentor', title: 'Mentor pairing', caption: 'Supervisor senior mendampingi kru baru.', status: 'Berjalan' },
  { id: 'portal', title: 'Portal kontrak digital', caption: 'Dokumen dapat ditandatangani elektronik.', status: 'Beta' }
]);

const engagementMoments = computed(() => {
  const baseDate = new Date();
  return topPotential.value.slice(0, 3).map((talent, index) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - index * 2);
    return {
      id: talent.id,
      date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      type: index === 0 ? 'Coaching' : index === 1 ? 'Townhall' : 'Workshop',
      title: `${talent.name} siap mengisi peran baru`,
      summary: `${talent.division} • readiness ${talent.readinessIndex}%`
    };
  });
});
</script>
