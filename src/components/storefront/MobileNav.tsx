import type { StoreCtx } from "./storefront-types";

export default function MobileNav({ ctx }: { ctx: StoreCtx }) {
  return (
    <>
      <div style={{ position: "fixed", top: 12, left: 12, right: 12, zIndex: 55, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(250,250,249,.68)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderRadius: 22, border: "1px solid rgba(255,255,255,.6)", boxShadow: "0 8px 26px rgba(15,15,15,.1)" }}>
        <button onClick={ctx.toggleMobileNav} aria-label="Menu" style={{ background: "rgba(15,15,15,.06)", border: "none", cursor: "pointer", padding: 9, borderRadius: 999, display: "flex" }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.9" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <a href="#" onClick={ctx.goHomeClick}><img src="/uploads/streetwear-city-logo.png" alt="Streetwear City" style={{ height: 38, width: "auto" }} /></a>
        <button onClick={ctx.openSearch} aria-label="Search" style={{ background: "rgba(15,15,15,.06)", border: "none", cursor: "pointer", padding: 9, borderRadius: 999, display: "flex" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.9" strokeLinecap="round"><circle cx="11" cy="11" r="7.5" /><line x1="21" y1="21" x2="16.2" y2="16.2" /></svg>
        </button>
      </div>

      <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 55, display: "flex", alignItems: "center", gap: 4, padding: 8, background: "rgba(250,250,249,.7)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderRadius: 999, border: "1px solid rgba(255,255,255,.6)", boxShadow: "0 10px 28px rgba(15,15,15,.14)" }}>
        <button onClick={ctx.goHomeClick} aria-label="Home" style={{ background: ctx.navHomeBg, border: "none", cursor: "pointer", padding: "11px 14px", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ctx.navHomeColor} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7" /><path d="M6 10v9h12v-9" /></svg>
        </button>
        <button onClick={ctx.navShopClick} aria-label="Shop" style={{ background: ctx.navShopBg, border: "none", cursor: "pointer", padding: "11px 14px", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ctx.navShopColor} strokeWidth="1.9" strokeLinejoin="round"><path d="M6.5 8h11l-.9 12.2a1 1 0 0 1-1 .8H8.4a1 1 0 0 1-1-.8L6.5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
        </button>
        <button onClick={ctx.goWishlistClick} aria-label="Wishlist" style={{ background: ctx.navWishlistBg, border: "none", cursor: "pointer", padding: "11px 14px", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ctx.navWishlistColor} strokeWidth="1.9"><path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 5.9l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.4l7.8-7.7 1-1a5.5 5.5 0 0 0 0-7.8z" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={ctx.openCart} aria-label="Cart" style={{ position: "relative", background: ctx.navCartBg, border: "none", cursor: "pointer", padding: "11px 14px", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ctx.navCartColor} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1.4" /><circle cx="18" cy="21" r="1.4" /><path d="M1.5 2.5h2.4l2.06 11.02a2 2 0 0 0 2 1.63h8.36a2 2 0 0 0 1.97-1.66L20 8.5H5.1" /></svg>
          {ctx.cartCount > 0 && (
            <span style={{ position: "absolute", top: 4, right: 6, background: "#0f0f0f", color: "#fafaf9", font: "600 8px/1 Helvetica,Arial,sans-serif", borderRadius: "50%", width: 13, height: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {ctx.cartCount}
            </span>
          )}
        </button>
        <button onClick={ctx.navAccountClick} aria-label="Account" style={{ background: ctx.navAccountBg, border: "none", cursor: "pointer", padding: "11px 14px", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ctx.navAccountColor} strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
        </button>
      </div>

      {ctx.mobileNavOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 65, background: "rgba(15,15,15,.5)" }} onClick={ctx.closeMobileNav}>
          <div style={{ width: "78%", maxWidth: 320, height: "100%", background: "#fafaf9", padding: 22, display: "flex", flexDirection: "column", gap: 22, animation: "swc-fade .25s ease", borderRadius: "0 20px 20px 0" }} onClick={ctx.stop}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <img src="/uploads/streetwear-city-logo.png" style={{ height: 30 }} alt="Streetwear City" />
              <button onClick={ctx.closeMobileNav} style={{ background: "rgba(15,15,15,.06)", border: "none", cursor: "pointer", borderRadius: 999, padding: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <a href="#" onClick={ctx.shopAllClick} style={{ font: "600 16px Helvetica,Arial,sans-serif" }}>Shop All</a>
              <a href="#" onClick={ctx.shopHeadwearClick} style={{ font: "600 16px Helvetica,Arial,sans-serif" }}>Headwear</a>
              <a href="#" onClick={ctx.shopTopsClick} style={{ font: "600 16px Helvetica,Arial,sans-serif" }}>Tops</a>
              <a href="#" onClick={ctx.shopBottomsClick} style={{ font: "600 16px Helvetica,Arial,sans-serif" }}>Bottoms</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
