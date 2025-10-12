<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-[999] grid place-items-center bg-slate-900/60 px-4 py-6">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Perbarui Kredensial</h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Sesuaikan email dan kata sandi pegawai untuk akses AMK PORTAL.
              </p>
            </div>
            <button
              type="button"
              class="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              aria-label="Tutup"
              @click="close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="account" class="mt-5 space-y-3 text-sm">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <p class="font-semibold text-slate-800 dark:text-slate-100">{{ account.nama }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">NRP: {{ account.nrp ?? '-' }}</p>
            </div>

            <InputText
              v-model="form.email"
              label="Email Login"
              placeholder="contoh@perusahaan.com"
              :error="errors.email"
            />
            <InputText
              v-model="form.password"
              label="Kata Sandi"
              type="text"
              placeholder="Masukkan kata sandi"
              :error="errors.password"
            />
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <Button variant="ghost" @click="close">
              Batal
            </Button>
            <Button :loading="saving" :disabled="saving" @click="save">
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import Button from './Button.vue';
import InputText from './InputText.vue';
import type { ManagedAccount, ManagedCredentialPayload } from '../types';

const props = defineProps<{
  modelValue: boolean;
  account: ManagedAccount | null;
  saving?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save', payload: ManagedCredentialPayload): void;
}>();

const form = reactive({
  email: '',
  password: ''
});

const errors = reactive<{ email: string | null; password: string | null }>({
  email: null,
  password: null
});

const validateEmail = (value: string) => {
  if (!value.trim()) {
    return 'Email wajib diisi.';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value) ? null : 'Format email tidak valid.';
};

const validatePassword = (value: string) => {
  if (!value.trim()) {
    return 'Kata sandi wajib diisi.';
  }
  return value.trim().length < 4 ? 'Minimal 4 karakter.' : null;
};

const validate = () => {
  errors.email = validateEmail(form.email);
  errors.password = validatePassword(form.password);
  return !errors.email && !errors.password;
};

const reset = () => {
  form.email = props.account?.email ?? '';
  form.password = props.account?.password ?? '';
  errors.email = null;
  errors.password = null;
};

const close = () => {
  emit('update:modelValue', false);
};

const save = () => {
  if (!validate() || props.saving) {
    return;
  }
  emit('save', { email: form.email.trim(), password: form.password.trim() });
};

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      reset();
    }
  }
);

watch(
  () => props.account,
  () => {
    if (props.modelValue) {
      reset();
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
