import ProductCard from "./ProductCard";
import type { StoreCtx } from "./storefront-types";

export default function ShopView({ ctx }: { ctx: StoreCtx }) {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 24px 80px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 30 }}>
        <span style={{ font: "600 11px Helvetica,Arial,sans-serif", letterSpacing: ".14em", color: "#6b6b6b" }}>SHOP</span>
        <h1 style={{ font: "800 clamp(28px,4vw,44px) Arial Black,Arial,sans-serif", margin: 0 }}>{ctx.shopTitle}</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", borderTop: "1px solid #e6e3de", borderBottom: "1px solid #e6e3de", padding: "16px 0", marginBottom: 30 }}>
        <button onClick={ctx.openFilter} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f3f2ef", border: "1px solid #e0ddd7", font: "600 12.5px Helvetica,Arial,sans-serif", padding: "11px 18px", cursor: "pointer", borderRadius: 999 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><circle cx="9" cy="7" r="2" /><line x1="4" y1="17" x2="20" y2="17" /><circle cx="16" cy="17" r="2" /></svg>
          Filters · {ctx.shopTitle}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "400 12.5px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{ctx.shopCount} items</span>
          <select value={ctx.shopSort} onChange={ctx.setShopSort} style={{ border: "1px solid #cfccc6", background: "#fafaf9", font: "400 12.5px Helvetica,Arial,sans-serif", padding: "9px 12px", cursor: "pointer", borderRadius: 999 }}>
            <option value="Featured">Sort: Featured</option>
            <option value="PriceLow">Price: Low to High</option>
            <option value="PriceHigh">Price: High to Low</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "24px 20px" }}>
        {ctx.shopProducts.map((p) => (
          <ProductCard key={p.id} product={p} wishlisted={p.wished} onOpen={ctx.goProduct} onToggle={ctx.toggleWishlist} onQuickAdd={ctx.quickAdd} onDecrement={ctx.quickDecrement} cartQty={p.cartQty} />
        ))}
      </div>
    </div>
  );
}
