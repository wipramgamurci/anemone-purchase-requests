<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    logoAlt?: string;
    logoSrc?: string;
  }>(),
  {
    title: "",
    logoAlt: "Logo HO",
    logoSrc: "/myanemone-logo.svg",
  },
);
</script>

<template>
  <UHeader>
    <template #title>
      <img :src="props.logoSrc" :alt="props.logoAlt" class="h-8 w-auto" />
    </template>

    <h1 v-if="props.title" class="text-sm font-semibold sm:text-base">
      {{ props.title }}
    </h1>

    <template #right>
      <UButton class="cursor-pointer" color="secondary" variant="link">
        Riwayat Order
      </UButton>
    </template>
  </UHeader>
</template>