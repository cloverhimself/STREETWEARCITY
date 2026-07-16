import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Streetwear City",
  description: "Verified authentic streetwear, curated drops, and consignment pulls from the culture, for the culture.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>{children}</body>
    </html>
  );
}
