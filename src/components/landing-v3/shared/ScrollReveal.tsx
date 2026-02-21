'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 1,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const dirMap: Record<string, { x?: number; y?: number; scale?: number }> = {
      up: { y: 60 },
      down: { y: -60 },
      left: { x: -60 },
      right: { x: 60 },
      scale: { scale: 0.9 },
    };

    const from = { opacity: 0, ...dirMap[direction] };
    const to = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    };

    gsap.fromTo(ref.current, from, to);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [direction, delay, duration, once]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
