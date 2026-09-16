"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Code2, ArrowRight, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[1.5px] shadow-lg shadow-indigo-500/25">
            <div className="w-full h-full bg-[#080c14] rounded-[14px] overflow-hidden flex items-center justify-center">
              <Image
                src="/pulsebrief-logo.png"
                alt="PulseBrief Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover scale-110"
                priority
              />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#07090e] animate-pulse" />
          </div>

          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-2xl sm:text-[26px] tracking-tight text-white leading-none">
              Pulse<span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Brief</span>
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 tracking-wider uppercase backdrop-blur-sm">
              v1.2 Live
            </span>
          </div>
        </div>

        {/* Live Operational Status & Privacy Guarantee */}
        <div className="hidden md:flex items-center gap-5 text-xs text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Data Retention <strong className="text-emerald-400 font-semibold">• Ephemeral</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">In-Memory Neural Extraction</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById("sandbox");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Try Sandbox
          </button>

          <button
            onClick={onOpenBooking}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 active:scale-[0.98]"
          >
            <span>Book 5-Day MVP Build</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}
