<template>
  <div class="space-y-3">
    <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{{ label }}</span>
      <div class="mt-1 flex flex-wrap items-center gap-3">
        <input ref="fileInput" type="file" class="hidden" :accept="accept" @change="onFileChange" />
        <Button type="button" variant="secondary" size="sm" @click="triggerFileDialog">{{ buttonLabel }}</Button>
        <span
          class="text-xs text-slate-500 dark:text-slate-400"
          :class="{ 'text-slate-900 dark:text-slate-100': modelValue }"
        >
          {{ displayName }}
        </span>
        <button
          v-if="modelValue"
          type="button"
          class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          @click="clearFile"
        >
          Hapus
        </button>
      </div>
      <p v-if="hint && !error" class="mt-1 text-xs text-slate-500">{{ hint }}</p>
      <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
    </label>

    <FilePreview
      v-if="withPreview && modelValue"
      :file-name="modelValue"
      :label="previewLabel || label"
      :preset-kind="previewKind"
      :custom-preview-src="previewSrc"
      removable
      @remove="clearFile"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Button from './Button.vue';
import FilePreview from './FilePreview.vue';
import { formatFileName, resolvePreviewSource } from '../utils/filePreview';

const props = defineProps<{
  label: string;
  modelValue: string | null | undefined;
  accept?: string;
  placeholder?: string;
  buttonLabel?: string;
  error?: string;
  hint?: string;
  preview?: boolean;
  previewLabel?: string;
  previewKind?: 'image' | 'document';
  previewPlaceholder?: string | null;
}>();

const emit = defineEmits(['update:modelValue']);

const fileInput = ref<HTMLInputElement | null>(null);

const buttonLabel = props.buttonLabel ?? 'Pilih File';

const withPreview = computed(() => props.preview ?? false);

const displayName = computed(() => {
  if (props.modelValue) {
    return formatFileName(props.modelValue);
  }
  return props.placeholder || 'Belum ada file';
});

const previewSrc = computed(() => {
  if (!props.previewPlaceholder) return null;
  return resolvePreviewSource(props.previewKind ?? 'document', props.previewPlaceholder || undefined);
});

const triggerFileDialog = () => {
  fileInput.value?.click();
};

const clearFile = () => {
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  emit('update:modelValue', '');
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  emit('update:modelValue', file ? file.name : '');
};
</script>
