"use client";

import StorefrontChrome from "./StorefrontChrome";
import { bodyText, pageIntro, pageTitle, pageWrap, sectionTitle } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

export default function ShippingPage() {
  const ctx = useStorefront();

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={pageWrap}>
        <h1 style={pageTitle}>SHIPPING</h1>
        <p style={pageIntro}>Everything you need to know about how and when your order arrives.</p>

        <h2 style={sectionTitle}>DELIVERY OPTIONS</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid #e6e3de" }}>
          {[
            { name: "Standard Shipping", eta: "3 to 5 business days", price: `Free over ${ctx.freeShipLabel}` },
            { name: "Express Shipping", eta: "1 to 2 business days", price: "Calculated at checkout" },
            { name: "Store Pickup, SoHo", eta: "Ready in 2 hours", price: "Free" },
          ].map((d) => (
            <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #e6e3de", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ font: "600 13px Helvetica,Arial,sans-serif" }}>{d.name}</div>
                <div style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#6b6b6b" }}>{d.eta}</div>
              </div>
              <span style={{ font: "700 12.5px Helvetica,Arial,sans-serif" }}>{d.price}</span>
            </div>
          ))}
        </div>

        <h2 style={sectionTitle}>ORDER PROCESSING</h2>
        <p style={bodyText}>Orders are processed within 1 business day of payment confirmation. You&apos;ll receive an email as soon as your order ships, with tracking details.</p>

        <h2 style={sectionTitle}>WHERE WE SHIP</h2>
        <p style={bodyText}>We currently ship within Nigeria only. International shipping is on our roadmap, check back for updates.</p>

        <h2 style={sectionTitle}>TRACKING YOUR ORDER</h2>
        <p style={bodyText}>
          Once your order ships, track it anytime from Account, then Order History, then Track on the order. See our{" "}
          <a href="/faq" style={{ textDecoration: "underline" }}>FAQ</a> for more.
        </p>
      </div>
    </StorefrontChrome>
  );
}
