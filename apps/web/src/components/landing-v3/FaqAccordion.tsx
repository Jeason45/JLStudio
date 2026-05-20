'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from './shared/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  q: string;
  a: React.ReactNode;
  defaultOpen?: boolean;
}

// Contenu éditable depuis le CRM (answer en HTML string)
export interface FaqContentItem { question: string; answer: string }
export interface FaqContent {
  eyebrow: string;
  title: string;
  items: FaqContentItem[];
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: 'Combien de temps prend un projet ?',
    a: (
      <>
        <p>
          Pour un site vitrine, comptez <strong>à partir de 2 semaines</strong> une fois le brief validé. Pour une boutique e-commerce, <strong>à partir de 4 semaines</strong>. Pour une application web ou une prestation sur mesure, le délai dépend du périmètre — je vous le précise dans le devis.
        </p>
        <p>
          Au-delà de ces ordres de grandeur, je m&apos;adapte à votre rythme : si vous êtes pressé, on accélère ; si vous avez besoin de plus de temps pour valider en interne, on le prend. L&apos;important, c&apos;est que la livraison corresponde à votre calendrier, pas au mien.
        </p>
      </>
    ),
  },
  {
    q: 'Qui possède le code source ?',
    a: (
      <>
        <p>
          <strong>Vous, du début à la fin.</strong> Le code est votre propriété pleine et entière.
        </p>
        <p>
          Au quotidien, c&apos;est moi qui dispose des accès pour développer, déployer et maintenir. Le jour où vous souhaitez reprendre la main — confier le projet à un autre prestataire, l&apos;intégrer en interne, ou tout récupérer pour vous — je vous transmets l&apos;intégralité : code, hébergement, base de données, configurations. Sans frais, sans friction.
        </p>
        <p>L&apos;esprit, c&apos;est que tout s&apos;adapte à votre projet et à votre rythme.</p>
      </>
    ),
  },
  {
    q: 'Comment se passe le paiement ?',
    a: (
      <>
        <p>
          <strong>Au choix, selon votre trésorerie :</strong>
        </p>
        <ul>
          <li>Acompte à la signature + solde à la livraison (modèle classique pour un projet court).</li>
          <li>Découpage par jalons (signature / validation des maquettes / livraison) pour étaler.</li>
          <li>Mensualités sur les projets longs de 3 mois et plus.</li>
        </ul>
        <p>
          On en discute en début de projet pour trouver le format qui correspond à votre fonctionnement. Aucun acompte de 100% en avance — vous payez au fur et à mesure de l&apos;avancement.
        </p>
      </>
    ),
  },
  {
    q: 'Est-ce que vous gérez l\'hébergement ?',
    a: (
      <>
        <p>
          <strong>Au choix.</strong> Soit je gère votre hébergement de A à Z — surveillance, mises à jour, intervention en cas de problème — vous n&apos;avez à vous soucier de rien sur le plan technique. Soit vous l&apos;hébergez vous-même chez votre prestataire favori, et je vous fournis toutes les configurations pour rendre la mise en ligne complètement autonome.
        </p>
        <p>L&apos;idée, c&apos;est que ça corresponde à votre fonctionnement, pas à un modèle imposé.</p>
      </>
    ),
  },
  {
    q: 'Et après la livraison, vous me délaissez ?',
    a: (
      <>
        <p>
          <strong>Jamais.</strong> À la livraison, vous repartez avec une période de garantie pour les corrections de bugs — gratuite, sans question.
        </p>
        <p>
          Au-delà, vous choisissez : intervention ponctuelle quand vous en avez besoin, forfait de support mensuel pour avoir l&apos;esprit tranquille, ou autonomie complète si vous gérez vous-même. Tout est possible — l&apos;idée, c&apos;est que la suite corresponde à votre besoin réel, pas à un contrat imposé.
        </p>
      </>
    ),
  },
  {
    q: 'Pourquoi un freelance plutôt qu\'une agence ?',
    a: (
      <>
        <p>
          Avec un freelance, vous parlez <strong>directement à celui qui code et qui livre</strong>. Pas de chef de projet entre nous, pas de relais, pas de coût lié à la structure. Vous payez le travail réel.
        </p>
        <p>
          Le résultat : un projet qui colle au plus près de votre besoin, avec une exigence de qualité équivalente à celle d&apos;une agence — sans la friction d&apos;avoir trois interlocuteurs différents.
        </p>
      </>
    ),
  },
  {
    q: 'Faites-vous du SEO / référencement ?',
    a: (
      <>
        <p>
          <strong>SEO technique</strong> : oui, inclus dans tous mes projets. Vitesse de chargement, structure des pages, balises et schema, accessibilité — les fondamentaux qui font qu&apos;un site est correctement lu par Google et confortable pour vos visiteurs.
        </p>
        <p>
          <strong>SEO de contenu et netlinking</strong> : ce n&apos;est pas mon expertise principale. Je peux vous orienter vers un partenaire spécialisé selon vos besoins, ou vous laisser libre de choisir le vôtre. L&apos;important, c&apos;est que la stratégie corresponde à votre marché.
        </p>
      </>
    ),
  },
  {
    q: 'Et si je ne suis pas satisfait ?',
    a: (
      <>
        <p>
          On travaille ensemble jusqu&apos;à ce que vous soyez <strong>vraiment satisfait</strong>. Plusieurs cycles de retour sur les maquettes, les prototypes, et le code livré — pas de limite arbitraire imposée.
        </p>
        <p>
          L&apos;objectif n&apos;est pas de livrer un projet « acceptable », c&apos;est de livrer un projet dont vous serez fier. C&apos;est ce qui fait que la collaboration s&apos;inscrit dans la durée.
        </p>
      </>
    ),
  },
];

interface FaqAccordionProps { content?: FaqContent }

export default function FaqAccordion({ content }: FaqAccordionProps = {}) {
  const eyebrow = content?.eyebrow || 'FAQ';
  const title = content?.title || 'Les questions qu’on me pose souvent.';
  const faqs: FaqItem[] = content?.items && content.items.length > 0
    ? content.items.map((it) => ({
        q: it.question,
        a: <div dangerouslySetInnerHTML={{ __html: it.answer }} />,
      }))
    : DEFAULT_FAQS;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sectionRef.current.querySelectorAll<HTMLElement>('.faq-fade').forEach((el) => {
        el.style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll<HTMLElement>('.faq-fade');
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-label="Questions fréquentes"
      className="relative bg-black overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <p className="faq-fade text-[#638BFF] text-xs tracking-[0.4em] uppercase text-center mb-5 sm:mb-6 opacity-0">
          {eyebrow}
        </p>

        {/* Title */}
        <div className="faq-fade text-center mb-10 sm:mb-14 opacity-0">
          <SplitTextReveal
            tag="h2"
            type="words"
            className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[0.98] tracking-tight"
          >
            {title}
          </SplitTextReveal>
        </div>

        {/* Items */}
        <div className="space-y-1">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="faq-fade group border-b border-white/[0.08] py-5 sm:py-6 cursor-pointer opacity-0"
              open={item.defaultOpen}
            >
              <summary className="flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                <span className="font-[family-name:var(--font-outfit)] text-base sm:text-lg font-medium text-white tracking-tight pr-4">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/[0.1] flex items-center justify-center text-[#638BFF] text-xl font-light transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="text-sm sm:text-[15px] text-white/55 leading-relaxed mt-4 pr-10 sm:pr-12 space-y-3 [&_strong]:text-white/90 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
