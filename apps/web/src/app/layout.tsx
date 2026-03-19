import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://jlstudio.dev"),
  alternates: {
    canonical: "https://jlstudio.dev",
  },
  title: "JL Studio | Création de Sites Web Premium — Bordeaux",
  description:
    "Studio de création web sur mesure. Sites vitrine, e-commerce et applications haut de gamme. Design soigné, performances optimales, accompagnement personnalisé.",
  keywords:
    "création site web, développeur web Bordeaux, site vitrine premium, e-commerce sur mesure, application web, freelance, agence web Bordeaux",
  openGraph: {
    title: "JL Studio | Création de Sites Web Premium — Bordeaux",
    description:
      "Studio de création web sur mesure. Sites vitrine, e-commerce et applications haut de gamme. Design soigné et performances optimales.",
    type: "website",
    locale: "fr_FR",
    siteName: "JL Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "JL Studio | Création de Sites Web Premium — Bordeaux",
    description:
      "Studio de création web sur mesure. Sites vitrine, e-commerce et applications haut de gamme.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "JL Studio",
  url: "https://jlstudio.dev",
  logo: "https://jlstudio.dev/images/logo-jlstudio.png",
  description:
    "Studio de création web sur mesure à Bordeaux. Sites vitrine, e-commerce et applications haut de gamme.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "35 quai Deschamps",
    addressLocality: "Bordeaux",
    postalCode: "33100",
    addressCountry: "FR",
  },
  telephone: "+33767581061",
  email: "contact@jlstudio.dev",
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  priceRange: "€€",
  knowsAbout: [
    "Développement web",
    "Next.js",
    "React",
    "E-commerce",
    "Applications web",
    "SEO",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${outfit.variable} ${dmSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js"}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
