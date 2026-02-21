'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt?: string;
  speed?: number;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
  scale?: number;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt = '',
  speed = 0.3,
  overlay = true,
  overlayOpacity = 0.4,
  className = '',
  scale = 1.2,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    const yPercent = speed * -100;

    gsap.set(imgRef.current, { scale });

    const tl = gsap.to(imgRef.current, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [speed, scale]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imgRef} className="absolute inset-[-20%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={priority}
        />
      </div>
      {overlay && (
        <div
          className="absolute inset-0 bg-black z-[1]"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}
