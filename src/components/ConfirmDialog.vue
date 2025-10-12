<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[999] grid place-items-center bg-slate-900/60 px-4 py-6"
      >
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ title }}</h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ message }}</p>
          <div v-if="confirmationCode" class="mt-5 space-y-3">
            <div>
              <p class="text-sm font-medium text-slate-700 dark:text-slate-200">Ketik kode berikut untuk menghapus data:</p>
              <div
                class="mt-2 inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold tracking-widest text-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {{ confirmationCode }}
              </div>
            </div>
            <div class="space-y-2">
              <input
                v-model="confirmationInput"
                type="text"
                placeholder="Masukkan kode konfirmasi"
                class="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <p v-if="showConfirmationError" class="text-sm font-medium text-red-500">
                Isi tulisan yang muncul untuk hapus data.
              </p>
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <Button variant="ghost" @click="handleCancel">
              Batal
            </Button>
            <Button :loading="loading" variant="danger" @click="handleConfirm">
              Ya, Lanjutkan
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Button from './Button.vue';

const props = defineProps<{
  modelValue: boolean;
  title: string;
  message: string;
  loading?: boolean;
  confirmationCode?: string;
}>();

const emit = defineEmits(['update:modelValue', 'confirm']);

const confirmationInput = ref('');
const attempted = ref(false);

const normalizedConfirmation = computed(() => props.confirmationCode?.trim() ?? '');

const showConfirmationError = computed(() => {
  if (!props.confirmationCode) {
    return false;
  }
  if (!attempted.value) {
    return false;
  }
  return confirmationInput.value.trim() !== normalizedConfirmation.value;
});

const resetState = () => {
  confirmationInput.value = '';
  attempted.value = false;
};

const handleCancel = () => {
  emit('update:modelValue', false);
  resetState();
};

const handleConfirm = () => {
  if (props.confirmationCode) {
    attempted.value = true;
    if (confirmationInput.value.trim() !== normalizedConfirmation.value) {
      return;
    }
  }
  emit('confirm');
  resetState();
};

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      resetState();
    }
  }
);
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
