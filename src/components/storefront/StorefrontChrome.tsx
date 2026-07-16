import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import DesktopNav from "./DesktopNav";
import FaqWidget from "./FaqWidget";
import FilterDrawer from "./FilterDrawer";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import SearchOverlay from "./SearchOverlay";
import Toast from "./Toast";
import type { StoreCtx } from "./storefront-types";

export default function StorefrontChrome({ ctx, children }: { ctx: StoreCtx; children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "Helvetica,Arial,sans-serif", background: "#fafaf9", color: "#0f0f0f", minHeight: "100vh", width: "100%", maxWidth: "100vw", position: "relative", overflowX: "hidden" }}>
      {ctx.isDesktop && <DesktopNav ctx={ctx} />}
      {ctx.isMobile && <MobileNav ctx={ctx} />}

      <div style={{ flex: 1, paddingTop: ctx.mainPaddingTop, paddingBottom: ctx.mainPaddingBottom }}>{children}</div>

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
