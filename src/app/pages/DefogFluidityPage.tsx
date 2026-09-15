import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { ArrowRight, Shield, Eye, Lock, Activity, BrainCircuit, FileText } from "lucide-react";
import { Link } from "react-router";
import { MOUNTAIN } from "../components/heroImages";
import { Button } from "../components/ui/button";

const FEATURES = [
  { icon: Eye, title: "See Through It", desc: "Fluidity makes every network decision transparent. Watch in real time how and why your personal firewall routes, blocks, or allows each packet." },
  { icon: Shield, title: "Personal Firewall", desc: "A hardened, consumer-grade firewall that sits between you and the internet — no enterprise complexity, no management overhead." },
  { icon: Lock, title: "Zero-Knowledge Policies", desc: "Your rules are encrypted client-side. Even Fluidity's operators cannot inspect your policy decisions." },
  { icon: Activity, title: "Live Threat Pulse", desc: "A real-time dashboard of threats blocked, attacks thwarted, and suspicious patterns detected on your connection." },
  { icon: BrainCircuit, title: "Adaptive Learning", desc: "Fluidity learns your habits and quiet-flags benign traffic, reducing alert fatigue without lowering guardrails." },
  { icon: FileText, title: "Plain-English Reports", desc: "Every incident arrives as a narrative report — no SIEM expertise required to understand what happened." },
];

export function DefogFluidityPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Defog Fluidity"
        subtitle="Personal Firewall — see through it."
        image={MOUNTAIN.alpinePeakCerulean}
      />
      <div className="container mx-auto px-6 py-16 space-y-10">
        <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
          <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">Built by Aurix AI Solutions</p>
          <p className="text-slate-600 leading-relaxed">
            Fluidity is the personal firewall that respects your autonomy. It blocks what should be blocked,
            explains everything it does, and leaves your data in your hands. Install it on any device and
            breathe easier — your network edge just became legible.
          </p>
        </GlassCard>
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <GlassCard key={f.title} className="p-5 bg-white border-slate-200 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-sky-100 p-2 rounded-lg text-sky-600"><f.icon className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-900">{f.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <a href="https://defog.net" target="_blank" rel="noopener noreferrer">
              Visit Defog <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Link to="/contact">
            <Button variant="glass" size="lg" className="rounded-full px-8">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
