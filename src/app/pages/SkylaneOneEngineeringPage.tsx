import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { ArrowRight, Box, GitBranch, Sparkles, Shield, Zap, Terminal } from "lucide-react";
import { Link } from "react-router";
import { MOUNTAIN } from "../components/heroImages";
import { Button } from "../components/ui/button";

const FEATURES = [
  { icon: Box, title: "AI-Native Workspace", desc: "Every pane, terminal, and editor surface is augmented by models that understand your codebase, your intent, and your constraints." },
  { icon: GitBranch, title: "Agentic Execution", desc: "Spawning, orchestrating, and supervising AI agents is a first-class citizen — not a plugin afterthought." },
  { icon: Sparkles, title: "Context-Aware Completions", desc: "Suggestions drawn from your full repo history, open issues, and documentation — not just the file under cursor." },
  { icon: Shield, title: "Self-Healing Pipelines", desc: "When a build or test fails, Skylane.One proposes and applies the fix, then logs the reasoning for every change." },
  { icon: Zap, title: "Low-Latency Local Models", desc: "Run inference on your hardware for private, sub-second completions — cloud models available when you need scale." },
  { icon: Terminal, title: "Unified Dev Console", desc: "Code, terminal, database, and deployment — one keyboard-centric surface, one pane of glass." },
];

export function SkylaneOneEngineeringPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Skylane.One Engineering"
        subtitle="AI-native enterprise IDE — build with agents, not just assistants."
        image={MOUNTAIN.summitSunriseClimber}
      />
      <div className="container mx-auto px-6 py-16 space-y-10">
        <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
          <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">© Aurix AI Solutions</p>
          <p className="text-slate-600 leading-relaxed">
            Skylane.One Engineering is the AI-native IDE built for teams shipping critical software.
            It combines local-model low latency, agentic execution, and self-healing pipelines into a
            single keyboard-centric workspace — so your engineers spend time building, not babysitting.
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
            <a href="https://skylane.one" target="_blank" rel="noopener noreferrer">
              Visit Skylane.One <ArrowRight className="ml-2 w-4 h-4" />
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
