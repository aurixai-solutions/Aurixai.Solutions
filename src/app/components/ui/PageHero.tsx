import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { MOUNTAIN } from "../heroImages";
import { useLayoutHero } from "../LayoutHeroContext";
import { heroImage } from "../optimizeImage";

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  image?: string;
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Legacy: single React node button */
  button?: React.ReactNode;
  /** Data-driven button 1 (label + href) */
  button1?: { label: string; href: string };
  /** Data-driven button 2 (label + href) */
  button2?: { label: string; href: string };
}

/**
 * Raw hero renderer — always renders. Used by Layout.tsx directly.
 */
export function PageHeroInner({ title, subtitle, badge, image, className, breadcrumbs, button, button1, button2 }: PageHeroProps) {
  const bgImage = heroImage(image || MOUNTAIN.alpinePeakCerulean);

  const hasButtons = !!(button1 || button2 || (button && !button1 && !button2));

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className || ""}`}
      style={{ height: "clamp(220px, 35vh, 340px)" }}
    >
      {/* Static Background — no parallax, pinned in place */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90" />
      </div>

      {/* Content — shifted 50px higher than centre */}
      <div className="container relative z-10 px-6 text-center" style={{ marginTop: "-50px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto flex flex-col items-center"
          style={{ maxWidth: "56rem" }}
        >
          {breadcrumbs ? (
            <div className="mb-4">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          ) : (
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/30 text-sky-200 text-sm font-medium">
              {badge || "Aurix AI Solutions"}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p
              className="text-lg md:text-xl text-slate-200 leading-relaxed font-light mx-auto"
              style={{ maxWidth: "822px" }}
            >
              {subtitle}
            </p>
          )}

          {/* Data-driven buttons (from hero config / KV store) */}
          {(button1 || button2) && (
            <div className="flex flex-wrap gap-4 justify-center mt-5">
              {button1 && (
                <Link
                  to={button1.href}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-lg"
                >
                  {button1.label}
                </Link>
              )}
              {button2 && (
                <Link
                  to={button2.href}
                  className="px-6 py-3 rounded-xl font-semibold text-sky-100 border border-white/25 hover:bg-white/10 transition-colors"
                >
                  {button2.label}
                </Link>
              )}
            </div>
          )}

          {/* Legacy React-node button */}
          {button && !button1 && !button2 && (
            <div className="mt-5">
              {button}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Context-aware wrapper — returns null if Layout already rendered the hero.
 * Individual pages import this; Layout imports PageHeroInner directly.
 */
export function PageHero(props: PageHeroProps) {
  const { active } = useLayoutHero();
  if (active) return null;
  return <PageHeroInner {...props} />;
}