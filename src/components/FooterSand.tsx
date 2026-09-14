"use client";

import { useEffect, useRef } from "react";

type Grain = { x: number; y: number; r: number; a: number };

function buildPile(width: number, height: number): Grain[] {
  const grains: Grain[] = [];
  const count = Math.min(2200, Math.floor(width * 1.6));

  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const nx = (x / width) * 2 - 1;

    // Irregular dune profile — higher in the center, uneven edges
    const dune =
      height *
      (0.22 +
        0.55 * Math.exp(-nx * nx * 1.8) +
        0.18 * Math.exp(-((nx + 0.55) ** 2) * 8) +
        0.14 * Math.exp(-((nx - 0.62) ** 2) * 7));

    // Bias strongly toward the floor so grains "collect"
    const t = Math.random() ** 0.35;
    const y = height - t * dune - Math.random() * 2;

    grains.push({
      x,
      y,
      r: 0.45 + Math.random() * 1.35,
      a: 0.22 + Math.random() * 0.55,
    });
  }

  // A few loose grains above the pile
  for (let i = 0; i < Math.floor(width * 0.08); i++) {
    grains.push({
      x: Math.random() * width,
      y: height * (0.35 + Math.random() * 0.4),
      r: 0.4 + Math.random() * 0.9,
      a: 0.08 + Math.random() * 0.18,
    });
  }

  return grains;
}

export function FooterSand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let grains: Grain[] = [];
    let raf = 0;

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (width < 2 || height < 2) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      grains = buildPile(width, height);
      for (const g of grains) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(236, 232, 218, ${g.a})`;
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    });
    ro.observe(parent);
    paint();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="footer-sand-canvas" aria-hidden />;
}
