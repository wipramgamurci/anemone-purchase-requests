<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const props = withDefaults(
  defineProps<{
    logoAlt?: string;
    logoSrc?: string;
    branchName?: string;
  }>(),
  {
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

    <UNavigationMenu :items="navItems" />

    <template #body>
      <div
        v-if="props.branchName"
        class="mb-3 flex items-center gap-2 rounded-md px-2.5 py-1.5 lg:hidden"
      >
        <UIcon name="lucide:store" class="size-4 text-primary" />
        <span class="text-sm font-medium text-default">
          {{ props.branchName }}
        </span>
      </div>
      <UNavigationMenu
        :items="navItems"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>

    <template #right>
      <div
        v-if="props.branchName"
        class="hidden items-center gap-2 rounded-md px-2.5 py-1.5 lg:flex"
      >
        <UIcon name="lucide:store" class="size-4 text-primary" />
        <span class="text-sm font-medium text-default">
          {{ props.branchName }}
        </span>
      </div>
    </template>
  </UHeader>
</template>
