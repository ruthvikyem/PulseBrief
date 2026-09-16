"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#05070a] py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-md overflow-hidden bg-[#090d16] border border-white/10 flex items-center justify-center">
              <Image
                src="/pulsebrief-logo.png"
                alt="PulseBrief Logo"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-slate-300">PulseBrief</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Zero Data Retention (Ephemeral)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>🔒 All data purged on session close</span>
            <span>•</span>
            <span>Zero database storage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
