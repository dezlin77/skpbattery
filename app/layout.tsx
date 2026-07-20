import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky Power (US) — Industrial Battery Solutions",
  description:
    "Precision-engineered lithium battery cells with free certified thermal simulation. Bring Heart To Power.",
  keywords: ["battery", "lithium", "thermal simulation", "18650", "industrial", "LFP"],
  openGraph: {
    title: "Sky Power (US)",
    description: "Engineer the Future of Power",
    url: "https://www.skpbattery.com",
    siteName: "Sky Power (US)",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}