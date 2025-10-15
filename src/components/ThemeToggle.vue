<template>
  <button
    type="button"
    :aria-label="isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'"
    class="group relative inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 shadow-[0_22px_60px_-48px_rgba(15,23,42,0.45)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
    @click="toggleTheme"
  >
    <span
      class="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/60 bg-gradient-to-br from-indigo-500/15 via-white/70 to-white shadow-inner transition group-hover:scale-105 dark:border-white/10 dark:from-slate-900/70 dark:via-slate-800/60 dark:to-slate-900/60"
    >
      <svg
        v-if="!isDark"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-amber-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 2.5a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1A.75.75 0 0110 2.5zM10 14.75a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zM4.47 4.47a.75.75 0 011.06 0l.71.7a.75.75 0 11-1.06 1.07l-.7-.71a.75.75 0 010-1.06zm8.29 8.3a.75.75 0 011.06 0l.7.7a.75.75 0 11-1.06 1.07l-.7-.71a.75.75 0 010-1.06zM2.5 10a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 012.5 10zm14.25-.75a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zM5.53 13.23a.75.75 0 010 1.06l-.7.71a.75.75 0 01-1.06-1.07l.7-.7a.75.75 0 011.06 0zm8.3-8.29a.75.75 0 010 1.06l-.71.7a.75.75 0 01-1.06-1.06l.7-.7a.75.75 0 011.07 0zM10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-sky-300"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707 6.5 6.5 0 1017.293 13.293z" clip-rule="evenodd" />
      </svg>
      <span class="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"></span>
    </span>
    <template v-if="!compact">
      <span class="hidden text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-slate-400 transition group-hover:text-indigo-500 dark:text-slate-500 dark:group-hover:text-sky-200 sm:inline-flex">
        {{ isDark ? 'Mode Gelap' : 'Mode Terang' }}
      </span>
    </template>
    <span
      class="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/0 via-white/60 to-sky-500/0 opacity-0 transition group-hover:opacity-100 dark:via-white/5"
    ></span>
  </button>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps<{ compact?: boolean }>();
const compact = computed(() => props.compact ?? false);

const isDark = ref(false);
const storageKey = 'amk_theme';

const applyTheme = (dark: boolean) => {
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  localStorage.setItem(storageKey, dark ? 'dark' : 'light');
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

onMounted(() => {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    isDark.value = stored === 'dark';
  } else {
    isDark.value = document.documentElement.classList.contains('dark');
  }
  applyTheme(isDark.value);
});

watch(isDark, (value) => {
  applyTheme(value);
});
</script>
