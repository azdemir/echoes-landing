'use client';

import { useEffect, useRef } from 'react';

const NODES = [
  { year: '2026', label: 'The decision point', desc: 'You stand here. Every path is still open.' },
  { year: '2036', label: 'First consequences', desc: 'Small choices compound into a visible life.' },
  { year: '2046', label: 'The compound effect', desc: 'A decade of Tuesdays becomes a destiny.' },
  { year: '2056', label: 'The life you built', desc: 'Meet the person your decisions created.' },
];

// vertical fractions down the sticky stage where nodes ignite
const STOPS = [0.1, 0.37, 0.63, 0.9];

/**
 * A glowing timeline stretching into space. Scrolling draws the beam and
 * ignites each future node in turn; the ghost year crossfades as you travel.
 */
export default function Timeline() {
  const section = useRef<HTMLElement>(null);
  const beam = useRef<SVGPathElement>(null);
  const halo = useRef<SVGPathElement>(null);
  const yearEl = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const sec = section.current;
    if (!sec || !beam.current || !halo.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let shownYear = '';

    const update = () => {
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const p = Math.min(Math.max(-rect.top / Math.max(total, 1), 0), 1);
      const LEN = 1000;
      const off = LEN * (1 - p);
      beam.current!.style.strokeDashoffset = `${off}`;
      halo.current!.style.strokeDashoffset = `${off}`;

      let activeIdx = 0;
      NODES.forEach((n, i) => {
        const on = reduced || p >= STOPS[i] - 0.03;
        if (on) activeIdx = i;
        const node = nodeRefs.current[i];
        if (!node) return;
        const dot = node.querySelector<HTMLElement>('[data-dot]');
        const label = node.querySelector<HTMLElement>('[data-label]');
        if (!dot || !label) return;
        if (on) {
          dot.style.background = '#fff';
          dot.style.boxShadow =
            '0 0 18px 4px rgba(139,123,255,0.9), 0 0 60px 12px rgba(139,123,255,0.35)';
          dot.style.transform = 'translate(-50%,-50%) scale(1.35)';
          label.style.opacity = '1';
          label.style.transform = 'translateY(0)';
        } else {
          dot.style.background = 'rgba(236,234,244,0.25)';
          dot.style.boxShadow = 'none';
          dot.style.transform = 'translate(-50%,-50%) scale(1)';
          label.style.opacity = '0.28';
          label.style.transform = 'translateY(10px)';
        }
      });

      const year = NODES[activeIdx].year;
      if (year !== shownYear && yearEl.current) {
        shownYear = year;
        yearEl.current.textContent = year;
        yearEl.current.classList.remove('year-swap');
        void yearEl.current.offsetWidth;
        yearEl.current.classList.add('year-swap');
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={section} className="relative" style={{ height: '300vh' }} aria-label="Timeline">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* ghost year drifting behind */}
        <div className="pointer-events-none absolute inset-x-0 text-center" style={{ top: '9%' }} aria-hidden="true">
          <div ref={yearEl} className="ghost-year year-swap inline-block">
            2026
          </div>
        </div>

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={halo}
            d="M 50 6 L 50 94"
            fill="none"
            stroke="rgba(139,123,255,0.55)"
            strokeWidth="3.5"
            pathLength={1000}
            strokeDasharray={1000}
            strokeDashoffset={1000}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'blur(7px)' }}
          />
          <path
            ref={beam}
            d="M 50 6 L 50 94"
            fill="none"
            stroke="url(#beamGrad)"
            strokeWidth="1.1"
            pathLength={1000}
            strokeDasharray={1000}
            strokeDashoffset={1000}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b7bff" />
              <stop offset="55%" stopColor="#c9bfff" />
              <stop offset="100%" stopColor="#ffd98a" />
            </linearGradient>
          </defs>
        </svg>

        {/* nodes */}
        {NODES.map((n, i) => (
          <div
            key={n.year}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="absolute left-1/2"
            style={{ top: `${STOPS[i] * 100}%` }}
          >
            <div
              data-dot
              className="tl-node-dot absolute h-3 w-3 rounded-full"
              style={{ left: 0, top: 0, transform: 'translate(-50%,-50%)', background: 'rgba(236,234,244,0.25)' }}
            />
            <div
              data-label
              className="tl-label absolute left-6 top-0 w-[min(62vw,340px)] md:left-10"
              style={{ transform: 'translateY(-50%)', opacity: 0.28 }}
            >
              <div className="eyebrow" style={{ letterSpacing: '0.3em' }}>
                {n.year}
              </div>
              <div className="mt-2 text-xl font-semibold md:text-2xl">{n.label}</div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
                {n.desc}
              </p>
            </div>
          </div>
        ))}

        {/* headline pinned in the stage */}
        <div className="pointer-events-none absolute left-[6%] top-[6%] max-w-md md:left-[8%]">
          <p className="eyebrow">The engine</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            One decision.
            <br />
            A thousand
            <br />
            simulated lives.
          </h2>
        </div>

        <div className="pointer-events-none absolute bottom-[5%] left-[6%] md:left-[8%]">
          <p className="text-xs uppercase" style={{ letterSpacing: '0.35em', color: 'var(--ink-faint)' }}>
            Keep scrolling — travel the beam
          </p>
        </div>
      </div>
    </section>
  );
}
