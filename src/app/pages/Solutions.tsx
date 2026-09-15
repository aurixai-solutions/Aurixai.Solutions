import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { PageHero } from "../components/ui/PageHero";
import { ArrowRight, Loader2 } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { AurixCompetitiveAnalysis } from "../components/AurixCompetitiveAnalysis";
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

// Use local content as the initial state/default if available
// @ts-ignore
const STATIC_SERVICES = localContent?.services?.length > 0 ? localContent.services : [
  {
    id: "data-governance",
    title: "Enterprise Data Governance",
    iconName: "Database",
    desc: "Our governance framework ensures your data is accurate, accessible, and secure. We implement rigorous standards that turn raw data into a strategic asset while maintaining full compliance with global regulations.",
    features: ["Policy Management", "Data Lineage Tracking", "Access Control Audits", "GDPR/CCPA Compliance"],
    image: MOUNTAIN.verticalRockFaceClimber
  },
  {
    id: "data-quality",
    title: "Data Quality Assurance",
    iconName: "ShieldCheck",
    desc: "Bad data leads to bad decisions. Aurix uses advanced algorithms to cleanse, deduplicate, and enrich your datasets, ensuring high-fidelity inputs for your AI models and analytics.",
    features: ["Automated Cleansing", "Deduplication", "Real-time Monitoring", "Quality Scorecards"],
    image: MOUNTAIN.snowCoveredRidge
  },
  {
    id: "marketing-intel",
    title: "Marketing Intelligence",
    iconName: "BarChart3",
    desc: "Unlock the power of your customer data. We provide deep insights into market trends, customer behavior, and campaign performance, enabling data-driven marketing strategies.",
    features: ["Customer Segmentation", "Trend Forecasting", "Campaign Attribution", "Sentiment Analysis"],
    image: MOUNTAIN.mountaineeringGlacier
  },
  {
    id: "agentic-frameworks",
    title: "Agentic Frameworks",
    iconName: "BrainCircuit",
    desc: "Deploy autonomous AI agents that can plan, execute, and iterate on complex tasks. Our frameworks are built with safety rails to ensure agents act within defined boundaries.",
    features: ["Task Automation", "Multi-Agent Orchestration", "Human-in-the-loop", "Safety Guardrails"],
    image: MOUNTAIN.jaggedPeaksClouds
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & PEN Testing",
    iconName: "Lock",
    desc: "Proactive defense strategies for your digital infrastructure. We conduct rigorous penetration testing and vulnerability assessments to identify and neutralize threats before they can be exploited.",
    features: ["Vulnerability Assessment", "Penetration Testing", "Security Audits", "Incident Response Planning"],
    image: MOUNTAIN.glacierCrevassBlueIce
  },
  {
    id: "industries",
    title: "Comprehensive Industries & Regulations",
    iconName: "Globe",
    desc: "Tailored solutions for highly regulated sectors including Finance, Healthcare, and Government. We ensure your AI initiatives align perfectly with industry-specific compliance requirements.",
    features: ["HIPAA Compliance", "Financial Regulations", "Government Standards", "Cross-Border Data Flow"],
    image: MOUNTAIN.summitSunriseClimber
  }
];

export function Solutions() {
  const [services, setServices] = useState<any[]>(STATIC_SERVICES);
  const [loading, setLoading] = useState(false); // Default to false since we have static content

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/content.json');
        if (!res.ok) throw new Error("Content not found");
        const data = await res.json();
        
        if (data && data.services) {
          setServices(data.services);
        }
      } catch (e) {
        console.warn("Content fetch failed, using bundled fallback.", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <PageHero 
        title="Our Solutions" 
        subtitle="Transforming enterprise challenges into competitive advantages with transparent AI."
        image={MOUNTAIN.steepCliffSnow}
      />

      <div className="container mx-auto px-6 py-24 relative z-10">
        {loading && services.length === 0 ? (
           <div className="flex justify-center py-12">
             <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
           </div>
        ) : (
          <>
            {/* Kept Products Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { title: "NavTrax", desc: "Offline-first expedition navigation — sovereign route intelligence for the wild.", href: "/solutions/navtrax", icon: Globe },
                { title: "Defog Fluidity", desc: "Personal firewall that makes every network decision transparent and explainable.", href: "/solutions/defog-fluidity", icon: ShieldCheck },
                { title: "Defog Shield", desc: "Enterprise governance, fleet policy enforcement, and immutable audit trails.", href: "/solutions/defog-shield", icon: Lock },
                { title: "Skylane.One", desc: "AI-native enterprise IDE with agentic execution and self-healing pipelines.", href: "/solutions/skylane-one", icon: BrainCircuit },
              ].map((card) => {
                const I = card.icon;
                return (
                  <Link key={card.title} to={card.href}>
                    <GlassCard className="p-6 bg-white border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-sky-100 p-2 rounded-lg text-sky-600"><I className="w-5 h-5" /></div>
                        <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
                      <div className="mt-4 text-sky-600 text-sm font-medium flex items-center gap-1">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>

            <div className="mb-24">
              <AurixCompetitiveAnalysis />
            </div>
            <div className="space-y-24">
            {services.map((service, idx) => {
              const Icon = ICON_MAP[service.iconName] || Database;
              
              return (
                <div key={service.id || idx} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="inline-block p-3 rounded-2xl bg-sky-100 text-sky-600 mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <Link to={`/solutions/${service.id}`} className="hover:underline text-slate-900">
                      <h2 className="text-3xl font-bold mb-6">{service.title}</h2>
                    </Link>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                      {service.desc}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features?.map((feature: string, fIdx: number) => (
                        <GlassCard key={fIdx} className="p-4 flex items-center gap-3 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-2 h-2 rounded-full bg-sky-500" />
                          <span className="text-slate-700 font-medium">{feature}</span>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 relative h-full min-h-[400px]">
                     <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-600/10 rounded-3xl transform rotate-3" />
                     <div className="block h-full">
                        <GlassCard className="relative z-10 p-2 h-full w-full overflow-hidden border-white/50 bg-white/30 backdrop-blur-md group hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
                          <div className="relative h-full w-full rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-sky-900/10 group-hover:bg-transparent transition-colors z-10" />
                            <img 
                              src={service.image} 
                              alt={service.title} 
                              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                            />
                            
                            {/* Overlay Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                              <p className="text-white text-sm font-medium flex items-center gap-2">
                                Explore {service.title} 
                                <ArrowRight className="w-4 h-4" />
                              </p>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
          </>
        )}
      </div>
    </div>
  );
}