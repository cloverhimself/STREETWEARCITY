"use client";

import StorefrontChrome from "./StorefrontChrome";
import { bodyText, pageIntro, pageTitle, pageWrap, sectionTitle } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

export default function AboutPage() {
  const ctx = useStorefront();

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={pageWrap}>
        <h1 style={pageTitle}>ABOUT STREETWEAR CITY</h1>
        <p style={pageIntro}>Verified authentic streetwear, curated drops, and consignment pulls from the culture, for the culture.</p>

        <h2 style={sectionTitle}>OUR STORY</h2>
        <p style={bodyText}>
          Streetwear City started as a search for the pieces that don&apos;t show up in every mall store, the archive jerseys, the limited fitted runs,
          the denim that actually holds up. What began as a small consignment operation has grown into a curated storefront built around one rule:
          if it isn&apos;t verified authentic, it doesn&apos;t make the cut.
        </p>

        <h2 style={sectionTitle}>WHAT WE STAND FOR</h2>
        <p style={bodyText}>
          Every product listed goes through an authenticity check before it&apos;s available to buy. We work directly with trusted suppliers and
          consignors, and we&apos;re upfront about condition, sizing, and sourcing on every listing, no surprises after checkout.
        </p>

        <h2 style={sectionTitle}>THE CULTURE</h2>
        <p style={bodyText}>
          Streetwear has always been about more than clothing, it&apos;s identity, community, and craft. We curate drops with that in mind, pulling from
          archive runs and current releases alike, so the pieces we carry actually mean something to the people wearing them.
        </p>

        <h2 style={sectionTitle}>GET IN TOUCH</h2>
        <p style={bodyText}>
          Have a question about an order, a product, or a potential consignment? Visit our <a href="/contact" style={{ textDecoration: "underline" }}>Contact page</a> and we&apos;ll get back to you.
        </p>
      </div>
    </StorefrontChrome>
  );
}
