"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ADDRESSES,
  NOTIFICATIONS,
  ORDERS,
  PRODUCTS,
  REVIEWS_POOL,
  findProduct,
  naira,
  sizeGuideFor,
  sizeTypeLbl,
  sizesFor,
} from "@/lib/data";
import type { CartLine, Product } from "@/lib/types";
import {
  initialState,
  type AccountSection,
  type DeliveryMethod,
  type ProductView,
  type StoreCtx,
  type StoreState,
} from "./storefront-types";

function wishedList(list: Product[], wishlist: string[], cart: CartLine[]): ProductView[] {
  const cartQtyFor = (id: string) => cart.filter((l) => l.productId === id).reduce((n, l) => n + l.qty, 0);
  return list.map((p) => ({ ...p, wished: wishlist.includes(p.id), cartQty: cartQtyFor(p.id) }));
}

// The storefront view (home/shop/cart/etc.) lives in this hook's local state, not the URL, so a nav
// click from a separate route (e.g. /about) has nowhere to apply a view change to. When that happens
// we stash the requested view here and navigate home, where the next mount picks it up and clears it.
const PENDING_VIEW_KEY = "swc:pendingView";

export function useStorefront(): StoreCtx {
  const [state, setStateRaw] = useState<StoreState>(initialState);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const orderCounter = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  const patch = useCallback((update: Partial<StoreState> | ((s: StoreState) => Partial<StoreState>)) => {
    setStateRaw((prev) => {
      const partial = typeof update === "function" ? update(prev) : update;
      if (partial.view && pathname !== "/") {
        sessionStorage.setItem(PENDING_VIEW_KEY, partial.view);
        router.push("/");
        return prev;
      }
      return { ...prev, ...partial };
    });
  }, [pathname, router]);

  useEffect(() => {
    const onResize = () => patch({ vw: window.innerWidth });
    window.addEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync actual viewport width once mounted in the browser
    patch({ vw: window.innerWidth });
    const pendingView = sessionStorage.getItem(PENDING_VIEW_KEY);
    if (pendingView) {
      sessionStorage.removeItem(PENDING_VIEW_KEY);
      patch({ view: pendingView as StoreState["view"] });
    }
    const heroTimer = setInterval(() => patch((s) => ({ heroIdx: (s.heroIdx + 1) % 3 })), 4500);
    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(heroTimer);
    };
  }, [patch]);

  function showToast(msg: string) {
    patch({ toast: msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => patch({ toast: null }), 2200);
  }

  function goTo(view: StoreState["view"]) {
    window.scrollTo(0, 0);
    patch({ view, mobileNavOpen: false, searchOpen: false });
  }

  function addLine(productId: string, color: string, size: string, qty: number) {
    setStateRaw((prev) => {
      const cart = [...prev.cart];
      const idx = cart.findIndex((l) => l.productId === productId && l.color === color && l.size === size);
      if (idx >= 0) cart[idx] = { ...cart[idx], qty: cart[idx].qty + qty };
      else cart.push({ productId, color, size, qty });
      return { ...prev, cart };
    });
  }

  const s = state;
  const isMobile = s.vw < 860;
  const wishedProducts = (list: Product[]) => wishedList(list, s.wishlist, s.cart);

  let shopList = PRODUCTS.filter((p) => s.shopCategory === "All" || p.category === s.shopCategory);
  if (s.shopSort === "PriceLow") shopList = [...shopList].sort((a, b) => a.price - b.price);
  else if (s.shopSort === "PriceHigh") shopList = [...shopList].sort((a, b) => b.price - a.price);
  else if (s.shopSort === "Newest") shopList = [...shopList].reverse();
  const categories = ["All", "Headwear", "Tops", "Bottoms"];

  const cp = findProduct(s.activeProductId ?? undefined) || PRODUCTS[0];
  const cpColor = s.pdpColor || cp.colors[0].name;
  const cpSize = s.pdpSize || sizesFor(cp)[0];
  const related = wishedProducts(PRODUCTS.filter((p) => p.category === cp.category && p.id !== cp.id).slice(0, 4));
  const galleryPositions = ["center", "top", "bottom"];

  const cartLines = s.cart.map((line, i) => {
    const p = findProduct(line.productId)!;
    return {
      key: i,
      image: p.image,
      name: p.name,
      qty: line.qty,
      variantLabel: line.color + " · " + line.size,
      lineTotalLabel: naira(p.price * line.qty),
      _price: p.price,
      incQty: () =>
        setStateRaw((prev) => {
          const c = [...prev.cart];
          c[i] = { ...c[i], qty: c[i].qty + 1 };
          return { ...prev, cart: c };
        }),
      decQty: () =>
        setStateRaw((prev) => {
          if (prev.cart[i].qty <= 1) return prev;
          const c = [...prev.cart];
          c[i] = { ...c[i], qty: c[i].qty - 1 };
          return { ...prev, cart: c };
        }),
      remove: () =>
        setStateRaw((prev) => ({ ...prev, cart: prev.cart.filter((_, idx) => idx !== i) })),
    };
  });
  const cartSubtotal = cartLines.reduce((sum, l) => sum + l._price * l.qty, 0);
  const cartCount = s.cart.reduce((n, l) => n + l.qty, 0);
  const deliveryFee = s.deliveryMethod === "express" ? 18 : s.deliveryMethod === "pickup" ? 0 : cartSubtotal > 150 ? 0 : 9;
  const discount = s.couponApplied ? cartSubtotal * 0.1 : 0;
  const orderTotal = Math.max(0, cartSubtotal + deliveryFee - discount);

  const activeBg = (active: boolean) => (active ? "#0f0f0f" : "transparent");
  const activeColor = (active: boolean) => (active ? "#fafaf9" : "#0f0f0f");
  const navHomeActive = s.view === "home";
  const navShopActive = s.view === "shop";
  const navWishlistActive = s.view === "wishlist";
  const navCartActive = s.cartOpen;
  const navAccountActive = s.view === "account";

  const toggleWishlist = (id: string) => {
    const w = s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id];
    const wasWishlisted = s.wishlist.includes(id);
    patch({ wishlist: w });
    showToast(wasWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };
  const quickAdd = (id: string) => {
    const p = findProduct(id);
    if (!p) return;
    addLine(id, p.colors[0].name, sizesFor(p)[0], 1);
    showToast("Added to bag");
  };
  const quickDecrement = (id: string) => {
    setStateRaw((prev) => {
      const idx = prev.cart.findIndex((l) => l.productId === id);
      if (idx < 0) return prev;
      const cart = [...prev.cart];
      if (cart[idx].qty > 1) cart[idx] = { ...cart[idx], qty: cart[idx].qty - 1 };
      else cart.splice(idx, 1);
      return { ...prev, cart };
    });
  };

  const goProduct = (id: string) => {
    patch({ view: "product", activeProductId: id, pdpColor: null, pdpSize: null, pdpQty: 1, pdpGalleryIdx: 0, sizeGuideOpen: false });
    window.scrollTo(0, 0);
  };

  const selectedOrder = ORDERS.find((x) => x.id === s.selectedOrderId) || ORDERS[0];
  const selectedOrderItems = selectedOrder.items.map((it) => {
    const p = findProduct(it.productId)!;
    return { image: p.image, name: p.name, variantLabel: it.color + " · " + it.size, qty: it.qty };
  });
  const labels = ["Placed", "Confirmed", "Packed", "Shipped"];
  const stepMap = Math.min(4, Math.ceil(selectedOrder.trackingStep / 1.5));
  const trackingSteps = labels.map((label, i) => ({
    label,
    isLast: i === labels.length - 1,
    notLast: i !== labels.length - 1,
    flexGrow: i === labels.length - 1 ? "0 0 auto" : "1",
    done: i < stepMap,
    current: i === stepMap - 1,
    dotBg: i < stepMap ? "#0f0f0f" : "#fafaf9",
    dotBorder: i < stepMap ? "#0f0f0f" : "#cfccc6",
    lineBg: i < stepMap - 1 ? "#0f0f0f" : "#e6e3de",
    textColor: i < stepMap ? "#0f0f0f" : "#9c9994",
  }));

  const ctx: StoreCtx = {
    isMobile,
    isDesktop: !isMobile,
    gridPdp: isMobile ? "1fr" : "minmax(0,1.1fr) minmax(280px,0.9fr)",
    gridGapPdp: isMobile ? "28px" : "56px",
    gridCheckout: isMobile ? "1fr" : "minmax(0,1.4fr) minmax(280px,1fr)",
    gridGapCheckout: isMobile ? "30px" : "50px",
    gridAccount: isMobile ? "1fr" : "220px minmax(0,1fr)",
    gridGapAccount: isMobile ? "20px" : "44px",
    acctNavDirection: isMobile ? "row" : "column",
    acctNavGap: isMobile ? "8px" : "2px",
    acctNavOverflow: isMobile ? "auto" : "visible",
    gridOrderDetail: isMobile ? "1fr" : "minmax(0,1fr) 260px",
    gridGapOrderDetail: isMobile ? "28px" : "40px",
    mainPaddingTop: isMobile && s.view !== "home" ? "86px" : "0",
    mainPaddingBottom: isMobile ? "104px" : "0",
    freeShipLabel: naira(150),

    toggleMobileNav: () => patch({ mobileNavOpen: !s.mobileNavOpen }),
    closeMobileNav: () => patch({ mobileNavOpen: false }),
    mobileNavOpen: s.mobileNavOpen,
    navHomeBg: activeBg(navHomeActive),
    navHomeColor: activeColor(navHomeActive),
    navShopBg: activeBg(navShopActive),
    navShopColor: activeColor(navShopActive),
    navShopClick: () => {
      patch({ shopCategory: "All" });
      goTo("shop");
    },
    navWishlistBg: activeBg(navWishlistActive),
    navWishlistColor: activeColor(navWishlistActive),
    navCartBg: activeBg(navCartActive),
    navCartColor: activeColor(navCartActive),
    navAccountBg: activeBg(navAccountActive),
    navAccountColor: activeColor(navAccountActive),
    navAccountClick: () => {
      if (!s.isLoggedIn) {
        patch({ authOpen: true, authTab: "login" });
        return;
      }
      patch({ view: "account", accountSection: "overview" });
      window.scrollTo(0, 0);
    },
    stop: (e) => e.stopPropagation(),
    goHomeClick: (e) => {
      e.preventDefault();
      goTo("home");
    },
    shopAllClick: (e) => {
      e?.preventDefault();
      patch({ shopCategory: "All" });
      goTo("shop");
    },
    shopHeadwearClick: (e) => {
      e.preventDefault();
      patch({ shopCategory: "Headwear" });
      goTo("shop");
    },
    shopTopsClick: (e) => {
      e.preventDefault();
      patch({ shopCategory: "Tops" });
      goTo("shop");
    },
    shopBottomsClick: (e) => {
      e.preventDefault();
      patch({ shopCategory: "Bottoms" });
      goTo("shop");
    },
    goWishlistClick: (e) => {
      e.preventDefault();
      goTo("wishlist");
    },
    goAccountClick: (e) => {
      e?.preventDefault();
      if (!s.isLoggedIn) {
        patch({ authOpen: true, authTab: "login" });
        return;
      }
      patch({ view: "account", accountSection: "overview" });
      window.scrollTo(0, 0);
    },
    goAccountOrdersClick: () => patch({ view: "account", accountSection: "orders" }),
    goAuthClick: (e) => {
      e?.preventDefault();
      patch({ authOpen: true, authTab: "register" });
    },
    goForgotClick: (e) => {
      e.preventDefault();
      patch({ authTab: "forgot" });
    },
    goVerifyClick: () => patch({ authTab: "verify" }),
    openSearch: () => patch({ searchOpen: true }),
    closeSearch: () => patch({ searchOpen: false }),
    searchOpen: s.searchOpen,
    openCart: () => patch({ cartOpen: true }),
    closeCart: () => patch({ cartOpen: false }),
    cartOpen: s.cartOpen,
    cartCount,
    wishlistCount: s.wishlist.length,

    authOpen: s.authOpen,
    closeAuthModal: () => patch({ authOpen: false }),
    authTabs: (
      [
        { key: "login", label: "LOG IN" },
        { key: "register", label: "REGISTER" },
        { key: "forgot", label: "RESET" },
      ] as const
    ).map((t) => ({
      ...t,
      onClick: () => patch({ authTab: t.key, forgotStep: "request" }),
      borderColor: s.authTab === t.key || (s.authTab === "verify" && t.key === "register") ? "#0f0f0f" : "transparent",
      color: s.authTab === t.key ? "#0f0f0f" : "#9c9994",
    })),
    isLoginTab: s.authTab === "login",
    isRegisterTab: s.authTab === "register",
    isForgotTab: s.authTab === "forgot",
    isVerifyTab: s.authTab === "verify",
    isForgotRequestStep: s.forgotStep === "request",
    isForgotResetStep: s.forgotStep === "reset",
    submitAuth: () => {
      patch({ isLoggedIn: true, authOpen: false, view: "account", accountSection: "overview" });
      window.scrollTo(0, 0);
      showToast("Welcome to Streetwear City");
    },
    sendResetCode: () => {
      patch({ forgotStep: "reset" });
      showToast("Reset code sent to your email");
    },
    submitNewPassword: () => {
      patch({ authTab: "login", forgotStep: "request" });
      showToast("Password updated, please log in");
    },
    loginPwType: s.showLoginPw ? "text" : "password",
    showLoginPw: s.showLoginPw,
    toggleLoginPw: () => patch({ showLoginPw: !s.showLoginPw }),
    regPwType: s.showRegPw ? "text" : "password",
    showRegPw: s.showRegPw,
    toggleRegPw: () => patch({ showRegPw: !s.showRegPw }),
    newPwType: s.showNewPw ? "text" : "password",
    showNewPw: s.showNewPw,
    toggleNewPw: () => patch({ showNewPw: !s.showNewPw }),

    toggleWishlist,
    quickAdd,
    quickDecrement,

    isHome: s.view === "home",
    heroSlides: ["/uploads/DenimJeans2.jpg", "/uploads/Jerseyshirt1.jpg", "/uploads/DenimJeans.jpg"].map((image, i) => ({
      image,
      opacity: i === s.heroIdx ? 1 : 0,
      dotWidth: i === s.heroIdx ? "22px" : "6px",
      dotColor: i === s.heroIdx ? "#fafaf9" : "rgba(250,250,249,.4)",
    })),
    categoryTiles: [
      { name: "HEADWEAR", image: "/uploads/fitted cap.jpg", onClick: () => { patch({ shopCategory: "Headwear" }); goTo("shop"); } },
      { name: "TOPS", image: "/uploads/Jerseyshirt1.jpg", onClick: () => { patch({ shopCategory: "Tops" }); goTo("shop"); } },
      { name: "BOTTOMS", image: "/uploads/DenimJeans2.jpg", onClick: () => { patch({ shopCategory: "Bottoms" }); goTo("shop"); } },
    ],
    newArrivals: wishedProducts(PRODUCTS.filter((p) => p.badge === "New").slice(0, 4)),
    trending: wishedProducts([PRODUCTS[5], PRODUCTS[9], PRODUCTS[3], PRODUCTS[7]]),
    bestSellers: wishedProducts(
      PRODUCTS.filter((p) => p.badge === "Bestseller").concat(PRODUCTS.filter((p) => p.badge !== "Bestseller")).slice(0, 4)
    ),
    promoSlides: [
      { image: "/uploads/DenimJeans.jpg", title: "BAGGY DENIM RESTOCK", sub: "Curved seam construction, back in stock." },
      { image: "/uploads/Jerseyshirt2.jpg", title: "ARCHIVE JERSEY PULLS", sub: "Verified authentic consignment drops weekly." },
      { image: "/uploads/croptop1.jpg", title: "CROP SEASON", sub: "Graphic tees cut for the city heat." },
    ],
    instaTiles: [PRODUCTS[3].image, PRODUCTS[6].image, PRODUCTS[9].image, PRODUCTS[7].image, PRODUCTS[0].image, PRODUCTS[11].image],
    newsletterEmail: s.newsletterEmail,
    setNewsletterEmail: (e) => patch({ newsletterEmail: e.target.value }),
    submitNewsletter: (e) => {
      e.preventDefault();
      showToast("You are on the list, welcome to the city.");
      patch({ newsletterEmail: "" });
    },

    isShop: s.view === "shop",
    shopTitle: s.shopCategory === "All" ? "All Products" : s.shopCategory,
    filterOpen: s.filterOpen,
    openFilter: () => patch({ filterOpen: true }),
    closeFilter: () => patch({ filterOpen: false }),
    filterCategoryOptions: categories.map((c) => ({
      label: c,
      onClick: () => patch({ shopCategory: c }),
      bg: s.shopCategory === c ? "#0f0f0f" : "transparent",
      color: s.shopCategory === c ? "#fafaf9" : "#0f0f0f",
    })),
    shopSort: s.shopSort,
    setShopSort: (e) => patch({ shopSort: e.target.value }),
    shopProducts: wishedProducts(shopList),
    shopCount: shopList.length,

    isProduct: s.view === "product",
    currentProduct: cp,
    pdpPriceLabel: naira(cp.price),
    pdpCompareLabel: cp.compareAt ? naira(cp.compareAt) : "",
    starIcons: [0, 1, 2, 3, 4].map((i) => ({ fill: i < Math.round(cp.rating) ? "#0f0f0f" : "none" })),
    selectedColorName: cpColor,
    colorOptions: cp.colors.map((c) => ({
      name: c.name,
      hex: c.hex,
      border: c.name === cpColor ? "#0f0f0f" : "transparent",
      onClick: () => patch({ pdpColor: c.name }),
    })),
    sizeTypeLabel: sizeTypeLbl(cp),
    sizeOptions: sizesFor(cp).map((sz) => ({
      label: sz,
      onClick: () => patch({ pdpSize: sz }),
      border: sz === cpSize ? "#0f0f0f" : "#cfccc6",
      bg: sz === cpSize ? "#0f0f0f" : "transparent",
      color: sz === cpSize ? "#fafaf9" : "#0f0f0f",
    })),
    toggleSizeGuide: (e) => {
      e.preventDefault();
      patch({ sizeGuideOpen: !s.sizeGuideOpen });
    },
    sizeGuideOpen: s.sizeGuideOpen,
    sizeGuideText: sizeGuideFor(cp),
    qty: s.pdpQty,
    incQty: () => patch({ pdpQty: s.pdpQty + 1 }),
    decQty: () => patch({ pdpQty: Math.max(1, s.pdpQty - 1) }),
    stockLabel: cp.stock === 0 ? "Sold Out" : cp.stock < 6 ? `Only ${cp.stock} left` : "In Stock",
    stockColor: cp.stock === 0 ? "#9c3a3a" : cp.stock < 6 ? "oklch(0.5 0.16 40)" : "#6b6b6b",
    addBtnBg: cp.stock === 0 ? "#9c9994" : "#0f0f0f",
    addBtnLabel: cp.stock === 0 ? "SOLD OUT" : "ADD TO CART",
    addToCartCurrent: () => {
      if (cp.stock === 0) return;
      addLine(cp.id, cpColor, cpSize, s.pdpQty);
      showToast("Added to bag");
    },
    currentHeartFill: s.wishlist.includes(cp.id) ? "#0f0f0f" : "none",
    toggleWishlistCurrent: () => {
      const w = s.wishlist.includes(cp.id) ? s.wishlist.filter((x) => x !== cp.id) : [...s.wishlist, cp.id];
      const wasWishlisted = s.wishlist.includes(cp.id);
      patch({ wishlist: w });
      showToast(wasWishlisted ? "Removed from wishlist" : "Added to wishlist");
    },
    galleryPosition: galleryPositions[s.pdpGalleryIdx],
    galleryThumbs: galleryPositions.map((pos, i) => ({
      position: pos,
      border: i === s.pdpGalleryIdx ? "#0f0f0f" : "transparent",
      onClick: () => patch({ pdpGalleryIdx: i }),
    })),
    accordions: [
      {
        title: "DESCRIPTION",
        icon: s.accordionOpen.description ? "−" : "+",
        open: s.accordionOpen.description,
        body: cp.description + "\n\n" + cp.details,
        onClick: () => patch({ accordionOpen: { ...s.accordionOpen, description: !s.accordionOpen.description } }),
      },
      {
        title: "SIZE GUIDE",
        icon: s.accordionOpen.sizeGuide ? "−" : "+",
        open: s.accordionOpen.sizeGuide,
        body: sizeGuideFor(cp),
        onClick: () => patch({ accordionOpen: { ...s.accordionOpen, sizeGuide: !s.accordionOpen.sizeGuide } }),
      },
      {
        title: "DELIVERY & RETURNS",
        icon: s.accordionOpen.delivery ? "−" : "+",
        open: s.accordionOpen.delivery,
        body: "Free standard shipping on orders over " + naira(150) + ". Delivered in 3 to 5 business days. Returns accepted within 14 days, unworn with tags attached.",
        onClick: () => patch({ accordionOpen: { ...s.accordionOpen, delivery: !s.accordionOpen.delivery } }),
      },
    ],
    reviewsList: REVIEWS_POOL.map((r) => ({ ...r, starArr: [0, 1, 2, 3, 4].map((i) => (i < r.rating ? "#0f0f0f" : "none")) })),
    relatedProducts: related,
    goProduct,

    isWishlist: s.view === "wishlist",
    hasWishlist: s.wishlist.length > 0,
    wishlistEmpty: s.wishlist.length === 0,
    wishlistProducts: wishedProducts(PRODUCTS.filter((p) => s.wishlist.includes(p.id))),

    isCheckout: s.view === "checkout",
    checkoutDone: s.checkoutDone,
    checkoutNotDone: !s.checkoutDone,
    confirmedOrderNumber: s.confirmedOrderNumber,
    checkoutSteps: ["SHIPPING", "DELIVERY", "PAYMENT"].map((label, i) => ({
      label,
      num: i + 1,
      last: i === 2,
      notLast: i !== 2,
      bg: i <= s.checkoutStep ? "#0f0f0f" : "transparent",
      color: i <= s.checkoutStep ? "#fafaf9" : "#0f0f0f",
      textColor: i <= s.checkoutStep ? "#0f0f0f" : "#9c9994",
    })),
    isStepShipping: s.checkoutStep === 0,
    isStepDelivery: s.checkoutStep === 1,
    isStepPayment: s.checkoutStep === 2,
    shipForm: s.shipForm,
    setShipFirst: (e) => patch({ shipForm: { ...s.shipForm, first: e.target.value } }),
    setShipLast: (e) => patch({ shipForm: { ...s.shipForm, last: e.target.value } }),
    setShipAddress: (e) => patch({ shipForm: { ...s.shipForm, address: e.target.value } }),
    setShipCity: (e) => patch({ shipForm: { ...s.shipForm, city: e.target.value } }),
    setShipState: (e) => patch({ shipForm: { ...s.shipForm, state: e.target.value } }),
    setShipZip: (e) => patch({ shipForm: { ...s.shipForm, zip: e.target.value } }),
    setShipPhone: (e) => patch({ shipForm: { ...s.shipForm, phone: e.target.value } }),
    goToDelivery: () => patch({ checkoutStep: 1 }),
    backToShipping: () => patch({ checkoutStep: 0 }),
    goToPayment: () => patch({ checkoutStep: 2 }),
    backToDelivery: () => patch({ checkoutStep: 1 }),
    deliveryOptions: (
      [
        { key: "standard" as DeliveryMethod, name: "Standard Shipping", eta: "3 to 5 business days", priceLabel: cartSubtotal > 150 ? "FREE" : naira(9) },
        { key: "express" as DeliveryMethod, name: "Express Shipping", eta: "1 to 2 business days", priceLabel: naira(18) },
        { key: "pickup" as DeliveryMethod, name: "Store Pickup, SoHo", eta: "Ready in 2 hours", priceLabel: "FREE" },
      ] as const
    ).map((d) => ({
      ...d,
      checked: s.deliveryMethod === d.key,
      border: s.deliveryMethod === d.key ? "#0f0f0f" : "#e6e3de",
      onClick: () => patch({ deliveryMethod: d.key }),
    })),
    paymentStage: s.paymentStage,
    isPaymentReview: s.paymentStage === "review",
    isPaymentRedirecting: s.paymentStage === "redirecting",
    isPaymentVerifying: s.paymentStage === "verifying",
    payNow: () => {
      patch({ paymentStage: "redirecting" });
      setTimeout(() => {
        patch({ paymentStage: "verifying" });
        setTimeout(() => {
          orderCounter.current += 1;
          const num = "SWC-" + (10000 + orderCounter.current);
          patch({ checkoutDone: true, confirmedOrderNumber: num, cart: [], couponApplied: false, paymentStage: "review" });
        }, 900);
      }, 900);
    },
    orderNotes: s.orderNotes,
    setOrderNotes: (e) => patch({ orderNotes: e.target.value }),
    couponCode: s.couponCode,
    setCoupon: (e) => patch({ couponCode: e.target.value }),
    couponApplied: s.couponApplied,
    applyCoupon: () => {
      if (s.couponCode.trim()) {
        patch({ couponApplied: true });
        showToast("Coupon applied, 10% off");
      }
    },
    cartLines,
    subtotalLabel: naira(cartSubtotal),
    deliveryFeeLabel: deliveryFee === 0 ? "FREE" : naira(deliveryFee),
    discountLabel: naira(discount),
    orderTotalLabel: naira(orderTotal),
    goCheckoutClick: () => {
      if (s.cart.length === 0) return;
      patch({ cartOpen: false, view: "checkout", checkoutStep: 0, checkoutDone: false, paymentStage: "review" });
      window.scrollTo(0, 0);
    },
    hasCart: s.cart.length > 0,
    cartEmptyBool: s.cart.length === 0,

    isAccount: s.view === "account",
    zeroCreditLabel: naira(0),
    accountNavItems: (
      [
        { key: "overview" as AccountSection, label: "Overview" },
        { key: "orders" as AccountSection, label: "Order History" },
        { key: "addresses" as AccountSection, label: "Addresses" },
        { key: "notifications" as AccountSection, label: "Notifications" },
        { key: "settings" as AccountSection, label: "Settings" },
      ]
    ).map((it) => ({
      ...it,
      onClick: () => patch({ accountSection: it.key }),
      bg: s.accountSection === it.key ? "#0f0f0f" : "transparent",
      color: s.accountSection === it.key ? "#fafaf9" : "#0f0f0f",
    })),
    isAcctOverview: s.accountSection === "overview",
    isAcctOrders: s.accountSection === "orders",
    isAcctOrderDetail: s.accountSection === "order-detail",
    isAcctAddresses: s.accountSection === "addresses",
    isAcctNotifications: s.accountSection === "notifications",
    isAcctSettings: s.accountSection === "settings",
    ordersCount: ORDERS.length,
    ordersMock: ORDERS.map((o) => ({
      ...o,
      totalLabel: naira(o.total),
      itemCount: o.items.length,
      statusBg: o.status === "Delivered" ? "#eceae5" : o.status === "In Transit" ? "#e9e6df" : "#f0efec",
      statusColor: "#0f0f0f",
      onView: () => patch({ accountSection: "order-detail", selectedOrderId: o.id }),
    })),
    backToOrders: () => patch({ accountSection: "orders" }),
    selectedOrder: { ...selectedOrder, totalLabel: naira(selectedOrder.total) },
    selectedOrderItems,
    trackingSteps,
    addressesList: ADDRESSES,
    notificationsList: NOTIFICATIONS.map((n) => ({ ...n, bg: n.unread ? "#faf9f7" : "transparent" })),
    profileForm: s.profileForm,
    setProfileName: (e) => patch({ profileForm: { ...s.profileForm, name: e.target.value } }),
    setProfileEmail: (e) => patch({ profileForm: { ...s.profileForm, email: e.target.value } }),
    setProfilePhone: (e) => patch({ profileForm: { ...s.profileForm, phone: e.target.value } }),
    settingsToggles: (
      [
        { key: "orderUpdates" as const, label: "Order status updates" },
        { key: "restockAlerts" as const, label: "Restock alerts" },
        { key: "promos" as const, label: "Promotions & offers" },
      ]
    ).map((t) => ({
      ...t,
      bg: s.settingsToggles[t.key] ? "#0f0f0f" : "#cfccc6",
      knobLeft: s.settingsToggles[t.key] ? "18px" : "2px",
      onClick: () => patch({ settingsToggles: { ...s.settingsToggles, [t.key]: !s.settingsToggles[t.key] } }),
    })),
    notifySaved: () => showToast("Settings saved"),
    notifyDemo: () => showToast("Demo prototype, not wired to a backend"),

    faqOpen: s.faqOpen,
    faqPanelWidth: isMobile ? "calc(100vw - 40px)" : "360px",
    faqPanelLeft: isMobile ? "20px" : "auto",
    faqPanelBottom: isMobile ? "96px" : "92px",
    faqBtnBottom: isMobile ? "104px" : "24px",
    toggleFaq: () =>
      patch({
        faqOpen: !s.faqOpen,
        faqThread: s.faqThread.length
          ? s.faqThread
          : [{ align: "flex-start", bg: "#f3f2ef", color: "#0f0f0f", text: "Hey, what do you want to know about Streetwear City?" }],
      }),
    closeFaq: () => patch({ faqOpen: false }),
    faqThread: s.faqThread,
    faqQuestions: [
      { question: "What is your delivery time?", answer: "Standard delivery is 3 to 5 business days. Express gets it to you in 1 to 2 business days." },
      { question: "Are your items verified authentic?", answer: "Every piece goes through our authenticity check before it ships. No fakes, ever." },
      { question: "What is your return policy?", answer: "Returns are accepted within 14 days, unworn with tags attached." },
      { question: "Do you ship internationally?", answer: "Right now we ship within Nigeria only, with more countries coming soon." },
      { question: "How do I track my order?", answer: "Head to Account, then Order History, then tap Track on any order to see live status." },
    ].map((q) => ({
      ...q,
      onClick: () =>
        patch({
          faqThread: [
            ...s.faqThread,
            { align: "flex-end", bg: "#0f0f0f", color: "#fafaf9", text: q.question },
            { align: "flex-start", bg: "#f3f2ef", color: "#0f0f0f", text: q.answer },
          ],
        }),
    })),
    footerAccordion: [
      { key: "support", title: "SUPPORT", links: ["Shipping", "Returns", "FAQ", "Contact Us"] },
      { key: "company", title: "COMPANY", links: ["About", "Privacy Policy", "Terms of Service"] },
      { key: "connect", title: "CONNECT", links: ["@streetwearciity"] },
    ].map((f) => ({
      ...f,
      isConnect: f.key === "connect",
      open: s.footerOpenSection === f.key,
      icon: s.footerOpenSection === f.key ? "−" : "+",
      onClick: () => patch({ footerOpenSection: s.footerOpenSection === f.key ? null : f.key }),
    })),
    trendingSearches: ["baggy jeans", "fitted cap", "crop tee", "mesh jersey", "beanie"],
    searchSuggestions: wishedProducts(PRODUCTS.slice(0, 4)),

    toast: s.toast,
  };

  return ctx;
}
