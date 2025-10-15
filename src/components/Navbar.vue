<template>
  <header
    class="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/70"
  >
    <div class="safe-container flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex w-full flex-1 flex-col gap-4 lg:flex-row lg:items-center">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:border-primary/60"
            @click="$emit('toggle-sidebar')"
            aria-label="Buka navigasi"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div class="hidden items-center gap-4 rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-4 shadow-sm transition dark:border-white/10 dark:bg-white/10 lg:flex">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/10 to-sky-300/20 text-primary dark:from-primary/25 dark:via-primary/10 dark:to-sky-400/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h8M8 12h4m-6 5h12" />
              </svg>
            </div>
            <div>
              <p class="text-[0.65rem] uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">{{ formattedDate }}</p>
              <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ greeting }}, {{ user?.nama ?? 'Administrator' }}</p>
            </div>
          </div>
        </div>
        <div class="relative flex items-center gap-3 rounded-3xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm shadow-sm transition focus-within:border-primary/50 focus-within:shadow-glow dark:border-white/10 dark:bg-white/10 lg:flex lg:max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
          </svg>
          <input
            type="search"
            placeholder="Cari pegawai, dokumen, atau aktivitas..."
            class="w-full bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500"
          />
          <span class="hidden items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary/80 lg:inline-flex">
            ⌘K
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div class="flex items-center gap-3">
          <AccountSwitcher />
          <button
            type="button"
            class="hidden h-11 items-center gap-2 rounded-3xl border border-slate-200/80 bg-white/80 px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-primary/50 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:text-primary/70 md:inline-flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5 19.5 12 12 19.5" />
            </svg>
            Laporan Cepat
          </button>
          <ThemeToggle :compact="true" />
          <button
            type="button"
            class="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition hover:border-primary/50 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:text-primary/70"
            aria-label="Notifikasi"
          >
            <span class="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-white bg-rose-500 shadow-[0_0_0_2px_rgba(255,255,255,0.7)] dark:border-slate-950"></span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a3.5 3.5 0 0 1 7 0v2.063c0 .31.097.612.276.864l1.011 1.445A2 2 0 0 1 18.132 13.5H9.868a2 2 0 0 1-0.655-3.228l1.011-1.445A1.5 1.5 0 0 0 10.5 8.063V6z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 17.25a2 2 0 1 1-4 0" />
            </svg>
          </button>
        </div>
        <div class="frosted-panel flex items-center gap-3 px-4 py-3">
          <div class="hidden text-right text-sm leading-tight xl:block">
            <p class="font-semibold text-slate-900 dark:text-white">{{ user?.nama ?? 'Administrator' }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ roleLabel }}</p>
          </div>
          <div class="gradient-ring flex h-12 w-12 items-center justify-center bg-primary/15 text-sm font-semibold uppercase tracking-wide text-primary dark:bg-primary/25 dark:text-primary/90">
            {{ inisialUser }}
          </div>
          <div class="flex flex-col text-xs text-slate-500 dark:text-slate-400">
            <span class="inline-flex items-center gap-1 font-semibold text-primary dark:text-primary/80">
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              Status aktif
            </span>
            <span>{{ formattedDate }}</span>
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
  }, 60000);
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>
