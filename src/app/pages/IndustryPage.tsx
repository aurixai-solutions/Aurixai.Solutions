import React, { useMemo } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { useHeroOverride } from "../components/useHeroOverride";
import { ArrowRight, ShieldCheck, FileText, Tag } from "lucide-react";
import industriesData from "../../data/industries.json";
import complianceData from "../../data/compliance.json";
import { industryPageContent } from "../../data/industryPageContent";
import { MOUNTAIN } from "../components/heroImages";

export function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();

  const industry = useMemo(
    () => industriesData.find((i) => i.slug === slug) ?? null,
    [slug]
  );

  const richContent = useMemo(
    () => (slug ? industryPageContent[slug] ?? null : null),
    [slug]
  );

  const regulations = useMemo(() => {
    const slugs = industry?.regulations ?? richContent?.regulationSlugs ?? [];
    return complianceData.filter((c) => slugs.includes(c.slug));
  }, [industry, richContent]);

  const displayTitle = richContent?.title ?? industry?.title ?? "";
  const displaySubtitle = richContent?.subtitle ?? industry?.description ?? "";
  const heroImage = richContent?.heroImage ?? industry?.hero_image ?? MOUNTAIN.snowyPeakBlueSky;
  const keyRegs = richContent?.keyRegulations ?? [];
  const pageText = richContent?.pageContent ?? industry?.content_overview ?? "";

  // Push dynamic hero data up to Layout's centralized hero
  useHeroOverride(
    (industry || richContent)
      ? { title: displayTitle, subtitle: displaySubtitle, image: heroImage }
      : null
  );

  if (!industry && !richContent) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Industry Not Found</h2>
          <Link to="/industries" className="text-sky-600 hover:underline mt-4 block">
            ← Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16 max-w-7xl">

        {/* Key Regulations Tag Row */}
        {keyRegs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-sky-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600">
                Key Regulatory Frameworks
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keyRegs.map((reg: string) => (
                <span
                  key={reg}
                  className="px-3 py-1.5 rounded-full text-xs font-medium
                    bg-sky-50/80 border border-sky-200/70 text-sky-700
                    backdrop-blur-sm hover:bg-sky-100/80 transition-colors cursor-default"
                >
                  {reg}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Content Card — glassmorphic on white */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.07 }}
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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                {displayTitle}: Industry Overview
              </h2>
              <div
                className="h-0.5 w-16 rounded-full"
                style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)" }}
              />
            </div>

            {/* Card Body */}
            <div className="px-8 md:px-12 py-10">
              {pageText ? (
                pageText.trim().startsWith("<") ? (
                  <div className="industry-rich-content" dangerouslySetInnerHTML={{ __html: pageText }} />
                ) : (
                  <p className="text-slate-600 text-base leading-relaxed">{pageText}</p>
                )
              ) : (
                <p className="text-slate-400 italic">No detailed content available yet.</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Linked Compliance Standards */}
        {regulations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              Applicable Regulatory Compliance Standards
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {regulations.map((reg, i) => (
                <motion.div
                  key={reg.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i }}
                >
                  <Link to={`/compliance/${reg.slug}`} className="group block h-full">
                    <div
                      className="h-full rounded-xl border border-slate-200/60 p-6 transition-all duration-300
                        group-hover:border-sky-300/70 group-hover:-translate-y-1 group-hover:shadow-lg"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)"
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4
                        bg-sky-50/90 border border-sky-100 group-hover:bg-sky-100/80 transition-colors">
                        <FileText className="w-5 h-5 text-sky-500" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-sky-600 transition-colors">
                        {reg.title}
                      </h4>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2">{reg.full_name}</p>
                      <div className="flex items-center text-sky-500 text-xs font-semibold">
                        View Requirements{" "}
                        <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .industry-rich-content p {
          font-size: 15px;
          line-height: 1.85;
          color: #475569 !important;
          margin-bottom: 22px;
        }
        .industry-rich-content p:last-child { margin-bottom: 0; }
        .industry-rich-content strong { color: #1e293b !important; font-weight: 600; }
        .industry-rich-content div { color: #475569 !important; }
        .industry-rich-content a { color: #0ea5e9; text-decoration: underline; }
        .industry-rich-content ul {
          color: #475569 !important;
          padding-left: 1.5rem;
          margin-bottom: 1.2rem;
          list-style-type: disc;
        }
        .industry-rich-content li { margin-bottom: 0.5rem; line-height: 1.75; }
      `}</style>
    </div>
  );
}