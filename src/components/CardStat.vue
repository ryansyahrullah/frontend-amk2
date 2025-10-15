<template>
  <div :class="['group relative overflow-hidden rounded-[28px] border border-white/10 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_65px_-25px_rgba(59,130,246,0.8)] sm:p-6', styles.container]">
    <div v-if="styles.highlight" :class="styles.highlight"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition group-hover:opacity-100"></div>
    <div class="relative flex items-start gap-4">
      <div :class="['gradient-ring flex h-12 w-12 items-center justify-center text-base sm:h-14 sm:w-14', styles.icon]">
        <slot name="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </slot>
      </div>
      <div class="flex-1">
        <p class="text-xs font-medium uppercase tracking-[0.25em] sm:text-[0.7rem]" :class="styles.title">{{ title }}</p>
        <div class="mt-3 flex items-baseline gap-2">
          <h3 class="text-2xl font-semibold tracking-tight sm:text-4xl">{{ value }}</h3>
          <span v-if="trendValue" class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[0.65rem] font-semibold sm:text-xs" :class="styles.trendBadge">
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
        <p v-if="description" class="mt-2 text-xs leading-relaxed text-slate-200/70 sm:text-sm" :class="styles.description">{{ description }}</p>
      </div>
    </div>
    <div v-if="$slots.footer" class="relative mt-5 sm:mt-6">
      <slot name="footer" />
    </div>
    <div v-if="trendValue" class="relative mt-4 flex items-center gap-2 text-[0.65rem] sm:text-xs">
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
    container: 'bg-gradient-to-br from-primary/30 via-primary/5 to-sky-500/20 text-white',
    icon: 'bg-white/10 text-white',
    title: 'text-white/70',
    description: 'text-white/80',
    trendBadge: 'bg-white/15 text-white',
    trendText: 'text-white/70',
    highlight: 'pointer-events-none absolute -right-12 top-1/3 h-40 w-40 rounded-full bg-white/15 blur-3xl'
  },
  indigo: {
    container: 'bg-gradient-to-br from-indigo-500/40 via-indigo-500/10 to-violet-500/20 text-white',
    icon: 'bg-white/10 text-white',
    title: 'text-white/70',
    description: 'text-white/75',
    trendBadge: 'bg-white/20 text-white',
    trendText: 'text-white/70',
    highlight: 'pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-white/15 blur-3xl'
  },
  rose: {
    container: 'bg-gradient-to-br from-rose-500/45 via-rose-400/10 to-amber-400/15 text-white',
    icon: 'bg-white/10 text-white',
    title: 'text-white/70',
    description: 'text-white/75',
    trendBadge: 'bg-white/15 text-white',
    trendText: 'text-white/70',
    highlight: 'pointer-events-none absolute right-0 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-white/15 blur-3xl'
  },
  emerald: {
    container: 'bg-gradient-to-br from-emerald-500/45 via-emerald-400/10 to-teal-400/15 text-white',
    icon: 'bg-white/10 text-white',
    title: 'text-white/70',
    description: 'text-white/75',
    trendBadge: 'bg-white/15 text-white',
    trendText: 'text-white/70',
    highlight: 'pointer-events-none absolute left-0 top-1/3 h-36 w-36 rounded-full bg-white/15 blur-3xl'
  },
  neutral: {
    container: 'bg-slate-900/70 text-slate-100',
    icon: 'bg-primary/15 text-primary',
    title: 'text-slate-400',
    description: 'text-slate-300/80',
    trendBadge: 'bg-primary/15 text-primary',
    trendText: 'text-slate-400',
    highlight: ''
  }
};

const styles = computed(() => variantMap[props.variant]);

const trendValue = computed(() => props.trendValue);
const trendPositive = computed(() => props.trendPositive);
const trendLabel = computed(() => props.trendLabel ?? 'dibanding periode lalu');
</script>
