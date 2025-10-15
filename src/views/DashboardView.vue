<template>
  <div class="space-y-12 text-slate-700 transition-colors duration-500 dark:text-slate-200">
    <section class="grid gap-6 xl:grid-cols-[320px_1fr]">
      <div class="space-y-6">
        <div class="ocean-panel overflow-hidden p-6 text-sm">
          <div class="pointer-events-none absolute inset-0 opacity-70">
            <div class="absolute -left-14 top-0 h-36 w-36 rounded-full bg-sky-200/45 blur-3xl"></div>
            <div class="absolute -right-20 bottom-[-40%] h-48 w-48 rounded-full bg-emerald-200/45 blur-[160px]"></div>
          </div>
          <div class="relative space-y-6">
            <span class="ocean-chip text-sky-500">Agenda berikutnya</span>
            <div class="space-y-2">
              <h2 class="text-2xl font-semibold leading-tight text-slate-900 dark:text-white">{{ featuredAgenda.title }}</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ featuredAgenda.subtitle }}</p>
            </div>
            <div class="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-inner dark:border-white/10 dark:bg-white/10">
              <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div class="flex flex-col items-center gap-2 text-center">
                  <div :class="['flex h-16 w-16 items-center justify-center rounded-[22px] text-lg font-semibold text-white', featuredAgenda.leftTeam.color]">
                    {{ featuredAgenda.leftTeam.initials }}
                  </div>
                  <p class="text-sm font-semibold text-slate-800 dark:text-white">{{ featuredAgenda.leftTeam.label }}</p>
                </div>
                <div class="text-center text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                  <p>{{ featuredAgenda.meta }}</p>
                  <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{{ featuredAgenda.kickoff }}</p>
                </div>
                <div class="flex flex-col items-center gap-2 text-center">
                  <div :class="['flex h-16 w-16 items-center justify-center rounded-[22px] text-lg font-semibold text-white', featuredAgenda.rightTeam.color]">
                    {{ featuredAgenda.rightTeam.initials }}
                  </div>
                  <p class="text-sm font-semibold text-slate-800 dark:text-white">{{ featuredAgenda.rightTeam.label }}</p>
                </div>
              </div>
            </div>
            <div class="grid gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div
                v-for="stat in featuredAgenda.stats"
                :key="stat.label"
                class="flex items-center justify-between rounded-[18px] border border-white/70 bg-white/90 px-3 py-2 dark:border-white/10 dark:bg-white/10"
              >
                <span class="font-semibold text-slate-500 dark:text-slate-300">{{ stat.label }}</span>
                <span class="text-sm font-semibold text-slate-800 dark:text-white">{{ stat.value }}</span>
              </div>
            </div>
            <div class="ocean-divider"></div>
            <div class="space-y-3">
              <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Agenda lainnya</p>
              <ul class="space-y-3">
                <li
                  v-for="event in upcomingEvents"
                  :key="event.id"
                  class="flex items-center justify-between gap-3 rounded-[20px] border border-white/70 bg-white/85 px-4 py-3 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
                >
                  <div>
                    <p class="font-semibold text-slate-700 dark:text-white">{{ event.title }}</p>
                    <p class="text-xs text-slate-400 dark:text-slate-400">{{ event.description }}</p>
                  </div>
                  <span class="text-xs font-semibold text-sky-500 dark:text-sky-200">{{ event.date }}</span>
                </li>
              </ul>
              <div class="rounded-[18px] border border-dashed border-white/70 px-4 py-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                Pastikan materi townhall dibagikan minimal H-3 acara.
              </div>
            </div>
          </div>
        </div>

        <div class="ocean-card p-5 text-sm">
          <div class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
            <span>Jalur cepat</span>
            <span>Pilih modul</span>
          </div>
          <div class="mt-4 space-y-3">
            <RouterLink
              v-for="action in quickActions"
              :key="action.id"
              :to="action.to"
              class="group flex items-center gap-3 rounded-[22px] border border-white/70 bg-white/85 px-4 py-3 transition hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-sky-50 hover:text-sky-500 dark:border-white/10 dark:bg-white/10"
            >
              <span class="ocean-icon-sm border border-white/70 bg-white/90 text-sky-500 transition group-hover:border-transparent group-hover:bg-sky-500/15 group-hover:text-sky-600 dark:border-white/10 dark:bg-white/10">
                <svg
                  v-if="action.icon === 'users'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
                </svg>
                <svg
                  v-else-if="action.icon === 'calendar'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5h7.5m-7.5 3h7.5m-10.5 3h13.5m-4.5 3H6.75m0 3h6" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 13l3 3 7-7" />
                </svg>
              </span>
              <div class="flex-1">
                <p class="font-semibold text-slate-700 transition group-hover:text-sky-500 dark:text-slate-100">{{ action.label }}</p>
                <p class="text-xs text-slate-500 transition group-hover:text-sky-400 dark:text-slate-400">{{ action.description }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-300 transition group-hover:text-sky-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="ocean-shell overflow-hidden p-8">
        <div class="pointer-events-none absolute inset-0 opacity-70">
          <div class="absolute -left-32 top-0 h-48 w-48 rounded-full bg-sky-200/35 blur-[160px]"></div>
          <div class="absolute -right-20 bottom-[-40%] h-60 w-60 rounded-full bg-emerald-200/35 blur-[200px]"></div>
        </div>
        <div class="relative grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <div class="space-y-6">
            <div class="space-y-4">
              <span class="ocean-chip text-sky-500">Selamat datang kembali</span>
              <h1 class="text-3xl font-semibold leading-tight text-slate-900 dark:text-white">Panel SDM PT Anugerah Mitra Kalimantan</h1>
              <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-300">
                Pantau ritme operasional, pengembangan talenta, dan kesiapan kontrak melalui tata letak baru bertema CoachPro.
              </p>
            </div>
            <div class="grid gap-4 sm:grid-cols-3">
              <div
                v-for="metric in heroMetrics"
                :key="metric.label"
                class="group rounded-[24px] border border-white/70 bg-white/90 p-4 transition hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-sky-50 dark:border-white/10 dark:bg-white/10"
              >
                <p class="text-[0.62rem] uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">{{ metric.label }}</p>
                <p class="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{{ metric.value }}</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ metric.caption }}</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-3">
              <Button
                class="rounded-full border border-sky-300/60 bg-sky-50 px-6 py-2 text-sm font-semibold text-sky-600 transition hover:border-sky-400 hover:bg-sky-100 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200"
                @click="refreshData"
              >
                Segarkan data
              </Button>
              <RouterLink to="/pegawai" class="inline-flex">
                <Button class="rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_24px_80px_-50px_rgba(14,116,144,0.6)] transition hover:opacity-90">
                  Kelola pegawai
                </Button>
              </RouterLink>
              <RouterLink to="/keuangan" class="inline-flex">
                <Button class="rounded-full border border-white/70 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:text-sky-200">
                  Keuangan proyek
                </Button>
              </RouterLink>
            </div>
          </div>
          <div class="space-y-6">
            <div class="rounded-[28px] border border-white/70 bg-white/90 p-5 text-sm shadow-inner dark:border-white/10 dark:bg-white/10">
              <div class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                <span>Detak organisasi</span>
                <span>Realtime</span>
              </div>
              <div class="mt-5 grid gap-4">
                <div class="flex items-center justify-between rounded-[20px] border border-white/70 bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-white/10">
                  <div>
                    <p class="text-xs uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">Skor keterlibatan</p>
                    <p class="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{{ sentimentScore }}</p>
                  </div>
                  <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">+3.1%</span>
                </div>
                <div class="rounded-[20px] border border-white/70 bg-white/90 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
                  Retensi triwulan diproyeksikan di <span class="font-semibold text-slate-700 dark:text-white">{{ retentionRate }}%</span>. Fokuskan coaching pada tim dengan SLA onboarding di bawah 90%.
                </div>
              </div>
            </div>
            <div class="rounded-[28px] border border-white/70 bg-white/90 p-5 text-sm dark:border-white/10 dark:bg-white/10">
              <div class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                <span>Quick wins</span>
                <span>Status</span>
              </div>
              <div class="mt-4 space-y-3">
                <div
                  v-for="item in quickWins"
                  :key="item.label"
                  class="rounded-[20px] border border-white/70 bg-white/90 px-4 py-3 text-xs transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
                >
                  <div class="flex items-center justify-between text-[0.68rem] text-slate-400 dark:text-slate-500">
                    <span class="uppercase tracking-[0.32em]">{{ item.deadline }}</span>
                    <span>{{ item.progress }}%</span>
                  </div>
                  <p class="mt-2 text-sm font-semibold text-slate-700 dark:text-white">{{ item.label }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.caption }}</p>
                  <div class="mt-3 h-2 rounded-full bg-slate-200/70 dark:bg-white/10">
                    <div class="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" :style="{ width: `${item.progress}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="kontrakSoonest.length" class="rounded-[28px] border border-white/70 bg-white/90 p-5 text-xs text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
              <p class="font-semibold text-slate-700 dark:text-white">Prioritas kontrak</p>
              <p class="mt-2">{{ kontrakSoonest[0].nama_lengkap }} — {{ kontrakSoonest[0].jabatan }}</p>
              <p class="mt-1 text-sky-500 dark:text-sky-300">Berakhir dalam {{ kontrakSoonest[0].daysLeft }} hari</p>
              <RouterLink to="/pegawai?filter=habis-kontrak" class="mt-3 inline-flex items-center gap-2 text-sky-500 transition hover:text-sky-400">
                Tindak lanjuti
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <CardStat
        title="Jumlah Pegawai"
        :value="statistik?.jumlahPegawai ? statistik.jumlahPegawai.toLocaleString('id-ID') : '...'"
        description="Pegawai aktif tersinkron"
        variant="primary"
        trend-label="dibanding bulan lalu"
        trend-value="+12 pegawai"
        :trend-positive="true"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-1a4 4 0 0 0-4-4h-1M8 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm12 2a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM4 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm0 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM4 22v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1H4Zm13-7a3.001 3.001 0 0 1 2.83 2H14a3 3 0 0 1 3-3Z" />
          </svg>
        </template>
      </CardStat>
      <CardStat
        title="% Biodata Lengkap"
        :value="statistik ? `${statistik.persentaseLengkap}%` : '...'"
        description="Progress kelengkapan dokumen"
        variant="indigo"
        trend-label="target 85% terpenuhi"
        trend-value="+6%"
      >
        <template #footer>
          <div class="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
            <div class="h-full rounded-full bg-primary" :style="{ width: biodataProgress }"></div>
          </div>
        </template>
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </template>
      </CardStat>
      <CardStat
        title="Pegawai Habis Kontrak"
        :value="statistik ? statistik.habisKontrak.length : '...'"
        description="Berakhir dalam 30 hari"
        variant="rose"
        trend-label="butuh tindak lanjut"
        trend-value="3 pending"
        :trend-positive="false"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l3 3" />
          </svg>
        </template>
      </CardStat>
      <CardStat
        title="Retensi Tim"
        :value="`${retentionRate}%`"
        description="Prediksi retensi triwulan"
        variant="emerald"
        trend-label="stabil 3 bulan"
        trend-value="+2.4%"
        :trend-positive="true"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75v10.5m-6-6h12" />
          </svg>
        </template>
      </CardStat>
    </section>

    <section class="grid gap-6 2xl:grid-cols-[1.3fr_0.7fr]">
      <div class="ocean-shell space-y-8 p-8">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Panorama pengembangan</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Perbandingan pelatihan, onboarding, dan momentum aksi cepat.</p>
          </div>
          <div class="flex gap-2 text-[0.7rem] font-medium text-slate-500 dark:text-slate-400">
            <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary dark:bg-primary/25 dark:text-primary/90"><span class="h-2 w-2 rounded-full bg-primary"></span>Pelatihan</span>
            <span class="inline-flex items-center gap-1 rounded-full bg-sky-200/60 px-3 py-1 text-sky-700 dark:bg-sky-500/20 dark:text-sky-100"><span class="h-2 w-2 rounded-full bg-sky-400"></span>Onboarding</span>
          </div>
        </div>
        <div class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div class="rounded-[26px] border border-white/70 bg-white/90 p-6 dark:border-white/10 dark:bg-white/10">
            <div class="flex h-56 items-end gap-4">
              <div
                v-for="item in pelatihanSeries"
                :key="item.label"
                class="flex flex-1 flex-col items-center gap-2 text-[0.7rem] text-slate-500 dark:text-slate-400"
              >
                <div class="flex h-full w-full items-end gap-2">
                  <div class="w-1/2 rounded-full bg-primary/60 dark:bg-primary/70" :style="{ height: barHeight(item.pelatihan) }"></div>
                  <div class="w-1/2 rounded-full bg-sky-300/80 dark:bg-sky-400/80" :style="{ height: barHeight(item.onboarding) }"></div>
                </div>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
          <div class="rounded-[26px] border border-white/70 bg-white/90 p-6 dark:border-white/10 dark:bg-white/10">
            <svg viewBox="0 0 100 100" class="h-56 w-full">
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(59,130,246,0.35)" />
                  <stop offset="100%" stop-color="rgba(59,130,246,0.05)" />
                </linearGradient>
              </defs>
              <polygon :points="areaPoints" fill="url(#trendGradient)" />
              <polyline :points="linePoints" fill="none" stroke="rgba(56,189,248,0.85)" stroke-width="2.5" stroke-linecap="round" />
              <g v-for="(value, index) in salesTrend" :key="`point-${index}`">
                <circle :cx="pointX(index)" :cy="pointY(value)" r="2.5" fill="#38bdf8" />
              </g>
            </svg>
            <div class="mt-4 flex items-center justify-between text-[0.7rem] text-slate-400 dark:text-slate-500">
              <span v-for="label in monthlyLabels" :key="`label-${label}`">{{ label }}</span>
            </div>
          </div>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <div
            v-for="item in quickWins"
            :key="item.label"
            class="rounded-[22px] border border-white/70 bg-white/90 p-4 transition hover:-translate-y-0.5 hover:border-sky-300/70 dark:border-white/10 dark:bg-white/10"
          >
            <div class="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
              <span class="uppercase tracking-[0.3em]">{{ item.deadline }}</span>
              <span>{{ item.progress }}%</span>
            </div>
            <p class="mt-3 text-sm font-semibold text-slate-700 dark:text-white">{{ item.label }}</p>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ item.caption }}</p>
            <div class="mt-3 h-2 rounded-full bg-slate-200/70 dark:bg-white/10">
              <div class="h-full rounded-full bg-primary" :style="{ width: `${item.progress}%` }"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-6">
        <div class="ocean-card p-6">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Pulse tim & keterlibatan</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Snapshot kesehatan tim berdasarkan aktivitas terbaru.</p>
          <div class="mt-6 space-y-5">
            <div class="flex items-center justify-between rounded-[20px] border border-white/70 bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-white/10">
              <div>
                <p class="text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Skor keterlibatan</p>
                <p class="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{{ sentimentScore }}</p>
              </div>
              <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200">+3.1%</span>
            </div>
            <div class="grid gap-3">
              <div
                v-for="signal in wellbeingSignals"
                :key="signal.label"
                class="flex items-center justify-between rounded-[18px] border border-white/70 bg-white/90 px-3 py-3 text-sm transition dark:border-white/10 dark:bg-white/10"
              >
                <div>
                  <p class="font-semibold text-slate-700 dark:text-white">{{ signal.label }}</p>
                  <p class="text-xs text-slate-400 dark:text-slate-400">{{ signal.caption }}</p>
                </div>
                <div class="text-right text-slate-700 dark:text-white">
                  <p class="text-lg font-semibold">{{ signal.value }}</p>
                  <p class="text-xs text-emerald-500 dark:text-emerald-300">{{ signal.trend }}</p>
                </div>
              </div>
            </div>
            <div class="rounded-[18px] border border-dashed border-white/70 bg-white/90 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              Insight: 78% pegawai menyelesaikan pelatihan digital dalam 7 hari terakhir.
            </div>
          </div>
        </div>
        <div class="ocean-card space-y-4 p-6">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Radar site aktif</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Sorotan kinerja unit dengan indikator utama minggu ini.</p>
          <ul class="space-y-3">
            <li
              v-for="site in squadHighlights"
              :key="site.id"
              class="flex items-center justify-between gap-3 rounded-[18px] border border-white/70 bg-white/90 px-4 py-3 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
            >
              <div>
                <p class="font-semibold text-slate-700 dark:text-white">{{ site.label }}</p>
                <p class="text-xs text-slate-400 dark:text-slate-400">{{ site.caption }}</p>
              </div>
              <div class="text-right text-sm">
                <p class="font-semibold text-primary dark:text-primary/80">{{ site.stat }}</p>
                <p class="text-xs text-emerald-500 dark:text-emerald-300">{{ site.delta }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="ocean-shell space-y-5 p-8">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Pegawai akan habis kontrak</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Pantau jadwal kontrak yang segera berakhir.</p>
          </div>
          <RouterLink to="/pegawai?filter=habis-kontrak" class="text-sm font-semibold text-primary transition hover:text-primary/70">
            Lihat semua
          </RouterLink>
        </div>
        <div class="rounded-[26px] border border-white/70 bg-white/90 p-3 dark:border-white/10 dark:bg-white/10">
          <AppTable
            :columns="kontrakColumns"
            :items="statistik?.habisKontrak ?? []"
            :loading="loadingStatistik"
            row-key="id"
            empty-message="Tidak ada pegawai yang akan habis kontrak."
          >
            <template #cell-akhir_kontrak="{ item }">
              <span>{{ formatDate(item.akhir_kontrak) }}</span>
            </template>
          </AppTable>
        </div>
      </div>
      <div class="space-y-6">
        <div class="ocean-card p-6">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Riwayat aktivitas</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">10 aktivitas terbaru dari seluruh pengguna.</p>
          <ul class="mt-5 space-y-4">
            <li v-if="loadingAktivitas" v-for="n in 5" :key="`skeleton-${n}`" class="animate-pulse space-y-3">
              <div class="h-3 w-2/3 rounded bg-slate-200/60 dark:bg-white/10"></div>
              <div class="h-2 w-1/3 rounded bg-slate-200/50 dark:bg-white/10"></div>
            </li>
            <li
              v-else-if="!aktivitas.length"
              class="flex flex-col items-center gap-3 rounded-[24px] border border-dashed border-white/60 p-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400"
            >
              <span class="text-3xl">📭</span>
              Belum ada aktivitas terbaru.
            </li>
            <li v-else v-for="item in aktivitas" :key="item.id" class="rounded-[22px] border border-white/70 bg-white/90 p-4 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10">
              <p class="font-semibold text-slate-700 dark:text-white">{{ item.judul }}</p>
              <p class="mt-1 text-slate-500 dark:text-slate-400">{{ item.deskripsi }}</p>
              <p class="mt-2 text-xs text-slate-400 dark:text-slate-500">{{ formatDateTime(item.waktu) }}</p>
            </li>
          </ul>
        </div>
        <div class="ocean-card space-y-4 p-6">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Sorotan kontrak prioritas</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Daftar ringkas pegawai yang memerlukan tindak lanjut cepat.</p>
          <ul class="space-y-3 text-sm">
            <li v-if="!kontrakSoonest.length" class="rounded-[22px] border border-dashed border-white/70 p-5 text-center text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
              Semua tim dalam kondisi stabil.
            </li>
            <li
              v-else
              v-for="kontrak in kontrakSoonest"
              :key="`alert-${kontrak.id}`"
              class="rounded-[22px] border border-white/70 bg-white/90 p-4 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="font-semibold text-slate-700 dark:text-white">{{ kontrak.nama_lengkap }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ kontrak.jabatan }}</p>
                </div>
                <span class="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-500/20 dark:text-rose-100">{{ kontrak.daysLeft }} hari lagi</span>
              </div>
              <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">Kontrak berakhir pada {{ formatDate(kontrak.akhir_kontrak) }}. Koordinasikan pembaruan dengan atasan langsung.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <div class="ocean-card p-6">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Inisiatif strategis</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Program prioritas lintas divisi yang sedang berjalan.</p>
        <ul class="mt-4 space-y-3 text-sm">
          <li
            v-for="initiative in initiatives"
            :key="initiative.id"
            class="rounded-[22px] border border-white/70 bg-white/90 p-4 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="font-semibold text-slate-700 dark:text-white">{{ initiative.title }}</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ initiative.description }}</p>
              </div>
              <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="initiative.badgeClass">{{ initiative.status }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="ocean-card p-6">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Talent alerts</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Highlight pegawai yang memerlukan perhatian khusus.</p>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-if="!kontrakSoonest.length" class="rounded-[22px] border border-dashed border-white/70 p-5 text-center text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
            Semua tim dalam kondisi stabil.
          </li>
          <li
            v-else
            v-for="kontrak in kontrakSoonest"
            :key="`talent-${kontrak.id}`"
            class="rounded-[22px] border border-white/70 bg-white/90 p-4 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-semibold text-slate-700 dark:text-white">{{ kontrak.nama_lengkap }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ kontrak.jabatan }}</p>
              </div>
              <span class="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-500/20 dark:text-amber-100">{{ kontrak.daysLeft }} hari</span>
            </div>
            <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">Siapkan rencana retensi atau pengganti untuk memastikan kelangsungan operasional.</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Button from '../components/Button.vue';
import CardStat from '../components/CardStat.vue';
import AppTable from '../components/AppTable.vue';
import http from '../api/http';
import type { Aktivitas, StatistikResponse } from '../types';

const statistik = ref<StatistikResponse | null>(null);
const aktivitas = ref<Aktivitas[]>([]);
const loadingStatistik = ref(false);
const loadingAktivitas = ref(false);

const kontrakColumns = [
  { key: 'nrp', label: 'NRP' },
  { key: 'nama_lengkap', label: 'Nama' },
  { key: 'jabatan', label: 'Jabatan' },
  { key: 'akhir_kontrak', label: 'Akhir Kontrak' }
];

const biodataProgress = computed(() => {
  if (!statistik.value) return '0%';
  return `${Math.min(statistik.value.persentaseLengkap, 100)}%`;
});

const biodataProgressNumeric = computed(() => {
  if (!statistik.value) return 0;
  return Math.min(statistik.value.persentaseLengkap, 100);
});

const biodataCircumference = computed(() => 2 * Math.PI * 58);
const biodataOffset = computed(() => {
  const circumference = biodataCircumference.value;
  return circumference - (biodataProgressNumeric.value / 100) * circumference;
});

const biodataProgressText = computed(() => `${biodataProgressNumeric.value}% selesai`);

const pelatihanSeries = ref([
  { label: 'Jan', pelatihan: 18, onboarding: 11 },
  { label: 'Feb', pelatihan: 22, onboarding: 14 },
  { label: 'Mar', pelatihan: 27, onboarding: 19 },
  { label: 'Apr', pelatihan: 24, onboarding: 16 },
  { label: 'Mei', pelatihan: 28, onboarding: 21 },
  { label: 'Jun', pelatihan: 31, onboarding: 24 }
]);

const maxPelatihanValue = computed(() =>
  pelatihanSeries.value.reduce((acc, item) => Math.max(acc, item.pelatihan, item.onboarding), 1)
);

const barHeight = (value: number) => `${Math.round((value / maxPelatihanValue.value) * 100)}%`;

const salesTrend = ref([32, 45, 39, 58, 63, 71, 66]);
const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];

const maxSalesValue = computed(() => salesTrend.value.reduce((acc, value) => Math.max(acc, value), 1));

const pointX = (index: number) => ((index / (salesTrend.value.length - 1)) * 100).toFixed(2);
const pointY = (value: number) => (100 - (value / maxSalesValue.value) * 100).toFixed(2);

const linePoints = computed(() =>
  salesTrend.value
    .map((value, index) => `${pointX(index)},${pointY(value)}`)
    .join(' ')
);

const areaPoints = computed(() => `${linePoints.value} 100,100 0,100`);

const retentionRate = computed(() => {
  const total = statistik.value?.jumlahPegawai ?? 0;
  const kontrak = statistik.value?.habisKontrak.length ?? 0;
  if (!total) return 0;
  const exitRate = (kontrak / total) * 100;
  return Math.max(0, Math.min(100, Math.round(96 - exitRate)));
});

const heroMetrics = computed(() => {
  const total = statistik.value?.jumlahPegawai ?? 0;
  const kontrak = statistik.value?.habisKontrak.length ?? 0;
  return [
    { label: 'Pegawai Aktif', value: total ? total.toLocaleString('id-ID') : '...', caption: 'Seluruh unit dan site' },
    { label: 'Kontrak 30 Hari', value: kontrak, caption: 'Perlu tindak lanjut HRBP' },
    { label: 'Kelengkapan', value: `${biodataProgressNumeric.value}%`, caption: 'Dokumen inti pegawai' }
  ];
});

const kontrakSoonest = computed(() => {
  const items = statistik.value?.habisKontrak ?? [];
  return items
    .slice()
    .sort((a, b) => new Date(a.akhir_kontrak).getTime() - new Date(b.akhir_kontrak).getTime())
    .slice(0, 3)
    .map((item) => {
      const diff = Math.max(
        0,
        Math.ceil((new Date(item.akhir_kontrak).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      );
      return {
        ...item,
        daysLeft: diff
      };
    });
});

const quickActions = [
  {
    id: 'pegawai',
    label: 'Kelola Pegawai',
    description: 'Mutasi, update biodata, status kerja',
    to: '/pegawai',
    icon: 'users'
  },
  {
    id: 'approval',
    label: 'Persetujuan Cuti',
    description: 'Review permohonan dan alokasi kuota',
    to: '/pegawai/pengajuan-cuti',
    icon: 'calendar'
  },
  {
    id: 'laporan',
    label: 'Laporan Bulanan',
    description: 'Rekap penugasan & pelatihan tim',
    to: '/dashboard',
    icon: 'chart'
  }
];

const sentimentScore = computed(() => 74 + Math.round(biodataProgressNumeric.value * 0.2));

const wellbeingSignals = computed(() => [
  {
    label: 'Kepuasan Kerja',
    value: `${Math.min(92, sentimentScore.value)}%`,
    trend: '+1.8%',
    caption: 'Survei pulse minggu ini'
  },
  {
    label: 'Kepatuhan Jam Kerja',
    value: '96%',
    trend: '+0.9%',
    caption: 'Absensi tepat waktu'
  },
  {
    label: 'SLA Onboarding',
    value: '88%',
    trend: '+4.2%',
    caption: 'Proses selesai < 5 hari'
  }
]);

const squadHighlights = [
  { id: 'balikpapan', label: 'Site Balikpapan', stat: '98%', delta: '+2.3%', caption: 'Kehadiran shift pagi' },
  { id: 'banjarmasin', label: 'Site Banjarmasin', stat: '92%', delta: '+1.1%', caption: 'Kelengkapan biodata' },
  { id: 'samarinda', label: 'Site Samarinda', stat: '87%', delta: '+3 modul', caption: 'Pelatihan keselamatan' }
];

const initiatives = [
  {
    id: 'digital-academy',
    title: 'Digital Academy Batch 4',
    description: 'Pelatihan intensif untuk frontliner site Banjarmasin.',
    status: 'Sedang berjalan',
    badgeClass: 'bg-emerald-500/20 text-emerald-100'
  },
  {
    id: 'hc-analytics',
    title: 'Integrasi Data HC Analytics',
    description: 'Sinkronisasi data HRIS dengan modul finance untuk insight realtime.',
    status: 'Persiapan',
    badgeClass: 'bg-sky-500/20 text-sky-100'
  },
  {
    id: 'culture-refresh',
    title: 'Program Culture Refresh Q3',
    description: 'Roadshow budaya perusahaan ke 6 lokasi operasional utama.',
    status: 'Kick-off',
    badgeClass: 'bg-amber-500/20 text-amber-100'
  }
];

const quickWins = computed(() => [
  {
    label: 'Lengkapi Biodata Batch 12',
    caption: 'Validasi dokumen kontrak & NPWP untuk 18 pegawai.',
    progress: biodataProgressNumeric.value,
    deadline: 'Minggu ini'
  },
  {
    label: 'Review Kontrak Prioritas',
    caption: 'Koordinasi bersama HC Partner & legal untuk 5 pegawai kritikal.',
    progress: statistik.value
      ? Math.min(100, Math.round((statistik.value.habisKontrak.length / (statistik.value.jumlahPegawai || 1)) * 120))
      : 0,
    deadline: '3 hari lagi'
  },
  {
    label: 'Monitoring Pelatihan Site',
    caption: 'Pastikan modul keselamatan tuntas sebelum audit internal.',
    progress: 68,
    deadline: 'Akhir bulan'
  }
]);

const upcomingEvents = [
  { id: 'townhall', title: 'Townhall Q3', description: 'Update kinerja dan penghargaan pegawai terbaik.', date: '15 Jul' },
  { id: 'coaching', title: 'Coaching Leader Batch 2', description: 'Sesi coaching intensif untuk supervisor site.', date: '18 Jul' }
];

const featuredAgenda = computed(() => {
  const primary = upcomingEvents[0] ?? {
    title: 'Townhall Internal',
    description: 'Update kinerja triwulan',
    date: '11 Nov'
  };

  return {
    title: primary.title,
    subtitle: primary.description,
    meta: 'Sesi hibrida',
    kickoff: `${primary.date} · 09.00 WITA`,
    leftTeam: { label: 'Divisi Operasi', initials: 'OPS', color: 'bg-sky-500' },
    rightTeam: { label: 'HC & GA', initials: 'HC', color: 'bg-emerald-500' },
    stats: [
      { label: 'Kehadiran target', value: '65%' },
      { label: 'Topik prioritas', value: '5 agenda' },
      { label: 'Investasi pelatihan', value: 'Rp690,2jt' },
      { label: 'Skor kepuasan', value: '7,2/10' }
    ]
  };
});

const formatDate = (value: string | null) => {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const fetchStatistik = async () => {
  loadingStatistik.value = true;
  try {
    const { data } = await http.get<StatistikResponse>('/api/pegawai/statistik');
    statistik.value = data;
  } catch (error) {
    console.error('Gagal memuat statistik pegawai', error);
  } finally {
    loadingStatistik.value = false;
  }
};

const fetchAktivitas = async () => {
  loadingAktivitas.value = true;
  try {
    const { data } = await http.get<Aktivitas[]>('/api/aktivitas', { params: { limit: 10 } });
    aktivitas.value = data;
  } catch (error) {
    console.error('Gagal memuat aktivitas', error);
  } finally {
    loadingAktivitas.value = false;
  }
};

const refreshData = () => {
  fetchStatistik();
  fetchAktivitas();
};

onMounted(() => {
  fetchStatistik();
  fetchAktivitas();
});
</script>
