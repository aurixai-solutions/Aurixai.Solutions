import React, { useState, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Printer, Copy, ChevronDown, Maximize2, Minimize2 } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SUBJECTS DATA — mirrors AurixCompetitiveAnalysis.tsx
   ═══════════════════════════════════════════════════════════════ */
interface CompetitorDot { name: string; v: number; e: number; q: string }
interface Subject { id: string; label: string; competitors: CompetitorDot[] }

const SUBJECTS: Subject[] = [
  {
    id: "prism", label: "Prism: AI Data Governance",
    competitors: [
      { name: "Informatica", v: 90, e: 92, q: "Leader" },
      { name: "Ataccama", v: 82, e: 78, q: "Leader" },
      { name: "IBM watsonx.data", v: 78, e: 75, q: "Leader" },
      { name: "Monte Carlo", v: 75, e: 65, q: "Niche Player" },
      { name: "Talend (Qlik)", v: 60, e: 62, q: "Niche Player" },
      { name: "Aurix Prism", v: 95, e: 87, q: "Leader" },
    ],
  },
  {
    id: "lattice", label: "Lattice: AI Threat Intelligence",
    competitors: [
      { name: "Splunk", v: 78, e: 88, q: "Leader" },
      { name: "Microsoft Sentinel", v: 82, e: 85, q: "Leader" },
      { name: "Google SecOps", v: 90, e: 82, q: "Leader" },
      { name: "Exabeam", v: 72, e: 76, q: "Leader" },
      { name: "Securonix", v: 75, e: 77, q: "Leader" },
      { name: "CrowdStrike", v: 85, e: 68, q: "Visionary" },
      { name: "Fortinet", v: 62, e: 72, q: "Challenger" },
      { name: "Aurix Lattice", v: 93, e: 85, q: "Leader" },
    ],
  },
  {
    id: "agenta", label: "Agenta: AI Marketing Intelligence",
    competitors: [
      { name: "HubSpot", v: 82, e: 85, q: "Leader" },
      { name: "Salesforce", v: 85, e: 88, q: "Leader" },
      { name: "Adobe Marketo", v: 80, e: 82, q: "Leader" },
      { name: "Oracle Eloqua", v: 72, e: 70, q: "Challenger" },
      { name: "Microsoft D365", v: 78, e: 72, q: "Challenger" },
      { name: "Aurix Agenta.Red", v: 96, e: 84, q: "Leader" },
    ],
  },
  {
    id: "agentic", label: "AgenticMind: Agentic AI Frameworks",
    competitors: [
      { name: "LangChain / LangGraph", v: 88, e: 72, q: "Visionary" },
      { name: "CrewAI", v: 82, e: 65, q: "Visionary" },
      { name: "Microsoft AutoGen", v: 85, e: 70, q: "Visionary" },
      { name: "Amazon Bedrock Agents", v: 75, e: 82, q: "Leader" },
      { name: "Google Vertex AI Agents", v: 78, e: 78, q: "Challenger" },
      { name: "Zapier AI Actions", v: 70, e: 85, q: "Challenger" },
      { name: "IBM watsonx Orchestrate", v: 78, e: 72, q: "Challenger" },
      { name: "n8n", v: 82, e: 65, q: "Visionary" },
      { name: "Aurix AgenticMind", v: 97, e: 86, q: "Leader" },
    ],
  },
];

/* Names of all known (built-in) competitors across all quadrants */
const KNOWN_NAMES = new Set(SUBJECTS.flatMap(s => s.competitors.map(c => c.name)));

const QC: Record<string, string> = { Leader: "#16a34a", Challenger: "#2563eb", Visionary: "#7c3aed", "Niche Player": "#d97706" };
const CUSTOM_COLOR = "#e11d48"; // rose-600 for custom competitors

/* ═══════ Seeded random: deterministic position for a custom name ═══════ */
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return Math.abs(h);
}

function customDot(name: string): CompetitorDot {
  const h = hashStr(name);
  // Place custom competitors in the 58-88 range for both axes (varied but plausible)
  const v = 58 + (h % 31);
  const e = 58 + ((h >>> 8) % 31);
  const mid = 77.5; // (55+100)/2
  let q: string;
  if (v >= mid && e >= mid) q = "Leader";
  else if (v < mid && e >= mid) q = "Challenger";
  else if (v >= mid && e < mid) q = "Visionary";
  else q = "Niche Player";
  return { name, v, e, q };
}

/* ═══════ Single Quadrant SVG ═══════ */
function QuadrantChart({ subject }: { subject: Subject }) {
  const MN = 55, MX = 100;
  const PL = 52, PR = 18, PT = 28, PB = 52;
  const W = 540, H = 420;
  const pW = W - PL - PR, pH = H - PT - PB;

  const pctX = (v: number) => Math.max(0, Math.min(100, ((v - MN) / (MX - MN)) * 100));
  const pctY = (e: number) => Math.max(0, Math.min(100, (1 - (e - MN) / (MX - MN)) * 100));

  const sx = (pct: number) => PL + (pct / 100) * pW;
  const sy = (pct: number) => PT + (pct / 100) * pH;
  const mx = sx(pctX((MN + MX) / 2));
  const my = sy(pctY((MN + MX) / 2));

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(248,250,252,0.82) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 8px 32px -8px rgba(0,0,0,0.12), inset 0 1px 0 0 rgba(255,255,255,0.5)",
      }}
    >
      <div
        className="px-4 py-2.5"
        style={{
          background: "linear-gradient(135deg, rgba(248,250,252,0.9) 0%, rgba(241,245,249,0.8) 100%)",
          borderBottom: "1px solid rgba(203,213,225,0.4)",
        }}
      >
        <h3 className="text-sm font-bold text-slate-800">{subject.label}</h3>
        <p className="text-[10px] text-slate-500">Aurix AI Magic Quadrant</p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 380 }}>
        {/* Quadrant backgrounds */}
        <rect x={PL} y={PT} width={mx - PL} height={my - PT} fill="#94a3b8" opacity={0.06} rx={4} />
        <rect x={mx} y={PT} width={PL + pW - mx} height={my - PT} fill="#22c55e" opacity={0.06} rx={4} />
        <rect x={PL} y={my} width={mx - PL} height={PT + pH - my} fill="#f59e0b" opacity={0.05} rx={4} />
        <rect x={mx} y={my} width={PL + pW - mx} height={PT + pH - my} fill="#a78bfa" opacity={0.05} rx={4} />

        <text x={(PL + mx) / 2} y={PT + 16} textAnchor="middle" fill="#94a3b8" fontSize={12} fontWeight="700">CHALLENGERS</text>
        <text x={(mx + PL + pW) / 2} y={PT + 16} textAnchor="middle" fill="#16a34a" fontSize={12} fontWeight="800">LEADERS</text>
        <text x={(PL + mx) / 2} y={PT + pH - 6} textAnchor="middle" fill="#b45309" fontSize={12} fontWeight="700">NICHE PLAYERS</text>
        <text x={(mx + PL + pW) / 2} y={PT + pH - 6} textAnchor="middle" fill="#7c3aed" fontSize={12} fontWeight="700">VISIONARIES</text>

        {/* Axis lines */}
        <line x1={PL} y1={my} x2={PL + pW} y2={my} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={mx} y1={PT} x2={mx} y2={PT + pH} stroke="#cbd5e1" strokeWidth={1} />

        {/* Axis labels */}
        <text x={PL + pW / 2} y={H - 8} textAnchor="middle" fill="#94a3b8" fontSize={11}>Completeness of Vision &rarr;</text>
        <text x={14} y={PT + pH / 2} textAnchor="middle" fill="#94a3b8" fontSize={11} transform={`rotate(-90,14,${PT + pH / 2})`}>Ability to Execute &rarr;</text>

        {/* Competitor dots */}
        {subject.competitors.map(c => {
          const isAurix = c.name.startsWith("Aurix");
          const isCustom = !KNOWN_NAMES.has(c.name) && !isAurix;
          const cx = sx(pctX(c.v));
          const cy = sy(pctY(c.e));
          const dotColor = isAurix ? "#0ea5e9" : isCustom ? CUSTOM_COLOR : (QC[c.q] || "#94a3b8");
          return (
            <g key={c.name}>
              {isAurix && <circle cx={cx} cy={cy} r={16} fill="#0ea5e9" opacity={0.15} />}
              {isCustom && <circle cx={cx} cy={cy} r={12} fill={CUSTOM_COLOR} opacity={0.12} />}
              <circle cx={cx} cy={cy} r={isAurix ? 8 : isCustom ? 6 : 5} fill={dotColor} opacity={isAurix ? 1 : isCustom ? 0.9 : 0.8} />
              <text
                x={cx}
                y={cy + (isAurix ? -14 : 14)}
                textAnchor="middle"
                fill={isAurix ? "#0369a1" : isCustom ? "#9f1239" : "#475569"}
                fontSize={isAurix ? 10 : isCustom ? 9.5 : 9}
                fontWeight={isAurix ? "800" : isCustom ? "700" : "600"}
              >
                {c.name}
              </text>
              {isCustom && (
                <text x={cx} y={cy + 23} textAnchor="middle" fill="#94a3b8" fontSize={7} fontStyle="italic">
                  (estimated)
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════ Print Layout Dialog ═══════ */
function PrintLayoutDialog({ onSelect, onCancel }: { onSelect: (layout: "grid" | "list") => void; onCancel: () => void }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[10010] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
    >
      <div
        className="max-w-sm w-full mx-4 p-6"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.92) 100%)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: "1rem",
          boxShadow: "0 24px 80px -12px rgba(0,0,0,0.25), inset 0 1px 0 0 rgba(255,255,255,0.7)",
        }}
      >
        <h3 className="text-base font-bold text-slate-900 mb-3">Print Layout</h3>
        <p className="text-sm text-slate-600 mb-5">How would you like to arrange the quadrants for printing?</p>
        <div className="flex gap-3">
          <button
            onClick={() => onSelect("grid")}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 hover:border-sky-400 transition-colors text-center"
          >
            <div className="grid grid-cols-2 gap-1 mb-2 mx-auto w-12">
              <div className="w-5 h-4 bg-slate-300 rounded-sm" />
              <div className="w-5 h-4 bg-slate-300 rounded-sm" />
              <div className="w-5 h-4 bg-slate-300 rounded-sm" />
              <div className="w-5 h-4 bg-slate-300 rounded-sm" />
            </div>
            <span className="text-xs font-semibold text-slate-700">Two-Column Grid</span>
          </button>
          <button
            onClick={() => onSelect("list")}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 hover:border-sky-400 transition-colors text-center"
          >
            <div className="flex flex-col gap-1 mb-2 mx-auto w-8">
              <div className="w-8 h-3 bg-slate-300 rounded-sm" />
              <div className="w-8 h-3 bg-slate-300 rounded-sm" />
              <div className="w-8 h-3 bg-slate-300 rounded-sm" />
              <div className="w-8 h-3 bg-slate-300 rounded-sm" />
            </div>
            <span className="text-xs font-semibold text-slate-700">Single-Column List</span>
          </button>
        </div>
        <button onClick={onCancel} className="mt-4 w-full text-xs text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
      </div>
    </div>,
    document.body
  );
}

/* ═══════ MAGIC QUADRANT MODAL ═══════ */
export function MagicQuadrantModal({
  currentCategory,
  onClose,
  visibleCompetitors,
}: {
  currentCategory: string;
  onClose: () => void;
  visibleCompetitors?: Set<string>;
}) {
  // Map table categories to MQ subjects
  const categoryToSubjectId: Record<string, string> = {
    "Core AI & Explainability": "prism",
    "Data Quality": "prism",
    "Compliance & Governance": "prism",
    "AI Platform & Integration": "agentic",
    "Security & Identity": "lattice",
    "Enterprise & Commercial": "agenta",
  };

  const defaultSubjectId = categoryToSubjectId[currentCategory] || SUBJECTS[0].id;

  // Selected categories for display
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set([defaultSubjectId]));
  const [filterOpen, setFilterOpen] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── Merge custom competitors into subjects ── */
  const enrichedSubjects = useMemo(() => {
    if (!visibleCompetitors || visibleCompetitors.size === 0) return SUBJECTS;

    // Find custom competitor names (visible but not in any SUBJECTS data)
    const customNames = Array.from(visibleCompetitors).filter(
      name => name !== "Aurix AI" && !KNOWN_NAMES.has(name)
    );

    if (customNames.length === 0) return SUBJECTS;

    // Add custom competitor dots to each subject
    return SUBJECTS.map(subject => ({
      ...subject,
      competitors: [
        ...subject.competitors,
        ...customNames.map(name => customDot(name)),
      ],
    }));
  }, [visibleCompetitors]);

  const displayedSubjects = useMemo(
    () => enrichedSubjects.filter(s => selectedIds.has(s.id)),
    [selectedIds, enrichedSubjects]
  );

  const toggleSubject = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) { if (next.size > 1) next.delete(id); } // keep at least one
      else next.add(id);
      return next;
    });
  }, []);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Copy single quadrant as image (fallback: copy text) ── */
  const copyContent = useCallback(async () => {
    const text = displayedSubjects.map(s =>
      `${s.label}\n${s.competitors.map(c => `  ${c.name}: Vision ${c.v}, Execution ${c.e} (${c.q})`).join("\n")}`
    ).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }, [displayedSubjects]);

  /* ── Print ── */
  const doPrint = useCallback((layout: "grid" | "list") => {
    setShowPrintDialog(false);
    const el = contentRef.current;
    if (!el) return;
    const win = window.open("", "_blank");
    if (!win) return;
    const gridCss = layout === "grid"
      ? "display: grid; grid-template-columns: 1fr 1fr; gap: 16px;"
      : "display: flex; flex-direction: column; gap: 16px;";
    win.document.write(`<!DOCTYPE html><html><head><title>Aurix AI Magic Quadrant</title>
      <style>
        body { font-family: system-ui, sans-serif; margin: 16px; }
        .mq-container { ${gridCss} }
        svg { width: 100%; max-height: 400px; }
        h3 { font-size: 14px; margin: 0 0 4px; }
        p { font-size: 10px; color: #64748b; margin: 0; }
        .card { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; break-inside: avoid; }
        .card-header { padding: 8px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
        @media print { body { margin: 0; } }
      </style></head><body><div class="mq-container">`);
    win.document.write(el.innerHTML);
    win.document.write("</div></body></html>");
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  }, []);

  const handlePrint = useCallback(() => {
    if (displayedSubjects.length >= 2) {
      setShowPrintDialog(true);
    } else {
      doPrint("list");
    }
  }, [displayedSubjects.length, doPrint]);

  const toggleMaximize = useCallback(() => setIsMaximized(prev => !prev), []);

  /* ── Glassmorphic header styles ── */
  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(15,23,42,0.82) 0%, rgba(30,41,59,0.72) 100%)",
    backdropFilter: "blur(16px) saturate(1.3)",
    WebkitBackdropFilter: "blur(16px) saturate(1.3)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "relative",
    zIndex: 30,
    overflow: "visible",
  };

  /* ── Glassmorphic modal container ── */
  const containerStyle: React.CSSProperties = isMaximized
    ? {
        background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.92) 100%)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
      }
    : {
        maxWidth: "95vw",
        maxHeight: "90vh",
        borderRadius: "1rem",
        background: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(248,250,252,0.88) 100%)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        border: "1px solid rgba(255,255,255,0.35)",
        boxShadow: "0 28px 90px -12px rgba(0,0,0,0.3), 0 0 140px -25px rgba(14,165,233,0.08), inset 0 1px 0 0 rgba(255,255,255,0.6)",
      };

  /* ── Count custom competitors ── */
  const customCount = useMemo(() => {
    if (!visibleCompetitors) return 0;
    return Array.from(visibleCompetitors).filter(n => n !== "Aurix AI" && !KNOWN_NAMES.has(n)).length;
  }, [visibleCompetitors]);

  const content = (
    <>
      {/* Header */}
      <div className="flex-shrink-0 text-white px-4 py-2.5 flex items-center gap-3" style={headerStyle}>
        <span className="text-sm font-bold tracking-wide">Aurix AI Magic Quadrant</span>

        {/* Category dropdown */}
        <div ref={filterRef} className="relative ml-2">
          <button
            onClick={() => setFilterOpen(o => !o)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            Categories ({selectedIds.size}/{SUBJECTS.length})
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
          </button>
          {filterOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2" style={{ zIndex: 9999 }}>
              <button
                onClick={() => {
                  const allSelected = SUBJECTS.every(s => selectedIds.has(s.id));
                  if (allSelected) {
                    setSelectedIds(new Set([defaultSubjectId]));
                  } else {
                    setSelectedIds(new Set(SUBJECTS.map(s => s.id)));
                  }
                }}
                className="w-full text-left px-3 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
              >
                {SUBJECTS.every(s => selectedIds.has(s.id)) ? "Show Current Only" : "Select All"}
              </button>
              <div className="h-px bg-slate-100 my-1" />
              {SUBJECTS.map(s => (
                <label key={s.id} className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(s.id)}
                    onChange={() => toggleSubject(s.id)}
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-3.5 h-3.5"
                  />
                  <span className="text-xs text-slate-700">{s.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {customCount > 0 && (
          <span className="text-[10px] text-rose-300 bg-rose-900/30 px-2 py-0.5 rounded-full">
            +{customCount} custom
          </span>
        )}

        <div className="flex-1" />

        {/* Action buttons */}
        <button onClick={copyContent} className="p-1.5 rounded-md hover:bg-slate-700 transition-colors" title={displayedSubjects.length > 1 ? "Copy All" : "Copy"}>
          <Copy className="w-4 h-4" />
        </button>
        <button onClick={handlePrint} className="p-1.5 rounded-md hover:bg-slate-700 transition-colors" title="Print">
          <Printer className="w-4 h-4" />
        </button>
        <button onClick={toggleMaximize} className="p-1.5 rounded-md hover:bg-slate-700 transition-colors" title={isMaximized ? "Restore" : "Maximize"}>
          {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-red-700 transition-colors" title="Close">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content area */}
      <div ref={contentRef} className="overflow-auto flex-1 min-h-0 p-4" style={{ gap: 20 }}>
        <div className="flex flex-col" style={{ gap: 20 }}>
          {displayedSubjects.map(subject => (
            <QuadrantChart key={subject.id} subject={subject} />
          ))}
        </div>
      </div>
    </>
  );

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[10000]"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
      />

      {isMaximized ? (
        /* Maximized — full screen */
        <div
          className="fixed inset-0 z-[10001] flex flex-col overflow-hidden"
          style={containerStyle}
        >
          {content}
        </div>
      ) : (
        /* Default — centered modal */
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
          <div
            className="pointer-events-auto overflow-hidden flex flex-col"
            style={{ width: Math.min(600, window.innerWidth - 40), ...containerStyle }}
          >
            {content}
          </div>
        </div>
      )}

      {showPrintDialog && (
        <PrintLayoutDialog
          onSelect={doPrint}
          onCancel={() => setShowPrintDialog(false)}
        />
      )}
    </>,
    document.body
  );
}