"use client";

import React, { useState } from "react";
import { AnalysisResponse, ActionItem } from "@/types/analysis";
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Download,
  AlertCircle,
  Clock,
  Layers,
  Sparkles,
  FileCode2,
  FileText,
  Workflow,
  TrendingUp,
  Cpu,
  User,
  Calendar,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";

interface OutputGridProps {
  data: AnalysisResponse | null;
  isLoading: boolean;
}

export function OutputGrid({ data, isLoading }: OutputGridProps) {
  const [activeExportTab, setActiveExportTab] = useState<"json" | "markdown" | "linear">("markdown");
  const [copied, setCopied] = useState(false);
  const [actionItems, setActionItems] = useState<ActionItem[]>(data?.action_items || []);

  // Update local action items when data changes
  React.useEffect(() => {
    if (data?.action_items) {
      setActionItems(data.action_items.map(item => ({ ...item, completed: false })));
    }
  }, [data]);

  const toggleTask = (id: string) => {
    const updated = actionItems.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setActionItems(updated);

    // If all tasks are completed, trigger celebration confetti!
    const allDone = updated.every((i) => i.completed);
    if (allDone && updated.length > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#c084fc", "#34d399"],
      });
    }
  };

  const completedCount = actionItems.filter((i) => i.completed).length;
  const progressPercent = actionItems.length > 0 ? Math.round((completedCount / actionItems.length) * 100) : 0;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#38bdf8", "#818cf8"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl glass-panel border border-white/[0.08] text-center">
          <div className="relative w-16 h-16 flex items-center justify-center mb-5">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-cyan-400 animate-spin" />
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-white">Extracting & Structuring Product Architecture...</h3>
          <p className="text-xs text-slate-400 mt-2 max-w-md">
            Analyzing dialogue semantics, extracting critical blockers, assigning deadline estimates, and synthesizing JSON schema.
          </p>

          {/* Skeleton Loaders */}
          <div className="w-full max-w-3xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
            <div className="h-32 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title & Engine Metadata Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Extraction Complete
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              {data.engine}
            </span>
            <span className="hidden md:inline-flex text-[11px] text-emerald-300/90 items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/20">
              🛡️ Ephemeral: Deletes on tab close
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">{data.title}</h2>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-slate-300">
            Sprint Est: <strong className="text-cyan-400 font-medium">{data.key_metrics.estimated_mvp_days} Days</strong>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-slate-300">
            Clarity Score: <strong className="text-emerald-400 font-medium">{data.key_metrics.clarity_score}%</strong>
          </div>
        </div>
      </div>

      {/* Main 3-Column / 2x2 Structured Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CARD 1: Executive Summary & Sentiment (Col 1-12 or Left Hero Card) */}
        <div className="lg:col-span-12 rounded-2xl glass-card p-6 border border-white/[0.08] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-base">Executive Synthesis & Stakeholder Sentiment</h3>
            </div>
            
            {/* Tone & Urgency Chips */}
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                data.sentiment.urgency === "Critical"
                  ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                  : data.sentiment.urgency === "High"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
              }`}>
                Urgency: {data.sentiment.urgency}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                Tone: {data.sentiment.tone}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {data.summary}
          </p>
          <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>Stakeholder Vibe:</strong> {data.sentiment.client_vibe}</span>
          </div>
        </div>

        {/* CARD 2: Key Requirements & Core Problems (Left 6 Cols) */}
        <div className="lg:col-span-6 rounded-2xl glass-card p-6 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base">1. Key Requirements & Problems</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {data.core_problems.length} Problem{data.core_problems.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Problem Statements */}
            <div className="space-y-3.5">
              {data.core_problems.map((prob) => (
                <div
                  key={prob.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-slate-200">
                      {prob.problem}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        prob.severity === "Critical"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : prob.severity === "High"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                      }`}
                    >
                      {prob.severity}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-2 flex items-start gap-1.5">
                    <span className="text-cyan-400 font-semibold shrink-0">Solution:</span>
                    <span>{prob.proposed_solution}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Impact Area: <span className="text-slate-300 font-medium">{prob.impact_area}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Spec Matrix */}
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Feature Deliverables Spec</span>
              </h4>
              <div className="space-y-2.5">
                {data.features_requested.map((feat) => (
                  <div key={feat.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{feat.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                        {feat.estimated_effort}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Interactive Action Item Checklist (Right 6 Cols) */}
        <div className="lg:col-span-6 rounded-2xl glass-card p-6 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base">2. Action Item Checklist</h3>
              </div>
              <span className="text-xs text-cyan-400 font-medium">
                {completedCount} of {actionItems.length} Completed ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-white/[0.05] mb-5 overflow-hidden border border-white/[0.05]">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Interactive Tasks */}
            <div className="space-y-3">
              {actionItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleTask(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 group ${
                    item.completed
                      ? "bg-emerald-950/20 border-emerald-500/30 opacity-70"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]"
                  }`}
                >
                  <button className="mt-0.5 shrink-0 text-cyan-400">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`text-xs font-medium ${
                        item.completed ? "line-through text-slate-500" : "text-slate-200"
                      }`}
                    >
                      {item.task}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        <span>{item.owner_role}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{item.deadline}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
            <p className="text-[11px] text-slate-500">
              💡 Tip: Click any task to toggle checkmark. Reaching 100% fires celebratory confetti!
            </p>
          </div>
        </div>

        {/* CARD 4: Parsed JSON / Markdown / Linear Export Hub (Full Width 12 Cols) */}
        <div className="lg:col-span-12 rounded-2xl glass-card p-6 border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">3. Production Export Hub & Schemas</h3>
                <p className="text-xs text-slate-400">1-click copy to clipboard or download directly for your engineering backlog.</p>
              </div>
            </div>

            {/* Export Tabs Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <button
                onClick={() => setActiveExportTab("markdown")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  activeExportTab === "markdown"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Markdown Spec</span>
              </button>
              <button
                onClick={() => setActiveExportTab("json")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  activeExportTab === "json"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>JSON Schema</span>
              </button>
              <button
                onClick={() => setActiveExportTab("linear")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  activeExportTab === "linear"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>Linear Issues</span>
              </button>
            </div>
          </div>

          {/* Active Content Window */}
          <div className="relative">
            <pre className="p-4 rounded-xl bg-[#090d16] border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto max-h-72 leading-relaxed">
              {activeExportTab === "markdown" && data.markdown_spec}
              {activeExportTab === "json" && JSON.stringify(data, null, 2)}
              {activeExportTab === "linear" && data.linear_format}
            </pre>

            {/* Floating Action Controls */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={() => {
                  const content =
                    activeExportTab === "markdown"
                      ? data.markdown_spec
                      : activeExportTab === "json"
                      ? JSON.stringify(data, null, 2)
                      : data.linear_format;
                  handleCopy(content);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-medium shadow-lg transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy {activeExportTab.toUpperCase()}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (activeExportTab === "markdown") {
                    handleDownload(data.markdown_spec, "pulsebrief-spec.md", "text/markdown");
                  } else if (activeExportTab === "json") {
                    handleDownload(JSON.stringify(data, null, 2), "pulsebrief-spec.json", "application/json");
                  } else {
                    handleDownload(data.linear_format, "pulsebrief-linear.txt", "text/plain");
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 text-xs font-medium transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
