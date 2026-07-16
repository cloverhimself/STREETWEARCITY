import type { ProductColor, SizeType } from "@/lib/types";

export type AdminView = "overview" | "products" | "inventory" | "orders" | "customers" | "analytics" | "users" | "settings" | "logs";
export type AdminRole = "super" | "products" | "support" | "orders";

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  colors: ProductColor[];
  sizeType: SizeType;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
}

export interface AdminOrder {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing";
  total: number;
}

export interface AdminCustomer {
  name: string;
  email: string;
  orders: number;
  spent: number;
  joined: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface ActivityLog {
  id: number;
  actor: string;
  action: string;
  time: string;
}

export interface ProductForm {
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  sizeType: SizeType;
  colors: ProductColor[];
  images: string[];
}

export interface InviteForm {
  name: string;
  email: string;
  role: AdminRole;
}

export interface AdminLoginForm {
  email: string;
  password: string;
}

export interface StockChangeLogEntry {
  id: number;
  productName: string;
  delta: number;
  time: string;
}

export interface AdminSettings {
  storeName: string;
  supportEmail: string;
  notifyLowStock: boolean;
  notifyNewOrders: boolean;
}

export interface AdminState {
  adminView: AdminView;
  products: AdminProduct[];
  drawerOpen: boolean;
  editingId: string | null;
  form: ProductForm;
  colorDraft: { name: string; hex: string };
  vw: number;
  mobileNavOpen: boolean;
  currentRole: AdminRole;
  adminUsers: AdminUser[];
  inviteOpen: boolean;
  editUserId: string | null;
  inviteForm: InviteForm;
  authenticated: boolean;
  loginForm: AdminLoginForm;
  loginError: string | null;
  stockChangeLog: StockChangeLogEntry[];
  settings: AdminSettings;
}

export interface AdminNavItemView {
  key: AdminView;
  label: string;
  onClick: () => void;
  bg: string;
  color: string;
}

export interface AdminStatView {
  label: string;
  value: string;
  delta: string;
  deltaColor: string;
}

export interface SalesTrendBar {
  label: string;
  value: number;
  pct: number;
}

export interface CategoryBreakdownView {
  name: string;
  pct: number;
  color: string;
}

export interface AdminOrderView extends AdminOrder {
  customer: string;
  totalLabel: string;
  statusBg: string;
  statusColor: string;
}

export interface InventoryLevelView {
  name: string;
  stock: number;
  pct: number;
  barColor: string;
}

export interface TopProductView extends AdminProduct {
  priceLabel: string;
}

export interface AdminProductRowView extends AdminProduct {
  priceLabel: string;
  statusLabel: string;
  statusBg: string;
  statusColor: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface InventoryRowView extends AdminProduct {
  statusLabel: string;
  statusBg: string;
  statusColor: string;
  restock: (qty: number) => void;
}

export interface AdminSettingsToggleView {
  key: "notifyLowStock" | "notifyNewOrders";
  label: string;
  bg: string;
  knobLeft: string;
  onClick: () => void;
}

export interface AdminCustomerView extends AdminCustomer {
  spentLabel: string;
}

export interface AdminUserRowView extends AdminUser {
  roleLabel: string;
  onEdit: () => void;
  onRemove: () => void;
}

export interface ActivityLogView extends ActivityLog {
  actorInitial: string;
}

export interface ChartPoint {
  x: number;
  y: number;
}

export interface AdminCtx {
  isMobile: boolean;
  isDesktop: boolean;
  mainPadding: string;
  mobileNavOpen: boolean;
  toggleMobileNav: () => void;
  stop: (e: React.SyntheticEvent) => void;
  gridOverviewTop: string;
  gridOverviewBottom: string;
  authenticated: boolean;
  loginForm: AdminLoginForm;
  loginError: string | null;
  setLoginEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLoginPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitAdminLogin: (e: React.FormEvent) => void;
  logoutAdmin: () => void;
  adminNavItems: AdminNavItemView[];
  adminNavItemsMobile: AdminNavItemView[];
  isOverview: boolean;
  isProducts: boolean;
  isInventory: boolean;
  isOrders: boolean;
  isCustomers: boolean;
  isAnalytics: boolean;
  isUsers: boolean;
  isSettings: boolean;
  isLogs: boolean;
  currentRole: AdminRole;
  currentRoleLabel: string;
  roleOptions: { key: AdminRole; label: string }[];
  setCurrentRole: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  activityLogs: ActivityLogView[];
  adminUsersList: AdminUserRowView[];
  inviteOpen: boolean;
  inviteTitle: string;
  inviteAction: string;
  openInvite: () => void;
  closeInvite: () => void;
  inviteForm: InviteForm;
  setInviteName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInviteEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInviteRole: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  submitInvite: () => void;
  adminStats: AdminStatView[];
  salesTrend: SalesTrendBar[];
  categoryBreakdown: CategoryBreakdownView[];
  donutGradient: string;
  adminOrders: AdminOrderView[];
  inventoryLevels: InventoryLevelView[];
  topProducts: TopProductView[];
  adminCustomers: AdminCustomerView[];
  productsList: AdminProductRowView[];
  drawerOpen: boolean;
  drawerTitle: string;
  drawerAction: string;
  openAddProduct: () => void;
  closeDrawer: () => void;
  form: ProductForm;
  setFormName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setFormPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormStock: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setFormSizeType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  formSizePreview: string[];
  colorDraft: { name: string; hex: string };
  setColorDraftName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setColorDraftHex: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addColorDraft: () => void;
  removeFormColor: (name: string) => void;
  addFormImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFormImage: (url: string) => void;
  submitForm: () => void;
  chartLinePath: string;
  chartAreaPath: string;
  chartPoints: ChartPoint[];

  inventoryRows: InventoryRowView[];
  stockChangeLog: StockChangeLogEntry[];

  settings: AdminSettings;
  setSettingsStoreName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSettingsSupportEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  settingsToggles: AdminSettingsToggleView[];
}
