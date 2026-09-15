import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { GlassCard } from "../components/ui/GlassCard";
import { Shield, CheckCircle2, ArrowRight, FileText, Globe, Lock, Activity } from "lucide-react";

const STATS = [
  { value: "$4.38M", label: "Avg Data Breach Cost", color: "from-rose-50 to-rose-100/60", border: "border-rose-100", text: "text-rose-600" },
  { value: "€1.3B+", label: "GDPR Fines Issued", color: "from-amber-50 to-amber-100/60", border: "border-amber-100", text: "text-amber-600" },
  { value: "137", label: "Countries with Data Laws", color: "from-sky-50 to-sky-100/60", border: "border-sky-100", text: "text-sky-600" },
  { value: "50+", label: "Regulations Supported", color: "from-violet-50 to-violet-100/60", border: "border-violet-100", text: "text-violet-600" },
];

const REGULATION_GROUPS = [
  { title: "Global Data Protection", regs: ["GDPR (EU)", "CCPA / CPRA (California)", "LGPD (Brazil)", "PIPEDA (Canada)", "POPIA (South Africa)"], color: "bg-sky-50 border-sky-100" },
  { title: "Healthcare & Life Sciences", regs: ["HIPAA (US)", "HITECH Act", "FDA 21 CFR Part 11", "HITRUST CSF", "ISO 27799"], color: "bg-emerald-50 border-emerald-100" },
  { title: "Financial Services", regs: ["PCI DSS", "SOX (Sarbanes-Oxley)", "GLBA", "DORA (EU Digital Resilience)", "Basel III/IV"], color: "bg-violet-50 border-violet-100" },
  { title: "Government & Defense", regs: ["FedRAMP", "CMMC (DoD)", "FISMA", "DFARS / ITAR", "CJIS"], color: "bg-orange-50 border-orange-100" },
  { title: "Industry Standards", regs: ["ISO 27001", "ISO 27017 / 27018", "SOC 2 Type II", "NIST CSF", "COBIT"], color: "bg-pink-50 border-pink-100" },
  { title: "Regional & Sector", regs: ["NIS2 Directive (EU)", "Australian Privacy Act", "China Cybersecurity Law", "FERPA (Education)", "COPPA"], color: "bg-teal-50 border-teal-100" },
];

const HOW_AURIX_HELPS = [
  { icon: Shield, title: "Pre-Deployment Compliance Configuration", desc: "Before you ingest a single data point, configure which regulations apply to your deployment. Aurix automatically enforces data handling rules, retention policies, encryption standards, and access controls specific to each framework.", color: "bg-sky-100 text-sky-600" },
  { icon: Lock, title: "Semantic Layer Security & Compliance", desc: "Compliance rules travel with your data — regardless of where it's stored or how it's accessed. Field-level encryption, dynamic masking, context-aware access, and immutable audit trails at the semantic layer.", color: "bg-violet-100 text-violet-600" },
  { icon: FileText, title: "Automated Compliance Reporting", desc: "Generate audit-ready compliance reports for GDPR Article 30, HIPAA Security Rule 164.308, SOC 2 Trust Service Criteria, and more. Every report is backed by cryptographically-signed audit logs.", color: "bg-emerald-100 text-emerald-600" },
];

const COMPARE_ROWS = [
  { feature: "Pre-Deployment Compliance Config", aurix: "✓", legacy: "✗" },
  { feature: "Semantic Layer Security", aurix: "✓", legacy: "✗" },
  { feature: "Automated Audit Reports", aurix: "✓", legacy: "Partial" },
  { feature: "Multi-Regulation Support", aurix: "50+", legacy: "5–10" },
  { feature: "Real-Time Compliance Monitoring", aurix: "✓", legacy: "✗" },
  { feature: "Data Sovereignty Controls", aurix: "✓", legacy: "✗" },
];

const SIDEBAR_LINKS = [
  { label: "The Compliance Crisis", anchor: "crisis" },
  { label: "How Aurix Solves It", anchor: "solution" },
  { label: "50+ Regulations", anchor: "regulations" },
  { label: "Competitive Comparison", anchor: "compare" },
  { label: "Explore Data Sovereignty", path: "/solutions/data-sovereignty" },
  { label: "Request Demo", path: "/demo" },
];

function SL({ children }: { children: React.ReactNode }) {
  return <span className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-4 block">{children}</span>;
}

export function RegulatoryCompliancePage() {
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-6 py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          <div className="lg:col-span-2 space-y-10">

            <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
              <SL>The Stakes</SL>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    className={`p-3 rounded-xl bg-gradient-to-br ${s.color} border ${s.border} text-center shadow-sm`}>
                    <div className={`text-2xl font-bold mb-1 ${s.text}`}>{s.value}</div>
                    <div className="text-xs text-slate-600 font-medium uppercase tracking-wide">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Crisis */}
            <div id="crisis">
              <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
                <SL>The Modern Compliance Crisis</SL>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">137 Countries. Conflicting Laws. One Platform.</h2>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">Most AI platforms treat compliance as an afterthought — a checkbox feature added late in development. Aurix is different. We architected every layer of our platform with GDPR, HIPAA, PCI DSS, CMMC, FedRAMP, and 50+ other regulations baked into the core.</p>
                <div className="space-y-3">
                  {[
                    { icon: Globe, title: "Jurisdictional Complexity", desc: "EU GDPR, US CLOUD Act, China's Cybersecurity Law, and dozens more create conflicting requirements. Data stored in one country may be subject to multiple, contradictory legal frameworks simultaneously.", color: "bg-sky-100 text-sky-600" },
                    { icon: Activity, title: "Evolving Regulations", desc: "NIS2 (Oct 2024), EU Data Act (Sep 2025), DORA (Jan 2025) — regulations evolve faster than traditional IT infrastructure can adapt. Manual compliance processes can't keep pace.", color: "bg-amber-100 text-amber-600" },
                    { icon: Shield, title: "Vendor Lock-In Risks", desc: "Cloud providers cannot guarantee data sovereignty even for sensitive government data. Organizations face massive costs and technical challenges when switching providers.", color: "bg-rose-100 text-rose-600" },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className={`w-8 h-8 ${f.color} rounded-lg flex items-center justify-center flex-shrink-0`}><f.icon className="w-4 h-4" /></div>
                      <div>
                        <div className="font-semibold text-slate-900 text-xs mb-0.5">{f.title}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Solution */}
            <div id="solution">
              <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
                <SL>Compliance-First Architecture</SL>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">How Aurix Delivers Compliance</h2>
                <div className="space-y-4">
                  {HOW_AURIX_HELPS.map((h) => (
                    <div key={h.title} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className={`w-9 h-9 ${h.color} rounded-xl flex items-center justify-center flex-shrink-0`}><h.icon className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">{h.title}</div>
                        <div className="text-xs text-slate-600 leading-relaxed">{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Regulations */}
            <div id="regulations">
              <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
                <SL>Supported Frameworks</SL>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">50+ Regulations. One Platform.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {REGULATION_GROUPS.map((g) => (
                    <div key={g.title} className={`p-3 rounded-xl border ${g.color}`}>
                      <div className="font-bold text-slate-900 text-xs mb-2">{g.title}</div>
                      <ul className="space-y-1">
                        {g.regs.map((r) => (
                          <li key={r} className="flex items-center gap-1.5 text-xs text-slate-600">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs text-slate-600">
                  <strong>Need a regulation we don't list?</strong> Our compliance framework is extensible. We can add support for any regional, industry, or organizational compliance requirement.
                </div>
              </GlassCard>
            </div>

            {/* Compare */}
            <div id="compare">
              <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
                <SL>Competitive Advantage</SL>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Why Aurix Beats the Competition</h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-sky-50 border-b border-slate-200">
                        <th className="text-left px-4 py-3 text-slate-900 font-semibold text-xs">Feature</th>
                        <th className="text-center px-4 py-3 text-sky-700 font-semibold text-xs">Aurix</th>
                        <th className="text-center px-4 py-3 text-slate-500 font-semibold text-xs">Traditional Platforms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE_ROWS.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-2.5 text-slate-700 text-xs">{row.feature}</td>
                          <td className="px-4 py-2.5 text-center text-emerald-600 font-bold text-xs">{row.aurix}</td>
                          <td className="px-4 py-2.5 text-center text-rose-500 text-xs">{row.legacy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                <GlassCard className="p-4 bg-sky-50/80 border-sky-100 shadow-lg">
                  <h3 className="font-bold text-sky-900 text-sm mb-3 pb-2 border-b border-sky-200/50">Key Capabilities</h3>
                  <ul className="space-y-1.5">
                    {SIDEBAR_LINKS.map((lnk) => (
                      <li key={lnk.label}>
                        {lnk.path ? (
                          <Link to={lnk.path} className="flex items-center gap-2 text-xs text-sky-700 hover:text-sky-900 hover:bg-sky-100/60 px-2 py-1.5 rounded-lg transition-colors">
                            <ArrowRight className="w-3 h-3 flex-shrink-0" /> {lnk.label}
                          </Link>
                        ) : (
                          <a href={`#${lnk.anchor}`} className="flex items-center gap-2 text-xs text-sky-700 hover:text-sky-900 hover:bg-sky-100/60 px-2 py-1.5 rounded-lg transition-colors">
                            <ArrowRight className="w-3 h-3 flex-shrink-0" /> {lnk.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
                <GlassCard className="p-4 bg-white border-slate-200 shadow-lg">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Quick Facts</h3>
                  {[
                    { label: "Regulation Coverage", val: "50+ frameworks" },
                    { label: "Deployment Time", val: "1–4 weeks" },
                    { label: "Report Generation", val: "Automated" },
                    { label: "Audit Trail", val: "Cryptographically signed" },
                    { label: "Real-Time Monitoring", val: "Yes, continuous" },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-medium text-slate-700">{val}</span>
                    </div>
                  ))}
                </GlassCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                  <Shield className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-sm mb-1">Stop Retrofitting Compliance</p>
                  <p className="text-slate-400 text-xs mb-3">Configure compliance before you process a single record.</p>
                  <Link to="/demo" className="block w-full py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-lg transition-colors">Request Demo</Link>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}