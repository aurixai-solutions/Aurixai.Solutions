import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { Shield, Globe, Building2, Cpu, BookOpen, CheckCircle2 } from "lucide-react";
import { TEACHING } from "../components/heroImages";

const REGULATIONS = [
  { icon: <Globe className="w-6 h-6" />, flag: "🇪🇺", name: "EU AI Act", desc: "The world's first comprehensive AI law. Establishes risk-based requirements for AI systems with mandatory conformity assessments, transparency requirements, and human oversight obligations for high-risk systems.", color: "bg-blue-100 text-blue-600" },
  { icon: <Shield className="w-6 h-6" />, flag: "🇪🇺", name: "GDPR", desc: "Affects any AI system processing EU resident data. Key requirements include lawful basis for processing, data minimization, transparency, and the right to explanation for automated decisions.", color: "bg-sky-100 text-sky-600" },
  { icon: <Globe className="w-6 h-6" />, flag: "🇺🇸", name: "CCPA / CPRA", desc: "California's privacy laws grant consumers rights over their personal information, including the right to opt out of automated decision-making and profiling.", color: "bg-violet-100 text-violet-600" },
  { icon: <Building2 className="w-6 h-6" />, flag: "🏥", name: "HIPAA", desc: "Healthcare AI must comply with strict patient data protections. Privacy Rule, Security Rule, and specific requirements for AI-assisted diagnosis and treatment recommendations.", color: "bg-emerald-100 text-emerald-600" },
];

const INDUSTRIES = [
  { icon: "💰", title: "Financial Services", body: "SEC, FINRA, and banking regulators require explainability for AI-driven trading, credit decisions, and fraud detection. Model risk management (SR 11-7) mandates documentation, validation, and ongoing monitoring." },
  { icon: "🏥", title: "Healthcare", body: "FDA regulates AI as a medical device (SaMD). Clinical AI must demonstrate safety and efficacy, with ongoing post-market surveillance requirements." },
  { icon: "🏛️", title: "Government", body: "Federal agencies must comply with OMB guidance on AI governance, including algorithmic impact assessments, bias testing, and public transparency requirements." },
  { icon: "🎖️", title: "Defense", body: "DoD AI systems must comply with ethical AI principles, testing requirements, and specific security certifications including FedRAMP and IL levels." },
];

const AURIX_FEATURES = [
  { icon: <BookOpen className="w-5 h-5" />, title: "Automated Documentation", body: "Generate compliance documentation automatically, including model cards, data lineage reports, and audit trails — ready for auditor review." },
  { icon: <Cpu className="w-5 h-5" />, title: "Explainability (Clarity™)", body: "Every AI decision includes plain-language explanations that satisfy regulatory requirements for transparency and the right to explanation." },
  { icon: <Shield className="w-5 h-5" />, title: "Bias Detection", body: "Continuous monitoring for algorithmic bias with automated alerts and remediation recommendations before issues become regulatory violations." },
  { icon: <CheckCircle2 className="w-5 h-5" />, title: "Audit Trails", body: "Complete, immutable records of all AI decisions, data access, and system changes for regulatory audits — always ready, never scrambled." },
];

export function RegulatoryComplianceLearningPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="AI Regulatory Compliance"
        subtitle="Navigate the Global AI Regulatory Landscape — from GDPR and EU AI Act to industry-specific requirements"
        image={TEACHING.mentoringSession}
      />

      <div className="container mx-auto px-6 py-16 space-y-10">

        {/* Global landscape */}
        <section id="global">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">Overview</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Global Regulatory Landscape</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              AI regulation is accelerating worldwide. What was once voluntary guidance has become enforceable law,
              with penalties that can reach hundreds of millions of dollars. Understanding the regulatory landscape
              is no longer optional — it's a board-level responsibility.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REGULATIONS.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-5 border border-slate-200 rounded-xl bg-slate-50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-lg ${r.color} flex items-center justify-center flex-shrink-0`}>{r.icon}</div>
                    <div>
                      <span className="text-lg mr-2">{r.flag}</span>
                      <span className="font-bold text-slate-900">{r.name}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Industry requirements */}
        <section id="industry">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">Industry-Specific</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sector Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {INDUSTRIES.map((ind) => (
                <div key={ind.title} className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{ind.icon}</span>
                    <h3 className="font-bold text-slate-900">{ind.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{ind.body}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Aurix capabilities */}
        <section id="aurix">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">How Aurix Helps</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Compliance as a Competitive Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {AURIX_FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* CTA */}
        <GlassCard className="p-8 bg-gradient-to-r from-sky-50 to-slate-50 border-sky-200 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Navigate AI Compliance?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">See how Aurix turns regulatory complexity into a competitive advantage.</p>
          <Link to="/solutions" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-all shadow-lg">
            Explore Solutions
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}