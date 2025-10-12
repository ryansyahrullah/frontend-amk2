<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-[999] grid place-items-center bg-slate-900/60 px-4 py-6">
        <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Kelola Role Pegawai</h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Pilih role tambahan yang ingin diberikan kepada pegawai berikut.
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

          <div v-if="account" class="mt-5 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-800/60">
            <p class="font-semibold text-slate-800 dark:text-slate-100">{{ account.nama }}</p>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2">
                <span class="text-xs uppercase tracking-widest text-slate-400">NRP</span>
                <span class="font-mono text-sm">{{ account.nrp ?? '-' }}</span>
              </span>
              <span class="flex items-center gap-2">
                <span class="text-xs uppercase tracking-widest text-slate-400">Email</span>
                <span>{{ account.email }}</span>
              </span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                Pegawai aktif
              </span>
              <span>Role pegawai wajib dimiliki dan tidak dapat dihapus.</span>
            </div>
          </div>

          <div class="mt-6 space-y-4">
            <div v-for="role in availableRoles" :key="role.value" class="flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-primary/40 dark:border-slate-700 dark:hover:border-primary/60">
              <label class="flex flex-1 cursor-pointer items-start gap-3">
                <span class="mt-0.5">
                  <input
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-800"
                    :checked="isChecked(role.value)"
                    @change="toggle(role.value)"
                  />
                </span>
                <span class="space-y-1">
                  <span class="block text-sm font-semibold text-slate-800 dark:text-slate-100">{{ role.label }}</span>
                  <span v-if="role.description" class="block text-xs text-slate-500 dark:text-slate-400">{{ role.description }}</span>
                </span>
              </label>
            </div>
            <p v-if="availableRoles.length === 0" class="text-sm text-slate-500 dark:text-slate-400">
              Belum ada role tambahan yang dapat diberikan.
            </p>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <Button variant="ghost" @click="close">
              Batal
            </Button>
            <Button :loading="saving" :disabled="saving" @click="save">
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from './Button.vue';
import type { ManagedAccount, UserRole } from '../types';

interface RoleOption {
  value: UserRole;
  label: string;
  description?: string;
}

const props = defineProps<{
  modelValue: boolean;
  account: ManagedAccount | null;
  availableRoles: RoleOption[];
  saving?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save', roles: UserRole[]): void;
}>();

const selectedRoles = ref<UserRole[]>(['pegawai']);

const ensurePegawai = (roles: UserRole[] | undefined | null) => {
  const set = new Set<UserRole>(roles ?? []);
  set.add('pegawai');
  return Array.from(set);
};

const reset = () => {
  selectedRoles.value = ensurePegawai(props.account?.roles ?? []);
};

const isChecked = (role: UserRole) => selectedRoles.value.includes(role);

const toggle = (role: UserRole) => {
  if (props.saving) {
    return;
  }
  const set = new Set<UserRole>(selectedRoles.value);
  if (set.has(role)) {
    set.delete(role);
  } else {
    set.add(role);
  }
  set.add('pegawai');
  selectedRoles.value = Array.from(set);
};

const close = () => {
  emit('update:modelValue', false);
};

const save = () => {
  emit('save', ensurePegawai(selectedRoles.value));
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
