"use client";

import { useState } from "react";
import StorefrontChrome from "./StorefrontChrome";
import { pageIntro, pageTitle, pageWrap } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

export default function FaqPage() {
  const ctx = useStorefront();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={pageWrap}>
        <h1 style={pageTitle}>FREQUENTLY ASKED QUESTIONS</h1>
        <p style={pageIntro}>Can&apos;t find what you&apos;re looking for? Message us through the chat bubble or our <a href="/contact" style={{ textDecoration: "underline" }}>Contact page</a>.</p>

        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #e6e3de" }}>
          {ctx.faqQuestions.map((q, i) => {
            const open = openIdx === i;
            return (
              <div key={q.question} style={{ borderBottom: "1px solid #e6e3de" }}>
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, font: "700 13.5px Helvetica,Arial,sans-serif" }}
                >
                  {q.question}
                  <span style={{ font: "400 18px Helvetica,Arial,sans-serif", color: "#6b6b6b", flexShrink: 0 }}>{open ? "−" : "+"}</span>
                </button>
                {open && <p style={{ font: "400 13px/1.7 Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: "0 0 20px" }}>{q.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </StorefrontChrome>
  );
}
