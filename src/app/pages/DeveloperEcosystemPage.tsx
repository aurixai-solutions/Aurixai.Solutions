import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Code2, Share2, Lock, Package, Star, Download, ArrowRight, Zap, Globe, Shield } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const FEATURES = [
  { icon: Zap, title: "Build Once, Deploy Thousands", body: "Create a mini-app for one use case, share it across every department, every subsidiary, every region. One build. Infinite deployments." },
  { icon: Lock, title: "Zero Customer Data Exposure", body: "Share configurations, logic, and structure — never data. Every shared component is a clean template, ready to connect to YOUR data sources." },
  { icon: Globe, title: "Industry-Specific Solutions", body: "Browse pre-built solutions for financial services, healthcare, manufacturing, and more. Import, customize, deploy in minutes." },
];

const SHARE_ITEMS = [
  {
    icon: "🖥️",
    title: "Mini-Apps & Custom Dashboards",
    desc: "Build visual data applications in PEN™ with custom logic, transformations, and workflows. Package the entire app structure, business rules, UI components — and share it. The recipient imports it, connects their data sources, and it works instantly.",
    included: ["App structure", "Transformations", "Business logic", "UI layout"],
    notIncluded: ["Customer data", "Credentials", "Source connections"],
  },
  {
    icon: "⚙️",
    title: "Data Pipelines & ETL Workflows",
    desc: "Create complex data pipelines with transformations, quality checks, and orchestration logic. Share the entire pipeline definition. Recipients can map it to their own data sources and run it immediately with their data.",
    included: ["Pipeline structure", "Transformation rules", "Quality checks", "Scheduling logic"],
    notIncluded: ["Source data", "API keys", "Database credentials"],
  },
  {
    icon: "🔌",
    title: "Custom Integrations & API Bridges",
    desc: "Build secure, bidirectional interfaces between PEN™ and external systems. Create an API bridge with encryption, sandboxing, rate limiting, and authentication. Share the integration pattern and security model.",
    included: ["Integration logic", "API structure", "Security rules", "Auth patterns"],
    notIncluded: ["API tokens", "Connection strings", "Environment variables"],
  },
];

const GALLERY_EXAMPLES = [
  { title: "Real-Time Compliance Dashboard", cat: "Financial Services", sub: "PCI DSS Monitoring", rating: "4.8", downloads: "1,247" },
  { title: "HIPAA Patient Data Pipeline", cat: "Healthcare", sub: "EHR Integration", rating: "4.9", downloads: "892" },
  { title: "IoT Sensor Data Aggregator", cat: "Manufacturing", sub: "SCADA Integration", rating: "4.7", downloads: "2,134" },
];

const SECURITY_FEATURES = [
  { icon: Shield, title: "Granular Access Control", items: ["IP whitelisting and blacklisting", "Secure tunnel requirements", "Time-based access windows", "Expiration and renewal enforcement"] },
  { icon: Lock, title: "Built-In Security", items: ["End-to-end encryption", "Sandboxed execution environment", "Rate limiting and throttling", "Real-time threat detection"] },
  { icon: Code2, title: "Technology Agnostic", items: ["Connect from any programming language", "RESTful API with standard OAuth 2.0", "WebSocket support for real-time data", "GraphQL endpoints available"] },
];

export function DeveloperEcosystemPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PageHero
        badge="Developer Ecosystem"
        title="Build Once. Share Everywhere."
        subtitle="The World's First Enterprise AI Data Platform with a Developer Marketplace — stop reinventing the wheel."
        image={MOUNTAIN.snowCoveredRidge}
      />

      <div className="pt-8">
        {/* Why it changes everything */}
        <section className="py-20 bg-slate-100/60 border-y border-slate-200">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Why the Developer Ecosystem Changes Everything</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-200 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What you can share */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">What Can You Share?</h2>
            </div>
            <div className="space-y-8">
              {SHARE_ITEMS.map((item, i) => (
                <motion.div
                  key={item.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{item.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <p className="text-emerald-700 font-semibold text-sm mb-2">✓ Included</p>
                      <ul className="space-y-1">
                        {item.included.map(t => <li key={t} className="text-slate-700 text-sm">• {t}</li>)}
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-700 font-semibold text-sm mb-2">✗ NOT Included</p>
                      <ul className="space-y-1">
                        {item.notIncluded.map(t => <li key={t} className="text-slate-700 text-sm">• {t}</li>)}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* API Security */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="p-8 md:p-10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,250,252,0.55) 100%)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 16px 48px -12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)", borderRadius: 20 }}>
              <div className="text-center mb-14">
                <h2 className="text-4xl font-bold mb-4 text-slate-900">Enterprise-Grade API Security</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">Build integrations with any technology stack while maintaining complete control over who accesses your data and how.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {SECURITY_FEATURES.map((s, i) => (
                  <motion.div
                    key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white/60 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4">
                      <s.icon className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-4 text-slate-900">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.items.map(it => <li key={it} className="text-slate-500 text-sm flex items-start gap-2"><span className="text-sky-500 mt-0.5">•</span>{it}</li>)}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Developer Gallery */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">The Developer Gallery</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {GALLERY_EXAMPLES.map((ex, i) => (
                <motion.div
                  key={ex.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-sky-300 hover:shadow-md transition-all shadow-sm"
                >
                  <p className="text-sky-600 text-sm font-semibold mb-1">{ex.cat}</p>
                  <h4 className="font-bold mb-1 text-slate-900">{ex.title}</h4>
                  <p className="text-slate-500 text-sm mb-4">{ex.sub}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{ex.rating}/5</span>
                    <span className="flex items-center gap-1"><Download className="w-4 h-4" />{ex.downloads}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
              <Package className="w-12 h-12 text-sky-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Package & Publish Your Innovation</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Built something useful? Package it with metadata, documentation, and dependencies. Publish to your organization's private gallery or the public marketplace. Help others solve the same problems you've already conquered.</p>
                <ul className="grid grid-cols-2 gap-2">
                  {["Private gallery for your organization", "Public marketplace for the community", "Automatic versioning and updates", "Track downloads and ratings"].map(i => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2"><span className="text-sky-500">•</span>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="p-8 md:p-12 text-center" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,250,252,0.55) 100%)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 16px 48px -12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)", borderRadius: 20 }}>
              <h2 className="text-4xl font-bold mb-6 text-slate-900">Join the Aurix Developer Ecosystem</h2>
              <p className="text-slate-600 mb-10 text-lg">Build once. Share thousands of times. Transform how your organization leverages data engineering expertise.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/demo">
                  <button className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-sky-500/20">
                    Request Demo <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link to="/solutions/prism/pen">
                  <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-full transition-all hover:shadow-sm">
                    Explore PEN™
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}