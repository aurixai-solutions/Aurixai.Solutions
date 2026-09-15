import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { Zap, Shield, CheckCircle2, RotateCcw, Activity, Eye, ArrowRight, Cpu, Server } from "lucide-react";
import { MOUNTAIN } from "../components/heroImages";

const STATS = [
  { value: "92%", label: "Auto-Resolution Rate", color: "from-emerald-50 to-emerald-100/60", border: "border-emerald-100", text: "text-emerald-600" },
  { value: "<5min", label: "Mean Time to Repair", color: "from-sky-50 to-sky-100/60", border: "border-sky-100", text: "text-sky-600" },
  { value: "100%", label: "Audit Trail Coverage", color: "from-violet-50 to-violet-100/60", border: "border-violet-100", text: "text-violet-600" },
  { value: "1-Click", label: "Rollback Capability", color: "from-amber-50 to-amber-100/60", border: "border-amber-100", text: "text-amber-600" },
];

const PROCESS_STEPS = [
  { n: "1", icon: Eye, title: "Detect", desc: "Continuous monitoring identifies issues using AI-powered pattern recognition across all connected systems and data pipelines.", color: "bg-sky-100 text-sky-600" },
  { n: "2", icon: Cpu, title: "Diagnose", desc: "Root cause analysis determines the issue type with confidence scoring. Context-aware reasoning explains exactly what went wrong.", color: "bg-violet-100 text-violet-600" },
  { n: "3", icon: Zap, title: "Remediate", desc: "Autonomous fixes applied based on pre-approved playbooks. Each action is logged with full reasoning chain for human review.", color: "bg-emerald-100 text-emerald-600" },
  { n: "4", icon: CheckCircle2, title: "Verify", desc: "Post-repair validation confirms the fix was successful. Automatic rollback triggered instantly if verification fails.", color: "bg-amber-100 text-amber-600" },
];

const VALIDATION_LAYERS = [
  { title: "Syntax Validation", desc: "Ensures data structures conform to expected schemas and formats." },
  { title: "Semantic Validation", desc: "Checks that values are meaningful and contextually correct." },
  { title: "Security Scanning", desc: "Identifies potential security vulnerabilities in data or code." },
  { title: "Performance Analysis", desc: "Measures impact on system performance before applying fixes." },
  { title: "Compliance Checking", desc: "Validates fixes meet GDPR, HIPAA, SOX, and other regulatory requirements." },
  { title: "Scalability Testing", desc: "Ensures fixes work at enterprise scale, not just for the immediate case." },
];

const METRICS = [
  { label: "Auto-Heal Success Rate", val: ">95%" },
  { label: "Mean Time to Heal", val: "<2 min" },
  { label: "Validation Accuracy", val: "98%" },
  { label: "Human Escalation Rate", val: "<5%" },
];

const SIDEBAR_LINKS = [
  { label: "How It Works", anchor: "process" },
  { label: "Validation Layers", anchor: "validation" },
  { label: "Isolated Testing", anchor: "testing" },
  { label: "Human Oversight", anchor: "oversight" },
  { label: "Explore Prism™", path: "/solutions/prism" },
];

function SL({ children }: { children: React.ReactNode }) {
  return <span className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-4 block">{children}</span>;
}

export function SelfHealingPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Self-Optimizing Pipelines"
        subtitle="Data Quality is not a chore. It is an automated loop."
        image={MOUNTAIN.expeditionTeamSummit}
      />

      <div className="container mx-auto px-6 py-16 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          <div className="lg:col-span-2 space-y-10">

            <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
              <SL>Performance Metrics</SL>
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

            <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
              <SL>Patent Pending</SL>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Self-Healing Matters</h2>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                Traditional data governance requires armies of data engineers manually fixing quality issues. Poor data quality costs organizations <strong>$12.9 million per year</strong> on average. With self-healing technology, 92% of issues are resolved automatically in under 5 minutes — without human intervention.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {METRICS.map((m) => (
                  <div key={m.label} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xl font-bold text-sky-600">{m.val}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Process */}
            <div id="process">
              <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
                <SL>How It Works</SL>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Four-Step Intelligent Automation</h2>
                <div className="space-y-4">
                  {PROCESS_STEPS.map((step) => (
                    <div key={step.n} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className={`flex-shrink-0 w-10 h-10 ${step.color} rounded-xl flex items-center justify-center`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">{step.n}. {step.title}</div>
                        <div className="text-xs text-slate-600 leading-relaxed">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Validation Layers */}
            <div id="validation">
              <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
                <SL>Multi-Layer Validation</SL>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Six Concurrent Validation Layers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VALIDATION_LAYERS.map((v, i) => (
                    <div key={v.title} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-bold text-xs flex-shrink-0">{i + 1}</div>
                      <div>
                        <div className="font-semibold text-slate-900 text-xs mb-0.5">{v.title}</div>
                        <div className="text-xs text-slate-500">{v.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Isolated Testing */}
            <div id="testing">
              <GlassCard className="p-5 bg-white border-slate-200 shadow-lg">
                <SL>Safe Execution</SL>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Isolated Kubernetes Sandboxes</h2>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">Every repair is tested in an isolated Kubernetes sandbox using synthetic data that mirrors production characteristics. Production systems are never at risk during the healing process.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: Server, title: "Kubernetes Sandboxes", desc: "Isolated environments that exactly mirror production configuration." },
                    { icon: CheckCircle2, title: "Synthetic Data Testing", desc: "Statistically representative test data that can't expose real PII." },
                    { icon: RotateCcw, title: "Instant Rollback", desc: "Every change can be reversed in under 60 seconds with full audit trail." },
                  ].map((f) => (
                    <div key={f.title} className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-2"><f.icon className="w-4 h-4" /></div>
                      <div className="font-semibold text-slate-900 text-xs mb-1">{f.title}</div>
                      <div className="text-xs text-slate-600">{f.desc}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Human Oversight */}
            <div id="oversight">
              <GlassCard className="p-5 bg-gradient-to-br from-sky-50 to-violet-50 border-sky-100 shadow-lg">
                <SL>The Human Interface™</SL>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">AI Autonomy with Human Control</h2>
                <p className="text-slate-600 text-sm mb-4">AI systems that operate as black boxes build a house of cards. Every self-healing action includes a complete reasoning chain, notification to the responsible data steward, and one-click rollback capability. Humans stay informed and in control at all times.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: "Full Transparency", desc: "Every action explained in plain language" },
                    { title: "Instant Notifications", desc: "Alert stewards immediately on any change" },
                    { title: "1-Click Rollback", desc: "Reverse any action instantly" },
                    { title: "Continuous Learning", desc: "System improves from every healing cycle" },
                  ].map((f) => (
                    <div key={f.title} className="p-3 bg-white/70 rounded-xl border border-sky-100">
                      <div className="font-semibold text-slate-900 text-xs mb-0.5">{f.title}</div>
                      <div className="text-xs text-slate-600">{f.desc}</div>
                    </div>
                  ))}
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
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600"><Activity className="w-4 h-4" /></div>
                    <h3 className="font-bold text-slate-900 text-sm">Healing Stats</h3>
                  </div>
                  {[
                    { label: "Duplicate Records", val: "Auto-merged" },
                    { label: "Format Errors", val: "Auto-normalized" },
                    { label: "Missing Values", val: "AI-imputed" },
                    { label: "Schema Violations", val: "Auto-corrected" },
                    { label: "Referential Integrity", val: "Auto-restored" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="font-medium text-emerald-600">{item.val}</span>
                    </div>
                  ))}
                </GlassCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                  <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-sm mb-1">See It In Action</p>
                  <p className="text-slate-400 text-xs mb-3">Watch autonomous repair fix a live data quality issue in real-time.</p>
                  <Link to="/contact" className="block w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors">Request Demo</Link>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}