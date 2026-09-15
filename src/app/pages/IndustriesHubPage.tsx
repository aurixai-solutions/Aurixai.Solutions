import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Shield, ArrowRight } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const INDUSTRIES = [
  { slug: "financial-services",    name: "Financial Services",        icon: "🏦", profiles: 87,  desc: "AML screening, wire fraud detection, algorithmic trading security, SOX/PCI DSS compliance." },
  { slug: "healthcare",            name: "Healthcare & Life Sciences", icon: "🏥", profiles: 124, desc: "HIPAA, HITECH, medical device security, EHR protection, clinical AI oversight." },
  { slug: "government",            name: "Government & Public Sector", icon: "🏛️", profiles: 62,  desc: "FedRAMP, FISMA, OMB AI guidance, citizen data sovereignty, democratic accountability." },
  { slug: "defense",               name: "Defense & Intelligence",     icon: "🛡️", profiles: 94,  desc: "CMMC L1–L3, CUI protection, APT detection, air-gap support, classified-adjacent environments." },
  { slug: "energy",                name: "Energy & Utilities",         icon: "⚡", profiles: 45,  desc: "NERC CIP, ICS/SCADA protection, OT monitoring, grid resilience, pipeline security." },
  { slug: "manufacturing",         name: "Manufacturing",              icon: "🏭", profiles: 58,  desc: "IP protection, IIoT device security, MES/ERP integrity, supply chain risk management." },
  { slug: "retail",                name: "Retail & E-Commerce",        icon: "🛒", profiles: 52,  desc: "PCI DSS 4.0, fraud prevention, customer data protection, inventory integrity." },
  { slug: "technology",            name: "Technology",                 icon: "💻", profiles: 71,  desc: "SOC 2 Type II, software supply chain security, SaaS governance, developer ecosystem." },
  { slug: "legal",                 name: "Legal & Professional Services",icon: "⚖️",profiles: 33, desc: "Client data privilege, matter confidentiality, e-discovery security, bar compliance." },
  { slug: "insurance",             name: "Insurance",                  icon: "📋", profiles: 41,  desc: "Actuarial model risk, claims fraud detection, NAIC compliance, underwriting governance." },
  { slug: "education",             name: "Education",                  icon: "🎓", profiles: 28,  desc: "FERPA, COPPA, student data privacy, research IP protection, academic AI ethics." },
  { slug: "real-estate",           name: "Real Estate",                icon: "🏢", profiles: 22,  desc: "Transaction fraud, AML for wire transfers, building system IoT security." },
  { slug: "media",                 name: "Media & Entertainment",      icon: "🎬", profiles: 19,  desc: "Content IP protection, deepfake detection, rights management data integrity." },
  { slug: "telecommunications",    name: "Telecommunications",         icon: "📡", profiles: 34,  desc: "CDR data governance, SS7/Diameter security, 5G core protection, CPNI compliance." },
  { slug: "transportation",        name: "Transportation & Logistics",  icon: "🚢", profiles: 26,  desc: "Supply chain data integrity, vehicle system security, customs compliance, cargo fraud." },
];

const STATS = [
  { value: "770+", label: "Security Profiles" },
  { value: "15",   label: "Industries" },
  { value: "26+",  label: "Compliance Frameworks" },
  { value: "23",   label: "Threat Categories" },
];

export function IndustriesHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <PageHero
        title="Built for Your Industry"
        subtitle="770+ security capability profiles tailored to the specific threats, compliance requirements, and operational needs of 15 major industries. Every profile built by domain experts who understand your threat landscape."
        badge="Industry Solutions"
        image={MOUNTAIN.valleyFogPeaks}
      />

      {/* Stats */}
      <section className="py-10 border-y border-slate-200 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-sky-600">{s.value}</div>
                <div className="text-slate-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <motion.div key={ind.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/industries/${ind.slug}`}
                  className="group block bg-white border border-slate-200 rounded-2xl p-7 hover:border-sky-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl leading-none">{ind.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 font-bold text-lg mb-1 group-hover:text-sky-600 transition-colors">{ind.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{ind.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sky-600 text-sm font-semibold">{ind.profiles} Capability Profiles</span>
                        <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Browse All Security Profiles</h3>
              <p className="text-slate-500 text-sm mb-6">Search and filter through all 770+ capability profiles by industry, compliance framework, or threat category.</p>
              <Link to="/solutions/prism" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-full text-sm transition-all">
                View All Profiles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Need Custom Industry Coverage?</h3>
              <p className="text-slate-500 text-sm mb-6">Our team can create tailored security profiles for your specific industry requirements, threat actors, and regulatory environment.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-full text-sm transition-all">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}