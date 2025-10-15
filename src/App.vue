<template>
  <div
    v-if="isGuestLayout"
    class="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_60%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_58%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.18),transparent_60%)]"></div>
      <div class="aurora-sheen"></div>
      <div class="floating absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"></div>
      <div class="floating absolute bottom-[-6rem] right-[-3rem] h-72 w-72 rounded-full bg-amber-300/20 blur-3xl dark:bg-fuchsia-500/20" style="animation-delay: 1.8s"></div>
    </div>
    <div class="relative z-10 py-14 sm:py-16 lg:py-20">
      <div class="safe-container">
        <RouterView />
      </div>
    </div>
  </div>
  <div
    v-else
    class="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(56,189,248,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_12%_15%,rgba(59,130,246,0.25),transparent_60%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(249,115,22,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_88%_12%,rgba(236,72,153,0.22),transparent_62%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(37,99,235,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.25),transparent_65%)]"></div>
    </div>
    <Sidebar
      :mobile-open="isSidebarOpenMobile"
      @close-mobile="isSidebarOpenMobile = false"
    />
    <div class="relative min-h-screen transition-[padding] duration-300 ease-out lg:pl-[21rem]">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),transparent_70%)] opacity-70 dark:hidden"></div>
        <div class="absolute inset-0 hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_65%)] opacity-80 dark:block"></div>
      </div>
      <div class="relative z-10 flex min-h-screen flex-col">
        <Navbar @toggle-sidebar="handleToggleSidebar" />
        <main class="flex-1 overflow-y-auto">
          <div class="safe-container pb-16 pt-12">
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
