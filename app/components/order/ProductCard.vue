<script setup lang="ts">
import type { Product } from "~/types/order";
import { formatRp } from "~/utils/format";

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  add: [product: Product, qty: number];
}>();

const qty = ref(1);

function add() {
  emit("add", props.product, qty.value);
}
</script>

<template>
  <UCard class="flex flex-col" :ui="{ body: 'flex flex-col flex-1 gap-3' }">
    <div
      class="flex h-36 items-center justify-center rounded-lg bg-linear-to-br text-white"
      :class="product.available ? product.color : 'from-muted to-elevated'"
    >
      <UIcon
        name="lucide:package"
        class="size-14 opacity-80"
        :class="{ 'text-dimmed': !product.available }"
      />
    </div>

    <h3
      class="font-semibold text-default"
      :class="{ 'text-dimmed': !product.available }"
    >
      {{ product.name }}
    </h3>

    <div class="flex items-center gap-2 text-xs">
      <span class="text-muted"> Stok HO: {{ product.stock }} pcs </span>
      <UBadge
        v-if="product.available"
        color="success"
        variant="subtle"
        size="sm"
      >
        Tersedia
      </UBadge>
      <UBadge v-else color="error" variant="subtle" size="sm"> Habis </UBadge>
    </div>

    <p
      class="font-bold text-highlighted"
      :class="{ 'text-dimmed': !product.available }"
    >
      {{ formatRp(product.price) }}
      <span class="text-xs font-normal text-muted">/ pcs</span>
    </p>

    <div class="mt-auto flex items-center gap-2">
      <UiQuantityStepper
        v-if="product.available"
        v-model="qty"
        :min="1"
        :max="product.stock"
        class="w-24"
      />

      <UButton
        class="flex-1 cursor-pointer"
        :color="product.available ? 'primary' : 'neutral'"
        :icon="product.available ? 'lucide:shopping-cart' : 'lucide:ban'"
        :disabled="!product.available"
        @click="add"
      >
        {{ product.available ? "Keranjang" : "Stok Tidak Tersedia" }}
      </UButton>
    </div>
  </UCard>
</template>
