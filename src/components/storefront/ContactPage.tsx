"use client";

import { useState } from "react";
import StorefrontChrome from "./StorefrontChrome";
import { pageIntro, pageTitle, pageWrap, sectionTitle } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

const fieldStyle: React.CSSProperties = { padding: "13px 16px", border: "1px solid #cfccc6", font: "400 13px Helvetica,Arial,sans-serif", borderRadius: 12, boxSizing: "border-box", width: "100%" };

export default function ContactPage() {
  const ctx = useStorefront();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    ctx.notifyDemo();
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={pageWrap}>
        <h1 style={pageTitle}>CONTACT US</h1>
        <p style={pageIntro}>Questions about an order, a product, or a consignment? Reach out and we&apos;ll get back to you within 1 to 2 business days.</p>

        <div style={{ display: "grid", gridTemplateColumns: ctx.isMobile ? "1fr" : "1fr 1.3fr", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <h2 style={sectionTitle}>REACH US DIRECTLY</h2>
            <span style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#3a3a3a" }}>support@streetwearcity.com</span>
            <span style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#3a3a3a" }}>@streetwearciity</span>
            <span style={{ font: "400 13px Helvetica,Arial,sans-serif", color: "#3a3a3a", marginTop: 8 }}>Support hours: Mon to Fri, 9am to 6pm WAT</span>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={fieldStyle} required />
            <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={fieldStyle} required />
            <textarea placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...fieldStyle, minHeight: 130, resize: "vertical" }} required />
            <button type="submit" style={{ alignSelf: "flex-start", background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 28px", cursor: "pointer", borderRadius: 999 }}>SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </StorefrontChrome>
  );
}
