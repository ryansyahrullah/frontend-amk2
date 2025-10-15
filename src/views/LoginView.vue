<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-12">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_60%)]"></div>
      <div class="floating absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/15 blur-[140px] dark:bg-primary/30"></div>
      <div class="floating absolute bottom-[-18%] right-[-12%] h-96 w-96 rounded-full bg-amber-200/40 blur-[180px] dark:bg-fuchsia-500/25"></div>
    </div>
    <div class="absolute right-4 top-4 z-30 sm:right-8 sm:top-8">
      <ThemeToggle />
    </div>
    <div class="safe-container relative z-20 mx-auto w-full max-w-5xl">
      <div class="grid gap-8 rounded-[40px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_35px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-white/5 sm:p-10 lg:grid-cols-[1.05fr_1fr]">
        <section class="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/90 p-6 text-slate-700 shadow-card transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 sm:p-8">
          <div class="pointer-events-none absolute inset-0">
            <div class="absolute -top-16 left-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl dark:bg-primary/35"></div>
            <div class="absolute bottom-[-20%] right-[-15%] h-52 w-52 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/30"></div>
          </div>
          <div class="relative space-y-8">
            <div>
              <p class="text-xs uppercase tracking-[0.45em] text-slate-400 dark:text-slate-500">PORTAL AMK</p>
              <h1 class="mt-3 text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
                Satu pintu untuk orkestrasi pegawai PT Anugerah Mitra Kalimantan
              </h1>
              <p class="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-300">
                Pantau biodata, kontrak, dan penugasan site secara real-time dengan tampilan yang adaptif di mode terang maupun gelap.
              </p>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-3xl border border-slate-200/70 bg-white/85 p-4 transition dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Keamanan</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Single Sign-On</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Autentikasi internal AMK dengan audit log otomatis.</p>
              </div>
              <div class="rounded-3xl border border-slate-200/70 bg-white/85 p-4 transition dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Akses 24/7</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Portal Responsif</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Optimasi desktop, tablet, hingga perangkat mobile.</p>
              </div>
            </div>
            <div class="grid gap-4 rounded-3xl border border-slate-200/70 bg-white/85 p-4 text-sm transition dark:border-white/10 dark:bg-white/10">
              <div class="flex items-center gap-3">
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/25 dark:text-primary/90">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </span>
                <div>
                  <p class="font-semibold text-slate-700 dark:text-white">PT Anugerah Mitra Kalimantan</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Solusi terpadu untuk manajemen SDM dan penugasan site.</p>
                </div>
              </div>
              <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary dark:bg-primary/25 dark:text-primary/90">
                  <span class="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                  Sistem aktif
                </span>
                <span>Support: support@amk.co.id</span>
              </div>
            </div>
          </div>
        </section>
        <section class="relative rounded-[28px] border border-slate-200/70 bg-white/90 p-6 text-slate-900 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-100 sm:p-8">
          <div class="absolute inset-x-6 top-0 h-16 -translate-y-1/2 rounded-[32px] border border-slate-200/70 bg-white/80 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-lg dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">
            Portal Masuk Pegawai
          </div>
          <div class="mt-10 space-y-2">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">Masuk ke akun Anda</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Gunakan NRP dan kata sandi internal untuk melanjutkan.</p>
          </div>
          <form class="mt-6 space-y-5" @submit.prevent="onSubmit">
            <div>
              <label for="nrp" class="block text-sm font-medium text-slate-600 dark:text-slate-200">NRP</label>
              <input
                id="nrp"
                v-model="form.nrp"
                type="text"
                autocomplete="username"
                placeholder="Masukkan NRP"
                class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
              />
              <p v-if="errors.nrp" class="mt-1 text-xs text-rose-500 dark:text-rose-300">{{ errors.nrp }}</p>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-slate-600 dark:text-slate-200">Kata Sandi</label>
              <div class="relative mt-2">
                <input
                  id="password"
                  v-model="form.password"
                  :type="passwordType"
                  autocomplete="current-password"
                  placeholder="Masukkan kata sandi"
                  class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 inline-flex items-center justify-center text-slate-400 transition hover:text-primary dark:text-slate-500 dark:hover:text-primary/80"
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
          <div class="mt-8 space-y-3 rounded-3xl border border-slate-200/70 bg-white/80 p-4 text-xs text-slate-500 transition dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
            <p class="font-semibold text-slate-700 dark:text-white">Tips keamanan:</p>
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
