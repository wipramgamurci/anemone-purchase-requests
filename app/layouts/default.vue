<script setup lang="ts">
const branchName = "Outlet Denpasar Utara II";
</script>

<template>
  <div class="min-h-screen">
    <UiAppHeader :branch-name="branchName" />
    <UContainer class="py-6">
      <slot />
    </UContainer>
  </div>
</template>
