import { useRef, useState } from "react";
import type { StoreCtx } from "./storefront-types";

const authInputStyle: React.CSSProperties = { padding: "14px 16px", border: "1px solid #cfccc6", font: "400 13px Helvetica,Arial,sans-serif", borderRadius: 12 };

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.5 12.3c0-.85-.08-1.66-.22-2.44H12v4.62h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.56-5.17 3.56-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.08.72-2.45 1.15-4.08 1.15-3.13 0-5.79-2.12-6.74-4.96H1.27v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.26 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l3.99-3.1z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.61l3.99 3.1C6.21 6.87 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function PwToggle({ shown, onClick }: { shown: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} type="button" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
        {shown && <line x1="3" y1="3" x2="21" y2="21" />}
      </svg>
    </button>
  );
}

const OTP_LENGTH = 6;

function OtpInput({ onComplete }: { onComplete: () => void }) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, raw: string) => {
    const value = raw.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[i] = value;
    setDigits(next);
    if (value && i < OTP_LENGTH - 1) {
      inputsRef.current[i + 1]?.focus();
    } else if (value && i === OTP_LENGTH - 1 && next.every((d) => d)) {
      onComplete();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIdx]?.focus();
    if (pasted.length === OTP_LENGTH) onComplete();
  };

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          style={{ width: 42, height: 52, textAlign: "center", padding: 0, border: "1px solid #cfccc6", font: "700 18px Helvetica,Arial,sans-serif", borderRadius: 12, boxSizing: "border-box" }}
        />
      ))}
    </div>
  );
}

export default function AuthModal({ ctx }: { ctx: StoreCtx }) {
  if (!ctx.authOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(15,15,15,.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={ctx.closeAuthModal}>
      <div style={{ width: 420, maxWidth: "100%", background: "#fafaf9", borderRadius: 22, padding: 30, animation: "swc-pop .22s ease", position: "relative", boxShadow: "0 30px 60px rgba(0,0,0,.25)" }} onClick={ctx.stop}>
        <button onClick={ctx.closeAuthModal} style={{ position: "absolute", top: 16, right: 16, background: "rgba(15,15,15,.06)", border: "none", cursor: "pointer", borderRadius: 999, padding: 7 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.8" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
        </button>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><img src="/uploads/streetwear-city-logo.png" style={{ height: 34 }} alt="Streetwear City" /></div>
        <div style={{ display: "flex", borderBottom: "1px solid #e6e3de", marginBottom: 24 }}>
          {ctx.authTabs.map((t) => (
            <button key={t.key} onClick={t.onClick} style={{ flex: 1, background: "none", border: "none", borderBottom: `2px solid ${t.borderColor}`, color: t.color, font: "700 12.5px Helvetica,Arial,sans-serif", letterSpacing: ".03em", padding: "12px 0", cursor: "pointer" }}>{t.label}</button>
          ))}
        </div>

        {ctx.isLoginTab && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h1 style={{ font: "800 21px Arial Black,Arial,sans-serif", margin: "0 0 2px", textAlign: "center" }}>WELCOME BACK</h1>
            <input placeholder="Email" style={authInputStyle} />
            <div style={{ position: "relative" }}>
              <input placeholder="Password" type={ctx.loginPwType} style={{ ...authInputStyle, width: "100%", padding: "14px 44px 14px 16px", boxSizing: "border-box" }} />
              <PwToggle shown={ctx.showLoginPw} onClick={ctx.toggleLoginPw} />
            </div>
            <a href="#" onClick={ctx.goForgotClick} style={{ font: "400 12px Helvetica,Arial,sans-serif", textDecoration: "underline", alignSelf: "flex-end" }}>Forgot password?</a>
            <button onClick={ctx.submitAuth} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: 15, cursor: "pointer", marginTop: 6, borderRadius: 999 }}>LOG IN</button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#e6e3de" }} /><span style={{ font: "400 11px Helvetica,Arial,sans-serif", color: "#9c9994" }}>OR</span><div style={{ flex: 1, height: 1, background: "#e6e3de" }} />
            </div>
            <button onClick={ctx.notifyDemo} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#fafaf9", color: "#0f0f0f", border: "1px solid #cfccc6", font: "600 13px Helvetica,Arial,sans-serif", padding: 13, cursor: "pointer", borderRadius: 999 }}>
              <GoogleIcon /> Continue with Google
            </button>
          </div>
        )}

        {ctx.isRegisterTab && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h1 style={{ font: "800 21px Arial Black,Arial,sans-serif", margin: "0 0 2px", textAlign: "center" }}>CREATE ACCOUNT</h1>
            <input placeholder="Full name" style={authInputStyle} />
            <input placeholder="Email" style={authInputStyle} />
            <div style={{ position: "relative" }}>
              <input placeholder="Password" type={ctx.regPwType} style={{ ...authInputStyle, width: "100%", padding: "14px 44px 14px 16px", boxSizing: "border-box" }} />
              <PwToggle shown={ctx.showRegPw} onClick={ctx.toggleRegPw} />
            </div>
            <button onClick={ctx.goVerifyClick} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: 15, cursor: "pointer", marginTop: 6, borderRadius: 999 }}>CREATE ACCOUNT</button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#e6e3de" }} /><span style={{ font: "400 11px Helvetica,Arial,sans-serif", color: "#9c9994" }}>OR</span><div style={{ flex: 1, height: 1, background: "#e6e3de" }} />
            </div>
            <button onClick={ctx.notifyDemo} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#fafaf9", color: "#0f0f0f", border: "1px solid #cfccc6", font: "600 13px Helvetica,Arial,sans-serif", padding: 13, cursor: "pointer", borderRadius: 999 }}>
              <GoogleIcon /> Continue with Google
            </button>
          </div>
        )}

        {ctx.isForgotTab && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ctx.isForgotRequestStep && (
              <>
                <h1 style={{ font: "800 21px Arial Black,Arial,sans-serif", margin: "0 0 2px", textAlign: "center" }}>RESET PASSWORD</h1>
                <p style={{ font: "400 13px/1.5 Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: 0, textAlign: "center" }}>Enter your email and we will send a reset code.</p>
                <input placeholder="Email" style={authInputStyle} />
                <button onClick={ctx.sendResetCode} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: 15, cursor: "pointer", marginTop: 6, borderRadius: 999 }}>SEND RESET CODE</button>
              </>
            )}
            {ctx.isForgotResetStep && (
              <>
                <h1 style={{ font: "800 21px Arial Black,Arial,sans-serif", margin: "0 0 2px", textAlign: "center" }}>SET NEW PASSWORD</h1>
                <p style={{ font: "400 13px/1.5 Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: 0, textAlign: "center" }}>Enter the code we sent and choose a new password.</p>
                <input placeholder="Reset code" style={authInputStyle} />
                <div style={{ position: "relative" }}>
                  <input placeholder="New password" type={ctx.newPwType} style={{ ...authInputStyle, width: "100%", padding: "14px 44px 14px 16px", boxSizing: "border-box" }} />
                  <PwToggle shown={ctx.showNewPw} onClick={ctx.toggleNewPw} />
                </div>
                <input placeholder="Confirm new password" type={ctx.newPwType} style={authInputStyle} />
                <button onClick={ctx.submitNewPassword} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: 15, cursor: "pointer", marginTop: 6, borderRadius: 999 }}>RESET PASSWORD</button>
              </>
            )}
          </div>
        )}

        {ctx.isVerifyTab && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "center", alignItems: "center" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.6"><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="M3 6.5l9 6 9-6" /></svg>
            <h1 style={{ font: "800 19px Arial Black,Arial,sans-serif", margin: 0 }}>VERIFY YOUR EMAIL</h1>
            <p style={{ font: "400 13px/1.6 Helvetica,Arial,sans-serif", color: "#6b6b6b", margin: 0 }}>We sent a 6 digit code to your email. Enter it below to activate your account.</p>
            <OtpInput onComplete={ctx.submitAuth} />
            <button onClick={ctx.submitAuth} style={{ width: "100%", background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: 15, cursor: "pointer", marginTop: 6, borderRadius: 999 }}>VERIFY</button>
          </div>
        )}
      </div>
    </div>
  );
}
