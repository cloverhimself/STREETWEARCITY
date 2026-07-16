"use client";

import AccountView from "./AccountView";
import CheckoutView from "./CheckoutView";
import HomeView from "./HomeView";
import ProductDetailView from "./ProductDetailView";
import ShopView from "./ShopView";
import StorefrontChrome from "./StorefrontChrome";
import WishlistView from "./WishlistView";
import { useStorefront } from "./useStorefront";

export default function StorefrontApp() {
  const ctx = useStorefront();

  return (
    <StorefrontChrome ctx={ctx}>
      {ctx.isHome && <HomeView ctx={ctx} />}
      {ctx.isShop && <ShopView ctx={ctx} />}
      {ctx.isProduct && <ProductDetailView ctx={ctx} />}
      {ctx.isWishlist && <WishlistView ctx={ctx} />}
      {ctx.isCheckout && <CheckoutView ctx={ctx} />}
      {ctx.isAccount && <AccountView ctx={ctx} />}
    </StorefrontChrome>
  );
}
