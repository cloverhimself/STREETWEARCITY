import type { StoreCtx } from "./storefront-types";

const inputStyle: React.CSSProperties = { padding: "13px 16px", border: "1px solid #cfccc6", font: "400 13px Helvetica,Arial,sans-serif", borderRadius: 12 };

export default function CheckoutView({ ctx }: { ctx: StoreCtx }) {
  if (ctx.checkoutDone) {
    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 100px" }}>
        <div style={{ maxWidth: 520, margin: "60px auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fafaf9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h1 style={{ font: "800 28px Arial Black,Arial,sans-serif", margin: 0 }}>ORDER CONFIRMED</h1>
          <p style={{ font: "400 14px Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: 0 }}>Order #{ctx.confirmedOrderNumber}. A confirmation was sent to your email.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <button onClick={ctx.goAccountOrdersClick} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 24px", cursor: "pointer", borderRadius: 999 }}>TRACK ORDER</button>
            <button onClick={ctx.shopAllClick} style={{ background: "none", color: "#0f0f0f", border: "1px solid #0f0f0f", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 24px", cursor: "pointer", borderRadius: 999 }}>CONTINUE SHOPPING</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 100px" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 44, flexWrap: "wrap" }}>
          {ctx.checkoutSteps.map((st) => (
            <div key={st.num} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", font: "600 12px Helvetica,Arial,sans-serif", background: st.bg, color: st.color, border: "1px solid #0f0f0f" }}>{st.num}</span>
                <span style={{ font: "600 12.5px Helvetica,Arial,sans-serif", color: st.textColor }}>{st.label}</span>
              </div>
              {st.notLast && <div style={{ width: 40, height: 1, background: "#cfccc6", margin: "0 14px" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: ctx.gridCheckout, gap: ctx.gridGapCheckout, alignItems: "start" }}>
          <div>
            {ctx.isStepShipping && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h2 style={{ font: "800 20px Arial Black,Arial,sans-serif", margin: "0 0 6px" }}>SHIPPING ADDRESS</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input placeholder="First name" value={ctx.shipForm.first} onChange={ctx.setShipFirst} style={inputStyle} />
                  <input placeholder="Last name" value={ctx.shipForm.last} onChange={ctx.setShipLast} style={inputStyle} />
                </div>
                <input placeholder="Address" value={ctx.shipForm.address} onChange={ctx.setShipAddress} style={inputStyle} />
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 14 }}>
                  <input placeholder="City" value={ctx.shipForm.city} onChange={ctx.setShipCity} style={inputStyle} />
                  <input placeholder="State" value={ctx.shipForm.state} onChange={ctx.setShipState} style={inputStyle} />
                  <input placeholder="ZIP" value={ctx.shipForm.zip} onChange={ctx.setShipZip} style={inputStyle} />
                </div>
                <input placeholder="Phone" value={ctx.shipForm.phone} onChange={ctx.setShipPhone} style={inputStyle} />
                <button onClick={ctx.goToDelivery} style={{ alignSelf: "flex-start", marginTop: 8, background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 26px", cursor: "pointer", borderRadius: 999 }}>CONTINUE TO DELIVERY</button>
              </div>
            )}
            {ctx.isStepDelivery && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <h2 style={{ font: "800 20px Arial Black,Arial,sans-serif", margin: "0 0 6px" }}>DELIVERY METHOD</h2>
                {ctx.deliveryOptions.map((d) => (
                  <label key={d.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${d.border}`, padding: 16, cursor: "pointer", borderRadius: 14 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <input type="radio" name="delivery" checked={d.checked} onChange={d.onClick} />
                      <span style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ font: "600 13px Helvetica,Arial,sans-serif" }}>{d.name}</span>
                        <span style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{d.eta}</span>
                      </span>
                    </span>
                    <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>{d.priceLabel}</span>
                  </label>
                ))}
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button onClick={ctx.backToShipping} style={{ background: "none", color: "#0f0f0f", border: "1px solid #0f0f0f", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 22px", cursor: "pointer", borderRadius: 999 }}>BACK</button>
                  <button onClick={ctx.goToPayment} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 26px", cursor: "pointer", borderRadius: 999 }}>CONTINUE TO PAYMENT</button>
                </div>
              </div>
            )}
            {ctx.isStepPayment && ctx.isPaymentReview && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <h2 style={{ font: "800 20px Arial Black,Arial,sans-serif", margin: "0 0 6px" }}>PAYMENT</h2>
                <div style={{ border: "1px solid #e6e3de", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ font: "700 13px Helvetica,Arial,sans-serif" }}>Pay securely with Bachs</span>
                  <p style={{ font: "400 12.5px/1.6 Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: 0 }}>
                    You&apos;ll be redirected to a secure payment page to complete your purchase by card, bank transfer, or mobile money. We never see or store your card details.
                  </p>
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <span style={{ border: "1px solid #cfccc6", borderRadius: 8, padding: "6px 12px", font: "600 11px Helvetica,Arial,sans-serif" }}>Card</span>
                    <span style={{ border: "1px solid #cfccc6", borderRadius: 8, padding: "6px 12px", font: "600 11px Helvetica,Arial,sans-serif" }}>Bank Transfer</span>
                    <span style={{ border: "1px solid #cfccc6", borderRadius: 8, padding: "6px 12px", font: "600 11px Helvetica,Arial,sans-serif" }}>Mobile Money</span>
                  </div>
                </div>
                <textarea placeholder="Order notes (optional)" value={ctx.orderNotes} onChange={ctx.setOrderNotes} style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} />
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button onClick={ctx.backToDelivery} style={{ background: "none", color: "#0f0f0f", border: "1px solid #0f0f0f", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 22px", cursor: "pointer", borderRadius: 999 }}>BACK</button>
                  <button onClick={ctx.payNow} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 26px", cursor: "pointer", borderRadius: 999 }}>PAY SECURELY · {ctx.orderTotalLabel}</button>
                </div>
              </div>
            )}
            {ctx.isStepPayment && (ctx.isPaymentRedirecting || ctx.isPaymentVerifying) && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "60px 20px", textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #e6e3de", borderTopColor: "#0f0f0f", animation: "swc-spin 0.8s linear infinite" }} />
                <h2 style={{ font: "800 17px Arial Black,Arial,sans-serif", margin: 0 }}>
                  {ctx.isPaymentRedirecting ? "REDIRECTING TO SECURE PAYMENT" : "VERIFYING YOUR PAYMENT"}
                </h2>
                <p style={{ font: "400 13px/1.6 Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: 0, maxWidth: 340 }}>
                  {ctx.isPaymentRedirecting
                    ? "Taking you to Bachs to complete your purchase. Do not close this window."
                    : "Payment received. Confirming with the payment provider before we place your order."}
                </p>
              </div>
            )}
          </div>
          <div style={{ background: "#f3f2ef", padding: 24, display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 100, borderRadius: 18 }}>
            <h3 style={{ font: "800 15px Arial Black,Arial,sans-serif", margin: 0 }}>ORDER SUMMARY</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 260, overflowY: "auto" }}>
              {ctx.cartLines.map((line) => (
                <div key={line.key} style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 50, height: 50, background: "#e6e3de", flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
                    <img src={line.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ font: "600 12px Helvetica,Arial,sans-serif" }}>{line.name}</span>
                    <span style={{ font: "400 11.5px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{line.variantLabel} · Qty {line.qty}</span>
                  </div>
                  <span style={{ font: "700 12.5px Helvetica,Arial,sans-serif" }}>{line.lineTotalLabel}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Coupon code" value={ctx.couponCode} onChange={ctx.setCoupon} style={{ flex: 1, padding: "11px 14px", border: "1px solid #cfccc6", font: "400 12.5px Helvetica,Arial,sans-serif", borderRadius: 999 }} />
              <button onClick={ctx.applyCoupon} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "600 11.5px Helvetica,Arial,sans-serif", padding: "0 18px", cursor: "pointer", borderRadius: 999 }}>APPLY</button>
            </div>
            <div style={{ height: 1, background: "#dedbd5" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, font: "400 13px Helvetica,Arial,sans-serif" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#6b6b6b" }}>Subtotal</span><span>{ctx.subtotalLabel}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#6b6b6b" }}>Delivery</span><span>{ctx.deliveryFeeLabel}</span></div>
              {ctx.couponApplied && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#0f0f0f" }}><span>Discount (WELCOME10)</span><span>−{ctx.discountLabel}</span></div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", font: "800 15px Helvetica,Arial,sans-serif", paddingTop: 8, borderTop: "1px solid #dedbd5" }}><span>Total</span><span>{ctx.orderTotalLabel}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
