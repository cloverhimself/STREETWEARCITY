import type { StoreCtx } from "./storefront-types";

export default function FaqWidget({ ctx }: { ctx: StoreCtx }) {
  return (
    <>
      {ctx.faqOpen && (
        <div style={{ position: "fixed", bottom: ctx.faqPanelBottom, right: 20, left: ctx.faqPanelLeft, zIndex: 92, width: ctx.faqPanelWidth, maxWidth: "calc(100vw - 40px)", maxHeight: "70vh", background: "#fafaf9", borderRadius: 20, boxShadow: "0 20px 50px rgba(0,0,0,.25)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "#0f0f0f", color: "#fafaf9", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ font: "800 14px Arial Black,Arial,sans-serif" }}>Ask Streetwear City</span>
            <button onClick={ctx.closeFaq} style={{ background: "rgba(255,255,255,.12)", border: "none", borderRadius: 999, padding: 7, cursor: "pointer", display: "flex" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fafaf9" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {ctx.faqThread.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.align, maxWidth: "85%", background: msg.bg, color: msg.color, padding: "11px 15px", borderRadius: 14, font: "400 13px/1.5 Helvetica,Arial,sans-serif" }}>{msg.text}</div>
            ))}
          </div>
          <div style={{ padding: 14, borderTop: "1px solid #e6e3de", display: "flex", flexDirection: "column", gap: 8, maxHeight: 180, overflowY: "auto" }}>
            <span style={{ font: "600 10.5px Helvetica,Arial,sans-serif", letterSpacing: ".06em", color: "#9c9994" }}>TAP A QUESTION</span>
            {ctx.faqQuestions.map((q) => (
              <button key={q.question} onClick={q.onClick} style={{ textAlign: "left", background: "#f3f2ef", border: "none", font: "600 12.5px Helvetica,Arial,sans-serif", padding: "11px 14px", cursor: "pointer", borderRadius: 12 }}>{q.question}</button>
            ))}
          </div>
        </div>
      )}
      <button onClick={ctx.toggleFaq} aria-label="FAQ chat" style={{ position: "fixed", bottom: ctx.faqBtnBottom, right: 20, zIndex: 92, width: 56, height: 56, borderRadius: "50%", background: "#0f0f0f", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 26px rgba(0,0,0,.28)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fafaf9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.9 8.9 0 0 1-3.8-.8L3 20l1-5.5a8.4 8.4 0 0 1-.9-3.8A8.4 8.4 0 0 1 11.5 2 8.5 8.5 0 0 1 21 11.5z" /></svg>
      </button>
    </>
  );
}
