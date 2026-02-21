'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PreloaderV3() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Count 0 → 100
  useEffect(() => {
    const start = performance.now();
    const duration = 2000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Counter done → trigger mask exit
        setTimeout(() => {
          if (!overlayRef.current || !counterRef.current) return;

          gsap.to(counterRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: 'power2.in',
          });

          gsap.to(overlayRef.current, {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 1,
            delay: 0.3,
            ease: 'power3.inOut',
            onComplete: () => {
              setDone(true);
              document.body.style.overflow = '';
            },
          });
        }, 300);
      }
    };

    document.body.style.overflow = 'hidden';
    requestAnimationFrame(tick);
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      style={{ clipPath: 'circle(100% at 50% 50%)' }}
    >
      <div ref={counterRef} className="text-center">
        <div className="font-[family-name:var(--font-outfit)] text-6xl sm:text-7xl md:text-9xl font-black text-white tabular-nums">
          {count}
        </div>
        <div className="mt-3 sm:mt-4 h-[1px] w-16 sm:w-20 mx-auto bg-gradient-to-r from-transparent via-[#638BFF] to-transparent" />
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm tracking-[0.3em] uppercase text-white/40">
          JL Studio
        </p>
      </div>
    </div>
  );
}
