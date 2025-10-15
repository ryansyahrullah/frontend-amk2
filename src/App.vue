<template>
  <div v-if="isGuestLayout" class="relative min-h-screen overflow-hidden text-slate-700 dark:text-slate-100">
    <div class="pointer-events-none absolute inset-0">
      <div class="floating absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/55 blur-[160px]"></div>
      <div class="floating-slow absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-200/50 blur-[200px]"></div>
      <div class="absolute inset-0 mesh-light opacity-70"></div>
    </div>
    <div class="relative z-10 py-16 sm:py-20 lg:py-24">
      <div class="safe-container max-w-4xl">
        <RouterView />
      </div>
    </div>
  </div>
  <div v-else class="relative min-h-screen overflow-hidden text-slate-700 transition-colors duration-700 dark:text-slate-100">
    <div class="pointer-events-none absolute inset-0">
      <div class="floating absolute -left-32 top-16 h-[20rem] w-[20rem] rounded-full bg-sky-200/60 blur-[200px] dark:bg-sky-500/35"></div>
      <div class="floating-slow absolute -right-40 bottom-[-8rem] h-[26rem] w-[26rem] rounded-full bg-emerald-200/55 blur-[220px] dark:bg-fuchsia-500/30"></div>
      <div class="absolute inset-0 mesh-light opacity-60"></div>
    </div>
    <Sidebar :mobile-open="isSidebarOpenMobile" @close-mobile="isSidebarOpenMobile = false" />
    <div class="relative min-h-screen transition-[padding] duration-500 ease-out lg:pl-[19rem] xl:pl-[20.5rem]">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-white/70 dark:hidden"></div>
        <div class="absolute inset-0 hidden bg-slate-950/40 dark:block"></div>
      </div>
      <div class="relative z-10 flex min-h-screen flex-col">
        <Navbar @toggle-sidebar="handleToggleSidebar" />
        <main class="flex-1 overflow-y-auto">
          <div class="safe-container pb-16 pt-8">
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
