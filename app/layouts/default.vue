<script setup lang="ts">
const branchName = "Outlet Denpasar Utara II";
</script>

<template>
  <div class="min-h-screen">
    <AppHeader :branch-name="branchName" />
    <UContainer class="py-6">
      <slot />
    </UContainer>
  </div>
</template>