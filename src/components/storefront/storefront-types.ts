import type { Address, CartLine, Notification, Order, Product } from "@/lib/types";

export type View = "home" | "shop" | "product" | "wishlist" | "checkout" | "account";
export type AuthTabKey = "login" | "register" | "forgot" | "verify";
export type ForgotStep = "request" | "reset";
export type DeliveryMethod = "standard" | "express" | "pickup";
export type AccountSection = "overview" | "orders" | "order-detail" | "addresses" | "notifications" | "settings";
export type PaymentStage = "review" | "redirecting" | "verifying";

export interface ShipForm {
  first: string;
  last: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface ProfileForm {
  name: string;
  email: string;
  phone: string;
}

export interface SettingsToggleState {
  orderUpdates: boolean;
  restockAlerts: boolean;
  promos: boolean;
}

export interface AccordionOpenState {
  description: boolean;
  sizeGuide: boolean;
  delivery: boolean;
}

export interface FaqMessage {
  align: "flex-start" | "flex-end";
  bg: string;
  color: string;
  text: string;
}

export interface StoreState {
  view: View;
  activeProductId: string | null;
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  filterOpen: boolean;
  authOpen: boolean;
  authTab: AuthTabKey;
  isLoggedIn: boolean;
  showLoginPw: boolean;
  showRegPw: boolean;
  showNewPw: boolean;
  forgotStep: ForgotStep;
  checkoutStep: number;
  checkoutDone: boolean;
  confirmedOrderNumber: string | null;
  shopCategory: string;
  shopSort: string;
  accountSection: AccountSection;
  selectedOrderId: string;
  pdpColor: string | null;
  pdpSize: string | null;
  pdpQty: number;
  pdpGalleryIdx: number;
  sizeGuideOpen: boolean;
  accordionOpen: AccordionOpenState;
  newsletterEmail: string;
  couponCode: string;
  couponApplied: boolean;
  orderNotes: string;
  shipForm: ShipForm;
  deliveryMethod: DeliveryMethod;
  paymentStage: PaymentStage;
  profileForm: ProfileForm;
  settingsToggles: SettingsToggleState;
  vw: number;
  heroIdx: number;
  footerOpenSection: string | null;
  faqOpen: boolean;
  faqThread: FaqMessage[];
  toast: string | null;
}

export const initialShipForm: ShipForm = {
  first: "Jordan",
  last: "M.",
  address: "214 Bowery St",
  city: "New York",
  state: "NY",
  zip: "10012",
  phone: "",
};

export const initialState: StoreState = {
  view: "home",
  activeProductId: null,
  cart: [],
  wishlist: [],
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  filterOpen: false,
  authOpen: false,
  authTab: "login",
  isLoggedIn: false,
  showLoginPw: false,
  showRegPw: false,
  showNewPw: false,
  forgotStep: "request",
  checkoutStep: 0,
  checkoutDone: false,
  confirmedOrderNumber: null,
  shopCategory: "All",
  shopSort: "Featured",
  accountSection: "overview",
  selectedOrderId: "SWC-10501",
  pdpColor: null,
  pdpSize: null,
  pdpQty: 1,
  pdpGalleryIdx: 0,
  sizeGuideOpen: false,
  accordionOpen: { description: true, sizeGuide: false, delivery: false },
  newsletterEmail: "",
  couponCode: "",
  couponApplied: false,
  orderNotes: "",
  shipForm: initialShipForm,
  deliveryMethod: "standard",
  paymentStage: "review",
  profileForm: { name: "Jordan M.", email: "jordan.m@gmail.com", phone: "" },
  settingsToggles: { orderUpdates: true, restockAlerts: true, promos: false },
  vw: 1200,
  heroIdx: 0,
  footerOpenSection: null,
  faqOpen: false,
  faqThread: [],
  toast: null,
};

export interface ProductView extends Product {
  wished: boolean;
  cartQty: number;
}

export interface CartLineView {
  key: number;
  image: string;
  name: string;
  qty: number;
  variantLabel: string;
  lineTotalLabel: string;
  incQty: () => void;
  decQty: () => void;
  remove: () => void;
}

export interface CategoryTile {
  name: string;
  image: string;
  onClick: () => void;
}

export interface HeroSlide {
  image: string;
  opacity: number;
  dotWidth: string;
  dotColor: string;
}

export interface PromoSlide {
  image: string;
  title: string;
  sub: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  border: string;
  onClick: () => void;
}

export interface SizeOption {
  label: string;
  border: string;
  bg: string;
  color: string;
  onClick: () => void;
}

export interface GalleryThumb {
  position: string;
  border: string;
  onClick: () => void;
}

export interface Accordion {
  title: string;
  icon: string;
  open: boolean;
  body: string;
  onClick: () => void;
}

export interface StarIcon {
  fill: string;
}

export interface ReviewView {
  name: string;
  rating: number;
  verified: boolean;
  date: string;
  text: string;
  starArr: string[];
}

export interface FilterCategoryOption {
  label: string;
  onClick: () => void;
  bg: string;
  color: string;
}

export interface AuthTabView {
  key: AuthTabKey;
  label: string;
  onClick: () => void;
  borderColor: string;
  color: string;
}

export interface CheckoutStepView {
  label: string;
  num: number;
  last: boolean;
  notLast: boolean;
  bg: string;
  color: string;
  textColor: string;
}

export interface DeliveryOptionView {
  key: DeliveryMethod;
  name: string;
  eta: string;
  priceLabel: string;
  checked: boolean;
  border: string;
  onClick: () => void;
}

export interface AccountNavItemView {
  key: AccountSection;
  label: string;
  onClick: () => void;
  bg: string;
  color: string;
}

export interface OrderMockView extends Order {
  totalLabel: string;
  itemCount: number;
  statusBg: string;
  statusColor: string;
  onView: () => void;
}

export interface TrackingStepView {
  label: string;
  isLast: boolean;
  notLast: boolean;
  flexGrow: string;
  done: boolean;
  current: boolean;
  dotBg: string;
  dotBorder: string;
  lineBg: string;
  textColor: string;
}

export interface OrderLineView {
  image: string;
  name: string;
  variantLabel: string;
  qty: number;
}

export interface SettingsToggleView {
  key: keyof SettingsToggleState;
  label: string;
  bg: string;
  knobLeft: string;
  onClick: () => void;
}

export interface FaqQuestionView {
  question: string;
  answer: string;
  onClick: () => void;
}

export interface FooterSection {
  key: string;
  title: string;
  links: string[];
  isConnect: boolean;
  open: boolean;
  icon: string;
  onClick: () => void;
}

export interface StoreCtx {
  // layout
  isMobile: boolean;
  isDesktop: boolean;
  gridPdp: string;
  gridGapPdp: string;
  gridCheckout: string;
  gridGapCheckout: string;
  gridAccount: string;
  gridGapAccount: string;
  acctNavDirection: string;
  acctNavGap: string;
  acctNavOverflow: string;
  gridOrderDetail: string;
  gridGapOrderDetail: string;
  mainPaddingTop: string;
  mainPaddingBottom: string;
  freeShipLabel: string;

  // nav
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  mobileNavOpen: boolean;
  navHomeBg: string;
  navHomeColor: string;
  navShopBg: string;
  navShopColor: string;
  navShopClick: () => void;
  navWishlistBg: string;
  navWishlistColor: string;
  navCartBg: string;
  navCartColor: string;
  navAccountBg: string;
  navAccountColor: string;
  navAccountClick: () => void;
  stop: (e: React.SyntheticEvent) => void;
  goHomeClick: (e: React.SyntheticEvent) => void;
  shopAllClick: (e?: React.SyntheticEvent) => void;
  shopHeadwearClick: (e: React.SyntheticEvent) => void;
  shopTopsClick: (e: React.SyntheticEvent) => void;
  shopBottomsClick: (e: React.SyntheticEvent) => void;
  goWishlistClick: (e: React.SyntheticEvent) => void;
  goAccountClick: (e?: React.SyntheticEvent) => void;
  goAccountOrdersClick: () => void;
  goAuthClick: (e?: React.SyntheticEvent) => void;
  goForgotClick: (e: React.SyntheticEvent) => void;
  goVerifyClick: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  searchOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartOpen: boolean;
  cartCount: number;
  wishlistCount: number;

  // auth modal
  authOpen: boolean;
  closeAuthModal: () => void;
  authTabs: AuthTabView[];
  isLoginTab: boolean;
  isRegisterTab: boolean;
  isForgotTab: boolean;
  isVerifyTab: boolean;
  isForgotRequestStep: boolean;
  isForgotResetStep: boolean;
  submitAuth: () => void;
  sendResetCode: () => void;
  submitNewPassword: () => void;
  loginPwType: string;
  showLoginPw: boolean;
  toggleLoginPw: () => void;
  regPwType: string;
  showRegPw: boolean;
  toggleRegPw: () => void;
  newPwType: string;
  showNewPw: boolean;
  toggleNewPw: () => void;

  // wishlist/cart helpers
  toggleWishlist: (id: string) => void;
  quickAdd: (id: string) => void;
  quickDecrement: (id: string) => void;

  // home
  isHome: boolean;
  heroSlides: HeroSlide[];
  categoryTiles: CategoryTile[];
  newArrivals: ProductView[];
  trending: ProductView[];
  bestSellers: ProductView[];
  promoSlides: PromoSlide[];
  instaTiles: string[];
  newsletterEmail: string;
  setNewsletterEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitNewsletter: (e: React.FormEvent) => void;

  // shop
  isShop: boolean;
  shopTitle: string;
  filterOpen: boolean;
  openFilter: () => void;
  closeFilter: () => void;
  filterCategoryOptions: FilterCategoryOption[];
  shopSort: string;
  setShopSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  shopProducts: ProductView[];
  shopCount: number;

  // product
  isProduct: boolean;
  currentProduct: Product;
  pdpPriceLabel: string;
  pdpCompareLabel: string;
  starIcons: StarIcon[];
  selectedColorName: string;
  colorOptions: ColorOption[];
  sizeTypeLabel: string;
  sizeOptions: SizeOption[];
  toggleSizeGuide: (e: React.SyntheticEvent) => void;
  sizeGuideOpen: boolean;
  sizeGuideText: string;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  stockLabel: string;
  stockColor: string;
  addBtnBg: string;
  addBtnLabel: string;
  addToCartCurrent: () => void;
  currentHeartFill: string;
  toggleWishlistCurrent: () => void;
  galleryPosition: string;
  galleryThumbs: GalleryThumb[];
  accordions: Accordion[];
  reviewsList: ReviewView[];
  relatedProducts: ProductView[];
  goProduct: (id: string) => void;

  // wishlist
  isWishlist: boolean;
  hasWishlist: boolean;
  wishlistEmpty: boolean;
  wishlistProducts: ProductView[];

  // checkout
  isCheckout: boolean;
  checkoutDone: boolean;
  checkoutNotDone: boolean;
  confirmedOrderNumber: string | null;
  checkoutSteps: CheckoutStepView[];
  isStepShipping: boolean;
  isStepDelivery: boolean;
  isStepPayment: boolean;
  shipForm: ShipForm;
  setShipFirst: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShipLast: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShipAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShipCity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShipState: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShipZip: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShipPhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  goToDelivery: () => void;
  backToShipping: () => void;
  goToPayment: () => void;
  backToDelivery: () => void;
  deliveryOptions: DeliveryOptionView[];
  paymentStage: PaymentStage;
  isPaymentReview: boolean;
  isPaymentRedirecting: boolean;
  isPaymentVerifying: boolean;
  payNow: () => void;
  orderNotes: string;
  setOrderNotes: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  couponCode: string;
  setCoupon: (e: React.ChangeEvent<HTMLInputElement>) => void;
  couponApplied: boolean;
  applyCoupon: () => void;
  cartLines: CartLineView[];
  subtotalLabel: string;
  deliveryFeeLabel: string;
  discountLabel: string;
  orderTotalLabel: string;
  goCheckoutClick: () => void;
  hasCart: boolean;
  cartEmptyBool: boolean;

  // account
  isAccount: boolean;
  zeroCreditLabel: string;
  accountNavItems: AccountNavItemView[];
  isAcctOverview: boolean;
  isAcctOrders: boolean;
  isAcctOrderDetail: boolean;
  isAcctAddresses: boolean;
  isAcctNotifications: boolean;
  isAcctSettings: boolean;
  ordersCount: number;
  ordersMock: OrderMockView[];
  backToOrders: () => void;
  selectedOrder: Order & { totalLabel: string };
  selectedOrderItems: OrderLineView[];
  trackingSteps: TrackingStepView[];
  addressesList: Address[];
  notificationsList: (Notification & { bg: string })[];
  profileForm: ProfileForm;
  setProfileName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProfileEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProfilePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  settingsToggles: SettingsToggleView[];
  notifySaved: () => void;
  notifyDemo: () => void;

  // faq
  faqOpen: boolean;
  faqPanelWidth: string;
  faqPanelLeft: string;
  faqPanelBottom: string;
  faqBtnBottom: string;
  toggleFaq: () => void;
  closeFaq: () => void;
  faqThread: FaqMessage[];
  faqQuestions: FaqQuestionView[];

  // footer
  footerAccordion: FooterSection[];

  // search
  trendingSearches: string[];
  searchSuggestions: ProductView[];

  // toast
  toast: string | null;
}
