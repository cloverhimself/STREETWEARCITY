import ProductCard from "./ProductCard";
import type { StoreCtx } from "./storefront-types";

export default function WishlistView({ ctx }: { ctx: StoreCtx }) {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 24px 90px" }}>
      <h1 style={{ font: "800 clamp(28px,4vw,40px) Arial Black,Arial,sans-serif", margin: "0 0 30px" }}>WISHLIST</h1>
      {ctx.hasWishlist && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "24px 20px" }}>
          {ctx.wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} wishlisted onOpen={ctx.goProduct} onToggle={ctx.toggleWishlist} onQuickAdd={ctx.quickAdd} onDecrement={ctx.quickDecrement} cartQty={p.cartQty} />
          ))}
        </div>
      )}
      {ctx.wishlistEmpty && (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "#6b6b6b", font: "400 14px Helvetica,Arial,sans-serif" }}>
          Nothing saved yet. <a href="#" onClick={ctx.shopAllClick} style={{ textDecoration: "underline" }}>Start shopping →</a>
        </div>
      )}
    </div>
  );
}
