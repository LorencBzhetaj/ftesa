import type { Metadata, Viewport } from "next";
import { Great_Vibes, Cormorant_Garamond, Playfair_Display, Cinzel, Pinyon_Script } from "next/font/google";
import "./globals.css";

const script = Great_Vibes({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-script", display: "swap" });
const names = Playfair_Display({ weight: ["500", "600"], style: ["italic", "normal"], subsets: ["latin", "latin-ext"], variable: "--font-names", display: "swap" });
const display = Cinzel({ weight: ["500", "600"], subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-pinyon", display: "block" });
const serif = Cormorant_Garamond({ weight: ["400", "500", "600"], style: ["normal", "italic"], subsets: ["latin", "latin-ext"], variable: "--font-serif", display: "block" });

// Link previews need absolute image URLs: set NEXT_PUBLIC_SITE_URL to the final domain
// (on Vercel the production domain is picked up automatically).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = "Ftesë për fejesën tonë — Adrian & Melisa";
const description = "27 Dhjetor 2026 · Ora 13:00 · Hapni zarfin për ftesën";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: { type: "website", locale: "sq_AL", url: "/", siteName: "Ftesë fejese", title, description },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#F8F0E2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq" className={`${script.variable} ${serif.variable} ${names.variable} ${display.variable} ${pinyon.variable}`}>
      <body>{children}</body>
    </html>
  );
}
