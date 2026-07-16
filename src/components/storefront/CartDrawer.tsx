import type { StoreCtx } from "./storefront-types";

export default function CartDrawer({ ctx }: { ctx: StoreCtx }) {
  if (!ctx.cartOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 76, background: "rgba(15,15,15,.5)", display: "flex", justifyContent: "flex-end" }} onClick={ctx.closeCart}>
      <div style={{ width: 420, maxWidth: "92vw", height: "100%", background: "#fafaf9", display: "flex", flexDirection: "column", animation: "swc-fade .25s ease", borderRadius: "20px 0 0 20px" }} onClick={ctx.stop}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, borderBottom: "1px solid #e6e3de" }}>
          <span style={{ font: "800 16px Arial Black,Arial,sans-serif" }}>YOUR BAG ({ctx.cartCount})</span>
          <button onClick={ctx.closeCart} style={{ background: "rgba(15,15,15,.06)", border: "none", cursor: "pointer", borderRadius: 999, padding: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
          {ctx.hasCart &&
            ctx.cartLines.map((line) => (
              <div key={line.key} style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 74, height: 88, background: "#eeece8", flexShrink: 0, borderRadius: 12, overflow: "hidden" }}>
                  <img src={line.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ font: "600 13px Helvetica,Arial,sans-serif" }}>{line.name}</span>
                  <span style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{line.variantLabel}</span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #cfccc6", borderRadius: 999, overflow: "hidden" }}>
                      <button onClick={line.decQty} style={{ width: 26, height: 26, background: "none", border: "none", cursor: "pointer" }}>−</button>
                      <span style={{ width: 24, textAlign: "center", font: "600 12px Helvetica,Arial,sans-serif" }}>{line.qty}</span>
                      <button onClick={line.incQty} style={{ width: 26, height: 26, background: "none", border: "none", cursor: "pointer" }}>+</button>
                    </div>
                    <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>{line.lineTotalLabel}</span>
                  </div>
                  <button onClick={line.remove} style={{ alignSelf: "flex-start", background: "none", border: "none", color: "#9c9994", font: "400 11.5px Helvetica,Arial,sans-serif", textDecoration: "underline", cursor: "pointer", padding: 0, marginTop: 2 }}>Remove</button>
                </div>
              </div>
            ))}
          {ctx.cartEmptyBool && (
            <div style={{ textAlign: "center", padding: "60px 10px", color: "#6b6b6b", font: "400 13px Helvetica,Arial,sans-serif" }}>Your bag is empty.</div>
          )}
        </div>
        <div style={{ padding: 20, borderTop: "1px solid #e6e3de", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", font: "700 15px Helvetica,Arial,sans-serif" }}><span>Subtotal</span><span>{ctx.subtotalLabel}</span></div>
          <button onClick={ctx.goCheckoutClick} disabled={ctx.cartEmptyBool} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: 16, cursor: "pointer", borderRadius: 999 }}>CHECKOUT →</button>
        </div>
      </div>
    </div>
  );
}
