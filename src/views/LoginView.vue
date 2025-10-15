<template>
  <div class="relative min-h-screen overflow-hidden text-slate-800 transition-colors duration-700 dark:text-slate-100">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute inset-0 celestial-weave opacity-75"></div>
      <div class="absolute inset-0 nebula-grid opacity-30"></div>
      <div class="aether-float absolute -left-48 top-24 h-[26rem] w-[26rem] rounded-full bg-indigo-200/55 blur-[220px] dark:bg-indigo-500/25"></div>
      <div class="aether-wave absolute -right-40 bottom-[-18rem] h-[30rem] w-[30rem] rounded-full bg-sky-200/55 blur-[260px] dark:bg-fuchsia-500/25"></div>
    </div>
    <div class="absolute right-6 top-6 z-30 sm:right-10 sm:top-10">
      <ThemeToggle />
    </div>
    <div class="cosmic-container relative z-20 flex min-h-screen items-center py-16">
      <div class="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="aether-shell overflow-hidden p-10 text-sm">
          <div class="pointer-events-none absolute inset-0 opacity-85">
            <div class="absolute -left-28 top-0 h-48 w-48 rounded-full bg-indigo-200/45 blur-[200px] dark:bg-indigo-500/20"></div>
            <div class="absolute -right-24 bottom-[-40%] h-56 w-56 rounded-full bg-sky-200/45 blur-[220px] dark:bg-purple-500/20"></div>
          </div>
          <div class="relative space-y-8">
            <span class="aether-chip text-indigo-500">Aether Workforce Portal</span>
            <div class="space-y-4">
              <h1 class="text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
                Platform SDM sinergi untuk PT Anugerah Mitra Kalimantan
              </h1>
              <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-300">
                Rasakan komando peopleverse dengan animasi aurora, insight realtime, dan mode terang gelap adaptif. Semua modul kepegawaian, kontrak, dan wellbeing kini hadir dalam satu pengalaman futuristik.
              </p>
            </div>
            <div class="grid gap-4 sm:grid-cols-3">
              <div class="rounded-[26px] border border-white/70 bg-white/85 p-5 transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.6rem] uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">Keamanan</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Audit realtime</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Login terlindungi MFA dan monitoring otomatis.</p>
              </div>
              <div class="rounded-[26px] border border-white/70 bg-white/85 p-5 transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.6rem] uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">Operasional</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Monitoring site</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Status kehadiran, kontrak, dan wellbeing realtime.</p>
              </div>
              <div class="rounded-[26px] border border-white/70 bg-white/85 p-5 transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10">
                <p class="text-[0.6rem] uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">Dual mode</p>
                <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Terang & Gelap</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Tema responsif mengikuti preferensi perangkat.</p>
              </div>
            </div>
            <div class="grid gap-4 rounded-[28px] border border-white/70 bg-white/85 p-5 text-sm dark:border-white/10 dark:bg-white/10">
              <div class="flex items-center gap-3">
                <span class="aether-icon-sm border border-white/70 bg-white/85 text-indigo-500 dark:border-white/10 dark:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </span>
                <div>
                  <p class="font-semibold text-slate-700 dark:text-white">PT Anugerah Mitra Kalimantan</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Sinergi manajemen SDM digital dengan insight realtime.</p>
                </div>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span class="aether-pill text-[0.7rem] font-semibold text-indigo-600 dark:text-indigo-200">
                  <span class="mr-2 inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                  Sistem aktif 24/7
                </span>
                <span>Support: support@amk.co.id</span>
              </div>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-[22px] border border-white/70 bg-white/85 p-4 text-xs text-slate-500 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
                <p class="font-semibold text-slate-700 dark:text-white">Dashboard orbit</p>
                <p class="mt-1">Ringkasan kehadiran, kontrak, dan wellbeing terpadu.</p>
              </div>
              <div class="rounded-[22px] border border-white/70 bg-white/85 p-4 text-xs text-slate-500 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
                <p class="font-semibold text-slate-700 dark:text-white">Integrasi</p>
                <p class="mt-1">Terhubung ke modul HCGS dan officer site realtime.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="aether-panel relative overflow-hidden p-8 text-slate-900 dark:text-slate-100">
          <div class="pointer-events-none absolute inset-0 opacity-80">
            <div class="absolute inset-x-8 top-0 h-28 rounded-b-[48px] bg-gradient-to-b from-indigo-200/45 via-transparent to-transparent dark:from-indigo-500/25"></div>
          </div>
          <div class="relative space-y-6">
            <div class="space-y-2 text-center sm:text-left">
              <div class="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-indigo-500 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200">
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
                  class="mt-2 w-full rounded-[20px] border border-white/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
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
                    class="w-full rounded-[20px] border border-white/70 bg-white/90 px-4 py-2 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-3 inline-flex items-center justify-center text-slate-400 transition hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-200"
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
              <Button
                type="submit"
                class="w-full justify-center rounded-[20px] bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 py-2.5 text-sm font-semibold text-white shadow-[0_28px_90px_-55px_rgba(79,70,229,0.6)] transition hover:opacity-95"
                :loading="auth.state.loading"
              >
                Masuk sekarang
              </Button>
              <p
                v-if="auth.state.error"
                class="rounded-[20px] border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-center text-sm text-rose-500 dark:text-rose-200"
              >
                {{ auth.state.error }}
              </p>
            </form>
            <div class="space-y-3 rounded-[24px] border border-white/70 bg-white/85 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-400">
              <p class="font-semibold text-slate-700 dark:text-white">Tips keamanan:</p>
              <ul class="list-disc space-y-1 pl-4">
                <li>Gunakan kombinasi huruf dan angka untuk kata sandi Anda.</li>
                <li>Keluar dari akun setelah selesai menggunakan portal.</li>
                <li>Hubungi HC melalui email jika mengalami kendala akses.</li>
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
    await auth.login(form.nrp, form.password);
    const redirect = (route.query.redirect as string) ?? '/';
    await router.push(redirect);
  } catch (error) {
    console.error(error);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
