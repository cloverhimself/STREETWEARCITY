import type { StoreCtx } from "./storefront-types";

export default function FilterDrawer({ ctx }: { ctx: StoreCtx }) {
  if (!ctx.filterOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 75, background: "rgba(15,15,15,.5)", display: "flex", justifyContent: "flex-end" }} onClick={ctx.closeFilter}>
      <div style={{ width: 340, maxWidth: "90vw", height: "100%", background: "#fafaf9", padding: 24, display: "flex", flexDirection: "column", gap: 20, borderRadius: "20px 0 0 20px" }} onClick={ctx.stop}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ font: "800 17px Arial Black,Arial,sans-serif" }}>FILTERS</span>
          <button onClick={ctx.closeFilter} style={{ background: "rgba(15,15,15,.06)", border: "none", cursor: "pointer", borderRadius: 999, padding: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ font: "700 11px Helvetica,Arial,sans-serif", letterSpacing: ".08em", color: "#6b6b6b" }}>CATEGORY</span>
          {ctx.filterCategoryOptions.map((cat) => (
            <button key={cat.label} onClick={cat.onClick} style={{ textAlign: "left", background: cat.bg, color: cat.color, border: "1px solid #0f0f0f", font: "600 12.5px Helvetica,Arial,sans-serif", padding: "12px 16px", cursor: "pointer", borderRadius: 12 }}>{cat.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ font: "700 11px Helvetica,Arial,sans-serif", letterSpacing: ".08em", color: "#6b6b6b" }}>SORT BY</span>
          <select value={ctx.shopSort} onChange={ctx.setShopSort} style={{ border: "1px solid #cfccc6", background: "#fafaf9", font: "400 12.5px Helvetica,Arial,sans-serif", padding: "12px 14px", cursor: "pointer", borderRadius: 12 }}>
            <option value="Featured">Featured</option>
            <option value="PriceLow">Price: Low to High</option>
            <option value="PriceHigh">Price: High to Low</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
        <button onClick={ctx.closeFilter} style={{ marginTop: "auto", background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", padding: 15, cursor: "pointer", borderRadius: 999 }}>SHOW {ctx.shopCount} RESULTS</button>
      </div>
    </div>
  );
}
