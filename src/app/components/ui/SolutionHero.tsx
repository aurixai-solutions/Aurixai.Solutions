import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { MOUNTAIN } from "../heroImages";

export interface CapabilityLink {
  label: string;
  href: string;      // anchor id (e.g. "#overview") or full path
  icon?: React.ReactNode;
}

interface SolutionHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
  capabilities?: CapabilityLink[];
}

/**
 * SolutionHero
 * Light-themed hero with a "Key Capabilities" sidebar panel on the right.
 * Hero text group is shifted 75 px down from the container midpoint
 * (baseline 25 px + 50 px per design spec).
 */
export function SolutionHero({
  badge = "Aurix AI Solutions",
  title,
  subtitle,
  description,
  image,
  ctaLabel = "Request Demo",
  ctaHref = "/demo",
  capabilities = [],
}: SolutionHeroProps) {
  const bg =
    image ||
    MOUNTAIN.iceClimbingFrozenWaterfall;

  return (
    <section className="relative min-h-[560px] flex items-center overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('${bg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-slate-900/70 to-slate-900/90" />
        {/* Glassmorphic overlay tint */}
        <div className="absolute inset-0 bg-sky-800/10 backdrop-blur-[2px]" />
      </div>

      {/* Content — shifted 75 px down */}
      <div
        className="relative z-10 container mx-auto px-6 py-24"
        style={{ transform: "translateY(75px)" }}
      >
        <div className={`grid gap-8 items-start ${capabilities.length > 0 ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"}`}>

          {/* ── Left: main text ── */}
          <motion.div
            className={capabilities.length > 0 ? "lg:col-span-2" : "max-w-3xl"}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {badge && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-400/20 backdrop-blur-md border border-sky-400/30 text-sky-200 text-sm font-semibold mb-6">
                {badge}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-lg md:text-xl text-sky-200 font-medium mb-4">
                {subtitle}
              </p>
            )}

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              {description}
            </p>

            <Link
              to={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-500/30 hover:shadow-sky-400/40"
            >
              {ctaLabel}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* ── Right: Key Capabilities card ── */}
          {capabilities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-xl">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-sky-400 rounded-full" />
                  Key Capabilities
                </h3>
                <ul className="space-y-2">
                  {capabilities.map((cap, i) => (
                    <li key={i}>
                      <a
                        href={cap.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-all text-sm group"
                      >
                        {cap.icon && (
                          <span className="text-sky-400 flex-shrink-0">{cap.icon}</span>
                        )}
                        <span className="flex-1">{cap.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors flex-shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}