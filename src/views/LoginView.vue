<template>
  <div class="relative flex min-h-screen items-center justify-center px-6 py-12">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-1/2 top-[-20%] h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"></div>
      <div class="absolute bottom-[-25%] right-[-10%] h-80 w-80 rounded-full bg-blue-200/40 blur-[180px]"></div>
    </div>
    <div class="absolute top-8 right-8 z-20">
      <ThemeToggle />
    </div>
    <div class="relative z-10 grid w-full max-w-5xl gap-10 lg:grid-cols-[1.15fr,1fr]">
      <section class="relative overflow-hidden rounded-3xl shadow-glow">
        <img
          src="/bg.svg"
          alt="Latar belakang AMK PORTAL"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-blue-950/80 backdrop-saturate-[1.2] dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-950/85"
        ></div>
        <div class="relative flex h-full flex-col justify-between p-10 text-white sm:p-12">
          <div class="space-y-6">
            <p class="text-sm font-semibold uppercase tracking-[0.45em] text-white/70">AMK PORTAL</p>
            <h1 class="text-4xl font-semibold leading-snug sm:text-[2.65rem]">
              PT ANUEGARAH MITRA KALIMANTAN
            </h1>
          </div>
          <div class="mt-16 flex items-center gap-4 text-sm text-white/80">
            <div class="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <p class="text-xs uppercase tracking-[0.4em] text-white/60">SISTEM MANAJAMEN AMK</p>
              <p class="text-sm font-semibold text-white">KEMUDAHAN AKSES DIMANA SAJA DAN KAPAN SAJA</p>
            </div>
          </div>
        </div>
      </section>
      <section class="rounded-3xl border border-slate-200/60 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/80">
        <div class="mb-8 space-y-2">
          <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">MASUK AMK PORTAL</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Silakan masukkan NRP dan kata sandi Anda</p>
        </div>
        <form class="space-y-5" @submit.prevent="onSubmit">
          <div>
            <label for="nrp" class="block text-sm font-medium text-slate-700 dark:text-slate-200">NRP</label>
            <input
              id="nrp"
              v-model="form.nrp"
              type="text"
              autocomplete="username"
              placeholder="Masukkan NRP"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
            />
            <p v-if="errors.nrp" class="mt-1 text-xs text-rose-500 dark:text-rose-300">{{ errors.nrp }}</p>
      
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-200">Kata Sandi</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              placeholder="Masukkan kata sandi"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
            />
            <p v-if="errors.password" class="mt-1 text-xs text-rose-500 dark:text-rose-300">{{ errors.password }}</p>
          </div>
          <Button type="submit" class="w-full justify-center" :loading="auth.state.loading">
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
import { reactive } from 'vue';
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

if (auth.isAuthenticated.value) {
  router.replace(auth.getDefaultRoute());
}
</script>
