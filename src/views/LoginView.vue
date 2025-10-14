<template>
  <div class="relative flex min-h-screen items-center justify-center px-3 py-4 sm:px-5 sm:py-6">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-1/2 top-[-20%] h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"></div>
      <div class="absolute bottom-[-25%] right-[-10%] h-80 w-80 rounded-full bg-blue-200/40 blur-[180px]"></div>
    </div>
    <div class="absolute right-4 top-4 z-20 sm:right-8 sm:top-8">
      <ThemeToggle />
    </div>
    <div class="relative z-10 w-full max-w-[22rem] space-y-3.5 sm:max-w-sm sm:space-y-4">
      <section class="relative flex min-h-[120px] items-center overflow-hidden rounded-3xl shadow-glow sm:min-h-[150px]">
        <img
          src="/bg.svg"
          alt="Latar belakang AMK PORTAL"
          class="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-blue-950/80 backdrop-saturate-[1.2] dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-950/85"
        ></div>
        <div class="relative flex h-full w-full flex-col items-center justify-center gap-3.5 p-4 text-white text-center sm:gap-4 sm:p-5">
          <div class="space-y-2.5 sm:space-y-3.5">
            <p class="text-[0.68rem] font-semibold uppercase tracking-[0.45em] text-white/70 sm:text-xs">AMK PORTAL</p>
            <h1 class="text-base font-semibold leading-snug sm:text-2xl">
              PT ANUEGARAH MITRA KALIMANTAN
            </h1>
          </div>
        </div>
      </section>
      <section class="rounded-3xl border border-slate-200/60 bg-white/90 p-3.5 shadow-xl backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/80 sm:p-5">
        <div class="mb-4 space-y-1">
          <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">MASUK AMK PORTAL</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">Silakan masukkan NRP dan kata sandi Anda</p>
        </div>
        <form class="space-y-3 sm:space-y-3.5" @submit.prevent="onSubmit">
          <div>
            <label for="nrp" class="block text-sm font-medium text-slate-700 dark:text-slate-200">NRP</label>
            <input
              id="nrp"
              v-model="form.nrp"
              type="text"
              autocomplete="username"
              placeholder="Masukkan NRP"
              class="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 sm:px-4 sm:py-2"
            />
            <p v-if="errors.nrp" class="mt-1 text-xs text-rose-500 dark:text-rose-300">{{ errors.nrp }}</p>

          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-200">Kata Sandi</label>
            <div class="relative mt-1.5">
              <input
                id="password"
                v-model="form.password"
                :type="passwordType"
                autocomplete="current-password"
                placeholder="Masukkan kata sandi"
                class="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-1.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 sm:px-4 sm:py-2"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-3 inline-flex items-center justify-center text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                @click="togglePasswordVisibility"
                :aria-pressed="showPassword"
                :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 00-4.95-2.121" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4l16 16" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-rose-500 dark:text-rose-300">{{ errors.password }}</p>
          </div>
          <Button type="submit" class="w-full justify-center py-2 text-sm" :loading="auth.state.loading">
            Masuk Sekarang
          </Button>
          <p
            v-if="auth.state.error"
            class="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-center text-sm text-rose-500 dark:text-rose-200"
          >
            {{ auth.state.error }}
          </p>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '../components/Button.vue';
import ThemeToggle from '../components/ThemeToggle.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const form = reactive({
  nrp: '',
  password: ''
});

const errors = reactive<{ nrp: string | null; password: string | null }>({
  nrp: null,
  password: null
});

const showPassword = ref(false);
const passwordType = computed(() => (showPassword.value ? 'text' : 'password'));

const validate = () => {
  errors.nrp = !form.nrp
    ? 'NRP wajib diisi.'
    : form.nrp.length < 3
      ? 'NRP minimal 3 karakter.'
      : null;
  errors.password = !form.password
    ? 'Kata sandi wajib diisi.'
    : form.password.length < 3
      ? 'Kata sandi minimal 3 karakter.'
      : null;
  return !errors.nrp && !errors.password;
};

const onSubmit = async () => {
  if (!validate()) return;
  try {
    await auth.login({ ...form });
    const redirect = (route.query.redirect as string) || auth.getDefaultRoute();
    router.replace(redirect);
  } catch (error) {
    // pesan ditangani di store
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

if (auth.isAuthenticated.value) {
  router.replace(auth.getDefaultRoute());
}
</script>
