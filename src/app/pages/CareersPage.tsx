import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/button";
import { Briefcase, Globe, Infinity, HeartPulse, Users, ArrowRight, Sparkles } from "lucide-react";
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

const BENEFITS = [
  { icon: Globe,      label: "Remote First",  sub: "Company" },
  { icon: Sparkles,   label: "Equity",        sub: "For Everyone" },
  { icon: Infinity,   label: "Unlimited",     sub: "PTO Policy" },
  { icon: HeartPulse, label: "100%",          sub: "Health Coverage" },
];

const VALUES = [
  { title: "Move with Purpose", body: "We ship fast but deliberately. Every line of code, every product decision serves a mission: making AI trustworthy." },
  { title: "Radical Transparency", body: "We share context liberally. No hidden agendas, no information silos. If you can make a better decision with more context, you'll have it." },
  { title: "Human-Centric by Default", body: "Our products put humans in command of AI. That same philosophy applies to how we work — empowering people, not replacing them." },
  { title: "Own the Outcome", body: "Small teams with big accountability. You'll see the real impact of your work and carry genuine responsibility for its success." },
];

const OPEN_ROLES = [
  { title: "Senior ML Engineer — Hallucination Mitigation",      dept: "Engineering",   location: "Remote" },
  { title: "Staff Security Researcher — PHANTOM Platform",        dept: "Security",      location: "Remote / US" },
  { title: "Product Manager — Aurix Prism",                       dept: "Product",       location: "Remote" },
  { title: "Enterprise Solutions Engineer — Financial Services",  dept: "GTM",           location: "Remote / NYC" },
  { title: "Staff Data Engineer — PEN Platform",                  dept: "Engineering",   location: "Remote" },
  { title: "AI Governance Specialist",                            dept: "Research",      location: "Remote" },
];

export function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PageHero
        title="Careers at Aurix"
        subtitle="Help us build the Human Interface™ for artificial intelligence. We're looking for passionate people who want to make AI transparent, trustworthy, and transformational."
        badge="🚀 Join Us"
        image={MOUNTAIN.winterMassif}
        button={
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                const el = document.getElementById("openings");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <Button size="lg" className="rounded-full bg-sky-600 hover:bg-sky-700 text-white border-0">
                View Open Positions <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </button>
            <Link to="/about">
              <Button variant="glass" size="lg" className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-100">
                Our Story
              </Button>
            </Link>
          </div>
        }
      />

      <div className="container mx-auto px-6 max-w-6xl py-16 space-y-10">

        {/* Benefits strip */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50/80 border border-sky-100/60 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <b.icon className="w-6 h-6 text-sky-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{b.label}</p>
                <p className="text-slate-500 text-sm">{b.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Aurix */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Why Aurix</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Small team. Massive mission. Real ownership over work that matters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              >
                <div className="p-6 h-full bg-white/60 border border-white/40 rounded-2xl shadow-sm hover:border-sky-300 hover:shadow-md transition-all backdrop-blur-sm">
                  <h3 className="text-slate-900 font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open positions */}
        <div className="p-8 md:p-10 text-white" style={GLASS_DARK} id="openings">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Open Positions</h2>
            <p className="text-slate-300 text-lg">We hire for curiosity, craft, and character.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {OPEN_ROLES.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }} viewport={{ once: true }}
              >
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 group transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Briefcase className="w-5 h-5 text-sky-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold group-hover:text-sky-300 transition-colors">{role.title}</h3>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {role.dept}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Globe className="w-3 h-3" /> {role.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link to="/contact">
                      <button className="px-4 py-2 border border-sky-400/40 text-sky-300 hover:bg-sky-500/20 rounded-lg text-sm font-medium transition-all flex-shrink-0">
                        Apply
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* No role CTA */}
        <div className="p-8 md:p-12 text-center" style={GLASS_LIGHT}>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Don't See Your Role?</h2>
          <p className="text-slate-600 mb-8">We grow with exceptional people. Tell us how you'd contribute and we'll find a place for you.</p>
          <Link to="/contact">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all">
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}