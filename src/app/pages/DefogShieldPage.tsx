import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { ArrowRight, Shield, Server, Layers, Lock, FileCheck } from "lucide-react";
import { Link } from "react-router";
import { MOUNTAIN } from "../components/heroImages";
import { Button } from "../components/ui/button";

const FEATURES = [
  { icon: Server, title: "Enterprise Governance", desc: "Fleet-wide policy enforcement, role-based administration, and immutable audit trails for every decision Shield makes." },
  { icon: Layers, title: "Inherited Policies", desc: "Fluidity's personal rules extend naturally into the enterprise. Shield wraps your teams with the same transparent logic." },
  { icon: Lock, title: "Regulatory Mapping", desc: "Map every policy control to GDPR, NIS2, HIPAA, or SOC 2 requirements — ready for the next audit." },
  { icon: Shield, title: "Network Segmentation", desc: "Zero-trust micro-segmentation for distributed teams and hybrid infrastructure, managed from a single pane." },
  { icon: FileCheck, title: "Compliance Reporting", desc: "Auto-generated board-ready reports: what's protected, what's exposed, and the remediation path for each gap." },
  { icon: Lock, title: "Serenox.One Integration", desc: "Shield layers directly onto the Serenox.One platform, unifying identity, device trust, and network policy." },
];

export function DefogShieldPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Defog Shield"
        subtitle="Enterprise Governance — the enterprise version of Defog Fluidity."
        image={MOUNTAIN.snowCoveredRidge}
      />
      <div className="container mx-auto px-6 py-16 space-y-10">
        <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
          <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">A product of Aurix AI Solutions</p>
          <p className="text-slate-600 leading-relaxed">
            Defog Shield extends Fluidity's transparent personal-fortress model into the enterprise.
            Fleet management, regulatory mapping, immutable audit trails, and zero-trust segmentation —
            all unified under the same philosophy: every decision must be explainable, and all data stays yours.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Defog Shield is currently under active development.
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
        <div className="text-center">
          <GlassCard className="p-6 bg-slate-900 text-white border-slate-700">
            <p className="text-slate-300 mb-4">Defog Shield integrates with the Serenox.One platform.</p>
            <Link to="/contact">
              <Button className="rounded-full px-8">Contact Us for Early Access</Button>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
