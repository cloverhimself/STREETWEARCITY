"use client";

import Link from "next/link";
import type { AdminCtx } from "./admin-types";
import { useAdmin } from "./useAdmin";

const tableHeadCell: React.CSSProperties = { textAlign: "left", padding: "10px 8px", font: "600 11px Helvetica,Arial,sans-serif", color: "#6b6b6b" };
const inputStyle: React.CSSProperties = { padding: "12px 14px", border: "1px solid #cfccc6", font: "400 13px Helvetica,Arial,sans-serif", borderRadius: 10 };

function Sidebar({ ctx }: { ctx: AdminCtx }) {
  return (
    <div style={{ width: 230, flexShrink: 0, background: "#0f0f0f", color: "#fafaf9", display: "flex", flexDirection: "column", padding: "22px 0" }}>
      <div style={{ padding: "0 22px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #26241f", marginBottom: 14 }}>
        <img src="/uploads/streetwear-city-logo.png" style={{ height: 34, filter: "invert(1) brightness(2)" }} alt="Streetwear City" />
        <div style={{ font: "700 10px Helvetica,Arial,sans-serif", color: "#8f8c86", letterSpacing: ".14em" }}>ADMIN</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
        {ctx.adminNavItems.map((it) => (
          <button key={it.key} onClick={it.onClick} style={{ textAlign: "left", background: it.bg, color: it.color, border: "none", font: "600 13px Helvetica,Arial,sans-serif", padding: "12px 14px", cursor: "pointer", borderRadius: 10 }}>{it.label}</button>
        ))}
      </div>
      <div style={{ marginTop: "auto", padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={{ font: "600 9.5px Helvetica,Arial,sans-serif", color: "#8f8c86", letterSpacing: ".08em" }}>
          VIEWING AS (DEMO)
          <select value={ctx.currentRole} onChange={ctx.setCurrentRole} style={{ display: "block", width: "100%", marginTop: 6, background: "#1a1917", color: "#fafaf9", border: "1px solid #3a3833", font: "600 12px Helvetica,Arial,sans-serif", padding: "9px 10px", borderRadius: 8 }}>
            {ctx.roleOptions.map((r) => (
              <option key={r.key} value={r.key}>{r.label}</option>
            ))}
          </select>
        </label>
        <button onClick={ctx.logoutAdmin} style={{ background: "none", border: "1px solid #3a3833", color: "#c9c6c0", font: "600 12px Helvetica,Arial,sans-serif", padding: 11, cursor: "pointer", borderRadius: 10 }}>Log Out</button>
        <Link href="/" style={{ display: "block", textAlign: "center", background: "none", border: "1px solid #3a3833", color: "#c9c6c0", font: "600 12px Helvetica,Arial,sans-serif", padding: 11, cursor: "pointer", borderRadius: 10 }}>Exit to Storefront</Link>
      </div>
    </div>
  );
}

function MobileTopBar({ ctx }: { ctx: AdminCtx }) {
  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
        <button onClick={ctx.toggleMobileNav} style={{ background: "rgba(255,255,255,.08)", border: "none", borderRadius: 999, padding: 9, cursor: "pointer", display: "flex" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fafaf9" strokeWidth="1.9" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <img src="/uploads/streetwear-city-logo.png" style={{ height: 26, filter: "invert(1) brightness(2)" }} alt="Streetwear City" />
        <Link href="/" style={{ font: "600 11px Helvetica,Arial,sans-serif", color: "#c9c6c0", border: "1px solid #3a3833", borderRadius: 999, padding: "8px 12px" }}>Exit</Link>
      </div>
      {ctx.mobileNavOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(15,15,15,.5)" }} onClick={ctx.toggleMobileNav}>
          <div style={{ width: "78%", maxWidth: 300, height: "100%", background: "#0f0f0f", color: "#fafaf9", padding: "22px 12px", display: "flex", flexDirection: "column", gap: 2 }} onClick={ctx.stop}>
            <div style={{ padding: "0 10px 16px", font: "700 10px Helvetica,Arial,sans-serif", color: "#8f8c86", letterSpacing: ".14em" }}>ADMIN MENU</div>
            {ctx.adminNavItemsMobile.map((it) => (
              <button key={it.key} onClick={it.onClick} style={{ textAlign: "left", background: it.bg, color: it.color, border: "none", font: "600 13px Helvetica,Arial,sans-serif", padding: "12px 14px", cursor: "pointer", borderRadius: 10 }}>{it.label}</button>
            ))}
            <button onClick={ctx.logoutAdmin} style={{ textAlign: "left", background: "none", border: "none", color: "#c9c6c0", font: "600 13px Helvetica,Arial,sans-serif", padding: "12px 14px", cursor: "pointer", borderRadius: 10, marginTop: "auto" }}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

function AdminLoginView({ ctx }: { ctx: AdminCtx }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f0f", padding: 20 }}>
      <form onSubmit={ctx.submitAdminLogin} style={{ width: 380, maxWidth: "100%", background: "#fafaf9", borderRadius: 22, padding: 34, display: "flex", flexDirection: "column", gap: 14 }}>
        <img src="/uploads/streetwear-city-logo.png" style={{ height: 32, alignSelf: "center", marginBottom: 8 }} alt="Streetwear City" />
        <h1 style={{ font: "800 19px Arial Black,Arial,sans-serif", margin: "0 0 2px", textAlign: "center" }}>ADMIN LOGIN</h1>
        <p style={{ font: "400 12.5px Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: "0 0 8px", textAlign: "center" }}>Sign in to manage products, orders, and your store.</p>
        <input placeholder="Email" type="email" value={ctx.loginForm.email} onChange={ctx.setLoginEmail} style={inputStyle} />
        <input placeholder="Password" type="password" value={ctx.loginForm.password} onChange={ctx.setLoginPassword} style={inputStyle} />
        {ctx.loginError && <span style={{ font: "600 12px Helvetica,Arial,sans-serif", color: "oklch(0.5 0.16 40)" }}>{ctx.loginError}</span>}
        <button type="submit" style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: 15, cursor: "pointer", marginTop: 6, borderRadius: 999 }}>LOG IN</button>
        <Link href="/" style={{ textAlign: "center", font: "600 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>← Back to storefront</Link>
      </form>
    </div>
  );
}

function Overview({ ctx }: { ctx: AdminCtx }) {
  return (
    <div>
      <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: "0 0 24px" }}>Dashboard Overview</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 34 }}>
        {ctx.adminStats.map((st) => (
          <div key={st.label} style={{ border: "1px solid #e6e3de", padding: 20, borderRadius: 14 }}>
            <div style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{st.label}</div>
            <div style={{ font: "800 24px Arial Black,Arial,sans-serif", margin: "6px 0" }}>{st.value}</div>
            <div style={{ font: "600 11.5px Helvetica,Arial,sans-serif", color: st.deltaColor }}>{st.delta}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: ctx.gridOverviewTop, gap: 20, marginBottom: 34 }}>
        <div style={{ border: "1px solid #e6e3de", padding: 22, borderRadius: 14 }}>
          <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: "0 0 18px" }}>SALES TREND, LAST 7 DAYS</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 140 }}>
            {ctx.salesTrend.map((b) => (
              <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                <div style={{ width: "100%", background: "#0f0f0f", height: `${b.pct}%`, minHeight: 4, borderRadius: "6px 6px 0 0" }} />
                <span style={{ font: "400 10.5px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ border: "1px solid #e6e3de", padding: 22, borderRadius: 14 }}>
          <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: "0 0 16px" }}>CATEGORY MIX</h3>
          <div style={{ width: 130, height: 130, borderRadius: "50%", background: ctx.donutGradient, margin: "0 auto 16px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ctx.categoryBreakdown.map((c) => (
              <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", font: "400 12px Helvetica,Arial,sans-serif" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: c.color }} />{c.name}</span>
                <span>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: ctx.gridOverviewBottom, gap: 20 }}>
        <div style={{ border: "1px solid #e6e3de", padding: 22, borderRadius: 14 }}>
          <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: "0 0 14px" }}>RECENT ORDERS</h3>
          {ctx.adminOrders.map((o) => (
            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eeece8", font: "400 12.5px Helvetica,Arial,sans-serif" }}>
              <span>#{o.id}, {o.customer}</span>
              <span style={{ font: "700 12.5px Helvetica,Arial,sans-serif" }}>{o.totalLabel}</span>
            </div>
          ))}
        </div>
        <div style={{ border: "1px solid #e6e3de", padding: 22, borderRadius: 14 }}>
          <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: "0 0 14px" }}>INVENTORY LEVELS</h3>
          {ctx.inventoryLevels.map((p) => (
            <div key={p.name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", font: "400 12px Helvetica,Arial,sans-serif", marginBottom: 5 }}><span>{p.name}</span><span>{p.stock} units</span></div>
              <div style={{ height: 5, background: "#eeece8", borderRadius: 3 }}><div style={{ height: "100%", width: `${p.pct}%`, background: p.barColor, borderRadius: 3 }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsSection({ ctx }: { ctx: AdminCtx }) {
  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: 0 }}>Products</h1>
          <button onClick={ctx.openAddProduct} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12.5px Helvetica,Arial,sans-serif", padding: "12px 20px", cursor: "pointer", borderRadius: 10 }}>+ Add Product</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 640, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #0f0f0f" }}>
                <th style={tableHeadCell}>PRODUCT</th>
                <th style={tableHeadCell}>CATEGORY</th>
                <th style={tableHeadCell}>PRICE</th>
                <th style={tableHeadCell}>STOCK</th>
                <th style={tableHeadCell}>STATUS</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ctx.productsList.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eeece8" }}>
                  <td style={{ padding: "10px 8px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: "#eeece8", flexShrink: 0, borderRadius: 8, overflow: "hidden" }}><img src={p.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /></div>
                    <span style={{ font: "600 12.5px Helvetica,Arial,sans-serif" }}>{p.name}</span>
                  </td>
                  <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{p.category}</td>
                  <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{p.priceLabel}</td>
                  <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{p.stock}</td>
                  <td style={{ padding: "10px 8px" }}><span style={{ background: p.statusBg, color: p.statusColor, font: "600 10px Helvetica,Arial,sans-serif", padding: "4px 10px", borderRadius: 999 }}>{p.statusLabel}</span></td>
                  <td style={{ padding: "10px 8px", textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button onClick={p.onEdit} style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "6px 12px", cursor: "pointer", borderRadius: 8 }}>Edit</button>
                    <button onClick={p.onDelete} style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "6px 12px", cursor: "pointer", borderRadius: 8 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {ctx.drawerOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,15,15,.5)", zIndex: 70, display: "flex", justifyContent: "flex-end" }} onClick={ctx.closeDrawer}>
          <div style={{ width: 420, maxWidth: "90vw", height: "100%", background: "#fafaf9", padding: 26, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }} onClick={ctx.stop}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ font: "800 18px Arial Black,Arial,sans-serif", margin: 0 }}>{ctx.drawerTitle}</h3>
              <button onClick={ctx.closeDrawer} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>
            <input placeholder="Product name" value={ctx.form.name} onChange={ctx.setFormName} style={inputStyle} />
            <select value={ctx.form.category} onChange={ctx.setFormCategory} style={inputStyle}>
              <option>Headwear</option>
              <option>Tops</option>
              <option>Bottoms</option>
            </select>
            <input placeholder="Price (NGN)" value={ctx.form.price} onChange={ctx.setFormPrice} style={inputStyle} />
            <input placeholder="Stock quantity" value={ctx.form.stock} onChange={ctx.setFormStock} style={inputStyle} />

            <label style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>
              Size type
              <select value={ctx.form.sizeType} onChange={ctx.setFormSizeType} style={{ ...inputStyle, display: "block", width: "100%", marginTop: 6, boxSizing: "border-box" }}>
                <option value="clothing">Clothing (XS to XXL)</option>
                <option value="adjustable">Adjustable (one size)</option>
                <option value="fitted">Fitted (hat sizes)</option>
                <option value="waist">Waist (inches)</option>
              </select>
              <span style={{ font: "400 11px Helvetica,Arial,sans-serif", color: "#9c9994", display: "block", marginTop: 4 }}>Sizes shown to customers: {ctx.formSizePreview.join(", ")}</span>
            </label>

            <div>
              <span style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>Colors</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {ctx.form.colors.map((c) => (
                  <span key={c.name} style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #cfccc6", borderRadius: 999, padding: "5px 10px 5px 6px", font: "600 11px Helvetica,Arial,sans-serif" }}>
                    <span style={{ width: 14, height: 14, borderRadius: "50%", background: c.hex, border: "1px solid #cfccc6" }} />
                    {c.name}
                    <button onClick={() => ctx.removeFormColor(c.name)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "600 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>✕</button>
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <input placeholder="Color name" value={ctx.colorDraft.name} onChange={ctx.setColorDraftName} style={{ ...inputStyle, flex: 1 }} />
                <input type="color" value={ctx.colorDraft.hex} onChange={ctx.setColorDraftHex} style={{ width: 44, padding: 2, border: "1px solid #cfccc6", borderRadius: 10, cursor: "pointer" }} />
                <button onClick={ctx.addColorDraft} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "600 11px Helvetica,Arial,sans-serif", padding: "0 16px", cursor: "pointer", borderRadius: 10 }}>Add</button>
              </div>
            </div>

            <div>
              <span style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>Product images</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {ctx.form.images.map((url) => (
                  <div key={url} style={{ position: "relative", width: 56, height: 56, borderRadius: 10, overflow: "hidden", border: "1px solid #e6e3de" }}>
                    <img src={url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                    <button onClick={() => ctx.removeFormImage(url)} style={{ position: "absolute", top: 2, right: 2, background: "rgba(15,15,15,.7)", color: "#fafaf9", border: "none", borderRadius: "50%", width: 18, height: 18, cursor: "pointer", font: "600 10px Helvetica,Arial,sans-serif", lineHeight: "18px", padding: 0 }}>✕</button>
                  </div>
                ))}
                <label style={{ width: 56, height: 56, border: "1px dashed #cfccc6", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", font: "600 18px Helvetica,Arial,sans-serif", color: "#9c9994" }}>
                  +
                  <input type="file" accept="image/*" multiple onChange={ctx.addFormImages} style={{ display: "none" }} />
                </label>
              </div>
            </div>

            <textarea placeholder="Description" value={ctx.form.description} onChange={ctx.setFormDescription} style={{ ...inputStyle, minHeight: 80 }} />
            <button onClick={ctx.submitForm} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", padding: 14, cursor: "pointer", marginTop: 8, borderRadius: 10 }}>{ctx.drawerAction}</button>
          </div>
        </div>
      )}
    </>
  );
}

function OrdersSection({ ctx }: { ctx: AdminCtx }) {
  return (
    <div>
      <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>Orders</h1>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 640, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #0f0f0f" }}>
              <th style={tableHeadCell}>ORDER</th>
              <th style={tableHeadCell}>CUSTOMER</th>
              <th style={tableHeadCell}>DATE</th>
              <th style={tableHeadCell}>TOTAL</th>
              <th style={tableHeadCell}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {ctx.adminOrders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid #eeece8" }}>
                <td style={{ padding: "10px 8px", font: "600 12.5px Helvetica,Arial,sans-serif" }}>#{o.id}</td>
                <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{o.customer}</td>
                <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{o.date}</td>
                <td style={{ padding: "10px 8px", font: "700 12.5px Helvetica,Arial,sans-serif" }}>{o.totalLabel}</td>
                <td style={{ padding: "10px 8px" }}><span style={{ background: o.statusBg, color: o.statusColor, font: "600 10px Helvetica,Arial,sans-serif", padding: "4px 10px", borderRadius: 999 }}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomersSection({ ctx }: { ctx: AdminCtx }) {
  return (
    <div>
      <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>Customers</h1>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 640, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #0f0f0f" }}>
              <th style={tableHeadCell}>NAME</th>
              <th style={tableHeadCell}>EMAIL</th>
              <th style={tableHeadCell}>ORDERS</th>
              <th style={tableHeadCell}>SPENT</th>
              <th style={tableHeadCell}>JOINED</th>
            </tr>
          </thead>
          <tbody>
            {ctx.adminCustomers.map((c) => (
              <tr key={c.email} style={{ borderBottom: "1px solid #eeece8" }}>
                <td style={{ padding: "10px 8px", font: "600 12.5px Helvetica,Arial,sans-serif" }}>{c.name}</td>
                <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{c.email}</td>
                <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{c.orders}</td>
                <td style={{ padding: "10px 8px", font: "700 12.5px Helvetica,Arial,sans-serif" }}>{c.spentLabel}</td>
                <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsSection({ ctx }: { ctx: AdminCtx }) {
  return (
    <div>
      <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: "0 0 24px" }}>Analytics</h1>
      <div style={{ border: "1px solid #e6e3de", padding: 24, marginBottom: 24, borderRadius: 14 }}>
        <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: "0 0 18px" }}>REVENUE, LAST 7 DAYS</h3>
        <svg viewBox="0 0 700 220" style={{ width: "100%", height: 220 }} preserveAspectRatio="none">
          <path d={ctx.chartAreaPath} fill="#0f0f0f" opacity="0.08" />
          <path d={ctx.chartLinePath} fill="none" stroke="#0f0f0f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {ctx.chartPoints.map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#0f0f0f" />
          ))}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {ctx.salesTrend.map((b) => (
            <span key={b.label} style={{ font: "400 11px Helvetica,Arial,sans-serif", color: "#6b6b6b", flex: 1, textAlign: "center" }}>{b.label}</span>
          ))}
        </div>
      </div>
      <div style={{ border: "1px solid #e6e3de", padding: 22, borderRadius: 14 }}>
        <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: "0 0 14px" }}>TOP PRODUCTS</h3>
        {ctx.topProducts.map((p) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #eeece8" }}>
            <div style={{ width: 32, height: 32, background: "#eeece8", flexShrink: 0, borderRadius: 8, overflow: "hidden" }}><img src={p.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /></div>
            <span style={{ flex: 1, font: "400 12.5px Helvetica,Arial,sans-serif" }}>{p.name}</span>
            <span style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{p.reviewCount} reviews</span>
            <span style={{ font: "700 12.5px Helvetica,Arial,sans-serif" }}>{p.priceLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersSection({ ctx }: { ctx: AdminCtx }) {
  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: 0 }}>Users & Roles</h1>
          <button onClick={ctx.openInvite} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12.5px Helvetica,Arial,sans-serif", padding: "12px 20px", cursor: "pointer", borderRadius: 10 }}>+ Invite Admin</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 520, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #0f0f0f" }}>
                <th style={tableHeadCell}>NAME</th>
                <th style={tableHeadCell}>EMAIL</th>
                <th style={tableHeadCell}>ROLE</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ctx.adminUsersList.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid #eeece8" }}>
                  <td style={{ padding: "10px 8px", font: "600 12.5px Helvetica,Arial,sans-serif" }}>{u.name}</td>
                  <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{u.email}</td>
                  <td style={{ padding: "10px 8px" }}><span style={{ background: "#eceae5", color: "#0f0f0f", font: "600 10px Helvetica,Arial,sans-serif", padding: "4px 10px", borderRadius: 999 }}>{u.roleLabel}</span></td>
                  <td style={{ padding: "10px 8px", textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button onClick={u.onEdit} style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "6px 12px", cursor: "pointer", borderRadius: 8 }}>Edit</button>
                    <button onClick={u.onRemove} style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "6px 12px", cursor: "pointer", borderRadius: 8 }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {ctx.inviteOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,15,15,.5)", zIndex: 70, display: "flex", justifyContent: "flex-end" }} onClick={ctx.closeInvite}>
          <div style={{ width: 400, maxWidth: "90vw", height: "100%", background: "#fafaf9", padding: 26, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }} onClick={ctx.stop}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ font: "800 18px Arial Black,Arial,sans-serif", margin: 0 }}>{ctx.inviteTitle}</h3>
              <button onClick={ctx.closeInvite} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>
            <input placeholder="Full name" value={ctx.inviteForm.name} onChange={ctx.setInviteName} style={inputStyle} />
            <input placeholder="Email" value={ctx.inviteForm.email} onChange={ctx.setInviteEmail} style={inputStyle} />
            <label style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>
              Role
              <select value={ctx.inviteForm.role} onChange={ctx.setInviteRole} style={{ display: "block", width: "100%", marginTop: 6, ...inputStyle }}>
                <option value="products">Product Manager</option>
                <option value="support">Support</option>
                <option value="orders">Order Tracking</option>
                <option value="super">Super Admin</option>
              </select>
            </label>
            <p style={{ font: "400 12px/1.6 Helvetica,Arial,sans-serif", color: "#9c9994", margin: 0 }}>Product Manager sees Products only. Support sees Orders and Customers. Order Tracking sees Orders only. Super Admin sees everything, including Users and Activity Log.</p>
            <button onClick={ctx.submitInvite} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", padding: 14, cursor: "pointer", marginTop: 8, borderRadius: 10 }}>{ctx.inviteAction}</button>
          </div>
        </div>
      )}
    </>
  );
}

function LogsSection({ ctx }: { ctx: AdminCtx }) {
  return (
    <div>
      <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>Activity Log</h1>
      <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #e6e3de" }}>
        {ctx.activityLogs.map((log) => (
          <div key={log.id} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #e6e3de" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#eceae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, font: "700 12px Arial Black,Arial,sans-serif" }}>{log.actorInitial}</div>
            <div style={{ flex: 1 }}>
              <div style={{ font: "600 13px Helvetica,Arial,sans-serif" }}>{log.actor}</div>
              <div style={{ font: "400 12.5px Helvetica,Arial,sans-serif", color: "#4a4a4a", marginTop: 2 }}>{log.action}</div>
              <div style={{ font: "400 11px Helvetica,Arial,sans-serif", color: "#9c9994", marginTop: 3 }}>{log.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventorySection({ ctx }: { ctx: AdminCtx }) {
  return (
    <div>
      <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>Inventory</h1>
      <div style={{ overflowX: "auto", marginBottom: 34 }}>
        <table style={{ width: "100%", minWidth: 640, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #0f0f0f" }}>
              <th style={tableHeadCell}>PRODUCT</th>
              <th style={tableHeadCell}>CATEGORY</th>
              <th style={tableHeadCell}>STOCK</th>
              <th style={tableHeadCell}>STATUS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {ctx.inventoryRows.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #eeece8" }}>
                <td style={{ padding: "10px 8px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: "#eeece8", flexShrink: 0, borderRadius: 8, overflow: "hidden" }}><img src={p.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /></div>
                  <span style={{ font: "600 12.5px Helvetica,Arial,sans-serif" }}>{p.name}</span>
                </td>
                <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{p.category}</td>
                <td style={{ padding: "10px 8px", font: "400 12.5px Helvetica,Arial,sans-serif" }}>{p.stock} units</td>
                <td style={{ padding: "10px 8px" }}><span style={{ background: p.statusBg, color: p.statusColor, font: "600 10px Helvetica,Arial,sans-serif", padding: "4px 10px", borderRadius: 999 }}>{p.statusLabel}</span></td>
                <td style={{ padding: "10px 8px", textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button onClick={() => p.restock(5)} style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "6px 12px", cursor: "pointer", borderRadius: 8 }}>+5</button>
                  <button onClick={() => p.restock(20)} style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "6px 12px", cursor: "pointer", borderRadius: 8 }}>+20</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: "0 0 14px" }}>RECENT STOCK CHANGES</h3>
      {ctx.stockChangeLog.length === 0 && <p style={{ font: "400 12.5px Helvetica,Arial,sans-serif", color: "#9c9994" }}>No restocks yet.</p>}
      {ctx.stockChangeLog.map((l) => (
        <div key={l.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eeece8", font: "400 12.5px Helvetica,Arial,sans-serif" }}>
          <span>{l.productName}</span>
          <span style={{ font: "700 12.5px Helvetica,Arial,sans-serif", color: "#1a7a3c" }}>+{l.delta}</span>
          <span style={{ color: "#9c9994" }}>{l.time}</span>
        </div>
      ))}
    </div>
  );
}

function SettingsSection({ ctx }: { ctx: AdminCtx }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 34, maxWidth: 520 }}>
      <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: 0 }}>Settings</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: 0 }}>STORE PROFILE</h3>
        <label style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>Store name
          <input value={ctx.settings.storeName} onChange={ctx.setSettingsStoreName} style={{ ...inputStyle, display: "block", width: "100%", marginTop: 6, boxSizing: "border-box" }} />
        </label>
        <label style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>Support email
          <input value={ctx.settings.supportEmail} onChange={ctx.setSettingsSupportEmail} style={{ ...inputStyle, display: "block", width: "100%", marginTop: 6, boxSizing: "border-box" }} />
        </label>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: 0 }}>PAYMENT PROVIDER</h3>
        <div style={{ border: "1px solid #0f0f0f", borderRadius: 14, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>Bachs</span>
          <span style={{ background: "#eceae5", font: "600 10px Helvetica,Arial,sans-serif", padding: "4px 10px", borderRadius: 999 }}>ACTIVE</span>
        </div>
        {["Paystack", "Flutterwave"].map((p) => (
          <div key={p} style={{ border: "1px solid #e6e3de", borderRadius: 14, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", opacity: 0.5 }}>
            <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>{p}</span>
            <span style={{ font: "600 10px Helvetica,Arial,sans-serif", color: "#9c9994" }}>NOT CONNECTED</span>
          </div>
        ))}
        <p style={{ font: "400 11.5px Helvetica,Arial,sans-serif", color: "#9c9994", margin: 0 }}>The payment provider is swappable at the API layer without changing checkout, this list is for visibility only.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: 0 }}>NOTIFICATIONS</h3>
        {ctx.settingsToggles.map((t) => (
          <label key={t.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #e6e3de", cursor: "pointer" }}>
            <span style={{ font: "400 13px Helvetica,Arial,sans-serif" }}>{t.label}</span>
            <span onClick={t.onClick} style={{ width: 38, height: 22, borderRadius: 11, background: t.bg, position: "relative", transition: "background .2s" }}>
              <span style={{ position: "absolute", top: 2, left: t.knobLeft, width: 18, height: 18, borderRadius: "50%", background: "#fafaf9", transition: "left .2s" }} />
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function AdminApp() {
  const ctx = useAdmin();

  if (!ctx.authenticated) return <AdminLoginView ctx={ctx} />;

  return (
    <div style={{ fontFamily: "Helvetica,Arial,sans-serif", background: "#fafaf9", color: "#0f0f0f", minHeight: "100vh", display: "flex", maxWidth: "100vw", overflowX: "hidden" }}>
      {ctx.isDesktop && <Sidebar ctx={ctx} />}
      {ctx.isMobile && <MobileTopBar ctx={ctx} />}
      <div style={{ flex: 1, padding: ctx.mainPadding, minWidth: 0, maxWidth: "100%" }}>
        {ctx.isOverview && <Overview ctx={ctx} />}
        {ctx.isProducts && <ProductsSection ctx={ctx} />}
        {ctx.isInventory && <InventorySection ctx={ctx} />}
        {ctx.isOrders && <OrdersSection ctx={ctx} />}
        {ctx.isCustomers && <CustomersSection ctx={ctx} />}
        {ctx.isAnalytics && <AnalyticsSection ctx={ctx} />}
        {ctx.isUsers && <UsersSection ctx={ctx} />}
        {ctx.isSettings && <SettingsSection ctx={ctx} />}
        {ctx.isLogs && <LogsSection ctx={ctx} />}
      </div>
    </div>
  );
}
