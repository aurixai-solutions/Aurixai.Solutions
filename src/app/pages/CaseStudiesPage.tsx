import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Trophy, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const CASE_STUDIES = [
  {
    title: "Fortune 500 Bank Cuts Fraud Losses 78% with Aurix Lattice™",
    industry: "Financial Services",
    icon: "🏦",
    outcome: "78% reduction in fraud losses",
    roi: "340% ROI",
    challenge:
      "A leading financial services firm was struggling with false positives from legacy SIEM tools, overwhelming its SOC team and missing sophisticated wire-transfer fraud patterns.",
    solution:
      "Deployed Aurix Lattice™ with Financial Services security profiles, replacing three legacy tools. PHANTOM™ conducted continuous penetration testing to validate control effectiveness.",
    results: [
      "78% reduction in fraud-related losses",
      "92% drop in false positive alerts",
      "5-minute mean time to respond (down from 4 hours)",
      "PCI DSS and SOX compliance achieved automatically",
    ],
  },
  {
    title: "Regional Health System Achieves 100% HIPAA Audit Pass Rate",
    industry: "Healthcare",
    icon: "🏥",
    outcome: "100% HIPAA audit pass rate",
    roi: "260% ROI",
    challenge:
      "A multi-facility health system needed to demonstrate continuous HIPAA compliance across 47 connected medical devices while maintaining clinical workflow continuity.",
    solution:
      "Aurix Prism™ provided automated data quality and governance, while Lattice™ monitored all medical device network traffic with healthcare-specific detection profiles.",
    results: [
      "100% HIPAA audit pass rate — zero findings",
      "All 47 medical devices continuously monitored",
      "PHI data quality score improved from 67% to 99.2%",
      "Incident response time reduced by 85%",
    ],
  },
  {
    title: "Defense Contractor Achieves CMMC Level 3 Certification",
    industry: "Defense & Intelligence",
    icon: "🛡️",
    outcome: "CMMC Level 3 certified",
    roi: "$12M contract enabled",
    challenge:
      "A tier-2 defense contractor needed to achieve CMMC Level 3 certification within 90 days to qualify for a critical DoD contract worth $12M.",
    solution:
      "Aurix deployed a complete CMMC compliance framework using Lattice™ for CUI protection, PHANTOM™ for continuous penetration testing, and Clarity™ for audit documentation.",
    results: [
      "CMMC Level 3 certification achieved in 87 days",
      "$12M DoD contract secured",
      "200+ APT indicators continuously monitored",
      "Full CUI inventory and access control implemented",
    ],
  },
  {
    title: "Energy Utility Secures OT Network Against Nation-State Threats",
    industry: "Energy & Utilities",
    icon: "⚡",
    outcome: "Zero OT incidents in 18 months",
    roi: "Prevented estimated $40M incident",
    challenge:
      "A major electricity utility identified suspicious reconnaissance activity targeting SCADA systems from a suspected nation-state actor.",
    solution:
      "Aurix Lattice™ with NERC CIP profiles was deployed across OT and IT environments, with PHANTOM™ micro-probes physically testing isolated ICS network segments.",
    results: [
      "Nation-state threat actor attribution and containment",
      "Zero OT security incidents in 18 months post-deployment",
      "45 ICS protocols continuously monitored",
      "NERC CIP compliance dashboard implemented",
    ],
  },
];

export function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <PageHero
        title="Case Studies"
        subtitle="Real results from real organisations using Aurix AI Solutions."
        badge="Success Stories"
        image={MOUNTAIN.frozenWaterfallClimbing}
      />

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl space-y-12">
          {CASE_STUDIES.map((cs, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Header */}
              <div className="p-8 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-3xl">{cs.icon}</span>
                  <span className="px-3 py-1 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold rounded-full">
                    {cs.industry}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full">
                    <TrendingUp className="w-3 h-3" /> {cs.roi}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 leading-snug">{cs.title}</h2>
                <p className="text-emerald-600 font-semibold mt-2 text-sm">{cs.outcome}</p>
              </div>

              {/* Body */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-slate-400 text-xs uppercase font-semibold tracking-widest mb-3">Challenge</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{cs.challenge}</p>
                </div>
                <div>
                  <h4 className="text-slate-400 text-xs uppercase font-semibold tracking-widest mb-3">Solution</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{cs.solution}</p>
                </div>
                <div>
                  <h4 className="text-slate-400 text-xs uppercase font-semibold tracking-widest mb-3">Results</h4>
                  <ul className="space-y-2">
                    {cs.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center"
          >
            <Trophy className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">More Case Studies Coming Soon</h3>
            <p className="text-slate-500 max-w-xl mx-auto">
              We're documenting success stories from our growing client base. Contact us to learn
              how Aurix can deliver similar outcomes for your organisation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-slate-500 text-lg mb-10">
            Schedule a personalised demo to see how Aurix can deliver measurable results for your organisation.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-full transition-all shadow-md"
          >
            Request Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}