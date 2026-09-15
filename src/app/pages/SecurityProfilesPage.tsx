import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { Shield, AlertTriangle, Activity, Search } from "lucide-react";
import { MOUNTAIN } from "../components/heroImages";

const STATS = [
  { value: "770+", label: "Security Profiles", color: "from-sky-50 to-sky-100/60", border: "border-sky-100", text: "text-sky-600" },
  { value: "15", label: "Industries Covered", color: "from-violet-50 to-violet-100/60", border: "border-violet-100", text: "text-violet-600" },
  { value: "99.7%", label: "Detection Rate", color: "from-emerald-50 to-emerald-100/60", border: "border-emerald-100", text: "text-emerald-600" },
  { value: "24/7", label: "Active Monitoring", color: "from-amber-50 to-amber-100/60", border: "border-amber-100", text: "text-amber-600" },
];

const INDUSTRIES = [
  { emoji: "🏦", name: "Financial Services", profileCount: 87, standards: "PCI DSS, SOX, GLBA" },
  { emoji: "🏥", name: "Healthcare", profileCount: 124, standards: "HIPAA, HITECH, FDA 21 CFR" },
  { emoji: "🎖️", name: "Defense", profileCount: 112, standards: "CMMC, DFARS, NIST 800-171" },
  { emoji: "⚡", name: "Energy & Utilities", profileCount: 78, standards: "NERC CIP, IEC 62443" },
  { emoji: "🏭", name: "Manufacturing", profileCount: 95, standards: "ISO 27001, TISAX" },
  { emoji: "🛒", name: "Retail", profileCount: 63, standards: "PCI DSS, CCPA/GDPR" },
  { emoji: "🏛️", name: "Government", profileCount: 89, standards: "FedRAMP, FISMA, CJIS" },
  { emoji: "💻", name: "Technology / SaaS", profileCount: 71, standards: "SOC 2, ISO 27001, CSA STAR" },
];

const PROFILE_FEATURES = [
  { icon: <Shield className="w-5 h-5" />, title: "Pre-Built by Domain Experts", body: "Each profile is built by security practitioners with deep industry knowledge — not generic rules.", color: "bg-sky-100 text-sky-600" },
  { icon: <Activity className="w-5 h-5" />, title: "Mapped to Regulatory Frameworks", body: "Every profile maps to relevant compliance standards so detection and compliance are unified.", color: "bg-emerald-100 text-emerald-600" },
  { icon: <AlertTriangle className="w-5 h-5" />, title: "Industry Attack Vectors", body: "Tuned for the specific threat actors, tactics, and techniques that target your sector.", color: "bg-amber-100 text-amber-600" },
  { icon: <Search className="w-5 h-5" />, title: "Deployable in Hours", body: "Import a profile, configure your data sources, and have detection running before lunch.", color: "bg-violet-100 text-violet-600" },
];

export function SecurityProfilesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Security Capability Profiles"
        subtitle="770+ industry-specific threat detection profiles — pre-built by domain experts, deployable in hours"
        image={MOUNTAIN.snowRidgeTraverse}
      />

      <div className="container mx-auto px-6 py-16 space-y-10">

        {/* Stats */}
        <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className={`p-4 rounded-xl bg-gradient-to-br ${s.color} border ${s.border} text-center`}>
                <div className={`text-3xl font-bold mb-1 ${s.text}`}>{s.value}</div>
                <div className="text-xs text-slate-600 font-medium uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Industries */}
        <section id="industries">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">Browse by Industry</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Industry Coverage</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {INDUSTRIES.map((ind, i) => (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-4 border border-slate-200 rounded-xl bg-slate-50 text-center"
                >
                  <div className="text-3xl mb-2">{ind.emoji}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{ind.name}</h3>
                  <div className="text-2xl font-bold text-sky-600 mb-1">{ind.profileCount}</div>
                  <div className="text-xs text-slate-500">profiles</div>
                  <div className="mt-2 text-xs text-slate-400 leading-tight">{ind.standards}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Profile features */}
        <section id="features">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">Profile Features</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">What Makes Our Profiles Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PROFILE_FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className={`w-9 h-9 rounded-lg ${f.color} flex items-center justify-center flex-shrink-0`}>{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Custom profiles */}
        <section id="custom">
          <div className="bg-gradient-to-br from-sky-900 to-slate-800 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Need a Custom Profile?</h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Our security experts can build tailored detection profiles for your specific industry requirements,
              threat actors, and regulatory environment.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all shadow-lg">
              Contact Sales
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}