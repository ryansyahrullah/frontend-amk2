<template>
  <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">
    <span>{{ label }}</span>
    <div v-if="!isSearchable" class="mt-1">
      <select
        :id="id"
        :name="name"
        :value="modelValue ?? ''"
        :disabled="disabled"
        class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 disabled:dark:bg-slate-800/60"
        @change="onChange"
      >
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div v-else ref="root" class="relative mt-1">
      <button
        type="button"
        class="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 disabled:dark:bg-slate-800/60"
        :disabled="disabled"
        @click="toggle"
        @keydown="onKeydown"
      >
        <span class="truncate text-left">{{ displayLabel }}</span>
        <svg
          class="h-4 w-4 text-slate-400 transition-transform"
          :class="{ 'rotate-180': open }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <transition name="fade">
        <div
          v-if="open"
          class="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          <div class="border-b border-slate-100 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
            <input
              v-model="query"
              type="text"
              placeholder="Cari..."
              class="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <ul class="max-h-52 overflow-y-auto py-1">
            <li v-for="option in filteredOptions" :key="option.value">
              <button
                type="button"
                class="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-primary/10 focus:bg-primary/10 focus:outline-none dark:hover:bg-primary/20"
                @click="selectOption(option)"
              >
                <span>{{ option.label }}</span>
                <svg v-if="isSelected(option)" class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </li>
            <li v-if="filteredOptions.length === 0" class="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">
              Tidak ada hasil
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <p v-if="hint && !error" class="mt-1 text-xs text-slate-500">{{ hint }}</p>
    <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
  </label>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface Option {
  label: string;
  value: string | number;
}

const props = defineProps<{
  label: string;
  modelValue: string | number | null | undefined;
  options: Option[];
  id?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  searchable?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const disabled = computed(() => props.disabled ?? false);
const isSearchable = computed(() => props.searchable ?? false);

const open = ref(false);
const query = ref('');
const root = ref<HTMLElement | null>(null);

const isSelected = (option: Option) => String(option.value) === String(props.modelValue ?? '');

const displayLabel = computed(() => {
  const selected = props.options.find((option) => isSelected(option));
  if (selected) {
    return selected.label;
  }
  return props.placeholder ?? 'Pilih opsi';
});

const filteredOptions = computed(() => {
  if (!isSearchable.value) {
    return props.options;
  }
  const term = query.value.trim().toLowerCase();
  if (!term) {
    return props.options;
  }
  return props.options.filter((option) => option.label.toLowerCase().includes(term));
});

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};

const toggle = () => {
  if (disabled.value) return;
  open.value = !open.value;
  if (open.value) {
    query.value = '';
  }
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  open.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!root.value) return;
  if (root.value.contains(event.target as Node)) return;
  open.value = false;
};

const onKeydown = (event: KeyboardEvent) => {
  if (!open.value && (event.key === ' ' || event.key === 'Enter' || event.key === 'ArrowDown')) {
    event.preventDefault();
    toggle();
    return;
  }
  if (event.key === 'Escape') {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
