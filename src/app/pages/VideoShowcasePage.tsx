import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, X, Maximize2 } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const CATEGORIES = ["All", "Platform Overview", "Data Governance", "Security", "Tutorials", "Case Studies"];

const PLACEHOLDER_VIDEOS = [
  { id: "v1", category: "Platform Overview", title: "Aurix AI Platform Overview", desc: "A comprehensive tour of the Aurix platform covering Lattice™, Prism™, SENTINEL™, and more.", duration: "8 min", thumb: null },
  { id: "v2", category: "Data Governance", title: "Data Governance Fundamentals", desc: "Learn the foundational concepts of enterprise data governance and how Aurix automates compliance.", duration: "12 min", thumb: null },
  { id: "v3", category: "Security", title: "Lattice™ Threat Detection in Action", desc: "Real-time threat detection demo from initial anomaly to automated containment with full explainability.", duration: "10 min", thumb: null },
  { id: "v4", category: "Tutorials", title: "Getting Started with Prism™", desc: "Step-by-step guide to configuring your first data quality rules and automated remediation workflows.", duration: "15 min", thumb: null },
  { id: "v5", category: "Case Studies", title: "Healthcare Data Compliance", desc: "See how a major healthcare system achieved HIPAA compliance in 6 weeks using Aurix Prism™.", duration: "7 min", thumb: null },
  { id: "v6", category: "Platform Overview", title: "SWARM Autonomous Agents Demo", desc: "Watch SWARM autonomous agents conduct a security assessment in a simulated enterprise environment.", duration: "14 min", thumb: null },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Platform Overview": "text-sky-600 bg-sky-50",
  "Data Governance": "text-violet-600 bg-violet-50",
  "Security": "text-red-600 bg-red-50",
  "Tutorials": "text-emerald-600 bg-emerald-50",
  "Case Studies": "text-amber-600 bg-amber-50",
};

export function VideoShowcasePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalVideo, setModalVideo] = useState<typeof PLACEHOLDER_VIDEOS[0] | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const filtered = activeCategory === "All"
    ? PLACEHOLDER_VIDEOS
    : PLACEHOLDER_VIDEOS.filter(v => v.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title="Data Theater"
        subtitle="Watch and learn — product demos, tutorials, case studies, and educational content from the Aurix team"
        image={MOUNTAIN.verticalGraniteCliff}
      />

      {/* Video Library */}
      <section id="videos" className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-7xl">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-sky-600 text-white border-sky-600 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Thumbnail placeholder */}
                <div
                  className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer group"
                  onClick={() => setModalVideo(video)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${CATEGORY_COLORS[video.category] || "text-slate-600 bg-slate-100"}`}>
                    {video.category}
                  </span>
                  <h3 className="font-bold text-slate-900 mb-2 leading-snug">{video.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{video.desc}</p>
                  <button
                    onClick={() => setModalVideo(video)}
                    className="mt-4 flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm font-medium transition-colors"
                  >
                    <Play className="w-4 h-4" /> Watch Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">No videos in this category yet.</p>
              <button onClick={() => setActiveCategory("All")} className="mt-4 text-sky-600 hover:underline text-sm">View all videos</button>
            </div>
          )}
        </div>
      </section>

      {/* Video modal */}
      {modalVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => { setModalVideo(null); setIsMaximized(false); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
              isMaximized ? "w-full h-full max-w-none rounded-none" : "max-w-2xl w-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative ${
              isMaximized ? "flex-1" : "h-72"
            }`} style={isMaximized ? { height: "calc(100% - 100px)" } : {}}>
              <div className="text-center text-white">
                <Play className="w-12 h-12 mx-auto mb-3 opacity-60" />
                <p className="text-slate-400 text-sm">Video coming soon</p>
              </div>
              {/* Controls: Maximize + Close */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setIsMaximized(v => !v)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setModalVideo(null); setIsMaximized(false); }}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-slate-900 text-xl mb-2">{modalVideo.title}</h3>
              <p className="text-slate-500 text-sm">{modalVideo.desc}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}