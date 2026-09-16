"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Shield,
  Rocket,
  CheckCircle,
  ExternalLink,
  Clock,
  DollarSign,
  AlertCircle,
  Mail,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ConversionBannerProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export function ConversionBanner({ isModalOpen, setIsModalOpen }: ConversionBannerProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState("");
  const [projectIdea, setProjectIdea] = useState("");
  const [timeline, setTimeline] = useState("⚡ 5–7 Days (Rapid MVP)");
  const [budget, setBudget] = useState("$700 – $2,000 (Core MVP)");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam trap

  const CAL_URL = "https://cal.com/ruthvikyem/15min";

  const handleSubmitScope = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side Validation
    const cleanContact = email.trim();
    const cleanPitch = projectIdea.trim();

    if (!cleanContact) {
      setErrorMessage("Please enter your email or Telegram handle so we can send the spec.");
      return;
    }

    if (cleanPitch.length < 10) {
      setErrorMessage("Please provide a little more detail about your MVP idea (minimum 10 characters).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanContact,
          projectIdea: cleanPitch,
          timeline,
          budget,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit proposal request.");
      }

      setSubmittedLeadId(data.leadId || "PB-CONFIRMED");
      setFormSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.5 },
        colors: ["#38bdf8", "#818cf8", "#34d399", "#c084fc"],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try booking directly on Cal.com.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setIsModalOpen(false);
    setFormSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <>
      {/* Bottom Conversion Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-[#07090e] border border-indigo-500/20 p-8 sm:p-10 md:p-12 text-center shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <Rocket className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rapid AI MVP Engineering</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Need a Production-Grade AI MVP Shipped in{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                5 to 7 Days?
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              PulseBrief was built and deployed in under 48 hours using agentic dev workflows. 
              We engineer and launch dedicated, high-converting SaaS utilities, AI data pipelines, and full-stack MVPs 
              for pre-seed and seed-stage founders before they pitch investors.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 15-Min Scoping Call (Cal.com)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Submit Async MVP Pitch</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Lock-in Full Code Ownership</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Production Next.js & Tailwind Stack</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-indigo-400" />
                <span>5-7 Day Fixed SLA Delivery</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bulletproof Scoping Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl glass-panel p-6 sm:p-8 border border-white/[0.1] shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleResetModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              ✕
            </button>

            {!formSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Scope Your 5-Day MVP Build</h3>
                </div>
                <p className="text-xs text-slate-400 mb-5">
                  Choose instant calendar booking or submit your proposal details below for a fixed-timeline architecture spec within 4 hours.
                </p>

                {/* Direct Cal.com Fast-Track Banner */}
                <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900/60 border border-cyan-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Instant Live Booking (Recommended)</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Lock in a 15-minute architecture review with Ruthvik directly on Cal.com.
                      </p>
                    </div>
                    <a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/20 active:scale-[0.98]"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Open Cal.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-white/[0.08] w-full" />
                  <span className="bg-[#0e131f] px-3 text-[10px] uppercase font-bold tracking-wider text-slate-500 shrink-0">
                    or submit async requirements
                  </span>
                  <div className="border-t border-white/[0.08] w-full" />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Scoping Form */}
                <form onSubmit={handleSubmitScope} className="space-y-4">
                  {/* Honeypot Spam Trap (Hidden) */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                  />

                  {/* Contact Handle */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Email / Telegram Handle <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="e.g. founder@startup.com or @telegram_handle"
                      className="w-full rounded-xl bg-[#090d16] border border-white/[0.1] px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Delivery Timeline Options */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Desired Timeline</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "⚡ 5–7 Days (Rapid MVP)",
                        "📅 2 Weeks (Standard)",
                        "🚀 Flexible / Exploring",
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeline(t)}
                          className={`px-2.5 py-2 rounded-lg text-[11px] font-medium border transition-all text-center ${
                            timeline === t
                              ? "bg-indigo-600/30 border-indigo-500/60 text-white shadow-inner"
                              : "bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Budget Tier */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Target Budget Tier</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "$700 – $2,000 (Core MVP)",
                        "$3,000 – $4,000 (Full Stack)",
                        "Custom / Dedicated Build",
                      ].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`px-2.5 py-2 rounded-lg text-[11px] font-medium border transition-all text-center ${
                            budget === b
                              ? "bg-emerald-600/30 border-emerald-500/60 text-white shadow-inner"
                              : "bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Concept Textarea */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        What MVP do you want to build? <span className="text-cyan-400">*</span>
                      </label>
                      <span className="text-[10px] text-slate-500">
                        {projectIdea.length} chars (min 10)
                      </span>
                    </div>
                    <textarea
                      required
                      rows={3}
                      value={projectIdea}
                      onChange={(e) => {
                        setProjectIdea(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="e.g. AI-driven financial data extractor for real estate investors with Stripe billing, user auth, and PDF export..."
                      className="w-full rounded-xl bg-[#090d16] border border-white/[0.1] p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <span>Submitting Proposal Spec...</span>
                    ) : (
                      <>
                        <span>Submit Proposal Request (4-Hour Turnaround)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Confirmation Screen */
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-cyan-300 mb-2">
                  <span>Reference ID:</span>
                  <strong>{submittedLeadId}</strong>
                </div>
                <h3 className="text-xl font-extrabold text-white">Scoping Request Confirmed!</h3>
                <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  We received your proposal for <strong>{email}</strong>. Our lead architect will review your concept and deliver a fixed-scope technical roadmap within 4 hours.
                </p>

                {/* Immediate Cal.com Fast Track */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-indigo-950/30 border border-cyan-500/25">
                  <p className="text-xs font-semibold text-white mb-2">Want to jump straight to calendar booking?</p>
                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/35 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Select Time Slot on Cal.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={handleResetModal}
                  className="mt-6 px-6 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
