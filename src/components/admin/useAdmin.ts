"use client";

import { useEffect, useRef, useState } from "react";
import {
  ACTIVITY_LOGS,
  ADMIN_CUSTOMERS,
  ADMIN_ORDERS,
  ADMIN_PRODUCTS,
  ADMIN_USERS,
  CATEGORY_BREAKDOWN,
  ROLE_LABELS,
  SALES_TREND,
  adminNaira,
} from "./admin-data";
import type { AdminCtx, AdminRole, AdminState, AdminView } from "./admin-types";

const initialState: AdminState = {
  adminView: "overview",
  products: ADMIN_PRODUCTS.map((p) => ({ ...p })),
  drawerOpen: false,
  editingId: null,
  form: { name: "", category: "Headwear", price: "", stock: "", description: "" },
  vw: 1200,
  mobileNavOpen: false,
  currentRole: "super",
  adminUsers: ADMIN_USERS.map((u) => ({ ...u })),
  inviteOpen: false,
  editUserId: null,
  inviteForm: { name: "", email: "", role: "support" },
};

export function useAdmin(): AdminCtx {
  const [state, setStateRaw] = useState<AdminState>(initialState);
  const idCounter = useRef(0);

  function patch(update: Partial<AdminState> | ((s: AdminState) => Partial<AdminState>)) {
    setStateRaw((prev) => ({ ...prev, ...(typeof update === "function" ? update(prev) : update) }));
  }

  function nextId(prefix: string) {
    idCounter.current += 1;
    return prefix + idCounter.current;
  }

  useEffect(() => {
    const onResize = () => patch({ vw: window.innerWidth });
    window.addEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync actual viewport width once mounted in the browser
    patch({ vw: window.innerWidth });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const s = state;
  const isMobile = s.vw < 860;
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  const adminOrdersFull = ADMIN_ORDERS.map((o, i) => ({
    ...o,
    customer: ["Jordan M.", "Ava T.", "Devon R."][i % 3],
    totalLabel: adminNaira(o.total),
    statusBg: o.status === "Delivered" ? "#eceae5" : o.status === "In Transit" ? "#e9e6df" : "#f0efec",
    statusColor: "#0f0f0f",
  }));
  const inventoryLevels = [...s.products]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 4)
    .map((p) => ({ name: p.name, stock: p.stock, pct: Math.min(100, (p.stock / 30) * 100), barColor: p.stock < 6 ? "oklch(0.5 0.16 40)" : "#0f0f0f" }));
  const topProducts = [...s.products]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 5)
    .map((p) => ({ ...p, priceLabel: adminNaira(p.price) }));
  const maxTrend = Math.max(...SALES_TREND.map((t) => t.value));
  const salesTrend = SALES_TREND.map((t) => ({ ...t, pct: Math.round((t.value / maxTrend) * 100) }));
  const categoryRunningTotals = CATEGORY_BREAKDOWN.reduce<{ stops: string[]; total: number }>(
    (state, c) => {
      const end = state.total + c.pct;
      return { stops: [...state.stops, `${c.color} ${state.total}% ${end}%`], total: end };
    },
    { stops: [], total: 0 }
  );
  const donutGradient = `conic-gradient(${categoryRunningTotals.stops.join(", ")})`;

  const n = SALES_TREND.length;
  const chartPoints = SALES_TREND.map((t, i) => ({ x: Math.round((i / (n - 1)) * 680) + 10, y: Math.round(200 - (t.value / maxTrend) * 170 - 10) }));
  const chartLinePath = chartPoints.map((p, i) => (i === 0 ? "M" : "L") + p.x + "," + p.y).join(" ");
  const chartAreaPath = chartLinePath + ` L ${chartPoints[n - 1].x},210 L ${chartPoints[0].x},210 Z`;

  const openAddProduct = () => patch({ drawerOpen: true, editingId: null, form: { name: "", category: "Headwear", price: "", stock: "", description: "" } });
  const openEditProduct = (p: AdminState["products"][number]) =>
    patch({ drawerOpen: true, editingId: p.id, form: { name: p.name, category: p.category, price: String(p.price), stock: String(p.stock), description: p.description || "" } });
  const closeDrawer = () => patch({ drawerOpen: false });

  const navAll: { key: AdminView; label: string; roles: AdminRole[] }[] = [
    { key: "overview", label: "Dashboard", roles: ["super", "products", "support", "orders"] },
    { key: "products", label: "Products", roles: ["super", "products"] },
    { key: "orders", label: "Orders", roles: ["super", "support", "orders"] },
    { key: "customers", label: "Customers", roles: ["super", "support"] },
    { key: "analytics", label: "Analytics", roles: ["super"] },
    { key: "users", label: "Users & Roles", roles: ["super"] },
    { key: "logs", label: "Activity Log", roles: ["super"] },
  ];
  const navBase = navAll.filter((it) => it.roles.includes(s.currentRole));

  const ctx: AdminCtx = {
    isMobile,
    isDesktop: !isMobile,
    mainPadding: isMobile ? "70px 16px 30px" : "30px 36px",
    mobileNavOpen: s.mobileNavOpen,
    toggleMobileNav: () => patch({ mobileNavOpen: !s.mobileNavOpen }),
    stop,
    gridOverviewTop: isMobile ? "1fr" : "1.4fr 1fr",
    gridOverviewBottom: isMobile ? "1fr" : "1fr 1fr",
    adminNavItems: navBase.map((it) => ({ ...it, onClick: () => patch({ adminView: it.key }), bg: s.adminView === it.key ? "#fafaf9" : "transparent", color: s.adminView === it.key ? "#0f0f0f" : "#c9c6c0" })),
    adminNavItemsMobile: navBase.map((it) => ({ ...it, onClick: () => patch({ adminView: it.key, mobileNavOpen: false }), bg: s.adminView === it.key ? "rgba(255,255,255,.1)" : "transparent", color: s.adminView === it.key ? "#fafaf9" : "#c9c6c0" })),
    isOverview: s.adminView === "overview",
    isProducts: s.adminView === "products",
    isOrders: s.adminView === "orders",
    isCustomers: s.adminView === "customers",
    isAnalytics: s.adminView === "analytics",
    isUsers: s.adminView === "users",
    isLogs: s.adminView === "logs",
    currentRole: s.currentRole,
    currentRoleLabel: ROLE_LABELS[s.currentRole],
    roleOptions: (Object.keys(ROLE_LABELS) as AdminRole[]).map((k) => ({ key: k, label: ROLE_LABELS[k] })),
    setCurrentRole: (e) => patch({ currentRole: e.target.value as AdminRole, adminView: "overview" }),
    activityLogs: ACTIVITY_LOGS.map((l) => ({ ...l, actorInitial: l.actor.charAt(0) })),
    adminUsersList: s.adminUsers.map((u) => ({
      ...u,
      roleLabel: ROLE_LABELS[u.role],
      onEdit: () => patch({ inviteOpen: true, editUserId: u.id, inviteForm: { name: u.name, email: u.email, role: u.role } }),
      onRemove: () => patch({ adminUsers: s.adminUsers.filter((x) => x.id !== u.id) }),
    })),
    inviteOpen: s.inviteOpen,
    inviteTitle: s.editUserId ? "Edit Admin" : "Invite Admin",
    inviteAction: s.editUserId ? "Save Changes" : "Send Invite",
    openInvite: () => patch({ inviteOpen: true, editUserId: null, inviteForm: { name: "", email: "", role: "support" } }),
    closeInvite: () => patch({ inviteOpen: false }),
    inviteForm: s.inviteForm,
    setInviteName: (e) => patch({ inviteForm: { ...s.inviteForm, name: e.target.value } }),
    setInviteEmail: (e) => patch({ inviteForm: { ...s.inviteForm, email: e.target.value } }),
    setInviteRole: (e) => patch({ inviteForm: { ...s.inviteForm, role: e.target.value as AdminRole } }),
    submitInvite: () => {
      if (!s.inviteForm.name.trim()) return;
      if (s.editUserId) {
        patch({ adminUsers: s.adminUsers.map((u) => (u.id === s.editUserId ? { ...u, ...s.inviteForm } : u)), inviteOpen: false });
      } else {
        const id = nextId("u");
        patch({ adminUsers: [...s.adminUsers, { id, ...s.inviteForm }], inviteOpen: false });
      }
    },
    adminStats: [
      { label: "Revenue (30d)", value: adminNaira(18420), delta: "+12.4% vs last period", deltaColor: "#1a7a3c" },
      { label: "Orders", value: "214", delta: "+6.1%", deltaColor: "#1a7a3c" },
      { label: "Customers", value: "96", delta: "+3.8%", deltaColor: "#1a7a3c" },
      { label: "Products", value: String(s.products.length), delta: "2 low stock", deltaColor: "oklch(0.5 0.16 40)" },
    ],
    salesTrend,
    categoryBreakdown: CATEGORY_BREAKDOWN,
    donutGradient,
    adminOrders: adminOrdersFull,
    inventoryLevels,
    topProducts,
    adminCustomers: ADMIN_CUSTOMERS.map((c) => ({ ...c, spentLabel: adminNaira(c.spent) })),
    productsList: s.products.map((p) => ({
      ...p,
      priceLabel: adminNaira(p.price),
      statusLabel: p.stock === 0 ? "Sold Out" : p.stock < 6 ? "Low Stock" : "Active",
      statusBg: p.stock === 0 ? "#f0dede" : p.stock < 6 ? "#f3ecd8" : "#eceae5",
      statusColor: "#0f0f0f",
      onEdit: () => openEditProduct(p),
      onDelete: () => patch({ products: s.products.filter((x) => x.id !== p.id) }),
    })),
    drawerOpen: s.drawerOpen,
    drawerTitle: s.editingId ? "Edit Product" : "Add Product",
    drawerAction: s.editingId ? "Save Changes" : "Publish Product",
    openAddProduct,
    closeDrawer,
    form: s.form,
    setFormName: (e) => patch({ form: { ...s.form, name: e.target.value } }),
    setFormCategory: (e) => patch({ form: { ...s.form, category: e.target.value } }),
    setFormPrice: (e) => patch({ form: { ...s.form, price: e.target.value } }),
    setFormStock: (e) => patch({ form: { ...s.form, stock: e.target.value } }),
    setFormDescription: (e) => patch({ form: { ...s.form, description: e.target.value } }),
    submitForm: () => {
      if (!s.form.name.trim()) return;
      if (s.editingId) {
        patch({
          products: s.products.map((p) =>
            p.id === s.editingId ? { ...p, name: s.form.name, category: s.form.category, price: Number(s.form.price) || 0, stock: Number(s.form.stock) || 0, description: s.form.description } : p
          ),
          drawerOpen: false,
        });
      } else {
        const entry = { id: nextId("new"), name: s.form.name, category: s.form.category, price: Number(s.form.price) || 0, image: "/uploads/Beanie.jpg", rating: 5, reviewCount: 0, stock: Number(s.form.stock) || 0, description: s.form.description };
        patch({ products: [entry, ...s.products], drawerOpen: false });
      }
    },
    chartLinePath,
    chartAreaPath,
    chartPoints,
  };

  return ctx;
}
