"use client";

import AccountView from "./AccountView";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import CheckoutView from "./CheckoutView";
import DesktopNav from "./DesktopNav";
import FaqWidget from "./FaqWidget";
import FilterDrawer from "./FilterDrawer";
import Footer from "./Footer";
import HomeView from "./HomeView";
import MobileNav from "./MobileNav";
import ProductDetailView from "./ProductDetailView";
import SearchOverlay from "./SearchOverlay";
import ShopView from "./ShopView";
import Toast from "./Toast";
import WishlistView from "./WishlistView";
import { useStorefront } from "./useStorefront";

export default function StorefrontApp() {
  const ctx = useStorefront();

  return (
    <div style={{ fontFamily: "Helvetica,Arial,sans-serif", background: "#fafaf9", color: "#0f0f0f", minHeight: "100vh", width: "100%", maxWidth: "100vw", position: "relative", overflowX: "hidden" }}>
      {ctx.isDesktop && <DesktopNav ctx={ctx} />}
      {ctx.isMobile && <MobileNav ctx={ctx} />}

      <div style={{ flex: 1, paddingTop: ctx.mainPaddingTop, paddingBottom: ctx.mainPaddingBottom }}>
        {ctx.isHome && <HomeView ctx={ctx} />}
        {ctx.isShop && <ShopView ctx={ctx} />}
        {ctx.isProduct && <ProductDetailView ctx={ctx} />}
        {ctx.isWishlist && <WishlistView ctx={ctx} />}
        {ctx.isCheckout && <CheckoutView ctx={ctx} />}
        {ctx.isAccount && <AccountView ctx={ctx} />}
      </div>

      <Footer ctx={ctx} />
      <AuthModal ctx={ctx} />
      <FilterDrawer ctx={ctx} />
      <SearchOverlay ctx={ctx} />
      <CartDrawer ctx={ctx} />
      <FaqWidget ctx={ctx} />
      <Toast ctx={ctx} />
    </div>
  );
}
