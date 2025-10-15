<template>
  <div :class="['group nova-card orbit-tilt overflow-hidden transition-all duration-500 hover:-translate-y-1', styles.container]">
    <div v-if="styles.beam" :class="['pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100', styles.beam]"></div>
    <div class="relative flex flex-col gap-4">
      <div class="flex items-start gap-4">
        <div :class="['flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold', styles.icon]">
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75 10.5 9.75 14.25 13.5 19.5 8.25" />
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25 13.5 14.25 9.75 10.5 4.5 15.75" />
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
        <span class="h-1 w-10 rounded-full bg-current/25"></span>
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
    container: 'border border-primary/15 bg-gradient-to-br from-white/95 via-white/70 to-primary/15 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-primary/25',
    icon: 'bg-primary/15 text-primary shadow-inner shadow-primary/10 dark:bg-primary/30 dark:text-primary/80',
    title: 'text-slate-500 dark:text-slate-400',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-primary/12 text-primary dark:bg-primary/25 dark:text-primary/90',
    trendText: 'text-primary/70 dark:text-primary/80',
    beam: 'bg-gradient-to-br from-primary/15 via-transparent to-primary/10'
  },
  indigo: {
    container: 'border border-indigo-200/60 bg-gradient-to-br from-indigo-100/85 via-white/80 to-sky-100/60 dark:border-indigo-400/20 dark:from-indigo-500/30 dark:via-indigo-500/10 dark:to-sky-500/15',
    icon: 'bg-indigo-500/15 text-indigo-600 shadow-inner shadow-indigo-200/40 dark:bg-indigo-400/20 dark:text-white',
    title: 'text-indigo-500/90 dark:text-indigo-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-indigo-500/12 text-indigo-600 dark:bg-indigo-400/25 dark:text-white',
    trendText: 'text-indigo-400/80 dark:text-indigo-200/80',
    beam: 'bg-gradient-to-br from-indigo-500/15 via-transparent to-blue-500/10'
  },
  rose: {
    container: 'border border-rose-200/60 bg-gradient-to-br from-rose-100/85 via-white/80 to-amber-100/65 dark:border-rose-400/25 dark:from-rose-500/30 dark:via-rose-500/10 dark:to-amber-500/15',
    icon: 'bg-rose-500/15 text-rose-500 shadow-inner shadow-rose-200/40 dark:bg-rose-400/20 dark:text-white',
    title: 'text-rose-500/90 dark:text-rose-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-rose-500/12 text-rose-500 dark:bg-rose-400/25 dark:text-white',
    trendText: 'text-rose-400/80 dark:text-rose-200/80',
    beam: 'bg-gradient-to-br from-rose-500/15 via-transparent to-amber-400/10'
  },
  emerald: {
    container: 'border border-emerald-200/60 bg-gradient-to-br from-emerald-100/85 via-white/80 to-teal-100/65 dark:border-emerald-400/20 dark:from-emerald-500/30 dark:via-emerald-500/10 dark:to-teal-500/15',
    icon: 'bg-emerald-500/15 text-emerald-600 shadow-inner shadow-emerald-200/40 dark:bg-emerald-400/20 dark:text-white',
    title: 'text-emerald-500/90 dark:text-emerald-200',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-emerald-500/12 text-emerald-600 dark:bg-emerald-400/25 dark:text-white',
    trendText: 'text-emerald-400/80 dark:text-emerald-200/80',
    beam: 'bg-gradient-to-br from-emerald-500/15 via-transparent to-teal-400/10'
  },
  neutral: {
    container: 'border border-slate-200/70 bg-white/75 dark:border-white/10 dark:bg-white/10',
    icon: 'bg-slate-100 text-primary shadow-inner shadow-slate-200/50 dark:bg-primary/25 dark:text-primary/80',
    title: 'text-slate-400 dark:text-slate-400',
    value: 'text-slate-900 dark:text-white',
    description: 'text-slate-500 dark:text-slate-300',
    trendBadge: 'bg-slate-200/70 text-slate-600 dark:bg-white/10 dark:text-slate-200',
    trendText: 'text-slate-400 dark:text-slate-400',
    beam: ''
  }
};

const styles = computed(() => variantMap[props.variant]);

const trendValue = computed(() => props.trendValue);
const trendPositive = computed(() => props.trendPositive);
const trendLabelComputed = computed(() => props.trendLabel ?? 'dibanding periode lalu');
</script>
