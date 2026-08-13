<script setup lang="ts">
import { formatRp } from "~/utils/format";
import { useCart } from "~/composables/useCart";

useSeoMeta({
  title: "Order Cabang - Outlet Denpasar Utara II",
});

const { cart, subtotal, tax, shipping, total, addItem, removeItem } = useCart();

const products = ref([
  {
    id: 1,
    name: "Modul Calistung Level 1",
    stock: 500,
    available: true,
    price: 20000,
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: 2,
    name: "Seragam Operasional Staff",
    stock: 0,
    available: false,
    price: 120000,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    name: "Tas Desain Terbaru",
    stock: 1500,
    available: true,
    price: 100000,
    color: "from-rose-500 to-orange-500",
  },
]);

const paymentMethods = ref([
  {
    label: "Transfer Bank",
    value: "bank",
  },
  {
    label: "Cash on Delivery(COD)",
    value: "cod",
  },
  {
    label: "QRIS",
    value: "qris",
  },
]);
const paymentMethod = ref("bank");

const stockOf = (id: number) =>
  products.value.find((p) => p.id === id)?.stock ?? 0;

const setQty = (id: number, qty: number) => {
  const item = cart.value.find((i) => i.id === id);
  if (item) item.qty = qty;
};

const submitting = ref(false);
const stockError = ref("");

async function submitOrder() {
  const overStock = cart.value.find(
    (item) => item.qty > stockOf(item.id),
  );
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
  <div class="min-h-screen">
    <AppHeader title="Aplikasi Order Cabang - Outlet Denpasar Utara II" />

    <UContainer class="py-6">
      <UPageHeader
        title="Form Pemesanan Stock Cabang (Purchase Order)"
        class="mb-6"
      />
      <div class="grid gap-6 lg:grid-cols-3">
        <section class="lg:col-span-2">
          <div class="grid gap-4 sm:grid-cols-2">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add="(product, qty) => addItem(product, qty)"
            />
          </div>
        </section>

        <section>
          <CartSummary
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
          </CartSummary>
        </section>
      </div>
    </UContainer>
  </div>
</template>
