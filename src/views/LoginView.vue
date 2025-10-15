<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_60%)]"></div>
      <div class="absolute -left-28 top-1/4 h-72 w-72 rounded-full bg-primary/25 blur-[140px]"></div>
      <div class="absolute bottom-[-20%] right-[-15%] h-96 w-96 rounded-full bg-violet-500/25 blur-[180px]"></div>
    </div>
    <div class="absolute right-4 top-4 z-30 sm:right-8 sm:top-8">
      <ThemeToggle />
    </div>
    <div class="safe-container relative z-20 mx-auto w-full max-w-5xl">
      <div class="grid gap-8 rounded-[40px] border border-white/10 bg-white/10 p-6 shadow-[0_40px_80px_-50px_rgba(56,189,248,0.7)] backdrop-blur-2xl sm:p-10 lg:grid-cols-[1.1fr_1fr]">
        <section class="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/70 p-6 text-slate-100 shadow-inner sm:p-8">
          <div class="pointer-events-none absolute inset-0">
            <div class="absolute -top-12 left-12 h-36 w-36 rounded-full bg-primary/30 blur-3xl"></div>
            <div class="absolute bottom-[-20%] right-[-10%] h-48 w-48 rounded-full bg-sky-400/30 blur-3xl"></div>
          </div>
          <div class="relative space-y-6">
            <div>
              <p class="text-xs uppercase tracking-[0.45em] text-white/60">AMK Portal</p>
              <h1 class="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">Selamat datang di pusat kendali SDM AMK</h1>
              <p class="mt-3 text-sm leading-relaxed text-white/70">
                Akses data pegawai, kelola kontrak, dan pantau aktivitas terbaru dengan antarmuka yang dipersonalisasi untuk tim Anda.
              </p>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p class="text-[0.65rem] uppercase tracking-[0.35em] text-white/60">Keamanan</p>
                <p class="mt-2 text-xl font-semibold text-white">Single Sign-On</p>
                <p class="mt-1 text-xs text-white/60">Menggunakan autentikasi internal AMK</p>
              </div>
              <div class="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p class="text-[0.65rem] uppercase tracking-[0.35em] text-white/60">Layanan 24/7</p>
                <p class="mt-2 text-xl font-semibold text-white">Portal Responsif</p>
                <p class="mt-1 text-xs text-white/60">Optimasi perangkat mobile & desktop</p>
              </div>
            </div>
            <div class="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p class="font-semibold text-white">PT Anugerah Mitra Kalimantan</p>
              <p class="mt-1 text-xs text-white/60">Solusi terintegrasi untuk manajemen pegawai, kontrak, dan pelaporan.</p>
            </div>
          </div>
        </section>
        <section class="relative rounded-[28px] border border-white/15 bg-white/80 p-6 text-slate-900 shadow-xl backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80 dark:text-slate-100 sm:p-8">
          <div class="absolute inset-x-6 top-0 h-16 -translate-y-1/2 rounded-[32px] border border-white/20 bg-white/60 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-600 shadow-lg dark:bg-slate-900/90 dark:text-slate-200">
            Portal Masuk Pegawai
          </div>
          <div class="mt-10 space-y-2">
            <h2 class="text-xl font-semibold sm:text-2xl">Masuk ke akun Anda</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Gunakan NRP dan kata sandi internal untuk melanjutkan.</p>
          </div>
          <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
            <div>
              <label for="nrp" class="block text-sm font-medium text-slate-700 dark:text-slate-200">NRP</label>
              <input
                id="nrp"
                v-model="form.nrp"
                type="text"
                autocomplete="username"
                placeholder="Masukkan NRP"
                class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
              />
              <p v-if="errors.nrp" class="mt-1 text-xs text-rose-500 dark:text-rose-300">{{ errors.nrp }}</p>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-200">Kata Sandi</label>
              <div class="relative mt-2">
                <input
                  id="password"
                  v-model="form.password"
                  :type="passwordType"
                  autocomplete="current-password"
                  placeholder="Masukkan kata sandi"
                  class="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 inline-flex items-center justify-center text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  @click="togglePasswordVisibility"
                  :aria-pressed="showPassword"
                  :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 00-4.95-2.121" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4l16 16" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-xs text-rose-500 dark:text-rose-300">{{ errors.password }}</p>
            </div>
            <Button type="submit" class="w-full justify-center rounded-2xl py-2.5 text-sm font-semibold" :loading="auth.state.loading">
              Masuk Sekarang
            </Button>
            <p
              v-if="auth.state.error"
              class="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-center text-sm text-rose-500 dark:text-rose-200"
            >
              {{ auth.state.error }}
            </p>
          </form>
          <div class="mt-8 space-y-3 rounded-3xl border border-slate-200/60 bg-white/70 p-4 text-xs text-slate-600 dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-300">
            <p class="font-semibold">Tips keamanan:</p>
            <ul class="list-disc space-y-1 pl-4">
              <li>Jaga kerahasiaan kredensial Anda.</li>
              <li>Keluar dari akun setelah selesai menggunakan portal.</li>
              <li>Hubungi HC jika mengalami kendala akses.</li>
            </ul>
          </div>
        </section>
      </div>
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
