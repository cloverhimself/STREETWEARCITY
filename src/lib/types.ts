export type SizeType = "clothing" | "adjustable" | "fitted" | "waist";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Headwear" | "Tops" | "Bottoms";
  sizeType: SizeType;
  price: number;
  compareAt: number | null;
  image: string;
  images: string[];
  colors: ProductColor[];
  badge: "New" | "Low Stock" | "Bestseller" | null;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  description: string;
  details: string;
}

export interface CartLine {
  productId: string;
  color: string;
  size: string;
  qty: number;
}

export interface OrderItem {
  productId: string;
  qty: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing";
  total: number;
  address: string;
  items: OrderItem[];
  trackingStep: number;
}

export interface Notification {
  id: number;
  title: string;
  time: string;
  unread: boolean;
}

export interface Address {
  id: number;
  label: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  default: boolean;
}

export interface Review {
  name: string;
  rating: number;
  verified: boolean;
  date: string;
  text: string;
}
