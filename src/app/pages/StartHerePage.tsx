import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { HelpCircle, Users, Globe, FileText, CheckCircle2, ArrowRight, Send, Loader2, CheckSquare, Square } from "lucide-react";
import { submitForm } from "../../lib/forms";
import { TEACHING } from "../components/heroImages";

const AUDIENCES = [
  { icon: <Users className="w-6 h-6" />, title: "Executives", desc: "CEOs, CFOs, COOs who need the big picture without the technical weeds", color: "bg-sky-100 text-sky-600" },
  { icon: <Globe className="w-6 h-6" />, title: "Board Members", desc: "Directors and trustees responsible for governance and fiduciary duty", color: "bg-violet-100 text-violet-600" },
  { icon: <FileText className="w-6 h-6" />, title: "Future Stewards", desc: "Those who will champion data quality and governance in your organization", color: "bg-amber-100 text-amber-600" },
  { icon: <HelpCircle className="w-6 h-6" />, title: "The Curious", desc: "Anyone who wants to understand this world better — no prerequisites required", color: "bg-emerald-100 text-emerald-600" },
];

const TIMELINE = [
  { era: "The 1990s", title: "The Paper Era", desc: "Most business data lived in filing cabinets. 'Data security' meant locking the office door. Organizations had hundreds of records, not millions.", icon: "📄" },
  { era: "The 2000s", title: "The Digital Explosion", desc: "Everything went digital. Databases replaced filing cabinets. Suddenly organizations had millions of records sitting on servers accessible from anywhere.", icon: "💻" },
  { era: "The 2010s", title: "The Breach Awakening", desc: "Target. Equifax. Yahoo. GDPR created real consequences — fines up to 4% of revenue. Organizations realized: this isn't just an IT problem.", icon: "⚠️" },
  { era: "Today", title: "The AI Revolution", desc: "AI can now do what armies of consultants once did — faster, cheaper, 24/7. Governance, explainability, and data quality are now boardroom conversations.", icon: "🚀" },
];

const PROBLEMS = [
  { num: 1, icon: "📊", color: "border-amber-200 bg-amber-50", title: "Your Data Is a Mess", body: "Customer 'John Smith' appears 47 different ways. When reports come out, nobody trusts them. Bad data costs organizations $12.9 million per year in wasted effort and wrong decisions." },
  { num: 2, icon: "🛡️", color: "border-rose-200 bg-rose-50", title: "Bad Actors Want Your Data", body: "Cybercriminals operate like businesses now. They're scanning your systems right now. The average breach costs $4.45 million. For healthcare, it's $10.93 million." },
  { num: 3, icon: "📋", color: "border-blue-200 bg-blue-50", title: "Regulations Are Multiplying", body: "HIPAA, GDPR, CCPA, SOX, PCI-DSS, CMMC... the alphabet soup grows every year. GDPR fines can reach 4% of global revenue. Regulators are getting aggressive." },
  { num: 4, icon: "🤖", color: "border-violet-200 bg-violet-50", title: "AI Is Everywhere — Ungoverned", body: "Employees use ChatGPT with company data. Vendors embed AI in products. You have 'Shadow AI' everywhere. When AI makes a decision, can you explain why?" },
];

const HOW_IT_WORKS = [
  { step: 1, title: "You Talk", desc: "Type in plain English. No coding required." },
  { step: 2, title: "It Watches", desc: "24/7 monitoring while you sleep." },
  { step: 3, title: "It Fixes", desc: "Auto-resolves issues. Escalates the rest." },
  { step: 4, title: "It Explains", desc: "Every action in plain English." },
];

const INTERESTS = [
  "Data Governance & Quality",
  "AI Explainability (XAI)",
  "Agentic Frameworks (SWARM)",
  "Compliance & Regulatory",
  "Cybersecurity / PEN Testing",
  "Marketing Intelligence",
  "ORBIT Suite Platform",
  "Competitive Comparison",
  "Pricing & ROI",
  "Technical Integration",
  "Executive Briefing",
  "Custom Demo",
];

const ROLES = [
  "CEO / COO / President",
  "CTO / CIO / CISO",
  "CFO / Finance Leader",
  "Board Member / Trustee",
  "VP / Director of Data",
  "Data Engineer / Architect",
  "Compliance Officer",
  "Product Manager",
  "Other",
];

function StartHereForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", role: "", interests: [] as string[] });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);

  const toggle = (interest: string) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter(i => i !== interest)
        : [...f.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    if (!consentPrivacy) {
      setErrorMsg("Please agree to the Privacy Policy to continue.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const result = await submitForm({ ...form, consentMarketing, consentPrivacy, subject: "Start Here Submission" });
      if (!result.success) throw new Error(result.message || "Submission failed");
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">You're on our radar!</h3>
        <p className="text-slate-600 max-w-md mx-auto">We'll be in touch within one business day. In the meantime, explore the ORBIT Suite documentation.</p>
        <Link to="/solutions" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-all">
          Explore ORBIT Suite <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
          <input
            type="text" required value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Jane Smith"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company</label>
          <input
            type="text" value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            placeholder="Acme Corp"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Work Email <span className="text-red-400">*</span></label>
          <input
            type="email" required value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="jane@company.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Role</label>
          <select
            value={form.role}
            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm"
          >
            <option value="">Select your role...</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">What are you most interested in? <span className="text-slate-400 font-normal">(select all that apply)</span></label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INTERESTS.map(interest => {
            const checked = form.interests.includes(interest);
            return (
              <button
                type="button"
                key={interest}
                onClick={() => toggle(interest)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                  checked
                    ? "border-sky-400 bg-sky-50 text-sky-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50/50"
                }`}
              >
                <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                  checked ? "bg-sky-500 border-sky-500" : "border-slate-300"
                }`}>
                  {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{errorMsg}</div>
      )}

      {/* Consent checkboxes */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setConsentMarketing(v => !v)}
          className="flex items-start gap-3 w-full text-left group"
        >
          <span className="mt-0.5 flex-shrink-0">
            {consentMarketing
              ? <CheckSquare className="w-5 h-5 text-sky-600" />
              : <Square className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" />}
          </span>
          <span className="text-sm text-slate-600 leading-relaxed">
            Yes, I would like to receive emails from Aurix AI with news, product updates, event information and more.
          </span>
        </button>
        <button
          type="button"
          onClick={() => setConsentPrivacy(v => !v)}
          className="flex items-start gap-3 w-full text-left group"
        >
          <span className="mt-0.5 flex-shrink-0">
            {consentPrivacy
              ? <CheckSquare className="w-5 h-5 text-sky-600" />
              : <Square className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" />}
          </span>
          <span className="text-sm text-slate-600 leading-relaxed">
            By checking this box I agree that Aurix AI collects and processes my personal data in accordance with the{" "}
            <span className="text-sky-600 underline underline-offset-2">Aurix AI Privacy Policy</span>.{" "}
            <span className="text-red-500 font-medium">*</span>
          </span>
        </button>
        {!consentPrivacy && (
          <p className="text-xs text-slate-400 pl-8">Privacy Policy agreement is required to submit.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading" || !form.name || !form.email || !consentPrivacy}
        className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all shadow-sm shadow-sky-500/20 text-sm"
      >
        {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send My Inquiry</>}
      </button>
      <p className="text-xs text-slate-400">We'll respond within 1 business day. No spam, ever.</p>
    </form>
  );
}

export function StartHerePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        badge="Resources · Start Here"
        title="Sometimes You Don't Know What You Don't Know"
        subtitle="And that's perfectly okay — this page is for decision makers, board members, and curious minds who want to understand what we actually do."
        image={TEACHING.teamLearning}
      />

      <div className="container mx-auto px-6 py-16 space-y-12">

        {/* Who this is for */}
        <section id="audience">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
            <div className="text-center mb-6">
              <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-2">Who This Is For</p>
              <h2 className="text-2xl font-bold text-slate-900">This Page Was Written For You</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {AUDIENCES.map((a, i) => (
                <motion.div key={a.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="p-4 border border-slate-200 rounded-xl bg-slate-50 text-center">
                  <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center mx-auto mb-3`}>{a.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{a.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Timeline */}
        <section id="timeline">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">How We Got Here</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Data Revolution in 30 Years</h2>
            <div className="space-y-4">
              {TIMELINE.map((t, i) => (
                <motion.div key={t.era} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <span className="text-3xl flex-shrink-0">{t.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-0.5">{t.era}</div>
                    <h3 className="font-bold text-slate-900 mb-1">{t.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Problems */}
        <section id="problems">
          <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">The Problems We Solve</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Four Challenges Every Organization Faces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PROBLEMS.map((p) => (
                <div key={p.num} className={`p-5 border ${p.color} rounded-xl`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{p.icon}</span>
                    <h3 className="font-bold text-slate-900">{p.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* How it works */}
        <section id="how">
          <div className="bg-gradient-to-br from-sky-900 to-slate-800 rounded-2xl p-8 text-white">
            <p className="text-sky-300 font-semibold tracking-widest uppercase text-xs mb-3">How It Works</p>
            <h2 className="text-2xl font-bold mb-6">Four Steps, Plain English</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {HOW_IT_WORKS.map((h) => (
                <div key={h.step} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">{h.step}</div>
                  <h3 className="font-bold text-white mb-1">{h.title}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact">
          <GlassCard className="p-8 bg-white border-slate-200 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-2">Get In Touch</p>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">See Aurix in Action</h2>
                <p className="text-slate-500 leading-relaxed">
                  Tell us a little about yourself and what you're exploring. A real human being will reach out — not an AI bot. We'll tailor the conversation to your specific situation and goals.
                </p>
              </div>
              <StartHereForm />
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}