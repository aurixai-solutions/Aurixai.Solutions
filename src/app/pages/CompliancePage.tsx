import React, { useMemo } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { useHeroOverride } from "../components/useHeroOverride";
import { ArrowRight, CheckCircle2, ShieldAlert, Building2, Scale } from "lucide-react";
import complianceData from "../../data/compliance.json";
import industriesData from "../../data/industries.json";
import { compliancePageContent } from "../../data/compliancePageContent";
import { MOUNTAIN } from "../components/heroImages";

export function CompliancePage() {
  const { slug } = useParams<{ slug: string }>();

  const regulation = useMemo(
    () => complianceData.find((c) => c.slug === slug) ?? null,
    [slug]
  );

  const richContent = useMemo(
    () => (slug ? compliancePageContent[slug] ?? null : null),
    [slug]
  );

  const affectedIndustries = useMemo(
    () => industriesData.filter((ind) => ind.regulations?.includes(slug as string)),
    [slug]
  );

  // Push dynamic hero data up to Layout's centralized hero
  useHeroOverride(regulation ? {
    title: regulation.title,
    subtitle: regulation.full_name,
    image: MOUNTAIN.mountaineerCrossingGlacier,
  } : null);

  if (!regulation) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Regulation Not Found</h2>
          <Link to="/regulatory-compliance" className="text-sky-600 hover:underline mt-4 block">
            ← Back to Compliance
          </Link>
        </div>
      </div>
    );
  }

  const pageText = richContent?.pageContent ?? regulation.content ?? "";
  const cardTitle = richContent?.fullTitle ?? `${regulation.title} — ${regulation.full_name}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16 max-w-7xl">

        {/* Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
        >
          {/* Audit Frequency */}
          <div
            className="rounded-xl border border-sky-200/60 p-6 flex items-start gap-4"
            style={{
              background: "rgba(240,249,255,0.75)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 2px 16px rgba(14,165,233,0.07), inset 0 1px 0 rgba(255,255,255,0.9)"
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-sky-100/80 border border-sky-200/60
              flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-1">
                Audit Frequency
              </p>
              <p className="text-xl font-semibold text-slate-900">{regulation.audit_frequency || "N/A"}</p>
            </div>
          </div>

          {/* Penalties */}
          <div
            className="rounded-xl border border-rose-200/60 p-6 flex items-start gap-4"
            style={{
              background: "rgba(255,241,242,0.75)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 2px 16px rgba(244,63,94,0.06), inset 0 1px 0 rgba(255,255,255,0.9)"
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-rose-100/80 border border-rose-200/60
              flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-1">
                Non-Compliance Penalties
              </p>
              <p className="text-xl font-semibold text-slate-900">{regulation.penalties || "N/A"}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-16"
        >
          <div
            className="rounded-2xl border border-slate-200/70 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 48px -8px rgba(14,165,233,0.08), 0 0 0 1px rgba(255,255,255,0.8) inset"
            }}
          >
            {/* Card Header */}
            <div className="px-8 md:px-12 pt-10 pb-6 border-b border-slate-100/80">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                About {regulation.title}
              </h2>
              <p className="text-sm text-slate-500 mb-3">{cardTitle}</p>
              <div
                className="h-0.5 w-16 rounded-full"
                style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)" }}
              />
            </div>

            {/* Card Body */}
            <div className="px-8 md:px-12 py-10">
              {pageText ? (
                pageText.trim().startsWith("<") ? (
                  <div className="compliance-rich-content" dangerouslySetInnerHTML={{ __html: pageText }} />
                ) : (
                  <p className="text-slate-600 text-base leading-relaxed">{pageText}</p>
                )
              ) : (
                <p className="text-slate-400 italic">No detailed content available yet.</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Affected Industries */}
        {affectedIndustries.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-500" />
              Industries Subject to {regulation.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {affectedIndustries.map((ind, i) => (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 * i }}
                >
                  <Link to={`/industries/${ind.slug}`} className="group block h-full">
                    <div
                      className="h-full rounded-xl border border-slate-200/60 overflow-hidden
                        transition-all duration-300 group-hover:border-sky-300/60 group-hover:-translate-y-1 group-hover:shadow-lg"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)"
                      }}
                    >
                      <div className="h-36 overflow-hidden relative">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                        <img
                          src={ind.hero_image}
                          alt={ind.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-sm font-bold text-slate-800 mb-1.5 group-hover:text-sky-600 transition-colors">
                          {ind.title}
                        </h4>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{ind.description}</p>
                        <div className="flex items-center text-sky-500 text-xs font-semibold">
                          View Industry{" "}
                          <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-200/60 p-8 text-center"
            style={{
              background: "rgba(248,250,252,0.8)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)"
            }}
          >
            <Scale className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">
              No specific industries are cross-linked to this regulation yet.
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        .compliance-rich-content p {
          font-size: 15px;
          line-height: 1.85;
          color: #475569 !important;
          margin-bottom: 22px;
        }
        .compliance-rich-content p:last-child { margin-bottom: 0; }
        .compliance-rich-content strong { color: #1e293b !important; font-weight: 600; }
        .compliance-rich-content div { color: #475569 !important; }
        .compliance-rich-content a { color: #0ea5e9; text-decoration: underline; }
        .compliance-rich-content ul {
          color: #475569 !important;
          padding-left: 1.5rem;
          margin-bottom: 1.2rem;
          list-style-type: disc;
        }
        .compliance-rich-content li { margin-bottom: 0.5rem; line-height: 1.75; }
        .compliance-rich-content em { color: #64748b !important; font-style: italic; }
      `}</style>
    </div>
  );
}