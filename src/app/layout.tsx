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
  metadataBase: new URL("https://jlstudio.dev"),
  title: "JL Studio | Développeur Web Freelance - Sites & Applications Sur Mesure",
  description:
    "JL Studio - Développement web freelance. Sites vitrine, e-commerce, applications web sur mesure. Design premium, performances optimales, SEO intégré.",
  keywords:
    "développeur web, freelance, site vitrine, e-commerce, application web, Next.js, React, design, SEO",
  openGraph: {
    title: "JL Studio | Développeur Web Freelance",
    description:
      "Sites vitrine, e-commerce et applications web sur mesure. Design premium et performances optimales.",
    type: "website",
    locale: "fr_FR",
    siteName: "JL Studio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "JL Studio",
  url: "https://jlstudio.dev",
  logo: "https://jlstudio.dev/images/logo-jlstudio.png",
  description:
    "Développeur web freelance à Bordeaux. Sites vitrine, e-commerce et applications web sur mesure.",
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
      </body>
    </html>
  );
}
