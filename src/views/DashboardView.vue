<template>
  <div class="space-y-12 text-slate-700 transition-colors duration-500 dark:text-slate-200">
    <section class="grid gap-8 2xl:grid-cols-[1.7fr_1fr]">
      <div class="aether-shell overflow-hidden p-8">
        <div class="pointer-events-none absolute inset-0 opacity-80">
          <div class="absolute -left-32 top-0 h-56 w-56 rounded-full bg-indigo-200/45 blur-[220px] dark:bg-indigo-500/20"></div>
          <div class="absolute -right-20 bottom-[-35%] h-64 w-64 rounded-full bg-sky-200/45 blur-[240px] dark:bg-purple-500/20"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/10 dark:from-white/10 dark:via-white/5 dark:to-white/0"></div>
        </div>
        <div class="relative space-y-8">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <span class="aether-chip text-indigo-500">Navigator Peopleverse</span>
            <span class="text-xs text-slate-400 dark:text-slate-500">Terakhir diperbarui {{ formattedRefresh }}</span>
          </div>
          <div class="space-y-4">
            <h1 class="text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
              Komando Aetheria PT Anugerah Mitra Kalimantan
            </h1>
            <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-300">
              Pantau {{ digest.total.toLocaleString('id-ID') }} kru aktif lintas {{ locationLeaders.length }} lokasi dengan readiness rata-rata {{ digest.readinessAverage }}%, wellbeing {{ digest.wellbeingAverage }}/100, dan pipeline talenta unggulan siap akselerasi.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <Button
              class="aether-glass-button aether-sheen rounded-full border border-indigo-200/60 bg-white/90 px-6 py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-600 dark:border-indigo-500/20 dark:bg-white/10 dark:text-indigo-200"
              @click="refreshData"
            >
              Segarkan data
            </Button>
            <RouterLink to="/pegawai" class="inline-flex">
              <Button class="aether-glass-button rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_32px_90px_-60px_rgba(59,130,246,0.65)] hover:opacity-95">
                Kelola pegawai
              </Button>
            </RouterLink>
            <RouterLink to="/pelatihan" class="inline-flex">
              <Button class="aether-glass-button rounded-full border border-white/70 bg-white/85 px-6 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                Modul pengembangan
              </Button>
            </RouterLink>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <div
              v-for="item in heroTrajectory"
              :key="item.id"
              class="group relative overflow-hidden rounded-[24px] border border-white/65 bg-white/80 p-4 text-sm shadow-[0_32px_90px_-60px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:border-indigo-300/60 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10"
            >
              <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div :class="['absolute inset-0 rounded-[24px]', item.overlay]"></div>
              </div>
              <div class="relative space-y-3">
                <p class="text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-slate-400 dark:text-slate-500">{{ item.label }}</p>
                <p class="text-2xl font-semibold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-sky-200">{{ item.value }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.caption }}</p>
                <div class="mt-2 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
                  <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" :style="{ width: item.meter }"></div>
                </div>
                <span class="aether-badge">{{ item.delta }}</span>
              </div>
            </div>
          </div>
          <div class="rounded-[24px] border border-white/65 bg-white/80 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
            <p class="font-semibold text-slate-700 dark:text-white">Program unggulan</p>
            <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="program in programHighlights"
                :key="program.name"
                class="rounded-[18px] border border-white/65 bg-white/85 p-3 transition hover:-translate-y-0.5 hover:border-indigo-300/60 dark:border-white/10 dark:bg-white/10"
              >
                <p class="text-xs font-semibold text-slate-700 dark:text-white">{{ program.name }}</p>
                <p class="mt-1 text-[0.68rem] text-slate-400">{{ program.count.toLocaleString('id-ID') }} peserta</p>
                <div class="mt-2 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
                  <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" :style="{ width: `${program.share}%` }"></div>
                </div>
                <p class="mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-slate-400">{{ program.share }}% populasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <div class="aether-panel overflow-hidden p-6 text-sm">
          <div class="pointer-events-none absolute inset-0 opacity-70">
            <div class="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-indigo-200/40 via-transparent to-transparent dark:from-indigo-500/20"></div>
          </div>
          <div class="relative space-y-5">
            <div class="aether-section-title">
              <span>Pulse harian</span>
              <span>Realtime</span>
            </div>
            <div class="grid gap-3">
              <div
                v-for="signal in missionPulse"
                :key="signal.id"
                class="flex items-center justify-between gap-4 rounded-[22px] border border-white/65 bg-white/80 px-4 py-3 text-xs text-slate-500 shadow-inner transition hover:-translate-y-0.5 hover:border-indigo-300/60 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10"
              >
                <div class="flex items-center gap-3">
                  <span class="aether-icon-sm text-base font-semibold text-indigo-500 dark:text-indigo-200">{{ signal.code }}</span>
                  <div class="space-y-1">
                    <p class="text-sm font-semibold text-slate-800 dark:text-white">{{ signal.title }}</p>
                    <p>{{ signal.subtitle }}</p>
                  </div>
                </div>
                <div class="text-right text-[0.7rem] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                  <p>{{ signal.value }}</p>
                  <p class="mt-1 text-xs font-semibold text-indigo-500 dark:text-indigo-200">{{ signal.status }}</p>
                </div>
              </div>
            </div>
            <div class="rounded-[20px] border border-dashed border-white/65 p-4 text-xs leading-relaxed text-slate-500 dark:border-white/10 dark:text-slate-400">
              Fokuskan coaching pada kru readiness di bawah 60% dan jadwalkan sesi check-in untuk batch onboarding terbaru.
            </div>
          </div>
        </div>
        <div class="aether-panel p-6 text-sm">
          <div class="aether-section-title">
            <span>Jalur cepat</span>
            <span>Pilih modul</span>
          </div>
          <div class="mt-4 space-y-3">
            <RouterLink
              v-for="action in quickActions"
              :key="action.id"
              :to="action.to"
              class="group flex items-center gap-3 rounded-[22px] border border-white/65 bg-white/80 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-indigo-300/60 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10"
            >
              <span class="aether-icon-sm border border-white/65 bg-white/85 text-indigo-500 transition group-hover:border-transparent group-hover:bg-indigo-500/15 group-hover:text-indigo-600 dark:border-white/10 dark:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="action.icon" />
                </svg>
              </span>
              <div class="flex-1">
                <p class="font-semibold text-slate-700 transition group-hover:text-indigo-500 dark:text-slate-100">{{ action.label }}</p>
                <p class="text-xs text-slate-500 transition group-hover:text-indigo-400 dark:text-slate-400">{{ action.description }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-300 transition group-hover:text-indigo-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
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
        :value="digest.total.toLocaleString('id-ID')"
        description="Termasuk kru site dan kantor pusat."
        variant="primary"
        :trend-value="`+${digest.onboarding} onboarding`"
        trend-label="gelombang onboarding"
      />
      <CardStat
        title="Readiness rata-rata"
        :value="`${digest.readinessAverage}%`"
        description="Index kesiapan promosi seluruh pegawai."
        variant="emerald"
        :trend-value="`${digest.contractWindow > 18 ? '+' : '-'}${Math.abs(digest.contractWindow - 18)} vs target`"
        :trend-positive="digest.contractWindow <= 18"
      />
      <CardStat
        title="Kinerja rata-rata"
        :value="`${digest.performanceAverage}/100`"
        description="Rerata skor performa triwulan berjalan."
        variant="indigo"
        :trend-value="digest.performanceAverage >= 85 ? '+3,4%' : '+1,2%'"
      />
      <CardStat
        title="Wellbeing kru"
        :value="`${digest.wellbeingAverage}/100`"
        description="Pulse energi kru lintas lokasi."
        variant="rose"
        :trend-value="digest.wellbeingAverage >= 78 ? '+prima' : '+perlu boost'"
        :trend-positive="digest.wellbeingAverage >= 70"
      />
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <div class="aether-panel p-6">
        <div class="aether-section-title">
          <span>Distribusi lokasi</span>
          <span>Aktif {{ digest.active.toLocaleString('id-ID') }}</span>
        </div>
        <div class="mt-5 space-y-4">
          <div
            v-for="location in locationLeaders"
            :key="location.location"
            class="rounded-[22px] border border-white/65 bg-white/80 p-4 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="font-semibold text-slate-800 dark:text-white">{{ location.location }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ location.total }} pegawai • {{ location.activePercent }}% aktif</p>
              </div>
              <span class="aether-pill text-[0.68rem] font-semibold text-indigo-600 dark:text-indigo-200">Wellbeing {{ location.wellbeing }}/100</span>
            </div>
            <div class="mt-3 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10">
              <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" :style="{ width: `${location.activePercent}%` }"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="aether-panel p-6">
        <div class="aether-section-title">
          <span>Talenta unggulan</span>
          <span>{{ topPotential.length }} kandidat</span>
        </div>
        <div class="mt-5 space-y-3">
          <div
            v-for="talent in topPotential"
            :key="talent.id"
            class="flex items-center justify-between gap-3 rounded-[20px] border border-white/65 bg-white/80 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-indigo-300/60 dark:border-white/10 dark:bg-white/10"
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
        <div class="mt-6 rounded-[20px] border border-dashed border-white/65 p-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
          Jadwalkan forum akselerasi untuk talenta dengan skor potensi ≥ 92 guna mengisi kebutuhan supervisor baru.
        </div>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-3">
      <div class="aether-panel p-6">
        <div class="aether-section-title">
          <span>Alert risiko</span>
          <span>{{ riskAlerts.length }} pegawai</span>
        </div>
        <div class="mt-4 space-y-3">
          <div
            v-for="alert in riskAlerts"
            :key="alert.id"
            class="flex items-center justify-between gap-3 rounded-[22px] border border-white/65 bg-white/80 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-rose-300/60 dark:border-white/10 dark:bg-white/10"
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
      <div class="aether-panel p-6">
        <div class="aether-section-title">
          <span>Stream pengembangan</span>
          <span>Jam rata-rata</span>
        </div>
        <div class="mt-4 space-y-3">
          <div
            v-for="stream in learningStreams"
            :key="stream.division"
            class="flex items-center justify-between gap-3 rounded-[22px] border border-white/65 bg-white/80 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-emerald-300/60 dark:border-white/10 dark:bg-white/10"
          >
            <div>
              <p class="font-semibold text-slate-800 dark:text-white">{{ stream.division }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ stream.participants }} peserta</p>
            </div>
            <span class="aether-pill text-xs font-semibold text-emerald-600 dark:text-emerald-200">{{ stream.avgHours }} jam</span>
          </div>
        </div>
        <div class="mt-6 rounded-[20px] border border-white/65 bg-white/80 p-4 text-xs leading-relaxed text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
          Program learning sprint fokus pada divisi dengan rata-rata jam pelatihan di bawah 24 jam untuk mengejar standar tahun ini.
        </div>
      </div>
      <div class="aether-panel p-6">
        <div class="aether-section-title">
          <span>Momentum tim</span>
          <span>Pembaruan internal</span>
        </div>
        <div class="mt-5 space-y-4">
          <div
            v-for="moment in engagementMoments"
            :key="moment.id"
            class="rounded-[22px] border border-white/65 bg-white/80 p-4 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
          >
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{{ moment.date }}</span>
              <span class="aether-pill text-[0.6rem] tracking-[0.3em] text-slate-400 dark:text-slate-500">{{ moment.type }}</span>
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

const atlasMatrix = computed(() => {
  const locationMap = new Map<string, { total: number; active: number; wellbeing: number }>();
  const programMap = new Map<string, number>();
  const divisionTraining = new Map<string, { hours: number; participants: number }>();
  const topPotential: typeof employeeAtlas[number][] = [];
  const riskAlerts: typeof employeeAtlas[number][] = [];

  let total = 0;
  let active = 0;
  let onboarding = 0;
  let rotation = 0;
  let contractWindow = 0;
  let readinessTotal = 0;
  let performanceTotal = 0;
  let wellbeingTotal = 0;
  let engagementTotal = 0;
  let leadershipTotal = 0;

  for (const entry of employeeAtlas) {
    total += 1;
    if (entry.status === 'Aktif') active += 1;
    if (entry.status === 'Onboarding') onboarding += 1;
    if (entry.status === 'Rotasi' || entry.status === 'Mutasi') rotation += 1;
    if (entry.readinessIndex <= 55) contractWindow += 1;

    readinessTotal += entry.readinessIndex;
    performanceTotal += entry.performanceScore;
    wellbeingTotal += entry.wellbeingScore;
    engagementTotal += entry.engagementScore;
    leadershipTotal += entry.leadershipReadiness;

    const loc = locationMap.get(entry.location) ?? { total: 0, active: 0, wellbeing: 0 };
    loc.total += 1;
    if (entry.status === 'Aktif') loc.active += 1;
    loc.wellbeing += entry.wellbeingScore;
    locationMap.set(entry.location, loc);

    const programCount = programMap.get(entry.flagshipProgram) ?? 0;
    programMap.set(entry.flagshipProgram, programCount + 1);

    const division = entry.division;
    const training = divisionTraining.get(division) ?? { hours: 0, participants: 0 };
    training.hours += entry.trainingHours;
    training.participants += 1;
    divisionTraining.set(division, training);

    if (entry.potentialScore >= 85 && entry.readinessIndex >= 60) {
      topPotential.push(entry);
    }
    if (entry.riskLevel === 'Tinggi' || entry.wellbeingScore <= 58) {
      riskAlerts.push(entry);
    }
  }

  const summary = {
    total,
    active,
    onboarding,
    rotation,
    contractWindow,
    readinessAverage: Math.round(readinessTotal / total),
    performanceAverage: Math.round(performanceTotal / total),
    wellbeingAverage: Math.round(wellbeingTotal / total),
    engagementAverage: Math.round(engagementTotal / total),
    leadershipAverage: Math.round(leadershipTotal / total),
    activePercent: total ? Math.round((active / total) * 100) : 0
  };

  const locationLeaders = Array.from(locationMap.entries())
    .map(([location, data]) => ({
      location,
      total: data.total,
      activePercent: data.total ? Math.round((data.active / data.total) * 100) : 0,
      wellbeing: data.total ? Math.round(data.wellbeing / data.total) : 0
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const programEntries = Array.from(programMap.entries()).sort((a, b) => b[1] - a[1]);
  const programHighlights = programEntries.slice(0, 4).map(([name, count]) => ({
    name,
    count,
    share: total ? Math.round((count / total) * 100) : 0
  }));
  const topProgram = programEntries[0]?.[0] ?? 'Accelerate';

  const topPotentialSorted = topPotential
    .sort((a, b) => b.potentialScore - a.potentialScore || b.performanceScore - a.performanceScore)
    .slice(0, 5);

  const riskSignals = riskAlerts
    .sort((a, b) => a.wellbeingScore - b.wellbeingScore || a.readinessIndex - b.readinessIndex)
    .slice(0, 5);

  const trainingStreams = Array.from(divisionTraining.entries())
    .map(([division, data]) => ({
      division,
      avgHours: Math.round((data.hours / data.participants) * 10) / 10,
      participants: data.participants
    }))
    .sort((a, b) => b.avgHours - a.avgHours)
    .slice(0, 5);

  return {
    summary: { ...summary, topProgram },
    locationLeaders,
    topPotential: topPotentialSorted,
    riskSignals,
    trainingStreams,
    programHighlights
  };
});

const digest = computed(() => atlasMatrix.value.summary);
const locationLeaders = computed(() => atlasMatrix.value.locationLeaders);
const topPotential = computed(() => atlasMatrix.value.topPotential);
const riskAlerts = computed(() => atlasMatrix.value.riskSignals);
const learningStreams = computed(() => atlasMatrix.value.trainingStreams);
const programHighlights = computed(() => atlasMatrix.value.programHighlights);

const lastRefresh = ref(new Date());

const formattedRefresh = computed(() =>
  lastRefresh.value.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
);

const refreshData = () => {
  lastRefresh.value = new Date();
};

const heroTrajectory = computed(() => [
  {
    id: 'readiness',
    label: 'Readiness index',
    value: `${digest.value.readinessAverage}%`,
    caption: 'Crew siap akselerasi lintas fungsi.',
    meter: `${Math.min(100, digest.value.readinessAverage)}%`,
    delta: digest.value.contractWindow <= 18 ? '+stabil' : '+perlu atensi',
    overlay: 'bg-gradient-to-br from-indigo-200/35 via-transparent to-emerald-200/25 dark:from-indigo-500/18 dark:to-emerald-500/15'
  },
  {
    id: 'performance',
    label: 'Momentum performa',
    value: `${digest.value.performanceAverage}/100`,
    caption: 'Nilai triwulan berjalan seluruh site.',
    meter: `${Math.min(100, digest.value.performanceAverage)}%`,
    delta: digest.value.performanceAverage >= 85 ? '+prima' : '+monitor',
    overlay: 'bg-gradient-to-br from-sky-200/30 via-transparent to-indigo-200/25 dark:from-sky-500/18 dark:to-indigo-500/15'
  },
  {
    id: 'wellbeing',
    label: 'Pulse wellbeing',
    value: `${digest.value.wellbeingAverage}/100`,
    caption: 'Energi kru site & kantor pusat.',
    meter: `${Math.min(100, digest.value.wellbeingAverage)}%`,
    delta: digest.value.wellbeingAverage >= 78 ? '+energik' : '+perlu boost',
    overlay: 'bg-gradient-to-br from-emerald-200/30 via-transparent to-sky-200/25 dark:from-emerald-500/18 dark:to-sky-500/15'
  }
]);

const missionPulse = computed(() => [
  {
    id: 'presence',
    code: 'PR',
    title: 'Kehadiran kru',
    subtitle: `${digest.value.active.toLocaleString('id-ID')} aktif dari ${digest.value.total.toLocaleString('id-ID')} kru`,
    value: `${digest.value.activePercent}%`,
    status: digest.value.activePercent >= 92 ? 'stabil' : 'pantau'
  },
  {
    id: 'onboard',
    code: 'OB',
    title: 'Batch onboarding',
    subtitle: `${digest.value.topProgram} dominan`,
    value: `${digest.value.onboarding} kru`,
    status: digest.value.onboarding >= 80 ? 'ramai' : 'lancar'
  },
  {
    id: 'risk',
    code: 'RK',
    title: 'Kontrak waspada',
    subtitle: 'Readiness ≤ 55%',
    value: `${digest.value.contractWindow} kru`,
    status: digest.value.contractWindow > 18 ? 'aksi' : 'aman'
  },
  {
    id: 'engage',
    code: 'EG',
    title: 'Keterlibatan',
    subtitle: 'Rerata engagement crew',
    value: `${digest.value.engagementAverage}/100`,
    status: digest.value.engagementAverage >= 78 ? 'tinggi' : 'boost'
  }
]);

const quickActions = [
  {
    id: 'talent',
    label: 'Kelola pipeline talenta',
    description: 'Review readiness dan jadwal akselerasi',
    to: '/talenta',
    icon: 'M11.25 6.75h1.5m-1.5 4.5h1.5m-1.5 4.5h1.5M5.625 5.625l.184 12.003a1.125 1.125 0 0 0 1.12 1.122h10.142a1.125 1.125 0 0 0 1.12-1.122l.184-12.003A1.125 1.125 0 0 0 17.251 4.5H6.749a1.125 1.125 0 0 0-1.124 1.125Z'
  },
  {
    id: 'roster',
    label: 'Atur roster site',
    description: 'Optimalkan rotasi crew lintas lokasi',
    to: '/roster',
    icon: 'M4.5 6h15M4.5 12h15m-15 6h15'
  },
  {
    id: 'coaching',
    label: 'Coaching readiness',
    description: 'Rancang sesi untuk kru risiko tinggi',
    to: '/coaching',
    icon: 'M12 6.75v10.5m5.25-5.25H6.75'
  }
];

const engagementMoments = computed(() => [
  {
    id: 'townhall',
    date: '5 Juni 2024',
    type: 'Townhall',
    title: 'Townhall Kalimantan Timur',
    summary: 'Menyelaraskan roadmap keselamatan dan target keterlibatan menuju skor 82/100.'
  },
  {
    id: 'coaching',
    date: '8 Juni 2024',
    type: 'Coaching',
    title: 'Coaching supervisor site',
    summary: 'Batch 2 fokus pada kepemimpinan shift dengan readiness rata-rata 64%.'
  },
  {
    id: 'learning',
    date: '12 Juni 2024',
    type: 'Learning',
    title: 'Peluncuran modul Elevate',
    summary: `Target keterlibatan ${digest.value.engagementAverage + 4}/100 melalui sesi blended learning.`
  }
]);
</script>
