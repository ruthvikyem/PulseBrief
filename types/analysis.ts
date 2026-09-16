export interface SentimentAnalysis {
  tone: string;
  score: number; // 0 to 100
  urgency: "Critical" | "High" | "Medium" | "Low";
  client_vibe: string;
}

export interface CoreProblem {
  id: string;
  problem: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  proposed_solution: string;
  impact_area: string;
}

export interface RequestedFeature {
  id: string;
  name: string;
  priority: "High" | "Medium" | "Low";
  category: "Frontend" | "Backend / API" | "Infrastructure" | "Billing / Auth" | "Data & AI";
  description: string;
  estimated_effort: "1-2 Days" | "3-5 Days" | "1-2 Weeks";
}

export interface ActionItem {
  id: string;
  task: string;
  owner_role: string;
  deadline: string;
  priority: "High" | "Medium" | "Low";
  completed?: boolean;
}

export interface AnalysisResponse {
  title: string;
  summary: string;
  sentiment: SentimentAnalysis;
  core_problems: CoreProblem[];
  features_requested: RequestedFeature[];
  action_items: ActionItem[];
  markdown_spec: string;
  linear_format: string;
  key_metrics: {
    total_action_items: number;
    high_urgency_count: number;
    estimated_mvp_days: number;
    clarity_score: number;
  };
  processed_at: string;
  engine: "Gemini 2.5 Flash (Live LLM)" | "PulseBrief Neural Heuristic Engine";
}
