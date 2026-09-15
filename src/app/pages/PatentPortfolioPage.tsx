import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Lightbulb, ArrowRight, Calendar, Tag } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const PATENTS = [
  {
    title: "Parallel Sentinel Architecture for Real-Time AI Hallucination Detection",
    status: "Patent Pending",
    filed: "2024",
    category: "AI Safety",
    description:
      "A novel parallel processing architecture that deploys sentinel agents alongside production AI sessions to detect hallucinations in real-time by probing model cognitive state via logical invariant tests — without adding production latency.",
    claims: ["Real-time coherence scoring", "Graduated response protocols", "Vessel cascade prevention", "Zero additional latency"],
  },
  {
    title: "Clarity™ AI Decision Transparency Engine with Cryptographic Audit Trails",
    status: "Patent Pending",
    filed: "2024",
    category: "AI Transparency",
    description:
      "A multi-layer system for extracting, translating, and cryptographically securing AI decision reasoning chains. Generates audience-specific explanations (executive, business, technical, regulatory) from unified model inference traces.",
    claims: ["SHA-256 signed decision records", "Multi-audience explanation generation", "Regulatory format templates", "Immutable append-only audit logs"],
  },
  {
    title: "Autonomous Self-Healing Data Pipeline Orchestration with Semantic Repair",
    status: "Patent Pending",
    filed: "2024",
    category: "Data Engineering",
    description:
      "An autonomous system that detects, diagnoses, and repairs data pipeline failures and data quality issues without human intervention. Employs semantic understanding of data context to apply targeted repairs while documenting all corrections for compliance.",
    claims: ["Semantic fault detection", "Automated repair workflows", "Compliance-grade documentation", "Schema evolution adaptation"],
  },
  {
    title: "SWARM Multi-Agent Coordination Protocol with Thread Fabric Communication",
    status: "Patent Pending",
    filed: "2024",
    category: "Agentic AI",
    description:
      "A distributed coordination protocol for autonomous AI agent swarms, enabling dynamic task allocation, inter-agent communication via encrypted thread fabrics, and lost-agent recovery without centralized orchestration.",
    claims: ["Decentralised agent coordination", "Encrypted thread fabric messaging", "Dynamic task reallocation", "Lost-agent recovery protocol"],
  },
  {
    title: "PHANTOM™ Self-Orchestrating Penetration Testing Agent Architecture",
    status: "Patent Pending",
    filed: "2024",
    category: "Security",
    description:
      "An autonomous penetration testing platform where AI agents self-spawn, coordinate, and cross network boundaries to conduct comprehensive security assessments. Includes physical micro-probe deployment for air-gapped network testing.",
    claims: ["Agent spawn coordination", "Physical micro-probe integration", "Non-destructive exploit validation", "Air-gap boundary crossing"],
  },
  {
    title: "Developer Ecosystem Gallery with Zero-Data-Leakage Template Sharing",
    status: "Patent Pending",
    filed: "2024",
    category: "Platform",
    description:
      "A marketplace architecture that enables sharing of data pipeline configurations, AI application templates, and integration patterns across organisations without exposing any underlying customer data, credentials, or sensitive business logic.",
    claims: ["Zero-data-leakage packaging", "Configuration template serialisation", "Secure deployment instantiation", "Private/public gallery federation"],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "AI Safety":        "bg-red-50 text-red-700 border-red-200",
  "AI Transparency":  "bg-sky-50 text-sky-700 border-sky-200",
  "Data Engineering": "bg-purple-50 text-purple-700 border-purple-200",
  "Agentic AI":       "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Security":         "bg-amber-50 text-amber-700 border-amber-200",
  "Platform":         "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function PatentPortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <PageHero
        title="Patent Portfolio"
        subtitle="Innovations protected by pending patents across AI safety, transparency, data engineering, agentic AI, and security."
        badge="Innovation"
        image={MOUNTAIN.peakSunsetGolden}
      />

      {/* Patent Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PATENTS.map((patent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-amber-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[patent.category] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                    <Tag className="inline w-3 h-3 mr-1" />{patent.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs">
                    <Calendar className="w-3 h-3" /> Filed: {patent.filed}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-full">
                    {patent.status}
                  </span>
                </div>

                <h3 className="text-slate-900 font-bold text-lg leading-snug mb-3">
                  {patent.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{patent.description}</p>

                <div>
                  <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider mb-2">Key Claims</p>
                  <div className="flex flex-wrap gap-2">
                    {patent.claims.map((claim, j) => (
                      <span key={j} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs rounded-lg">
                        {claim}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-12 bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm"
          >
            <Lightbulb className="w-10 h-10 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Additional Patents in Progress</h3>
            <p className="text-slate-600 max-w-xl mx-auto">
              Our R&D team continues to develop novel approaches to AI governance and enterprise security.
              Additional patent applications are being prepared for filing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Interested in Licensing?</h2>
          <p className="text-slate-600 text-lg mb-10">
            Contact our team to discuss licensing opportunities for any of our patented technologies.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-sky-500/20"
          >
            Get in Touch <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}