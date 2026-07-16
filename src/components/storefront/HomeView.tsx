import ProductCard from "./ProductCard";
import type { StoreCtx } from "./storefront-types";

export default function HomeView({ ctx }: { ctx: StoreCtx }) {
  return (
    <div>
      <div style={{ position: "relative", height: "min(86vh,780px)", minHeight: 460, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {ctx.heroSlides.map((slide, i) => (
          <img key={i} src={slide.image} alt="Hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: slide.opacity, transition: "opacity 1.2s ease" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,.92) 0%, rgba(8,8,8,.72) 32%, rgba(8,8,8,.32) 62%, rgba(8,8,8,.05) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", maxWidth: 1400, width: "100%", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 700 }}>
            <h1 style={{ color: "#fafaf9", font: "800 clamp(40px,8vw,96px)/.95 Arial Black,Arial,sans-serif", letterSpacing: "-.02em", margin: "0 0 22px", textWrap: "pretty" }}>
              BUILT FOR THE BLOCK.<br />WORN BY THE CITY.
            </h1>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={ctx.shopAllClick} style={{ background: "#fafaf9", color: "#0f0f0f", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "16px 30px", cursor: "pointer", borderRadius: 999 }}>SHOP THE DROP</button>
              <button onClick={ctx.shopAllClick} style={{ background: "transparent", color: "#fafaf9", border: "1px solid rgba(250,250,249,.6)", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "16px 30px", cursor: "pointer", borderRadius: 999 }}>NEW ARRIVALS</button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 2 }}>
          {ctx.heroSlides.map((dot, i) => (
            <span key={i} style={{ width: dot.dotWidth, height: 6, borderRadius: 999, background: dot.dotColor, transition: "all .3s" }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "70px 24px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 26 }}>
          <h2 style={{ font: "800 30px Arial Black,Arial,sans-serif", letterSpacing: "-.01em", margin: 0 }}>FEATURED COLLECTIONS</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {ctx.categoryTiles.map((tile) => (
            <div key={tile.name} onClick={tile.onClick} style={{ position: "relative", height: 420, cursor: "pointer", overflow: "hidden", background: "#111", borderRadius: 20 }}>
              <img src={tile.image} alt={tile.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.88 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,.7), transparent 55%)" }} />
              <div style={{ position: "absolute", left: 22, bottom: 22, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ color: "#fafaf9", font: "800 24px Arial Black,Arial,sans-serif" }}>{tile.name}</span>
                <span style={{ color: "#fafaf9", font: "600 12px Helvetica,Arial,sans-serif", letterSpacing: ".05em" }}>SHOP NOW →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "70px 24px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 26 }}>
          <h2 style={{ font: "800 30px Arial Black,Arial,sans-serif", letterSpacing: "-.01em", margin: 0 }}>NEW ARRIVALS</h2>
          <a href="#" onClick={ctx.shopAllClick} style={{ font: "600 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".04em" }}>VIEW ALL →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 24 }}>
          {ctx.newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} wishlisted={p.wished} onOpen={ctx.goProduct} onToggle={ctx.toggleWishlist} onQuickAdd={ctx.quickAdd} onDecrement={ctx.quickDecrement} cartQty={p.cartQty} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "74px auto 0", padding: "0 24px" }}>
        <div style={{ background: "#0f0f0f", color: "#fafaf9", padding: "56px 32px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, borderRadius: 24 }}>
          <span style={{ font: "600 11px Helvetica,Arial,sans-serif", letterSpacing: ".2em", color: "#b9b6b0" }}>MEMBERS ONLY</span>
          <h3 style={{ font: "800 clamp(26px,4vw,42px) Arial Black,Arial,sans-serif", margin: 0, maxWidth: 640 }}>GET 10% OFF YOUR FIRST RESTOCK ALERT</h3>
          <button onClick={ctx.goAuthClick} style={{ background: "#fafaf9", color: "#0f0f0f", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 30px", cursor: "pointer", marginTop: 8, borderRadius: 999 }}>CREATE ACCOUNT</button>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "70px 24px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 26 }}>
          <h2 style={{ font: "800 30px Arial Black,Arial,sans-serif", letterSpacing: "-.01em", margin: 0 }}>TRENDING NOW</h2>
          <a href="#" onClick={ctx.shopAllClick} style={{ font: "600 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".04em" }}>VIEW ALL →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 24 }}>
          {ctx.trending.map((p) => (
            <ProductCard key={p.id} product={p} wishlisted={p.wished} onOpen={ctx.goProduct} onToggle={ctx.toggleWishlist} onQuickAdd={ctx.quickAdd} onDecrement={ctx.quickDecrement} cartQty={p.cartQty} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "70px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 6 }}>
          {ctx.promoSlides.map((slide, i) => (
            <div key={i} style={{ scrollSnapAlign: "start", flex: "0 0 min(720px,90vw)", position: "relative", height: 280, overflow: "hidden", borderRadius: 20 }}>
              <img src={slide.image} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(10,10,10,.72), transparent 60%)" }} />
              <div style={{ position: "absolute", left: 26, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10, maxWidth: "70%" }}>
                <span style={{ color: "#fafaf9", font: "800 26px Arial Black,Arial,sans-serif" }}>{slide.title}</span>
                <span style={{ color: "#e6e3de", font: "400 13px Helvetica,Arial,sans-serif" }}>{slide.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "70px auto 0", padding: "0 24px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 26 }}>
          <h2 style={{ font: "800 30px Arial Black,Arial,sans-serif", letterSpacing: "-.01em", margin: 0 }}>BEST SELLERS</h2>
          <a href="#" onClick={ctx.shopAllClick} style={{ font: "600 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".04em" }}>VIEW ALL →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 24 }}>
          {ctx.bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} wishlisted={p.wished} onOpen={ctx.goProduct} onToggle={ctx.toggleWishlist} onQuickAdd={ctx.quickAdd} onDecrement={ctx.quickDecrement} cartQty={p.cartQty} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "80px auto 0", padding: "0 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <h3 style={{ font: "800 30px Arial Black,Arial,sans-serif", margin: 0 }}>JOIN THE CITY</h3>
        <p style={{ font: "400 14px Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: 0, maxWidth: 440 }}>Restock alerts, early drop access, no spam. Straight to your inbox.</p>
        <form onSubmit={ctx.submitNewsletter} style={{ display: "flex", gap: 8, width: "100%", maxWidth: 440, marginTop: 8 }}>
          <input value={ctx.newsletterEmail} onChange={ctx.setNewsletterEmail} type="email" required placeholder="Email address" style={{ flex: 1, padding: "15px 18px", border: "1px solid #0f0f0f", font: "400 13px Helvetica,Arial,sans-serif", background: "#fafaf9", color: "#0f0f0f", outline: "none", borderRadius: 999 }} />
          <button type="submit" style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "0 26px", cursor: "pointer", borderRadius: 999 }}>JOIN</button>
        </form>
      </div>

      <div style={{ maxWidth: 1400, margin: "70px auto 0", padding: "0 24px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
          <h2 style={{ font: "800 24px Arial Black,Arial,sans-serif", margin: 0 }}>@STREETWEARCIITY</h2>
          <a href="#" style={{ font: "600 12.5px Helvetica,Arial,sans-serif" }}>FOLLOW →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 4 }}>
          {ctx.instaTiles.map((photo, i) => (
            <div key={i} style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 10 }}>
              <img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
