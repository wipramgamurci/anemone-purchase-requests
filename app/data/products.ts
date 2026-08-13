import type { Product } from "~/types/order";

export const products: Product[] = [
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
];