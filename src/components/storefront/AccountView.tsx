import type { StoreCtx } from "./storefront-types";

const fieldInputStyle: React.CSSProperties = { display: "block", width: "100%", marginTop: 6, padding: "12px 16px", border: "1px solid #cfccc6", font: "400 13px Helvetica,Arial,sans-serif", boxSizing: "border-box", borderRadius: 12 };

export default function AccountView({ ctx }: { ctx: StoreCtx }) {
  return (
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: "36px 24px 90px", display: "grid", gridTemplateColumns: ctx.gridAccount, gap: ctx.gridGapAccount }}>
      <div style={{ display: "flex", flexDirection: ctx.acctNavDirection as React.CSSProperties["flexDirection"], gap: ctx.acctNavGap, overflowX: ctx.acctNavOverflow as React.CSSProperties["overflowX"] }}>
        {ctx.accountNavItems.map((it) => (
          <button key={it.key} onClick={it.onClick} style={{ textAlign: "left", background: it.bg, color: it.color, border: "none", font: "600 13px Helvetica,Arial,sans-serif", padding: "12px 16px", cursor: "pointer", borderRadius: 12, whiteSpace: "nowrap", flexShrink: 0 }}>{it.label}</button>
        ))}
      </div>
      <div>
        {ctx.isAcctOverview && (
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: 0 }}>WELCOME BACK, JORDAN</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
              <div style={{ background: "#f3f2ef", padding: 20, borderRadius: 16 }}>
                <div style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>Orders</div>
                <div style={{ font: "800 26px Arial Black,Arial,sans-serif" }}>{ctx.ordersCount}</div>
              </div>
              <div style={{ background: "#f3f2ef", padding: 20, borderRadius: 16 }}>
                <div style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>Wishlist</div>
                <div style={{ font: "800 26px Arial Black,Arial,sans-serif" }}>{ctx.wishlistCount}</div>
              </div>
              <div style={{ background: "#f3f2ef", padding: 20, borderRadius: 16 }}>
                <div style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>Store credit</div>
                <div style={{ font: "800 26px Arial Black,Arial,sans-serif" }}>{ctx.zeroCreditLabel}</div>
              </div>
            </div>
            <div>
              <h3 style={{ font: "800 15px Arial Black,Arial,sans-serif", margin: "0 0 14px" }}>RECENT ORDERS</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid #e6e3de" }}>
                {ctx.ordersMock.map((o) => (
                  <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #e6e3de" }}>
                    <div>
                      <div style={{ font: "600 13px Helvetica,Arial,sans-serif" }}>#{o.id}</div>
                      <div style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{o.date}</div>
                    </div>
                    <span style={{ background: o.statusBg, color: o.statusColor, font: "600 10.5px Helvetica,Arial,sans-serif", letterSpacing: ".03em", padding: "5px 12px", borderRadius: 999 }}>{o.status}</span>
                    <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>{o.totalLabel}</span>
                    <button onClick={o.onView} style={{ background: "none", border: "1px solid #0f0f0f", font: "600 11.5px Helvetica,Arial,sans-serif", padding: "8px 16px", cursor: "pointer", borderRadius: 999 }}>Track</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {ctx.isAcctOrders && (
          <div>
            <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>ORDER HISTORY</h1>
            <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #e6e3de" }}>
              {ctx.ordersMock.map((o) => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", padding: "16px 0", borderBottom: "1px solid #e6e3de" }}>
                  <div>
                    <div style={{ font: "600 13.5px Helvetica,Arial,sans-serif" }}>#{o.id}</div>
                    <div style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{o.date} · {o.itemCount} items</div>
                  </div>
                  <span style={{ background: o.statusBg, color: o.statusColor, font: "600 10.5px Helvetica,Arial,sans-serif", padding: "5px 12px", borderRadius: 999 }}>{o.status}</span>
                  <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>{o.totalLabel}</span>
                  <button onClick={o.onView} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "600 11.5px Helvetica,Arial,sans-serif", padding: "9px 18px", cursor: "pointer", borderRadius: 999 }}>View Details</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {ctx.isAcctOrderDetail && (
          <div>
            <button onClick={ctx.backToOrders} style={{ background: "none", border: "none", font: "600 12.5px Helvetica,Arial,sans-serif", cursor: "pointer", marginBottom: 16 }}>← Back to orders</button>
            <h1 style={{ font: "800 24px Arial Black,Arial,sans-serif", margin: "0 0 4px" }}>ORDER #{ctx.selectedOrder.id}</h1>
            <p style={{ font: "400 12.5px Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: "0 0 26px" }}>Placed {ctx.selectedOrder.date}. Shipping to {ctx.selectedOrder.address}</p>
            <div style={{ display: "grid", gridTemplateColumns: ctx.gridOrderDetail, gap: ctx.gridGapOrderDetail }}>
              <div>
                <h3 style={{ font: "800 14px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>TRACKING</h3>
                <div style={{ display: "flex", alignItems: "flex-start", overflowX: "auto", paddingBottom: 6 }}>
                  {ctx.trackingSteps.map((ts) => (
                    <div key={ts.label} style={{ display: "flex", alignItems: "center", flex: ts.flexGrow }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 70 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: ts.dotBg, border: `2px solid ${ts.dotBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {ts.done && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fafaf9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ font: "600 11.5px Helvetica,Arial,sans-serif", color: ts.textColor }}>{ts.label}</div>
                          {ts.current && <div style={{ font: "400 10.5px Helvetica,Arial,sans-serif", color: "#6b6b6b", marginTop: 2 }}>In progress</div>}
                        </div>
                      </div>
                      {ts.notLast && <div style={{ height: 2, flex: 1, background: ts.lineBg, margin: "0 4px", minWidth: 24, alignSelf: "flex-start", marginTop: 14 }} />}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#f3f2ef", padding: 20, display: "flex", flexDirection: "column", gap: 12, height: "fit-content", borderRadius: 16 }}>
                <h3 style={{ font: "800 13px Arial Black,Arial,sans-serif", margin: 0 }}>ITEMS</h3>
                {ctx.selectedOrderItems.map((line, i) => (
                  <div key={i} style={{ display: "flex", gap: 10 }}>
                    <div style={{ width: 44, height: 44, background: "#e6e3de", flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
                      <img src={line.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>{line.name}</div>
                      <div style={{ font: "400 11px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{line.variantLabel} · Qty {line.qty}</div>
                    </div>
                  </div>
                ))}
                <div style={{ height: 1, background: "#dedbd5" }} />
                <div style={{ display: "flex", justifyContent: "space-between", font: "800 14px Helvetica,Arial,sans-serif" }}><span>Total</span><span>{ctx.selectedOrder.totalLabel}</span></div>
              </div>
            </div>
          </div>
        )}

        {ctx.isAcctAddresses && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: 0 }}>ADDRESSES</h1>
              <button onClick={ctx.notifyDemo} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12px Helvetica,Arial,sans-serif", padding: "11px 20px", cursor: "pointer", borderRadius: 999 }}>+ ADD NEW</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
              {ctx.addressesList.map((a) => (
                <div key={a.id} style={{ border: "1px solid #e6e3de", padding: 18, display: "flex", flexDirection: "column", gap: 6, borderRadius: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>{a.label}</span>
                    {a.default && <span style={{ font: "600 10px Helvetica,Arial,sans-serif", background: "#eceae5", padding: "3px 9px", borderRadius: 999 }}>DEFAULT</span>}
                  </div>
                  <span style={{ font: "400 13px/1.5 Helvetica,Arial,sans-serif", color: "#4a4a4a" }}>{a.name}<br />{a.line1} {a.line2}<br />{a.city}, {a.state} {a.zip}</span>
                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <button onClick={ctx.notifyDemo} style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "7px 14px", cursor: "pointer", borderRadius: 999 }}>Edit</button>
                    <button onClick={ctx.notifyDemo} style={{ background: "none", border: "1px solid #cfccc6", font: "600 11px Helvetica,Arial,sans-serif", padding: "7px 14px", cursor: "pointer", borderRadius: 999 }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ctx.isAcctNotifications && (
          <div>
            <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: "0 0 20px" }}>NOTIFICATIONS</h1>
            <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #e6e3de" }}>
              {ctx.notificationsList.map((n) => (
                <div key={n.id} style={{ display: "flex", gap: 14, alignItems: "center", padding: "16px 0", borderBottom: "1px solid #e6e3de", background: n.bg, borderRadius: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#eceae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.7"><path d="M18 8a6 6 0 0 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" /><path d="M9.7 19a2.5 2.5 0 0 0 4.6 0" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: "600 13px Helvetica,Arial,sans-serif" }}>{n.title}</div>
                    <div style={{ font: "400 11.5px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ctx.isAcctSettings && (
          <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 520 }}>
            <h1 style={{ font: "800 26px Arial Black,Arial,sans-serif", margin: 0 }}>SETTINGS</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>Full name
                <input value={ctx.profileForm.name} onChange={ctx.setProfileName} style={fieldInputStyle} />
              </label>
              <label style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>Email
                <input value={ctx.profileForm.email} onChange={ctx.setProfileEmail} style={fieldInputStyle} />
              </label>
              <label style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>Phone
                <input value={ctx.profileForm.phone} onChange={ctx.setProfilePhone} style={fieldInputStyle} />
              </label>
              <label style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>Currency
                <select disabled style={{ ...fieldInputStyle, background: "#f3f2ef" }}><option>Naira (₦)</option></select>
                <span style={{ font: "400 11px Helvetica,Arial,sans-serif", color: "#9c9994", display: "block", marginTop: 4 }}>More currencies coming soon</span>
              </label>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>Notification preferences</span>
              {ctx.settingsToggles.map((t) => (
                <label key={t.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #e6e3de", cursor: "pointer" }}>
                  <span style={{ font: "400 13px Helvetica,Arial,sans-serif" }}>{t.label}</span>
                  <span onClick={t.onClick} style={{ width: 38, height: 22, borderRadius: 11, background: t.bg, position: "relative", transition: "background .2s" }}>
                    <span style={{ position: "absolute", top: 2, left: t.knobLeft, width: 18, height: 18, borderRadius: "50%", background: "#fafaf9", transition: "left .2s" }} />
                  </span>
                </label>
              ))}
            </div>
            <button onClick={ctx.notifySaved} style={{ alignSelf: "flex-start", background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12.5px Helvetica,Arial,sans-serif", padding: "14px 26px", cursor: "pointer", borderRadius: 999 }}>SAVE CHANGES</button>
          </div>
        )}
      </div>
    </div>
  );
}
