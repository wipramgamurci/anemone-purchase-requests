<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const props = withDefaults(
  defineProps<{
    title?: string;
    logoAlt?: string;
    logoSrc?: string;
    branchName?: string;
  }>(),
  {
    title: "",
    logoAlt: "Logo HO",
    logoSrc: "/myanemone-logo.svg",
    branchName: "",
  },
);

const navItems = ref<NavigationMenuItem[]>([
  {
    label: "Beranda",
    to: "/",
  },
  {
    label: "Form Order",
    to: "/order",
  },
  {
    label: "Riwayat Order",
    to: "/order-history",
  },
]);
</script>

<template>
  <UHeader>
    <template #title>
      <img :src="props.logoSrc" :alt="props.logoAlt" class="h-8 w-auto" />
    </template>

    <!-- <h1 v-if="props.title" class="text-sm font-semibold sm:text-base">
      {{ props.title }}
    </h1> -->
    <UNavigationMenu :items="navItems" />

    <template #right>
      <div
        v-if="props.branchName"
        class="flex items-center gap-2 rounded-md px-2.5 py-1.5"
      >
        <UIcon name="lucide:store" class="size-4 text-primary" />
        <span class="text-sm font-medium text-default">{{ props.branchName }}</span>
      </div>
    </template>
  </UHeader>
</template>
