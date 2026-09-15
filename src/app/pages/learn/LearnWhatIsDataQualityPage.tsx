import { Link } from "react-router";
import { motion } from "motion/react";
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "../../components/ui/PageHero";
import { TEACHING } from "../../components/heroImages";

const DIMENSIONS = [
  {
    num: "1", color: "sky", name: "Completeness",
    def: "The degree to which all required data is present.",
    what: "Are all the fields that should have values actually filled in? Is the customer record missing an email address? Is the product record missing a price?",
    issues: "NULL values in required fields, missing records, partial data loads.",
    measure: "Percentage of records with all required fields populated. \"95% of customer records have complete contact information.\"",
  },
  {
    num: "2", color: "purple", name: "Accuracy",
    def: "The degree to which data correctly represents the real-world entity or event.",
    what: "Does the data reflect reality? Is the customer's address actually where they live? Is the product weight what it really weighs?",
    issues: "Typos, transposed digits, outdated information, data entry errors.",
    measure: "Percentage of records that match authoritative sources. \"87% of addresses validate against postal service database.\"",
  },
  {
    num: "3", color: "emerald", name: "Consistency",
    def: "The degree to which data is uniform across systems and over time.",
    what: "Does \"CA\" in one system mean the same as \"California\" in another? Is \"Active\" status defined the same way everywhere?",
    issues: "Different formats for the same data, conflicting values across systems, code values that mean different things in different contexts.",
    measure: "Percentage of records that match across related systems. \"Customer count in CRM matches billing 94% of the time.\"",
  },
  {
    num: "4", color: "amber", name: "Timeliness",
    def: "The degree to which data is available when needed and reflects current reality.",
    what: "Is the data fresh enough for its intended use? A stock price from yesterday is useless for trading. A customer address from last year might not reflect a move.",
    issues: "Stale data, delayed updates, data that arrives after decision deadlines.",
    measure: "Time between event occurrence and data availability. \"Sales data is available within 4 hours of transaction close.\"",
  },
  {
    num: "5", color: "rose", name: "Uniqueness",
    def: "The degree to which each entity is represented only once in the data.",
    what: "Is each customer in your database once? Or do you have \"John Smith,\" \"J. Smith,\" and \"JOHN SMITH\" as three separate records?",
    issues: "Duplicate records, near-duplicates, the same entity with different IDs in different systems.",
    measure: "Percentage of records that are unique. \"Estimated duplicate rate in customer database is 8%.\"",
  },
];

const COST_ITEMS = [
  { icon: "💰", title: "Financial Impact", body: "IBM estimates poor data quality costs the US economy $3.1 trillion annually. Individual organizations report 15–25% of revenue impacted by data quality issues." },
  { icon: "⏱️", title: "Productivity Loss", body: "Knowledge workers spend 50% of their time hunting for data, finding and correcting errors, and seeking confirmation of data they don't trust." },
  { icon: "📊", title: "Decision Risk", body: "Decisions based on bad data are bad decisions. Campaigns target wrong customers. Forecasts miss the mark. Opportunities are missed." },
  { icon: "⚖️", title: "Compliance Risk", body: "Regulatory reporting with bad data leads to fines, restatements, and reputational damage." },
];

const dimColors: Record<string, { bg: string; border: string; numBg: string; numText: string; heading: string }> = {
  sky:     { bg: "bg-sky-50",     border: "border-sky-200",     numBg: "bg-sky-100",     numText: "text-sky-700",     heading: "text-sky-800" },
  purple:  { bg: "bg-violet-50",  border: "border-violet-200",  numBg: "bg-violet-100",  numText: "text-violet-700",  heading: "text-violet-800" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", numBg: "bg-emerald-100", numText: "text-emerald-700", heading: "text-emerald-800" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-200",   numBg: "bg-amber-100",   numText: "text-amber-700",   heading: "text-amber-800" },
  rose:    { bg: "bg-rose-50",    border: "border-rose-200",    numBg: "bg-rose-100",    numText: "text-rose-700",    heading: "text-rose-800" },
};

export function LearnWhatIsDataQualityPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PageHero
        title="What is Data Quality?"
        subtitle="The Six Dimensions of Trust — understanding completeness, accuracy, consistency, and more"
        badge="Part 3 — Lesson 17: Data Quality"
        image={TEACHING.modernClassroom}
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
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Definition */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Defining Data Quality</h2>
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8 mb-6">
              <p className="text-lg text-sky-900 italic">
                <strong className="text-slate-900 not-italic">Data Quality</strong> is the degree to which data meets the requirements of its intended use. Quality isn't absolute — it's defined by context and purpose.
              </p>
            </div>
            <p>A phone number might be "high quality" for sending marketing texts but "low quality" for verifying identity. An address might be perfect for shipping packages but incomplete for tax jurisdiction purposes. <strong className="text-slate-900">Quality is always relative to use.</strong></p>
          </div>

          {/* Five Dimensions */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Five Dimensions of Data Quality</h2>
            <div className="space-y-6">
              {DIMENSIONS.map((d) => {
                const c = dimColors[d.color];
                return (
                  <motion.div
                    key={d.name}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`${c.bg} border ${c.border} rounded-2xl p-6`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${c.numBg} flex items-center justify-center text-lg font-bold ${c.numText}`}>
                        {d.num}
                      </div>
                      <h3 className={`text-xl font-bold ${c.heading}`}>{d.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-900 font-semibold mb-1">Definition</p>
                        <p className="text-slate-700">{d.def}</p>
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold mb-1">What it means</p>
                        <p className="text-slate-700">{d.what}</p>
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold mb-1">Example issues</p>
                        <p className="text-slate-700">{d.issues}</p>
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold mb-1">Measurement</p>
                        <p className="text-slate-700">{d.measure}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Cost of Poor Quality */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Cost of Poor Data Quality</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COST_ITEMS.map((c) => (
                <div key={c.title} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h4 className="text-slate-900 font-bold mb-2">{c.title}</h4>
                  <p className="text-sm">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Building Quality Culture */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Building a Quality Culture</h2>
            <p>Data quality isn't just a technical problem — it's a cultural one. Organizations with high data quality share common traits:</p>
            <div className="mt-6 space-y-3">
              {[
                { label: "Ownership is clear.", body: "Someone is accountable for each data domain's quality." },
                { label: "Quality is measured.", body: "You can't improve what you don't measure. Scorecards track progress." },
                { label: "Issues are visible.", body: "Problems are surfaced, not hidden. There's no penalty for finding issues." },
                { label: "Root causes are addressed.", body: "Fixing symptoms isn't enough. Why did the issue occur?" },
                { label: "Quality is everyone's job.", body: "From data entry to the C-suite, everyone understands their role." },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div><strong className="text-slate-900">{item.label}</strong> <span className="text-sm">{item.body}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Aurix Insight */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-sky-600" />
              <h3 className="text-lg font-bold text-sky-800">How Aurix Helps: 770+ Pre-Built Quality Rules</h3>
            </div>
            <p className="text-sky-900">Aurix Prism comes with 770+ pre-built data quality rules covering all five dimensions. These rules are based on industry best practices and can be deployed immediately — no configuration required. For each dimension, Prism provides automated profiling, real-time monitoring, and self-healing remediation where appropriate. The Clarity™ engine ensures every quality issue is explained in terms business users understand.</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="container mx-auto px-6 max-w-4xl mt-16 flex flex-col sm:flex-row gap-4 justify-between">
          <Link to="/learn/what-is-data-governance" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:border-sky-300 transition-all text-sm shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Lesson 6: Data Governance
          </Link>
          <Link to="/learn" className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-sm transition-all">
            Back to Curriculum <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-slate-200 bg-gradient-to-br from-sky-50 via-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">See Data Quality Monitoring in Action</h2>
          <p className="text-slate-600 mb-8">Ready to measure and improve your data quality across all five dimensions?</p>
          <Link to="/demo" className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-sky-500/20">
            Request Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}