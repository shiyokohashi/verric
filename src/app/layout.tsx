import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

/** Lausanne-adjacent neo-grotesque — single family sitewide. */
const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verric | The AI Deal Terminal for Private-Market Investors",
  description:
    "Verric is the deal terminal for private equity firms and independent sponsors: source-backed screening against your mandate, diligence structured into owned workstreams, and a firm analyst that carries your investment criteria across every opportunity. Under NDA.",
  openGraph: {
    title: "Verric | The AI Deal Terminal for Private-Market Investors",
    description:
      "Screen, structure, and underwrite every opportunity from one place — with an analyst that carries your investment criteria.",
    url: "https://verric.io",
    siteName: "Verric",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={sans.variable}>
      <body className={sans.className}>{children}</body>
    </html>
  );
}
