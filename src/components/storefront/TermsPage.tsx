"use client";

import StorefrontChrome from "./StorefrontChrome";
import { bodyText, pageIntro, pageTitle, pageWrap, sectionTitle } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

export default function TermsPage() {
  const ctx = useStorefront();

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={pageWrap}>
        <h1 style={pageTitle}>TERMS OF SERVICE</h1>
        <p style={pageIntro}>Last updated July 2026. By using Streetwear City, you agree to the terms below.</p>

        <h2 style={sectionTitle}>1. ACCEPTANCE OF TERMS</h2>
        <p style={bodyText}>
          By accessing or using this site, creating an account, or placing an order, you agree to be bound by these terms. If you don&apos;t agree, please
          don&apos;t use the site.
        </p>

        <h2 style={sectionTitle}>2. ACCOUNTS</h2>
        <p style={bodyText}>
          You&apos;re responsible for keeping your account credentials secure and for all activity under your account. Let us know immediately if you
          suspect unauthorized access.
        </p>

        <h2 style={sectionTitle}>3. ORDERS &amp; PRICING</h2>
        <p style={bodyText}>
          All prices are shown in Naira and are subject to change without notice. We reserve the right to refuse or cancel any order, including in
          cases of pricing errors or suspected fraud. Order totals, including any discounts, are calculated and confirmed on our servers before
          payment is taken.
        </p>

        <h2 style={sectionTitle}>4. PAYMENT</h2>
        <p style={bodyText}>
          Payments are processed by our third-party payment provider. Your order is confirmed only once payment has been verified as successful.
        </p>

        <h2 style={sectionTitle}>5. SHIPPING &amp; DELIVERY</h2>
        <p style={bodyText}>
          Estimated delivery windows are shown at checkout and are not guaranteed. See our <a href="/shipping" style={{ textDecoration: "underline" }}>Shipping page</a> for
          current methods and timelines.
        </p>

        <h2 style={sectionTitle}>6. RETURNS &amp; REFUNDS</h2>
        <p style={bodyText}>
          Returns are accepted under the conditions described on our <a href="/returns" style={{ textDecoration: "underline" }}>Returns page</a>. Refunds
          are issued to the original payment method once a returned item is received and inspected.
        </p>

        <h2 style={sectionTitle}>7. INTELLECTUAL PROPERTY</h2>
        <p style={bodyText}>
          All site content, including product photography, graphics, and branding, belongs to Streetwear City or its licensors and may not be
          reproduced without permission.
        </p>

        <h2 style={sectionTitle}>8. LIMITATION OF LIABILITY</h2>
        <p style={bodyText}>
          Streetwear City is not liable for indirect or consequential damages arising from your use of the site, to the fullest extent permitted by
          law.
        </p>

        <h2 style={sectionTitle}>9. GOVERNING LAW</h2>
        <p style={bodyText}>These terms are governed by the laws of the Federal Republic of Nigeria.</p>

        <h2 style={sectionTitle}>10. CHANGES TO THESE TERMS</h2>
        <p style={bodyText}>We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms.</p>

        <h2 style={sectionTitle}>11. CONTACT US</h2>
        <p style={bodyText}>
          Questions about these terms? Reach us at support@streetwearcity.com or through our <a href="/contact" style={{ textDecoration: "underline" }}>Contact page</a>.
        </p>
      </div>
    </StorefrontChrome>
  );
}
