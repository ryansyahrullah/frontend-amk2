<template>
  <svg
    v-if="name === 'dashboard'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5M3.75 9.75h16.5M3.75 14.25h9M3.75 18.75h9" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 14.25h3.75M16.5 18.75h3.75" />
  </svg>
  <svg
    v-else-if="name === 'pegawai'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
  </svg>
  <svg
    v-else-if="name === 'list'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 6.75h15M4.5 12h15M4.5 17.25h15" />
  </svg>
  <svg
    v-else-if="name === 'leave'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 7.5H8.25A3.75 3.75 0 0 0 4.5 11.25v0A3.75 3.75 0 0 0 8.25 15H19.5" />
  </svg>
  <svg
    v-else-if="name === 'health'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75V9" />
    <path stroke-linecap="round" stroke-linejoin="round" d="m13.5 5.25-.75-1.5-.75 1.5" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-2.25" />
    <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 18.75.75 1.5.75-1.5" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12h2.25" />
    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 10.5-1.5.75 1.5.75" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12h-2.25" />
    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 13.5 1.5-.75-1.5-.75" />
    <circle cx="12" cy="12" r="3.75" />
  </svg>
  <svg
    v-else-if="name === 'contract'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75h-9A2.25 2.25 0 0 0 5.25 6v12A2.25 2.25 0 0 0 7.5 20.25h9A2.25 2.25 0 0 0 18.75 18V6A2.25 2.25 0 0 0 16.5 3.75Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25h6M9 12h6M9 15.75h3" />
  </svg>
  <svg
    v-else-if="name === 'profile'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
  </svg>
  <svg
    v-else-if="name === 'salary'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5.25h18v13.5H3z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 9h9m-9 3h9m-9 3h5.25" />
  </svg>
  <svg
    v-else-if="name === 'finance'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 19.5h16.5M4.5 8.25h15L12 4.5z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 11.25v5.25m4.5-5.25v5.25m4.5-5.25v5.25" />
  </svg>
  <svg
    v-else-if="name === 'site'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 6.75h18M3 12h18M3 17.25h9" />
    <circle cx="17" cy="17" r="2.25" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>();

const name = props.name as
  | 'dashboard'
  | 'pegawai'
  | 'list'
  | 'leave'
  | 'health'
  | 'contract'
  | 'profile'
  | 'salary'
  | 'finance'
  | 'site';
</script>
