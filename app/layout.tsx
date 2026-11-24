import type { Metadata, Viewport } from "next";
import { Great_Vibes, Cormorant_Garamond, Playfair_Display, Cinzel, Pinyon_Script } from "next/font/google";
import "./globals.css";

const script = Great_Vibes({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-script", display: "swap" });
const names = Playfair_Display({ weight: ["500", "600"], style: ["italic", "normal"], subsets: ["latin", "latin-ext"], variable: "--font-names", display: "swap" });
const display = Cinzel({ weight: ["500", "600"], subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-pinyon", display: "block" });
const serif = Cormorant_Garamond({ weight: ["400", "500", "600"], style: ["normal", "italic"], subsets: ["latin", "latin-ext"], variable: "--font-serif", display: "block" });

export const metadata: Metadata = {
  title: "Adrian & Melisa — Ftesë Fejese",
  description: "Ftesë për fejesën e Adrian & Melisa",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#F8F0E2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq" className={`${script.variable} ${serif.variable} ${names.variable} ${display.variable} ${pinyon.variable}`}>
      <body>{children}</body>
    </html>
  );
}
