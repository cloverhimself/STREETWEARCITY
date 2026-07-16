import ProductCard from "./ProductCard";
import type { StoreCtx } from "./storefront-types";

export default function SearchOverlay({ ctx }: { ctx: StoreCtx }) {
  if (!ctx.searchOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, background: "#fafaf9", overflowY: "auto" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "30px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, borderBottom: "2px solid #0f0f0f", paddingBottom: 14, marginBottom: 30 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8"><circle cx="11" cy="11" r="7.5" /><line x1="21" y1="21" x2="16.2" y2="16.2" /></svg>
          <input autoFocus placeholder="Search products, brands, categories..." style={{ flex: 1, border: "none", outline: "none", background: "none", font: "400 20px Helvetica,Arial,sans-serif" }} />
          <button onClick={ctx.closeSearch} style={{ background: "none", border: "none", cursor: "pointer", borderRadius: 999 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div>
            <span style={{ font: "700 11px Helvetica,Arial,sans-serif", letterSpacing: ".08em", color: "#6b6b6b" }}>TRENDING SEARCHES</span>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              {ctx.trendingSearches.map((term) => (
                <button key={term} onClick={ctx.shopAllClick} style={{ background: "#f3f2ef", border: "none", font: "400 12.5px Helvetica,Arial,sans-serif", padding: "9px 16px", cursor: "pointer", borderRadius: 999 }}>{term}</button>
              ))}
            </div>
          </div>
          <div>
            <span style={{ font: "700 11px Helvetica,Arial,sans-serif", letterSpacing: ".08em", color: "#6b6b6b" }}>SUGGESTED PRODUCTS</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 16, marginTop: 14 }}>
              {ctx.searchSuggestions.map((p) => (
                <ProductCard key={p.id} product={p} wishlisted={p.wished} onOpen={ctx.goProduct} onToggle={ctx.toggleWishlist} onQuickAdd={ctx.quickAdd} onDecrement={ctx.quickDecrement} cartQty={p.cartQty} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
