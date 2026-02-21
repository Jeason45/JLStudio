import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JL Studio | Developpeur Web Freelance - Sites & Applications Sur Mesure",
  description:
    "JL Studio - Developpement web freelance. Sites vitrine, e-commerce, applications web sur mesure. Design premium, performances optimales, SEO integre.",
  keywords:
    "developpeur web, freelance, site vitrine, e-commerce, application web, Next.js, React, design, SEO",
  openGraph: {
    title: "JL Studio | Developpeur Web Freelance",
    description:
      "Sites vitrine, e-commerce et applications web sur mesure. Design premium et performances optimales.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${outfit.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
