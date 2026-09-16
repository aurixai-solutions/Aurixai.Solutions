import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { PageHero } from "../components/ui/PageHero";
import { ArrowRight, Loader2 } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { ShieldCheck, BarChart3, BrainCircuit, Database, Lock, Globe } from "lucide-react";
import localContent from "../../data/localContent";
import { MOUNTAIN } from "../components/heroImages";

const ICON_MAP: Record<string, any> = {
  "Database": Database,
  "ShieldCheck": ShieldCheck,
  "BarChart3": BarChart3,
  "BrainCircuit": BrainCircuit,
  "Lock": Lock,
  "Globe": Globe,
};

const PRODUCTS = [
  {
    title: "NavTrax",
    desc: "Offline-first expedition navigation — sovereign route intelligence for the wild.",
    path: "/solutions/navtrax",
    image: MOUNTAIN.alpinePeakCerulean,
  },
  {
    title: "Defog Fluidity",
    desc: "Personal firewall — see through it. Transparent network protection.",
    path: "/solutions/defog-fluidity",
    image: MOUNTAIN.iceClimbingFrozenWaterfall,
  },
  {
    title: "Defog Shield",
    desc: "Enterprise governance — the enterprise version of Defog Fluidity.",
    path: "/solutions/defog-shield",
    image: MOUNTAIN.snowCoveredRidge,
  },
  {
    title: "Skylane.One",
    desc: "AI-native enterprise IDE — build with agents, not just assistants.",
    path: "/solutions/skylane-one",
    image: MOUNTAIN.summitSunriseClimber,
  },
];

const SOLUTION_LOGOS = [
  { src: "/solutions/logo-1.png", alt: "Solution Platform 1" },
  { src: "/solutions/logo-2.png", alt: "Solution Platform 2" },
  { src: "/solutions/logo-3.png", alt: "Solution Platform 3" },
];

export function Solutions() {
  return (
    <div className="bg-slate-50 min-h-screen relative">
      <PageHero 
        title="Our Solutions" 
        subtitle="Transforming enterprise challenges into competitive advantages with transparent AI."
        image={MOUNTAIN.steepCliffSnow}
      />

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Triple Shield Overview */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Intelligence without Compromise
          </h2>
          <p className="text-lg text-slate-600">
            We deliver enterprise-grade AI solutions that respect your data privacy and security protocols.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PRODUCTS.map((product) => (
            <Link key={product.title} to={product.path}>
              <GlassCard variant="light" className="overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-slate-200 bg-white cursor-pointer h-full flex flex-col">
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-sky-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">{product.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed flex-grow">
                    {product.desc}
                  </p>
                  <span className="text-sky-600 text-sm font-medium group-hover:text-sky-700 flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        {/* Solution Logos - 3 in a row, responsive */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-[1024px] mx-auto">
          {SOLUTION_LOGOS.map((logo, idx) => (
            <div key={idx} className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
