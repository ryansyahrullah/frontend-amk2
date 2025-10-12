<template>
  <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
    <div class="flex items-start gap-3">
      <div
        class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-inner dark:border-slate-700 dark:bg-slate-900"
      >
        <img v-if="kind === 'image'" :src="previewSrc" alt="Preview" class="h-full w-full object-cover" />
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="h-10 w-10 text-slate-400">
          <path
            fill="currentColor"
            d="M32 4H12a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V12zM18 36h-4v-4h4zm0-8h-4v-4h4zm0-8h-4v-4h4zm16 16H22v-4h12zm0-8H22v-4h12z"
          />
        </svg>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <div>
          <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">{{ label }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ displayName }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" type="button" @click="showModal = true">Lihat</Button>
          <Button
            v-if="removable"
            size="sm"
            variant="ghost"
            type="button"
            class="text-rose-500 hover:text-rose-600 dark:text-rose-400"
            @click="$emit('remove')"
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/70 p-4">
        <div class="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ label }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ displayName }}</p>
            </div>
            <button
              type="button"
              class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              @click="showModal = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15 9-6 6m0-6 6 6" />
              </svg>
            </button>
          </div>
          <div class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
            <img
              v-if="kind === 'image'"
              :src="previewSrc"
              alt="Preview"
              class="max-h-[60vh] w-full object-contain"
            />
            <div v-else class="flex h-64 flex-col items-center justify-center gap-3 p-6 text-center text-slate-500 dark:text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="h-16 w-16 text-sky-400">
                <path
                  fill="currentColor"
                  d="M44 4H20a4 4 0 0 0-4 4v48a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V14zm-4 32H24v-4h16zm0-8H24v-4h16zm0-8H24v-4h16z"
                />
              </svg>
              <p class="text-sm font-medium">Pratinjau dokumen belum tersedia.</p>
              <p class="text-xs text-slate-400">Silakan unduh berkas asli saat integrasi dengan server.</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Button from './Button.vue';
import { formatFileName, resolvePreviewKind, resolvePreviewSource } from '../utils/filePreview';

const props = defineProps<{
  fileName: string | null | undefined;
  label: string;
  presetKind?: 'image' | 'document';
  removable?: boolean;
  customPreviewSrc?: string | null;
}>();

const showModal = ref(false);

const kind = computed(() => props.presetKind ?? resolvePreviewKind(props.fileName || undefined));

const previewSrc = computed(() => resolvePreviewSource(kind.value, props.customPreviewSrc || undefined));

const displayName = computed(() => formatFileName(props.fileName || undefined));

const removable = computed(() => props.removable ?? false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
