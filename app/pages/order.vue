<script setup lang="ts">
import { useCart } from "~/composables/useCart";
import { products } from "~/data/products";
import {
  orderMeta,
  pageTitle,
  paymentMethods,
  expeditions,
} from "~/data/order";

useSeoMeta({
  title: orderMeta.title,
});

const {
  cart,
  subtotal,
  tax,
  shipping,
  total,
  expeditionId,
  setExpedition,
  addItem,
  removeItem,
  setQty,
} = useCart();

const paymentMethod = ref("bank");

const stockOf = (id: number) => products.find((p) => p.id === id)?.stock ?? 0;

const submitting = ref(false);
const stockError = ref("");
const orderSuccess = ref(false);
const stockErrorVisible = ref(false);
const orderSuccessVisible = ref(false);

async function submitOrder() {
  const overStock = cart.value.find((item) => item.qty > stockOf(item.id));
  if (overStock) {
    orderSuccess.value = false;
    orderSuccessVisible.value = false;
    stockError.value = `Stok "${overStock.name}" tidak mencukupi. Maksimal ${stockOf(overStock.id)} pcs.`;
    stockErrorVisible.value = true;
    return;
  }
  stockError.value = "";
  stockErrorVisible.value = false;
  submitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  submitting.value = false;
  orderSuccess.value = true;
  orderSuccessVisible.value = true;
}

watchEffect(() => {
  if (cart.value.length === 0) {
    orderSuccess.value = false;
    stockError.value = "";
    stockErrorVisible.value = false;
    orderSuccessVisible.value = false;
  }
});
</script>

<template>
  <UPageHeader :title="pageTitle" class="mb-6" />

  <div class="grid gap-6 lg:grid-cols-3">
    <section class="lg:col-span-2" aria-label="Katalog Produk">
      <h2 class="mb-4 text-lg font-bold text-highlighted">Katalog Produk</h2>
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
        :expeditions="expeditions"
        :expedition-id="expeditionId"
        :submitting="submitting"
        :max-of="stockOf"
        @remove="removeItem"
        @update:qty="(id, qty, max) => setQty(id, qty, max)"
        @update:payment-method="paymentMethod = $event"
        @update:expedition="setExpedition"
        @submit="submitOrder"
      >
        <template #alert>
          <UAlert
            v-if="stockErrorVisible"
            v-model:open="stockErrorVisible"
            color="error"
            variant="subtle"
            icon="lucide:alert-circle"
            close
            :title="stockError"
          />
          <UAlert
            v-else-if="orderSuccessVisible"
            v-model:open="orderSuccessVisible"
            color="success"
            variant="subtle"
            icon="lucide:check-circle"
            close
            title="Order berhasil dikirim!"
            description="Pesanan Anda sedang diproses oleh Head Office."
          />
        </template>
      </OrderCartSummary>
    </section>
  </div>
</template>
