'use client';

import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  tw: number;
  sp: number;
  hue: number;
};

type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

/**
 * Infinite starfield pinned behind the whole page.
 * Scrolling drives a slow camera push-in (the "zoom through futures" feel);
 * the mouse adds a gentle parallax drift. Stars near the camera streak
 * outward as the zoom grows, like a soft warp drive.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let t = 0;
    let nextMeteor = 4;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      const count = Math.min(460, Math.floor((w * h) / 3600));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.pow(Math.random(), 1.6),
        r: 0.4 + Math.random() * 1.7,
        tw: Math.random() * Math.PI * 2,
        sp: 0.5 + Math.random() * 1.6,
        hue: Math.random(),
      }));
    };

    const onMouse = (e: MouseEvent) => {
      mouse.tx = e.clientX / w - 0.5;
      mouse.ty = e.clientY / h - 0.5;
    };

    const nebula = (x: number, y: number, r: number, color: string, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${color},${alpha})`);
      g.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    const frame = () => {
      t += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      const maxScroll = Math.max(document.documentElement.scrollHeight - h, 1);
      const p = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const zoom = reduced ? 1 : 1 + p * 0.5;

      ctx.clearRect(0, 0, w, h);

      // deep-space color washes
      nebula(w * 0.22, h * 0.3, Math.max(w, h) * 0.5, '76,58,160', 0.16);
      nebula(w * 0.82, h * 0.66, Math.max(w, h) * 0.55, '24,60,120', 0.14);
      nebula(w * 0.55, h * 0.95, Math.max(w, h) * 0.45, '120,40,90', 0.07);

      const cx = w / 2;
      const cy = h / 2;

      for (const s of stars) {
        const zz = 0.35 + s.z * zoom;
        const x = cx + (s.x - cx + mouse.x * 90 * s.z) * zz;
        const y = cy + (s.y - cy + mouse.y * 90 * s.z) * zz;
        if (x < -30 || x > w + 30 || y < -30 || y > h + 30) continue;
        const tw = reduced ? 0.85 : 0.55 + 0.45 * Math.sin(t * s.sp + s.tw);
        const a = (0.2 + 0.8 * s.z) * tw;
        const r = s.r * (0.55 + s.z) * (0.75 + 0.45 * p);
        const col = s.hue < 0.1 ? '255,214,170' : s.hue < 0.28 ? '178,168,255' : '232,236,255';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${a.toFixed(3)})`;
        ctx.fill();
        // warp streaks on the nearest stars as the camera pushes in
        if (!reduced && s.z > 0.8 && p > 0.12) {
          ctx.strokeStyle = `rgba(${col},${(a * 0.4).toFixed(3)})`;
          ctx.lineWidth = Math.max(r * 0.55, 0.4);
          ctx.beginPath();
          ctx.moveTo(cx + (s.x - cx) * zz * 0.972, cy + (s.y - cy) * zz * 0.972);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }

      // occasional shooting star
      if (!reduced) {
        t >= nextMeteor && meteors.push(spawnMeteor());
        if (t >= nextMeteor) nextMeteor = t + 5 + Math.random() * 7;
        meteors = meteors.filter((m) => m.life < m.max);
        for (const m of meteors) {
          m.life += 0.016;
          m.x += m.vx;
          m.y += m.vy;
          const k = 1 - m.life / m.max;
          const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
          grad.addColorStop(0, `rgba(240,242,255,${(0.85 * k).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(240,242,255,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const spawnMeteor = (): Meteor => {
      const fromLeft = Math.random() < 0.5;
      const x = fromLeft ? -40 : w * (0.3 + Math.random() * 0.7);
      const y = h * Math.random() * 0.45;
      const speed = 7 + Math.random() * 5;
      return {
        x,
        y,
        vx: (fromLeft ? 1 : -0.4) * speed,
        vy: speed * 0.45,
        life: 0,
        max: 0.9 + Math.random() * 0.5,
      };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={ref} className="block h-full w-full" />
    </div>
  );
}
