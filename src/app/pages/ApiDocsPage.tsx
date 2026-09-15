import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { FileText, Webhook, Database, Radio, ArrowRight, Code2, Lock } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
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

const API_FEATURES = [
  { icon: FileText, title: "RESTful API", desc: "Standard REST endpoints for all Aurix platform features with JSON responses, pagination, filtering, and sorting." },
  { icon: Webhook, title: "Webhooks", desc: "Real-time event notifications for threats, alerts, compliance events, and data quality issues with configurable retry logic." },
  { icon: Database, title: "GraphQL", desc: "Flexible queries for complex data relationships and custom reporting — fetch exactly what you need, nothing more." },
  { icon: Radio, title: "Streaming API", desc: "Real-time data streams for live monitoring and instant alerts using WebSockets and Server-Sent Events." },
];

const SDKS = [
  { lang: "Python", badge: "\u{1F40D}", status: "Available" },
  { lang: "Java", badge: "\u2615", status: "Available" },
  { lang: ".NET / C#", badge: "\u{1F535}", status: "Available" },
  { lang: "Node.js", badge: "\u{1F7E2}", status: "Beta" },
  { lang: "Go", badge: "\u{1F439}", status: "Coming Soon" },
  { lang: "Ruby", badge: "\u{1F48E}", status: "Coming Soon" },
];

export function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PageHero
        badge="Documentation"
        title="API Documentation"
        subtitle="Complete reference for the Aurix API — RESTful endpoints, webhooks, and real-time streaming."
        image={MOUNTAIN.summitSunriseClimber}
      />

      <div className="container mx-auto px-6 max-w-6xl py-16 space-y-10">

        {/* Coming Soon Banner */}
        <div className="p-8 md:p-10 text-center" style={GLASS_LIGHT}>
          <div className="text-sky-500 text-4xl mb-4">{"\u{1F680}"}</div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900">Documentation Portal — Coming Soon</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Our comprehensive API documentation is currently being finalized. Request early access to get started with the Aurix API.</p>
          <div className="flex gap-4 justify-center mt-6">
            <Link to="/demo">
              <button className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
                Request API Access <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* API Features */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-widest mb-4">Capabilities</span>
            <h2 className="text-4xl font-bold mb-4 text-slate-900">API Capabilities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to build powerful integrations with the Aurix platform.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {API_FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="bg-white/60 border border-white/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm h-full">
                  <div className="w-12 h-12 rounded-xl bg-sky-100/80 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SDK Languages */}
        <div className="p-8 md:p-10 text-white" style={GLASS_DARK}>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 text-white">Official SDKs</h2>
            <p className="text-slate-300">Production-ready SDKs in your preferred language.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {SDKS.map((sdk, i) => (
              <motion.div key={sdk.lang} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4 hover:bg-white/10 transition-all">
                  <span className="text-3xl">{sdk.badge}</span>
                  <div>
                    <div className="font-bold text-white">{sdk.lang}</div>
                    <div className={`text-sm mt-1 ${sdk.status === "Available" ? "text-emerald-400 font-medium" : sdk.status === "Beta" ? "text-amber-400" : "text-slate-400"}`}>
                      {sdk.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Auth & Security */}
        <div className="p-8 md:p-10" style={GLASS_LIGHT}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sky-600 text-sm font-semibold uppercase tracking-widest">Security First</span>
              <h2 className="text-4xl font-bold mt-2 mb-6 text-slate-900">Enterprise-Grade API Security</h2>
              <ul className="space-y-4">
                {[
                  { icon: Lock, text: "OAuth 2.0 & API key authentication" },
                  { icon: Code2, text: "TLS 1.3 encryption on all connections" },
                  { icon: FileText, text: "Granular scope-based permissions" },
                  { icon: Radio, text: "Rate limiting with configurable quotas" },
                  { icon: Webhook, text: "IP allowlisting for production keys" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100/80 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-sky-600" />
                    </div>
                    <span className="text-slate-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-6 font-mono text-sm shadow-lg" style={GLASS_DARK}>
              <div className="text-slate-400 mb-2"># Example: Authenticate and query</div>
              <div className="text-sky-400">curl</div>
              <div className="text-slate-300 pl-4">-H "Authorization: Bearer <span className="text-amber-300">YOUR_API_KEY</span>"</div>
              <div className="text-slate-300 pl-4">-H "Content-Type: application/json"</div>
              <div className="text-slate-300 pl-4">https://api.aurixai.com/v1/</div>
              <div className="mt-4 text-slate-400"># Response</div>
              <div className="text-green-400">{"{"}</div>
              <div className="text-slate-300 pl-4">"status": "operational",</div>
              <div className="text-slate-300 pl-4">"version": "v1.4.2",</div>
              <div className="text-slate-300 pl-4">"endpoints": 47</div>
              <div className="text-green-400">{"}"}</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-12 text-center" style={GLASS_LIGHT}>
          <h2 className="text-4xl font-bold mb-6 text-slate-900">Ready to Integrate?</h2>
          <p className="text-slate-500 mb-10 text-lg">Get early access to our API documentation and start building powerful integrations with the Aurix platform.</p>
          <Link to="/demo">
            <button className="px-10 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-all text-lg flex items-center gap-2 mx-auto shadow-lg hover:shadow-sky-500/20">
              Request Demo <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
