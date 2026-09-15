import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  GitBranch, Zap, Shield, Database, Globe, BarChart3, Code2,
  CheckCircle2, ArrowRight, Layers, RefreshCw, Package, Users, AlertCircle
} from "lucide-react";
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
  { v: "200+", l: "Pre-Built Connectors" },
  { v: "80%", l: "Faster Development" },
  { v: "99.9%", l: "Pipeline Uptime" },
  { v: "60%", l: "Cost Reduction" },
];

const PIPELINE_FEATURES = [
  {
    icon: Layers, color: "from-sky-600 to-cyan-600",
    title: "Drag-and-Drop Canvas",
    body: "Build pipelines visually on an infinite canvas. Add sources, transformations, and destinations by dragging components. Connect them with intelligent auto-routing.",
    tags: ["Infinite zoomable canvas", "Real-time collaboration", "Version control", "Template library"],
  },
  {
    icon: Zap, color: "from-purple-600 to-violet-600",
    title: "AI-Assisted Development",
    body: "SENTINEL™ AI accelerates pipeline development. Describe what you need in natural language and AI suggests components, mappings, and transformations.",
    tags: ["Natural language generation", "Auto schema mapping", "Transformation codegen", "Anomaly detection"],
  },
  {
    icon: Code2, color: "from-green-600 to-emerald-600",
    title: "Code When You Need It",
    body: "Visual design for speed, code for precision. Switch to SQL, Python, or Spark at any point. Code and visual representations stay in sync.",
    tags: ["SQL, Python, Spark, dbt", "Integrated IDE", "Git-based versioning", "Unit testing built-in"],
  },
];

const SELF_HEALING = [
  { label: "Schema evolution", body: "Auto-adapt when source schemas change" },
  { label: "Data repair", body: "Fix quality issues in-flight via Prism™" },
  { label: "Error recovery", body: "Retry failures with exponential backoff" },
  { label: "Dead letter queues", body: "Capture unfixable records for review" },
];

const MASHUP_SOURCES = [
  {
    category: "Compliance & Regulatory", color: "text-red-400",
    items: ["OFAC/SDN Sanctions Lists", "UN & EU Sanctions", "PEP Database (1M+ records)", "SEC EDGAR Filings", "OIG LEIE Exclusions", "FDA NDC Drug Codes"],
  },
  {
    category: "Identity Verification", color: "text-sky-400",
    items: ["Experian PreciseID", "Equifax Identity", "TransUnion TrueValidate", "USPS CASS Address Validation", "D&B Data Cloud", "GLEIF LEI Registry"],
  },
  {
    category: "Market Intelligence", color: "text-green-400",
    items: ["Bloomberg BPIPE", "Refinitiv Elektron", "FRED API (Federal Reserve)", "BLS Economic Data", "World Bank Data", "Alternative / Satellite Data"],
  },
];

const ENTERPRISE_FEATURES = [
  { icon: Shield, title: "Security", body: "SOC 2 Type II, encryption at rest/transit, RBAC, audit logging" },
  { icon: BarChart3, title: "Scalability", body: "Auto-scaling compute, process petabytes, 10K+ concurrent pipelines" },
  { icon: RefreshCw, title: "Monitoring", body: "Real-time dashboards, alerting, SLA tracking, cost attribution" },
  { icon: Users, title: "Collaboration", body: "Teams, permissions, comments, approval workflows, shared libraries" },
];

const FORGE_FEATURES = [
  { title: "Visual App Builder", body: "Drag AI components, data sources, and UI elements to create functional applications." },
  { title: "Pre-Built AI Blocks", body: "Classification, extraction, summarization, generation — connect to your data." },
  { title: "One-Click Deploy", body: "Deploy apps to web, Slack, Teams, or API endpoints instantly." },
];

export function PenPage() {
  const [mashupTab, setMashupTab] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero — full-bleed PageHero */}
      <PageHero
        badge="Data Engineering Platform"
        title="Aurix PEN™"
        subtitle="Pipeline Engineering Network — Build enterprise data pipelines in minutes, not months. Visual design, AI-assisted automation, and native Prism™ integration."
        image={MOUNTAIN.iceClimbingFrozenWaterfall}
      />

      <div className="container mx-auto px-6 max-w-6xl py-16 space-y-10">

        {/* Stats */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                className="bg-white/60 border border-white/80 rounded-2xl p-6 text-center shadow-sm backdrop-blur-sm">
                <div className="text-3xl font-bold text-sky-600 mb-1">{s.v}</div>
                <div className="text-sm text-slate-500">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Problem */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">The Challenge</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-slate-900">Data Pipelines Are Too Hard to Build</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Building data pipelines shouldn't require a team of specialists. Yet today, creating a simple ETL workflow means coordinating data engineers, platform teams, and operations. A pipeline that should take days takes months.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                And once built, pipelines are fragile. Schema changes break them. Source systems go offline. Data quality issues cascade downstream. Your team spends more time <strong className="text-slate-900">fixing pipelines than building value</strong>.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Meanwhile, business users wait — locked behind a backlog of data engineering requests. By the time the data arrives, the decision has already been made with incomplete information.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "6–12 Months", l: "Typical Pipeline Project", sub: "From request to production for complex pipelines" },
                { v: "40%", l: "Time Spent on Maintenance", sub: "Data engineers fixing broken pipelines vs. building new value" },
                { v: "3.1T", l: "Annual Cost of Bad Data", sub: "IBM estimate for the US economy alone" },
                { v: "50%", l: "Time Lost", sub: "Knowledge workers hunting for and correcting data" },
              ].map((s, i) => (
                <div key={i} className="bg-red-50/80 border border-red-200/60 rounded-xl p-5 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-red-600 mb-1">{s.v}</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">{s.l}</div>
                  <div className="text-xs text-slate-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Pipeline Builder */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Core Platform</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-slate-900">Visual Pipeline Design</h2>
            <p className="text-slate-600">Drag, drop, connect. PEN's visual canvas lets anyone design data workflows — from simple extracts to complex multi-source transformations. No coding required, but full code access when you need it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PIPELINE_FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/60 border border-white/80 rounded-2xl p-6 hover:border-sky-300 hover:shadow-md transition-colors shadow-sm backdrop-blur-sm">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{f.title}</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{f.body}</p>
                <ul className="space-y-1">
                  {f.tags.map((t, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 200+ Connectors */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">200+ Native Connectors</h2>
            <p className="text-slate-600">Connect to any data source in minutes. Pre-built connectors handle authentication, schema discovery, incremental loading, and change data capture automatically.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              "Snowflake","BigQuery","Redshift","Salesforce","SAP","Oracle",
              "PostgreSQL","MySQL","MongoDB","Kafka","AWS S3","Azure Blob",
              "Databricks","dbt","Airflow","Fivetran","Stitch","HubSpot",
              "Stripe","ServiceNow","Workday","NetSuite","Marketo","Zendesk",
            ].map((c, i) => (
              <div key={i} className="bg-white/60 border border-white/80 rounded-lg px-3 py-2.5 text-center text-sm text-slate-600 hover:border-sky-300 hover:text-sky-700 transition-all cursor-default shadow-sm backdrop-blur-sm">
                {c}
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">
            Don't see your source? Our SDK lets you build custom connectors in hours, not weeks.
          </p>
        </div>

        {/* Self-Healing Pipelines */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Powered by Prism™</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-slate-900">Self-Healing Pipelines</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                PEN pipelines don't just move data — they heal it. Native integration with Aurix Prism™ means data quality rules run at every stage. When issues are detected, self-healing kicks in automatically.
              </p>
              <div className="space-y-4 mb-8">
                {SELF_HEALING.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900">{item.label}:</span>{" "}
                      <span className="text-slate-600">{item.body}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/solutions/prism" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition-colors">
                Learn About Prism™ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "92%", l: "Auto-Healed Issues" },
                { v: "99.9%", l: "Pipeline Uptime" },
                { v: "<5 min", l: "Avg Repair Time" },
                { v: "0", l: "Manual Interventions" },
              ].map((s, i) => (
                <div key={i} className="bg-emerald-50/80 border border-emerald-200/60 rounded-xl p-6 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{s.v}</div>
                  <div className="text-sm text-slate-600">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forge Studio / AgenticMind promo */}
        <div className="p-8 md:p-10 text-white" style={GLASS_DARK}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-medium mb-4">Patent Pending</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">AgenticMind™: Build Self-Healing AI Agents</h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Go beyond pipelines. AgenticMind™ is Aurix's No-Boundaries Agentic Framework — build, deploy, and govern self-optimising AI agents and autonomous workflows with 1,015+ pre-built components and automated integration with every major agentic framework hub and standard.
              </p>
              <p className="text-slate-300 mb-6">
                <strong className="text-white">Example agents:</strong> Document intelligence pipelines, autonomous sales agents, compliance monitoring agents, data quality sentinels, customer service composites — with full cost control intelligence built in.
              </p>
              <Link to="/solutions/agentic-mind" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition-colors">
                Explore AgenticMind™ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {FORGE_FEATURES.map((f, i) => (
                <div key={i} className="bg-white/10 border border-white/15 rounded-xl p-5 backdrop-blur-sm">
                  <h4 className="font-bold text-white mb-1">{f.title}</h4>
                  <p className="text-slate-300 text-sm">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Mashup Intelligence */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Enterprise Data Mashups</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-slate-900">Intelligent Data Fusion & Validation</h2>
            <p className="text-slate-600">
              PEN's Data Mashup Engine combines internal enterprise data with 150+ external authoritative sources for
              real-time validation, enrichment, and predictive intelligence. AI-powered entity resolution, fuzzy matching,
              and automated compliance screening — all with &lt;50ms latency.
            </p>
          </div>

          {/* Architecture overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "<50ms", sub: "Validation Latency", color: "text-sky-600" },
              { label: "99.7%", sub: "Match Accuracy", color: "text-emerald-600" },
              { label: "150+", sub: "External APIs Pre-integrated", color: "text-violet-600" },
            ].map((s, i) => (
              <div key={i} className="bg-white/60 border border-white/80 rounded-2xl p-6 text-center shadow-sm backdrop-blur-sm">
                <div className={`text-4xl font-bold mb-2 ${s.color}`}>{s.label}</div>
                <div className="text-slate-500 text-sm">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Source tabs */}
          <div className="bg-white/60 border border-white/80 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
            <div className="flex gap-2 mb-6 flex-wrap">
              {MASHUP_SOURCES.map((s, i) => (
                <button key={i} onClick={() => setMashupTab(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mashupTab === i ? "bg-sky-600 text-white" : "bg-slate-100/80 text-slate-500 hover:text-slate-900"}`}>
                  {s.category}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {MASHUP_SOURCES[mashupTab].items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />{item}
                </div>
              ))}
            </div>
          </div>

          {/* Key use cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              { icon: "🏦", title: "KYC/AML Customer Onboarding", sub: "Financial Services · Healthcare · Insurance", body: "Automatically verify customer identity, screen against sanctions lists, validate addresses, and calculate risk scores during onboarding in under 3 seconds." },
              { icon: "🛡️", title: "Real-Time Fraud Detection", sub: "Payments · E-Commerce · Banking", body: "Score every transaction in real-time by combining internal behavior patterns with external fraud signals, device fingerprints, and geolocation anomalies." },
              { icon: "🚚", title: "Supply Chain Risk Prediction", sub: "Manufacturing · Retail · Logistics", body: "Predict supply chain disruptions by combining vendor data with weather forecasts, shipping intelligence, geopolitical events, and economic indicators." },
              { icon: "✅", title: "Continuous Data Validation", sub: "All Industries · Cross-Functional", body: "Automatically validate internal data against authoritative external sources, identifying errors, drift, and inconsistencies before they impact downstream systems." },
            ].map((uc, i) => (
              <div key={i} className="bg-white/60 border border-white/80 rounded-xl p-6 shadow-sm backdrop-blur-sm">
                <div className="text-3xl mb-3">{uc.icon}</div>
                <h4 className="font-bold text-slate-900 mb-1">{uc.title}</h4>
                <p className="text-xs text-sky-600 mb-3">{uc.sub}</p>
                <p className="text-slate-600 text-sm">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">Enterprise-Grade Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENTERPRISE_FEATURES.map((f, i) => (
              <div key={i} className="bg-white/60 border border-white/80 rounded-2xl p-6 text-center shadow-sm backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-sky-50/80 border border-sky-100/60 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-sky-600" />
                </div>
                <h4 className="font-bold mb-2 text-slate-900">{f.title}</h4>
                <p className="text-slate-500 text-sm">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-12 text-center" style={GLASS_LIGHT}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Ready to Accelerate Your Data Engineering?</h2>
          <p className="text-slate-600 mb-8">See how PEN can help you build pipelines faster, with better quality, and less maintenance.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/demo" className="px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-all hover:shadow-lg hover:shadow-sky-500/20">
              Schedule Demo →
            </Link>
            <Link to="/solutions/prism" className="px-8 py-3.5 rounded-xl border border-slate-200 bg-white/70 text-slate-700 hover:bg-white font-semibold transition-all hover:shadow-sm backdrop-blur-sm">
              Explore Prism™ Integration
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}