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

const qty = ref<Record<number, number>>({ 1: 1, 2: 1, 3: 1 });

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

const submitting = ref(false);
async function submitOrder() {
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
            <UCard
              v-for="product in products"
              :key="product.id"
              class="flex flex-col"
              :ui="{ body: 'flex flex-col flex-1 gap-3' }"
            >
              <div
                class="flex h-36 items-center justify-center rounded-lg bg-linear-to-br text-white"
                :class="product.color"
              >
                <UIcon name="lucide:package" class="size-14 opacity-80" />
              </div>

              <h3 class="font-semibold text-default">
                {{ product.name }}
              </h3>

              <div class="flex items-center gap-2 text-xs">
                <span class="text-muted">
                  Stok HO: {{ product.stock }} pcs
                </span>
                <UBadge
                  v-if="product.available"
                  color="success"
                  variant="subtle"
                  size="sm"
                >
                  Tersedia
                </UBadge>
                <UBadge v-else color="error" variant="subtle" size="sm">
                  Habis
                </UBadge>
              </div>

              <p class="font-bold text-highlighted">
                {{ formatRp(product.price) }}
                <span class="text-xs font-normal text-muted">/ pcs</span>
              </p>

              <div class="mt-auto flex items-center gap-2">
                <QuantityStepper
                  v-model="qty[product.id]"
                  :min="1"
                  :max="product.stock"
                  class="w-24"
                  :disabled="!product.available"
                />

                <UButton
                  class="flex-1 cursor-pointer"
                  color="primary"
                  icon="lucide:shopping-cart"
                  :disabled="!product.available"
                  @click="addItem(product, qty[product.id] ?? 1)"
                >
                  {{ product.available ? "Keranjang" : "Stok Tidak Tersedia" }}
                </UButton>
              </div>
            </UCard>
          </div>
        </section>

        <section>
          <UCard :ui="{ body: 'flex flex-col gap-4' }">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="lucide:shopping-cart"
                  class="size-5 text-primary"
                />
                <h2 class="font-bold text-highlighted">Ringkasan Pesanan</h2>
                <UBadge color="primary" variant="subtle" size="sm">
                  {{ cart.length }} Produk
                </UBadge>
              </div>
            </template>

            <div v-if="cart.length === 0" class="text-center text-muted">
              <UIcon name="lucide:package-open" class="mx-auto size-10 mb-2" />
              <p class="text-sm">Keranjang kosong</p>
            </div>

            <div v-else class="divide-y divide-default">
              <div
                v-for="item in cart"
                :key="item.id"
                class="flex items-start justify-between gap-3 py-3"
              >
                <div class="min-w-0">
                  <p class="truncate font-medium text-default">
                    {{ item.name }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ item.qty }} x {{ formatRp(item.price) }}
                  </p>
                  <p class="mt-1 font-bold text-highlighted">
                    {{ formatRp(item.price * item.qty) }}
                  </p>
                </div>
                <div class="flex items-center gap-1">
                  <QuantityStepper
                    v-model="item.qty"
                    :min="1"
                    :max="stockOf(item.id)"
                    class="w-22"
                  />
                  <UButton
                    icon="lucide:trash-2"
                    color="error"
                    variant="ghost"
                    size="xs"
                    square
                    aria-label="Hapus item"
                    @click="removeItem(item.id)"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-2 border-t border-default pt-4 text-sm">
              <div class="flex justify-between">
                <span class="text-muted">Subtotal</span>
                <span class="font-medium text-default">{{
                  formatRp(subtotal)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted">Tax (11%)</span>
                <span class="font-medium text-default">{{
                  formatRp(tax)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted">Est. Ongkir (JNR)</span>
                <span class="font-medium text-default">{{
                  formatRp(shipping)
                }}</span>
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
              <p class="mb-2 text-sm font-semibold text-default">
                Metode Pembayaran
              </p>
              <URadioGroup
                :items="paymentMethods"
                v-model="paymentMethod"
                color="primary"
                variant="card"
                class="w-full"
              />
            </div>

            <UButton
              block
              size="lg"
              class="cursor-pointer font-bold"
              :loading="submitting"
              :disabled="cart.length === 0"
              @click="submitOrder"
            >
              Submit Order / Bayar
            </UButton>
          </UCard>
        </section>
      </div>
    </UContainer>
  </div>
</template>
