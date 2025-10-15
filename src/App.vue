<template>
  <div
    v-if="isGuestLayout"
    class="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),transparent_65%)]"></div>
      <div class="aurora-sheen"></div>
      <div class="floating absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl"></div>
      <div class="floating absolute bottom-[-5rem] right-[-2rem] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" style="animation-delay: 1.8s"></div>
    </div>
    <div class="relative z-10 py-10 sm:py-12 lg:py-16">
      <div class="safe-container">
        <RouterView />
      </div>
    </div>
  </div>
  <div
    v-else
    class="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
  >
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.15),transparent_60%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(236,72,153,0.12),transparent_65%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.18),transparent_55%)]"></div>
    </div>
    <Sidebar
      :mobile-open="isSidebarOpenMobile"
      @close-mobile="isSidebarOpenMobile = false"
    />
    <div class="relative min-h-screen transition-[padding] duration-300 ease-out lg:pl-[19rem]">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),transparent_65%)]"></div>
      <div class="relative z-10 flex min-h-screen flex-col">
        <Navbar @toggle-sidebar="handleToggleSidebar" />
        <main class="flex-1 overflow-y-auto">
          <div class="safe-container pb-12 pt-10">
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
