import type { AdminCustomer, AdminOrder, AdminProduct, AdminRole, AdminUser, ActivityLog } from "./admin-types";

export const ADMIN_PRODUCTS: AdminProduct[] = [
  { id: "p1", name: "Rosewild Camo Beanie", category: "Headwear", price: 38, image: "/uploads/Beanie.jpg", rating: 4.8, reviewCount: 24, stock: 14, description: "" },
  { id: "p2", name: "Rosewild Camo Beanie, Reserve", category: "Headwear", price: 42, image: "/uploads/Beanie.jpg", rating: 4.6, reviewCount: 11, stock: 3, description: "" },
  { id: "p3", name: "Ranger Cadet Cap", category: "Headwear", price: 46, image: "/uploads/Cadet cap.jpg", rating: 4.7, reviewCount: 19, stock: 22, description: "" },
  { id: "p4", name: "Blackout Fitted 59FIFTY", category: "Headwear", price: 52, image: "/uploads/fitted cap.jpg", rating: 4.9, reviewCount: 41, stock: 30, description: "" },
  { id: "p5", name: "Blackout Fitted 59FIFTY, OG", category: "Headwear", price: 56, image: "/uploads/fitted cap.jpg", rating: 4.5, reviewCount: 8, stock: 16, description: "" },
  { id: "p6", name: "Royals Mesh Jersey", category: "Tops", price: 88, image: "/uploads/Jerseyshirt1.jpg", rating: 4.8, reviewCount: 37, stock: 18, description: "" },
  { id: "p7", name: "Web 52 Mesh Jersey", category: "Tops", price: 95, image: "/uploads/Jerseyshirt2.jpg", rating: 4.6, reviewCount: 15, stock: 9, description: "" },
  { id: "p8", name: "Lil Syna Graphic Crop Tee", category: "Tops", price: 54, image: "/uploads/croptop1.jpg", rating: 4.7, reviewCount: 12, stock: 20, description: "" },
  { id: "p9", name: "Nine Lives Graffiti Crop Tee", category: "Tops", price: 50, image: "/uploads/croptop2.jpg", rating: 4.4, reviewCount: 9, stock: 0, description: "" },
  { id: "p10", name: "Cross Wash Baggy Jeans", category: "Bottoms", price: 120, image: "/uploads/DenimJeans.jpg", rating: 4.9, reviewCount: 52, stock: 26, description: "" },
  { id: "p11", name: "Cross Wash Baggy Jeans, Rinse", category: "Bottoms", price: 125, image: "/uploads/DenimJeans.jpg", rating: 4.6, reviewCount: 14, stock: 11, description: "" },
  { id: "p12", name: "Dragon Embroidered Baggy Jeans", category: "Bottoms", price: 148, image: "/uploads/DenimJeans2.jpg", rating: 4.8, reviewCount: 21, stock: 4, description: "" },
  { id: "p13", name: "Denim Genes Baggy Shorts", category: "Bottoms", price: 78, image: "/uploads/Denimshorts.jpg", rating: 4.5, reviewCount: 7, stock: 19, description: "" },
  { id: "p14", name: "Denim Genes Baggy Shorts, Stone", category: "Bottoms", price: 82, image: "/uploads/Denimshorts.jpg", rating: 4.3, reviewCount: 5, stock: 13, description: "" },
];

export const ADMIN_ORDERS: AdminOrder[] = [
  { id: "10482", date: "Jul 2, 2026", status: "Delivered", total: 126 },
  { id: "10501", date: "Jul 10, 2026", status: "In Transit", total: 120 },
  { id: "10522", date: "Jul 15, 2026", status: "Processing", total: 52 },
];

export const ADMIN_CUSTOMERS: AdminCustomer[] = [
  { name: "Jordan M.", email: "jordan.m@gmail.com", orders: 5, spent: 642, joined: "Jan 2025" },
  { name: "Ava T.", email: "ava.t@gmail.com", orders: 2, spent: 214, joined: "Mar 2025" },
  { name: "Devon R.", email: "devon.r@gmail.com", orders: 8, spent: 1180, joined: "Nov 2024" },
  { name: "Priya S.", email: "priya.s@gmail.com", orders: 1, spent: 88, joined: "Jun 2026" },
];

export const SALES_TREND = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 48 },
  { label: "Wed", value: 41 },
  { label: "Thu", value: 60 },
  { label: "Fri", value: 74 },
  { label: "Sat", value: 91 },
  { label: "Sun", value: 68 },
];

export const CATEGORY_BREAKDOWN = [
  { name: "Bottoms", pct: 42, color: "#0f0f0f" },
  { name: "Tops", pct: 33, color: "#6b6b6b" },
  { name: "Headwear", pct: 25, color: "#b9b6b0" },
];

export const ADMIN_FX = 1500;

export function adminNaira(n: number | null | undefined): string {
  return "₦" + Math.round(Number(n || 0) * ADMIN_FX).toLocaleString("en-NG");
}

export const ROLE_LABELS: Record<AdminRole, string> = {
  super: "Super Admin",
  products: "Product Manager",
  support: "Support",
  orders: "Order Tracking",
};

export const ADMIN_USERS: AdminUser[] = [
  { id: "u1", name: "Chidi Okafor", email: "chidi@streetwearcity.com", role: "super" },
  { id: "u2", name: "Amaka Bello", email: "amaka@streetwearcity.com", role: "products" },
  { id: "u3", name: "Tunde Alabi", email: "tunde@streetwearcity.com", role: "support" },
  { id: "u4", name: "Fatima Yusuf", email: "fatima@streetwearcity.com", role: "orders" },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: 1, actor: "Chidi Okafor", action: "Changed role of Amaka Bello to Product Manager", time: "Today, 2:14 PM" },
  { id: 2, actor: "Amaka Bello", action: "Added product Dragon Embroidered Baggy Jeans", time: "Today, 11:02 AM" },
  { id: 3, actor: "Tunde Alabi", action: "Responded to customer inquiry #1042", time: "Yesterday, 4:47 PM" },
  { id: 4, actor: "Fatima Yusuf", action: "Marked order #10501 as In Transit", time: "Yesterday, 1:20 PM" },
  { id: 5, actor: "Chidi Okafor", action: "Created admin account for Fatima Yusuf", time: "Jul 12, 2026" },
  { id: 6, actor: "Amaka Bello", action: "Deleted product Nine Lives Graffiti Crop Tee", time: "Jul 10, 2026" },
];
