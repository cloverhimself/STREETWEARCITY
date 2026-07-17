import { apiFetch } from "./api";
import type { Product } from "./types";

export interface ProductInput {
  name: string;
  category: "Headwear" | "Tops" | "Bottoms";
  sizeType: Product["sizeType"];
  price: number;
  compareAtPrice?: number;
  stock: number;
  colors: { name: string; hex: string }[];
  images: string[];
  description?: string;
  details?: string;
}

export function fetchProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products");
}

export function fetchProduct(id: string): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

export function createProduct(input: ProductInput): Promise<Product> {
  return apiFetch<Product>("/products", { method: "POST", body: JSON.stringify(input) });
}

export function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteProduct(id: string): Promise<{ deleted: boolean }> {
  return apiFetch<{ deleted: boolean }>(`/products/${id}`, { method: "DELETE" });
}
