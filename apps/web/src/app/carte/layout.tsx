import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JL Studio — Jeason Lemoine · Web designer & développeur freelance Bordeaux',
  description:
    'Jeason Lemoine — Je conçois des sites premium et des systèmes qui font gagner du temps aux entrepreneurs. Bordeaux · Disponible pour de nouveaux projets.',
  alternates: { canonical: 'https://jlstudio.dev/carte' },
  openGraph: {
    type: 'profile',
    siteName: 'JL Studio',
    title: 'JL Studio — Jeason Lemoine',
    description:
      'Web designer & développeur freelance à Bordeaux. Sites premium et systèmes qui font gagner du temps aux entrepreneurs.',
    url: 'https://jlstudio.dev/carte',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JL Studio — Jeason Lemoine',
  },
};

export const viewport: Viewport = {
  themeColor: '#050510',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function CarteLayout({ children }: { children: React.ReactNode }) {
  return <div className={jetbrainsMono.variable}>{children}</div>;
}
