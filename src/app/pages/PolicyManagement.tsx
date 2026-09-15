import React from "react";
import { motion } from "motion/react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { ShieldCheck, FileText, Lock, Quote, BarChart, TrendingUp, ArrowRight } from "lucide-react";
import { MOUNTAIN } from "../components/heroImages";

export function PolicyManagement() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden">
      
      <PageHero 
        title="Policy Management" 
        subtitle="Comprehensive governance frameworks designed to ensure regulatory adherence and operational transparency."
        image={MOUNTAIN.winterPanorama}
        breadcrumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: "Data Governance", href: "/solutions" },
          { label: "Policy Management" }
        ]}
      />

      {/* Background Effect for Content Area */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[60vh] right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute top-[80vh] left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Floating Content (Facts & Figures) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-32 h-fit"
          >
             {/* Fact Card 1 */}
             <GlassCard variant="light" className="p-6 border-l-4 border-l-sky-500 bg-white hover:bg-white backdrop-blur-md transform hover:-translate-x-2 transition-transform duration-300">
               <div className="flex items-center gap-3 mb-3 text-sky-600">
                 <BarChart className="w-5 h-5" />
                 <span className="text-xs font-bold uppercase tracking-wider">Efficiency</span>
               </div>
               <p className="text-3xl font-bold text-slate-900 mb-1">40%</p>
               <p className="text-sm text-slate-500">Reduction in compliance overhead with automated policy enforcement.</p>
             </GlassCard>

             {/* Quote Card */}
             <GlassCard variant="light" className="p-6 bg-white hover:bg-white backdrop-blur-md transform hover:-translate-x-2 transition-transform duration-300 delay-100">
               <Quote className="w-8 h-8 text-sky-400/50 mb-4" />
               <p className="text-slate-600 italic text-sm mb-4 leading-relaxed">
                 "Transparency isn't just a buzzword; it's the operational backbone of the next generation of enterprise AI."
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600" />
                 <div>
                   <p className="text-xs font-bold text-slate-900">Sarah Jenkins</p>
                   <p className="text-[10px] text-slate-500">Chief Compliance Officer</p>
                 </div>
               </div>
             </GlassCard>

             {/* Fact Card 2 */}
             <GlassCard variant="light" className="p-6 border-l-4 border-l-green-500 bg-white hover:bg-white backdrop-blur-md transform hover:-translate-x-2 transition-transform duration-300 delay-200">
               <div className="flex items-center gap-3 mb-3 text-green-600">
                 <TrendingUp className="w-5 h-5" />
                 <span className="text-xs font-bold uppercase tracking-wider">Risk Mitigation</span>
               </div>
               <p className="text-3xl font-bold text-slate-900 mb-1">99.9%</p>
               <p className="text-sm text-slate-500">Uptime in policy adherence monitoring across distributed systems.</p>
             </GlassCard>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-8"
          >
            <GlassCard variant="light" className="p-8 md:p-12 border-slate-200 bg-white hover:bg-white backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                <FileText className="w-10 h-10 text-sky-500" />
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Digital Transparency Act</h2>
                  <p className="text-slate-400 text-sm mt-1">Version 2.4 • Effective Date: February 16, 2026</p>
                </div>
              </div>

              <div className="space-y-8 text-slate-600 leading-relaxed text-lg font-light">
                <div>
                  <h3 className="text-xl font-semibold text-sky-700 mb-3">1. Executive Summary</h3>
                  <p>
                    This document outlines the mandatory protocols for all autonomous agentic systems operating within the Aurix ecosystem. It mandates absolute traceability of decision-making pathways and enforces a "human-in-the-loop" override capability for all high-impact actions.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-sky-700 mb-3">2. Data Sovereignty & Localization</h3>
                  <p className="mb-4">
                    Data residency requirements are strictly enforced based on the jurisdiction of the data subject. Cross-border data transfers must utilize approved encryption tunnels with ephemeral keys.
                  </p>
                  <p>
                    All quiescent data stores must be immutable and audit-logged. Any modification to historical records triggers an immediate Level-1 security alert to the compliance oversight board.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-sky-700 mb-3">3. Algorithmic Accountability</h3>
                  <p className="mb-4">
                    All predictive models must be accompanied by a Model Card detailing training data provenance, known biases, and performance metrics across demographic subgroups.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-500 marker:text-sky-500">
                     <li>Black-box models are prohibited for credit, health, and employment decisions.</li>
                     <li>Explainability (XAI) modules must be active for all customer-facing interfaces.</li>
                     <li>Periodic adversarial testing is required on a quarterly cadence.</li>
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="light" className="p-8 border-slate-200 bg-white hover:bg-white backdrop-blur-xl">
               <h3 className="text-xl font-semibold text-slate-900 mb-4">Implementation Guidelines</h3>
               <p className="text-slate-600 mb-4">
                 Deployment of these policies requires the installation of the Aurix Sentinel agent on all participating nodes. Configuration management is handled centrally via the Governance Dashboard.
               </p>
            </GlassCard>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 space-y-6"
          >
            <GlassCard variant="light" className="p-6 sticky top-32 bg-white/95 hover:bg-white/95 backdrop-blur-xl border-slate-200 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-600" />
                Quick Access
              </h3>
              <nav className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Usage", "AI Ethics Charter", "Security Whitepaper"].map((item, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    className="block p-3 rounded-lg text-slate-600 hover:text-sky-700 transition-all text-sm font-medium border border-transparent group flex justify-between items-center"
                  >
                    {item}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 text-sky-500" />
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-600" />
                  Compliance Status
                </h4>
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded text-xs font-semibold flex items-center justify-between border border-green-100 mb-2">
                  <span>ISO 27001</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded text-xs font-semibold flex items-center justify-between border border-green-100">
                  <span>GDPR Ready</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}