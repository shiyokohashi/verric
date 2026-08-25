"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { TerminalDemo } from "./TerminalDemo";

type SignalKind =
  | "stat"
  | "score"
  | "ev"
  | "analyst"
  | "deal"
  | "tag"
  | "chip"
  | "label"
  | "label-signal"
  | "body";

type Signal = {
  id: string;
  kind: SignalKind;
  label?: string;
  value: string;
  tone?: "amber" | "red";
  /** Start X within the safe band (0–1, left → right). */
  slotX: number;
  /** Start Y within the safe band (0–1, just under copy → just above card). */
  slotY: number;
  mobile?: boolean;
};

const SIGNALS_END = 0.4;
const TERMINAL_RISE = 0.22;
const TERMINAL_CRISP = 0.58;
const DRIFT_END = 0.34;
const DOCK_START = DRIFT_END * 0.85;
const COPY_GONE_AT = TERMINAL_RISE * 0.35;

/*
 * Scattered starts. Edges sit a bit higher (hero copy is centered);
 * neighbors kept apart so labels don’t stack.
 */
const SIGNALS: Signal[] = [
  // Left flank — can ride higher
  {
    id: "title",
    kind: "label",
    value: "Verric Terminal",
    slotX: 0.08,
    slotY: 0.22,
  },
  {
    id: "live",
    kind: "stat",
    label: "Live deals",
    value: "5",
    slotX: 0.18,
    slotY: 0.42,
    mobile: true,
  },
  {
    id: "juniper",
    kind: "deal",
    value: "Project Juniper",
    slotX: 0.04,
    slotY: 0.55,
    mobile: true,
  },
  {
    id: "forge",
    kind: "deal",
    value: "Project Forge",
    slotX: 0.1,
    slotY: 0.82,
  },
  // Center-left
  {
    id: "ev",
    kind: "ev",
    value: "$52M EV",
    slotX: 0.3,
    slotY: 0.36,
    mobile: true,
  },
  {
    id: "hearth",
    kind: "deal",
    value: "Project Hearth",
    slotX: 0.24,
    slotY: 0.57,
  },
  {
    id: "forge-ev",
    kind: "ev",
    value: "$104M EV",
    slotX: 0.32,
    slotY: 0.78,
  },
  // Center — stay lower under the headline
  {
    id: "diligence",
    kind: "stat",
    label: "In diligence",
    value: "2",
    slotX: 0.02,
    slotY: 0.02,
    mobile: true,
  },
  {
    id: "analyst-label",
    kind: "label-signal",
    value: "Firm analyst",
    slotX: 0.48,
    slotY: 0.92,
  },
  // Center-right
  {
    id: "rule-35",
    kind: "analyst",
    value: "35% rule",
    slotX: 0.92,
    slotY: 0.02,
  },
  {
    id: "hearth-ev",
    kind: "ev",
    value: "$78M EV",
    slotX: 0.62,
    slotY: 0.42,
  },
  {
    id: "analyst",
    kind: "analyst",
    value: "57% concentration",
    slotX: 0.58,
    slotY: 0.72,
    mobile: true,
  },
  {
    id: "hearth-score",
    kind: "score",
    value: "48 · Pass (draft)",
    slotX: 0.66,
    slotY: 0.94,
  },
  // Right flank — can ride higher
  {
    id: "rules",
    kind: "stat",
    label: "Firm rules active",
    value: "6",
    slotX: 0.84,
    slotY: 0.28,
    mobile: true,
  },
  {
    id: "score",
    kind: "score",
    value: "82 · Pursue",
    slotX: 0.78,
    slotY: 0.5,
    mobile: true,
  },
  {
    id: "juniper-tag",
    kind: "tag",
    value: "Due diligence",
    tone: "amber",
    slotX: 0.94,
    slotY: 0.4,
  },
  {
    id: "forge-score",
    kind: "score",
    value: "79 · Pursue",
    slotX: 0.82,
    slotY: 0.7,
    mobile: true,
  },
  {
    id: "forge-tag",
    kind: "tag",
    value: "Due diligence",
    tone: "amber",
    slotX: 0.99,
    slotY: 0.72,
  },
  {
    id: "hearth-tag",
    kind: "tag",
    value: "Needs review",
    tone: "red",
    slotX: 0.88,
    slotY: 0.88,
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

function SignalFragment({
  signal,
  progress,
  stageRef,
  stickyRef,
}: {
  signal: Signal;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  stageRef: RefObject<HTMLDivElement | null>;
  stickyRef: RefObject<HTMLDivElement | null>;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const startCache = useRef<{ x: number; y: number } | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(1);

  const measureStart = (el: HTMLDivElement, sticky: HTMLDivElement) => {
    const stickyRect = sticky.getBoundingClientRect();

    // Resting layout only — ignore the rising Terminal so starts stay fixed.
    const stageRestH = stickyRect.height * 0.72;
    const restingTermTop = stickyRect.bottom - stageRestH * 0.3 + 12;
    const restingCopyBottom = stickyRect.top + stickyRect.height * 0.48;

    const padX = Math.max(16, stickyRect.width * 0.03);
    const padTop = 40;
    const padBottom = 18;
    const safeLeft = stickyRect.left + padX;
    const safeRight = stickyRect.right - padX;
    const safeTop = Math.min(restingCopyBottom + padTop, restingTermTop - 100);
    const safeBottom = restingTermTop - padBottom;
    const flank = Math.min(1, Math.abs(signal.slotX - 0.5) * 2);
    const flankLift = flank * flank * 48;
    const localTop = safeTop - flankLift;
    const safeW = Math.max(80, safeRight - safeLeft);
    const safeH = Math.max(56, safeBottom - localTop);

    const elW = el.offsetWidth;
    const elH = el.offsetHeight;
    const maxX = Math.max(0, safeW - elW);
    const maxY = Math.max(0, safeH - elH);
    // Store as offsets from the sticky top-left (stable while pinned).
    return {
      x: safeLeft + signal.slotX * maxX - stickyRect.left,
      y: localTop + signal.slotY * maxY - stickyRect.top,
    };
  };

  const sync = (p: number) => {
    const stage = stageRef.current;
    const sticky = stickyRef.current;
    const el = elRef.current;
    if (!stage || !sticky || !el) return;

    const stickyRect = sticky.getBoundingClientRect();

    if (!startCache.current) {
      startCache.current = measureStart(el, sticky);
    }
    const startX = startCache.current.x;
    const startY = startCache.current.y;

    const target = stage.querySelector(
      `[data-signal-target="${signal.id}"]`,
    ) as HTMLElement | null;

    let endX = startX;
    let endY = startY;
    if (target) {
      const tRect = target.getBoundingClientRect();
      endX = tRect.left - stickyRect.left;
      endY = tRect.top - stickyRect.top;
    }

    const t = easeInOut(Math.min(1, Math.max(0, p / DRIFT_END)));
    x.set(lerp(startX, endX, t));
    y.set(lerp(startY, endY, t));

    if (p < DOCK_START) opacity.set(1);
    else if (p >= SIGNALS_END) opacity.set(0);
    else opacity.set(1 - (p - DOCK_START) / (SIGNALS_END - DOCK_START));
  };

  useMotionValueEvent(progress, "change", sync);

  useEffect(() => {
    const run = () => sync(progress.get());
    const onResize = () => {
      startCache.current = null;
      run();
    };
    run();
    const raf = requestAnimationFrame(() => {
      if (progress.get() < 0.02) {
        startCache.current = null;
        run();
      }
    });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- measure against live DOM
  }, [progress, signal.id]);

  return (
    <motion.div
      ref={elRef}
      className={[
        "hero-signal",
        `hero-signal-${signal.kind}`,
        signal.tone ? `hero-signal-tone-${signal.tone}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ x, y, opacity }}
      aria-hidden="true"
    >
      {signal.label ? (
        <span className="hero-signal-label">{signal.label}</span>
      ) : null}
      <span className="hero-signal-value">{signal.value}</span>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [copyGone, setCopyGone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const v = scrollYProgress.get();
    setTerminalOpen(v >= TERMINAL_RISE);
    setCopyGone(v >= COPY_GONE_AT);
    applyTerminalReveal(v);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setTerminalOpen(v >= TERMINAL_RISE);
    // Latch: once faded out, stay gone until back at the top (avoids progress jitter flash).
    if (v >= COPY_GONE_AT) setCopyGone(true);
    else if (v < 0.02) setCopyGone(false);
    applyTerminalReveal(v);
  });

  function applyTerminalReveal(p: number) {
    const terminal = stageRef.current?.querySelector(
      ".terminal-demo",
    ) as HTMLElement | null;
    if (!terminal) return;

    // Non-floating copy fades in as the card opens.
    const ink =
      p <= TERMINAL_RISE
        ? 0
        : p >= SIGNALS_END
          ? 1
          : easeInOut((p - TERMINAL_RISE) / (SIGNALS_END - TERMINAL_RISE));

    // Docked signal slots appear only as fragments land and dissolve.
    const dock =
      p <= DOCK_START
        ? 0
        : p >= SIGNALS_END
          ? 1
          : easeInOut((p - DOCK_START) / (SIGNALS_END - DOCK_START));

    terminal.style.setProperty("--terminal-ink", String(ink));
    terminal.style.setProperty("--signal-dock", String(dock));
  }

  const signals = compact ? SIGNALS.filter((s) => s.mobile) : SIGNALS;

  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, COPY_GONE_AT],
    [1, 0.7, 0],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0.02, COPY_GONE_AT],
    [0, -16],
  );

  const stageHeight = useTransform(
    scrollYProgress,
    [0, TERMINAL_RISE, TERMINAL_CRISP],
    ["72%", "88%", "100%"],
  );
  const peekHeight = useTransform(
    scrollYProgress,
    [0, TERMINAL_RISE, TERMINAL_CRISP, 1],
    ["30%", "72%", "100%", "100%"],
  );
  const peekPadTop = useTransform(scrollYProgress, (p) => {
    if (p <= TERMINAL_RISE) return 0;
    const t = easeInOut(
      Math.min(1, (p - TERMINAL_RISE) / (TERMINAL_CRISP - TERMINAL_RISE)),
    );
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const termH = Math.min(vh * 0.52, 34 * 16);
    // Clear the sticky header, then center the Terminal in the viewport.
    const header = 72;
    const centered = (vh - termH) / 2;
    return (centered < header ? header : centered) * t;
  });
  const peekPadBottom = useTransform(scrollYProgress, (p) => {
    if (p <= TERMINAL_RISE) return 0;
    const t = easeInOut(
      Math.min(1, (p - TERMINAL_RISE) / (TERMINAL_CRISP - TERMINAL_RISE)),
    );
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const termH = Math.min(vh * 0.52, 34 * 16);
    const header = 72;
    const centered = (vh - termH) / 2;
    const top = centered < header ? header : centered;
    // Keep vertical balance so the card sits mid-page, not pinned to the top.
    const bottom = Math.max(24, vh - termH - top);
    return bottom * t;
  });
  const peekFadeOpacity = useTransform(
    scrollYProgress,
    [TERMINAL_RISE, 0.4],
    [1, 0],
  );
  const terminalY = useTransform(
    scrollYProgress,
    [0, TERMINAL_RISE, TERMINAL_CRISP],
    ["4%", "1%", "0%"],
  );
  const terminalScale = useTransform(
    scrollYProgress,
    [0, TERMINAL_RISE, TERMINAL_CRISP],
    [0.94, 0.98, 1],
  );
  const hintOpacity = useTransform(
    scrollYProgress,
    [0, TERMINAL_RISE - 0.04, TERMINAL_RISE],
    [1, 0.5, 0],
  );

  if (reduceMotion) {
    return (
      <section id="top" className="hero-scroll band-cream hero-static">
        <div className="hero-sticky">
          <div className="hero-copy hero-copy-static">
            <p className="hero-kicker">Deal intelligence for private markets</p>
            <h1>
              Screen every opportunity.
              <br />
              Run every deal. Preserve every decision.
            </h1>
            <div className="hero-ctas">
              <a
                href="#book-walkthrough"
                className="btn btn-primary hero-cta-primary"
              >
                Book a walkthrough
              </a>
              <a href="#product" className="hero-cta-link">
                See the Terminal →
              </a>
            </div>
          </div>
          <div className="hero-stage-area">
            <div className="hero-peek hero-peek-static">
              <div className="hero-terminal-wrap static">
                <TerminalDemo />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      ref={containerRef}
      className={`hero-scroll band-cream${compact ? " is-compact" : ""}`}
    >
      <div
        ref={stickyRef}
        className={`hero-sticky${terminalOpen ? " is-terminal" : ""}`}
      >
        <div className="hero-stage-glow" aria-hidden="true" />

        <motion.div
          className="hero-copy"
          style={{
            opacity: copyGone ? 0 : copyOpacity,
            y: copyY,
            visibility: copyGone ? "hidden" : "visible",
            pointerEvents: copyGone ? "none" : "auto",
          }}
          aria-hidden={copyGone}
        >
          <p className="hero-kicker">Deal intelligence for private markets</p>
          <h1>
            Screen every opportunity.
            <br />
            Run every deal. Preserve every decision.
          </h1>
          <div className="hero-ctas">
            <a
              href="#book-walkthrough"
              className="btn btn-primary hero-cta-primary"
            >
              Book a walkthrough
            </a>
            <a href="#product" className="hero-cta-link">
              See the Terminal →
            </a>
          </div>
        </motion.div>

        <motion.div
          ref={stageRef}
          className="hero-stage-area"
          style={{ height: stageHeight }}
        >
          <motion.div
            className="hero-peek"
            style={{
              height: peekHeight,
              paddingTop: peekPadTop,
              paddingBottom: peekPadBottom,
              paddingLeft: "var(--pad)",
              paddingRight: "var(--pad)",
            }}
            aria-hidden={!terminalOpen}
          >
            <motion.div
              className="hero-peek-fade"
              style={{ opacity: peekFadeOpacity }}
              aria-hidden="true"
            />
            <motion.div
              className="hero-terminal-wrap"
              style={{
                y: terminalY,
                scale: terminalScale,
              }}
            >
              <div className="hero-terminal-shell">
                <TerminalDemo />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="hero-signals">
          {signals.map((signal) => (
            <SignalFragment
              key={signal.id}
              signal={signal}
              progress={scrollYProgress}
              stageRef={stageRef}
              stickyRef={stickyRef}
            />
          ))}
        </div>

        <motion.p
          className="hero-scroll-hint"
          style={{ opacity: hintOpacity }}
          aria-hidden="true"
        >
          Scroll to open the Terminal
        </motion.p>
      </div>
    </section>
  );
}
