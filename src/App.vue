<template>
  <div
    v-if="isGuestLayout"
    class="relative min-h-screen overflow-hidden text-slate-800 transition-colors duration-700 dark:text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute inset-0 celestial-weave"></div>
      <div class="absolute inset-0 nebula-grid"></div>
      <div class="aether-float absolute -left-32 top-12 h-[26rem] w-[26rem] rounded-full bg-indigo-200/50 blur-[240px] dark:bg-indigo-500/20"></div>
      <div class="aether-wave absolute -right-40 bottom-[-12rem] h-[32rem] w-[32rem] rounded-full bg-sky-200/55 blur-[240px] dark:bg-sky-500/25"></div>
    </div>
    <div class="relative z-10 py-16 sm:py-20 lg:py-24">
      <div class="cosmic-container-compact">
        <RouterView />
      </div>
    </div>
  </div>
  <div
    v-else
    class="relative min-h-screen overflow-hidden text-slate-700 transition-colors duration-700 dark:text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0 -z-20">
      <div class="absolute inset-0 celestial-weave opacity-80"></div>
      <div class="absolute inset-0 nebula-grid opacity-40"></div>
      <div class="aether-float absolute -left-28 top-32 h-[30rem] w-[30rem] rounded-full bg-indigo-200/45 blur-[240px] dark:bg-indigo-500/25"></div>
      <div class="aether-orbit absolute -right-32 bottom-[-14rem] h-[36rem] w-[36rem] rounded-full bg-sky-200/50 blur-[250px] dark:bg-purple-500/25"></div>
    </div>
    <Sidebar :mobile-open="isSidebarOpenMobile" @close-mobile="isSidebarOpenMobile = false" />
    <div class="relative flex min-h-screen flex-col transition-[padding] duration-500 ease-out lg:pl-[22rem] xl:pl-[24rem]">
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-white/70 backdrop-blur-[2px] dark:bg-slate-950/65"></div>
      </div>
      <div class="relative z-10 flex min-h-screen flex-col">
        <Navbar @toggle-sidebar="handleToggleSidebar" />
        <main class="flex-1 overflow-y-auto">
          <div class="cosmic-container-wide pb-20 pt-12">
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
