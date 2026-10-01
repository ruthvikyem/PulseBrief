"use client";

import React, { useState, useEffect } from "react";
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
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Flag,
  Share2,
  SlidersHorizontal,
  Kanban,
  ListFilter,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  Folder,
  Tag,
  Paperclip,
  PhoneCall,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";

interface OutputGridProps {
  data: AnalysisResponse | null;
  isLoading: boolean;
}

type ViewMode = "list" | "board" | "doc" | "metrics" | "export";
type TaskStatus = "todo" | "in_progress" | "in_review" | "done";

interface WorkspaceTask extends ActionItem {
  status: TaskStatus;
  category?: string;
  aiSummarySnippet?: string;
}

export function OutputGrid({ data, isLoading }: OutputGridProps) {
  const [activeView, setActiveView] = useState<ViewMode>("list");
  const [activeExportTab, setActiveExportTab] = useState<"json" | "markdown" | "linear">("markdown");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Tasks with ClickUp statuses
  const [tasks, setTasks] = useState<WorkspaceTask[]>([]);

  // Synchronize tasks when new analysis data arrives
  useEffect(() => {
    if (data?.action_items) {
      const mappedTasks: WorkspaceTask[] = data.action_items.map((item, idx) => {
        let defaultStatus: TaskStatus = "todo";
        if (idx === 0) defaultStatus = "in_progress";
        else if (idx === 1 && item.priority === "High") defaultStatus = "todo";
        else if (idx === 2) defaultStatus = "in_review";

        return {
          ...item,
          status: defaultStatus,
          category: idx % 2 === 0 ? "Engineering" : "Product & UX",
          aiSummarySnippet: `Extracted requirement for ${item.owner_role.split("/")[0].trim()} with ${item.priority} urgency.`,
        };
      });
      setTasks(mappedTasks);
    }
  }, [data]);

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: newStatus,
          completed: newStatus === "done",
        };
      }
      return t;
    });
    setTasks(updated);

    // If all tasks are done, trigger celebratory confetti!
    if (updated.length > 0 && updated.every((t) => t.status === "done")) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#7b68ee", "#38bdf8", "#34d399", "#fbbf24"],
      });
    }
  };

  const handleToggleCheck = (taskId: string) => {
    const current = tasks.find((t) => t.id === taskId);
    if (!current) return;
    const nextStatus: TaskStatus = current.status === "done" ? "todo" : "done";
    updateTaskStatus(taskId, nextStatus);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#7b68ee", "#38bdf8"],
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

  // Filter tasks based on search
  const filteredTasks = tasks.filter(
    (t) =>
      t.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.owner_role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.priority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in_progress");
  const inReviewTasks = filteredTasks.filter((t) => t.status === "in_review");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  const completedCount = tasks.filter((t) => t.status === "done").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl glass-panel border border-white/[0.08] text-center">
          <div className="relative w-16 h-16 flex items-center justify-center mb-5">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-[#7b68ee] animate-spin" />
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-white">Synthesizing ClickUp Sprint Workspace...</h3>
          <p className="text-xs text-slate-400 mt-2 max-w-md">
            Organizing conversational backlog into grouped status lists, Kanban columns, and PRD specifications.
          </p>

          <div className="w-full max-w-3xl mt-8 space-y-3">
            <div className="h-12 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
            <div className="h-12 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
            <div className="h-12 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ClickUp Main Workspace Shell */}
      <div className="rounded-2xl glass-panel border border-white/[0.1] shadow-2xl overflow-hidden bg-[#0a0d16]/90 backdrop-blur-xl">
        
        {/* 1. ClickUp Top Breadcrumb & Actions Bar */}
        <div className="px-5 py-4 border-b border-white/[0.08] bg-[#07090e]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Breadcrumb Hierarchy */}
          <div className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 font-medium border border-white/[0.06]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>PulseBrief Software</span>
            </span>
            <span>/</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Folder className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sprints</span>
            </span>
            <span>/</span>
            <span className="flex items-center gap-1 text-white font-semibold">
              <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate max-w-[240px] sm:max-w-md">{data.title}</span>
            </span>
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleCopy(data.markdown_spec)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Share Spec</span>
            </button>

            {/* ClickUp Style Purple Action Button */}
            <button
              onClick={() => {
                const newTask: WorkspaceTask = {
                  id: `custom-${Date.now()}`,
                  task: "New sprint task item",
                  owner_role: "Full-Stack Dev",
                  deadline: "Next Sprint",
                  priority: "High",
                  status: "todo",
                  completed: false,
                  aiSummarySnippet: "User-added custom task item.",
                };
                setTasks([newTask, ...tasks]);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#7b68ee] hover:bg-[#6c58e8] shadow-md shadow-[#7b68ee]/30 transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* 2. ClickUp Views Tab Navigation */}
        <div className="px-5 pt-3 pb-0 border-b border-white/[0.08] bg-[#090d16]/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveView("list")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeView === "list"
                  ? "border-[#7b68ee] text-white bg-white/[0.03]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ListFilter className="w-4 h-4 text-cyan-400" />
              <span>List View</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/[0.06] text-slate-300 font-mono">
                {tasks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveView("board")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeView === "board"
                  ? "border-[#7b68ee] text-white bg-white/[0.03]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Kanban className="w-4 h-4 text-indigo-400" />
              <span>Board (Kanban)</span>
            </button>

            <button
              onClick={() => setActiveView("doc")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeView === "doc"
                  ? "border-[#7b68ee] text-white bg-white/[0.03]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-4 h-4 text-violet-400" />
              <span>PRD Document</span>
            </button>

            <button
              onClick={() => setActiveView("metrics")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeView === "metrics"
                  ? "border-[#7b68ee] text-white bg-white/[0.03]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Executive Radar</span>
            </button>

            <button
              onClick={() => setActiveView("export")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeView === "export"
                  ? "border-[#7b68ee] text-white bg-white/[0.03]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Workflow className="w-4 h-4 text-amber-400" />
              <span>Export Hub</span>
            </button>
          </div>

          {/* Search Filter Bar */}
          <div className="flex items-center gap-2 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search backlog..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-[#07090e] border border-white/[0.08] text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#7b68ee] w-36 sm:w-48"
              />
            </div>

            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400">
              <span>Sprint Completion:</span>
              <strong className="text-cyan-400 font-semibold">{progressPercent}%</strong>
            </div>
          </div>
        </div>

        {/* 3. VIEW 1: CLICKUP-STYLE GROUPED LIST VIEW */}
        {activeView === "list" && (
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* GROUP 1: In Progress */}
            <ClickUpTaskGroup
              groupKey="in_progress"
              title="In Progress"
              badgeColor="bg-blue-500/20 text-blue-300 border-blue-500/30"
              indicatorDot="bg-blue-400"
              tasks={inProgressTasks}
              isCollapsed={collapsedGroups["in_progress"]}
              onToggleCollapse={() => toggleGroup("in_progress")}
              onToggleCheck={handleToggleCheck}
              onStatusChange={updateTaskStatus}
            />

            {/* GROUP 2: In Review / High Priority */}
            <ClickUpTaskGroup
              groupKey="in_review"
              title="In Review & Testing"
              badgeColor="bg-amber-500/20 text-amber-300 border-amber-500/30"
              indicatorDot="bg-amber-400"
              tasks={inReviewTasks}
              isCollapsed={collapsedGroups["in_review"]}
              onToggleCollapse={() => toggleGroup("in_review")}
              onToggleCheck={handleToggleCheck}
              onStatusChange={updateTaskStatus}
            />

            {/* GROUP 3: To Do / Backlog */}
            <ClickUpTaskGroup
              groupKey="todo"
              title="To Do (Sprint Backlog)"
              badgeColor="bg-slate-500/20 text-slate-300 border-slate-500/30"
              indicatorDot="bg-slate-400"
              tasks={todoTasks}
              isCollapsed={collapsedGroups["todo"]}
              onToggleCollapse={() => toggleGroup("todo")}
              onToggleCheck={handleToggleCheck}
              onStatusChange={updateTaskStatus}
            />

            {/* GROUP 4: Done */}
            {doneTasks.length > 0 && (
              <ClickUpTaskGroup
                groupKey="done"
                title="Done"
                badgeColor="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                indicatorDot="bg-emerald-400"
                tasks={doneTasks}
                isCollapsed={collapsedGroups["done"]}
                onToggleCollapse={() => toggleGroup("done")}
                onToggleCheck={handleToggleCheck}
                onStatusChange={updateTaskStatus}
              />
            )}
          </div>
        )}

        {/* 4. VIEW 2: INTERACTIVE KANBAN BOARD VIEW */}
        {activeView === "board" && (
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-w-[780px]">
              
              {/* Kanban Column: To Do */}
              <KanbanColumn
                title="To Do"
                headerColor="text-slate-300"
                count={todoTasks.length}
                tasks={todoTasks}
                onAdvance={(id) => updateTaskStatus(id, "in_progress")}
                advanceLabel="Move to In Progress →"
              />

              {/* Kanban Column: In Progress */}
              <KanbanColumn
                title="In Progress"
                headerColor="text-blue-400"
                count={inProgressTasks.length}
                tasks={inProgressTasks}
                onAdvance={(id) => updateTaskStatus(id, "in_review")}
                advanceLabel="Move to Review →"
              />

              {/* Kanban Column: In Review */}
              <KanbanColumn
                title="In Review"
                headerColor="text-amber-400"
                count={inReviewTasks.length}
                tasks={inReviewTasks}
                onAdvance={(id) => updateTaskStatus(id, "done")}
                advanceLabel="Mark Done ✓"
              />

              {/* Kanban Column: Done */}
              <KanbanColumn
                title="Done"
                headerColor="text-emerald-400"
                count={doneTasks.length}
                tasks={doneTasks}
                onAdvance={(id) => updateTaskStatus(id, "todo")}
                advanceLabel="Reopen Task ↺"
              />
            </div>
          </div>
        )}

        {/* 5. VIEW 3: NOTION/CLICKUP DOC SPEC VIEW */}
        {activeView === "doc" && (
          <div className="p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <FileText className="w-3.5 h-3.5 text-violet-400" />
                  <span>Interactive PRD Document View</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{data.title}</h2>
              </div>
              <button
                onClick={() => handleCopy(data.markdown_spec)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Markdown"}</span>
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-300">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200">
                <h4 className="font-bold text-white mb-1">📋 Executive Synopsis</h4>
                <p>{data.summary}</p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-white">1. Core Identified Bottlenecks</h3>
                {data.core_problems.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs font-semibold text-white">
                      <span>{p.problem}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        {p.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      <strong className="text-cyan-400">Proposed Solution:</strong> {p.proposed_solution}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-white">2. Feature Deliverables Spec</h3>
                {data.features_requested.map((f) => (
                  <div key={f.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs font-semibold text-white">
                      <span>{f.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300">
                        Effort: {f.estimated_effort}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. VIEW 4: EXECUTIVE RADAR VIEW */}
        {activeView === "metrics" && (
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl glass-card border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Sentiment & Velocity Index</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Stakeholder Confidence</span>
                    <strong className="text-white">{data.sentiment.score}%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                      style={{ width: `${data.sentiment.score}%` }}
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
                  <strong>Tone Assessment:</strong> {data.sentiment.tone} (Urgency: {data.sentiment.urgency})
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300">
                  <strong>Client Vibe:</strong> {data.sentiment.client_vibe}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl glass-card border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white text-base">Sprint Delivery Metrics</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 text-center">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-2xl font-black text-cyan-400">{data.key_metrics.estimated_mvp_days}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Estimated MVP Days</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-2xl font-black text-emerald-400">{data.key_metrics.clarity_score}%</div>
                    <div className="text-[11px] text-slate-400 mt-1">Clarity Score</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.06] text-[11px] text-slate-500 text-center">
                Generated in 3.8s via {data.engine}
              </div>
            </div>
          </div>
        )}

        {/* 7. VIEW 5: EXPORT HUB VIEW */}
        {activeView === "export" && (
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="font-bold text-white text-base">Production Export Hub</h3>
                <p className="text-xs text-slate-400">Copy or download in Linear, Jira, or JSON formats.</p>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <button
                  onClick={() => setActiveExportTab("markdown")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeExportTab === "markdown" ? "bg-[#7b68ee] text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Markdown PRD
                </button>
                <button
                  onClick={() => setActiveExportTab("json")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeExportTab === "json" ? "bg-[#7b68ee] text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  JSON Schema
                </button>
                <button
                  onClick={() => setActiveExportTab("linear")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeExportTab === "linear" ? "bg-[#7b68ee] text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Linear Issues
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-[#090d16] border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto max-h-80 leading-relaxed">
                {activeExportTab === "markdown" && data.markdown_spec}
                {activeExportTab === "json" && JSON.stringify(data, null, 2)}
                {activeExportTab === "linear" && data.linear_format}
              </pre>

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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7b68ee] hover:bg-[#6c58e8] text-white text-xs font-medium shadow transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : `Copy ${activeExportTab.toUpperCase()}`}</span>
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 text-xs font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

// Sub-Component: ClickUp Grouped Table Section
interface ClickUpTaskGroupProps {
  groupKey: string;
  title: string;
  badgeColor: string;
  indicatorDot: string;
  tasks: WorkspaceTask[];
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
  onToggleCheck: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

function ClickUpTaskGroup({
  title,
  badgeColor,
  indicatorDot,
  tasks,
  isCollapsed,
  onToggleCollapse,
  onToggleCheck,
  onStatusChange,
}: ClickUpTaskGroupProps) {
  if (tasks.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.01] overflow-hidden">
      {/* Group Header */}
      <div
        onClick={onToggleCollapse}
        className="px-4 py-2.5 bg-[#080b12] border-b border-white/[0.06] flex items-center justify-between cursor-pointer select-none hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <button className="text-slate-400">
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${indicatorDot}`} />
            <span className="text-xs font-bold text-white tracking-wide">{title}</span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
            {tasks.length}
          </span>
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:block">ClickUp Backlog Table</div>
      </div>

      {/* Group Table Rows */}
      {!isCollapsed && (
        <div className="divide-y divide-white/[0.04]">
          {/* Table Header Row */}
          <div className="grid grid-cols-12 gap-2 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-[#07090e]/40">
            <div className="col-span-12 sm:col-span-5">Name</div>
            <div className="hidden sm:block sm:col-span-2">Assignee</div>
            <div className="hidden sm:block sm:col-span-2">Due Date</div>
            <div className="hidden sm:block sm:col-span-1">Priority</div>
            <div className="hidden sm:block sm:col-span-2 text-right">AI Summary</div>
          </div>

          {/* Task Rows */}
          {tasks.map((task) => {
            const isDone = task.status === "done";
            return (
              <div
                key={task.id}
                className={`grid grid-cols-12 gap-2 px-4 py-3 items-center text-xs transition-colors hover:bg-white/[0.03] group ${
                  isDone ? "opacity-60 bg-emerald-950/10" : ""
                }`}
              >
                {/* 1. Task Name + Status Toggle */}
                <div className="col-span-12 sm:col-span-5 flex items-center gap-2.5">
                  <button
                    onClick={() => onToggleCheck(task.id)}
                    className="shrink-0 text-slate-500 hover:text-cyan-400 transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                    )}
                  </button>
                  <span
                    className={`font-medium ${
                      isDone ? "line-through text-slate-500" : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {task.task}
                  </span>
                  <span className="hidden md:inline-flex text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06] shrink-0">
                    {task.category || "Sprint"}
                  </span>
                </div>

                {/* 2. Assignee Avatar */}
                <div className="hidden sm:flex sm:col-span-2 items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {task.owner_role.charAt(0)}
                  </div>
                  <span className="text-[11px] text-slate-300 truncate">{task.owner_role}</span>
                </div>

                {/* 3. Due Date Pill */}
                <div className="hidden sm:flex sm:col-span-2 items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span className="truncate">{task.deadline}</span>
                </div>

                {/* 4. ClickUp Priority Flag */}
                <div className="hidden sm:flex sm:col-span-1 items-center">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      task.priority === "High"
                        ? "text-rose-400 bg-rose-500/10"
                        : task.priority === "Medium"
                        ? "text-amber-400 bg-amber-500/10"
                        : "text-blue-400 bg-blue-500/10"
                    }`}
                  >
                    <Flag className="w-2.5 h-2.5" />
                    <span>{task.priority}</span>
                  </span>
                </div>

                {/* 5. AI Summary Snippet */}
                <div className="hidden sm:block sm:col-span-2 text-right">
                  <span className="text-[11px] text-slate-500 italic truncate block">
                    {task.aiSummarySnippet || "Extracted from transcript"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Sub-Component: ClickUp Kanban Column
interface KanbanColumnProps {
  title: string;
  headerColor: string;
  count: number;
  tasks: WorkspaceTask[];
  onAdvance: (id: string) => void;
  advanceLabel: string;
}

function KanbanColumn({ title, headerColor, count, tasks, onAdvance, advanceLabel }: KanbanColumnProps) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#07090e]/60 p-3.5 flex flex-col justify-between min-h-[380px]">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${headerColor}`}>{title}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/[0.06] text-slate-400 font-mono">
              {count}
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="p-3 rounded-lg bg-[#0e131f] border border-white/[0.07] hover:border-[#7b68ee]/40 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between text-[10px] mb-1.5">
                <span className="text-slate-400 font-mono">{t.owner_role.split("/")[0]}</span>
                <span
                  className={`font-bold flex items-center gap-1 ${
                    t.priority === "High" ? "text-rose-400" : "text-amber-400"
                  }`}
                >
                  <Flag className="w-2.5 h-2.5" />
                  {t.priority}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-200">{t.task}</p>
              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{t.deadline}</span>
                <button
                  onClick={() => onAdvance(t.id)}
                  className="text-[10px] font-bold text-[#7b68ee] hover:text-cyan-300 transition-colors"
                >
                  {advanceLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 text-center">
        <span className="text-[10px] text-slate-600">ClickUp Kanban Pipeline</span>
      </div>
    </div>
  );
}
