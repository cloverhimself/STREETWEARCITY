import Link from "next/link";
import type { StoreCtx } from "./storefront-types";

export default function Footer({ ctx }: { ctx: StoreCtx }) {
  return (
    <div style={{ background: "#0f0f0f", color: "#c9c6c0" }}>
      {ctx.isDesktop && (
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 24px 30px", display: "grid", gridTemplateColumns: "1.4fr repeat(3,1fr)", gap: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <img src="/uploads/streetwear-city-logo.png" style={{ height: 34, width: "fit-content", filter: "invert(1) brightness(2)" }} alt="Streetwear City" />
            <p style={{ font: "400 12.5px/1.7 Helvetica,Arial,sans-serif", color: "#8f8c86", maxWidth: 280, margin: 0 }}>Verified authentic streetwear, curated drops, and consignment pulls from the culture, for the culture.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ color: "#fafaf9", font: "700 12px Helvetica,Arial,sans-serif", letterSpacing: ".05em" }}>SUPPORT</span>
            <a href="#" style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#c9c6c0" }}>Shipping</a>
            <a href="#" style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#c9c6c0" }}>Returns</a>
            <a href="#" style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#c9c6c0" }}>FAQ</a>
            <a href="#" style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#c9c6c0" }}>Contact Us</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ color: "#fafaf9", font: "700 12px Helvetica,Arial,sans-serif", letterSpacing: ".05em" }}>COMPANY</span>
            <a href="#" style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#c9c6c0" }}>About</a>
            <a href="#" style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#c9c6c0" }}>Privacy Policy</a>
            <a href="#" style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#c9c6c0" }}>Terms of Service</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ color: "#fafaf9", font: "700 12px Helvetica,Arial,sans-serif", letterSpacing: ".05em" }}>CONNECT</span>
            <a href="#" style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#c9c6c0", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9c6c0" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" /></svg>
              @streetwearciity
            </a>
            <Link href="/admin" style={{ marginTop: 10, alignSelf: "flex-start", background: "none", border: "1px solid #4a4844", color: "#8f8c86", font: "600 11px Helvetica,Arial,sans-serif", padding: "9px 16px", cursor: "pointer", borderRadius: 999 }}>View Admin Demo →</Link>
          </div>
        </div>
      )}
      {ctx.isMobile && (
        <div style={{ padding: "36px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
          <img src="/uploads/streetwear-city-logo.png" style={{ height: 32, width: "fit-content", filter: "invert(1) brightness(2)" }} alt="Streetwear City" />
          <p style={{ font: "400 12px/1.6 Helvetica,Arial,sans-serif", color: "#8f8c86", maxWidth: 280, margin: 0 }}>Verified authentic streetwear, for the culture.</p>
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {ctx.footerAccordion.map((fa) => (
              <div key={fa.key} style={{ borderTop: "1px solid #26241f" }}>
                <button onClick={fa.onClick} style={{ width: "100%", background: "none", border: "none", color: "#fafaf9", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".04em", padding: "14px 4px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                  {fa.title}<span>{fa.icon}</span>
                </button>
                {fa.open && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 4px 14px", textAlign: "left" }}>
                    {fa.links.map((lk) => (
                      <a key={lk} href="#" style={{ font: "400 12.5px Helvetica,Arial,sans-serif", color: "#c9c6c0", display: "flex", alignItems: "center", gap: 8 }}>
                        {fa.isConnect && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9c6c0" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" /></svg>}
                        {lk}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <Link href="/admin" style={{ background: "none", border: "1px solid #4a4844", color: "#8f8c86", font: "600 11px Helvetica,Arial,sans-serif", padding: "9px 16px", cursor: "pointer", borderRadius: 999 }}>View Admin Demo →</Link>
        </div>
      )}
      <div style={{ borderTop: "1px solid #26241f", padding: "18px 24px", textAlign: "center", font: "400 11.5px Helvetica,Arial,sans-serif", color: "#6f6c67" }}>© 2026 Streetwear City. All rights reserved.</div>
    </div>
  );
}
