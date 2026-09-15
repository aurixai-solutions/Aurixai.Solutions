import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Globe, Lock, AlertTriangle, Shield, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const STATS = [
  { v: "137", l: "Countries with Data Laws" },
  { v: "€20M", l: "Max GDPR Fine" },
  { v: "100%", l: "Cryptographic Border Assurance" },
  { v: "0%", l: "Unauthorized Extraction" },
];

const CRISES = [
  {
    icon: AlertTriangle, color: "text-red-400",
    title: "Microsoft UK Police Data Failure",
    body: "Microsoft publicly admitted it cannot guarantee UK policing data stays within UK borders — exposing the fundamental flaw in hyperscaler 'sovereign cloud' offerings. Microsoft's own chief legal officer testified before the French Senate that the company cannot protect EU data from U.S. access requests.",
  },
  {
    icon: Lock, color: "text-orange-400",
    title: "The CLOUD Act vs. GDPR Paradox",
    body: "The U.S. CLOUD Act allows American authorities to demand data from U.S. providers even when stored in the EU, directly conflicting with GDPR Article 48. Organizations face impossible choices: comply with GDPR and violate the CLOUD Act, or vice versa — both carrying penalties up to €20M or 4% of global revenue.",
  },
  {
    icon: Shield, color: "text-purple-400",
    title: "DORA & NIS2: The 2025 Enforcement Wave",
    body: "DORA mandates financial institutions maintain 'full control and oversight' of critical systems. NIS2 extends cybersecurity obligations across energy, healthcare, transport, and digital infrastructure with management-level personal liability for non-compliance.",
  },
  {
    icon: Globe, color: "text-sky-400",
    title: "AI Era Amplification",
    body: "AI models require massive datasets — often stored in cloud environments — raising unprecedented sovereignty concerns. Training data crossing borders triggers multiple regulatory frameworks simultaneously. The EU AI Act now requires transparency while China's PIPL mandates strict data localization, creating incompatible requirements for global AI deployments.",
  },
];

const REGULATIONS = [
  { name: "GDPR", region: "EU", desc: "Data residency, consent, right to erasure, transfer mechanisms (SCCs, BCRs, adequacy decisions). Penalties up to €20M or 4% global turnover.", coverage: "Full" },
  { name: "CLOUD Act", region: "US", desc: "Extraterritorial U.S. reach over data held by American companies worldwide — provider-based, not location-based jurisdiction.", coverage: "Full" },
  { name: "DORA", region: "EU Financial", desc: "Mandates 'full control and oversight' of critical ICT; regulators must have unrestricted access regardless of third-country laws.", coverage: "Full" },
  { name: "NIS2", region: "EU Sectors", desc: "Cybersecurity obligations for energy, healthcare, transport, digital infrastructure; management-level personal liability.", coverage: "Full" },
  { name: "PIPL", region: "China", desc: "Strict data localization; critical data and 1M+ user personal information must remain in China; mandatory security reviews for cross-border transfers.", coverage: "Full" },
  { name: "CCPA/CPRA", region: "US (CA)", desc: "Consumer rights, disclosure, opt-out requirements for personal information.", coverage: "Full" },
  { name: "LGPD", region: "Brazil", desc: "Consent, data protection officer, international transfer restrictions.", coverage: "Full" },
  { name: "PDPA", region: "Singapore", desc: "Consent, access, correction, transfer limitations.", coverage: "Full" },
];

const TRANSFER_MECHANISMS = [
  { title: "Standard Contractual Clauses (SCCs)", pros: "Ready-made, no prior authorization needed, works for any transfer scenario.", cons: "Requires Transfer Impact Assessment (TIA), supplementary measures if destination laws inadequate.", best: "Companies with global third-party vendors and diverse transfer needs." },
  { title: "Binding Corporate Rules (BCRs)", pros: "Unified standard across global operations, streamlines internal compliance.", cons: "18–24 month approval process, only for intra-group transfers, expensive.", best: "Large multinationals with complex internal data flows." },
  { title: "Adequacy Decisions", pros: "Data flows as if within EU — no additional safeguards required.", cons: "Can be invalidated (Schrems I & II precedent). CLOUD Act creates ongoing concerns.", best: "Transfers to countries with EU Commission adequacy recognition." },
  { title: "Client-Side Encryption", pros: "Strongest safeguard — providers cannot access plaintext even if compelled by foreign authorities.", cons: "Complex key management; may limit cloud functionality.", best: "Organizations needing maximum sovereignty while using global cloud infrastructure." },
];

const BEST_PRACTICES = [
  { num: "1", title: "Data Mapping & Classification", body: "Inventory all data types and physical/logical locations. Classify by sensitivity. Tag with applicable jurisdictions and regulations. Document all cross-border data flows." },
  { num: "2", title: "Vendor Jurisdiction Assessment", body: "Identify headquarters jurisdiction of all cloud providers. Evaluate 'sovereign cloud' claims critically — ask providers directly about legal jurisdictions. Consider EU-based providers for EU data to avoid CLOUD Act conflicts." },
  { num: "3", title: "Implement Technical Safeguards", body: "Deploy customer-managed encryption with keys held in-jurisdiction. Use client-side encryption where provider cannot access plaintext. Implement data residency controls and geofencing." },
  { num: "4", title: "Legal Mechanism Selection", body: "Use SCCs for external third-party transfers. Consider BCRs for large multinationals. Conduct Transfer Impact Assessments before all transfers. Add supplementary measures when destination laws are inadequate." },
  { num: "5", title: "Regulatory Monitoring", body: "Subscribe to regulatory updates from data protection authorities. Track adequacy decision changes (remember Schrems precedent). Monitor new regulations — EU AI Act, Digital Services Act, etc." },
  { num: "6", title: "Incident Response Planning", body: "Establish playbooks for CLOUD Act vs. GDPR conflicts. Define escalation procedures for foreign legal demands. Coordinate with legal counsel on response strategies." },
];

const PRISM_CAPABILITIES = [
  { icon: MapPin, title: "Geo-Location Mapping", body: "Automatically discover and map where all your data physically resides across cloud regions and data centers." },
  { icon: Shield, title: "Data Residency Controls", body: "Enforce where specific data types can be stored and processed based on classification and regulation." },
  { icon: Globe, title: "Transfer Monitoring", body: "Real-time tracking of all cross-border data flows with automatic alerts for policy violations." },
  { icon: Lock, title: "SCCs & BCRs Management", body: "Automated management of Standard Contractual Clauses and Binding Corporate Rules documentation." },
  { icon: CheckCircle2, title: "Audit Reporting", body: "Generate comprehensive compliance reports for regulators and internal audits with full data lineage." },
  { icon: AlertTriangle, title: "TIA Automation", body: "Automated Transfer Impact Assessment generation for cross-border data flows — no manual process required." },
];

export function DataSovereigntyPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <PageHero
        title="Data Sovereignty"
        subtitle="True Data Sovereignty in a Hyperscaler World — The pure chemical essence of your market data, securely contained."
        badge="Sovereignty as a Service"
        image={MOUNTAIN.verticalRockFaceClimber}
      />

      {/* Stats */}
      <section className="py-12 bg-slate-100/60 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-sky-600 mb-1">{s.v}</div>
                <div className="text-sm text-slate-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 2025 Crisis */}
      <section className="py-20 bg-slate-100/60 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">The 2025 Crisis</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-slate-900">The Sovereignty Crisis</h2>
            <p className="text-slate-600">Retain the pure essence of your proprietary data. We guarantee cryptographic borders, ensuring your intelligence remains untainted by unauthorized extraction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CRISES.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-sky-300 hover:shadow-md transition-all shadow-sm">
                <c.icon className="w-8 h-8 text-sky-600 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-900">{c.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Landscape */}
      <section id="regulatory-landscape" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Regulatory Landscape</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-slate-900">The Complex Web of Data Sovereignty Laws</h2>
            <p className="text-slate-600">From GDPR to CLOUD Act, navigate the conflicting requirements shaping global data governance.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="text-left px-5 py-4 font-semibold">Regulation</th>
                  <th className="text-left px-5 py-4 font-semibold">Region</th>
                  <th className="text-left px-5 py-4 font-semibold">Key Requirements</th>
                  <th className="text-center px-5 py-4 font-semibold">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {REGULATIONS.map((r, i) => (
                  <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-sky-50 transition-colors`}>
                    <td className="px-5 py-4 font-bold text-slate-900">{r.name}</td>
                    <td className="px-5 py-4"><span className="px-2 py-1 bg-sky-50 text-sky-700 rounded text-xs border border-sky-200">{r.region}</span></td>
                    <td className="px-5 py-4 text-slate-600 leading-relaxed">{r.desc}</td>
                    <td className="px-5 py-4 text-center"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs border border-emerald-200">{r.coverage}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Transfer Mechanisms */}
      <section className="py-20 bg-slate-100/60 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Cross-Border Mechanisms</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-slate-900">Legal Tools for International Data Transfers</h2>
          </div>
          <div className="flex gap-2 mb-8 flex-wrap justify-center">
            {TRANSFER_MECHANISMS.map((m, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === i ? "bg-sky-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"}`}>
                {m.title.split(" (")[0]}
              </button>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-3xl mx-auto shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-900">{TRANSFER_MECHANISMS[activeTab].title}</h3>
            <div className="space-y-4">
              <div><span className="text-emerald-600 font-semibold">✓ Pros: </span><span className="text-slate-700">{TRANSFER_MECHANISMS[activeTab].pros}</span></div>
              <div><span className="text-red-600 font-semibold">✗ Cons: </span><span className="text-slate-700">{TRANSFER_MECHANISMS[activeTab].cons}</span></div>
              <div><span className="text-sky-600 font-semibold">→ Best For: </span><span className="text-slate-700">{TRANSFER_MECHANISMS[activeTab].best}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Prism Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">The Aurix Solution</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-slate-900">How Prism™ & PEN Achieve True Data Sovereignty</h2>
            <p className="text-slate-600">Purpose-built architecture for jurisdictional compliance and cross-border data governance — EU-based, GDPR-native, DORA-compliant by design.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {PRISM_CAPABILITIES.map((c, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-sky-300 hover:shadow-md transition-colors shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-bold mb-2 text-slate-900">{c.title}</h4>
                <p className="text-slate-500 text-sm">{c.body}</p>
              </div>
            ))}
          </div>
          {/* EU advantage highlight */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">🇪🇺 EU Provider Advantage</h3>
                <ul className="space-y-3">
                  {["No conflicting US legal obligations — not subject to CLOUD Act", "GDPR-native: built from ground up, not retrofitted onto US cloud architecture", "DORA full control and oversight guaranteed by design", "NIS2 cybersecurity obligations embedded from inception"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">🔐 Jurisdiction-Aware Architecture</h3>
                <ul className="space-y-3">
                  {["Data stored exclusively in customer-designated jurisdiction", "All AI/ML processing occurs within same jurisdiction as data storage", "Even system metadata remains within jurisdictional boundaries", "Customer-managed encryption keys stored in-jurisdiction — no provider access"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20 bg-slate-100/60 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Implementation Guide</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-slate-900">Best Practices for Data Sovereignty 2025–2026</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BEST_PRACTICES.map((bp, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center font-bold text-lg mb-4 text-white">{bp.num}</div>
                <h4 className="font-bold mb-2 text-slate-900">{bp.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{bp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Take Control of Your Data Sovereignty</h2>
          <p className="text-slate-600 mb-8">See how Aurix Prism™ and PEN provide seamless, automated compliance — without the conflicts and compromises of US hyperscalers.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/demo" className="px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-all hover:shadow-lg hover:shadow-sky-500/20">
              Request Demo →
            </Link>
            <Link to="/contact" className="px-8 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold transition-all hover:shadow-sm">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}