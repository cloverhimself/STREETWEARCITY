export type AdminView = "overview" | "products" | "orders" | "customers" | "analytics" | "users" | "logs";
export type AdminRole = "super" | "products" | "support" | "orders";

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
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
}

export interface InviteForm {
  name: string;
  email: string;
  role: AdminRole;
}

export interface AdminState {
  adminView: AdminView;
  products: AdminProduct[];
  drawerOpen: boolean;
  editingId: string | null;
  form: ProductForm;
  vw: number;
  mobileNavOpen: boolean;
  currentRole: AdminRole;
  adminUsers: AdminUser[];
  inviteOpen: boolean;
  editUserId: string | null;
  inviteForm: InviteForm;
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
  adminNavItems: AdminNavItemView[];
  adminNavItemsMobile: AdminNavItemView[];
  isOverview: boolean;
  isProducts: boolean;
  isOrders: boolean;
  isCustomers: boolean;
  isAnalytics: boolean;
  isUsers: boolean;
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
  submitForm: () => void;
  chartLinePath: string;
  chartAreaPath: string;
  chartPoints: ChartPoint[];
}
