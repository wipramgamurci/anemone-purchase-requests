import type { PaymentMethod } from "~/types/order";

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
