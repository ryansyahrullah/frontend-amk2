<template>
  <header
    class="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl"
  >
    <div class="safe-container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex w-full flex-1 items-center gap-3">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-primary/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 lg:hidden"
          @click="$emit('toggle-sidebar')"
          aria-label="Buka navigasi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div class="hidden flex-1 items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-3 shadow-inner lg:flex">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h8M8 12h4m-6 5h12" />
            </svg>
          </div>
          <div>
            <p class="text-xs uppercase tracking-[0.35em] text-slate-400">{{ formattedDate }}</p>
            <p class="text-lg font-semibold text-white">{{ greeting }}, {{ user?.nama ?? 'Administrator' }}</p>
          </div>
        </div>
        <div class="relative hidden flex-1 items-center rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 shadow-inner md:flex lg:max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
          </svg>
          <input
            type="search"
            placeholder="Cari pegawai, dokumen, atau aktivitas..."
            class="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>
      </div>
      <div class="flex flex-1 items-center justify-end gap-3 sm:flex-none">
        <AccountSwitcher />
        <button
          type="button"
          class="hidden h-11 items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-200 transition hover:border-primary/60 hover:text-white md:inline-flex"
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
          class="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-primary/60 hover:text-white"
          aria-label="Notifikasi"
        >
          <span class="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-slate-900 bg-rose-400"></span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a3.5 3.5 0 0 1 7 0v2.063c0 .31.097.612.276.864l1.011 1.445A2 2 0 0 1 18.132 13.5H9.868a2 2 0 0 1-0.655-3.228l1.011-1.445A1.5 1.5 0 0 0 10.5 8.063V6z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 17.25a2 2 0 1 1-4 0" />
          </svg>
        </button>
        <div class="flex items-center gap-3 rounded-3xl border border-white/10 bg-gradient-to-r from-primary/20 via-primary/10 to-sky-400/10 px-3 py-2">
          <div class="hidden text-right text-sm leading-tight lg:block">
            <p class="font-semibold text-white">{{ user?.nama ?? 'Administrator' }}</p>
            <p class="text-xs text-slate-400">{{ roleLabel }}</p>
          </div>
          <div class="gradient-ring flex h-12 w-12 items-center justify-center overflow-hidden bg-primary/40 text-lg font-bold uppercase tracking-widest text-white">
            {{ inisialUser }}
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
