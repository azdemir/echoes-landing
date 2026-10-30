'use client';

import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  alt: string;
  /** tailwind positioning for the outer wrapper, e.g. "right-[-6%] top-1/2" */
  position: string;
  /** css size, e.g. "min(92vw, 880px)" */
  size: string;
  /** "r,g,b" glow color */
  glow?: string;
  /** base opacity 0..1 */
  dim?: number;
  /** parallax strength */
  speed?: number;
  className?: string;
};

/**
 * A gigantic floating future face. As its scene scrolls through the viewport
 * the face drifts, recedes and fades — like the camera flying past it.
 */
export default function SceneFace({
  src,
  alt,
  position,
  size,
  glow = '139,123,255',
  dim = 1,
  speed = 1,
  className = '',
}: Props) {
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = inner.current;
    if (!el || !el.parentElement) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const update = () => {
      const rect = (el.parentElement as HTMLElement).getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (entering below) .. 0 (centered) .. 1 (leaving above)
      const prog = (rect.top + rect.height / 2 - vh / 2) / vh;
      const abs = Math.min(Math.abs(prog), 1.4);
      const y = reduced ? 0 : prog * 130 * speed;
      const scale = reduced ? 1 : 1.08 - abs * 0.16;
      const opacity = dim * (1 - Math.min(abs * 1.15, 1) * 0.62);
      el.style.transform = `translateY(calc(-50% + ${y.toFixed(1)}px)) scale(${scale.toFixed(4)})`;
      el.style.opacity = opacity.toFixed(3);
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [dim, speed]);

  return (
    <div className={`pointer-events-none absolute ${position} ${className}`} aria-hidden="true">
      <div ref={inner} className="relative will-change-transform" style={{ width: size }}>
        <div className="face-glow" style={{ background: `rgba(${glow},0.16)` }} />
        <div className="floaty">
          <img src={src} alt={alt} draggable={false} className="face-mask block w-full select-none" />
        </div>
      </div>
    </div>
  );
}
