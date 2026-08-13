<script setup lang="ts">
import type { CartItem, PaymentMethod } from "~/types/order";
import { formatRp } from "~/utils/format";

defineProps<{
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethods: PaymentMethod[];
  paymentMethod: string;
  submitting?: boolean;
  maxOf?: (id: number) => number | undefined;
}>();

defineEmits<{
  remove: [id: number];
  "update:qty": [id: number, qty: number];
  "update:paymentMethod": [value: string];
  submit: [];
}>();
</script>

<template>
  <UCard :ui="{ body: 'flex flex-col gap-4' }">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="lucide:shopping-cart" class="size-5 text-primary" />
        <h2 class="font-bold text-highlighted">Ringkasan Pesanan</h2>
        <UBadge color="primary" variant="subtle" size="sm">
          {{ items.length }} Produk
        </UBadge>
      </div>
    </template>

    <slot name="alert" />

    <div v-if="items.length === 0" class="text-center text-muted">
      <UIcon name="lucide:package-open" class="mx-auto size-10 mb-2" />
      <p class="text-sm">Keranjang kosong</p>
    </div>

    <div v-else class="divide-y divide-default">
      <OrderCartItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :max="maxOf?.(item.id)"
        @remove="$emit('remove', $event)"
        @update:qty="(id, qty) => $emit('update:qty', id, qty)"
      />
    </div>

    <div class="space-y-2 border-t border-default pt-4 text-sm">
      <div class="flex justify-between">
        <span class="text-muted">Subtotal</span>
        <span class="font-medium text-default">{{ formatRp(subtotal) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-muted">Tax (11%)</span>
        <span class="font-medium text-default">{{ formatRp(tax) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-muted">Est. Ongkir (JNR)</span>
        <span class="font-medium text-default">{{ formatRp(shipping) }}</span>
      </div>
      <div
        class="flex items-center justify-between border-t border-default pt-4"
      >
        <span class="font-bold text-highlighted">Total Tagihan</span>
        <span class="text-xl font-bold text-primary">{{
          formatRp(total)
        }}</span>
      </div>
    </div>

    <div>
      <p class="mb-2 text-sm font-semibold text-default">Metode Pembayaran</p>
      <OrderPaymentMethodPicker
        :methods="paymentMethods"
        :model-value="paymentMethod"
        @update:model-value="$emit('update:paymentMethod', $event)"
      />
    </div>

    <UButton
      block
      size="lg"
      class="cursor-pointer font-bold"
      :loading="submitting"
      :disabled="items.length === 0 || submitting"
      @click="$emit('submit')"
    >
      Submit Order / Bayar
    </UButton>
  </UCard>
</template>
