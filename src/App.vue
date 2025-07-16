<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>

      <nav class="space-x-2">
        <RouterLink class="underline" to="/">Home</RouterLink>
        <RouterLink class="underline" to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
