import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { AlertTriangle, Shield, Zap, RefreshCw, CheckCircle, ArrowRight, Brain, Activity, Lock } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const GLASS_LIGHT = {
  background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(248,250,252,0.40) 100%)",
  backdropFilter: "blur(32px)",
  WebkitBackdropFilter: "blur(32px)",
  border: "1px solid rgba(255,255,255,0.7)",
  boxShadow: "0 20px 60px -12px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(255,255,255,0.3)",
  borderRadius: 24,
} as const;

const GLASS_DARK = {
  background: "linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(30,41,59,0.65) 100%)",
  backdropFilter: "blur(32px)",
  WebkitBackdropFilter: "blur(32px)",
  border: "1px solid rgba(255,255,255,0.15)",
  boxShadow: "0 24px 80px -12px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.04)",
  borderRadius: 24,
} as const;

const STATS = [
  { value: "99.7%", label: "Detection Accuracy" },
  { value: "<50ms", label: "Detection Latency" },
  { value: "0.003%", label: "False Positive Rate" },
  { value: "100%", label: "Automated Recovery" },
];

const HALLUCINATION_TYPES = [
  { title: "Intrinsic Hallucinations", desc: "The model generates output that directly contradicts the source material or input context. Example: summarizing a document as stating the opposite of what it actually says." },
  { title: "Extrinsic Hallucinations", desc: "The model adds information that cannot be verified from any source — invented citations, fabricated statistics, non-existent entities, fictional academic papers." },
  { title: "Logical Hallucinations", desc: "The model produces outputs that violate basic logical principles, contradicting itself within the same response, making mathematically impossible claims, or violating causal relationships." },
  { title: "Temporal Hallucinations", desc: "The model confuses time periods, attributes events to wrong dates, applies outdated information as current fact, or confabulates about events after its training cutoff." },
];

const ROOT_CAUSES = [
  { num: "1", title: "Attention Mechanism Limitations", desc: "The self-attention mechanism can fail to properly weight relevant context, especially in long sequences. Key information appearing in the middle of long contexts (the 'lost in the middle' phenomenon) is frequently missed." },
  { num: "2", title: "Training Data Artifacts", desc: "Models trained on internet-scale data ingest misinformation, outdated facts, and contradictory claims. The model cannot distinguish between reliable and unreliable sources in its training corpus." },
  { num: "3", title: "Knowledge Cutoff & Temporal Drift", desc: "Models have a knowledge cutoff date. When prompted about recent events, models may confabulate based on patterns from similar historical events, producing plausible but incorrect responses." },
  { num: "4", title: "RLHF Artifacts", desc: "Reinforcement Learning from Human Feedback can inadvertently train models to be confidently wrong. Human raters often prefer confident, well-structured responses even when uncertain answers would be more appropriate." },
  { num: "5", title: "Autoregressive Cascade", desc: "Once an incorrect token is generated, the model must continue from that point. A single hallucinated fact early in a response biases all subsequent generation toward consistency with that false premise." },
];

const ARCHITECTURE_COMPONENTS = [
  { num: "1", title: "Parallel Session Binding", desc: "When a production query initiates, Aurix simultaneously opens a sentinel session bound to the same model instance. The sentinel session maintains synchronization with the production session's context window state." },
  { num: "2", title: "Logical Invariant Test Battery", desc: "The sentinel issues a rotating battery of logical invariant tests — computationally trivial questions with objectively verifiable answers that probe fundamental reasoning capabilities." },
  { num: "3", title: "Real-Time Coherence Scoring", desc: "Test responses are evaluated against ground truth in under 5ms. A weighted coherence score aggregates across test categories. Scores below configurable thresholds trigger graduated intervention protocols." },
  { num: "4", title: "Semantic Anchor Validation", desc: "For long-running sessions, the sentinel periodically injects verifiable 'anchor facts' into the context and later tests whether the model accurately recalls them — detecting context corruption before it manifests." },
  { num: "5", title: "Reasoning Chain Decomposition", desc: "For complex queries, the sentinel forces step-by-step reasoning on parallel test problems and validates each step independently, catching hallucinations that would pass output-only evaluation." },
  { num: "6", title: "Contradiction Loop Testing", desc: "The sentinel asks the model to argue against its own test responses. A hallucinating model often produces equally confident arguments for contradictory positions, revealing underlying instability." },
];

const RECOVERY_LEVELS = [
  { level: 1, title: "Enhanced Monitoring", trigger: "Minor coherence fluctuation (85–95%)", action: "Increase sentinel test frequency. Log detailed telemetry. Production continues uninterrupted. Alert operations team." },
  { level: 2, title: "Output Quarantine", trigger: "Moderate coherence drop (70–85%)", action: "Production output quarantined pending secondary validation. Parallel verification request sent to alternate model instance." },
  { level: 3, title: "Session Reset", trigger: "Significant coherence failure (50–70%)", action: "Current generation halted and discarded. Session context cleared. Query automatically resubmitted to a fresh model instance." },
  { level: 4, title: "Workflow Rollback", trigger: "Severe coherence collapse (<50%) or cascade detection", action: "Full workflow halt. All outputs from the affected session invalidated. Downstream systems notified. Automatic escalation to engineering." },
];

export function HallucinationMitigationPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PageHero
        title="AI Hallucination Mitigation"
        subtitle="Parallel Sentinel Architecture for real-time detection and recovery. When AI systems generate confident but incorrect information, Aurix catches it before it impacts production."
        badge="AI Safety & Reliability"
        image={MOUNTAIN.mountaineeringGlacier}
      />

      <div className="container mx-auto px-6 max-w-6xl py-16 space-y-10">

        {/* Stats */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-1">{s.value}</div>
                <div className="text-slate-500 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Understanding hallucinations */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="text-center mb-14">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Foundation</span>
            <h2 className="text-4xl font-bold mt-2 mb-4 text-slate-900">Understanding AI Hallucinations</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Before we can detect and mitigate, we must understand the phenomenon at a fundamental level.</p>
          </div>
          <div className="bg-white/60 border border-white/40 rounded-2xl p-8 mb-10 shadow-sm backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-900">What Are AI Hallucinations?</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              AI hallucinations occur when large language models (LLMs) or other generative AI systems produce outputs
              that appear plausible and are delivered with high confidence, but are factually incorrect, logically
              inconsistent, or entirely fabricated. Unlike human errors, AI hallucinations often maintain perfect
              grammatical structure and contextual coherence — making them particularly dangerous.
            </p>
            <div className="bg-red-50/80 border border-red-200/60 rounded-xl p-4 backdrop-blur-sm">
              <h4 className="text-red-700 font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />The Enterprise Risk</h4>
              <p className="text-red-900 text-sm leading-relaxed">In enterprise deployments, a single undetected hallucination can cascade through automated workflows, corrupt downstream data, trigger incorrect compliance actions, or inform critical business decisions with fabricated information.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {HALLUCINATION_TYPES.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="bg-white/60 border border-white/40 rounded-2xl p-6 shadow-sm backdrop-blur-sm h-full">
                  <h4 className="font-bold mb-2 text-amber-700">{t.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Root causes */}
        <div className="p-8 md:p-10 text-white" style={GLASS_DARK}>
          <div className="text-center mb-14">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Technical Analysis</span>
            <h2 className="text-4xl font-bold mt-2 mb-4 text-white">The Mechanics of Hallucination</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Understanding root causes enables more effective detection strategies.</p>
          </div>
          <div className="space-y-4">
            {ROOT_CAUSES.map((rc, i) => (
              <motion.div key={rc.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-4 hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold flex-shrink-0">{rc.num}</div>
                  <div>
                    <h4 className="font-bold mb-1 text-white">{rc.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{rc.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Parallel Sentinel Architecture */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT} id="architecture">
          <div className="text-center mb-14">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Patent Pending</span>
            <h2 className="text-4xl font-bold mt-2 mb-4 text-slate-900">The Aurix Parallel Sentinel Architecture</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">A novel approach that detects hallucinations in real-time without blocking production workflows.</p>
          </div>
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-8 mb-10 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">The Core Innovation</h3>
                <p className="text-slate-700 leading-relaxed">
                  Rather than testing after execution, Aurix deploys <strong>Sentinel Agents</strong> that run in parallel with every production AI session.
                  These sentinels don't evaluate the production output — they probe the underlying model's cognitive state with carefully designed logical
                  invariant tests. If the model's reasoning capabilities are compromised (indicating potential hallucination in the production context),
                  the sentinel detects this <em>before</em> the production output completes, enabling preemptive intervention.
                </p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {ARCHITECTURE_COMPONENTS.map((c, i) => (
              <motion.div key={c.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="bg-white/60 border border-white/40 rounded-xl p-6 flex gap-4 shadow-sm backdrop-blur-sm h-full">
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm flex-shrink-0">{c.num}</div>
                  <div>
                    <h4 className="font-bold mb-2 text-slate-900">{c.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Graduated Recovery */}
        <div className="p-8 md:p-10 text-white" style={GLASS_DARK}>
          <div className="text-center mb-14">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Automated Response</span>
            <h2 className="text-4xl font-bold mt-2 mb-4 text-white">Recovery & Remediation</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Detection without recovery is incomplete. Aurix implements automatic remediation at multiple levels.</p>
          </div>
          <div className="space-y-4">
            {RECOVERY_LEVELS.map((rl, i) => (
              <motion.div key={rl.level} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 grid md:grid-cols-12 gap-4 items-start hover:bg-white/10 transition-all">
                  <div className="md:col-span-1 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      rl.level === 1 ? "bg-green-500" : rl.level === 2 ? "bg-yellow-500" : rl.level === 3 ? "bg-orange-500" : "bg-red-500"
                    }`}>{rl.level}</div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-bold mb-1 text-white">Level {rl.level}: {rl.title}</h4>
                    <p className="text-amber-300 text-sm mb-2"><strong>Trigger:</strong> {rl.trigger}</p>
                    <p className="text-slate-300 text-sm">{rl.action}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-12 text-center" style={GLASS_LIGHT}>
          <h2 className="text-4xl font-bold mb-6 text-slate-900">Deploy AI With Confidence</h2>
          <p className="text-slate-600 mb-10 text-lg">Hallucination risk shouldn't limit your AI ambitions. See how Parallel Sentinel Architecture can protect your production AI systems.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <button className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-sky-500/20">
                Contact Us <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
