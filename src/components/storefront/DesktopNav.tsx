import type { StoreCtx } from "./storefront-types";

export default function DesktopNav({ ctx }: { ctx: StoreCtx }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(250,250,249,.94)", backdropFilter: "blur(6px)", borderBottom: "1px solid #e6e3de" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "14px 24px", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <a href="#" onClick={ctx.shopAllClick} style={{ font: "600 13px Helvetica,Arial,sans-serif", letterSpacing: ".03em" }}>SHOP ALL</a>
          <a href="#" onClick={ctx.shopHeadwearClick} style={{ font: "600 13px Helvetica,Arial,sans-serif", letterSpacing: ".03em" }}>HEADWEAR</a>
          <a href="#" onClick={ctx.shopTopsClick} style={{ font: "600 13px Helvetica,Arial,sans-serif", letterSpacing: ".03em" }}>TOPS</a>
          <a href="#" onClick={ctx.shopBottomsClick} style={{ font: "600 13px Helvetica,Arial,sans-serif", letterSpacing: ".03em" }}>BOTTOMS</a>
        </div>
        <a href="#" onClick={ctx.goHomeClick} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/uploads/streetwear-city-logo.png" alt="Streetwear City" style={{ height: 52, width: "auto" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "end" }}>
          <button onClick={ctx.openSearch} aria-label="Search" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 999 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7.5" /><line x1="21" y1="21" x2="16.2" y2="16.2" /></svg>
          </button>
          <a href="#" onClick={ctx.goWishlistClick} style={{ position: "relative", display: "flex", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8"><path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 5.9l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.4l7.8-7.7 1-1a5.5 5.5 0 0 0 0-7.8z" strokeLinejoin="round" /></svg>
            {ctx.wishlistCount > 0 && (
              <span style={{ position: "absolute", top: -4, right: -6, background: "#0f0f0f", color: "#fafaf9", font: "600 9px/1 Helvetica,Arial,sans-serif", borderRadius: "50%", width: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {ctx.wishlistCount}
              </span>
            )}
          </a>
          <a href="#" onClick={ctx.goAccountClick} style={{ display: "flex", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
          </a>
          <button onClick={ctx.openCart} aria-label="Cart" style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 999 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8" strokeLinejoin="round"><path d="M6.5 8h11l-.9 12.2a1 1 0 0 1-1 .8H8.4a1 1 0 0 1-1-.8L6.5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
            {ctx.cartCount > 0 && (
              <span style={{ position: "absolute", top: -4, right: -6, background: "#0f0f0f", color: "#fafaf9", font: "600 9px/1 Helvetica,Arial,sans-serif", borderRadius: "50%", width: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {ctx.cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <div style={{ overflow: "hidden", background: "#0f0f0f", padding: "5px 0" }}>
        <div style={{ display: "flex", width: "200%", animation: "swc-marquee 22s linear infinite" }}>
          {[0, 1].map((i) => (
            <span key={i} style={{ flex: "0 0 auto", whiteSpace: "nowrap", color: "#fafaf9", font: "600 10.5px/1 Helvetica,Arial,sans-serif", letterSpacing: ".14em", paddingRight: 40 }}>
              VERIFIED AUTHENTIC &nbsp;•&nbsp; NEW DROPS WEEKLY &nbsp;•&nbsp; FREE SHIPPING OVER {ctx.freeShipLabel} &nbsp;•&nbsp; VERIFIED AUTHENTIC &nbsp;•&nbsp; NEW DROPS WEEKLY &nbsp;•&nbsp; FREE SHIPPING OVER {ctx.freeShipLabel} &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
