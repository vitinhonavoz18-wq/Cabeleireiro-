"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export type LogoRevealProps = {
  src?: string;
  alt?: string;
  duration?: number;
  hold?: number;
  background?: string;
  showOncePerSession?: boolean;
  onComplete?: () => void;
};

const SESSION_KEY = "psekpisos-intro-seen";

export function LogoReveal({
  src = "/brand/logo.png",
  alt = "PsekPisos",
  hold = 500,
  background = "#0B0B0C",
  showOncePerSession = true,
  onComplete,
}: LogoRevealProps) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"draw" | "fill" | "hold" | "out" | "done">("draw");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (showOncePerSession && sessionStorage.getItem(SESSION_KEY)) {
      setPhase("done");
      onComplete?.();
      return;
    }
    setVisible(true);
    if (showOncePerSession) sessionStorage.setItem(SESSION_KEY, "1");

    const drawMs = reduce ? 200 : 1400;
    const fillMs = reduce ? 200 : 550;
    const holdMs = reduce ? 200 : hold;
    const outMs = reduce ? 200 : 500;

    const t1 = setTimeout(() => setPhase("fill"), drawMs);
    const t2 = setTimeout(() => setPhase("hold"), drawMs + fillMs);
    const t3 = setTimeout(() => setPhase("out"), drawMs + fillMs + holdMs);
    const t4 = setTimeout(() => {
      setPhase("done");
      setVisible(false);
      onComplete?.();
    }, drawMs + fillMs + holdMs + outMs);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [reduce, hold, showOncePerSession, onComplete]);

  const drawing = phase === "draw";
  const filled = phase === "fill" || phase === "hold" || phase === "out";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="logo-reveal"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === "out" ? 0 : 1,
            scale: phase === "out" ? 1.04 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] grid place-items-center"
          style={{ background }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <div
              className="relative"
              style={{ width: "min(48vw, 260px)", aspectRatio: "1 / 1" }}
            >
              {/* SVG auxiliar (path draw) */}
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full"
                initial={false}
                animate={{ opacity: filled ? 0 : 1 }}
                transition={{ duration: 0.35, delay: filled ? 0.05 : 0 }}
              >
                <defs>
                  <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF9E0" />
                    <stop offset="45%" stopColor="#FFC72C" />
                    <stop offset="100%" stopColor="#A97900" />
                  </linearGradient>
                  <linearGradient id="goldFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFE07A" />
                    <stop offset="55%" stopColor="#F5B301" />
                    <stop offset="100%" stopColor="#7A5800" />
                  </linearGradient>
                </defs>

                {/* Distintivo estilizado no espírito do "P" da marca */}
                {mockPaths.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    fill="url(#goldFill)"
                    stroke="url(#goldStroke)"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    initial={{
                      pathLength: 0,
                      fillOpacity: 0,
                      strokeOpacity: 1,
                    }}
                    animate={{
                      pathLength: drawing ? [0, 1] : 1,
                      fillOpacity: drawing ? 0 : 1,
                      strokeOpacity: drawing ? 1 : 0,
                    }}
                    transition={{
                      pathLength: {
                        duration: reduce ? 0.2 : 1.15,
                        delay: reduce ? 0 : i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      fillOpacity: { duration: 0.45, delay: reduce ? 0 : 0.05 },
                      strokeOpacity: { duration: 0.35, delay: reduce ? 0 : 0.12 },
                    }}
                  />
                ))}
              </motion.svg>

              {/* Logo raster real (crossfade final) */}
              <motion.img
                src={src}
                alt={alt}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(245,179,1,0.25)]"
                initial={{ opacity: 0, scale: 0.98, y: 6 }}
                animate={{
                  opacity: filled ? 1 : 0,
                  scale: filled ? 1 : 0.98,
                  y: filled ? 0 : 6,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onError={(e) => {
                  // Falha silenciosa: mantém o vetor auxiliar como fallback
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: filled ? 1 : 0, y: filled ? 0 : 6 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs uppercase tracking-[0.4em] text-gold-300/70"
            >
              Sinteco Premium
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Caminhos aproximados que evocam o "P" do distintivo — usados apenas
// durante o traçado. Fidelidade final vem do PNG original.
const mockPaths = [
  // corpo do P (barra vertical + curva superior)
  "M70 40 L70 160 L92 160 L92 118 L118 118 C150 118 168 100 168 79 C168 58 150 40 118 40 Z M92 60 L118 60 C138 60 148 68 148 79 C148 90 138 98 118 98 L92 98 Z",
  // base/plataforma inferior
  "M40 168 L180 168 L172 182 L48 182 Z",
];
