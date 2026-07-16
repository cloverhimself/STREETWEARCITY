import type { Address, Notification, Order, Product, Review, SizeType } from "./types";

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Rosewild Camo Beanie", category: "Headwear", sizeType: "adjustable", price: 38, compareAt: null, image: "/uploads/Beanie.jpg", colors: [{ name: "Rose Camo", hex: "#e39fc2" }], badge: "New", rating: 4.8, reviewCount: 24, stock: 14, sku: "SWC-BN-001", description: "Brushed knit beanie in an all-over rose camo jacquard with tonal wing graphic. Deep rib fold for a lived-in fit.", details: "100% acrylic knit\nOne size, stretch fit\nHand wash cold" },
  { id: "p2", name: "Rosewild Camo Beanie, Reserve", category: "Headwear", sizeType: "adjustable", price: 42, compareAt: 48, image: "/uploads/Beanie.jpg", colors: [{ name: "Rose Camo", hex: "#e39fc2" }, { name: "Blackout", hex: "#1a1a1a" }], badge: "Low Stock", rating: 4.6, reviewCount: 11, stock: 3, sku: "SWC-BN-002", description: "Limited reserve run of our rose camo beanie with reinforced cuff stitching.", details: "100% acrylic knit\nOne size, stretch fit\nLimited reserve run" },
  { id: "p3", name: "Ranger Cadet Cap", category: "Headwear", sizeType: "adjustable", price: 46, compareAt: null, image: "/uploads/Cadet cap.jpg", colors: [{ name: "Woodland", hex: "#5b6b45" }], badge: null, rating: 4.7, reviewCount: 19, stock: 22, sku: "SWC-CD-003", description: "Structured six-panel cadet cap in ripstop woodland camo with adjustable back strap.", details: "Cotton ripstop shell\nAdjustable D-ring strap\nSpot clean only" },
  { id: "p4", name: "Blackout Fitted 59FIFTY", category: "Headwear", sizeType: "fitted", price: 52, compareAt: null, image: "/uploads/fitted cap.jpg", colors: [{ name: "Blackout", hex: "#111111" }], badge: "Bestseller", rating: 4.9, reviewCount: 41, stock: 30, sku: "SWC-FT-004", description: "Flat-brim fitted cap in structured wool blend with embroidered eyes graphic.", details: "Wool blend shell\nFitted, non-adjustable\nDry clean only" },
  { id: "p5", name: "Blackout Fitted 59FIFTY, OG", category: "Headwear", sizeType: "fitted", price: 56, compareAt: null, image: "/uploads/fitted cap.jpg", colors: [{ name: "Blackout", hex: "#111111" }, { name: "Grey Pop", hex: "#8d8d8d" }], badge: null, rating: 4.5, reviewCount: 8, stock: 16, sku: "SWC-FT-005", description: "OG colorway of our signature fitted with grey embroidery pop.", details: "Wool blend shell\nFitted, non-adjustable\nDry clean only" },
  { id: "p6", name: "Royals Mesh Jersey", category: "Tops", sizeType: "clothing", price: 88, compareAt: 110, image: "/uploads/Jerseyshirt1.jpg", colors: [{ name: "Black/White", hex: "#111111" }], badge: "Bestseller", rating: 4.8, reviewCount: 37, stock: 18, sku: "SWC-JR-006", description: "Oversized football-cut mesh jersey with embroidered crest and floral sleeve patches.", details: "100% polyester mesh\nOversized fit\nMachine wash cold" },
  { id: "p7", name: "Web 52 Mesh Jersey", category: "Tops", sizeType: "clothing", price: 95, compareAt: null, image: "/uploads/Jerseyshirt2.jpg", colors: [{ name: "White", hex: "#f5f5f3" }], badge: "New", rating: 4.6, reviewCount: 15, stock: 9, sku: "SWC-JR-007", description: "Archive mesh jersey pull with printed web graphics and bold varsity numbering. Verified authentic.", details: "100% polyester mesh\nTrue to size\nVerified authentic" },
  { id: "p8", name: "Lil Syna Graphic Crop Tee", category: "Tops", sizeType: "clothing", price: 54, compareAt: null, image: "/uploads/croptop1.jpg", colors: [{ name: "Black", hex: "#111111" }], badge: "New", rating: 4.7, reviewCount: 12, stock: 20, sku: "SWC-CT-008", description: "Cropped tee with contrast rhinestone stitching and spray-paint style graphic.", details: "100% cotton jersey\nCropped fit\nMachine wash cold" },
  { id: "p9", name: "Nine Lives Graffiti Crop Tee", category: "Tops", sizeType: "clothing", price: 50, compareAt: 58, image: "/uploads/croptop2.jpg", colors: [{ name: "White", hex: "#f5f5f3" }], badge: null, rating: 4.4, reviewCount: 9, stock: 0, sku: "SWC-CT-009", description: "Boxy crop tee with hand-style graffiti graphic and pastel airbrush detailing.", details: "100% cotton jersey\nBoxy fit\nMachine wash cold" },
  { id: "p10", name: "Cross Wash Baggy Jeans", category: "Bottoms", sizeType: "waist", price: 120, compareAt: null, image: "/uploads/DenimJeans.jpg", colors: [{ name: "Rinse Indigo", hex: "#2b3550" }], badge: "Bestseller", rating: 4.9, reviewCount: 52, stock: 26, sku: "SWC-DJ-010", description: "Heavyweight baggy denim with curved seam construction and tonal embroidery.", details: "14oz rigid denim\nBaggy fit, tapered hem\nMachine wash cold" },
  { id: "p11", name: "Cross Wash Baggy Jeans, Rinse", category: "Bottoms", sizeType: "waist", price: 125, compareAt: null, image: "/uploads/DenimJeans.jpg", colors: [{ name: "Rinse Indigo", hex: "#2b3550" }, { name: "Raw Black", hex: "#101010" }], badge: null, rating: 4.6, reviewCount: 14, stock: 11, sku: "SWC-DJ-011", description: "Rinse-wash colorway of our signature baggy denim, same curved-seam construction.", details: "14oz rigid denim\nBaggy fit\nMachine wash cold" },
  { id: "p12", name: "Dragon Embroidered Baggy Jeans", category: "Bottoms", sizeType: "waist", price: 148, compareAt: 170, image: "/uploads/DenimJeans2.jpg", colors: [{ name: "Jet Black", hex: "#0c0c0c" }], badge: "Low Stock", rating: 4.8, reviewCount: 21, stock: 4, sku: "SWC-DJ-012", description: "Black baggy denim finished with a multicolor dragon embroidery at the hip.", details: "13oz rigid denim\nBaggy fit\nMachine wash cold" },
  { id: "p13", name: "Denim Genes Baggy Shorts", category: "Bottoms", sizeType: "waist", price: 78, compareAt: null, image: "/uploads/Denimshorts.jpg", colors: [{ name: "Jet Black", hex: "#0c0c0c" }], badge: "New", rating: 4.5, reviewCount: 7, stock: 19, sku: "SWC-DS-013", description: "Knee-length denim shorts with contrast stitching and woven back patch.", details: "12oz rigid denim\nRelaxed fit\nMachine wash cold" },
  { id: "p14", name: "Denim Genes Baggy Shorts, Stone", category: "Bottoms", sizeType: "waist", price: 82, compareAt: null, image: "/uploads/Denimshorts.jpg", colors: [{ name: "Jet Black", hex: "#0c0c0c" }, { name: "Stone Grey", hex: "#77726b" }], badge: null, rating: 4.3, reviewCount: 5, stock: 13, sku: "SWC-DS-014", description: "Stone-toned colorway of our baggy denim short with the same relaxed cut.", details: "12oz rigid denim\nRelaxed fit\nMachine wash cold" },
];

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

export function findProduct(id: string | null | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
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
