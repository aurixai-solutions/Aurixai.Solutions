import React from "react";

/* ═══════════════════════════════════════════════════════════════════
   CLOSED-LOOP SVG DIAGRAM
   Three platform nodes in a triangle with labelled curved arrows.
   ═══════════════════════════════════════════════════════════════════ */
function ClosedLoopDiagram() {
  // Node centres (SVG coordinate space 760 × 490)
  const PRISM   = { x: 150, y: 190 };
  const AGENTA  = { x: 610, y: 190 };
  const LATTICE = { x: 380, y: 378 };

  const W = 170; // node width
  const H = 70;  // node height
  const R = 14;  // corner radius

  // Arrow marker id
  const mkId = (c: string) => `arrow-${c}`;

  return (
    <div className="relative rounded-2xl overflow-hidden my-10">
      {/* Dark card background */}
      <div
        style={{
          background: "linear-gradient(145deg, rgba(15,23,42,0.92) 0%, rgba(12,26,46,0.95) 60%, rgba(15,23,42,0.92) 100%)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "16px",
          boxShadow: [
            "0 32px 64px -16px rgba(0,0,0,0.55)",
            "0 16px 32px -8px rgba(0,0,0,0.35)",
            "0 0 0 1px rgba(255,255,255,0.06) inset",
            "0 1px 0 0 rgba(255,255,255,0.20) inset",
            "0 -1px 0 0 rgba(0,0,0,0.2) inset",
            "0 0 80px -20px rgba(14,165,233,0.15)",
          ].join(", "),
        }}
      >
        {/* Top shine strip */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px z-20 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
        />
        {/* Inner surface highlight */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{ borderRadius: "16px", background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, transparent 45%)" }}
        />
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute top-8 left-1/3 w-48 h-24 bg-violet-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-8 right-1/3 w-48 h-24 bg-teal-500/8 rounded-full blur-3xl" />
        </div>

        <svg
          viewBox="0 0 760 490"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full relative z-10"
          style={{ maxHeight: 490 }}
        >
          <defs>
            {/* Arrow markers, one per edge colour */}
            {[
              { id: mkId("sky"),    col: "#38bdf8" },
              { id: mkId("violet"), col: "#a78bfa" },
              { id: mkId("teal"),   col: "#2dd4bf" },
            ].map(({ id, col }) => (
              <marker
                key={id}
                id={id}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L0,10 L10,5 z" fill={col} />
              </marker>
            ))}

            {/* Glow filter */}
            <filter id="nodeGlow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Large "The Loop" title ── */}
          <text
            x="380"
            y="88"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="36"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
            letterSpacing="1"
          >
            The Aurix AI Loop
          </text>

          {/* ── ARROW 1: PRISM → AGENTA (feeds clean data) ── */}
          <path
            d={`M${PRISM.x + W / 2},${PRISM.y + 40 - 6} C${PRISM.x + W / 2 + 60},${PRISM.y + 40 - 55} ${AGENTA.x - W / 2 - 60},${AGENTA.y + 40 - 55} ${AGENTA.x - W / 2},${AGENTA.y + 40 - 6}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeDasharray="0"
            markerEnd={`url(#${mkId("sky")})`}
            opacity="0.8"
          />
          <text
            x="380"
            y={95 + 40}
            textAnchor="middle"
            fill="#7dd3fc"
            fontSize="10"
            fontFamily="system-ui, sans-serif"
            fontStyle="italic"
            opacity="0.9"
          >
            <tspan x="380" dy="0">PRISM governs the data → AGENTA acts on it</tspan>
            <tspan x="380" dy="13">LATTICE protects it all → PRISM validates what comes back</tspan>
          </text>

          {/* ── ARROW 2: AGENTA → LATTICE (generates new data) ── */}
          <path
            d={`M${AGENTA.x + 12},${AGENTA.y + 40 + H / 2} C${AGENTA.x + 50},${AGENTA.y + 40 + 130} ${LATTICE.x + W / 2 + 40},${LATTICE.y + 40 - 60} ${LATTICE.x + W / 2},${LATTICE.y + 40 - 6}`}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="1.8"
            markerEnd={`url(#${mkId("violet")})`}
            opacity="0.8"
          />
          <text
            x="658"
            y={285 + 40}
            textAnchor="middle"
            fill="#c4b5fd"
            fontSize="10"
            fontFamily="system-ui, sans-serif"
            fontStyle="italic"
            opacity="0.9"
          >
            generates new data
          </text>
          <text
            x="658"
            y={298 + 40}
            textAnchor="middle"
            fill="#c4b5fd"
            fontSize="10"
            fontFamily="system-ui, sans-serif"
            fontStyle="italic"
            opacity="0.9"
          >
            &amp; market signals
          </text>

          {/* ── ARROW 3: LATTICE → PRISM (protects data flows) ── */}
          <path
            d={`M${LATTICE.x - W / 2},${LATTICE.y + 40 - 6} C${LATTICE.x - W / 2 - 40},${LATTICE.y + 40 - 60} ${PRISM.x - 50},${PRISM.y + 40 + 130} ${PRISM.x - 12},${PRISM.y + 40 + H / 2}`}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="1.8"
            markerEnd={`url(#${mkId("teal")})`}
            opacity="0.8"
          />
          <text
            x="102"
            y={285 + 40}
            textAnchor="middle"
            fill="#5eead4"
            fontSize="10"
            fontFamily="system-ui, sans-serif"
            fontStyle="italic"
            opacity="0.9"
          >
            protects all
          </text>
          <text
            x="102"
            y={298 + 40}
            textAnchor="middle"
            fill="#5eead4"
            fontSize="10"
            fontFamily="system-ui, sans-serif"
            fontStyle="italic"
            opacity="0.9"
          >
            data flows
          </text>

          {/* ── PRISM NODE ── */}
          <rect
            x={PRISM.x - W / 2}
            y={PRISM.y + 40 - H / 2}
            width={W}
            height={H}
            rx={R}
            fill="rgba(14,165,233,0.15)"
            stroke="#0ea5e9"
            strokeWidth="1.5"
            filter="url(#nodeGlow)"
          />
          <text x={PRISM.x} y={PRISM.y + 40 - 8} textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="2">
            PRISM
          </text>
          <text x={PRISM.x} y={PRISM.y + 40 + 12} textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="system-ui, sans-serif">
            Govern
          </text>
          <text x={PRISM.x} y={PRISM.y + 40 + 26} textAnchor="middle" fill="rgba(125,211,252,0.55)" fontSize="9" fontFamily="system-ui, sans-serif" fontStyle="italic">
            validates &amp; classifies
          </text>

          {/* ── AGENTA NODE ── */}
          <rect
            x={AGENTA.x - W / 2}
            y={AGENTA.y + 40 - H / 2}
            width={W}
            height={H}
            rx={R}
            fill="rgba(139,92,246,0.15)"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            filter="url(#nodeGlow)"
          />
          <text x={AGENTA.x} y={AGENTA.y + 40 - 8} textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="2">
            AGENTA
          </text>
          <text x={AGENTA.x} y={AGENTA.y + 40 + 12} textAnchor="middle" fill="#c4b5fd" fontSize="11" fontFamily="system-ui, sans-serif">
            Act
          </text>
          <text x={AGENTA.x} y={AGENTA.y + 40 + 26} textAnchor="middle" fill="rgba(196,181,253,0.55)" fontSize="9" fontFamily="system-ui, sans-serif" fontStyle="italic">
            drives growth
          </text>

          {/* ── LATTICE NODE ── */}
          <rect
            x={LATTICE.x - W / 2}
            y={LATTICE.y + 40 - H / 2}
            width={W}
            height={H}
            rx={R}
            fill="rgba(13,148,136,0.15)"
            stroke="#0d9488"
            strokeWidth="1.5"
            filter="url(#nodeGlow)"
          />
          <text x={LATTICE.x} y={LATTICE.y + 40 - 8} textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="2">
            LATTICE
          </text>
          <text x={LATTICE.x} y={LATTICE.y + 40 + 12} textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="system-ui, sans-serif">
            Protect
          </text>
          <text x={LATTICE.x} y={LATTICE.y + 40 + 26} textAnchor="middle" fill="rgba(94,234,212,0.55)" fontSize="9" fontFamily="system-ui, sans-serif" fontStyle="italic">
            monitors all three layers
          </text>

          {/* ── Centre "CLOSED LOOP" label ── */}
          <circle cx="380" cy={270 + 40} r="38" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.18)" strokeWidth="1" />
          <text x="380" y={265 + 40} textAnchor="middle" fill="rgba(148,213,252,0.8)" fontSize="8.5" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="2">
            CLOSED
          </text>
          <text x="380" y={278 + 40} textAnchor="middle" fill="rgba(148,213,252,0.8)" fontSize="8.5" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="2">
            LOOP
          </text>
          {/* Mini rotating arrows in the centre circle */}
          {[0, 120, 240].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const cx2 = 380 + 24 * Math.cos(rad);
            const cy2 = 270 + 40 + 24 * Math.sin(rad);
            return (
              <circle key={i} cx={cx2} cy={cy2} r="2.5" fill="rgba(56,189,248,0.45)" />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════════ */
export function ThreePlatformsSection() {
  return (
    <div className="max-w-4xl mx-auto mt-12 mb-8 text-left">

      {/* ─── Eyebrow ─── */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-600 mb-3 text-center">
        Why Three Platforms Are One Company
      </p>

      {/* ─── H2: The Problem ─── */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-snug text-center">
        The Problem No One Has Solved Whole
      </h2>

      <div className="prose prose-slate max-w-none mb-8 text-slate-600 leading-relaxed space-y-4">
        <p>
          Every enterprise runs on a cycle. They <strong className="text-slate-800">collect data</strong>, they{" "}
          <strong className="text-slate-800">protect data</strong>, and they{" "}
          <strong className="text-slate-800">act on data</strong>. Today, these three imperatives are served by
          entirely separate ecosystems — cybersecurity vendors who know nothing about your marketing stack,
          marketing platforms that treat data governance as someone else's problem, and data governance tools
          that exist in a vacuum disconnected from both threat and action.
        </p>
        <p>
          The result: companies spend millions stitching together tools that don't talk to each other,
          creating gaps between them that become the exact attack surfaces, compliance violations, and
          strategic blind spots that cost them everything.
        </p>
        <p
          className="font-semibold text-slate-900 text-lg border-l-4 border-sky-500 pl-4 py-2 rounded-r-xl relative"
          style={{
            background: "linear-gradient(90deg, rgba(14,165,233,0.06) 0%, rgba(255,255,255,0.85) 30%, rgba(248,250,252,0.8) 100%)",
            boxShadow: "0 2px 10px -3px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.5) inset",
          }}
        >
          Aurix closes the loop.
        </p>
      </div>

      {/* ─── Divider ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent my-8" />

      {/* ─── H2: Three Pillars ─── */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-snug text-center">
        The Three Pillars — and Why They're Actually One
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            name: "LATTICE",
            color: "sky",
            borderClass: "border-sky-400",
            bgClass: "bg-sky-50",
            nameClass: "text-sky-700",
            subClass: "text-sky-600",
            sub: "Threat Intelligence & Remediation",
            question: "Is our data safe?",
          },
          {
            name: "PRISM",
            color: "indigo",
            borderClass: "border-indigo-400",
            bgClass: "bg-indigo-50",
            nameClass: "text-indigo-700",
            subClass: "text-indigo-600",
            sub: "Data Governance & Quality",
            question: "Is our data trustworthy?",
          },
          {
            name: "AGENTA",
            color: "violet",
            borderClass: "border-violet-400",
            bgClass: "bg-violet-50",
            nameClass: "text-violet-700",
            subClass: "text-violet-600",
            sub: "Marketing Intelligence & Competitive Reconnaissance",
            question: "Is our data working?",
          },
        ].map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border-l-4 ${p.borderClass} p-5 relative overflow-hidden`}
            style={{
              background: `linear-gradient(165deg, rgba(255,255,255,0.68) 0%, rgba(248,250,252,0.55) 60%, rgba(241,245,249,0.68) 100%)`,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: undefined,
              boxShadow: "0 8px 32px -4px rgba(0,0,0,0.10), 0 2px 8px -2px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(255,255,255,0.35), 0 0 40px -12px rgba(14,165,233,0.08)",
            }}
          >
            {/* Top shine */}
            <div className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)" }} />
            {/* Inner surface highlight */}
            <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 50%)" }} />
            <p className={`text-sm font-bold tracking-widest uppercase mb-1 ${p.nameClass}`}>
              {p.name}
            </p>
            <p className={`text-xs ${p.subClass} mb-3 leading-tight`}>{p.sub}</p>
            <p className="text-slate-700 font-medium text-sm italic">"{p.question}"</p>
          </div>
        ))}
      </div>

      <p className="text-slate-600 leading-relaxed mb-2">
        These aren't three separate questions. They're three phases of the same question every CEO asks every
        morning:
      </p>
      <p
        className="font-semibold text-slate-900 text-base border-l-4 border-slate-400 pl-4 py-2 mb-8 rounded-r-xl relative"
        style={{
          background: "linear-gradient(90deg, rgba(148,163,184,0.06) 0%, rgba(255,255,255,0.85) 30%, rgba(248,250,252,0.8) 100%)",
          boxShadow: "0 2px 10px -3px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.5) inset",
        }}
      >
        "Can I trust what we know, and can I act on it without getting killed?"
      </p>

      {/* ─── H2: The Loop ─── */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-snug text-center">
        The Aurix AI Loop
      </h2>
      <p className="text-slate-500 text-sm mb-4 italic text-center">
        PRISM governs the data → AGENTA acts on it → LATTICE protects it all → PRISM validates what comes back.
      </p>

      {/* SVG diagram replaces ASCII art */}
      <ClosedLoopDiagram />

      <p className="text-slate-600 leading-relaxed mb-8">
        This isn't a portfolio of three products. It's a{" "}
        <strong className="text-slate-900">closed-loop enterprise intelligence system</strong> where each
        platform makes the other two stronger.
      </p>

      {/* ─── Divider ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent my-8" />

      {/* ─── Synergies ─── */}
      {[
        {
          n: "1",
          title: "Lattice Makes Agenta Safe",
          body: "Marketing platforms handle the most sensitive data in the enterprise — customer PII, behavioral tracking, financial transactions, competitive intelligence. Most marketing tools treat security as a checkbox. Lattice doesn't just protect the perimeter; it monitors the data flows between Agenta's 700+ agents, detects anomalous access patterns, and ensures that the competitive reconnaissance Agenta gathers doesn't create liability.",
          pitch: "Your marketing AI is only as safe as its security posture. Ours is the only one that ships with its own threat intelligence layer.",
          color: "sky",
          pitchClass: "text-sky-700 bg-sky-50 border-sky-200",
        },
        {
          n: "2",
          title: "Prism Makes Agenta Honest",
          body: "The number one reason AI marketing decisions fail isn't bad algorithms — it's bad data. Stale CRM records, duplicate contacts, misclassified segments, ungoverned PII flowing into ad platforms. Prism sits between your data sources and Agenta's AI, ensuring that every decision is made on data that's classified, regulation-tagged, quality-scored, and audit-trailed. When Agenta's AI recommends a $500K budget allocation, Prism can tell you the data quality score behind that recommendation.",
          pitch: "We don't just make AI decisions. We make AI decisions you can defend to your board, your auditors, and your regulators.",
          color: "indigo",
          pitchClass: "text-indigo-700 bg-indigo-50 border-indigo-200",
        },
        {
          n: "3",
          title: "Lattice Protects Prism's Crown Jewels",
          body: "Your data governance layer knows where every piece of sensitive data lives — every PII field, every GDPR-regulated record, every SOX-relevant financial metric. That makes your governance layer itself a high-value target. Lattice provides behavioral threat detection specifically tuned to governance system access patterns, detecting insider threats and sophisticated attacks that target the metadata layer.",
          pitch: "We protect the system that protects your data.",
          color: "teal",
          pitchClass: "text-teal-700 bg-teal-50 border-teal-200",
        },
        {
          n: "4",
          title: "Agenta Funds the Stack",
          body: "Cybersecurity and data governance are cost centers — essential, but they don't generate revenue. Marketing intelligence is a profit center. Agenta's Campaign Canvas, MediaForge, and GENESIS drive measurable ROI that pays for the entire stack. Customers buy Agenta to grow. They stay for Lattice and Prism because once they see their data governed and protected at this level, they can't go back.",
          pitch: null,
          color: "violet",
          pitchClass: "",
        },
      ].map((s) => (
        <div key={s.n} className="mb-8">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
            <span className="text-sky-500 font-mono mr-2 text-base">0{s.n}</span>
            {s.title}
          </h3>
          <p className="text-slate-600 leading-relaxed mb-3">{s.body}</p>
          {s.pitch && (
            <p
              className={`text-sm font-semibold italic rounded-xl px-4 py-3 relative overflow-hidden ${s.pitchClass.split(' ').filter(c => c.startsWith('text-')).join(' ')}`}
              style={{
                background: "linear-gradient(165deg, rgba(255,255,255,0.85) 0%, rgba(248,250,252,0.78) 100%)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 2px 12px -2px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.6) inset, 0 0 0 1px rgba(255,255,255,0.25)",
                border: "none",
              }}
            >
              ↗ {s.pitch}
            </p>
          )}
        </div>
      ))}

      {/* ─── Divider ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent my-8" />

      {/* ─── Unified Value Proposition ─── */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5 leading-snug text-center">
        The Unified Value Proposition
      </h2>
      <blockquote
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(15,23,42,0.95) 0%, rgba(12,26,46,0.97) 60%, rgba(15,23,42,0.95) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: [
            "0 20px 48px -12px rgba(0,0,0,0.45)",
            "0 0 0 1px rgba(255,255,255,0.04) inset",
            "0 1px 0 0 rgba(255,255,255,0.15) inset",
            "0 0 60px -20px rgba(14,165,233,0.10)",
          ].join(", "),
        }}
      >
        {/* Top shine strip */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
        />
        {/* Inner surface highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, transparent 40%)" }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-violet-500 to-teal-400" />
        <div className="relative px-8 py-6">
          <p
            className="text-white font-medium text-base md:text-lg leading-relaxed italic"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            "Aurix is the first enterprise platform where your data is governed from creation to
            action, protected at every layer, and activated for growth — in one system, under one AI
            architecture, with one audit trail."
          </p>
        </div>
      </blockquote>
    </div>
  );
}