import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

// ── Timing ────────────────────────────────────────────────────────────────
const DRAW_MS  = 1400;  // slow, deliberate left-right sweep
const HOLD_MS  = 400;   // wave sits fully drawn before exiting
const SHOOT_MS = 280;   // quick shoot off right edge

// ── ECG path: 2 beats in a 1000x112 viewBox, baseline y=64 ──────────────
const PATH =
  "M0,64 L145,64 " +
  "L156,59 L163,51 L170,59 " +               // P-wave 1
  "L180,64 L189,7 L200,108 L211,64 " +       // QRS spike 1
  "L222,53 L235,46 L252,64 " +               // T-wave 1
  "L368,64 " +
  "L379,59 L386,51 L393,59 " +               // P-wave 2
  "L403,64 L412,7 L423,108 L434,64 " +       // QRS spike 2
  "L445,53 L458,46 L475,64 " +               // T-wave 2
  "L1000,64";                                  // long flat tail

// QRS spike positions for ripple rings
const SPIKE1_PCT   = 0.20;
const SPIKE2_PCT   = 0.423;
const SPIKE1_DELAY = (DRAW_MS * 0.17) / 1000;
const SPIKE2_DELAY = (DRAW_MS * 0.45) / 1000;

type Phase = "draw" | "hold" | "exit" | "done";

interface Props {
  /** Y-coordinate of the wave baseline, relative to the hero section (nearest positioned ancestor). */
  waveY: number;
  trigger?: number;
  lingerMs?: number; // kept for API compat
}

// ── One set of expanding ripple rings around a spike ──────────────────────
function RippleRings({
  leftPct,
  delay,
  wavelineY,
}: {
  leftPct: string;
  delay: number;
  wavelineY: number;
}) {
  return (
    <>
      {[0, 0.18, 0.36].map((extraDelay, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: wavelineY,
            left: leftPct,
            width: 18 + i * 4,
            height: 18 + i * 4,
            marginLeft: -(9 + i * 2),
            marginTop: -(9 + i * 2),
            borderRadius: "50%",
            border: `${2 - i * 0.4}px solid rgba(56,189,248,${0.9 - i * 0.22})`,
            boxShadow:
              i === 0
                ? "0 0 16px 4px rgba(56,189,248,0.55), inset 0 0 8px rgba(56,189,248,0.2)"
                : "none",
            pointerEvents: "none",
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 8 + i * 3, opacity: 0 }}
          transition={{
            duration: 1.0 + i * 0.18,
            delay: delay + extraDelay,
            ease: [0.2, 0, 0.6, 1],
          }}
        />
      ))}
      {/* Inner flash / plasma burst */}
      <motion.div
        style={{
          position: "absolute",
          top: wavelineY,
          left: leftPct,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #fff 0%, #7dd3fc 50%, transparent 80%)",
          boxShadow:
            "0 0 30px 12px rgba(56,189,248,0.7), 0 0 60px 24px rgba(14,165,233,0.4)",
          pointerEvents: "none",
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 3.5, 0.8, 0], opacity: [0, 1, 0.6, 0] }}
        transition={{
          duration: 0.7,
          delay: delay,
          ease: "easeOut",
        }}
      />
    </>
  );
}

export function HeartbeatWave({ waveY, trigger = 0 }: Props) {
  const [runKey, setRunKey]   = useState(0);
  const [phase, setPhase]     = useState<Phase>("draw");

  const exitPx = typeof window !== "undefined" ? window.innerWidth * 2.5 : 5000;

  // Baseline sits at y=64/112 of the 62 px tall SVG = ~35 px from the top
  const svgTop    = waveY - 35;
  const wavelineY = waveY;

  // ── External trigger resets the loop ───────────────────────────────────
  useEffect(() => {
    setRunKey(trigger * 100_000);
  }, [trigger]);

  // ── Main animation loop ────────────────────────────────────────────────
  useEffect(() => {
    setPhase("draw");

    const t1 = setTimeout(() => setPhase("hold"),  DRAW_MS);
    const t2 = setTimeout(() => setPhase("exit"),  DRAW_MS + HOLD_MS);
    const t3 = setTimeout(() => setPhase("done"),  DRAW_MS + HOLD_MS + SHOOT_MS);

    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [runKey]);

  // Don't render until we have a valid Y measurement
  if (waveY <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 15,
        overflow: "visible",
      }}
    >
      {/* ── Wave SVG container ── */}
      <motion.div
        key={`wave-${runKey}`}
        style={{
          position:        "absolute",
          left:            0,
          right:           0,
          top:             svgTop,
          height:          62,
          transformOrigin: "0% 50%",
          pointerEvents:   "none",
        }}
        animate={{
          x:      (phase === "exit" || phase === "done") ? exitPx : 0,
          scaleX: phase === "exit" ? 1.35 : 1,
        }}
        transition={{
          x: phase === "exit"
            ? { duration: SHOOT_MS / 1000, ease: [0.55, 0, 1, 0.45] }
            : { duration: 0 },
          scaleX: phase === "exit"
            ? { duration: SHOOT_MS / 1000, ease: [0.4, 0, 1, 0.6] }
            : { duration: 0 },
        }}
      >
        <svg
          viewBox="0 0 1000 112"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
        >
          <defs>
            <linearGradient id={`hbGrad-${runKey}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0"    />
              <stop offset="5%"   stopColor="#0ea5e9" stopOpacity="0.94" />
              <stop offset="35%"  stopColor="#38bdf8" stopOpacity="1"    />
              <stop offset="65%"  stopColor="#67e8f9" stopOpacity="0.95" />
              <stop offset="88%"  stopColor="#a5f3fc" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#e0f7fa" stopOpacity="0.04" />
            </linearGradient>

            {/* Outer bloom */}
            <filter id={`hbAura-${runKey}`} x="-5%" y="-350%" width="110%" height="800%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            {/* Tight glow */}
            <filter id={`hbGlow-${runKey}`} x="-5%" y="-220%" width="110%" height="540%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer bloom aura */}
          <motion.path
            d={PATH} stroke="#38bdf8" strokeWidth="22" strokeOpacity="0.09"
            fill="none" strokeLinecap="round" strokeLinejoin="round"
            filter={`url(#hbAura-${runKey})`}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: DRAW_MS / 1000, ease: [0.15, 0, 0.85, 1] }}
          />

          {/* Mid glow halo */}
          <motion.path
            d={PATH} stroke="#38bdf8" strokeWidth="10" strokeOpacity="0.38"
            fill="none" strokeLinecap="round" strokeLinejoin="round"
            filter={`url(#hbGlow-${runKey})`}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: DRAW_MS / 1000, ease: [0.15, 0, 0.85, 1] }}
          />

          {/* Crisp gradient main stroke */}
          <motion.path
            d={PATH} stroke={`url(#hbGrad-${runKey})`} strokeWidth="4.5"
            fill="none" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: DRAW_MS / 1000, ease: [0.15, 0, 0.85, 1] }}
          />

          {/* White-hot core */}
          <motion.path
            d={PATH} stroke="rgba(255,255,255,0.75)" strokeWidth="1.3"
            fill="none" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: DRAW_MS / 1000, ease: [0.15, 0, 0.85, 1] }}
          />
        </svg>
      </motion.div>

      {/* ── Plasma comet — rides the drawing tip ── */}
      {phase === "draw" && (
        <motion.div
          key={`comet-${runKey}`}
          style={{
            position:   "absolute",
            top:        wavelineY,
            left:       0,
            width:      16,
            height:     16,
            marginLeft: -8,
            marginTop:  -8,
            borderRadius: "50%",
            background: "radial-gradient(circle, #fff 0%, #38bdf8 42%, rgba(14,165,233,0.3) 75%, transparent 100%)",
            boxShadow: [
              "0 0 28px 10px rgba(56,189,248,0.85)",
              "0 0 60px 22px rgba(56,189,248,0.45)",
              "0 0 100px 40px rgba(14,165,233,0.22)",
            ].join(", "),
            pointerEvents: "none",
          }}
          initial={{ x: "-2vw", opacity: 0 }}
          animate={{ x: "103vw", opacity: [0, 1, 1, 1, 0.7] }}
          transition={{ duration: DRAW_MS / 1000, ease: [0.15, 0, 0.85, 1] }}
        />
      )}

      {/* ── Chromatic ghost comet (red channel lag) ── */}
      {phase === "draw" && (
        <motion.div
          key={`ghost-${runKey}`}
          style={{
            position:   "absolute",
            top:        wavelineY,
            left:       0,
            width:      10,
            height:     10,
            marginLeft: -5,
            marginTop:  -5,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239,68,68,0.6) 0%, transparent 70%)",
            boxShadow: "0 0 20px 8px rgba(239,68,68,0.3)",
            pointerEvents: "none",
          }}
          initial={{ x: "-2vw" }}
          animate={{ x: "103vw" }}
          transition={{
            duration: DRAW_MS / 1000,
            ease: [0.15, 0, 0.85, 1],
            delay: 0.018,
          }}
        />
      )}

      {/* ── Ripple rings at QRS spike 1 (~20% of width) ── */}
      {phase === "draw" && (
        <RippleRings
          key={`r1-${runKey}`}
          leftPct={`${SPIKE1_PCT * 100}%`}
          delay={SPIKE1_DELAY}
          wavelineY={wavelineY}
        />
      )}

      {/* ── Ripple rings at QRS spike 2 (~42.3% of width) ── */}
      {phase === "draw" && (
        <RippleRings
          key={`r2-${runKey}`}
          leftPct={`${SPIKE2_PCT * 100}%`}
          delay={SPIKE2_DELAY}
          wavelineY={wavelineY}
        />
      )}
    </div>
  );
}
