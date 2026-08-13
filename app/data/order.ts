import type { Expedition, PaymentMethod } from "~/types/order";

export const outletName = "Outlet Denpasar Utara II";
export const pageTitle = "Form Pemesanan Stock Cabang (Purchase Order)";
export const orderMeta = {
  title: "Order Cabang - Outlet Denpasar Utara II",
};

export const paymentMethods: PaymentMethod[] = [
  { label: "Transfer Bank", value: "bank" },
  { label: "Cash on Delivery(COD)", value: "cod" },
  { label: "QRIS", value: "qris" },
];

export const expeditions: Expedition[] = [
  { id: "jnt", label: "JNT", cost: 50000 },
  { id: "jne", label: "JNE", cost: 55000 },
  { id: "sicepat", label: "SiCepat", cost: 60000 },
];
