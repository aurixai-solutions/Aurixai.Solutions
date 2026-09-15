import React, { useState, useEffect, useRef } from "react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════
const JOURNEY = {
  title: "Q3 Campaign Budget Allocation — $2.4M Portfolio",
  totalNodes: 14, totalDeadEnds: 3, depthLevels: 4,
  durationMs: 4850, totalTokens: 18720, totalCost: 0.1247, finalConfidence: 0.87,
  narrative: "The AI evaluated a $2.4M Q3 marketing budget across 6 channels, exploring paid social, display, content/SEO, and influencer paths. After analyzing performance data, market conditions, and competitive intelligence, it abandoned display advertising, rejected an aggressive influencer strategy, and deprioritized podcast sponsorship. Final allocation: 55% Paid Social, 25% Content/SEO, 12% Email, 8% Events — achieving 87% confidence."
};

const NODES: any[] = [
  { id:"dn_001", parent:null, seq:1, depth:0, type:"root", label:"Analyze Current Performance", question:"What is the current state of our marketing performance?", answer:"Q2 revenue trailing at $2.4M, CAC trending down 12%, but competitor spend data is 48 hours stale.", reasoning:"Started by pulling all available performance metrics. Revenue data is strong, CAC improvement is encouraging, but competitive intelligence has a staleness gap.", confidence:0.32, delta:null, tokens:1840, latency:380, cost:0.0122, dq:0.85, importance:0.70, emotion:"neutral", icon:"magnifier", isDeadEnd:false, deadEndReason:null, factors:[{name:"Q2 Revenue",value:"$2.4M trailing",weight:0.85,dir:"positive",decisive:false,tip:"Fresh revenue data from Salesforce"},{name:"CAC Trend",value:"-12% QoQ",weight:0.65,dir:"positive",decisive:false,tip:"Improving acquisition costs"},{name:"Competitor Intel",value:"48hr stale",weight:0.40,dir:"negative",decisive:false,tip:"Stale data introduces uncertainty"}] },
  { id:"dn_002", parent:"dn_001", seq:2, depth:1, type:"branch", label:"Evaluate Channel Portfolio", question:"Which channels should receive budget allocation?", answer:"6 candidate channels identified. Evaluating each independently.", reasoning:"Branching evaluation across all viable channels.", confidence:0.38, delta:0.06, tokens:1420, latency:290, cost:0.0094, dq:0.82, importance:0.85, emotion:"uncertain", icon:"scale", isDeadEnd:false, deadEndReason:null, factors:[{name:"Available Channels",value:"6 candidates",weight:0.50,dir:"neutral",decisive:false,tip:"Paid Social, Display, Content/SEO, Email, Events, Influencer"},{name:"Historical Data",value:"4 quarters",weight:0.75,dir:"positive",decisive:false,tip:"Strong baseline"},{name:"Budget Constraint",value:"$2.4M cap",weight:0.90,dir:"neutral",decisive:true,tip:"Hard ceiling constrains options"}] },
  { id:"dn_003", parent:"dn_002", seq:3, depth:2, type:"milestone", label:"Evaluate Paid Social", question:"Should paid social receive primary allocation?", answer:"Strong yes — best risk-adjusted return. iOS 14 attribution improving, CPMs down 8%.", reasoning:"Three key factors aligned: improving attribution, decreasing CPMs, deep creative library.", confidence:0.62, delta:0.24, tokens:2100, latency:440, cost:0.0140, dq:0.91, importance:0.90, emotion:"confident", icon:"lightbulb", isDeadEnd:false, deadEndReason:null, factors:[{name:"iOS 14 Recovery",value:"+12% match rate",weight:0.82,dir:"positive",decisive:true,tip:"Server-side tracking restored confidence"},{name:"CPM Trend",value:"-8% QoQ",weight:0.71,dir:"positive",decisive:false,tip:"Buying window before Q4 inflation"},{name:"Creative Library",value:"47 assets ready",weight:0.55,dir:"positive",decisive:false,tip:"Deep bench reduces production risk"},{name:"Fatigue Risk",value:"Medium",weight:0.38,dir:"negative",decisive:false,tip:"Top creatives showing 15% CTR decline"}] },
  { id:"dn_004", parent:"dn_002", seq:4, depth:2, type:"dead_end", label:"Evaluate Display Advertising", question:"Should display get significant budget?", answer:"No — CTR at 0.21% below 0.30% threshold. Abandoned.", reasoning:"Display rejected decisively. CTR declining for 3 quarters, now below viability.", confidence:0.18, delta:-0.20, tokens:1240, latency:260, cost:0.0082, dq:0.88, importance:0.75, emotion:"alarmed", icon:"warning", isDeadEnd:true, deadEndReason:"CTR at 0.21% — below 0.30% minimum viability threshold.", factors:[{name:"Display CTR",value:"0.21%",weight:0.90,dir:"negative",decisive:true,tip:"Below threshold — channel not viable"},{name:"Programmatic CPM",value:"+15% QoQ",weight:0.65,dir:"negative",decisive:false,tip:"Rising costs with falling performance"},{name:"Brand Safety",value:"3 incidents",weight:0.45,dir:"negative",decisive:false,tip:"Adjacent placement issues"}] },
  { id:"dn_005", parent:"dn_002", seq:5, depth:2, type:"milestone", label:"Evaluate Content/SEO", question:"Should content/SEO get significant budget?", answer:"Yes, as secondary. Compound growth potential but 6-month payback limits Q3 impact.", reasoning:"Excellent long-term fundamentals but payback period limits Q3 ROI.", confidence:0.54, delta:0.16, tokens:1680, latency:350, cost:0.0112, dq:0.87, importance:0.70, emotion:"cautious", icon:"magnifier", isDeadEnd:false, deadEndReason:null, factors:[{name:"Organic Traffic",value:"+22% YoY",weight:0.70,dir:"positive",decisive:false,tip:"Strong growth trajectory"},{name:"Conversion Rate",value:"3.8%",weight:0.65,dir:"positive",decisive:false,tip:"Higher than paid channels"},{name:"Payback Period",value:"6 months",weight:0.80,dir:"negative",decisive:true,tip:"Long payback limits Q3 impact"},{name:"Competitor Gap",value:"High opportunity",weight:0.55,dir:"positive",decisive:false,tip:"Competitors underinvesting"}] },
  { id:"dn_006", parent:"dn_002", seq:6, depth:2, type:"dead_end", label:"Evaluate Influencer Marketing", question:"Should influencer get major allocation?", answer:"No — insufficient ROI data. Only 2 quarters measured.", reasoning:"Rejected due to measurement immaturity.", confidence:0.28, delta:-0.10, tokens:980, latency:200, cost:0.0065, dq:0.55, importance:0.65, emotion:"uncertain", icon:"warning", isDeadEnd:true, deadEndReason:"Insufficient ROI history (2 of 4 quarters needed). +/-45% result variance.", factors:[{name:"ROI Data",value:"2 quarters only",weight:0.85,dir:"negative",decisive:true,tip:"Need 4+ quarters for reliable prediction"},{name:"Result Variance",value:"+/-45%",weight:0.70,dir:"negative",decisive:false,tip:"Extreme variance"},{name:"Audience Match",value:"72%",weight:0.50,dir:"positive",decisive:false,tip:"Good but not decisive"}] },
  { id:"dn_007", parent:"dn_002", seq:7, depth:2, type:"sub_evaluation", label:"Evaluate Email Nurture", question:"What role should email play?", answer:"Supporting role at 12% — 42:1 ROI on existing lists.", reasoning:"Reliable supporting channel. Low cost but limited growth ceiling.", confidence:0.68, delta:0.14, tokens:820, latency:170, cost:0.0054, dq:0.93, importance:0.50, emotion:"confident", icon:"checkpoint", isDeadEnd:false, deadEndReason:null, factors:[{name:"Email ROI",value:"42:1",weight:0.80,dir:"positive",decisive:false,tip:"Exceptional cost efficiency"},{name:"List Size",value:"145K active",weight:0.60,dir:"positive",decisive:false,tip:"24% open rate"},{name:"Growth Ceiling",value:"Limited",weight:0.55,dir:"negative",decisive:true,tip:"3% monthly growth caps scalability"}] },
  { id:"dn_008", parent:"dn_002", seq:8, depth:2, type:"dead_end", label:"Evaluate Podcast Sponsorship", question:"Should we sponsor podcasts?", answer:"No — audience demographic mismatch. ICP 25-34 enterprise vs inventory 35-54 SMB.", reasoning:"Rejected due to fundamental audience misalignment.", confidence:0.15, delta:-0.13, tokens:660, latency:140, cost:0.0044, dq:0.78, importance:0.55, emotion:"alarmed", icon:"warning", isDeadEnd:true, deadEndReason:"ICP mismatch: target 25-34 enterprise, inventory skews 35-54 SMB.", factors:[{name:"Demographics",value:"35-54 SMB",weight:0.90,dir:"negative",decisive:true,tip:"Critical ICP mismatch"},{name:"CPM Range",value:"$25-40",weight:0.50,dir:"negative",decisive:false,tip:"Premium pricing for wrong audience"},{name:"Attribution",value:"Immature",weight:0.60,dir:"negative",decisive:false,tip:"Vanity URLs are imprecise"}] },
  { id:"dn_009", parent:"dn_002", seq:9, depth:2, type:"sub_evaluation", label:"Evaluate Event Marketing", question:"What role should events play?", answer:"Small but strategic at 8% — high-value enterprise pipeline.", reasoning:"2-3 high-impact conferences. 68% of closed-won deals have event touchpoints.", confidence:0.72, delta:0.04, tokens:720, latency:150, cost:0.0048, dq:0.89, importance:0.50, emotion:"confident", icon:"checkpoint", isDeadEnd:false, deadEndReason:null, factors:[{name:"Pipeline per $",value:"$14.50:$1",weight:0.75,dir:"positive",decisive:true,tip:"Highest quality enterprise pipeline"},{name:"Deal Influence",value:"68% closed-won",weight:0.70,dir:"positive",decisive:false,tip:"Nearly 7 in 10 deals had event touchpoint"},{name:"Absolute Cost",value:"High per unit",weight:0.50,dir:"negative",decisive:false,tip:"Justified by deal size"}] },
  { id:"dn_010", parent:"dn_002", seq:10, depth:1, type:"convergence", label:"Converge Channel Recommendations", question:"How should surviving channels be weighted?", answer:"55% Paid Social, 25% Content/SEO, 12% Email, 8% Events.", reasoning:"With three dead ends eliminated, remaining four optimized. Confidence jumped 54% to 82%.", confidence:0.82, delta:0.28, tokens:2440, latency:510, cost:0.0162, dq:0.88, importance:0.95, emotion:"eureka", icon:"lightbulb", isDeadEnd:false, deadEndReason:null, factors:[{name:"Paths Evaluated",value:"7 total",weight:0.50,dir:"neutral",decisive:false,tip:"4 surviving + 3 eliminated"},{name:"Dead End Investment",value:"2,880 tokens",weight:0.40,dir:"positive",decisive:false,tip:"Prevented misallocation"},{name:"Diversification",value:"HHI 0.38",weight:0.65,dir:"positive",decisive:true,tip:"Healthy portfolio balance"},{name:"Time-to-Impact",value:"Q3 aligned",weight:0.80,dir:"positive",decisive:true,tip:"All channels deliver Q3 impact"}] },
  { id:"dn_011", parent:"dn_010", seq:11, depth:2, type:"sub_evaluation", label:"Assess Portfolio Risk", question:"What are the key risks?", answer:"Creative fatigue (Medium), competitive response (Low-Medium). Manageable.", reasoning:"Risk assessment validates the portfolio.", confidence:0.84, delta:0.02, tokens:1150, latency:240, cost:0.0076, dq:0.82, importance:0.60, emotion:"cautious", icon:"shield", isDeadEnd:false, deadEndReason:null, factors:[{name:"Creative Fatigue",value:"Medium",weight:0.65,dir:"negative",decisive:false,tip:"15% CTR decline — rotate creatives"},{name:"Competitive Response",value:"Low-Medium",weight:0.45,dir:"negative",decisive:false,tip:"Stable environment"},{name:"Attribution Health",value:"High",weight:0.70,dir:"positive",decisive:false,tip:"Post-iOS 14 recovery"}] },
  { id:"dn_012", parent:"dn_010", seq:12, depth:2, type:"sub_evaluation", label:"Run Scenario Simulations", question:"What if allocations shift +/-10%?", answer:"Portfolio stable. +/-6% ROI variance. Worst case -12%.", reasoning:"Monte Carlo confirms robustness.", confidence:0.85, delta:0.01, tokens:1890, latency:400, cost:0.0126, dq:0.90, importance:0.65, emotion:"confident", icon:"scale", isDeadEnd:false, deadEndReason:null, factors:[{name:"Sensitivity",value:"+/-6% ROI",weight:0.70,dir:"neutral",decisive:false,tip:"Manageable variance"},{name:"Stability Score",value:"0.87/1.00",weight:0.80,dir:"positive",decisive:true,tip:"1000 scenarios confirm robustness"},{name:"Worst Case",value:"-12% floor",weight:0.55,dir:"neutral",decisive:false,tip:"Acceptable risk"}] },
  { id:"dn_013", parent:"dn_010", seq:13, depth:1, type:"milestone", label:"Final Confidence Assessment", question:"Sufficient confidence to present?", answer:"87% confidence exceeds 75% executive threshold.", reasoning:"All evidence integrated. Exceeds presentation threshold.", confidence:0.87, delta:0.02, tokens:640, latency:130, cost:0.0042, dq:0.90, importance:0.80, emotion:"confident", icon:"checkpoint", isDeadEnd:false, deadEndReason:null, factors:[{name:"Overall Confidence",value:"87%",weight:1.00,dir:"positive",decisive:true,tip:"Exceeds 75% threshold"},{name:"Data Quality",value:"90%",weight:0.85,dir:"positive",decisive:false,tip:"High reliability"},{name:"Completeness",value:"7/7 evaluated",weight:0.70,dir:"positive",decisive:false,tip:"No blind spots"}] },
  { id:"dn_014", parent:"dn_013", seq:14, depth:0, type:"final_decision", label:"Final Allocation: Q3 Budget", question:"Final recommended allocation?", answer:"Paid Social 55% ($1.32M) | Content/SEO 25% ($600K) | Email 12% ($288K) | Events 8% ($192K)", reasoning:"14 decision points, 3 dead ends explored, simulations run, risk assessed — 87% confidence.", confidence:0.87, delta:0.00, tokens:1140, latency:240, cost:0.0076, dq:0.92, importance:1.00, emotion:"confident", icon:"laptop", isDeadEnd:false, deadEndReason:null, factors:[{name:"Paid Social",value:"55% — $1.32M",weight:0.95,dir:"positive",decisive:true,tip:"Primary growth driver"},{name:"Content/SEO",value:"25% — $600K",weight:0.75,dir:"positive",decisive:false,tip:"Compound growth"},{name:"Email",value:"12% — $288K",weight:0.60,dir:"positive",decisive:false,tip:"Efficient retention"},{name:"Events",value:"8% — $192K",weight:0.55,dir:"positive",decisive:false,tip:"Enterprise pipeline"},{name:"Display",value:"ELIMINATED",weight:0,dir:"negative",decisive:false,tip:"CTR below threshold"},{name:"Influencer",value:"ELIMINATED",weight:0,dir:"negative",decisive:false,tip:"Insufficient data"},{name:"Podcast",value:"ELIMINATED",weight:0,dir:"negative",decisive:false,tip:"Audience mismatch"}] }
];

const ICONS: Record<string, string> = { magnifier:"🔍", scale:"⚖️", lightbulb:"💡", warning:"⚠️", shield:"🛡️", checkpoint:"✅", laptop:"💻" };
const confColor = (c: number) => c >= 0.7 ? "#00d68f" : c >= 0.4 ? "#ffd700" : "#ff4757";

const TABS = [
  { id: "tree",          icon: "🌳", label: "Tree" },
  { id: "journey",       icon: "🚀", label: "Journey" },
  { id: "constellation", icon: "✨", label: "Constellation" },
];

/* ═══════════════════════════════════════════════════
   DETAIL PANEL  (position: fixed — works in any mode)
   ═══════════════════════════════════════════════════ */
function DetailPanel({ node, onClose, navBottom }: { node: any; onClose: () => void; navBottom: number }) {
  if (!node) return null;
  return (
    <div style={{ position:"fixed", right:0, top:navBottom, bottom:0, width:420, zIndex:300, background:"rgba(12,18,32,0.96)", borderLeft:"1px solid rgba(0,229,255,0.15)", backdropFilter:"blur(30px)", overflowY:"auto", padding:"28px", scrollbarWidth:"thin", scrollbarColor:"rgba(0,229,255,0.15) transparent" }}>
      <button onClick={onClose} style={{ position:"absolute", top:16, right:16, background:"rgba(255,255,255,0.06)", border:"none", color:"#8892a8", width:32, height:32, borderRadius:8, cursor:"pointer", fontSize:16 }}>✕</button>
      <h3 style={{ fontFamily:"'Sora',system-ui,sans-serif", fontSize:22, fontWeight:700, letterSpacing:"-0.3px", lineHeight:1.25, color:"#e8ecf4", marginBottom:16, paddingRight:40 }}>{ICONS[node.icon]} {node.label}</h3>
      <div style={{ marginBottom:16 }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, padding:"3px 8px", borderRadius:4, textTransform:"uppercase", letterSpacing:1, background:node.isDeadEnd?"rgba(255,71,87,0.1)":node.type==="final_decision"?"rgba(255,215,0,0.1)":"rgba(0,229,255,0.1)", color:node.isDeadEnd?"#ff4757":node.type==="final_decision"?"#ffd700":"#00e5ff" }}>{node.type.replace("_"," ")}</span>
      </div>
      <p style={{ fontStyle:"italic", color:"#4a5568", marginBottom:12, fontSize:13 }}>"{node.question}"</p>
      <p style={{ color:"#8892a8", fontSize:14, lineHeight:1.6, marginBottom:16 }}>{node.answer}</p>
      <p style={{ color:"#4a5568", fontSize:13, lineHeight:1.6, marginBottom:20 }}>{node.reasoning}</p>
      {node.isDeadEnd && <div style={{ background:"rgba(255,71,87,0.08)", border:"1px solid rgba(255,71,87,0.2)", borderRadius:8, padding:12, marginBottom:16, fontSize:13, color:"#ff4757" }}>↩️ <strong>Abandoned:</strong> {node.deadEndReason}</div>}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
        {[{v:`${(node.confidence*100).toFixed(0)}%`,l:"Confidence",c:confColor(node.confidence)},{v:node.tokens.toLocaleString(),l:"Tokens",c:"#00e5ff"},{v:`${node.latency}ms`,l:"Latency",c:"#e8ecf4"},{v:`${(node.dq*100).toFixed(0)}%`,l:"Data Quality",c:confColor(node.dq)}].map((m,i)=>(
          <div key={i} style={{ background:"rgba(20,30,55,0.85)", padding:12, borderRadius:8, border:"1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:24, color:m.c }}>{m.v}</div>
            <div style={{ fontSize:10, color:"#4a5568", textTransform:"uppercase", letterSpacing:1 }}>{m.l}</div>
          </div>
        ))}
      </div>
      <h4 style={{ fontSize:13, color:"#4a5568", textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Decision Factors</h4>
      {node.factors.map((f: any, i: number) => (
        <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
          <div><div style={{ fontSize:13, color:"#e8ecf4" }}>{f.name} {f.decisive?"⭐":""}</div><div style={{ fontSize:11, color:"#4a5568" }}>{f.value}</div></div>
          <div style={{ textAlign:"right" }}><div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14, color:f.dir==="positive"?"#00d68f":f.dir==="negative"?"#ff4757":"#8892a8" }}>{(f.weight*100).toFixed(0)}%</div></div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TREE VIEW  (renders in normal page flow — no inner scroll)
   ═══════════════════════════════════════════════════ */
function TreeView({ onSelectNode }: { onSelectNode: (n: any) => void }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  function TreeNode({ node, delay }: { node: any; delay: number }) {
    const children = NODES.filter(n => n.parent === node.id);
    const isOpen = expanded[node.id];
    return (
      <div style={{ marginLeft: 28, position: "relative" }}>
        <div style={{ position:"absolute", left:-16, top:0, bottom:0, width:1, background:"linear-gradient(180deg, rgba(0,229,255,0.3), rgba(0,229,255,0.05))" }} />
        <div
          onClick={() => { toggle(node.id); onSelectNode(node); }}
          style={{ position:"relative", margin:"8px 0", padding:"16px 20px", background:"rgba(20,30,55,0.85)", borderRadius:12, border:`1px solid ${node.isDeadEnd?"rgba(255,71,87,0.2)":node.type==="final_decision"?"rgba(255,215,0,0.25)":node.type==="convergence"?"rgba(167,139,250,0.25)":"rgba(255,255,255,0.06)"}`, cursor:"pointer", transition:"all 0.3s", animation:`dsNodeIn 0.5s ease ${delay*0.06}s both` }}
        >
          <div style={{ position:"absolute", left:-16, top:24, width:16, height:1, background:"rgba(0,229,255,0.3)" }} />
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <div style={{ width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:8, fontSize:16, background:node.isDeadEnd?"rgba(255,71,87,0.12)":node.type==="final_decision"?"rgba(255,215,0,0.12)":"rgba(0,229,255,0.12)" }}>{ICONS[node.icon]}</div>
            <span style={{ fontWeight:600, fontSize:15, color:"#e8ecf4", flex:1 }}>{node.label}</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, padding:"3px 8px", borderRadius:4, textTransform:"uppercase" as const, letterSpacing:1, background:node.isDeadEnd?"rgba(255,71,87,0.1)":node.type==="final_decision"?"rgba(255,215,0,0.1)":node.type==="convergence"?"rgba(167,139,250,0.1)":"rgba(0,229,255,0.1)", color:node.isDeadEnd?"#ff4757":node.type==="final_decision"?"#ffd700":node.type==="convergence"?"#a78bfa":"#00e5ff" }}>{node.type.replace("_"," ")}</span>
          </div>
          <div style={{ fontSize:13, color:"#8892a8", lineHeight:1.5 }}>{node.answer}</div>
          {node.isDeadEnd && <div style={{ fontSize:12, color:"#ff4757", marginTop:8, padding:"8px 12px", background:"rgba(255,71,87,0.06)", borderRadius:6, borderLeft:"2px solid #ff4757" }}>↩️ {node.deadEndReason}</div>}
          <div style={{ display:"flex", gap:16, marginTop:10, flexWrap:"wrap" as const }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#4a5568" }}>Conf: <span style={{ color:confColor(node.confidence) }}>{(node.confidence*100).toFixed(0)}%</span></span>
            {node.delta!==null && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#4a5568" }}>Δ <span style={{ color:node.delta>=0?"#00d68f":"#ff4757" }}>{node.delta>=0?"+":""}{(node.delta*100).toFixed(0)}%</span></span>}
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#4a5568" }}>Tokens: <span style={{ color:"#00e5ff" }}>{node.tokens.toLocaleString()}</span></span>
          </div>
          <div style={{ height:3, borderRadius:2, background:"rgba(255,255,255,0.06)", marginTop:10, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:2, width:`${node.confidence*100}%`, background:confColor(node.confidence), transition:"width 0.6s" }} />
          </div>
          <div style={{ display:"flex", flexWrap:"wrap" as const, gap:6, marginTop:10 }}>
            {node.factors.map((f: any, i: number) => (
              <span key={i} title={f.tip} style={{ fontSize:11, padding:"4px 10px", borderRadius:20, border:`1px solid ${f.decisive?"rgba(255,215,0,0.3)":"rgba(255,255,255,0.08)"}`, background:f.decisive?"rgba(255,215,0,0.04)":"rgba(255,255,255,0.02)", color:"#8892a8", cursor:"help" }}>
                {f.name} <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:f.dir==="positive"?"#00d68f":f.dir==="negative"?"#ff4757":"#4a5568" }}>{(f.weight*100).toFixed(0)}%</span>
              </span>
            ))}
          </div>
          {isOpen && (
            <div style={{ paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.05)", marginTop:12 }}>
              <p style={{ fontStyle:"italic", color:"#4a5568", fontSize:13, marginBottom:8 }}>"{node.question}"</p>
              <p style={{ fontSize:13, color:"#8892a8", lineHeight:1.6 }}>{node.reasoning}</p>
            </div>
          )}
        </div>
        {children.map((c, i) => <TreeNode key={c.id} node={c} delay={delay + i + 1} />)}
      </div>
    );
  }

  return (
    /* Normal page-flow container — no overflow scroll */
    <div style={{ width:"100%", paddingBottom: 80 }}>
      {/* Intro card + stats: inside shared 8% horizontal padding */}
      <div style={{ padding: "16px 8% 0" }}>

        {/* ── Glassmorphic intro card: 100% wide, lighter than #080c14 ── */}
        <div style={{
          width: "100%",
          background: "rgba(22,38,70,0.80)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 16,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "24px 28px",
          marginBottom: 20,
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        }}>
          {/* Q3 title — site h2 size (next step down from hero) */}
          <h2 style={{
            fontFamily: "'Sora',system-ui,sans-serif",
            fontSize: "clamp(20px, 2.4vw, 28px)",
            fontWeight: 700,
            color: "#e8ecf4",
            letterSpacing: "-0.3px",
            lineHeight: 1.25,
            marginBottom: 12,
          }}>
            {JOURNEY.title}
          </h2>
          <p style={{ fontFamily: "'Sora',system-ui,sans-serif", fontSize: 14, color: "#8892a8", lineHeight: 1.65 }}>
            {JOURNEY.narrative}
          </p>
        </div>

        {/* ── Stats cards — paddingLeft:28 aligns with first TreeNode card ── */}
        <div style={{ paddingLeft: 28, paddingBottom: 24, display: "flex", gap: 12, flexWrap: "wrap" as const }}>
          {[
            { v: JOURNEY.totalNodes,                               l: "Decisions" },
            { v: JOURNEY.totalDeadEnds,                            l: "Dead Ends" },
            { v: `${(JOURNEY.finalConfidence*100).toFixed(0)}%`,   l: "Confidence" },
            { v: JOURNEY.totalTokens.toLocaleString(),             l: "Tokens" },
            { v: `$${JOURNEY.totalCost.toFixed(4)}`,               l: "Cost" },
            { v: `${(JOURNEY.durationMs/1000).toFixed(1)}s`,       l: "Duration" },
          ].map((s, i) => (
            <div key={i} style={{ display:"flex", flexDirection:"column" as const, padding:"10px 16px", background:"rgba(20,30,55,0.85)", borderRadius:10, border:"1px solid rgba(255,255,255,0.05)", minWidth: 88 }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:20, fontWeight:500, color:"#00e5ff" }}>{s.v}</span>
              <span style={{ fontSize:10, color:"#4a5568", textTransform:"uppercase" as const, letterSpacing:1, marginTop:2 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tree nodes — same 8% horizontal padding ── */}
      <div style={{ padding: "0 8%" }}>
        {NODES.filter(n => n.parent === null).map((r, i) => (
          <TreeNode key={r.id} node={r} delay={i} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   THREE.JS VIEW
   ═══════════════════════════════════════════════════ */
function ThreeView({ mode, onSelectNode, paused }: { mode: string; onSelectNode: (n: any) => void; paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ autoRotate: true, disposed: false });
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const THREE = (window as any).THREE;
    if (!THREE || !canvasRef.current) return;
    stateRef.current = { autoRotate: true, disposed: false };
    const canvas = canvasRef.current;
    const rect = canvas.parentElement!.getBoundingClientRect();

    const scene = new THREE.Scene();
    if (mode === "journey") { scene.fog = new THREE.FogExp2(0x080c14, 0.005); scene.background = new THREE.Color(0x080c14); }
    else { scene.background = new THREE.Color(0x040610); }

    const camera = new THREE.PerspectiveCamera(50, rect.width / rect.height, 0.1, 1000);
    if (mode === "journey") camera.position.set(-8, 3, 20);
    else camera.position.set(0, 5, 35);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0x1a2a4a, 0.6));
    const dl = new THREE.DirectionalLight(0x4488cc, 0.4); dl.position.set(10, 30, 20); scene.add(dl);

    const nodeObjects: any[] = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    if (mode === "journey") {
      const pl2 = new THREE.PointLight(0x00e5ff, 1.5, 80); pl2.position.set(0, 20, -10); scene.add(pl2);
      const gg = new THREE.PlaneGeometry(200, 200, 80, 80); gg.rotateX(-Math.PI / 2);
      const gv = gg.attributes.position.array as Float32Array;
      for (let i = 1; i < gv.length; i += 3) gv[i] = Math.sin(gv[i - 1] * 0.05) * 1.5 + Math.cos(gv[i + 1] * 0.03) * 1.2;
      gg.computeVertexNormals();
      scene.add(new THREE.Mesh(gg, new THREE.MeshStandardMaterial({ color: 0x0a1628, flatShading: true, transparent: true, opacity: 0.8 })));
      const wm2 = new THREE.Mesh(gg.clone(), new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.06 }));
      wm2.position.y = 0.05; scene.add(wm2);

      [[-45,-35,28,14],[-60,-25,20,9],[48,-30,25,11],[65,-35,17,8],[-40,-55,22,10],[55,-50,30,16],[-55,15,18,9],[60,10,14,7]].forEach(([x, z, h, s]) => {
        const cm = new THREE.Mesh(new THREE.ConeGeometry(s, h, 6), new THREE.MeshStandardMaterial({ color: 0x0f1a30, flatShading: true }));
        cm.position.set(x, h / 2 - 2, z); cm.rotation.y = Math.random() * Math.PI; scene.add(cm);
        const cw = new THREE.Mesh(new THREE.ConeGeometry(s, h, 6), new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.08 }));
        cw.position.copy(cm.position); cw.rotation.copy(cm.rotation); scene.add(cw);
      });

      const pathPoints: any[] = [];
      NODES.forEach((node) => {
        let x, y, z;
        if (node.type === "root") { x = 0; y = 0; z = 0; }
        else if (node.type === "final_decision") { x = 0; y = 38; z = -28; }
        else { const h = (node.seq / NODES.length) * 35; const sp = node.isDeadEnd ? 10 + Math.random() * 5 : 4 * Math.sin(node.seq * 0.7); x = sp * (node.seq % 2 === 0 ? 1 : -1); if (node.type === "convergence") x = 0; y = h; z = -node.seq * 2.2; }
        pathPoints.push(new THREE.Vector3(x, y, z));
        const size = 0.4 + node.importance * 0.6;
        const color = node.isDeadEnd ? 0xff4757 : node.type === "final_decision" ? 0xffd700 : node.type === "convergence" ? 0xa78bfa : node.emotion === "eureka" ? 0x00d68f : 0x00e5ff;
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(size, 16, 16), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3 + node.importance * 0.4, transparent: true, opacity: 0.9 }));
        sphere.position.set(x, y, z); sphere.userData = { node }; scene.add(sphere); nodeObjects.push(sphere);
        const ring = new THREE.Mesh(new THREE.RingGeometry(size * 1.5, size * 1.8, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.15, side: THREE.DoubleSide }));
        ring.position.copy(sphere.position); ring.userData = { ring: true }; scene.add(ring);
        const lc = document.createElement("canvas"); lc.width = 256; lc.height = 64; const lx = lc.getContext("2d")!; lx.font = "22px sans-serif"; lx.fillStyle = "#ffffff"; lx.textAlign = "center"; lx.fillText(node.label.substring(0, 28), 128, 40);
        const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(lc), transparent: true, opacity: 0.7 })); ls.position.set(x, y - size - 1.2, z); ls.scale.set(8, 2, 1); scene.add(ls);
      });

      const mp = NODES.filter(n => !n.isDeadEnd); const mpts = mp.map(n => pathPoints[NODES.indexOf(n)]);
      if (mpts.length >= 2) { const c = new THREE.CatmullRomCurve3(mpts); scene.add(new THREE.Mesh(new THREE.TubeGeometry(c, 100, 0.15, 8, false), new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.6 }))); scene.add(new THREE.Mesh(new THREE.TubeGeometry(c, 100, 0.5, 8, false), new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.08 }))); }
      NODES.filter(n => n.isDeadEnd).forEach(dn => { const pi = NODES.findIndex(n => n.id === dn.parent); const di = NODES.indexOf(dn); if (pi >= 0) { const c = new THREE.CatmullRomCurve3([pathPoints[pi], pathPoints[di]]); scene.add(new THREE.Mesh(new THREE.TubeGeometry(c, 20, 0.1, 6, false), new THREE.MeshBasicMaterial({ color: 0xff4757, transparent: true, opacity: 0.35 }))); } });

      const pg = new THREE.BufferGeometry(); const pc = 2500; const pp = new Float32Array(pc * 3);
      for (let i = 0; i < pc * 3; i += 3) { pp[i] = (Math.random() - 0.5) * 120; pp[i + 1] = Math.random() * 55 - 5; pp[i + 2] = (Math.random() - 0.5) * 120; }
      pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
      scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.08, transparent: true, opacity: 0.35 })));
    } else if (mode === "constellation") {
      const bg = new THREE.BufferGeometry(); const bc = 3000; const bp = new Float32Array(bc * 3); const bco = new Float32Array(bc * 3);
      for (let i = 0; i < bc * 3; i += 3) { bp[i] = (Math.random() - 0.5) * 200; bp[i + 1] = (Math.random() - 0.5) * 200; bp[i + 2] = (Math.random() - 0.5) * 200; const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.3, 0.15 + Math.random() * 0.1); bco[i] = c.r; bco[i + 1] = c.g; bco[i + 2] = c.b; }
      bg.setAttribute("position", new THREE.BufferAttribute(bp, 3)); bg.setAttribute("color", new THREE.BufferAttribute(bco, 3));
      scene.add(new THREE.Points(bg, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.5 })));

      NODES.forEach((node, i) => {
        const angle = (i / NODES.length) * Math.PI * 2; const radius = 5 + node.depth * 4 + (node.isDeadEnd ? 3 : 0);
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2; const y = (node.seq / NODES.length) * 15 - 7 + (Math.random() - 0.5) * 2; const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
        const size = 0.3 + node.importance * 0.8; const color = node.isDeadEnd ? 0xff4757 : node.type === "final_decision" ? 0xffd700 : node.type === "convergence" ? 0xa78bfa : 0x00e5ff;
        const star = new THREE.Mesh(new THREE.SphereGeometry(size, 12, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
        star.position.set(x, y, z); star.userData = { node }; scene.add(star); nodeObjects.push(star);
        const gl = new THREE.Mesh(new THREE.SphereGeometry(size * 2.5, 12, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.06 })); gl.position.copy(star.position); scene.add(gl);
        if (node.type === "final_decision") { const a = new THREE.Mesh(new THREE.SphereGeometry(size * 3.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.05 })); a.position.copy(star.position); a.userData = { pulse: true }; scene.add(a); }
      });
      NODES.forEach((node, i) => { if (node.parent) { const pi = NODES.findIndex(n => n.id === node.parent); if (pi >= 0 && nodeObjects[pi] && nodeObjects[i]) { scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([nodeObjects[pi].position, nodeObjects[i].position]), new THREE.LineBasicMaterial({ color: node.isDeadEnd ? 0xff4757 : 0x00e5ff, transparent: true, opacity: node.isDeadEnd ? 0.15 : 0.25 }))); } } });
    }

    let oA = mode === "journey" ? -0.3 : 0, oP = mode === "journey" ? 0.15 : 0.2, oD = mode === "journey" ? 22 : 35;
    const tgt = mode === "journey" ? new THREE.Vector3(0, 15, -10) : new THREE.Vector3(0, 0, 0);
    let isDrag = false, px = 0, py = 0, startX = 0, startY = 0;

    const getMouseFromEvent = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1; mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1; };
    const onDown = (e: MouseEvent) => { isDrag = true; px = e.clientX; py = e.clientY; startX = e.clientX; startY = e.clientY; };
    const onMove = (e: MouseEvent) => { if (isDrag) { oA += (e.clientX - px) * 0.005; oP = Math.max(-0.5, Math.min(1.2, oP + (e.clientY - py) * 0.005)); px = e.clientX; py = e.clientY; } getMouseFromEvent(e); };
    const onUp = (e: MouseEvent) => { const wasDrag = Math.abs(e.clientX - startX) > 3 || Math.abs(e.clientY - startY) > 3; isDrag = false; if (!wasDrag) { getMouseFromEvent(e); raycaster.setFromCamera(mouse, camera); const h = raycaster.intersectObjects(nodeObjects); if (h.length > 0) { onSelectNode((h[0] as any).object.userData.node); } else if (mode === "constellation") { stateRef.current.autoRotate = !stateRef.current.autoRotate; } } };
    const onWheel = (e: WheelEvent) => { oD = Math.max(8, Math.min(80, oD + e.deltaY * 0.05)); e.preventDefault(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "r" || e.key === "R") { oA = mode === "journey" ? -0.3 : 0; oP = mode === "journey" ? 0.15 : 0.2; oD = mode === "journey" ? 22 : 35; } };

    canvas.addEventListener("mousedown", onDown); canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseup", onUp); canvas.addEventListener("wheel", onWheel, { passive: false }); document.addEventListener("keydown", onKey);
    const onResize = () => { if (!canvas.parentElement) return; const r2 = canvas.parentElement.getBoundingClientRect(); camera.aspect = r2.width / r2.height; camera.updateProjectionMatrix(); renderer.setSize(r2.width, r2.height); };
    window.addEventListener("resize", onResize);

    function animate() {
      if (stateRef.current.disposed) return;
      animRef.current = requestAnimationFrame(animate);
      if (paused) { renderer.render(scene, camera); return; }
      const t = Date.now() * 0.001;
      if (mode === "constellation" && stateRef.current.autoRotate) oA += 0.002;
      camera.position.x = tgt.x + oD * Math.sin(oA) * Math.cos(oP);
      camera.position.y = tgt.y + oD * Math.sin(oP);
      camera.position.z = tgt.z + oD * Math.cos(oA) * Math.cos(oP);
      camera.lookAt(tgt);
      scene.children.forEach((c: any) => { if (c.userData && c.userData.ring) c.lookAt(camera.position); if (c.userData && c.userData.pulse) c.material.opacity = 0.03 + Math.sin(t * 2) * 0.03; });
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      stateRef.current.disposed = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousedown", onDown); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseup", onUp); canvas.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [mode]);

  const hints: Record<string, string> = { journey: "Click nodes to inspect · Drag to rotate · Scroll to zoom · R reset", constellation: "Click star to inspect · Click background to pause/resume · Scroll zoom" };
  return (
    <div style={{ position:"absolute", inset:0 }}>
      <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />
      <div style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", zIndex:50, background:"rgba(12,18,32,0.75)", padding:"10px 20px", borderRadius:12, border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}>
        <span style={{ fontSize:12, color:"#7b8da6", fontFamily:"'Sora',system-ui,sans-serif" }}>{hints[mode]}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VIDEO MODAL  —  16:9 aspect ratio on entire box
   ═══════════════════════════════════════════════════ */
function VideoModal({ isMaximized, onToggleMax }: { isMaximized: boolean; onToggleMax: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const togglePlay = () => { const v = videoRef.current; if (!v) return; if (v.paused) { v.play(); setIsPlaying(true); } else { v.pause(); setIsPlaying(false); } };
  const onTimeUpdate = () => { const v = videoRef.current; if (!v) return; setCurrentTime(v.currentTime); setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0); };
  const onLoaded = () => { if (videoRef.current) setDuration(videoRef.current.duration); };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => { const v = videoRef.current; if (!v || !v.duration) return; const rect = e.currentTarget.getBoundingClientRect(); v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration; };
  const fmtTime = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec < 10 ? "0" : ""}${sec}`; };
  const onVol = (e: React.ChangeEvent<HTMLInputElement>) => { const val = parseFloat(e.target.value); setVolume(val); if (videoRef.current) videoRef.current.volume = val; };
  const onMouseMove = () => { setShowControls(true); if (hideTimer.current) clearTimeout(hideTimer.current); if (isPlaying) hideTimer.current = setTimeout(() => setShowControls(false), 3000); };

  function renderShell(maximized: boolean) {
    return (
      <div style={{
        background: "linear-gradient(180deg, #64748b 0%, #94a3b8 80px, #cbd5e1 200px, #e2e8f0 100%)",
        borderRadius: maximized ? 0 : 18,
        width: maximized ? "100vw" : "100%",
        /* 16:9 entire box when not maximized */
        aspectRatio: maximized ? undefined : "16 / 9",
        height: maximized ? "100vh" : undefined,
        display: "flex",
        flexDirection: "column" as const,
        overflow: "hidden",
        boxShadow: "0 32px 64px -12px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.05)",
        animation: "umEnter 0.22s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", background:"rgba(100,116,139,0.9)", backdropFilter:"blur(12px)", borderBottom:"2px solid #374151", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
            <div style={{ width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:"#fff", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow:"0 2px 8px rgba(99,102,241,0.25)", flexShrink:0 }}>🎬</div>
            <div style={{ minWidth:0 }}>
              <h3 style={{ margin:0, fontSize:15, fontWeight:700, color:"#ffffff", lineHeight:1.3, fontFamily:"'Sora',system-ui,sans-serif" }}>DecisionScape™ — The Ad</h3>
              <p style={{ margin:"2px 0 0", fontSize:12, color:"rgba(255,255,255,0.7)", lineHeight:1.3, fontFamily:"'Sora',system-ui,sans-serif" }}>Decisions You Can See</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:6, flexShrink:0 }}>
            <button onClick={onToggleMax} style={{ width:32, height:32, minWidth:32, border:"none", background:"rgba(255,255,255,0.15)", borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }} title={maximized ? "Restore" : "Maximize"}>
              {maximized
                ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="0.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="0.5" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="0.75" y="0.75" width="12.5" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>}
            </button>
            {maximized && <button onClick={onToggleMax} style={{ width:32, height:32, minWidth:32, border:"none", background:"rgba(255,255,255,0.15)", borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>✕</button>}
          </div>
        </div>

        {/* Video area — flex:1 fills remaining 16:9 space */}
        <div
          onMouseMove={onMouseMove}
          onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
          style={{ flex:1, position:"relative", background:"#000", overflow:"hidden", minHeight:0 }}
        >
          <video
            ref={videoRef}
            src=""
            poster={MOUNTAIN.verticalRockFaceClimber}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", cursor:"pointer" }}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoaded}
            onClick={togglePlay}
            preload="metadata"
          />
          {!isPlaying && (
            <div onClick={togglePlay} style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.25)", cursor:"pointer" }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(255,255,255,0.15)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid rgba(255,255,255,0.3)" }}>
                <svg width="28" height="32" viewBox="0 0 28 32" fill="white"><polygon points="6,0 28,16 6,32"/></svg>
              </div>
            </div>
          )}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent, rgba(0,0,0,0.85))", padding:"28px 16px 14px", opacity:showControls||!isPlaying?1:0, transition:"opacity 0.3s" }}>
            <div onClick={seek} style={{ width:"100%", height:4, background:"rgba(255,255,255,0.2)", borderRadius:2, cursor:"pointer", marginBottom:12, position:"relative" }}>
              <div style={{ width:`${progress}%`, height:"100%", background:"#00e5ff", borderRadius:2, transition:"width 0.1s" }}/>
              <div style={{ position:"absolute", top:-4, left:`calc(${progress}% - 6px)`, width:12, height:12, borderRadius:"50%", background:"#00e5ff", boxShadow:"0 0 8px rgba(0,229,255,0.5)", opacity:showControls?1:0, transition:"opacity 0.2s" }}/>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <button onClick={togglePlay} style={{ background:"none", border:"none", color:"#fff", cursor:"pointer", padding:4, display:"flex" }}>
                {isPlaying
                  ? <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><rect x="3" y="2" width="4" height="14" rx="1"/><rect x="11" y="2" width="4" height="14" rx="1"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><polygon points="3,1 17,9 3,17"/></svg>}
              </button>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.6)", minWidth:80 }}>{fmtTime(currentTime)} / {fmtTime(duration||0)}</span>
              <div style={{ flex:1 }}/>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="rgba(255,255,255,0.6)"><path d="M2 5.5h2l3.5-3v11l-3.5-3H2a1 1 0 01-1-1v-3a1 1 0 011-1z"/></svg>
                <input type="range" min="0" max="1" step="0.05" value={volume} onChange={onVol} style={{ width:56, accentColor:"#00e5ff" }}/>
              </div>
              <button onClick={onToggleMax} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.6)", cursor:"pointer", padding:4, display:"flex" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 6V3a1 1 0 011-1h3M10 2h3a1 1 0 011 1v3M14 10v3a1 1 0 01-1 1h-3M6 14H3a1 1 0 01-1-1v-3"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isMaximized && renderShell(false)}
      {isMaximized && (
        <div style={{ position:"fixed", inset:0, zIndex:99999, background:"rgba(15,23,42,0.55)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          {renderShell(true)}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN WIDGET
   ═══════════════════════════════════════════════════ */
function DecisionScapeWidget() {
  const [view, setView] = useState("tree");
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [videoMaximized, setVideoMaximized] = useState(false);
  const [navBottom, setNavBottom] = useState(80);   // viewport px where nav ends (for fixed overlays)
  const [navHeight, setNavHeight] = useState(80);   // nav element height (for sticky offsets)
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Load Three.js ── */
  useEffect(() => {
    if ((window as any).THREE) { setThreeLoaded(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = () => setThreeLoaded(true);
    document.head.appendChild(s);
  }, []);

  /* ── Load fonts ── */
  useEffect(() => {
    if (document.querySelector('[data-ds-fonts]')) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&family=Sora:wght@300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet"; (link as any).dataset.dsFonts = "1";
    document.head.appendChild(link);
  }, []);

  /* ── Measure site navbar bottom edge (accounts for glass-panel offset) ── */
  useEffect(() => {
    const measure = () => {
      const el = document.querySelector("nav");
      if (el) {
        setNavBottom(el.getBoundingClientRect().bottom);
        setNavHeight(el.getBoundingClientRect().height);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  /* Re-measure nav when switching views (scroll resets → nav position changes) */
  useEffect(() => {
    const remeasure = () => {
      const el = document.querySelector("nav");
      if (el) {
        setNavBottom(el.getBoundingClientRect().bottom);
        setNavHeight(el.getBoundingClientRect().height);
      }
    };
    remeasure();
    const t1 = setTimeout(remeasure, 150);
    const t2 = setTimeout(remeasure, 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [view]);

  /* ── 3D mode: scroll hero behind navbar, then lock scroll ── */
  useEffect(() => {
    if (view === "tree") {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }
    // Scroll to top so the hero slides up behind the fixed navbar
    window.scrollTo({ top: 0, behavior: "smooth" });
    const t = setTimeout(() => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }, 400);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [view]);

  const handleTabClick = (newView: string) => {
    setView(newView);
    setSelectedNode(null);
  };

  /* ── Shared tab button renderer ── */
  const tabBtn = (t: typeof TABS[number], forSticky: boolean) => (
    <button
      key={t.id}
      onClick={() => handleTabClick(t.id)}
      style={{
        fontFamily: "'Sora',system-ui,sans-serif",
        fontSize: 13,
        fontWeight: 500,
        padding: "7px 20px",
        border: "none",
        borderRadius: 10,
        cursor: "pointer",
        transition: "all 0.25s",
        background: view === t.id ? "rgba(0,229,255,0.15)" : "transparent",
        color: view === t.id ? "#00e5ff" : "#8892a8",
        boxShadow: view === t.id ? "inset 0 0 0 1px rgba(0,229,255,0.25), 0 0 12px rgba(0,229,255,0.08)" : "none",
        ...(forSticky ? {} : { flex: 1, textAlign: "center" as const }),
      }}
    >
      <span style={{ marginRight: 5 }}>{t.icon}</span>{t.label}
    </button>
  );

  return (
    <>
      <style>{`
        @keyframes dsNodeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes umEnter { from { opacity:0; transform:translateY(-8px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        .ds-root * { box-sizing: border-box; }
        .ds-root ::-webkit-scrollbar { width: 6px; }
        .ds-root ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.2); border-radius: 3px; }
        .ds-root input[type=range] { -webkit-appearance: none; background: rgba(255,255,255,0.15); border-radius: 2px; height: 3px; }
        .ds-root input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 10px; height: 10px; border-radius: 50%; background: #00e5ff; cursor: pointer; }
      `}</style>

      <div ref={containerRef} className="ds-root" style={{ width:"100%", background:"#080c14", fontFamily:"'Sora',system-ui,sans-serif", color:"#e8ecf4" }}>

        {/* ════════════════════════════════════════
            TREE MODE  —  full page scroll
            ════════════════════════════════════════ */}
        {view === "tree" && (
          <>
            {/* Sticky tab bar, 1px below site navbar */}
            <div style={{
              position: "sticky",
              top: navHeight,
              zIndex: 100,
              background: "rgba(8,12,20,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(0,229,255,0.14)",
            }}>
              <div style={{ display:"flex", justifyContent:"center", gap:4, padding:"7px 8px" }}>
                {TABS.map(t => tabBtn(t, true))}
              </div>
            </div>

            {/* Tree content in normal page flow */}
            <TreeView onSelectNode={setSelectedNode} />
          </>
        )}

        {/* ════════════════════════════════════════
            3D MODES  —  fixed overlay below navbar
            ════════════════════════════════════════ */}
        {view !== "tree" && (
          <div style={{ position:"fixed", top:navBottom, left:0, right:0, bottom:0, zIndex:40, overflow:"hidden", background:"#080c14" }}>
            {/* Dark background */}
            <div style={{ position:"absolute", inset:0, background:"#080c14" }}>
              {view === "journey" && threeLoaded && <ThreeView mode="journey" onSelectNode={setSelectedNode} paused={videoMaximized} />}
              {view === "constellation" && threeLoaded && <ThreeView mode="constellation" onSelectNode={setSelectedNode} paused={videoMaximized} />}
              {!threeLoaded && (
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:"#00e5ff", fontFamily:"'JetBrains Mono',monospace" }}>Loading Three.js…</span>
                </div>
              )}
            </div>

            {/* Floating tab bar — flat-top pill flush against the site navbar */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
              background: "rgba(15,23,42,0.78)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "0 0 14px 14px",
              padding: "6px 8px 8px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              gap: 4,
              minWidth: 310,
            }}>
              {TABS.map(t => tabBtn(t, false))}
            </div>

            {/* 3D canvas footer */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:90, display:"flex", justifyContent:"space-between", padding:"12px 32px", background:"linear-gradient(0deg, rgba(8,12,20,0.95) 0%, transparent 100%)", pointerEvents:"none" }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#ffffff", letterSpacing:1, textTransform:"uppercase" as const }}>
                <span style={{ color:"#00e5ff" }}>Aurix AI Solutions</span> × Claude Partnership
              </span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#ffffff", letterSpacing:1, textTransform:"uppercase" as const }}>
                DecisionScape™ — Decisions You Can See
              </span>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
            VIDEO SECTION  —  always in page flow
            ════════════════════════════════════════ */}
        <div style={{ width:"100%", padding:"48px 0 40px", background:"#080c14" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
            <VideoModal isMaximized={videoMaximized} onToggleMax={() => setVideoMaximized(!videoMaximized)} />
          </div>
        </div>
      </div>

      {/* Detail panel — position:fixed, works in any mode */}
      {selectedNode && <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} navBottom={navBottom} />}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════ */
export function DecisionScapePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <PageHero
        title="DecisionScape™"
        subtitle="See every path explored, every dead-end rejected, every factor weighed. AI reasoning made fully transparent."
        badge="Aurix AI Solutions × Claude"
        image={MOUNTAIN.verticalRockFaceClimber}
      />
      <DecisionScapeWidget />
    </div>
  );
}
