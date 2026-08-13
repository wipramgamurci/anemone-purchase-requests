<script setup lang="ts">
useSeoMeta({
  title: "Order Cabang - Outlet Denpasar Utara II",
});

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

const cart = ref([
  { id: 1, name: "Modul Calistung Level 1", price: 20000, qty: 20 },
  { id: 3, name: "Tas Desain Terbaru", price: 100000, qty: 1 },
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

const subtotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0),
);
const tax = computed(() => Math.round(subtotal.value * 0.11));
const shipping = 50000;
const total = computed(() => subtotal.value + tax.value + shipping);

const formatRp = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

function changeQty(id: number, delta: number) {
  const next = (qty.value[id] ?? 1) + delta;
  qty.value[id] = Math.max(1, next);
}

function addToCart(product: { id: number; name: string; price: number }) {
  const existing = cart.value.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += qty.value[product.id] ?? 1;
  } else {
    cart.value.push({ ...product, qty: qty.value[product.id] ?? 1 });
  }
}

function changeCartQty(id: number, delta: number) {
  const item = cart.value.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter((item) => item.id !== id);
}

const submitting = ref(false);
async function submitOrder() {
  submitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));
  submitting.value = false;
}
</script>

<template>
  <div class="min-h-screen">
    <UHeader>
      <template #title>
        <img src="/myanemone-logo.svg" class="h-8 w-auto" alt="Logo HO" />
      </template>

      <h1 class="text-sm font-semibold sm:text-base">
        Aplikasi Order Cabang - Outlet Denpasar Utara II
      </h1>

      <template #right>
        <UButton class="cursor-pointer" color="secondary" variant="link">
          Riwayat Order
        </UButton>
      </template>
    </UHeader>

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
                <div
                  class="flex items-center rounded-md ring ring-inset ring-accented"
                >
                  <UButton
                    icon="lucide:minus"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    square
                    class="rounded-s-md"
                    :disabled="!product.available"
                    @click="changeQty(product.id, -1)"
                  />
                  <span class="w-8 text-center text-sm font-semibold">
                    {{ qty[product.id] }}
                  </span>
                  <UButton
                    icon="lucide:plus"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    square
                    class="rounded-e-md"
                    :disabled="!product.available"
                    @click="changeQty(product.id, 1)"
                  />
                </div>

                <UButton
                  class="flex-1 cursor-pointer"
                  color="primary"
                  icon="lucide:shopping-cart"
                  :disabled="!product.available"
                  @click="addToCart(product)"
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
                  <div
                    class="flex items-center rounded-md ring ring-inset ring-accented"
                  >
                    <UButton
                      icon="lucide:minus"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      square
                      class="rounded-s-md"
                      @click="changeCartQty(item.id, -1)"
                    />
                    <span class="w-6 text-center text-xs font-semibold">
                      {{ item.qty }}
                    </span>
                    <UButton
                      icon="lucide:plus"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      square
                      class="rounded-e-md"
                      @click="changeCartQty(item.id, 1)"
                    />
                  </div>
                  <UButton
                    icon="lucide:trash-2"
                    color="error"
                    variant="ghost"
                    size="xs"
                    square
                    aria-label="Hapus item"
                    @click="removeFromCart(item.id)"
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
