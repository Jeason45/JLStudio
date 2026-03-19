import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://jlstudio.dev/qualifier" },
  title: "Qualifier mon projet | JL Studio",
  description:
    "Décrivez votre projet web en quelques étapes. Recevez une estimation personnalisée pour votre site vitrine, e-commerce ou application sur mesure.",
  openGraph: {
    title: "Qualifier mon projet | JL Studio",
    description:
      "Décrivez votre projet web en quelques étapes et recevez une estimation personnalisée.",
  },
};

export default function QualifierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
