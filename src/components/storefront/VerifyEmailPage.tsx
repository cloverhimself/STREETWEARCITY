"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import StorefrontChrome from "./StorefrontChrome";
import { pageIntro, pageTitle, pageWrap } from "./static-page-styles";
import { useStorefront } from "./useStorefront";

type VerifyState = "idle" | "verifying" | "success" | "error";

export default function VerifyEmailPage() {
  const ctx = useStorefront();
  const token = useSearchParams().get("token");
  const [state, setState] = useState<VerifyState>(token ? "idle" : "error");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function verify() {
    setState("verifying");
    apiFetch("/auth/verify-email", { method: "POST", body: JSON.stringify({ token }) })
      .then(() => setState("success"))
      .catch((err) => {
        setErrorMessage(err instanceof ApiError ? err.message : "Something went wrong");
        setState("error");
      });
  }

  return (
    <StorefrontChrome ctx={ctx}>
      <div style={{ ...pageWrap, maxWidth: 460, minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16 }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="1.6"><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="M3 6.5l9 6 9-6" /></svg>

        {state === "idle" && (
          <>
            <h1 style={pageTitle}>VERIFY YOUR EMAIL</h1>
            <p style={pageIntro}>Click below to confirm your email address and activate your account.</p>
            <button onClick={verify} style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 32px", cursor: "pointer", borderRadius: 999 }}>VERIFY EMAIL</button>
          </>
        )}

        {state === "verifying" && (
          <>
            <div style={{ width: 34, height: 34, borderRadius: "50%", border: "3px solid #e6e3de", borderTopColor: "#0f0f0f", animation: "swc-spin 0.8s linear infinite" }} />
            <h1 style={pageTitle}>VERIFYING...</h1>
          </>
        )}

        {state === "success" && (
          <>
            <h1 style={pageTitle}>EMAIL VERIFIED</h1>
            <p style={pageIntro}>Your account is active. You can now log in and start shopping.</p>
            <Link href="/" style={{ background: "#0f0f0f", color: "#fafaf9", border: "none", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 32px", cursor: "pointer", borderRadius: 999 }}>CONTINUE TO STREETWEAR CITY</Link>
          </>
        )}

        {state === "error" && (
          <>
            <h1 style={pageTitle}>LINK INVALID OR EXPIRED</h1>
            <p style={pageIntro}>{errorMessage || "This verification link is missing or no longer valid. Request a new one from the login screen."}</p>
            <Link href="/" style={{ background: "none", color: "#0f0f0f", border: "1px solid #0f0f0f", font: "700 13px Helvetica,Arial,sans-serif", letterSpacing: ".05em", padding: "15px 32px", cursor: "pointer", borderRadius: 999 }}>BACK TO STREETWEAR CITY</Link>
          </>
        )}
      </div>
    </StorefrontChrome>
  );
}
