<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-1 items-center justify-center">
    <div class="text-center">
      <h3 class="mb-2 text-2xl font-bold text-slate-900">Page Not Found</h3>
      <p class="text-slate-500">The page you are looking for does not exist.</p>
      <RouterLink to="/" class="font-medium text-blue-500 hover:underline"
        >Go back to Home</RouterLink
      >
    </div>
  </div>
</template>
