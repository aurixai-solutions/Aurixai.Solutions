import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Video, PlayCircle, ArrowRight } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const MEDIA_ITEMS = [
  {
    type: "Product Demo",
    title: "Aurix Platform Overview — 3-Minute Tour",
    desc: "See how Lattice™, Prism™, and SENTINEL™ work together to deliver AI-native enterprise security and governance.",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=80",
    badge: "Product Demo",
  },
  {
    type: "Customer Story",
    title: "How a Fortune 500 Bank Cut Fraud Losses 78% with Lattice™",
    desc: "A leading financial services firm replaced three legacy SIEM tools with Aurix Lattice™ and achieved industry-leading detection accuracy.",
    thumb: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=640&q=80",
    badge: "Case Study",
  },
  {
    type: "Thought Leadership",
    title: "The Human Interface™ Philosophy Explained",
    desc: "Aurix founder and CTO explains why AI transparency isn't optional — and how Clarity™ makes every decision auditable.",
    thumb: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=640&q=80",
    badge: "Talk",
  },
  {
    type: "Product Demo",
    title: "PEN Data Mashup: 150+ Live External APIs in 60 Seconds",
    desc: "Watch PEN connect to OFAC sanctions, USPS address validation, and D&B all in a single pipeline — live.",
    thumb: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=640&q=80",
    badge: "Product Demo",
  },
  {
    type: "Webinar",
    title: "AI Hallucination Mitigation in Production — Panel Discussion",
    desc: "Security architects from three enterprise deployments share how they use Aurix's Parallel Sentinel Architecture to catch hallucinations before they cause damage.",
    thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&q=80",
    badge: "Webinar",
  },
  {
    type: "Product Demo",
    title: "PHANTOM™ — Autonomous Penetration Testing in Action",
    desc: "Live demonstration of PHANTOM™ deploying scout agents across a simulated enterprise network, discovering vulnerabilities in real time.",
    thumb: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=640&q=80",
    badge: "Product Demo",
  },
];

const BADGE_COLORS: Record<string, string> = {
  "Product Demo":   "bg-sky-500/20 text-sky-300 border-sky-500/30",
  "Case Study":     "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Talk":           "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Webinar":        "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export function AdvertisementsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <PageHero
        title="Advertisements & Media"
        subtitle="Watch our latest product demos, customer stories, and thought leadership content."
        badge="Media"
        image={MOUNTAIN.peakSunsetGolden}
      />

      {/* Video Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEDIA_ITEMS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-sky-300 transition-all duration-300 hover:shadow-lg"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img src={item.thumb} alt={item.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-sky-500/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${BADGE_COLORS[item.badge] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                      {item.badge}
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-6">
                  <h3 className="text-slate-900 font-bold text-lg leading-snug mb-3 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center"
          >
            <Video className="w-12 h-12 text-sky-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-3">More Content Coming Soon</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Our media library is continuously updated with new demos, case studies, and industry talks.
              Schedule a live personalized demo to see Aurix in action.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready for a Personalised Demo?</h2>
          <p className="text-slate-500 mb-8">See Aurix in action with a live, personalized demonstration tailored to your industry and use case.</p>
          <Link to="/demo" className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-full transition-all shadow-md">
            Request Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}