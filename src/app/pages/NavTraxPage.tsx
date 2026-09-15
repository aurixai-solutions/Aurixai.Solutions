import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { ArrowRight, Download, Shield, Radar, Compass, Activity } from "lucide-react";
import { Link } from "react-router";
import { MOUNTAIN } from "../components/heroImages";
import { Button } from "../components/ui/button";

const FEATURES = [
  { icon: Radar, title: "Offline-First Navigation", desc: "Full route computation runs on-device. No connectivity? No problem — your expedition plan is always available." },
  { icon: Compass, title: "Multi-Modal Routing", desc: "Hike, drive, boat, or mixed-mode. NavTrax computes optimal paths across terrain and transport layers simultaneously." },
  { icon: Shield, title: "Sovereign Path Data", desc: "Route intelligence owned by you. No third-party telemetry, no cloud dependency, no data resale." },
  { icon: Activity, title: "Real-Time Hazard Layer", desc: "Live weather, trail, and hazard overlays sourced from community-verified signals and satellite feeds." },
  { icon: Download, title: "Lightweight Bundle", desc: "Full region maps under 50 MB. Install once, navigate everywhere — even in low-bandwidth environments." },
  { icon: Activity, title: "Expedition Logging", desc: "Automatic waypoint tracking with ETA, battery-aware planning, and emergency checkpoint alerts." },
];

export function NavTraxPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="NavTrax"
        subtitle="Offline-First Expedition Navigation — sovereign route intelligence for the wild."
        image={MOUNTAIN.himalayanPeaksDramatic}
      />
      <div className="container mx-auto px-6 py-16 space-y-10">
        <GlassCard className="p-6 bg-white border-slate-200 shadow-lg">
          <p className="text-sky-600 font-semibold tracking-widest uppercase text-xs mb-3">A product of Aurix AI Solutions</p>
          <p className="text-slate-600 leading-relaxed">
            NavTrax computes complete expedition routes entirely on-device. No cloud round-trips, no data harvesting,
            no dead-reckoning when you lose signal. Your route data stays yours — every waypoint, every contour,
            every alternative is computed and stored locally with full provenance.
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
            <a href="https://navtrax.world" target="_blank" rel="noopener noreferrer">
              Visit NavTrax <ArrowRight className="ml-2 w-4 h-4" />
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
