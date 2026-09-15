import React, { useState, useEffect, useCallback } from "react";

/*  ══════════════════════════════════════════════════════════════
    AURIX AI — Competitive Intelligence Dashboard v3
    ──────────────────────────────────────────────────────────────
    4 Subject Areas × 5 Comparison Views = 20 analysis panels
    
    Execution adjusted for Time-to-Go-Live & consulting dependency.
    Aurix 1–3 day / 0 consulting deploys → Leader in all domains.
    ══════════════════════════════════════════════════════════════ */

const SUBJECTS = [
  {
    id: "data-governance", outerLabel: "Data Governance: Enterprise AI", icon: "📊",
    aurixAiTitle: "Augmented Data Quality & AI Data Governance", aurixAiDate: "March 2025", aurixProduct: "Aurix Data Governance",
    competitors: [
      { name: "Informatica", v: 90, e: 92, ae: 83, q: "Leader", dd: "60–120", ch: "300–800+", dn: "Massive IDMC rollout. Months with SI partner.", notes: "17× Leader. CLAIRE AI. 5 Aurix AI MQ Leader. Salesforce acquired. No predictive failure, no self-healing.", f: { predictive: false, selfHeal: false, digitalTwin: false, nl: true, secLink: false, aiTransp: false, multiLang: true, stream: true } },
      { name: "Ataccama", v: 82, e: 78, ae: 74, q: "Leader", dd: "30–60", ch: "100–300", dn: "Faster than Informatica. Still needs data architect.", notes: "4× Leader. AI-augmented rules. No digital twin, no 72hr predictions, limited self-healing.", f: { predictive: false, selfHeal: false, digitalTwin: false, nl: true, secLink: false, aiTransp: false, multiLang: false, stream: true } },
      { name: "IBM watsonx.data", v: 78, e: 75, ae: 67, q: "Leader", dd: "45–90", ch: "200–600", dn: "IBM GBS consulting-heavy. Multi-product complexity.", notes: "2026 MQ Leader. AI rule creation. Complex portfolio. No predictive failure prevention.", f: { predictive: false, selfHeal: false, digitalTwin: false, nl: true, secLink: false, aiTransp: true, multiLang: true, stream: true } },
      { name: "Monte Carlo", v: 75, e: 65, ae: 64, q: "Niche Player", dd: "7–14", ch: "20–60", dn: "Lightweight observability. Reactive-only — alerts after failure.", notes: "Data observability pioneer. Reactive anomaly detection only. No self-healing, no digital twin.", f: { predictive: false, selfHeal: false, digitalTwin: false, nl: false, secLink: false, aiTransp: false, multiLang: false, stream: true } },
      { name: "Talend (Qlik)", v: 60, e: 62, ae: 57, q: "Niche Player", dd: "30–60", ch: "100–250", dn: "Traditional ETL setup. Qlik acquisition overhead.", notes: "Qlik acquisition. Traditional ETL. No AI prediction, declining momentum.", f: { predictive: false, selfHeal: false, digitalTwin: false, nl: false, secLink: false, aiTransp: false, multiLang: false, stream: false } },
      { name: "Aurix Data Governance", v: 95, e: 87, ae: 87, q: "Leader", dd: "1–3", ch: "0", dn: "Self-configuring pipelines. Natural language setup. Zero consulting.", notes: "ONLY platform: 72hr predictive failures (92% via PEN). Self-healing pipelines. Digital twin simulation. Natural language interface in 40+ languages. $23.8M demonstrated ROI.", f: { predictive: true, selfHeal: true, digitalTwin: true, nl: true, secLink: true, aiTransp: true, multiLang: true, stream: true } },
    ],
    featLabels: { predictive: "72hr Predictive Warnings", selfHeal: "Self-Healing Pipelines", digitalTwin: "Digital Twin Simulation", nl: "Natural Language Interface", secLink: "Security Integration", aiTransp: "AI Transparency Link", multiLang: "40+ Languages", stream: "Real-time Streaming" },
  },
  {
    id: "cybersecurity", outerLabel: "Cybersecurity: AI Threat Intelligence", icon: "🛡",
    aurixAiTitle: "SIEM & AI-Driven Threat Intelligence", aurixAiDate: "October 2025", aurixProduct: "Aurix Cybersecurity",
    competitors: [
      { name: "Splunk", v: 78, e: 88, ae: 81, q: "Leader", dd: "45–90", ch: "200–600+", dn: "Complex migration. Requires Splunk PS or SI partner.", notes: "11× Leader. Cisco acquisition (2024). $150–500K+/yr. No native DLP, no data quality link.", f: { threatIntel: true, ueba: true, soar: true, dlp: false, selfHeal: false, dqLink: false, aiGov: false, predict: false } },
      { name: "Microsoft Sentinel", v: 82, e: 85, ae: 79, q: "Leader", dd: "30–60", ch: "150–400", dn: "Azure-native speeds setup. Cross-cloud painful. KQL learning curve.", notes: "Cloud-native SIEM + MCP + agentic tools. Azure lock-in. No cross-cloud parity.", f: { threatIntel: true, ueba: true, soar: true, dlp: false, selfHeal: false, dqLink: false, aiGov: false, predict: false } },
      { name: "Google SecOps", v: 90, e: 82, ae: 77, q: "Leader", dd: "30–60", ch: "150–350", dn: "GCP-only. Mandiant adds weeks. Gemini AI maturing.", notes: "Highest Vision (2025). Gemini AI automation. Google Cloud-centric. No DLP.", f: { threatIntel: true, ueba: false, soar: true, dlp: false, selfHeal: false, dqLink: false, aiGov: false, predict: true } },
      { name: "Exabeam", v: 72, e: 76, ae: 72, q: "Leader", dd: "21–45", ch: "100–300", dn: "Faster than big 3. UEBA tuning adds time.", notes: "6× Leader. Strong UEBA. Narrow threat intel. No data quality or compliance automation.", f: { threatIntel: false, ueba: true, soar: true, dlp: false, selfHeal: false, dqLink: false, aiGov: false, predict: false } },
      { name: "Securonix", v: 75, e: 77, ae: 72, q: "Leader", dd: "30–60", ch: "150–400", dn: "Snowflake migration lengthy. Unified scope adds complexity.", notes: "6× Leader. Unified SIEM on Snowflake. No endpoint protection or data quality.", f: { threatIntel: true, ueba: true, soar: true, dlp: false, selfHeal: false, dqLink: false, aiGov: false, predict: false } },
      { name: "CrowdStrike", v: 85, e: 68, ae: 69, q: "Visionary", dd: "7–21", ch: "40–120", dn: "Falcon agent fast. NG-SIEM newer, less battle-tested.", notes: "Falcon NG-SIEM. Best endpoint. No DLP, no compliance, no data quality.", f: { threatIntel: true, ueba: false, soar: false, dlp: false, selfHeal: false, dqLink: false, aiGov: false, predict: false } },
      { name: "Fortinet", v: 62, e: 72, ae: 68, q: "Challenger", dd: "30–60", ch: "100–300", dn: "Best inside Fortinet Fabric. Otherwise complex.", notes: "8× Challenger. Strong IT/OT (FortiSIEM 7.4). Limited cloud-native.", f: { threatIntel: true, ueba: false, soar: true, dlp: false, selfHeal: false, dqLink: false, aiGov: false, predict: false } },
      { name: "Aurix Cybersecurity", v: 93, e: 85, ae: 85, q: "Leader", dd: "1–2", ch: "0", dn: "12 capability profiles. Plug-and-play intel. Zero consulting.", notes: "10+ threat intel sources at no cost. 12 capability profiles. UEBA + DLP fusion. Cross-platform: Data Governance + Sentinel. 74–83% lower TCO. 1–2 day deploy.", f: { threatIntel: true, ueba: true, soar: true, dlp: true, selfHeal: true, dqLink: true, aiGov: true, predict: true } },
    ],
    featLabels: { threatIntel: "Threat Intel (10+ Feeds)", ueba: "UEBA / Behavioral", soar: "SOAR Integration", dlp: "Native DLP", selfHeal: "Self-Healing Engine", dqLink: "Data Quality Link", aiGov: "AI Governance Link", predict: "Predictive Analytics" },
  },
  {
    id: "marketing", outerLabel: "Marketing Intelligence: AI Automation", icon: "🚀",
    aurixAiTitle: "B2B Marketing Automation & AI Intelligence", aurixAiDate: "September 2025", aurixProduct: "Aurix Marketing",
    competitors: [
      { name: "HubSpot", v: 82, e: 85, ae: 82, q: "Leader", dd: "14–30", ch: "40–120", dn: "Easiest Leader. Still needs CRM migration.", notes: "5× Leader. Breeze AI (4 agents only). No visual canvas, no AI media, no competitive intel.", f: { canvas: false, aiMedia: false, compIntel: false, funnel: false, autoOpt: false, mlScore: true, multiLLM: false } },
      { name: "Salesforce", v: 85, e: 88, ae: 79, q: "Leader", dd: "60–120", ch: "300–800+", dn: "Palantir-class consulting. 4+ separate products requiring SI.", notes: "Revenue leader. Agentforce. Separate licenses per module. 91-tool martech stack persists.", f: { canvas: false, aiMedia: false, compIntel: false, funnel: false, autoOpt: false, mlScore: true, multiLLM: false } },
      { name: "Adobe Marketo", v: 80, e: 82, ae: 75, q: "Leader", dd: "42–84", ch: "200–500", dn: "6–12 week typical. Heavy SI dependency.", notes: "Marketo Engage. Strong enterprise. Complex impl. No AI creative, no competitive intel.", f: { canvas: false, aiMedia: false, compIntel: false, funnel: false, autoOpt: false, mlScore: true, multiLLM: false } },
      { name: "Oracle Eloqua", v: 72, e: 70, ae: 64, q: "Challenger", dd: "45–90", ch: "150–400", dn: "Mature but aging. Oracle consulting overhead.", notes: "Database marketing strength. Declining momentum. No AI media or autonomous optimization.", f: { canvas: false, aiMedia: false, compIntel: false, funnel: false, autoOpt: false, mlScore: true, multiLLM: false } },
      { name: "Microsoft D365", v: 78, e: 72, ae: 70, q: "Challenger", dd: "30–60", ch: "100–250", dn: "Dynamics 365 Marketing. Faster in M365 ecosystem.", notes: "Copilot AI integration. Microsoft ecosystem lock-in. No campaign canvas, no competitive intel.", f: { canvas: false, aiMedia: false, compIntel: false, funnel: false, autoOpt: false, mlScore: true, multiLLM: false } },
      { name: "Aurix Marketing", v: 96, e: 84, ae: 84, q: "Leader", dd: "1–3", ch: "0", dn: "ORBIT drag-and-drop. GENESIS generates from prompt. Zero consulting.", notes: "ORBIT visual canvas. MediaForge (DALL-E + Runway + HeyGen + Synthesia). FlowForge funnel builder. ARGUS competitive intel. Autopilot Mode. PROSPECT IQ 80+ factor ML.", f: { canvas: true, aiMedia: true, compIntel: true, funnel: true, autoOpt: true, mlScore: true, multiLLM: true } },
    ],
    featLabels: { canvas: "Visual Campaign Canvas", aiMedia: "AI Media Production", compIntel: "Competitive Intelligence", funnel: "AI Funnel Builder", autoOpt: "Autonomous Optimization", mlScore: "ML Lead Scoring", multiLLM: "Multi-LLM Strategy" },
  },
  {
    id: "agentic", outerLabel: "Agentic Frameworks: AI Orchestration", icon: "🤖",
    aurixAiTitle: "Agentic AI Frameworks & Agent Orchestration", aurixAiDate: "2025–2026", aurixProduct: "Aurix Agentic",
    competitors: [
      { name: "LangChain / LangGraph", v: 88, e: 72, ae: 70, q: "Visionary", dd: "7–30", ch: "40–200", dn: "Developer framework. Requires custom engineering for enterprise use.", notes: "Most popular LLM framework. LangGraph for multi-agent. Open-source. No pre-built agents, no self-healing, no enterprise UI. Requires significant dev investment.", f: { preBuilt: false, selfHeal: false, parallelSafe: false, compositeGen: false, visualCanvas: false, dualAI: false, deterministicOrd: false, agentMarket: false, mcp: true, multiLLM: true } },
      { name: "CrewAI", v: 82, e: 65, ae: 64, q: "Visionary", dd: "3–14", ch: "20–100", dn: "Quick for simple crews. Enterprise orchestration requires custom dev.", notes: "Multi-agent role-based framework. Growing fast. No visual builder, no self-healing, no enterprise governance. Python-only.", f: { preBuilt: false, selfHeal: false, parallelSafe: false, compositeGen: false, visualCanvas: false, dualAI: false, deterministicOrd: false, agentMarket: false, mcp: false, multiLLM: true } },
      { name: "Microsoft AutoGen", v: 85, e: 70, ae: 68, q: "Visionary", dd: "7–21", ch: "40–150", dn: "Research-grade. Enterprise deployment needs custom wrapper.", notes: "Multi-agent conversation framework. Strong research backing. No pre-built agents, no visual builder, no production self-healing.", f: { preBuilt: false, selfHeal: false, parallelSafe: false, compositeGen: false, visualCanvas: false, dualAI: false, deterministicOrd: false, agentMarket: false, mcp: false, multiLLM: true } },
      { name: "Amazon Bedrock Agents", v: 75, e: 82, ae: 80, q: "Leader", dd: "3–14", ch: "20–80", dn: "Fast on AWS. Zero capability outside AWS ecosystem.", notes: "AWS-native agent builder. Guardrails integration. AWS-locked. No cross-provider, no self-healing, no visual orchestration, no marketplace.", f: { preBuilt: false, selfHeal: false, parallelSafe: false, compositeGen: false, visualCanvas: false, dualAI: false, deterministicOrd: false, agentMarket: false, mcp: false, multiLLM: false } },
      { name: "Google Vertex AI Agents", v: 78, e: 78, ae: 76, q: "Challenger", dd: "3–14", ch: "20–100", dn: "Tight GCP integration. Multi-cloud agent deployment is manual.", notes: "Agent Builder on Vertex. Extensions + Datastores. Google-locked. No self-healing, no marketplace, no visual canvas.", f: { preBuilt: false, selfHeal: false, parallelSafe: false, compositeGen: false, visualCanvas: false, dualAI: false, deterministicOrd: false, agentMarket: false, mcp: false, multiLLM: false } },
      { name: "Zapier AI Actions", v: 70, e: 85, ae: 83, q: "Challenger", dd: "1–3", ch: "0–10", dn: "Instant for simple tasks. Linear, brittle for complex agent workflows.", notes: "8,000+ integrations. AI Actions for LLM tool-use. Linear architecture. No self-healing, no parallelism, no agent intelligence.", f: { preBuilt: false, selfHeal: false, parallelSafe: false, compositeGen: false, visualCanvas: false, dualAI: false, deterministicOrd: false, agentMarket: false, mcp: false, multiLLM: false } },
      { name: "IBM watsonx Orchestrate", v: 78, e: 72, ae: 65, q: "Challenger", dd: "30–60", ch: "150–400", dn: "IBM GBS consulting dependency. Agent catalog IBM-ecosystem limited.", notes: "Multi-agent orchestration. A2A, MCP, Langflow. Granite models. IBM ecosystem limited.", f: { preBuilt: false, selfHeal: false, parallelSafe: false, compositeGen: false, visualCanvas: false, dualAI: false, deterministicOrd: false, agentMarket: false, mcp: true, multiLLM: false } },
      { name: "n8n", v: 82, e: 65, ae: 64, q: "Visionary", dd: "1–7", ch: "0–20", dn: "Self-host DIY. Cloud is fast. 70+ AI nodes but no enterprise SLA.", notes: "Open-source. LangChain-native, 70+ AI nodes, MCP support. 1,100 integrations. No enterprise self-healing, no parallelism safety.", f: { preBuilt: false, selfHeal: false, parallelSafe: false, compositeGen: false, visualCanvas: true, dualAI: false, deterministicOrd: false, agentMarket: false, mcp: true, multiLLM: true } },
      { name: "Aurix Agentic", v: 97, e: 86, ae: 86, q: "Leader", dd: "1–2", ch: "0", dn: "Caspian AI builds workflows from description. 1,000+ pre-built agents. Composite agent generation. Zero consulting.", notes: "1,000+ purpose-built agents across every business domain. Caspian AI generates custom composite agents for ANY purpose from natural language. Phi-3.5-mini self-healing (<50ms). PATENTED parallelism safety with variable isolation. Visual Workflow Canvas with type system + debugger. Agent Marketplace with trust scoring. MCP-native. Multi-LLM routing via Sentinel.", f: { preBuilt: true, selfHeal: true, parallelSafe: true, compositeGen: true, visualCanvas: true, dualAI: true, deterministicOrd: true, agentMarket: true, mcp: true, multiLLM: true } },
    ],
    featLabels: { preBuilt: "1,000+ Pre-Built Agents", selfHeal: "AI Self-Healing (<50ms)", parallelSafe: "Parallelism Safety (Patent)", compositeGen: "Composite Agent Generation", visualCanvas: "Visual Workflow Canvas", dualAI: "Dual-Model AI Assistant", deterministicOrd: "Deterministic Ordering", agentMarket: "Agent Marketplace", mcp: "MCP-Native Support", multiLLM: "Multi-LLM Routing" },
  },
];

const QC: Record<string, string> = { Leader: "#16a34a", Challenger: "#2563eb", Visionary: "#7c3aed", "Niche Player": "#d97706" };
const QB: Record<string, string> = { Leader: "#dcfce7", Challenger: "#dbeafe", Visionary: "#f3e8ff", "Niche Player": "#fef3c7" };

const TABS = [
  { id: "quadrant", label: "Magic Quadrant", icon: "◎" },
  { id: "adjusted", label: "Deployment-Adjusted", icon: "⚡" },
  { id: "features", label: "Feature Matrix", icon: "▦" },
  { id: "deploy", label: "Time-to-Value", icon: "⏱" },
  { id: "moat", label: "Integration Moat", icon: "🔗" },
];

/* ═══════ ANIMATED CHART ═══════
   Uses CSS transform (not position changes) for reliable fly-in.
   Every dot is ALWAYS at its final left/top coordinate.
   Animation is purely visual via translateX offset + opacity.
   Scale zoomed to 55–100 for readable dot spacing. */

function Chart({ subject, adjusted, animKey }: any) {
  const [hov, setHov] = useState<number | null>(null);
  const [sel, setSel] = useState<number | null>(null);

  /* Animation phase state — each dot gets its own boolean */
  const [aurixIn, setAurixIn] = useState(false);
  const [dotIn, setDotIn] = useState<boolean[]>([]);       // per-competitor booleans
  const [glowDone, setGlowDone] = useState<boolean[]>([]); // per-competitor one-shot glow
  const [brightMode, setBrightMode] = useState(false);

  const aurixIdx = subject.competitors.findIndex((c: any) => c.name.startsWith("Aurix"));
  const others = subject.competitors
    .map((c: any, i: number) => ({ ...c, _i: i }))
    .filter((c: any) => !c.name.startsWith("Aurix"));

  useEffect(() => {
    /* Reset everything on subject/tab change */
    setAurixIn(false);
    setDotIn(new Array(others.length).fill(false));
    setGlowDone(new Array(others.length).fill(false));
    setBrightMode(false);
    setSel(null);
    setHov(null);

    const tIds: NodeJS.Timeout[] = [];  // setTimeout IDs
    let raf1 = 0, raf2 = 0;

    /* Double-rAF ensures browser paints the "offscreen" state first */
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {

        /* Phase 1 — Aurix glows in */
        tIds.push(setTimeout(() => setAurixIn(true), 50));

        /* Phase 2 — Competitors fly in one-by-one, staggered 280ms */
        others.forEach((_, oi) => {
          tIds.push(setTimeout(() => {
            setDotIn(prev => { const n = [...prev]; n[oi] = true; return n; });
          }, 700 + oi * 280));
        });

        /* Phase 3 — After all arrived, one-shot landing glow */
        const allInTime = 700 + others.length * 280 + 500;
        tIds.push(setTimeout(() => {
          setGlowDone(new Array(others.length).fill(true));
        }, allInTime));

        /* Phase 4 — Aurix pulse brightens */
        tIds.push(setTimeout(() => setBrightMode(true), allInTime + 1000));

      });
    });

    return () => {
      tIds.forEach(id => clearTimeout(id));
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [animKey, subject.id]);

  /* ── Zoomed scale: 55–100 both axes ── */
  const MN = 55, MX = 100;
  const PL = 52, PR = 18, PT = 24, PB = 52;
  const W = 640, H = 530;
  const pW = W - PL - PR, pH = H - PT - PB;

  const pctX = (v: number) => Math.max(0, Math.min(100, ((v - MN) / (MX - MN)) * 100));
  const pctY = (e: number) => Math.max(0, Math.min(100, (1 - (e - MN) / (MX - MN)) * 100));

  /* SVG pixel helpers */
  const sx = (pct: number) => PL + (pct / 100) * pW;
  const sy = (pct: number) => PT + (pct / 100) * pH;
  const mx = sx(pctX((MN + MX) / 2));
  const my = sy(pctY((MN + MX) / 2));

  /* HTML overlay percentage helpers (relative to container) */
  const dotLeft = (v: number) => ((PL + (pctX(v) / 100) * pW) / W) * 100;
  const dotTop  = (e: number) => ((PT + (pctY(e) / 100) * pH) / H) * 100;

  return (
    <div>
      {/* ── Keyframe styles (injected once) ── */}
      <style>{`
        @keyframes aGlow {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.45; }
          50%     { transform: translate(-50%,-50%) scale(1.5); opacity: 0.08; }
        }
        @keyframes aGlowBright {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
          50%     { transform: translate(-50%,-50%) scale(1.45); opacity: 0.32; }
        }
        @keyframes landRing {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.6); opacity: 0; }
        }
      `}</style>

      {/* ── Container: SVG background grid + HTML overlay ── */}
      <div style={{ position: "relative", width: "100%", maxWidth: W, margin: "0 auto", overflow: "visible" }}>

        {/* SVG grid only */}
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
          <rect x={PL} y={PT} width={mx - PL} height={my - PT} fill="#94a3b8" opacity={0.06} rx={4}/>
          <rect x={mx} y={PT} width={PL + pW - mx} height={my - PT} fill="#22c55e" opacity={0.06} rx={4}/>
          <rect x={PL} y={my} width={mx - PL} height={PT + pH - my} fill="#f59e0b" opacity={0.05} rx={4}/>
          <rect x={mx} y={my} width={PL + pW - mx} height={PT + pH - my} fill="#a78bfa" opacity={0.05} rx={4}/>

          <text x={(PL + mx) / 2} y={PT + 16} textAnchor="middle" fill="#94a3b8" fontSize={14} fontWeight="700">CHALLENGERS</text>
          <text x={(mx + PL + pW) / 2} y={PT + 16} textAnchor="middle" fill="#16a34a" fontSize={14} fontWeight="800">LEADERS</text>
          <text x={(PL + mx) / 2} y={PT + pH - 6} textAnchor="middle" fill="#b45309" fontSize={14} fontWeight="700">NICHE PLAYERS</text>
          <text x={(mx + PL + pW) / 2} y={PT + pH - 6} textAnchor="middle" fill="#7c3aed" fontSize={14} fontWeight="700">VISIONARIES</text>

          <line x1={mx} y1={PT} x2={mx} y2={PT + pH} stroke="#e2e8f0" strokeWidth={0.7} strokeDasharray="6,4"/>
          <line x1={PL} y1={my} x2={PL + pW} y2={my} stroke="#e2e8f0" strokeWidth={0.7} strokeDasharray="6,4"/>
          <rect x={PL} y={PT} width={pW} height={pH} fill="none" stroke="#e2e8f0" strokeWidth={0.8} rx={6}/>

          <text x={PL + pW / 2} y={H - 2} textAnchor="middle" fill="#64748b" fontSize={16} fontWeight="700">COMPLETENESS OF VISION →</text>
          <text x={12} y={PT + pH / 2} textAnchor="middle" fill="#64748b" fontSize={16} fontWeight="700" transform={`rotate(-90,12,${PT + pH / 2})`}>ABILITY TO EXECUTE →</text>

          {[60, 70, 80, 90, 100].filter(v => v >= MN).map(v => (
            <text key={`xv${v}`} x={sx(pctX(v))} y={PT + pH + 15} textAnchor="middle" fill="#94a3b8" fontSize={13}>{v}</text>
          ))}
          {[60, 70, 80, 90, 100].filter(e => e >= MN).map(e => (
            <text key={`ye${e}`} x={PL - 8} y={sy(pctY(e)) + 4} textAnchor="end" fill="#94a3b8" fontSize={13}>{e}</text>
          ))}
        </svg>

        {/* ── HTML overlay — overflow visible so off-screen dots are seen ── */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>

          {/* ★ AURIX DOT — fades in first */}
          {aurixIdx >= 0 && (() => {
            const c = subject.competitors[aurixIdx];
            const ex = adjusted ? c.ae : c.e;
            const isH = hov === aurixIdx || sel === aurixIdx;
            return (
              <div
                onMouseEnter={() => setHov(aurixIdx)}
                onMouseLeave={() => setHov(null)}
                onClick={() => setSel(sel === aurixIdx ? null : aurixIdx)}
                style={{
                  position: "absolute",
                  left: dotLeft(c.v) + "%",
                  top: dotTop(ex) + "%",
                  zIndex: 20,
                  pointerEvents: "auto",
                  cursor: "pointer",
                  /* Fade-in via opacity + slight scale */
                  opacity: aurixIn ? 1 : 0,
                  transform: `translate(-50%,-50%) scale(${aurixIn ? 1 : 0.3})`,
                  transition: "opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* Outer pulse ring */}
                <div style={{ position: "absolute", top: "50%", left: "50%", width: 54, height: 54, borderRadius: "50%", border: "2.5px solid #16a34a", animation: `${brightMode ? "aGlowBright" : "aGlow"} 2.2s ease-in-out infinite`, pointerEvents: "none" }} />
                {/* Inner pulse ring */}
                <div style={{ position: "absolute", top: "50%", left: "50%", width: 38, height: 38, borderRadius: "50%", border: "1.5px solid #4ade80", animation: `${brightMode ? "aGlowBright" : "aGlow"} 2.2s ease-in-out 0.35s infinite`, pointerEvents: "none" }} />
                {/* Main dot */}
                <div style={{ width: isH ? 30 : 26, height: isH ? 30 : 26, borderRadius: "50%", background: "#16a34a", border: "2.5px solid #fff", boxShadow: "0 0 14px rgba(22,163,106,0.5), 0 0 28px rgba(22,163,106,0.15)", transition: "width 0.15s, height 0.15s" }} />
                {/* Label */}
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 17, fontWeight: 900, color: "#15803d", textShadow: "0 0 8px rgba(255,255,255,1), 0 0 3px rgba(255,255,255,0.9)", pointerEvents: "none" }}>
                  ★ {c.name}
                </div>
              </div>
            );
          })()}

          {/* COMPETITOR DOTS — fly in via CSS transform: translateX */}
          {others.map((c: any, oi: number) => {
            const ex = adjusted ? c.ae : c.e;
            const isH = hov === c._i || sel === c._i;
            const isIn = dotIn[oi] === true;
            const showGlow = glowDone[oi] === true && !brightMode;
            /* Alternate: even indices fly from far left, odd from far right */
            const flyOffset = oi % 2 === 0 ? -700 : 700;

            return (
              <div
                key={c._i}
                onMouseEnter={() => setHov(c._i)}
                onMouseLeave={() => setHov(null)}
                onClick={() => setSel(sel === c._i ? null : c._i)}
                style={{
                  position: "absolute",
                  /* Always at final coordinate */
                  left: dotLeft(c.v) + "%",
                  top: dotTop(ex) + "%",
                  zIndex: isH ? 15 : 10,
                  pointerEvents: isIn ? "auto" : "none",
                  cursor: "pointer",
                  /* THE KEY: transform does the fly-in, not position */
                  opacity: isIn ? 1 : 0,
                  transform: isIn
                    ? "translate(-50%,-50%) translateX(0px)"
                    : `translate(-50%,-50%) translateX(${flyOffset}px)`,
                  transition: isIn
                    ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease"
                    : "none",
                }}
              >
                {/* Landing glow (one-shot ring burst) */}
                {showGlow && (
                  <div style={{ position: "absolute", top: "50%", left: "50%", width: 28, height: 28, borderRadius: "50%", border: `2.5px solid ${QC[c.q]}`, animation: "landRing 0.7s ease-out forwards", pointerEvents: "none" }} />
                )}
                {/* Dot */}
                <div style={{
                  width: isH ? 22 : 15, height: isH ? 22 : 15,
                  borderRadius: "50%", background: QC[c.q],
                  border: isH ? "2px solid #0f172a" : "1.5px solid rgba(255,255,255,0.75)",
                  boxShadow: isH ? `0 0 12px ${QC[c.q]}50` : `0 1px 4px rgba(0,0,0,0.1)`,
                  transition: "width 0.15s, height 0.15s, border 0.15s, box-shadow 0.15s",
                }} />
                {/* Label */}
                <div style={{
                  position: "absolute", bottom: "calc(100% + 5px)", left: "50%",
                  transform: "translateX(-50%)", whiteSpace: "nowrap",
                  fontSize: 14, fontWeight: 600, color: "#1e293b",
                  textShadow: "0 0 6px rgba(255,255,255,0.95), 0 0 3px rgba(255,255,255,1)",
                  pointerEvents: "none",
                }}>
                  {c.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected detail panel */}
      {sel !== null && (() => {
        const c = subject.competitors[sel]; const isA = c.name.startsWith("Aurix");
        return (
          <div style={{ margin: "10px 0 0", padding: "14px 16px", background: isA ? "rgba(220,252,231,0.5)" : "rgba(248,250,252,0.55)", border: `1px solid ${isA ? "#86efac" : "#e2e8f0"}`, borderRadius: 14, fontSize: 19, lineHeight: 1.65, color: "#1e293b", backdropFilter: "blur(10px)" }}>
            <div style={{ fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {c.name}
              <span style={{ fontSize: 14, background: QB[c.q], color: QC[c.q], padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>{c.q}</span>
              {adjusted && <span style={{ fontSize: 14, color: "#64748b", background: "rgba(241,245,249,0.6)", padding: "2px 8px", borderRadius: 6 }}>Adj.Exec: {c.ae}</span>}
            </div>
            {c.notes}
          </div>
        );
      })()}
    </div>
  );
}

/* ═══════ FEATURE MATRIX ═══════ */
function Features({ subject }: any) {
  const keys = Object.keys(subject.featLabels);
  const aurix = subject.competitors.find((c: any) => c.name.startsWith("Aurix"));
  const rest = subject.competitors.filter((c: any) => !c.name.startsWith("Aurix")).sort((a: any, b: any) => b.e - a.e);
  const all = aurix ? [aurix, ...rest] : rest;
  return (
    <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #e2e8f0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 17 }}>
        <thead><tr style={{ background: "rgba(248,250,252,0.7)" }}>
          <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #cbd5e1", color: "#475569", fontWeight: 700, position: "sticky", left: 0, background: "rgba(248,250,252,0.95)", backdropFilter: "blur(8px)", zIndex: 2, minWidth: 145 }}>Capability</th>
          {all.map((c: any) => <th key={c.name} style={{ padding: "10px 6px", textAlign: "center", borderBottom: "2px solid #cbd5e1", color: c.name.startsWith("Aurix") ? "#15803d" : "#1e293b", fontWeight: c.name.startsWith("Aurix") ? 800 : 600, background: c.name.startsWith("Aurix") ? "rgba(220,252,231,0.35)" : "transparent", minWidth: 80, fontSize: 14 }}>{c.name.replace("Aurix ","★ ")}</th>)}
        </tr></thead>
        <tbody>
          {keys.map((k, ri) => (
            <tr key={k}>
              <td style={{ padding: "8px 14px", fontWeight: 600, color: "#334155", borderBottom: "1px solid #f1f5f9", background: ri%2===0 ? "rgba(248,250,252,0.9)" : "rgba(255,255,255,0.9)", position: "sticky", left: 0, backdropFilter: "blur(8px)", zIndex: 1 }}>{subject.featLabels[k]}</td>
              {all.map((c: any) => <td key={c.name} style={{ padding: "7px", textAlign: "center", borderBottom: "1px solid #f1f5f9", background: c.name.startsWith("Aurix") ? (ri%2===0?"rgba(220,252,231,0.2)":"rgba(220,252,231,0.1)") : (ri%2===0?"rgba(248,250,252,0.3)":"transparent") }}>
                {c.f && c.f[k] ? <span style={{ color: "#16a34a", fontSize: 22, fontWeight: 800 }}>✓</span> : <span style={{ color: "#d1d5db", fontSize: 19 }}>—</span>}
              </td>)}
            </tr>
          ))}
          <tr style={{ background: "rgba(248,250,252,0.6)" }}>
            <td style={{ padding: "10px 14px", fontWeight: 900, color: "#0f172a", borderTop: "2px solid #cbd5e1", position: "sticky", left: 0, background: "rgba(248,250,252,0.95)", backdropFilter: "blur(8px)", zIndex: 1 }}>Score</td>
            {all.map((c: any) => { const ct = keys.filter(k => c.f && c.f[k]).length; return <td key={c.name} style={{ padding: "10px 6px", textAlign: "center", fontWeight: 900, fontSize: 22, borderTop: "2px solid #cbd5e1", color: c.name.startsWith("Aurix") ? "#15803d" : (ct >= keys.length*0.5 ? "#1e293b" : "#94a3b8"), background: c.name.startsWith("Aurix") ? "rgba(220,252,231,0.25)" : "transparent" }}>{ct}/{keys.length}</td>; })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ═══════ DEPLOY VIEW ═══════ */
function Deploy({ subject }: any) {
  const sorted = [...subject.competitors].sort((a: any, b: any) => (parseInt(a.dd)||999) - (parseInt(b.dd)||999));
  const maxD = Math.max(...sorted.map((c: any) => parseInt(c.dd.split("–").pop())||1));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
        <div style={{ background: "rgba(220,252,231,0.4)", border: "1px solid #86efac", borderRadius: 14, padding: 18, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#15803d", textTransform: "uppercase", letterSpacing: 2 }}>Aurix Deploy</div>
          <div style={{ fontSize: 49, fontWeight: 900, color: "#16a34a" }}>1–3<span style={{ fontSize: 22, fontWeight: 600 }}> days</span></div>
          <div style={{ fontSize: 16, color: "#475569" }}>Zero consulting hours</div>
        </div>
        <div style={{ background: "rgba(254,226,226,0.3)", border: "1px solid #fca5a5", borderRadius: 14, padding: 18, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#b91c1c", textTransform: "uppercase", letterSpacing: 2 }}>Industry Average</div>
          <div style={{ fontSize: 49, fontWeight: 900, color: "#dc2626" }}>30–90<span style={{ fontSize: 22, fontWeight: 600 }}> days</span></div>
          <div style={{ fontSize: 16, color: "#475569" }}>100–600+ consulting hours</div>
        </div>
      </div>
      {sorted.map((c: any) => {
        const isA = c.name.startsWith("Aurix"); const mv = parseInt(c.dd.split("–").pop())||1; const pct = Math.max(3, (mv/maxD)*100);
        return (
          <div key={c.name} style={{ background: isA ? "rgba(220,252,231,0.3)" : "rgba(248,250,252,0.4)", border: `1px solid ${isA?"#86efac":"#e2e8f0"}`, borderRadius: 12, padding: "10px 14px", backdropFilter: "blur(6px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5, flexWrap: "wrap", gap: 4 }}>
              <span style={{ fontWeight: isA?900:600, fontSize: 19, color: isA?"#15803d":"#1e293b" }}>{isA?"★ "+c.name:c.name}</span>
              <div style={{ display: "flex", gap: 12, fontSize: 16 }}>
                <span style={{ color: "#475569" }}><strong style={{ color: "#1e293b" }}>{c.dd}</strong> days</span>
                <span style={{ color: "#475569" }}><strong style={{ color: c.ch==="0"?"#16a34a":"#1e293b" }}>{c.ch}</strong> hrs</span>
              </div>
            </div>
            <div style={{ height: 6, background: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: pct+"%", background: isA?"linear-gradient(90deg,#16a34a,#4ade80)":pct>60?"linear-gradient(90deg,#ef4444,#f87171)":pct>30?"linear-gradient(90deg,#f59e0b,#fbbf24)":"linear-gradient(90deg,#3b82f6,#60a5fa)", borderRadius: 3 }}/>
            </div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 3, lineHeight: 1.4 }}>{c.dn}</div>
          </div>
        );
      })}
      <div style={{ padding: "10px 14px", background: "rgba(254,243,199,0.3)", border: "1px solid #fcd34d", borderRadius: 10, fontSize: 16, color: "#92400e", lineHeight: 1.55 }}>
        <strong>Scoring method:</strong> Vendors requiring Palantir-class consulting (300–800+ hrs, 60–120 day deploys) get –6 to –10 execution adjustment. Aurix's zero-consulting, 1–3 day deploy adds +12 to +15, achieving Leader in all domains.
      </div>
    </div>
  );
}

/* ═══════ MOAT VIEW ═══════ */
function Moat({ subject }: any) {
  const plats = [
    { n: "NavTrax", s: "Navigation", c: "#16a34a", i: "🧭" }, { n: "Defog Fluidity", s: "Personal Firewall", c: "#2563eb", i: "🛡" },
    { n: "Defog Shield", s: "Enterprise Governance", c: "#9333ea", i: "🏢" }, { n: "Skylane.One", s: "AI IDE", c: "#dc2626", i: "💻" },
    { n: "Extensibility", s: "API / Agent", c: "#d97706", i: "🔗" }, { n: "Aurix AI", s: "Platform Core", c: "#0891b2", i: "🤖" },
  ];
  const flows = [
    { f: "NavTrax", t: "Defog Shield", l: "Navigation → policy" }, { f: "NavTrax", t: "Aurix AI", l: "Telemetry → insight" },
    { f: "Defog Fluidity", t: "Defog Shield", l: "Personal → fleet" }, { f: "Skylane.One", t: "Aurix AI", l: "Build → govern" },
    { f: "Extensibility", t: "Defog Shield", l: "API calls → governed" }, { f: "Aurix AI", t: "Extensibility", l: "Agents → managed fabric" },
  ];
  return (
    <div>
      <div style={{ background: "rgba(220,252,231,0.25)", border: "1px solid #86efac", borderRadius: 16, padding: 18, marginBottom: 14, backdropFilter: "blur(8px)" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#15803d", marginBottom: 6 }}>What No Competitor Can Replicate</div>
        <p style={{ fontSize: 19, lineHeight: 1.7, color: "#334155" }}>Every vendor in <strong style={{ color: "#1e293b" }}>{subject.aurixAiTitle}</strong> is a point solution. Aurix is the <strong style={{ color: "#16a34a" }}>only platform</strong> where events propagate across all six domains within seconds through a shared event fabric — zero human intervention.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8, marginBottom: 14 }}>
        {plats.map(p => (
          <div key={p.n} style={{ background: "rgba(255,255,255,0.45)", border: `2px solid ${p.c}25`, borderRadius: 12, padding: "12px 8px", textAlign: "center", backdropFilter: "blur(6px)" }}>
            <div style={{ fontSize: 29, marginBottom: 2 }}>{p.i}</div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#1e293b" }}>{p.n}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{p.s}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1.5 }}>Cross-Platform Event Fabric</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {flows.map((fl, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(248,250,252,0.4)", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 10px", backdropFilter: "blur(4px)" }}>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#16a34a", minWidth: 78 }}>{fl.f}</span>
            <span style={{ color: "#94a3b8", fontSize: 19 }}>→</span>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#2563eb", minWidth: 78 }}>{fl.t}</span>
            <span style={{ fontSize: 14, color: "#64748b" }}>{fl.l}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(254,243,199,0.25)", border: "1px solid #fcd34d", borderRadius: 10, fontSize: 16, color: "#92400e", lineHeight: 1.55 }}>
        <strong>Architectural moat:</strong> Sub-second cross-domain event propagation with shared context cannot be replicated through acquisitions or API connectors. It's a multi-year, multi-billion-dollar rebuild.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  MAIN EXPORT                                           */
/* ═══════════════════════════════════════════════════════ */
export function AurixCompetitiveAnalysis() {
  const [subjectId, setSubjectId] = useState("lattice");
  const [tabId, setTabId] = useState("quadrant");
  const [animKey, setAnimKey] = useState(0);

  const subject = SUBJECTS.find(s => s.id === subjectId) || SUBJECTS[0];
  const aurix = subject.competitors.find(c => c.name.startsWith("Aurix")) || subject.competitors[0];
  const leaders = subject.competitors.filter(c => !c.name.startsWith("Aurix") && c.q === "Leader");
  const topLV = leaders.length ? Math.max(...leaders.map(l => l.v)) : 0;
  const topLE = leaders.length ? Math.max(...leaders.map(l => l.e)) : 0;
  const topLA = leaders.length ? Math.max(...leaders.map(l => l.ae)) : 0;

  const switchSubject = useCallback((id: string) => {
    setSubjectId(id); setTabId("quadrant"); setAnimKey(k => k + 1);
  }, []);

  const switchTab = useCallback((id: string) => {
    setTabId(id); if (id === "quadrant" || id === "adjusted") setAnimKey(k => k + 1);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI Variable','Segoe UI',system-ui,-apple-system,sans-serif", padding: "16px 10px", minHeight: "100vh" }}>
      <style>{`
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.1);border-radius:3px}
      `}</style>

      {/* ═══ HEADER ═══ */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#16a34a", fontWeight: 800, textTransform: "uppercase", marginBottom: 4 }}>Competitive Intelligence — February 2026</div>
        <h1 style={{ fontSize: 35, fontWeight: 900, color: "#0f172a", lineHeight: 1.15, marginBottom: 5 }}>Aurix AI vs. Market Leaders</h1>
        <p style={{ fontSize: 16, color: "#64748b", maxWidth: 560, margin: "0 auto", lineHeight: 1.5 }}>Deployment-adjusted positioning across four core Aurix platforms. Click any dot for details.</p>
      </div>

      {/* ═══ OUTER SUBJECT TABS — large, prominent ═══ */}
      <div style={{ maxWidth: 920, margin: "0 auto 14px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {SUBJECTS.map(s => {
            const active = subjectId === s.id;
            const [prodName, subtitle] = s.outerLabel.split(": ");
            const inactiveBg = "rgba(224,237,255,0.38)";
            const inactiveBorder = "1px solid rgba(186,215,255,0.45)";
            return (
              <button key={s.id} onClick={() => switchSubject(s.id)} style={{
                padding: "14px 20px 12px", borderRadius: 16, cursor: "pointer",
                fontSize: 17, fontWeight: active ? 800 : 600, fontFamily: "inherit",
                transition: "all 0.2s ease", flex: "1 1 190px", textAlign: "center",
                lineHeight: 1.3,
                background: active ? "rgba(255,255,255,0.95)" : inactiveBg,
                border: active ? "1.5px solid rgba(22,163,106,0.3)" : inactiveBorder,
                color: active ? "#0f172a" : "#475569",
                boxShadow: active ? "0 3px 14px rgba(0,0,0,0.08), 0 0 0 1.5px rgba(22,163,106,0.15)" : "0 1px 4px rgba(0,0,0,0.03)",
                backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
              }}>
                <span style={{ fontSize: 22, display: "block", marginBottom: 4 }}>{s.icon}</span>
                <span style={{ fontWeight: 800, color: active ? "#0f172a" : "#334155" }}>{prodName}:</span>
                <br />
                <span style={{ fontWeight: active ? 700 : 500, fontSize: 14, color: active ? "#334155" : "#64748b" }}>{subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ MAIN GLASS CARD ═══ */}
      <div style={{ maxWidth: 1040, margin: "0 auto", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)", borderRadius: 22, border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 12px 60px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)", overflow: "visible" }}>

        {/* Title bar */}
        <div style={{ padding: "20px 26px 0", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>{subject.aurixAiTitle}</h2>
            <div style={{ fontSize: 16, color: "#64748b", marginTop: 2 }}>
              Source: {subject.aurixAiDate} · Aurix: <span style={{ color: "#16a34a", fontWeight: 700 }}>{subject.aurixProduct}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, fontSize: 14 }}>
            {Object.entries(QC).map(([l, c]) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 4, color: "#475569" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block", boxShadow: `0 0 4px ${c}30` }}/>{l}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ INNER COMPARISON TABS ═══ */}
        <div style={{ padding: "14px 26px 0" }}>
          <div style={{ background: "rgba(241,245,249,0.5)", backdropFilter: "blur(16px)", borderRadius: 13, border: "1px solid rgba(226,232,240,0.5)", padding: 5, display: "flex", gap: 4, flexWrap: "wrap" }}>
            {TABS.map(t => {
              const active = tabId === t.id;
              const inBg = "rgba(224,237,255,0.32)";
              const inBorder = "1px solid rgba(186,215,255,0.4)";
              return (
                <button key={t.id} onClick={() => switchTab(t.id)} style={{
                  padding: "9px 16px", borderRadius: 10, cursor: "pointer",
                  fontSize: 16, fontWeight: active ? 700 : 500, fontFamily: "inherit",
                  transition: "all 0.15s ease", flex: "1 1 auto", minWidth: 100, textAlign: "center",
                  background: active ? "rgba(255,255,255,0.96)" : inBg,
                  border: active ? "1px solid rgba(22,163,106,0.25)" : inBorder,
                  color: active ? "#0f172a" : "#475569",
                  boxShadow: active ? "0 2px 6px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" : "none",
                }}>
                  <span style={{ marginRight: 5 }}>{t.icon}</span>{t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ TAB CONTENT ═══ */}
        <div style={{ padding: 26 }}>

          {tabId === "quadrant" && (
            <div>
              <div style={{ fontSize: 16, color: "#64748b", marginBottom: 12, padding: "8px 14px", background: "rgba(248,250,252,0.5)", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                <strong style={{ color: "#334155" }}>Original Aurix AI-style scores</strong> — published MQ data + feature analysis. Does not factor deployment speed.
              </div>
              <Chart subject={subject} adjusted={false} animKey={animKey} />
            </div>
          )}

          {tabId === "adjusted" && (
            <div>
              <div style={{ fontSize: 16, color: "#475569", marginBottom: 12, padding: "10px 14px", background: "rgba(220,252,231,0.22)", borderRadius: 10, border: "1px solid #86efac", lineHeight: 1.55 }}>
                <strong style={{ color: "#15803d" }}>⚡ Deployment-adjusted</strong> — penalizes Palantir-class consulting dependency (300–800+ hrs). Aurix's 1–3 day / zero-consulting deploy moves it into Leader across all domains.
              </div>
              <Chart subject={subject} adjusted={true} animKey={animKey} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginTop: 16 }}>
                {[
                  { label: "Vision Lead", value: `+${aurix.v - topLV}`, color: "#16a34a", bg: "rgba(220,252,231,0.35)", border: "#86efac", sub: "vs. top Leader" },
                  { label: "Orig. Exec Gap", value: `${aurix.e - topLE}`, color: "#2563eb", bg: "rgba(219,234,254,0.35)", border: "#93c5fd", sub: "before adjust" },
                  { label: "Adjusted Gap", value: `${aurix.ae >= topLA ? "+" : ""}${aurix.ae - topLA}`, color: aurix.ae >= topLA ? "#16a34a" : "#2563eb", bg: aurix.ae >= topLA ? "rgba(220,252,231,0.4)" : "rgba(219,234,254,0.35)", border: aurix.ae >= topLA ? "#4ade80" : "#93c5fd", sub: "after deploy factor" },
                  { label: "Unique Caps", value: `${Object.values(aurix.f || {}).filter(Boolean).length}`, color: "#9333ea", bg: "rgba(243,232,255,0.35)", border: "#c4b5fd", sub: "full coverage" },
                ].map(card => (
                  <div key={card.label} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: 14, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: card.color, textTransform: "uppercase", letterSpacing: 1.5 }}>{card.label}</div>
                    <div style={{ fontSize: 40, fontWeight: 900, color: card.color, margin: "3px 0" }}>{card.value}</div>
                    <div style={{ fontSize: 14, color: "#475569" }}>{card.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tabId === "features" && (
            <div>
              <div style={{ fontSize: 16, color: "#64748b", marginBottom: 12, padding: "8px 14px", background: "rgba(248,250,252,0.5)", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                <strong style={{ color: "#334155" }}>Head-to-head capability matrix</strong> — Aurix is the only vendor with complete coverage across every category.
                {subjectId === "agentic" && <span style={{ color: "#15803d", fontWeight: 700 }}> AgenticMind's 1,000+ pre-built agents and composite agent generation are unmatched.</span>}
              </div>
              <Features subject={subject} />
            </div>
          )}

          {tabId === "deploy" && (
            <div>
              <div style={{ fontSize: 16, color: "#475569", marginBottom: 12, padding: "8px 14px", background: "rgba(254,243,199,0.25)", borderRadius: 10, border: "1px solid #fcd34d" }}>
                <strong style={{ color: "#92400e" }}>Time-to-Value analysis</strong> — Aurix: 1–3 days, 0 consulting vs. competitors' 30–120 days and hundreds of Palantir-class SI hours.
              </div>
              <Deploy subject={subject} />
            </div>
          )}

          {tabId === "moat" && <Moat subject={subject} />}
        </div>

        {/* ═══ AURIX SUMMARY CARD ═══ */}
        <div style={{ margin: "0 26px 26px", background: "rgba(220,252,231,0.28)", border: "1px solid #86efac", borderRadius: 16, padding: 20, backdropFilter: "blur(10px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 29 }}>★</span>
            <span style={{ fontWeight: 900, color: "#15803d", fontSize: 23 }}>{aurix.name}</span>
            <span style={{ fontSize: 14, background: "#dcfce7", color: "#16a34a", padding: "3px 10px", borderRadius: 8, fontWeight: 700, border: "1px solid #86efac" }}>Leader (Adjusted)</span>
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.75, color: "#334155" }}>{aurix.notes}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 16, flexWrap: "wrap" }}>
            {[
              ["Vision", aurix.v+"/100", "#15803d"], ["Orig.Exec", aurix.e+"/100", "#475569"],
              ["Adj.Exec", aurix.ae+"/100", "#16a34a"], ["Deploy", aurix.dd+" days", "#16a34a"],
              ["Consulting", aurix.ch+" hrs", "#16a34a"],
            ].map(([l,val,clr]) => <span key={l} style={{ color: "#475569" }}>{l}: <strong style={{ color: clr }}>{val}</strong></span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
