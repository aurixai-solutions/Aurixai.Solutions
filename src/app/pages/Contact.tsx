import React, { useState, useEffect } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/button";
import { Mail, Phone, MapPin, Send, Loader2, CheckSquare, Square } from "lucide-react";
import { toast } from "sonner";
import { submitForm } from "../../lib/forms";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [pageContent, setPageContent] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/content.json');
        const data = await res.json();
        if (data && data.pages && data.pages.contact) {
          setPageContent(data.pages.contact);
        }
      } catch (e) {
        console.error("Failed to load page content", e);
      }
    };
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentPrivacy) {
      toast.error("Please agree to the Privacy Policy to continue.");
      return;
    }
    setLoading(true);

    try {
      const result = await submitForm({
        ...formData,
        consentMarketing,
        consentPrivacy,
        type: "contact",
        subject: "Contact Form Submission",
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setConsentMarketing(false);
      setConsentPrivacy(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactEmail = pageContent?.content?.email || "info@aurix.ai";
  const contactPhone = pageContent?.content?.phone || "+1 (555) 123-4567";
  const contactAddress =
    pageContent?.content?.address || "123 Innovation Drive, Tech Park, CA 94043";

  return (
    <div className="bg-slate-50 relative">
      <div className="container mx-auto px-6 py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Info */}
          <GlassCard className="lg:col-span-1 p-8 bg-sky-900 hover:bg-sky-900 text-white border-sky-800 shadow-2xl h-fit">
            <div>
              <h3 className="text-2xl font-bold mb-8">The Super-Cluster</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-sky-400 mt-1" />
                  <div>
                    <h5 className="font-semibold text-sky-100">HQ — Tacoma, WA</h5>
                    <p className="text-sky-200/80 text-sm">Pacific Northwest Operations Center</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-sky-400 mt-1" />
                  <div>
                    <h5 className="font-semibold text-sky-100">Strategy — Seattle, WA</h5>
                    <p className="text-sky-200/80 text-sm">Columbia Tower, Enterprise Strategy</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-sky-400 mt-1" />
                  <div>
                    <h5 className="font-semibold text-sky-100">Precision Services — Portland, OR</h5>
                    <p className="text-sky-200/80 text-sm">In-Person Certification &amp; Ops</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-sky-400 mt-1" />
                  <div>
                    <h5 className="font-semibold text-sky-100">Email</h5>
                    <p className="text-sky-200/80">{contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-sky-400 mt-1" />
                  <div>
                    <h5 className="font-semibold text-sky-100">Phone</h5>
                    <p className="text-sky-200/80">{contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Contact Form */}
          <GlassCard className="lg:col-span-2 p-8 md:p-12 bg-white hover:bg-white border-slate-200 shadow-xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">In-Person Certification Request</h2>
            <p className="text-slate-500 mb-8">We usually respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Consent checkboxes */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                {/* Marketing checkbox */}
                <button
                  type="button"
                  onClick={() => setConsentMarketing((v) => !v)}
                  className="flex items-start gap-3 w-full text-left group"
                >
                  <span className="mt-0.5 flex-shrink-0">
                    {consentMarketing ? (
                      <CheckSquare className="w-5 h-5 text-sky-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                    )}
                  </span>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    Yes, I would like to receive emails from Aurix AI with news, product updates,
                    event information and more.
                  </span>
                </button>

                {/* Privacy checkbox (required) */}
                <button
                  type="button"
                  onClick={() => setConsentPrivacy((v) => !v)}
                  className="flex items-start gap-3 w-full text-left group"
                >
                  <span className="mt-0.5 flex-shrink-0">
                    {consentPrivacy ? (
                      <CheckSquare className="w-5 h-5 text-sky-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                    )}
                  </span>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    By checking this box I agree that Aurix AI collects and processes my personal
                    data in accordance with the{" "}
                    <span className="text-sky-600 underline underline-offset-2">
                      Aurix AI Privacy Policy
                    </span>
                    . <span className="text-red-500 font-medium">*</span>
                  </span>
                </button>
                {!consentPrivacy && (
                  <p className="text-xs text-slate-400 pl-8">
                    Privacy Policy agreement is required to submit.
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={loading || !consentPrivacy}
                >
                  {loading ? (
                    <>
                      Sending... <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}