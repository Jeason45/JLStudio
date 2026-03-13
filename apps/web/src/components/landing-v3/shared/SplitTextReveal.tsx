'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitTextRevealProps {
  children: ReactNode;
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  triggerStart?: string;
  once?: boolean;
}

export default function SplitTextReveal({
  children,
  type = 'chars',
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  className = '',
  tag: Tag = 'div',
  triggerStart = 'top 80%',
  once = true,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const split = SplitText.create(ref.current, {
      type: type === 'chars' ? 'chars,words' : type,
    });

    const targets = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

    gsap.set(targets, {
      opacity: 0,
      y: 40,
      rotateX: -40,
    });

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: triggerStart,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [type, stagger, duration, delay, triggerStart, once]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
      style={{ perspective: 400 }}
    >
      {children}
    </Tag>
  );
}
