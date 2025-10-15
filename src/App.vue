<template>
  <div
    v-if="isGuestLayout"
    class="relative min-h-screen overflow-hidden text-slate-800 transition-colors duration-700 dark:text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute inset-0 aurora-layer opacity-80"></div>
      <div class="absolute inset-0 nova-dot-grid opacity-25"></div>
      <div class="floating absolute -left-40 top-20 h-[24rem] w-[24rem] rounded-full bg-sky-200/60 blur-[180px]"></div>
      <div class="floating-slow absolute -right-48 bottom-[-16rem] h-[28rem] w-[28rem] rounded-full bg-emerald-200/55 blur-[220px] dark:bg-fuchsia-500/25"></div>
    </div>
    <div class="relative z-10 py-16 sm:py-24 lg:py-28">
      <div class="safe-container-tight">
        <RouterView />
      </div>
    </div>
  </div>
  <div
    v-else
    class="relative min-h-screen overflow-hidden text-slate-700 transition-colors duration-700 dark:text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0 -z-20">
      <div class="absolute inset-0 aurora-layer opacity-70"></div>
      <div class="absolute inset-0 nova-dot-grid opacity-[0.18]"></div>
      <div class="floating absolute -left-32 top-24 h-[28rem] w-[28rem] rounded-full bg-sky-200/55 blur-[220px] dark:bg-sky-500/30"></div>
      <div class="floating-slow absolute -right-40 bottom-[-10rem] h-[32rem] w-[32rem] rounded-full bg-emerald-200/55 blur-[240px] dark:bg-purple-500/25"></div>
    </div>
    <Sidebar :mobile-open="isSidebarOpenMobile" @close-mobile="isSidebarOpenMobile = false" />
    <div class="relative flex min-h-screen flex-col transition-[padding] duration-500 ease-out lg:pl-[21rem] xl:pl-[22.5rem]">
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-white/65 backdrop-blur-[1px] dark:bg-slate-950/65"></div>
      </div>
      <div class="relative z-10 flex min-h-screen flex-col">
        <Navbar @toggle-sidebar="handleToggleSidebar" />
        <main class="flex-1 overflow-y-auto">
          <div class="safe-container-wide pb-16 pt-10">
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
