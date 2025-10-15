<template>
  <div class="relative min-h-screen overflow-hidden text-slate-800 transition-colors duration-700 dark:text-slate-100">
    <div class="pointer-events-none absolute inset-0">
      <div class="floating absolute -left-40 top-24 h-[26rem] w-[26rem] rounded-full bg-primary/18 blur-[190px] dark:bg-primary/30"></div>
      <div class="floating-slow absolute bottom-[-25%] right-[-18%] h-[30rem] w-[30rem] rounded-full bg-sky-200/45 blur-[230px] dark:bg-fuchsia-500/30"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.32),transparent_58%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_55%)] dark:bg-[linear-gradient(130deg,rgba(148,163,184,0.16)_0%,rgba(148,163,184,0)_60%)]"></div>
    </div>
    <div class="absolute right-4 top-4 z-30 sm:right-8 sm:top-8">
      <ThemeToggle />
    </div>
    <div class="safe-container relative z-20 flex min-h-screen items-center py-16">
      <div class="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section
          class="mesh-overlay relative overflow-hidden rounded-[44px] border border-white/50 bg-white/80 p-10 shadow-[0_52px_140px_-70px_rgba(15,23,42,0.68)] backdrop-blur-[30px] transition-colors duration-500 dark:border-white/10 dark:bg-white/10"
        >
          <div class="pointer-events-none absolute inset-0">
            <div class="floating absolute -top-24 left-20 h-48 w-48 rounded-full bg-primary/18 blur-3xl dark:bg-primary/30"></div>
            <div class="floating-slow absolute bottom-[-30%] right-[-18%] h-64 w-64 rounded-full bg-emerald-200/45 blur-[200px] dark:bg-emerald-500/25"></div>
          </div>
          <div class="relative space-y-10">
            <div class="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
              Horizon AMK Portal
            </div>
            <div class="space-y-4">
              <h1 class="text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
                Satu kanvas untuk memimpin talenta dan operasi PT Anugerah Mitra Kalimantan
              </h1>
              <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-300 sm:text-base">
                Portal generasi terbaru dengan tata letak horizon menghadirkan insight pegawai, progres kontrak, dan pelatihan aktif dalam tampilan sinematik yang responsif di semua mode.
              </p>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="rounded-[26px] border border-white/60 bg-white/75 p-5 transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Keamanan</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Single Sign-On</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Autentikasi internal lengkap dengan audit trail realtime.</p>
              </div>
              <div class="rounded-[26px] border border-white/60 bg-white/75 p-5 transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Operasional</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Monitoring site</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Visualisasi kontrak, penugasan, dan kehadiran lintas lokasi.</p>
              </div>
            </div>
            <div class="grid gap-4 rounded-[28px] border border-white/60 bg-white/80 p-5 text-sm transition dark:border-white/10 dark:bg-white/10">
              <div class="flex items-center gap-3">
                <span class="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-primary/10 text-primary dark:bg-primary/25 dark:text-primary/90">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </span>
                <div>
                  <p class="font-semibold text-slate-700 dark:text-white">PT Anugerah Mitra Kalimantan</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Ekosistem digital untuk manajemen SDM terpadu.</p>
                </div>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary dark:bg-primary/25 dark:text-primary/90">
                  <span class="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                  Sistem aktif 24/7
                </span>
                <span>Support: support@amk.co.id</span>
              </div>
            </div>
            <div class="grid gap-4 sm:grid-cols-3">
              <div class="rounded-[22px] border border-white/60 bg-white/70 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
                <p class="font-semibold text-slate-700 dark:text-white">Dashboard Horizon</p>
                <p class="mt-1">Quick glance metrik pegawai dan kontrak.</p>
              </div>
              <div class="rounded-[22px] border border-white/60 bg-white/70 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
                <p class="font-semibold text-slate-700 dark:text-white">Dual Theme</p>
                <p class="mt-1">Mode terang dan gelap adaptif otomatis.</p>
              </div>
              <div class="rounded-[22px] border border-white/60 bg-white/70 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
                <p class="font-semibold text-slate-700 dark:text-white">Ringkasan Cepat</p>
                <p class="mt-1">Peringatan kontrak & aktivitas terbaru.</p>
              </div>
            </div>
          </div>
        </section>
        <section
          class="relative overflow-hidden rounded-[38px] border border-white/50 bg-white/85 p-6 text-slate-900 shadow-[0_42px_110px_-60px_rgba(15,23,42,0.6)] backdrop-blur-[26px] transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/85 dark:text-slate-100 sm:p-8"
        >
          <div class="pointer-events-none absolute inset-0 opacity-70">
            <div class="absolute inset-x-10 top-0 h-32 rounded-b-[48px] bg-gradient-to-b from-primary/25 via-transparent to-transparent dark:from-primary/35"></div>
          </div>
          <div class="relative space-y-6">
            <div class="space-y-2 text-center sm:text-left">
              <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary dark:border-primary/30 dark:bg-primary/25 dark:text-primary/90">
                Portal pegawai
              </div>
              <h2 class="text-2xl font-semibold text-slate-900 dark:text-white">Masuk ke akun Anda</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">Gunakan NRP dan kata sandi internal untuk melanjutkan.</p>
            </div>
            <form class="space-y-5" @submit.prevent="onSubmit">
              <div>
                <label for="nrp" class="block text-sm font-medium text-slate-600 dark:text-slate-200">NRP</label>
                <input
                  id="nrp"
                  v-model="form.nrp"
                  type="text"
                  autocomplete="username"
                  placeholder="Masukkan NRP"
                  class="mt-2 w-full rounded-[18px] border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                />
                <p v-if="errors.nrp" class="mt-1 text-xs text-rose-500 dark:text-rose-300">{{ errors.nrp }}</p>
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-slate-600 dark:text-slate-200">Kata sandi</label>
                <div class="relative mt-2">
                  <input
                    id="password"
                    v-model="form.password"
                    :type="passwordType"
                    autocomplete="current-password"
                    placeholder="Masukkan kata sandi"
                    class="w-full rounded-[18px] border border-slate-200 bg-white/90 px-4 py-2 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
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
              <Button type="submit" class="w-full justify-center rounded-[18px] py-2.5 text-sm font-semibold" :loading="auth.state.loading">
                Masuk sekarang
              </Button>
              <p
                v-if="auth.state.error"
                class="rounded-[18px] border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-center text-sm text-rose-500 dark:text-rose-200"
              >
                {{ auth.state.error }}
              </p>
            </form>
            <div class="space-y-3 rounded-[24px] border border-white/60 bg-white/75 p-4 text-xs text-slate-500 transition dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
              <p class="font-semibold text-slate-700 dark:text-white">Tips keamanan:</p>
              <ul class="list-disc space-y-1 pl-4">
                <li>Jaga kerahasiaan kredensial Anda.</li>
                <li>Keluar dari akun setelah selesai menggunakan portal.</li>
                <li>Hubungi HC jika mengalami kendala akses.</li>
              </ul>
            </div>
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
