"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Playground } from "@/components/Playground";
import { OutputGrid } from "@/components/OutputGrid";
import { ConversionBanner } from "@/components/ConversionBanner";
import { SAMPLE_SCENARIOS } from "@/lib/sample-data";
import { AnalysisResponse } from "@/types/analysis";

export default function Home() {
  // Default to the first sample scenario (Founder Pitch)
  const defaultSample = SAMPLE_SCENARIOS[0];
  const [transcript, setTranscript] = useState(defaultSample.transcript);
  const [selectedSampleId, setSelectedSampleId] = useState(defaultSample.id);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(defaultSample.defaultAnalysis);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          sampleId: selectedSampleId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to extract analysis");
      }

      const result = await res.json();
      setAnalysisData(result);

      // Smooth scroll to output
      setTimeout(() => {
        const outputEl = document.getElementById("output-section");
        outputEl?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("Analysis error:", err);
      // Fallback gracefully to default sample analysis
      if (selectedSampleId) {
        const fallback = SAMPLE_SCENARIOS.find((s) => s.id === selectedSampleId);
        if (fallback) {
          setAnalysisData(fallback.defaultAnalysis);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSandbox = () => {
    const el = document.getElementById("sandbox");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
      <div>
        <Navbar onOpenBooking={() => setIsModalOpen(true)} />
        <main>
          <Hero onScrollToSandbox={scrollToSandbox} />
          <Playground
            transcript={transcript}
            setTranscript={setTranscript}
            selectedSampleId={selectedSampleId}
            setSelectedSampleId={setSelectedSampleId}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          <div id="output-section">
            <OutputGrid data={analysisData} isLoading={isLoading} />
          </div>
          <ConversionBanner
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </main>
      </div>

      {/* Footer & Developer Identity */}
      <footer className="border-t border-white/[0.08] bg-[#05070a] py-10 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#090d16] border border-white/10 flex items-center justify-center shrink-0">
              <Image
                src="/pulsebrief-logo.png"
                alt="PulseBrief Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200 text-sm">PulseBrief</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                  AI Engineering Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Engineered by <strong className="text-slate-300 font-medium">Ruthvik</strong> • Full-Stack AI MVP Development
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
            <a
              href="mailto:yemmeruthvik16@gmail.com"
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors group"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>yemmeruthvik16@gmail.com</span>
            </a>
            <span className="hidden sm:inline text-slate-700">•</span>
            <a
              href="https://cal.com/ruthvikyem/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors group"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>cal.com/ruthvikyem</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Data Retention • Ephemeral</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
