import type { Address, Notification, Order, Product, Review, SizeType } from "./types";

export const ORDERS: Order[] = [
  { id: "SWC-10482", date: "Jul 2, 2026", status: "Delivered", total: 126, address: "214 Bowery St, New York, NY 10012", items: [{ productId: "p6", qty: 1, size: "L", color: "Black/White" }, { productId: "p1", qty: 1, size: "One Size", color: "Rose Camo" }], trackingStep: 6 },
  { id: "SWC-10501", date: "Jul 10, 2026", status: "In Transit", total: 120, address: "214 Bowery St, New York, NY 10012", items: [{ productId: "p10", qty: 1, size: "32", color: "Rinse Indigo" }], trackingStep: 5 },
  { id: "SWC-10522", date: "Jul 15, 2026", status: "Processing", total: 52, address: "214 Bowery St, New York, NY 10012", items: [{ productId: "p4", qty: 1, size: "7 1/4", color: "Blackout" }], trackingStep: 2 },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 1, title: "Your order SWC-10501 has shipped", time: "2h ago", unread: true },
  { id: 2, title: "Back in stock: Dragon Embroidered Baggy Jeans", time: "1d ago", unread: true },
  { id: 3, title: "Price drop on an item in your wishlist", time: "3d ago", unread: false },
];

export const ADDRESSES: Address[] = [
  { id: 1, label: "Home", name: "Jordan M.", line1: "214 Bowery St", line2: "Apt 4B,", city: "New York", state: "NY", zip: "10012", default: true },
  { id: 2, label: "Work", name: "Jordan M.", line1: "88 Lafayette St", line2: "", city: "New York", state: "NY", zip: "10013", default: false },
];

export const REVIEWS_POOL: Review[] = [
  { name: "Marcus T.", rating: 5, verified: true, date: "2 weeks ago", text: "Fit is exactly as pictured, quality is way above the price point. Copped a second colorway already." },
  { name: "Ava R.", rating: 4, verified: true, date: "1 month ago", text: "Runs a little big so I sized down. Material feels premium and shipping was fast." },
  { name: "Devon K.", rating: 5, verified: false, date: "1 month ago", text: "Been eyeing this drop for weeks, glad I finally pulled the trigger. Worth it." },
];

export const FX = 1500;

export function naira(n: number | null | undefined): string {
  return "₦" + Math.round(Number(n || 0) * FX).toLocaleString("en-NG");
}

export function findProduct(products: Product[], id: string | null | undefined): Product | undefined {
  return products.find((p) => p.id === id);
}

export function sizesFor(p: Pick<Product, "sizeType">): string[] {
  if (p.sizeType === "clothing") return ["XS", "S", "M", "L", "XL", "XXL"];
  if (p.sizeType === "adjustable") return ["One Size (Adjustable)"];
  if (p.sizeType === "fitted") return ["7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8"];
  if (p.sizeType === "waist") return ["28", "30", "32", "34", "36", "38"];
  return ["One Size"];
}

export function sizeTypeLbl(p: Pick<Product, "sizeType">): string {
  if (p.sizeType === "clothing") return "US SIZE";
  if (p.sizeType === "adjustable") return "ADJUSTABLE";
  if (p.sizeType === "fitted") return "FITTED";
  if (p.sizeType === "waist") return "WAIST";
  return "";
}

export function sizeGuideFor(p: Pick<Product, "sizeType">): string {
  if (p.sizeType === "clothing") return "XS 32 to 34in chest, S 35 to 37in, M 38 to 40in, L 41 to 43in, XL 44 to 46in, XXL 47 to 49in. Model is 6'1\" wearing size L.";
  if (p.sizeType === "fitted") return "Fitted caps run true to hat size. Measure head circumference just above the ears to find your fit.";
  if (p.sizeType === "waist") return "Waist sizes shown in inches. Baggy fit, size down for a slimmer taper, true to size for the intended silhouette.";
  return "One size fits most, stretch knit construction.";
}

export type { SizeType };
