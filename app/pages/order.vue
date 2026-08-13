<script setup lang="ts">
import { useCart } from "~/composables/useCart";
import { products } from "~/data/products";
import { orderMeta, pageTitle, paymentMethods } from "~/data/order";

useSeoMeta({
  title: orderMeta.title,
});

const { cart, subtotal, tax, shipping, total, addItem, removeItem, setQty } =
  useCart();

const paymentMethod = ref("bank");

const stockOf = (id: number) => products.find((p) => p.id === id)?.stock ?? 0;

const submitting = ref(false);
const stockError = ref("");

async function submitOrder() {
  const overStock = cart.value.find((item) => item.qty > stockOf(item.id));
  if (overStock) {
    stockError.value = `Stok "${overStock.name}" tidak mencukupi. Maksimal ${stockOf(overStock.id)} pcs.`;
    return;
  }
  stockError.value = "";
  submitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));
  submitting.value = false;
}
</script>

<template>
  <UPageHeader :title="pageTitle" class="mb-6" />

  <div class="grid gap-6 lg:grid-cols-3">
    <section class="lg:col-span-2" aria-label="Katalog Produk">
      <div class="grid gap-4 sm:grid-cols-2">
        <OrderProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add="(product, qty) => addItem(product, qty)"
        />
      </div>
    </section>

    <section aria-label="Ringkasan Pesanan">
      <OrderCartSummary
        :items="cart"
        :subtotal="subtotal"
        :tax="tax"
        :shipping="shipping"
        :total="total"
        :payment-methods="paymentMethods"
        :payment-method="paymentMethod"
        :submitting="submitting"
        :max-of="stockOf"
        @remove="removeItem"
        @update:qty="setQty"
        @update:payment-method="paymentMethod = $event"
        @submit="submitOrder"
      >
        <template #alert>
          <UAlert
            v-if="stockError"
            color="error"
            variant="subtle"
            icon="lucide:alert-circle"
            :title="stockError"
          />
        </template>
      </OrderCartSummary>
    </section>
  </div>
</template>
