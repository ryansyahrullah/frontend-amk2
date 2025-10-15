<template>
  <div
    v-if="isGuestLayout"
    class="relative min-h-screen overflow-hidden bg-transparent text-slate-800 transition-colors duration-700 dark:text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0">
      <div class="floating absolute -left-32 top-16 h-80 w-80 rounded-full bg-primary/15 blur-[180px] dark:bg-primary/35"></div>
      <div class="floating-slow absolute bottom-[-14rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-sky-200/45 blur-[220px] dark:bg-fuchsia-500/35"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.32),transparent_62%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_55%)] dark:bg-[linear-gradient(120deg,rgba(30,41,59,0.4)_0%,rgba(30,41,59,0)_60%)]"></div>
    </div>
    <div class="relative z-10 py-16 sm:py-20 lg:py-24">
      <div class="safe-container max-w-5xl">
        <RouterView />
      </div>
    </div>
  </div>
  <div
    v-else
    class="relative min-h-screen overflow-hidden bg-transparent text-slate-800 transition-colors duration-700 dark:text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0">
      <div class="floating-slow absolute -left-32 top-24 h-[22rem] w-[22rem] rounded-full bg-sky-200/50 blur-[200px] dark:bg-sky-500/30"></div>
      <div class="floating absolute bottom-[-20%] right-[-12%] h-[30rem] w-[30rem] rounded-full bg-emerald-200/45 blur-[220px] dark:bg-fuchsia-500/35"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.14),transparent_62%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(79,70,229,0.32),transparent_60%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(56,189,248,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_82%_12%,rgba(236,72,153,0.28),transparent_62%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_45%,rgba(15,23,42,0.06)_100%)] dark:bg-[linear-gradient(130deg,rgba(148,163,184,0.12)_0%,rgba(148,163,184,0)_60%)]"></div>
    </div>
    <Sidebar :mobile-open="isSidebarOpenMobile" @close-mobile="isSidebarOpenMobile = false" />
    <div class="relative min-h-screen transition-[padding] duration-500 ease-out lg:pl-[22.5rem]">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-white/65 dark:hidden"></div>
        <div class="absolute inset-0 hidden bg-slate-950/40 dark:block"></div>
        <div class="absolute inset-0 opacity-70">
          <div class="absolute inset-0 skyline-grid"></div>
          <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(59,130,246,0.08),transparent_55%)] dark:bg-[linear-gradient(120deg,rgba(59,130,246,0.18),transparent_55%)]"></div>
        </div>
      </div>
      <div class="relative z-10 flex min-h-screen flex-col">
        <Navbar @toggle-sidebar="handleToggleSidebar" />
        <main class="flex-1 overflow-y-auto">
          <div class="safe-container pb-16 pt-10">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

const route = useRoute();

const isSidebarOpenMobile = ref(false);

const isGuestLayout = computed(() => route.meta.layout === 'guest');

const handleToggleSidebar = () => {
  if (window.innerWidth < 1024) {
    isSidebarOpenMobile.value = !isSidebarOpenMobile.value;
  }
};

watch(
  () => route.fullPath,
  () => {
    isSidebarOpenMobile.value = false;
  }
);
</script>
