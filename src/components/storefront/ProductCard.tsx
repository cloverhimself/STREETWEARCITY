"use client";

import { useState } from "react";
import { naira } from "@/lib/data";
import type { Product } from "@/lib/types";

const BADGE_COLORS: Record<string, string> = {
  New: "#0f0f0f",
  Bestseller: "#0f0f0f",
  "Low Stock": "oklch(0.5 0.16 40)",
};

interface ProductCardProps {
  product: Product;
  wishlisted: boolean;
  cartQty: number;
  onOpen: (id: string) => void;
  onToggle: (id: string) => void;
  onQuickAdd: (id: string) => void;
  onDecrement: (id: string) => void;
}

export default function ProductCard({
  product: p,
  wishlisted,
  cartQty,
  onOpen,
  onToggle,
  onQuickAdd,
  onDecrement,
}: ProductCardProps) {
  const [hover, setHover] = useState(false);

  const badgeBg = (p.badge && BADGE_COLORS[p.badge]) || "#0f0f0f";
  const heartFill = wishlisted ? "#0f0f0f" : "none";
  const quickAddBg = p.stock === 0 ? "#9c9994" : "#0f0f0f";
  const quickAddLabel = p.stock === 0 ? "SOLD OUT" : "ADD TO CART";

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 10, cursor: "pointer", fontFamily: "Helvetica,Arial,sans-serif" }}
      onClick={() => onOpen(p.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#efeeeb", borderRadius: 16 }}>
        <img
          src={p.image}
          alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s cubic-bezier(.2,.8,.2,1)", transform: hover ? "scale(1.06)" : "scale(1)" }}
        />
        {p.badge && (
          <div style={{ position: "absolute", top: 10, left: 10, background: badgeBg, color: "#fafaf9", font: "600 10px/1 Helvetica,Arial,sans-serif", letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 10px", borderRadius: 999 }}>
            {p.badge}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(p.id);
          }}
          aria-label="Toggle wishlist"
          style={{ position: "absolute", top: 8, right: 8, width: 30, height: 30, borderRadius: "50%", background: "rgba(250,250,249,.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={heartFill} stroke="#0f0f0f" strokeWidth="1.8">
            <path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 5.9l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.4l7.8-7.7 1-1a5.5 5.5 0 0 0 0-7.8z" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 9, display: "flex", justifyContent: "center", background: "linear-gradient(to top, rgba(0,0,0,.35), transparent)", opacity: hover ? 1 : 0, transition: "opacity .25s" }}>
          <span style={{ background: "#fafaf9", color: "#0f0f0f", font: "600 10.5px/1 Helvetica,Arial,sans-serif", letterSpacing: ".06em", textTransform: "uppercase", padding: "7px 16px", borderRadius: 999 }}>
            Quick View
          </span>
        </div>
        {p.stock === 0 && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(250,250,249,.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ background: "#0f0f0f", color: "#fafaf9", font: "600 10.5px/1 Helvetica,Arial,sans-serif", letterSpacing: ".08em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999 }}>
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ font: "500 13.5px/1.35 Helvetica,Arial,sans-serif", color: "#0f0f0f" }}>{p.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ font: "700 13.5px Helvetica,Arial,sans-serif", color: "#0f0f0f" }}>{naira(p.price)}</span>
          {p.compareAt && (
            <span style={{ font: "400 12px Helvetica,Arial,sans-serif", color: "#9c9994", textDecoration: "line-through" }}>{naira(p.compareAt)}</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 1 }}>
          {p.colors.map((c) => (
            <span key={c.name} title={c.name} style={{ width: 11, height: 11, borderRadius: "50%", border: "1px solid rgba(0,0,0,.18)", background: c.hex }} />
          ))}
        </div>
      </div>
      {cartQty > 0 ? (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "#0f0f0f", borderRadius: 999, overflow: "hidden" }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDecrement(p.id);
            }}
            style={{ width: 38, height: 38, background: "none", border: "none", color: "#fafaf9", font: "600 16px Helvetica,Arial,sans-serif", cursor: "pointer" }}
          >
            −
          </button>
          <span style={{ color: "#fafaf9", font: "700 12.5px Helvetica,Arial,sans-serif" }}>{cartQty}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (p.stock === 0) return;
              onQuickAdd(p.id);
            }}
            style={{ width: 38, height: 38, background: "none", border: "none", color: "#fafaf9", font: "600 16px Helvetica,Arial,sans-serif", cursor: "pointer" }}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (p.stock === 0) return;
            onQuickAdd(p.id);
          }}
          disabled={p.stock === 0}
          style={{ width: "100%", background: quickAddBg, color: "#fafaf9", border: "none", font: "600 11.5px Helvetica,Arial,sans-serif", letterSpacing: ".04em", padding: 11, cursor: "pointer", borderRadius: 999 }}
        >
          {quickAddLabel}
        </button>
      )}
    </div>
  );
}
