"use client";

import StorefrontChrome from "./StorefrontChrome";
import { bodyText, pageIntro, pageTitle, pageWrap, sectionTitle } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

export default function PrivacyPage() {
  const ctx = useStorefront();

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={pageWrap}>
        <h1 style={pageTitle}>PRIVACY POLICY</h1>
        <p style={pageIntro}>Last updated July 2026. This policy explains what information Streetwear City collects, how we use it, and the choices you have.</p>

        <h2 style={sectionTitle}>1. INFORMATION WE COLLECT</h2>
        <p style={bodyText}>
          When you create an account, place an order, or contact support, we collect information such as your name, email address, phone number,
          shipping and billing address, and order history. We also collect limited technical data, like device and browser type, to keep the site
          secure and working properly.
        </p>

        <h2 style={sectionTitle}>2. HOW WE USE YOUR INFORMATION</h2>
        <p style={bodyText}>
          We use your information to process orders, communicate order and account updates, provide customer support, and, where you&apos;ve opted in,
          send you product updates and promotions. We do not sell your personal information to third parties.
        </p>

        <h2 style={sectionTitle}>3. PAYMENT INFORMATION</h2>
        <p style={bodyText}>
          Payments are processed by our payment provider. Streetwear City does not collect or store your full card number, expiry date, or CVC on our
          servers, those details are handled entirely by the payment provider&apos;s secure systems.
        </p>

        <h2 style={sectionTitle}>4. COOKIES</h2>
        <p style={bodyText}>
          We use cookies and similar technologies to keep you signed in, remember your cart, and understand how the site is used so we can improve it.
          You can control cookies through your browser settings.
        </p>

        <h2 style={sectionTitle}>5. DATA SHARING</h2>
        <p style={bodyText}>
          We share information only with service providers who help us run the business, payment processing, shipping, and email delivery, and only to
          the extent needed for them to perform those services.
        </p>

        <h2 style={sectionTitle}>6. DATA SECURITY</h2>
        <p style={bodyText}>
          We use industry-standard safeguards, including encryption in transit, to protect your information. No system is completely secure, so we
          continuously review our practices to reduce risk.
        </p>

        <h2 style={sectionTitle}>7. YOUR RIGHTS</h2>
        <p style={bodyText}>
          You can access, correct, or request deletion of your personal information at any time from your account settings, or by contacting us
          directly. You can also opt out of marketing communications at any time.
        </p>

        <h2 style={sectionTitle}>8. CHILDREN&apos;S PRIVACY</h2>
        <p style={bodyText}>Streetwear City is not directed at children under 13, and we do not knowingly collect information from them.</p>

        <h2 style={sectionTitle}>9. CHANGES TO THIS POLICY</h2>
        <p style={bodyText}>We may update this policy from time to time. Material changes will be posted on this page with an updated date.</p>

        <h2 style={sectionTitle}>10. CONTACT US</h2>
        <p style={bodyText}>
          Questions about this policy? Reach us at support@streetwearcity.com or through our <a href="/contact" style={{ textDecoration: "underline" }}>Contact page</a>.
        </p>
      </div>
    </StorefrontChrome>
  );
}
