import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Clock, Bell, Code2, Users, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

export function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const FEATURES = [
    {
      icon: BookOpen,
      title: "Comprehensive Documentation",
      desc: "Detailed guides, code examples, and best practices to help you get started quickly.",
    },
    {
      icon: Code2,
      title: "Code Samples & SDKs",
      desc: "Production-ready code in multiple languages to accelerate your integration.",
    },
    {
      icon: Users,
      title: "Community Support",
      desc: "Join our developer community for questions, discussions, and collaboration.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <PageHero
        title="Something Great Is Coming"
        subtitle="We're working hard to bring you this new capability. Subscribe below to be notified when it launches."
        badge="Coming Soon"
        image={MOUNTAIN.alpinistRidgeWalk}
      />

      {/* Newsletter */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-2">Get Notified at Launch</h3>
            <p className="text-slate-500 text-sm mb-6">Be the first to know when we launch this feature.</p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 text-emerald-600 font-semibold">
                <CheckCircle className="w-6 h-6" />
                <span>You're on the list! We'll notify you at launch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-all whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-slate-100/60 border-y border-slate-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl font-bold text-slate-900 text-center mb-12"
          >
            What to Expect
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-sky-300 hover:shadow-md transition-all shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4">
                  <feat.icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-slate-900 font-bold mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Our Other Solutions</h2>
          <p className="text-slate-600 text-lg mb-10">
            While you wait, discover what Aurix can do for your organisation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/developer-ecosystem"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-sky-500/20"
            >
              Developer Ecosystem <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-full transition-all hover:shadow-sm"
            >
              View All Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}