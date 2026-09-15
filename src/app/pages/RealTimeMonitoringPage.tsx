import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { Activity, BarChart3, Bell, Search, TrendingUp, Database } from "lucide-react";
import { MOUNTAIN } from "../components/heroImages";

const STATS = [
  { value: "<100ms", label: "Alert Latency", color: "from-sky-50 to-sky-100/60", border: "border-sky-100", text: "text-sky-600" },
  { value: "1M+", label: "Events / Second", color: "from-violet-50 to-violet-100/60", border: "border-violet-100", text: "text-violet-600" },
  { value: "100%", label: "Trace Coverage", color: "from-emerald-50 to-emerald-100/60", border: "border-emerald-100", text: "text-emerald-600" },
  { value: "30 Days", label: "Retention", color: "from-amber-50 to-amber-100/60", border: "border-amber-100", text: "text-amber-600" },
];

const FEATURES = [
  { icon: <Activity className="w-6 h-6" />, title: "Transaction Tracing", desc: "Follow every request from entry to completion with full context and timing data. Identify bottlenecks at any layer of your stack.", color: "bg-sky-100 text-sky-600" },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Performance Metrics", desc: "Track latency, throughput, and resource utilization across all services. Compare against historical baselines automatically.", color: "bg-violet-100 text-violet-600" },
  { icon: <Bell className="w-6 h-6" />, title: "Anomaly Detection", desc: "AI-powered alerts identify unusual patterns before they become problems. Intelligent suppression eliminates alert fatigue.", color: "bg-emerald-100 text-emerald-600" },
  { icon: <Search className="w-6 h-6" />, title: "Historical Analysis", desc: "30-day retention with instant full-text search and correlation capabilities. Reconstruct any incident in seconds.", color: "bg-amber-100 text-amber-600" },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Trend Forecasting", desc: "Predictive analytics surface capacity and reliability issues before they impact SLAs. Proactive not reactive.", color: "bg-rose-100 text-rose-600" },
  { icon: <Database className="w-6 h-6" />, title: "Data Flow Visibility", desc: "End-to-end visibility into every data pipeline stage. Know exactly where data is, how it moves, and when it arrives.", color: "bg-teal-100 text-teal-600" },
];

export function RealTimeMonitoringPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Real-Time Monitoring"
        subtitle="Trace Profiling & Live Observability — sub-second visibility into every transaction, API call, and data flow"
        image={MOUNTAIN.toweringSpire}
      />

      <div className="container mx-auto px-6 py-16">
        {/* Stats */}
        <section id="overview">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg mb-10">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-4">At a Glance</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${s.color} border ${s.border} text-center`}
                >
                  <div className={`text-3xl font-bold mb-1 ${s.text}`}>{s.value}</div>
                  <div className="text-xs text-slate-600 font-medium uppercase tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg mb-10">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">Complete Visibility</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Monitor Every Aspect in Real Time</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Modern AI systems process millions of events per second across distributed infrastructure.
              Without comprehensive observability, a single misconfigured pipeline or degraded model
              can cause cascading failures that are nearly impossible to diagnose after the fact.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Aurix Real-Time Monitoring instruments every layer — from raw data ingestion through
              AI model inference to final output delivery — giving your team instant clarity on
              system health, data quality, and performance trends.
            </p>
          </GlassCard>
        </section>

        {/* Feature grid */}
        <section id="tracing" className="mb-10">
          <div className="text-center mb-8">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-2">Capabilities</p>
            <h2 className="text-2xl font-bold text-slate-900">Six Pillars of Observability</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <GlassCard className="p-5 bg-white border-slate-200 shadow-sm h-full">
                  <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-4`}>{f.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Anomaly detection */}
        <section id="anomaly" className="mb-10">
          <div className="bg-gradient-to-br from-sky-900 to-slate-800 rounded-2xl p-8 text-white">
            <p className="text-sky-300 font-semibold tracking-widest uppercase text-xs mb-3">AI-Powered</p>
            <h2 className="text-2xl font-bold mb-4">Anomaly Detection That Learns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Adaptive Baselines", body: "ML models learn your system's normal behavior and automatically adjust thresholds as patterns evolve." },
                { title: "Causal Analysis", body: "When anomalies appear, AI correlates related signals to surface root causes, not just symptoms." },
                { title: "Noise Suppression", body: "Intelligent de-duplication and correlation reduce alert volume by 94% while improving signal quality." },
              ].map((item) => (
                <div key={item.title} className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-sky-200 mb-2">{item.title}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <GlassCard className="p-8 bg-gradient-to-r from-sky-50 to-slate-50 border-sky-200 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready for Real-Time Visibility?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            See how trace profiling and AI-powered anomaly detection can transform your operations.
          </p>
          <Link to="/demo" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-all shadow-lg">
            Request Demo
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}