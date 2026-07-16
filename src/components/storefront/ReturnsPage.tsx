"use client";

import StorefrontChrome from "./StorefrontChrome";
import { bodyText, pageIntro, pageTitle, pageWrap, sectionTitle } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

export default function ReturnsPage() {
  const ctx = useStorefront();

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={pageWrap}>
        <h1 style={pageTitle}>RETURNS</h1>
        <p style={pageIntro}>Not the right fit? Here&apos;s how returns work.</p>

        <h2 style={sectionTitle}>RETURN WINDOW</h2>
        <p style={bodyText}>Returns are accepted within 14 days of delivery. Items must be unworn, unwashed, and have all original tags attached.</p>

        <h2 style={sectionTitle}>HOW TO START A RETURN</h2>
        <p style={bodyText}>
          Go to Account, then Order History, select the order, and choose the item you&apos;d like to return. If you don&apos;t see a return option yet,
          reach out through our <a href="/contact" style={{ textDecoration: "underline" }}>Contact page</a> with your order number.
        </p>

        <h2 style={sectionTitle}>REFUNDS</h2>
        <p style={bodyText}>
          Once your return is received and inspected, we&apos;ll process your refund to the original payment method. Refunds typically appear within 5
          to 10 business days, depending on your bank or card issuer.
        </p>

        <h2 style={sectionTitle}>EXCHANGES</h2>
        <p style={bodyText}>We don&apos;t offer direct exchanges. Return the original item for a refund and place a new order for the size or colorway you want.</p>

        <h2 style={sectionTitle}>NON-RETURNABLE ITEMS</h2>
        <p style={bodyText}>Final sale items, and any item marked as such at checkout, cannot be returned or refunded.</p>
      </div>
    </StorefrontChrome>
  );
}
