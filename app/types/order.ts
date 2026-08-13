export interface Product {
  id: number;
  name: string;
  stock: number;
  available: boolean;
  price: number;
  color: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface PaymentMethod {
  label: string;
  value: string;
}
