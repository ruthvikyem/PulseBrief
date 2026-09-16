"use client";

import React from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { Sparkles, ArrowDown, CheckCircle2, Zap, FileJson, Cpu } from "lucide-react";

interface HeroProps {
  onScrollToSandbox: () => void;
}

export function Hero({ onScrollToSandbox }: HeroProps) {
  return (
    <section className="relative w-full pt-16 pb-12 overflow-hidden flex flex-col items-center justify-center">
      {/* Aceternity Spotlight Background Layers */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#38bdf8" />
      <Spotlight className="top-10 left-full md:left-2/3" fill="#818cf8" />
      <Spotlight className="-top-20 right-0 md:-right-20" fill="#c084fc" />

      {/* Radial Gradient Ambient Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6 backdrop-blur-md shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>100% Ephemeral & Private • Zero Logs Stored • Auto-Purged Post Session</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Turn raw customer calls into structured{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            product specs in 5 seconds
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Safely process confidential calls, investor feedback, and internal roadmaps without privacy risk. 
          Everything runs <span className="text-white font-medium">ephemerally in-memory</span> with <span className="text-emerald-400 font-medium">zero data retention</span>, 
          generating <span className="text-white font-medium">prioritized sprint specs</span>, <span className="text-white font-medium">action checklists</span>, and <span className="text-white font-medium">Linear-ready JSON</span>.
        </p>

        {/* Value Proposition Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Data Retention (ZDR)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Sub-5s Neural Extraction</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <FileJson className="w-4 h-4 text-cyan-400" />
            <span>1-Click Linear & Markdown Export</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-violet-400" />
            <span>No AI Training on Inputs</span>
          </div>
        </div>

        {/* Hero Trigger Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToSandbox}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>Test the Interactive Sandbox</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
