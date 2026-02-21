'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type MaskType = 'circle' | 'diamond' | 'horizontal' | 'vertical';

interface MaskRevealProps {
  children: ReactNode;
  type?: MaskType;
  duration?: number;
  delay?: number;
  className?: string;
  triggerStart?: string;
  once?: boolean;
}

const maskPaths: Record<MaskType, { from: string; to: string }> = {
  circle: {
    from: 'circle(0% at 50% 50%)',
    to: 'circle(75% at 50% 50%)',
  },
  diamond: {
    from: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
    to: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  },
  horizontal: {
    from: 'inset(0 100% 0 0)',
    to: 'inset(0 0% 0 0)',
  },
  vertical: {
    from: 'inset(0 0 100% 0)',
    to: 'inset(0 0 0% 0)',
  },
};

export default function MaskReveal({
  children,
  type = 'circle',
  duration = 1.2,
  delay = 0,
  className = '',
  triggerStart = 'top 80%',
  once = true,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const paths = maskPaths[type];

    gsap.set(ref.current, { clipPath: paths.from });

    gsap.to(ref.current, {
      clipPath: paths.to,
      duration,
      delay,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: ref.current,
        start: triggerStart,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [type, duration, delay, triggerStart, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
