<template>
  <div
    :class="[
      'group relative overflow-hidden rounded-[28px] border px-5 py-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-40px_rgba(37,99,235,0.45)] sm:px-6',
      styles.container
    ]"
  >
    <div v-if="styles.glow" :class="styles.glow"></div>
    <div class="absolute inset-0 opacity-0 transition group-hover:opacity-100" :class="styles.hoverOverlay"></div>
    <div class="relative flex items-start gap-5">
      <div :class="['flex h-12 w-12 items-center justify-center rounded-2xl text-base sm:h-14 sm:w-14', styles.icon]">
        <slot name="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </slot>
      </div>
      <div class="flex-1">
        <p class="text-xs font-medium uppercase tracking-[0.32em] sm:text-[0.68rem]" :class="styles.title">{{ title }}</p>
        <div class="mt-4 flex items-baseline gap-2">
          <h3 class="text-2xl font-semibold tracking-tight sm:text-4xl" :class="styles.value">{{ value }}</h3>
          <span
            v-if="trendValue"
            class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold sm:text-xs"
            :class="styles.trendBadge"
          >
            <svg
              v-if="trendPositive"
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l6-6 4.5 4.5L19.5 9" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-6 6-4.5-4.5L4.5 15" />
            </svg>
            {{ trendValue }}
          </span>
        </div>
        <p v-if="description" class="mt-3 text-xs leading-relaxed sm:text-sm" :class="styles.description">{{ description }}</p>
      </div>
    </div>
    <div v-if="$slots.footer" class="relative mt-5 sm:mt-6">
      <slot name="footer" />
    </div>
    <div v-if="trendValue" class="relative mt-5 flex items-center gap-2 text-[0.65rem] sm:text-xs">
      <span :class="styles.trendText">{{ trendLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'primary' | 'indigo' | 'rose' | 'emerald' | 'neutral';

const props = withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    description?: string;
    variant?: Variant;
    trendLabel?: string;
    trendValue?: string;
    trendPositive?: boolean;
  }>(),
  {
    variant: 'neutral',
    trendPositive: true
  }
);

const variantMap: Record<Variant, Record<string, string>> = {
  primary: {
    container:
      'border-transparent bg-gradient-to-br from-white/95 via-white/70 to-primary/10 text-slate-800 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-primary/25 dark:text-slate-100',
    icon: 'bg-primary/15 text-primary dark:bg-primary/25 dark:text-primary/90 shadow-inner shadow-primary/10',
    title: 'text-slate-500 dark:text-slate-400',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-primary/15 text-primary dark:bg-primary/25 dark:text-primary/90',
    trendText: 'text-slate-400 dark:text-slate-400',
    hoverOverlay: 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent',
    glow: 'pointer-events-none absolute -right-16 top-1/4 h-48 w-48 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25'
  },
  indigo: {
    container:
      'border-transparent bg-gradient-to-br from-indigo-50 via-white to-violet-50 text-slate-800 dark:from-indigo-500/20 dark:via-indigo-500/10 dark:to-violet-500/15 dark:text-slate-100',
    icon: 'bg-indigo-500/15 text-indigo-500 dark:bg-indigo-400/20 dark:text-white',
    title: 'text-indigo-500/90 dark:text-indigo-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-200/80',
    trendBadge: 'bg-indigo-500/15 text-indigo-600 dark:bg-indigo-500/30 dark:text-white',
    trendText: 'text-indigo-500/80 dark:text-indigo-200/80',
    hoverOverlay: 'bg-gradient-to-r from-indigo-500/10 via-transparent to-indigo-500/10',
    glow: 'pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl'
  },
  rose: {
    container:
      'border-transparent bg-gradient-to-br from-rose-50 via-white to-amber-50 text-slate-800 dark:from-rose-500/25 dark:via-rose-400/10 dark:to-amber-400/15 dark:text-slate-100',
    icon: 'bg-rose-500/15 text-rose-500 dark:bg-rose-400/20 dark:text-white',
    title: 'text-rose-400/90 dark:text-rose-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-200/80',
    trendBadge: 'bg-rose-500/15 text-rose-500 dark:bg-rose-400/25 dark:text-white',
    trendText: 'text-rose-400/80 dark:text-rose-200/80',
    hoverOverlay: 'bg-gradient-to-br from-rose-500/10 via-transparent to-amber-400/10',
    glow: 'pointer-events-none absolute right-[-2rem] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-rose-400/20 blur-3xl'
  },
  emerald: {
    container:
      'border-transparent bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-slate-800 dark:from-emerald-500/25 dark:via-emerald-400/10 dark:to-teal-400/15 dark:text-slate-100',
    icon: 'bg-emerald-500/15 text-emerald-500 dark:bg-emerald-400/20 dark:text-white',
    title: 'text-emerald-500/90 dark:text-emerald-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-200/80',
    trendBadge: 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/25 dark:text-white',
    trendText: 'text-emerald-500/80 dark:text-emerald-200/80',
    hoverOverlay: 'bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-400/10',
    glow: 'pointer-events-none absolute left-[-1.5rem] top-1/3 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl'
  },
  neutral: {
    container:
      'border-slate-200/70 bg-white/85 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200',
    icon: 'bg-slate-200/70 text-primary dark:bg-primary/20 dark:text-primary/90',
    title: 'text-slate-400 dark:text-slate-400',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/80',
    trendText: 'text-slate-400 dark:text-slate-400',
    hoverOverlay: 'bg-gradient-to-br from-slate-200/40 via-transparent to-slate-200/20 dark:from-white/5 dark:via-transparent dark:to-white/5',
    glow: ''
  }
};

const styles = computed(() => variantMap[props.variant]);

const trendValue = computed(() => props.trendValue);
const trendPositive = computed(() => props.trendPositive);
const trendLabel = computed(() => props.trendLabel ?? 'dibanding periode lalu');
</script>
