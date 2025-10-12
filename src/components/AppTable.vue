<template>
  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div class="block divide-y divide-slate-200 dark:divide-slate-800 md:hidden">
      <template v-if="loading">
        <div v-for="n in 3" :key="`skeleton-${n}`" class="space-y-3 p-4">
          <div class="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
          <div class="h-3 w-2/3 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/80"></div>
          <div class="h-3 w-1/2 animate-pulse rounded bg-slate-200/60 dark:bg-slate-700/60"></div>
        </div>
      </template>
      <div v-else-if="!items.length" class="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
        <slot name="empty">
          <div class="flex flex-col items-center gap-2">
            <span class="text-2xl">😶</span>
            <span>{{ emptyMessage }}</span>
          </div>
        </slot>
      </div>
      <div v-else v-for="item in items" :key="itemKey(item)" class="space-y-3 p-4">
        <div v-for="column in columns" :key="`mobile-${column.key}`" class="space-y-1">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {{ column.label }}
          </p>
          <div :class="mobileValueClass(column.key)">
            <slot :name="`cell-${column.key}`" :item="item">
              <span class="text-sm text-slate-700 dark:text-slate-200">{{ item[column.key] ?? '-' }}</span>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:block">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead class="bg-slate-50 dark:bg-slate-800/60">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                scope="col"
                class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300"
                :class="alignmentClass(column.align)"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 bg-white text-sm dark:divide-slate-800 dark:bg-slate-900">
            <tr v-if="loading" v-for="n in 5" :key="`desktop-skeleton-${n}`">
              <td :colspan="columns.length" class="px-4 py-4">
                <div class="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
              </td>
            </tr>
            <tr v-else-if="!items.length">
              <td :colspan="columns.length" class="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                <slot name="empty">
                  <div class="flex flex-col items-center gap-2">
                    <span class="text-2xl">😶</span>
                    <span>{{ emptyMessage }}</span>
                  </div>
                </slot>
              </td>
            </tr>
            <tr v-else v-for="item in items" :key="itemKey(item)" class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <td
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 text-sm text-slate-700 dark:text-slate-200"
                :class="alignmentClass(column.align)"
              >
                <slot :name="`cell-${column.key}`" :item="item">
                  {{ item[column.key] ?? '-' }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ColumnDef {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

const props = defineProps<{
  columns: ColumnDef[];
  items: Record<string, any>[];
  loading?: boolean;
  emptyMessage?: string;
  rowKey?: string;
}>();

const alignmentClass = (align?: 'left' | 'center' | 'right') => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};

const itemKey = (item: Record<string, any>) => {
  if (props.rowKey) return item[props.rowKey];
  return JSON.stringify(item);
};

const emptyMessage = computed(() => props.emptyMessage ?? 'Belum ada data yang dapat ditampilkan.');

const mobileValueClass = (key: string) => {
  if (key === 'actions') {
    return 'mt-2 flex flex-wrap gap-2';
  }
  return 'break-words text-sm font-medium text-slate-700 dark:text-slate-200';
};
</script>
