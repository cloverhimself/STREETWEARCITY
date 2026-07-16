import type { StoreCtx } from "./storefront-types";

export default function Toast({ ctx }: { ctx: StoreCtx }) {
  if (!ctx.toast) return null;
  return (
    <div style={{ position: "fixed", bottom: 26, left: "50%", transform: "translateX(-50%)", background: "#0f0f0f", color: "#fafaf9", font: "600 12.5px Helvetica,Arial,sans-serif", padding: "14px 24px", zIndex: 95, animation: "swc-fade .2s ease", borderRadius: 999 }}>
      {ctx.toast}
    </div>
  );
}
