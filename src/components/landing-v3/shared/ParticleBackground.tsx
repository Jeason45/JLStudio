'use client';

import { useRef, useEffect } from 'react';

interface Orb {
  x: number;
  y: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  baseOpacity: number;
  speedX: number;
  speedY: number;
  phase: number;
  phase2: number;
  phaseSpeed: number;
  pulseSpeed: number;
  pulseAmp: number;
  depth: number; // 0 = far, 1 = close
}

interface Dust {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  speedX: number;
  speedY: number;
  phase: number;
  phaseSpeed: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

// Color palette
const COLORS = {
  blue: [99, 139, 255],
  deepBlue: [70, 110, 220],
  gold: [212, 175, 55],
  warmGold: [230, 195, 80],
  white: [220, 225, 255],
  cyan: [120, 180, 255],
};

const COLOR_POOL = [
  COLORS.blue, COLORS.blue, COLORS.blue,  // weighted towards blue
  COLORS.deepBlue, COLORS.cyan,
  COLORS.gold, COLORS.warmGold,
  COLORS.white,
];

function randomColor() {
  return COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false })!;
    let animationId: number;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const initW = w || 1920;
    const initH = h || 1080;

    // ── Background orbs (far, large, very soft) ──
    const farOrbs: Orb[] = Array.from({ length: 6 }, () => {
      const col = randomColor();
      return {
        x: Math.random() * initW,
        y: Math.random() * initH,
        radius: 120 + Math.random() * 200,
        r: col[0], g: col[1], b: col[2],
        baseOpacity: 0.06 + Math.random() * 0.08,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.06,
        phase: Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        phaseSpeed: 0.0005 + Math.random() * 0.001,
        pulseSpeed: 0.003 + Math.random() * 0.005,
        pulseAmp: 0.3 + Math.random() * 0.3,
        depth: 0,
      };
    });

    // ── Mid orbs (medium distance, clear bokeh) ──
    const midOrbs: Orb[] = Array.from({ length: 10 }, () => {
      const col = randomColor();
      return {
        x: Math.random() * initW,
        y: Math.random() * initH,
        radius: 30 + Math.random() * 60,
        r: col[0], g: col[1], b: col[2],
        baseOpacity: 0.12 + Math.random() * 0.18,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        phaseSpeed: 0.001 + Math.random() * 0.002,
        pulseSpeed: 0.005 + Math.random() * 0.008,
        pulseAmp: 0.2 + Math.random() * 0.25,
        depth: 0.5,
      };
    });

    // ── Close orbs (near camera, bright, smaller) ──
    const closeOrbs: Orb[] = Array.from({ length: 6 }, () => {
      const col = randomColor();
      return {
        x: Math.random() * initW,
        y: Math.random() * initH,
        radius: 8 + Math.random() * 25,
        r: col[0], g: col[1], b: col[2],
        baseOpacity: 0.25 + Math.random() * 0.35,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        phaseSpeed: 0.002 + Math.random() * 0.004,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        pulseAmp: 0.15 + Math.random() * 0.2,
        depth: 1,
      };
    });

    const allOrbs = [...farOrbs, ...midOrbs, ...closeOrbs];

    // ── Dust particles — tiny, twinkling, floating ──
    const dusts: Dust[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * initW,
      y: Math.random() * initH,
      radius: 0.5 + Math.random() * 1.8,
      baseOpacity: 0.15 + Math.random() * 0.35,
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: -(0.05 + Math.random() * 0.2),
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.006 + Math.random() * 0.012,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.04,
    }));

    // ── Draw an orb with glow (two-pass: outer glow + bright core) ──
    const drawOrb = (o: Orb, opacity: number) => {
      // Outer glow (large, soft)
      const glowRadius = o.radius * 1.8;
      const glow = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, glowRadius);
      glow.addColorStop(0, `rgba(${o.r},${o.g},${o.b},${opacity * 0.6})`);
      glow.addColorStop(0.3, `rgba(${o.r},${o.g},${o.b},${opacity * 0.25})`);
      glow.addColorStop(0.6, `rgba(${o.r},${o.g},${o.b},${opacity * 0.06})`);
      glow.addColorStop(1, `rgba(${o.r},${o.g},${o.b},0)`);
      ctx.beginPath();
      ctx.arc(o.x, o.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Bright core
      const coreRadius = o.radius * 0.3;
      const core = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, coreRadius);
      core.addColorStop(0, `rgba(${Math.min(o.r + 80, 255)},${Math.min(o.g + 60, 255)},${Math.min(o.b + 40, 255)},${opacity * 0.9})`);
      core.addColorStop(0.5, `rgba(${o.r},${o.g},${o.b},${opacity * 0.4})`);
      core.addColorStop(1, `rgba(${o.r},${o.g},${o.b},0)`);
      ctx.beginPath();
      ctx.arc(o.x, o.y, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();
    };

    // ── Animation loop ──
    let time = 0;

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, w, h);

      // ── Dark base with subtle gradient ──
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.8);
      bg.addColorStop(0, '#111828');
      bg.addColorStop(0.5, '#0c1220');
      bg.addColorStop(1, '#060a14');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // ── Animated volumetric light — blue, upper right ──
      const lightPhase = Math.sin(time * 0.001) * 0.008;
      const lightGrad = ctx.createRadialGradient(
        w * 0.8, h * 0.15, 0,
        w * 0.5, h * 0.5, w * 0.7
      );
      lightGrad.addColorStop(0, `rgba(99,139,255,${0.04 + lightPhase})`);
      lightGrad.addColorStop(0.3, `rgba(70,110,220,${0.015 + lightPhase * 0.5})`);
      lightGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Warm light — gold, lower left ──
      const warmPhase = Math.sin(time * 0.0008 + 2) * 0.005;
      const warmGrad = ctx.createRadialGradient(
        w * 0.15, h * 0.85, 0,
        w * 0.4, h * 0.5, w * 0.6
      );
      warmGrad.addColorStop(0, `rgba(212,175,55,${0.025 + warmPhase})`);
      warmGrad.addColorStop(0.3, `rgba(180,140,40,${0.008 + warmPhase * 0.3})`);
      warmGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = warmGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Use additive blending for orbs (realistic glow) ──
      ctx.globalCompositeOperation = 'lighter';

      // Update & draw all orbs
      for (const o of allOrbs) {
        o.phase += o.phaseSpeed;
        o.phase2 += o.phaseSpeed * 1.3;

        // Organic movement (multi-frequency sine)
        o.x += o.speedX + Math.sin(o.phase) * 0.12 + Math.sin(o.phase2 * 2.7) * 0.05;
        o.y += o.speedY + Math.cos(o.phase * 0.8) * 0.1 + Math.cos(o.phase2 * 1.9) * 0.04;

        // Wrap
        const margin = o.radius * 2;
        if (o.x < -margin) o.x = w + margin * 0.5;
        if (o.x > w + margin) o.x = -margin * 0.5;
        if (o.y < -margin) o.y = h + margin * 0.5;
        if (o.y > h + margin) o.y = -margin * 0.5;

        // Pulsing opacity
        const pulse = 1 + Math.sin(time * o.pulseSpeed) * o.pulseAmp;
        const opacity = o.baseOpacity * pulse;

        drawOrb(o, opacity);
      }

      // Draw dust with twinkling
      for (const d of dusts) {
        d.phase += d.phaseSpeed;
        d.twinklePhase += d.twinkleSpeed;
        d.x += d.speedX + Math.sin(d.phase) * 0.06;
        d.y += d.speedY;

        if (d.y < -10) {
          d.y = h + 10;
          d.x = Math.random() * w;
        }

        // Twinkle effect
        const twinkle = 0.5 + Math.sin(d.twinklePhase) * 0.5;
        const opacity = d.baseOpacity * twinkle;

        if (opacity > 0.02) {
          // Tiny glow for dust
          const dustGlow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius * 3);
          dustGlow.addColorStop(0, `rgba(200,215,255,${opacity})`);
          dustGlow.addColorStop(0.4, `rgba(200,215,255,${opacity * 0.3})`);
          dustGlow.addColorStop(1, 'rgba(200,215,255,0)');
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = dustGlow;
          ctx.fill();
        }
      }

      // Reset composite
      ctx.globalCompositeOperation = 'source-over';

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
