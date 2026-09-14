import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verric | Deal Intelligence for Private Markets",
  description:
    "Verric is the AI deal terminal for private equity and independent sponsors — source-backed screening against your mandate, diligence structured into owned workstreams, and institutional memory that survives every deal.",
  openGraph: {
    title: "Verric | Deal Intelligence for Private Markets",
    description:
      "Screen, structure, and underwrite every opportunity from one place — with an analyst that carries your investment criteria.",
    url: "https://verric.io",
    siteName: "Verric",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className={sans.className}>{children}</body>
    </html>
  );
}
