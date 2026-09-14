"use client";

import { useEffect, useRef } from "react";

type Grain = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
};

const PILE_COLS = 240;
const PILE_MAX = 96;

function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

export function HourglassSand() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!root || !stage || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const grains: Grain[] = [];
    const maxGrains = 1000;
    const pile = new Float32Array(PILE_COLS);

    const neckN = { x: 0.463, y: 0.438 };
    const bowlN = { cx: 0.463, cy: 0.73 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Artwork point → canvas/hero pixel space. */
    const artToCanvas = (nx: number, ny: number) => {
      const canvasRect = canvas.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const art = 719 / 1009;
      const sw = stageRect.width;
      const sh = stageRect.height;
      let dw = sw;
      let dh = sh;
      let ox = 0;
      let oy = 0;
      if (sw / sh > art) {
        dw = sh * art;
        ox = (sw - dw) / 2;
      } else {
        dh = sw / art;
      }
      return {
        x: stageRect.left - canvasRect.left + ox + nx * dw,
        y: stageRect.top - canvasRect.top + oy + ny * dh,
      };
    };

    const terminalTop = () => {
      const frame = document.querySelector(".hero-stage-frame");
      if (!frame) return null;
      const canvasRect = canvas.getBoundingClientRect();
      const fr = frame.getBoundingClientRect();
      return {
        top: fr.top - canvasRect.top,
        left: fr.left - canvasRect.left,
        width: fr.width,
      };
    };

    const pileCol = (x: number, termLeft: number, termWidth: number) => {
      const t = (x - termLeft) / termWidth;
      if (t < 0 || t > 1) return -1;
      return Math.min(PILE_COLS - 1, Math.max(0, Math.floor(t * PILE_COLS)));
    };

    const pileHeightAt = (col: number) => {
      if (col < 0 || col >= PILE_COLS) return 0;
      const l = pile[Math.max(0, col - 1)];
      const c = pile[col];
      const r = pile[Math.min(PILE_COLS - 1, col + 1)];
      return (l + c * 2.4 + r) / 4.4;
    };

    const deposit = (col: number, amount: number) => {
      if (col < 0) return;
      const add = (i: number, a: number) => {
        if (i < 0 || i >= PILE_COLS) return;
        pile[i] = Math.min(PILE_MAX, pile[i] + a);
      };
      add(col, amount);
      add(col - 1, amount * 0.45);
      add(col + 1, amount * 0.45);
      add(col - 2, amount * 0.22);
      add(col + 2, amount * 0.22);
      add(col - 3, amount * 0.1);
      add(col + 3, amount * 0.1);
      add(col - 4, amount * 0.04);
      add(col + 4, amount * 0.04);
    };

    const spawn = (burst = 1) => {
      for (let i = 0; i < burst; i++) {
        if (grains.length >= maxGrains) grains.shift();
        const p = artToCanvas(
          neckN.x + (Math.random() - 0.5) * 0.028,
          neckN.y + Math.random() * 0.01,
        );
        grains.push({
          x: p.x,
          y: p.y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: 0.55 + Math.random() * 0.85,
          size:
            Math.random() < 0.7
              ? 0.7 + Math.random() * 0.7
              : 1.15 + Math.random() * 0.85,
          life: 0,
          maxLife: 5.5 + Math.random() * 3.5,
        });
      }
    };

    const drawPile = (
      term: { top: number; left: number; width: number },
      w: number,
    ) => {
      const baseY = term.top + 4;

      for (let c = 0; c < PILE_COLS; c++) {
        const h = pileHeightAt(c);
        if (h < 0.8) continue;
        const x0 = term.left + ((c + 0.5) / PILE_COLS) * term.width;
        if (x0 < -8 || x0 > w + 8) continue;

        const layers = Math.max(5, Math.ceil(h * 3.2));
        for (let j = 0; j < layers; j++) {
          const n = hash(c * 97.1 + j * 13.7);
          const n2 = hash(c * 41.3 + j * 29.9 + 3.1);
          const x = x0 + (n - 0.5) * (term.width / PILE_COLS) * 2.2;
          const y = baseY - (j / layers) * h + (n2 - 0.5) * 1.3;
          const size = 0.7 + n * 1.55;
          const alpha = 0.42 + (1 - j / layers) * 0.52;
          ctx.fillStyle = `rgba(236, 232, 218, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        for (let s = 0; s < 4; s++) {
          const n = hash(c * 17.3 + s * 9.1 + 8);
          if (n > 0.5) continue;
          ctx.fillStyle = `rgba(236, 232, 218, ${0.22 + n * 0.4})`;
          ctx.beginPath();
          ctx.arc(
            x0 + (n - 0.5) * 7,
            baseY + 1 + n * 12,
            0.55 + n * 1.2,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
    };

    const tick = () => {
      if (!running) return;
      const { width: w, height: h } = canvas.getBoundingClientRect();
      const bowl = artToCanvas(bowlN.cx, bowlN.cy);
      const term = terminalTop();

      spawn(Math.random() < 0.7 ? 3 : 2);
      if (Math.random() < 0.45) spawn(4);

      ctx.clearRect(0, 0, w, h);

      for (let i = grains.length - 1; i >= 0; i--) {
        const g = grains[i];
        g.life += 0.016;
        g.vy += 0.028 + Math.random() * 0.014;
        g.vx += (Math.random() - 0.5) * 0.03;
        if (!term || g.y < term.top - 10) {
          if (g.y < bowl.y + h * 0.08) {
            g.vx += (bowl.x - g.x) * 0.00045;
          }
        }
        g.x += g.vx;
        g.y += g.vy;

        if (term) {
          const col = pileCol(g.x, term.left, term.width);
          if (col >= 0) {
            const surface = term.top + 4 - pileHeightAt(col);
            if (g.y + g.size * 0.4 >= surface) {
              deposit(col, g.size * 1.1);
              grains.splice(i, 1);
              continue;
            }
          }
        }

        if (g.y > h + 20 || g.life > g.maxLife) {
          grains.splice(i, 1);
          continue;
        }

        const alpha = Math.min(0.95, 0.28 + g.vy * 0.28);
        ctx.fillStyle = `rgba(236, 232, 218, ${alpha})`;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (term) drawPile(term, w);

      raf = requestAnimationFrame(tick);
    };

    resize();

    {
      const term = terminalTop();
      const bowl = artToCanvas(bowlN.cx, bowlN.cy);
      if (term) {
        const center = pileCol(bowl.x, term.left, term.width);
        for (let i = -48; i <= 48; i++) {
          const falloff = Math.exp(-(i * i) / 280);
          deposit(center + i, 5.8 * falloff);
        }
        for (let i = -20; i <= 20; i++) {
          const falloff = Math.exp(-(i * i) / 60);
          deposit(center + i, 5.5 * falloff);
        }
        for (let i = -9; i <= 9; i++) {
          const falloff = Math.exp(-(i * i) / 20);
          deposit(center + i, 5 * falloff);
        }
      }
    }

    for (let i = 0; i < 120; i++) spawn(3);
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="hourglass" ref={rootRef} aria-hidden="true">
        <div className="hourglass-stage" ref={stageRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hourglass-img"
            src="/hourglass.png"
            alt=""
            draggable={false}
          />
        </div>
      </div>
      <canvas className="hourglass-canvas" ref={canvasRef} aria-hidden />
    </>
  );
}
