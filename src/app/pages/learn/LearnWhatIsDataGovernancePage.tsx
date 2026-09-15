import { Link } from "react-router";
import { motion } from "motion/react";
import { BookOpen, ArrowLeft, ArrowRight, Users, Workflow, Monitor, CheckCircle2, XCircle } from "lucide-react";
import { PageHero } from "../../components/ui/PageHero";
import { TEACHING } from "../../components/heroImages";

const PILLARS = [
  {
    icon: Users, color: "sky",
    title: "People",
    body: "Data governance requires clear roles and responsibilities. Who owns each data domain? Who makes decisions when conflicts arise? Who enforces policies? Without defined accountability, governance becomes everyone's job — which means it's nobody's job.",
  },
  {
    icon: Workflow, color: "purple",
    title: "Process",
    body: "Governance needs defined workflows. How do you request access to data? How do you report a quality issue? How do you propose a new data standard? Without processes, governance is just good intentions that never get executed.",
  },
  {
    icon: Monitor, color: "emerald",
    title: "Technology",
    body: "Governance at scale requires tools. Data catalogs, quality monitoring, lineage tracking, policy enforcement, access controls. Technology doesn't replace people and process — it enables them to work at enterprise scale.",
  },
];

const MYTHS = [
  { myth: "Data governance is an IT project.", reality: "Data governance is a business initiative that IT supports. The business defines what data matters and how it should be used. IT provides the technical capabilities to make it happen." },
  { myth: "We need to govern all our data.", reality: "Start with your most critical data. Trying to govern everything at once is a recipe for failure. Focus on high-value, high-risk data first." },
  { myth: "Data governance slows things down.", reality: "Poor data governance slows things down through rework, errors, and distrust. Good governance accelerates decision-making by ensuring data is trustworthy." },
  { myth: "We can buy a tool and be done.", reality: "Technology is only one pillar. Without people and process, even the best tools fail. Tools enable governance; they don't create it." },
];

const pillarColors: Record<string, { bg: string; border: string; iconBg: string; iconBorder: string; icon: string; heading: string }> = {
  sky:     { bg: "bg-sky-50",     border: "border-sky-200",     iconBg: "bg-sky-100",     iconBorder: "border-sky-200",     icon: "text-sky-600",     heading: "text-sky-800" },
  purple:  { bg: "bg-violet-50",  border: "border-violet-200",  iconBg: "bg-violet-100",  iconBorder: "border-violet-200",  icon: "text-violet-600",  heading: "text-violet-800" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", iconBg: "bg-emerald-100", iconBorder: "border-emerald-200", icon: "text-emerald-600", heading: "text-emerald-800" },
};

export function LearnWhatIsDataGovernancePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PageHero
        title="What is Data Governance?"
        subtitle="The Definition in Plain Language — how organisations take control of their data assets"
        badge="Part 2 — Lesson 9: Governance Essentials"
        image={TEACHING.conferenceKeynote}
      />

      {/* Lesson nav bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-3 flex items-center gap-4 max-w-4xl">
          <Link to="/learn" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Learning Center
          </Link>
          <span className="text-slate-300">/</span>
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-500"><BookOpen className="w-4 h-4" /> ~10 min read</span>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl space-y-12 text-slate-600 leading-relaxed">

          {/* Simple Definition */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Simple Definition</h2>
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8 mb-6">
              <p className="text-lg text-sky-900 italic">
                <strong className="text-slate-900 not-italic">Data Governance</strong> is the system of decision rights and accountabilities for information-related processes, executed according to agreed-upon models which describe who can take what actions with what information, when, under what circumstances, and using what methods.
              </p>
            </div>
            <p>In plain terms: data governance is about <strong className="text-slate-900">who gets to make decisions about data</strong>, <strong className="text-slate-900">what those decisions are</strong>, and <strong className="text-slate-900">how those decisions get enforced</strong>.</p>
            <p className="mt-4">Think of it like the rules of the road for your organization's data. Just as traffic laws define who can drive, what they can do, and what happens when they break the rules — data governance defines who can access data, what they can do with it, and what happens when policies are violated.</p>
          </div>

          {/* Governance vs Management */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Data Governance vs. Data Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-sky-800 mb-3">Data Governance (The "What" &amp; "Why")</h3>
                <p className="text-slate-700"><strong className="text-slate-900">Defines the rules.</strong> Who owns this data? Who can access it? What quality standards must it meet? How long do we keep it? What happens if someone violates policy?</p>
                <p className="mt-3 text-sky-700 text-sm font-semibold">→ Decision-making authority &amp; accountability</p>
              </div>
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-violet-800 mb-3">Data Management (The "How")</h3>
                <p className="text-slate-700"><strong className="text-slate-900">Implements the rules.</strong> How do we store this data? What technology do we use? How do we move data between systems? How do we back it up?</p>
                <p className="mt-3 text-violet-700 text-sm font-semibold">→ Technical execution &amp; operations</p>
              </div>
            </div>
            <p className="mt-6"><strong className="text-slate-900">The relationship:</strong> Governance sets the policies; management implements them. You can have management without governance (most organizations do), but you end up with technically sound systems that don't serve business needs.</p>
          </div>

          {/* Three Pillars */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Three Pillars of Data Governance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PILLARS.map((p, idx) => {
                const c = pillarColors[p.color];
                return (
                  <div key={p.title} className={`${c.bg} border ${c.border} rounded-2xl p-6`}>
                    <div className={`w-12 h-12 rounded-xl ${c.iconBg} border ${c.iconBorder} flex items-center justify-center mb-4`}>
                      <p.icon className={`w-6 h-6 ${c.icon}`} />
                    </div>
                    <h3 className={`text-lg font-bold ${c.heading} mb-3`}>Pillar {idx + 1}: {p.title}</h3>
                    <p className="text-slate-700 text-sm">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Common Myths */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Misconceptions Debunked</h2>
            <div className="space-y-4">
              {MYTHS.map((m) => (
                <div key={m.myth} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-red-700 font-semibold text-sm">Myth: "{m.myth}"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-emerald-800 text-sm"><strong>Reality:</strong> {m.reality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aurix Insight */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-sky-600" />
              <h3 className="text-lg font-bold text-sky-800">How Aurix Helps: The Human Interface™ Approach</h3>
            </div>
            <p className="text-sky-900">Aurix Prism was built on the principle that governance succeeds when humans stay in command. Our platform provides the technology pillar while explicitly supporting people and process. Every AI-powered automation includes clear explanations of what happened and why. Workflow tools ensure processes are followed. Role-based dashboards ensure the right people have the right visibility. Technology that enhances human judgment — not replaces it.</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="container mx-auto px-6 max-w-4xl mt-16 flex flex-col sm:flex-row gap-4 justify-between">
          <Link to="/learn/data-landscape" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:border-sky-300 transition-all text-sm shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Lesson 2: Data Landscape
          </Link>
          <Link to="/learn/what-is-data-quality" className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-sm transition-all">
            Next: What is Data Quality? <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-slate-200 bg-gradient-to-br from-sky-50 via-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Build Your Governance Foundation?</h2>
          <p className="text-slate-600 mb-8">See how Aurix Prism provides the technology pillar while supporting your people and processes.</p>
          <Link to="/demo" className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-sky-500/20">
            Request Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}