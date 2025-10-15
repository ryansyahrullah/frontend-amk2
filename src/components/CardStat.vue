<template>
  <div :class="['group ocean-card overflow-hidden transition-all duration-300 hover:-translate-y-1', styles.container]">
    <div v-if="styles.overlay" :class="['pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100', styles.overlay]"></div>
    <div class="relative flex flex-col gap-4">
      <div class="flex items-start gap-4">
        <div :class="['flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold shadow-sm transition group-hover:scale-105', styles.icon]">
          <slot name="icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </slot>
        </div>
        <div class="flex-1 space-y-3">
          <p class="text-[0.65rem] font-semibold uppercase tracking-[0.38em]" :class="styles.title">{{ title }}</p>
          <div class="flex flex-wrap items-baseline gap-3">
            <h3 class="text-3xl font-semibold sm:text-4xl" :class="styles.value">{{ value }}</h3>
            <span
              v-if="trendValue"
              :class="['inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.68rem] font-semibold transition', styles.trendBadge]"
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
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12 6 6 9-12" />
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
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 12-6 6-9-12" />
              </svg>
              {{ trendValue }}
            </span>
          </div>
        </div>
      </div>
      <p v-if="description" class="text-xs leading-relaxed sm:text-sm" :class="styles.description">{{ description }}</p>
      <div v-if="$slots.footer" class="pt-3 text-xs sm:text-sm">
        <slot name="footer" />
      </div>
      <div v-if="trendValue" class="flex items-center gap-2 text-[0.68rem]" :class="styles.trendText">
        <span class="h-1 w-10 rounded-full bg-current/20"></span>
        <span>{{ trendLabelComputed }}</span>
      </div>
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
    container: 'border border-sky-200/70 bg-gradient-to-br from-white/95 via-white/75 to-sky-100/55 dark:border-sky-500/30 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-sky-500/15',
    icon: 'bg-gradient-to-br from-sky-100 via-white to-white text-sky-500 dark:from-sky-500/20 dark:via-white/10 dark:to-white/5 dark:text-sky-200',
    title: 'text-slate-400 dark:text-slate-400',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-200',
    trendText: 'text-sky-500 dark:text-sky-300',
    overlay: 'bg-gradient-to-br from-sky-100/35 via-transparent to-emerald-100/20'
  },
  indigo: {
    container: 'border border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-white/80 to-sky-100/55 dark:border-indigo-500/25 dark:from-indigo-500/25 dark:via-slate-900/60 dark:to-sky-500/15',
    icon: 'bg-gradient-to-br from-indigo-100 via-white to-white text-indigo-500 dark:from-indigo-500/25 dark:via-white/10 dark:to-white/5 dark:text-indigo-200',
    title: 'text-indigo-500 dark:text-indigo-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200',
    trendText: 'text-indigo-400 dark:text-indigo-200',
    overlay: 'bg-gradient-to-br from-indigo-100/35 via-transparent to-sky-200/20'
  },
  rose: {
    container: 'border border-rose-200/70 bg-gradient-to-br from-rose-50 via-white/80 to-amber-50/60 dark:border-rose-500/25 dark:from-rose-500/25 dark:via-slate-900/60 dark:to-amber-500/20',
    icon: 'bg-gradient-to-br from-rose-100 via-white to-white text-rose-500 dark:from-rose-500/25 dark:via-white/10 dark:to-white/5 dark:text-rose-200',
    title: 'text-rose-500 dark:text-rose-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-rose-100 text-rose-500 dark:bg-rose-500/20 dark:text-rose-200',
    trendText: 'text-rose-400 dark:text-rose-200',
    overlay: 'bg-gradient-to-br from-rose-100/35 via-transparent to-amber-100/25'
  },
  emerald: {
    container: 'border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white/80 to-teal-50/55 dark:border-emerald-500/25 dark:from-emerald-500/25 dark:via-slate-900/60 dark:to-teal-500/20',
    icon: 'bg-gradient-to-br from-emerald-100 via-white to-white text-emerald-500 dark:from-emerald-500/25 dark:via-white/10 dark:to-white/5 dark:text-emerald-200',
    title: 'text-emerald-500 dark:text-emerald-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200',
    trendText: 'text-emerald-400 dark:text-emerald-200',
    overlay: 'bg-gradient-to-br from-emerald-100/35 via-transparent to-teal-100/25'
  },
  neutral: {
    container: 'border border-white/70 bg-white/85 dark:border-white/10 dark:bg-white/10',
    icon: 'bg-gradient-to-br from-slate-100 via-white to-white text-slate-500 dark:from-white/10 dark:via-white/5 dark:to-white/5 dark:text-slate-200',
    title: 'text-slate-400 dark:text-slate-400',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-200',
    trendText: 'text-slate-400 dark:text-slate-400',
    overlay: ''
  }
};

const styles = computed(() => variantMap[props.variant]);

const trendValue = computed(() => props.trendValue);
const trendPositive = computed(() => props.trendPositive);
const trendLabelComputed = computed(() => props.trendLabel ?? 'dibanding periode lalu');
</script>
