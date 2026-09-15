import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { BookOpen, ChevronRight, Clock } from "lucide-react";
import { TEACHING } from "../components/heroImages";

/** Map lesson numbers to their page route (where a dedicated page exists) */
const LESSON_ROUTES: Record<number, string> = {
  2:  "/learn/data-landscape",
  9:  "/learn/what-is-data-governance",
  17: "/learn/what-is-data-quality",
  33: "/learn/regulatory-compliance",
};

interface Lesson { num: number; title: string; }
interface Part { id: string; icon: string; partNum: string; title: string; desc: string; lessons: Lesson[]; }

const CURRICULUM: Part[] = [
  { id: "foundations", icon: "🏗️", partNum: "Part 1", title: "Foundations of Data", desc: "Core concepts every business leader needs to understand", lessons: [
    { num: 1, title: "What Is Data and Why Does It Matter?" }, { num: 2, title: "The Modern Data Landscape" }, { num: 3, title: "From Data to Insights: The Value Chain" }, { num: 4, title: "Data Silos: The Hidden Cost" }, { num: 5, title: "Introduction to Data Architecture" }, { num: 6, title: "Cloud vs On-Premise: A Business Guide" }, { num: 7, title: "Understanding Databases (Without the Tech)" }, { num: 8, title: "APIs: How Systems Talk to Each Other" },
  ]},
  { id: "governance", icon: "📋", partNum: "Part 2", title: "Data Governance Essentials", desc: "Frameworks, policies, and best practices for data control", lessons: [
    { num: 9, title: "What Is Data Governance?" }, { num: 10, title: "The Business Case for Governance" }, { num: 11, title: "Data Stewardship: Roles and Responsibilities" }, { num: 12, title: "Data Catalogs: Finding What You Own" }, { num: 13, title: "Data Lineage: Where Did This Come From?" }, { num: 14, title: "Master Data Management (MDM)" }, { num: 15, title: "Building a Data Governance Program" }, { num: 16, title: "Measuring Governance Success" },
  ]},
  { id: "quality", icon: "✅", partNum: "Part 3", title: "Data Quality", desc: "How to ensure your data is accurate, complete, and trustworthy", lessons: [
    { num: 17, title: "The Six Dimensions of Data Quality" }, { num: 18, title: "The Real Cost of Bad Data" }, { num: 19, title: "Data Profiling: Know Your Data" }, { num: 20, title: "Cleansing vs Enrichment vs Normalization" }, { num: 21, title: "Building Data Quality Rules" }, { num: 22, title: "Self-Healing Data Systems" }, { num: 23, title: "Data Quality Scorecards" }, { num: 24, title: "Sustaining Quality Long-Term" },
  ]},
  { id: "security", icon: "🛡️", partNum: "Part 4", title: "Data Security Fundamentals", desc: "Protecting data from threats both inside and outside the organization", lessons: [
    { num: 25, title: "The Threat Landscape Explained" }, { num: 26, title: "Encryption: A Non-Technical Guide" }, { num: 27, title: "Access Control and Zero Trust" }, { num: 28, title: "Insider Threats: The Overlooked Risk" }, { num: 29, title: "Security Audits: What to Expect" }, { num: 30, title: "Penetration Testing Demystified" }, { num: 31, title: "Incident Response Planning" }, { num: 32, title: "Security Culture and Training" },
  ]},
  { id: "compliance", icon: "⚖️", partNum: "Part 5", title: "Regulatory Compliance", desc: "Navigate the global landscape of data privacy and security regulations", lessons: [
    { num: 33, title: "GDPR: What Every Business Must Know" }, { num: 34, title: "HIPAA for Non-Healthcare Professionals" }, { num: 35, title: "PCI DSS: Protecting Payment Data" }, { num: 36, title: "SOX and Financial Data Controls" }, { num: 37, title: "CCPA and US State Privacy Laws" }, { num: 38, title: "CMMC: Defense Contractor Requirements" }, { num: 39, title: "Building a Compliance Program" }, { num: 40, title: "Compliance vs Security: The Difference" },
  ]},
  { id: "ai", icon: "🤖", partNum: "Part 6", title: "AI & Machine Learning Governance", desc: "Understanding and governing the AI systems in your organization", lessons: [
    { num: 41, title: "What Is AI and How Does It Learn?" }, { num: 42, title: "AI Decision-Making: Explainability Matters" }, { num: 43, title: "Algorithmic Bias: Causes and Consequences" }, { num: 44, title: "AI Hallucinations and Why They're Dangerous" }, { num: 45, title: "Shadow AI: The Governance Challenge" }, { num: 46, title: "The EU AI Act: Key Requirements" }, { num: 47, title: "Building an AI Governance Framework" }, { num: 48, title: "AI Auditing and Model Risk Management" },
  ]},
  { id: "advanced", icon: "🚀", partNum: "Part 7", title: "Advanced Concepts", desc: "Emerging topics shaping the future of data strategy", lessons: [
    { num: 49, title: "Data Sovereignty: Jurisdiction Matters" }, { num: 50, title: "The Data Mesh Architecture" }, { num: 51, title: "Real-Time Data Processing" }, { num: 52, title: "Data Contracts Between Teams" }, { num: 53, title: "Synthetic Data: Training Without Risk" }, { num: 54, title: "Federated Learning for Privacy" }, { num: 55, title: "Quantum Computing and Data Security" }, { num: 56, title: "The Future of Data Governance" },
  ]},
  { id: "aurix", icon: "💎", partNum: "Part 8", title: "Platform Deep Dive", desc: "How the platform solves the challenges you've learned about", lessons: [
    { num: 57, title: "AI-Native Threat Intelligence" }, { num: 58, title: "Self-Healing Data Governance" }, { num: 59, title: "Multi-AI Orchestration" }, { num: 60, title: "Explainable AI Decisions" }, { num: 61, title: "Autonomous Security Audits" }, { num: 62, title: "Autonomous Agent Operations" }, { num: 63, title: "Mobile Security Management" }, { num: 64, title: "The Integrated Platform: Complete Picture" },
  ]},
];

export function StepByStepLearningPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Step-by-Step Learning"
        subtitle="Master Data Governance, Quality & Security — a comprehensive 8-part curriculum for business leaders"
        image={TEACHING.digitalLearning}
      />

      <div className="container mx-auto px-6 py-16">

        {/* Stats */}
        <GlassCard className="p-6 bg-white border-slate-200 shadow-lg mb-10">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {[
              { value: "64", label: "Lessons", color: "text-sky-600" },
              { value: "8", label: "Parts", color: "text-violet-600" },
              { value: "25–35", label: "Hours Total", color: "text-amber-600" },
              { value: "20 min", label: "Per Lesson", color: "text-emerald-600" },
              { value: "0", label: "Prerequisites", color: "text-rose-600" },
            ].map((s) => (
              <div key={s.label}>
                <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Curriculum */}
        <section id="curriculum">
          <div className="text-center mb-8">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-2">Curriculum</p>
            <h2 className="text-2xl font-bold text-slate-900">8-Part Learning Journey</h2>
          </div>
          <div className="space-y-4">
            {CURRICULUM.map((part, i) => (
              <motion.div
                key={part.id}
                id={part.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <GlassCard className="p-5 bg-white border-slate-200 shadow-sm">
                  <details>
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{part.icon}</span>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-0.5">{part.partNum}</div>
                          <h3 className="font-bold text-slate-900">{part.title}</h3>
                          <p className="text-slate-500 text-sm">{part.desc}</p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs flex-shrink-0">
                          <Clock className="w-3.5 h-3.5" /> {part.lessons.length} lessons
                        </div>
                      </div>
                    </summary>
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {part.lessons.map((lesson) => {
                        const route = LESSON_ROUTES[lesson.num];
                        const inner = (
                          <>
                            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{lesson.num}</span>
                            <span className="flex-1">{lesson.title}</span>
                            {route && <ChevronRight className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />}
                          </>
                        );
                        return route ? (
                          <Link
                            key={lesson.num}
                            to={route}
                            className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 py-1 transition-colors group"
                          >
                            {inner}
                          </Link>
                        ) : (
                          <div key={lesson.num} className="flex items-center gap-2 text-sm text-slate-400 py-1">
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                  </details>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <GlassCard className="mt-10 p-8 bg-gradient-to-r from-sky-50 to-slate-50 border-sky-200 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Begin?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">Start with Lesson 1 — no technical background required, just curiosity.</p>
          <Link to="/learn" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-all shadow-lg">
            <BookOpen className="w-4 h-4" /> Start Learning
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}