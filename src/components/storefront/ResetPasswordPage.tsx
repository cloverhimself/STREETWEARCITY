"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import StorefrontChrome from "./StorefrontChrome";
import { pageIntro, pageTitle, pageWrap } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

type ResetState = "idle" | "resetting" | "success" | "error";

const fieldStyle: React.CSSProperties = { padding: "14px 16px", border: "1px solid #cfccc6", font: "400 13px Helvetica,Arial,sans-serif", borderRadius: 12, boxSizing: "border-box", width: "100%" };

export default function ResetPasswordPage() {
  const ctx = useStorefront();
  const token = useSearchParams().get("token");
  const [state, setState] = useState<ResetState>(token ? "idle" : "error");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setFormError("Passwords do not match");
      return;
    }
    setFormError(null);
    // Integration point: call the real reset endpoint here, e.g. POST /auth/reset-password { token, password }.
    setState("resetting");
    setTimeout(() => setState("success"), 900);
  }

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={{ ...pageWrap, maxWidth: 420, minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16 }}>
        {state === "idle" && (
          <>
            <h1 style={pageTitle}>SET NEW PASSWORD</h1>
            <p style={pageIntro}>Choose a new password for your account.</p>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
              <input placeholder="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={fieldStyle} required />
              <input placeholder="Confirm new password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} style={fieldStyle} required />
              {formError && <span style={{ font: "600 12px Helvetica,Arial,sans-serif", color: "oklch(0.5 0.16 40)" }}>{formError}</span>}
              <button type="submit" style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: 15, cursor: "pointer", borderRadius: 999 }}>RESET PASSWORD</button>
            </form>
          </>
        )}

        {state === "resetting" && (
          <>
            <div style={{ width: 34, height: 34, borderRadius: "50%", border: "3px solid #e6e3de", borderTopColor: "#0f0f0f", animation: "swc-spin 0.8s linear infinite" }} />
            <h1 style={pageTitle}>UPDATING PASSWORD...</h1>
          </>
        )}

        {state === "success" && (
          <>
            <h1 style={pageTitle}>PASSWORD UPDATED</h1>
            <p style={pageIntro}>Your password has been reset. Log in with your new password.</p>
            <Link href="/" style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 32px", cursor: "pointer", borderRadius: 999 }}>LOG IN</Link>
          </>
        )}

        {state === "error" && (
          <>
            <h1 style={pageTitle}>LINK INVALID OR EXPIRED</h1>
            <p style={pageIntro}>This reset link is missing or no longer valid. Request a new one from the login screen.</p>
            <Link href="/" style={{ background: "none", color: "#0f0f0f", border: "1px solid #0f0f0f", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 32px", cursor: "pointer", borderRadius: 999 }}>BACK TO STREETWEAR CITY</Link>
          </>
        )}
      </div>
    </StorefrontChrome>
  );
}
