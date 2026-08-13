import type { CartItem, Product } from "~/types/order";
import { expeditions } from "~/data/order";

const TAX_RATE = 0.11;

export function useCart() {
  const cart = useState<CartItem[]>("cart", () => [
    { id: 1, name: "Modul Calistung Level 1", price: 20000, qty: 20 },
    { id: 3, name: "Tas Desain Terbaru", price: 100000, qty: 1 },
  ]);

  const expeditionId = useState("expedition", () => expeditions[0]!.id);
  const expedition = computed(() =>
    expeditions.find((e) => e.id === expeditionId.value) ?? expeditions[0]!,
  );

  const subtotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.qty, 0),
  );
  const tax = computed(() => Math.round(subtotal.value * TAX_RATE));
  const shipping = computed(() => expedition.value.cost);
  const total = computed(() => subtotal.value + tax.value + shipping.value);

  function maxQty(stock: number): number {
    return Math.max(1, stock);
  }

  function addItem(product: Product, quantity = 1) {
    const amount = Math.min(quantity, maxQty(product.stock));
    const existing = cart.value.find((item) => item.id === product.id);
    if (existing) {
      existing.qty = Math.min(existing.qty + amount, maxQty(product.stock));
    } else {
      cart.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: amount,
      });
    }
  }

  function removeItem(id: number) {
    cart.value = cart.value.filter((item) => item.id !== id);
  }

  function setQty(id: number, qty: number, max = Number.MAX_SAFE_INTEGER) {
    const item = cart.value.find((i) => i.id === id);
    if (!item) return;
    item.qty = Math.min(Math.max(1, qty), Math.max(1, max));
  }

  function setExpedition(id: string) {
    expeditionId.value = id;
  }

  return {
    cart,
    subtotal,
    tax,
    shipping,
    total,
    expeditionId,
    expedition,
    setExpedition,
    addItem,
    removeItem,
    setQty,
  };
}