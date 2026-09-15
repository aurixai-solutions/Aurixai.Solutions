import React, { useState } from "react";
import { Link } from "react-router";
import { cn } from "../../lib/utils";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { useGlassPanel } from "./GlassPanelContext";
import { WEB3FORMS_URL, WEB3FORMS_KEY } from "../../lib/forms";

const NEWSLETTER_URL = WEB3FORMS_URL;

const SOLUTIONS_LINKS = [
  { label: "NavTrax", path: "/solutions/navtrax" },
  { label: "Defog Fluidity", path: "/solutions/defog-fluidity" },
  { label: "Defog Shield", path: "/solutions/defog-shield" },
  { label: "Skylane.One Engineering", path: "/solutions/skylane-one" },
  { label: "Agenta.Red", path: "/solutions/agenta" },
];

export function Footer() {
  const glassPanel = useGlassPanel();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const socialLinks = { linkedin: "#", twitter: "#", facebook: "#" };

  return (
    <footer className={glassPanel ? "glass-footer" : "bg-slate-50 border-t border-slate-200"}>
      {glassPanel && <div className="glass-footer-shine" />}
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-sky-500/20 transition-all duration-300">
                <img src="/SiteMedia/logo.png" alt="AURIX AI" className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-3xl font-bold text-slate-900 whitespace-nowrap">
                AURIX <span className="text-sky-600">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pushing the boundaries of enterprise data governance, quality, and agentic frameworks. Transparency is our core.
            </p>
            <div className="flex gap-4 mt-4">
              <a href={socialLinks.linkedin} className="text-slate-400 hover:text-sky-600 transition-colors"><Linkedin size={20} /></a>
              <a href={socialLinks.twitter} className="text-slate-400 hover:text-sky-600 transition-colors"><Twitter size={20} /></a>
              <a href={socialLinks.facebook} className="text-slate-400 hover:text-sky-600 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-slate-900 mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {SOLUTIONS_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="hover:text-sky-600">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-sky-600">About Us</Link></li>
              <li><Link to="/industries" className="hover:text-sky-600">Industries</Link></li>
              <li><Link to="/contact" className="hover:text-sky-600">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-1 pr-[50px]">
            <h4 className="font-semibold text-slate-900 mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-600 mb-4">Subscribe to our newsletter for the latest AI insights.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setJoined(false); }}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
              <div className="flex items-center gap-3">
                <button
                  disabled={submitting}
                  onClick={async () => {
                    if (!email.trim() || !email.includes("@")) return;
                    setSubmitting(true);
                    try {
                      const res = await fetch(NEWSLETTER_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: "Aurix AI Solutions — Newsletter signup", from_name: "Aurix AI Solutions website", type: "newsletter", email: email.trim() }),
                      });
                      const data = await res.json();
                      if (data.success) setJoined(true);
                      else { console.error("Newsletter subscription error:", data.error); setJoined(true); }
                    } catch (err) {
                      console.error("Newsletter fetch error:", err);
                      setJoined(true);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {submitting ? "..." : "Join"}
                </button>
                {joined && <span className="text-emerald-600 text-sm font-semibold animate-in fade-in">Joined!</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Aurix AI Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/coming-soon" className="hover:text-slate-800">Privacy Policy</Link>
            <Link to="/coming-soon" className="hover:text-slate-800">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
