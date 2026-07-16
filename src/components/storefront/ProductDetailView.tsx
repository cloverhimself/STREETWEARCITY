import ProductCard from "./ProductCard";
import type { StoreCtx } from "./storefront-types";

export default function ProductDetailView({ ctx }: { ctx: StoreCtx }) {
  const cp = ctx.currentProduct;
  return (
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: "30px 24px 90px" }}>
      <div style={{ display: "grid", gridTemplateColumns: ctx.gridPdp, gap: ctx.gridGapPdp }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ aspectRatio: "1/1.05", overflow: "hidden", background: "#efeeeb", borderRadius: 20 }}>
            <img src={cp.image} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: ctx.galleryPosition, transition: "transform .4s" }} alt={cp.name} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {ctx.galleryThumbs.map((thumb, i) => (
              <div key={i} onClick={thumb.onClick} style={{ width: 74, height: 74, overflow: "hidden", background: "#efeeeb", cursor: "pointer", border: `2px solid ${thumb.border}`, borderRadius: 12 }}>
                <img src={cp.image} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: thumb.position }} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <span style={{ font: "600 11px Helvetica,Arial,sans-serif", letterSpacing: ".14em", color: "#6b6b6b" }}>{cp.category}</span>
            <h1 style={{ font: "800 clamp(24px,3vw,34px) Arial Black,Arial,sans-serif", margin: "8px 0 10px", textWrap: "pretty" }}>{cp.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {ctx.starIcons.map((s, i) => (
                  <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={s.fill} stroke="#0f0f0f" strokeWidth="1"><path d="M12 2.5l3.1 6.6 7.2.9-5.3 5 1.5 7.2L12 18.6l-6.5 3.6 1.5-7.2-5.3-5 7.2-.9L12 2.5z" /></svg>
                ))}
              </div>
              <span style={{ font: "400 12.5px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{cp.rating} ({cp.reviewCount} reviews)</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ font: "800 24px Helvetica,Arial,sans-serif" }}>{ctx.pdpPriceLabel}</span>
            {cp.compareAt && <span style={{ font: "400 15px Helvetica,Arial,sans-serif", color: "#9c9994", textDecoration: "line-through" }}>{ctx.pdpCompareLabel}</span>}
          </div>
          <div style={{ height: 1, background: "#e6e3de" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ font: "600 12px Helvetica,Arial,sans-serif", letterSpacing: ".04em" }}>COLOR · {ctx.selectedColorName}</span>
            <div style={{ display: "flex", gap: 8 }}>
              {ctx.colorOptions.map((c) => (
                <button key={c.name} onClick={c.onClick} title={c.name} style={{ width: 30, height: 30, borderRadius: "50%", background: c.hex, border: `2px solid ${c.border}`, cursor: "pointer", padding: 0 }} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ font: "600 12px Helvetica,Arial,sans-serif", letterSpacing: ".04em" }}>SIZE · {ctx.sizeTypeLabel}</span>
              <a href="#" onClick={ctx.toggleSizeGuide} style={{ font: "400 12px Helvetica,Arial,sans-serif", textDecoration: "underline" }}>Size guide</a>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ctx.sizeOptions.map((s) => (
                <button key={s.label} onClick={s.onClick} style={{ minWidth: 52, padding: "11px 10px", border: `1px solid ${s.border}`, background: s.bg, color: s.color, font: "600 12.5px Helvetica,Arial,sans-serif", cursor: "pointer", borderRadius: 999 }}>{s.label}</button>
              ))}
            </div>
            {ctx.sizeGuideOpen && (
              <div style={{ background: "#f3f2ef", padding: 14, font: "400 12.5px/1.6 Helvetica,Arial,sans-serif", color: "#4a4a4a", marginTop: 4, borderRadius: 12 }}>{ctx.sizeGuideText}</div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ font: "600 12px Helvetica,Arial,sans-serif", letterSpacing: ".04em" }}>QTY</span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #cfccc6", borderRadius: 999, overflow: "hidden" }}>
              <button onClick={ctx.decQty} style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", font: "600 16px Helvetica,Arial,sans-serif" }}>−</button>
              <span style={{ width: 32, textAlign: "center", font: "600 13px Helvetica,Arial,sans-serif" }}>{ctx.qty}</span>
              <button onClick={ctx.incQty} style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", font: "600 16px Helvetica,Arial,sans-serif" }}>+</button>
            </div>
            <span style={{ font: "400 12.5px Helvetica,Arial,sans-serif", color: ctx.stockColor }}>{ctx.stockLabel}</span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={ctx.addToCartCurrent} disabled={cp.stock === 0} style={{ flex: 1, minWidth: 200, background: ctx.addBtnBg, color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "17px 20px", cursor: "pointer", borderRadius: 999 }}>{ctx.addBtnLabel}</button>
            <button onClick={ctx.toggleWishlistCurrent} style={{ width: 52, height: 52, border: "1px solid #0f0f0f", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={ctx.currentHeartFill} stroke="#0f0f0f" strokeWidth="1.8"><path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 5.9l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.4l7.8-7.7 1-1a5.5 5.5 0 0 0 0-7.8z" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#4a4a4a" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" strokeWidth="1.7"><rect x="1" y="7" width="14" height="10" rx="1" /><path d="M15 10h4l3 3.5V17h-7" /><circle cx="6" cy="19" r="1.6" /><circle cx="17.5" cy="19" r="1.6" /></svg>
            <span style={{ font: "400 12.5px Helvetica,Arial,sans-serif" }}>Delivery estimate: 3 to 5 business days. Free over {ctx.freeShipLabel}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #e6e3de", marginTop: 6 }}>
            {ctx.accordions.map((acc) => (
              <div key={acc.title} style={{ borderBottom: "1px solid #e6e3de" }}>
                <button onClick={acc.onClick} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: "15px 0", font: "600 13px Helvetica,Arial,sans-serif", textAlign: "left" }}>
                  {acc.title}<span>{acc.icon}</span>
                </button>
                {acc.open && <div style={{ padding: "0 0 16px", font: "400 13px/1.7 Helvetica,Arial,sans-serif", color: "#4a4a4a", whiteSpace: "pre-line" }}>{acc.body}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 64 }}>
        <h3 style={{ font: "800 20px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>REVIEWS</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
          {ctx.reviewsList.map((r, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e6e3de", paddingBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>{r.name}</span>
                  {r.verified && <span style={{ background: "#eceae5", color: "#3d3b37", font: "600 9.5px Helvetica,Arial,sans-serif", letterSpacing: ".04em", padding: "3px 9px", borderRadius: 999 }}>VERIFIED PURCHASE</span>}
                </div>
                <span style={{ font: "400 11.5px Helvetica,Arial,sans-serif", color: "#9c9994" }}>{r.date}</span>
              </div>
              <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
                {r.starArr.map((fill, j) => (
                  <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill={fill} stroke="#0f0f0f" strokeWidth="1"><path d="M12 2.5l3.1 6.6 7.2.9-5.3 5 1.5 7.2L12 18.6l-6.5 3.6 1.5-7.2-5.3-5 7.2-.9L12 2.5z" /></svg>
                ))}
              </div>
              <p style={{ font: "400 13px/1.6 Helvetica,Arial,sans-serif", color: "#3d3b37", margin: "0 0 8px" }}>{r.text}</p>
              <button style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "7px 14px", cursor: "pointer", borderRadius: 999 }}>Helpful</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 70 }}>
        <h3 style={{ font: "800 20px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>YOU MAY ALSO LIKE</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "24px 20px" }}>
          {ctx.relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} wishlisted={p.wished} onOpen={ctx.goProduct} onToggle={ctx.toggleWishlist} onQuickAdd={ctx.quickAdd} onDecrement={ctx.quickDecrement} cartQty={p.cartQty} />
          ))}
        </div>
      </div>
    </div>
  );
}
