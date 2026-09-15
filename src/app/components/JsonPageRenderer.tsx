import React, { useMemo } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { GlassCard } from "./ui/GlassCard";
import { useHeroOverride } from "./useHeroOverride";
import { ArrowRight, ExternalLink } from "lucide-react";

// ── JSON Schema Types ────────────────────────────────────────────────────────

export interface PageJsonCard {
  CardRowNumber?: number;
  CardStyleBGColor?: string;
  CardStyleClass?: string;
  CardNumber?: number;
  CardH2?: string;
  CardH3?: string;
  CardContentHTML?: string;
  CardCTAButtonTitle?: string;
  CardCTALinkURL?: string;
}

export interface PageJsonSection {
  SectionNumber: number;
  SectionTitleH2?: string;
  SectionContentHTML?: string;
  SectionImage?: string;
  SectionCTA?: {
    label?: string;
    link?: string;
  };
  SectionCards?: PageJsonCard[];
  SectionBackgroundVariant?: string;
  SectionNotes?: string;
}

export interface PageJsonRightCard {
  CardNumber?: number;
  CardHTML?: string;
}

export interface PageJsonData {
  PageTitle?: string;
  PageSlug?: string;
  HeroTitle?: string;
  HeroSubtitle?: string;
  HeroBadge?: string;
  HeroImage?: string;
  ParagraphContentHTML?: string;
  PageSections?: PageJsonSection[];
  PageRightCards?: PageJsonRightCard[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Group cards by CardRowNumber, then sort each group by CardNumber */
function groupCardsByRow(cards: PageJsonCard[]): PageJsonCard[][] {
  const rowMap = new Map<number, PageJsonCard[]>();
  for (const card of cards) {
    const row = card.CardRowNumber ?? 1;
    if (!rowMap.has(row)) rowMap.set(row, []);
    rowMap.get(row)!.push(card);
  }
  // Sort rows by key, then cards within each row by CardNumber
  return Array.from(rowMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, rowCards]) =>
      rowCards.sort((a, b) => (a.CardNumber ?? 0) - (b.CardNumber ?? 0))
    );
}

/** Determine grid cols class from card count */
function gridColsClass(count: number): string {
  if (count >= 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1";
}

/** Check if a string has meaningful content */
function hasContent(str?: string | null): boolean {
  if (!str) return false;
  const stripped = str.replace(/<[^>]*>/g, "").trim();
  return stripped.length > 0;
}

/** Is a URL external? */
function isExternal(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

// ── Section Background ───────────────────────────────────────────────────────

function sectionBgClass(variant?: string): string {
  switch (variant) {
    case "slate-50":
      return "bg-slate-50/60";
    case "sky-50":
      return "bg-sky-50/40";
    case "dark":
      return "bg-slate-900 text-white";
    default:
      return "";
  }
}

// ── Sub-Components ───────────────────────────────────────────────────────────

function CTAButton({ label, link }: { label: string; link: string }) {
  const external = isExternal(link);
  const classes =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg";

  if (external) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
        <ExternalLink className="w-4 h-4" />
      </a>
    );
  }
  return (
    <Link to={link} className={classes}>
      {label}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}

function SectionCard({ card }: { card: PageJsonCard }) {
  const hasLink = !!card.CardCTALinkURL && !!card.CardCTAButtonTitle;
  const bgStyle = card.CardStyleBGColor
    ? { backgroundColor: card.CardStyleBGColor }
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard
        className={`p-6 h-full flex flex-col ${card.CardStyleClass || ""}`}
        style={bgStyle}
      >
        {hasContent(card.CardH2) && (
          <h3 className="text-lg font-bold text-slate-900 mb-1">{card.CardH2}</h3>
        )}
        {hasContent(card.CardH3) && (
          <h4 className="text-sm font-semibold text-sky-600 mb-3">{card.CardH3}</h4>
        )}
        {hasContent(card.CardContentHTML) && (
          <div
            className="prose prose-sm prose-slate max-w-none flex-grow"
            dangerouslySetInnerHTML={{ __html: card.CardContentHTML! }}
          />
        )}
        {hasLink && (
          <div className="mt-4 pt-3 border-t border-slate-200/50">
            {isExternal(card.CardCTALinkURL!) ? (
              <a
                href={card.CardCTALinkURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors"
              >
                {card.CardCTAButtonTitle}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <Link
                to={card.CardCTALinkURL!}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors"
              >
                {card.CardCTAButtonTitle}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}

function PageSection({ section, index }: { section: PageJsonSection; index: number }) {
  const cardRows = useMemo(
    () => (section.SectionCards?.length ? groupCardsByRow(section.SectionCards) : []),
    [section.SectionCards]
  );
  const hasCards = cardRows.length > 0;
  const hasImage = hasContent(section.SectionImage);
  const hasHTML = hasContent(section.SectionContentHTML);
  const hasCTA = section.SectionCTA?.label && section.SectionCTA?.link;
  const hasTitle = hasContent(section.SectionTitleH2);

  // Don't render entirely empty sections
  if (!hasTitle && !hasHTML && !hasImage && !hasCards && !hasCTA) return null;

  const bgClass = sectionBgClass(section.SectionBackgroundVariant);
  const isEven = index % 2 === 0;

  return (
    <section className={`py-10 md:py-14 ${bgClass}`}>
      <div className="container mx-auto px-6">
        {/* Section title */}
        {hasTitle && (
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
          >
            {section.SectionTitleH2}
          </motion.h2>
        )}

        {/* Content + Image layout */}
        {(hasHTML || hasImage) && (
          <div
            className={`flex flex-col ${
              hasImage ? (isEven ? "lg:flex-row" : "lg:flex-row-reverse") : ""
            } gap-8 items-start mb-8`}
          >
            {hasHTML && (
              <div className={`flex-1 ${hasImage ? "lg:w-3/5" : "w-full"}`}>
                <GlassCard className="p-6 md:p-8">
                  <div
                    className="prose prose-slate max-w-none [&>h1]:mt-6 [&>h1]:mb-3 [&>h2]:mt-5 [&>h2]:mb-2 [&>h3]:mt-4 [&>h3]:mb-2 [&>h4]:mt-3 [&>h4]:mb-1 [&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4"
                    dangerouslySetInnerHTML={{ __html: section.SectionContentHTML! }}
                  />
                </GlassCard>
              </div>
            )}
            {hasImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex-shrink-0 ${hasHTML ? "lg:w-2/5" : "w-full"}`}
              >
                <div className="rounded-xl overflow-hidden shadow-lg border border-white/20">
                  <img
                    src={section.SectionImage!}
                    alt={section.SectionTitleH2 || "Section image"}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Card rows */}
        {hasCards &&
          cardRows.map((rowCards, rowIdx) => (
            <div
              key={`row-${rowIdx}`}
              className={`grid ${gridColsClass(rowCards.length)} gap-5 ${
                rowIdx > 0 ? "mt-6" : hasHTML || hasImage ? "mt-2" : ""
              }`}
            >
              {rowCards.map((card, ci) => (
                <SectionCard key={`card-${rowIdx}-${ci}`} card={card} />
              ))}
            </div>
          ))}

        {/* CTA */}
        {hasCTA && (
          <div className="mt-8">
            <CTAButton label={section.SectionCTA!.label!} link={section.SectionCTA!.link!} />
          </div>
        )}
      </div>
    </section>
  );
}

// ── Main Renderer ────────────────────────────────────────────────────────────

export function JsonPageRenderer({ data }: { data: PageJsonData }) {
  // Push hero data up to Layout's centralized hero
  useHeroOverride(
    data.HeroTitle || data.PageTitle
      ? {
          title: data.HeroTitle || data.PageTitle || "",
          subtitle: data.HeroSubtitle,
          badge: data.HeroBadge,
          image: data.HeroImage,
        }
      : null
  );

  // Sort sections by SectionNumber (supports decimals)
  const sortedSections = useMemo(
    () =>
      [...(data.PageSections || [])].sort(
        (a, b) => (a.SectionNumber ?? 0) - (b.SectionNumber ?? 0)
      ),
    [data.PageSections]
  );

  const hasRightCards =
    data.PageRightCards && data.PageRightCards.some((c) => hasContent(c.CardHTML));
  const hasParagraph = hasContent(data.ParagraphContentHTML);

  return (
    <div className="min-h-screen relative bg-slate-50">
      <div className="container mx-auto px-6 py-16 space-y-8 relative z-20">
        {/* Intro paragraph */}
        {hasParagraph && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="p-6 md:p-10">
              <div
                className="prose prose-lg prose-slate max-w-none [&>h1]:mt-6 [&>h1]:mb-3 [&>h2]:mt-5 [&>h2]:mb-2 [&>h3]:mt-4 [&>h3]:mb-2 [&>h4]:mt-3 [&>h4]:mb-1 [&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4"
                dangerouslySetInnerHTML={{ __html: data.ParagraphContentHTML! }}
              />
            </GlassCard>
          </motion.div>
        )}

        {/* Main layout: sections + optional right sidebar */}
        <div
          className={`${
            hasRightCards ? "grid grid-cols-1 lg:grid-cols-4 gap-8" : ""
          }`}
        >
          {/* Sections column */}
          <div className={hasRightCards ? "lg:col-span-3" : "w-full"}>
            {sortedSections.map((section, idx) => (
              <PageSection
                key={`sec-${section.SectionNumber}-${idx}`}
                section={section}
                index={idx}
              />
            ))}
          </div>

          {/* Right sidebar cards */}
          {hasRightCards && (
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-5">
                {data.PageRightCards!.filter((c) => hasContent(c.CardHTML))
                  .sort((a, b) => (a.CardNumber ?? 0) - (b.CardNumber ?? 0))
                  .map((card, idx) => (
                    <motion.div
                      key={`right-${card.CardNumber ?? idx}`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <GlassCard className="p-5 bg-sky-50/60 border-sky-100">
                        <div
                          className="prose prose-sm prose-sky max-w-none"
                          dangerouslySetInnerHTML={{ __html: card.CardHTML! }}
                        />
                      </GlassCard>
                    </motion.div>
                  ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}