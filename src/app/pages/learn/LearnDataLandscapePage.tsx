import { Link } from "react-router";
import { motion } from "motion/react";
import { BookOpen, ArrowLeft, ArrowRight, Layers, Database, Server, Cloud } from "lucide-react";
import { PageHero } from "../../components/ui/PageHero";
import { TEACHING } from "../../components/heroImages";

export function LearnDataLandscapePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PageHero
        title="The Data Landscape"
        subtitle="A Bird's Eye View — understand how data flows, where it lives, and why modern infrastructure matters"
        badge="Part 1 — Lesson 2: Foundations"
        image={TEACHING.workshopWhiteboard}
      />

      {/* Lesson nav bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-3 flex items-center gap-4 max-w-4xl">
          <Link to="/learn" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Learning Center
          </Link>
          <span className="text-slate-300">/</span>
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-500"><BookOpen className="w-4 h-4" /> ~8 min read</span>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-slate prose-lg max-w-none">
            <div className="space-y-10 text-slate-600 leading-relaxed">

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What Is "Data" in a Business Context?</h2>
                <p>When most people hear "data," they think of spreadsheets and databases. But in a modern organization, data is <strong className="text-slate-900">every piece of information that flows through your business</strong> — from the customer's name on an invoice to the timestamp of when an employee badged into the building.</p>
                <p className="mt-4">Data isn't just numbers. It's names, addresses, product descriptions, email conversations, financial transactions, sensor readings, click patterns, voice recordings, images, documents, and millions of other information types that your organization creates, collects, processes, and stores every single day.</p>
              </div>

              {/* Three Types Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">The Three Types of Business Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Database, color: "sky", title: "Structured Data", body: "Fits neatly into rows and columns — spreadsheets, databases, financial records. Easiest to manage but typically only 20% of organizational data.", pct: "20%" },
                    { icon: Layers, color: "purple", title: "Unstructured Data", body: "No predefined format — emails, documents, videos, images, social posts. Represents 80% of organizational data and growing exponentially.", pct: "80%" },
                    { icon: Server, color: "emerald", title: "Semi-Structured", body: "Has some organizational properties but doesn't fit traditional databases — XML, JSON, log files, IoT sensor data.", pct: "Growing" },
                  ].map((t) => (
                    <div key={t.title} className="text-center">
                      <div className={`w-12 h-12 rounded-xl bg-${t.color}-50 border border-${t.color}-100 flex items-center justify-center mx-auto mb-3`}>
                        <t.icon className={`w-6 h-6 text-${t.color}-600`} />
                      </div>
                      <div className={`text-2xl font-bold text-${t.color}-600 mb-1`}>{t.pct}</div>
                      <h4 className="text-slate-900 font-semibold mb-2">{t.title}</h4>
                      <p className="text-slate-500 text-sm">{t.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Where Does Your Organization's Data Live?</h2>
                <p>Here's a truth that surprises most business leaders: <strong className="text-slate-900">nobody in your organization knows where all the data lives.</strong> Not IT. Not the CIO. Not the data team. Nobody.</p>
                <p className="mt-4">Data accumulates in places you'd expect — and many you wouldn't:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {[
                    { icon: "🏢", title: "Enterprise Systems", desc: "ERP, CRM, HRIS, financial systems, supply chain management platforms" },
                    { icon: "🗄️", title: "Databases", desc: "SQL Server, Oracle, PostgreSQL, MySQL, cloud-native databases" },
                    { icon: "☁️", title: "Cloud Platforms", desc: "AWS, Azure, Google Cloud, Salesforce, ServiceNow, Workday" },
                    { icon: "📱", title: "Productivity Tools", desc: "Microsoft 365, Google Workspace, SharePoint, Box, Dropbox" },
                    { icon: "💻", title: "Personal Devices", desc: "Laptops, phones, tablets, USB drives — yes, people still use them" },
                    { icon: "🔲", title: "Shadow IT", desc: "Unauthorized apps, personal cloud storage, department tools IT doesn't know about" },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="text-slate-900 font-semibold text-sm">{item.title}</h4>
                        <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The Invisible Data Running Your Business</h2>
                {[
                  { term: "Metadata", def: "Data about your data. When was this file created? Who modified it last? What system did it come from? Metadata is often more valuable than the data itself for governance purposes." },
                  { term: "Log Data", def: "Every system generates logs — who logged in, what they accessed, what errors occurred. Critical for security and compliance but often ignored until there's a problem." },
                  { term: "Integration Data", def: "Data that moves between systems creates its own trail. API calls, file transfers, replication logs — all telling the story of how information flows through your organization." },
                  { term: "Derived Data", def: "Reports, analytics, calculated fields, aggregations — data created from other data. Where errors multiply because problems in source data compound through every derivation." },
                ].map((item) => (
                  <div key={item.term} className="mb-5">
                    <strong className="text-sky-600">{item.term}:</strong>{" "}
                    <span>{item.def}</span>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Most Organizations Don't Know What Data They Have</h2>
                <p>Studies consistently show that <strong className="text-slate-900">most organizations can identify less than 50% of their data assets.</strong> This isn't due to incompetence — it's due to how organizations grow:</p>
                <ul className="mt-4 space-y-3 list-none pl-0">
                  {[
                    { label: "Organic Growth", body: "Departments add systems without central oversight. Marketing buys a CRM. Sales gets a forecasting tool. Each creates new data stores." },
                    { label: "Mergers & Acquisitions", body: "When companies merge, so do their data environments. Suddenly three CRM systems, two financial platforms, nobody knows which is authoritative." },
                    { label: "Employee Turnover", body: "Institutional knowledge about data walks out the door. That spreadsheet Jim maintained for 10 years? Nobody knows where it is." },
                    { label: "Technology Evolution", body: "Old systems get replaced but not retired. Data migrates partially. Legacy data sits on forgotten servers, waiting to cause problems." },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                      <span className="text-sky-600 font-bold text-sm min-w-max">{item.label}:</span>
                      <span className="text-slate-600 text-sm">{item.body}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aurix Insight */}
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Cloud className="w-6 h-6 text-sky-600" />
                  <h3 className="text-lg font-bold text-sky-800">How Aurix Helps: Automated Data Discovery</h3>
                </div>
                <p className="text-sky-900">Aurix Prism's automated discovery scans your infrastructure to find data assets you didn't know existed. It identifies databases, file shares, cloud storage, and applications — then automatically catalogs what it finds, including metadata, relationships, and data lineage. What would take a team months to do manually, Prism does in days.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-amber-800 font-bold mb-2">Key Insight</h3>
                <p className="text-amber-900">You cannot govern what you cannot see. The first step in any data governance journey is discovering and cataloging your data assets. This is where Aurix's automated discovery capabilities become invaluable — finding data you didn't know existed.</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between">
            <Link to="/learn" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:border-sky-300 transition-all text-sm shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Learning Center
            </Link>
            <Link to="/learn/what-is-data-governance" className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-sm transition-all">
              Next: What is Data Governance? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-slate-200 bg-gradient-to-br from-sky-50 via-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">See Data Discovery in Action</h2>
          <p className="text-slate-600 mb-8">Ready to find out what data you actually have? Schedule a demo of Aurix Prism's discovery capabilities.</p>
          <Link to="/demo" className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-sky-500/20">
            Request Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}