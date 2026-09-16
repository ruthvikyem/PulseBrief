import { AnalysisResponse } from "@/types/analysis";

export interface SampleScenario {
  id: string;
  badge: string;
  title: string;
  description: string;
  transcript: string;
  defaultAnalysis: AnalysisResponse;
}

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: "founder-pitch",
    badge: "🎙️ Founder Pitch & Advisor Notes",
    title: "AI Co-Pilot Seed Stage Advisory Sync",
    description: "Messy advisory call with investor feedback, onboarding bottlenecks, pricing tier dilemmas, and SOC2 compliance concerns.",
    transcript: `[00:02] Alex (Founder): "Thanks for jumping on. Look, we're converting about 4% of free tier signups to our $49/mo pro plan, but our churn after month 2 is nearly 18%. The feedback from 3 pilot customers is that the initial onboarding takes 12 clicks and they don't see value until they upload at least 5 documents."
[00:48] Sarah (Advisor / Angel): "12 clicks is fatal for self-serve. Why haven't you implemented 1-click sample workspace pre-loading? If they land in an empty dashboard, they bounce."
[01:15] Alex: "Yeah, totally. We also have a massive issue with Stripe billing webhooks failing silently when users upgrade in mid-session. Dave spent 3 days manually fixing database flags. We need an automated reconciliation queue or Stripe Customer Portal integration by next Tuesday."
[02:05] Sarah: "Also, what's your plan for enterprise SOC2 compliance? If you want to close ACVs above $20k with the healthcare prospect we introduced, you need role-based access control (RBAC) and audit logging for export events."
[02:40] Alex: "Understood. So priorities are: 1) 1-click instant demo onboarding with pre-loaded mock data, 2) fix Stripe webhooks with webhook signature verification + Stripe portal, 3) RBAC permission matrix for team accounts, and 4) export audit log."
[03:10] Sarah: "Get those 3 fixes out by end of week before your demo with Benchmark. Dave handles backend Stripe fixes, you polish the onboarding flow."`,
    defaultAnalysis: {
      title: "AI Co-Pilot Product & GTM Acceleration Spec",
      summary: "Founder & Advisor session focused on mitigating high month-2 churn (18%) and accelerating self-serve conversion. Identified critical friction in the 12-step onboarding flow, backend billing stability issues with Stripe webhooks, and prerequisite enterprise compliance gates (RBAC & Audit Logging) required for $20k+ ACV healthcare contracts.",
      sentiment: {
        tone: "Urgent & Constructive",
        score: 78,
        urgency: "High",
        client_vibe: "High momentum, critical onboarding and billing blockers require immediate 48h mitigation before upcoming VC demo."
      },
      core_problems: [
        {
          id: "p1",
          problem: "High Month-2 Churn (18%) caused by tedious 12-click onboarding friction",
          severity: "Critical",
          proposed_solution: "Implement zero-click instant sample workspace pre-loading with interactive guided tour",
          impact_area: "User Retention & Activation"
        },
        {
          id: "p2",
          problem: "Stripe billing webhooks failing silently during mid-session tier upgrades",
          severity: "High",
          proposed_solution: "Deploy robust Stripe webhook handler with signature verification, dead-letter queue, and Stripe Customer Portal sync",
          impact_area: "Revenue & Billing Stability"
        },
        {
          id: "p3",
          problem: "Lack of Role-Based Access Control (RBAC) and export audit logging blocking $20k+ healthcare deal",
          severity: "Medium",
          proposed_solution: "Implement granular RBAC permission matrix (Admin, Editor, Viewer) and tamper-evident event audit logs",
          impact_area: "Enterprise Compliance & Sales"
        }
      ],
      features_requested: [
        {
          id: "f1",
          name: "Instant 1-Click Sample Sandbox",
          priority: "High",
          category: "Frontend",
          description: "Pre-populate new user accounts with rich sample documents and pre-indexed semantic embeddings so time-to-value drops under 10 seconds.",
          estimated_effort: "1-2 Days"
        },
        {
          id: "f2",
          name: "Stripe Customer Portal & Resilient Webhook Queue",
          priority: "High",
          category: "Billing / Auth",
          description: "Automate invoice lifecycle, seat additions, and graceful webhook retry logic to prevent manual database flag intervention.",
          estimated_effort: "1-2 Days"
        },
        {
          id: "f3",
          name: "RBAC & Team Permissions System",
          priority: "Medium",
          category: "Backend / API",
          description: "Multi-tenant workspace isolation with role assignments (Owner, Member, Guest) and export event logging.",
          estimated_effort: "3-5 Days"
        },
        {
          id: "f4",
          name: "Compliance Audit Logging Engine",
          priority: "Medium",
          category: "Infrastructure",
          description: "Structured JSON logging for document views, deletion requests, and AI query history.",
          estimated_effort: "3-5 Days"
        }
      ],
      action_items: [
        {
          id: "a1",
          task: "Scaffold 1-click sample data pre-fill on first user sign-in",
          owner_role: "Frontend Engineer / Alex",
          deadline: "This Thursday, 5:00 PM",
          priority: "High",
          completed: false
        },
        {
          id: "a2",
          task: "Refactor Stripe webhook handler with automated retry queue and Customer Portal redirect",
          owner_role: "Backend Lead / Dave",
          deadline: "Friday, 12:00 PM",
          priority: "High",
          completed: false
        },
        {
          id: "a3",
          task: "Draft RBAC database schema migration for organization workspace roles",
          owner_role: "Full-Stack Dev",
          deadline: "Next Monday",
          priority: "Medium",
          completed: false
        },
        {
          id: "a4",
          task: "Record 60-second Loom walkthrough of new zero-click onboarding for Benchmark demo",
          owner_role: "Founder / Alex",
          deadline: "Friday, 6:00 PM",
          priority: "High",
          completed: false
        }
      ],
      markdown_spec: `# Product Specification: AI Co-Pilot Onboarding & Billing Stabilization

## Executive Summary
This sprint focuses on reducing onboarding friction from 12 clicks down to 1 click, eliminating manual billing reconciliation, and unlocking enterprise healthcare pipeline requirements.

## 1. Core Problem Statements
- **Churn Vulnerability:** 18% churn after month 2 due to empty state cognitive load on signup.
- **Billing Integrity:** Silent failures in Stripe webhook handling requiring manual database fixes.
- **Enterprise Gatekeepers:** Missing RBAC and export audit trails preventing closure of $20k+ ACVs.

## 2. Technical Requirements
### Frontend
- Add \`is_first_login\` trigger checking user metadata.
- Pre-seed workspace with 3 interactive demo templates.
- Guided tooltip walkthrough using Framer Motion.

### Backend / Infrastructure
- Stripe Webhook endpoint with HMAC verification and BullMQ / Redis retry queue.
- PostgreSQL schema update: \`workspaces\`, \`memberships (role: ENUM)\`, \`audit_events\`.

## 3. Success Metrics
- Time-to-First-Query drops from 4.2 minutes to < 30 seconds.
- Stripe subscription sync errors drop to 0.00%.
- Free-to-Paid conversion lift target: +3.5%.`,
      linear_format: `[Linear Issue Export]
- Title: [High-P0] Implement 1-Click Sample Sandbox for Instant Onboarding
  Description: Eliminate 12-click onboarding friction by pre-populating first-time workspaces with 3 rich demo docs.
  Priority: Urgent (P0)
  Label: Growth / UX

- Title: [High-P0] Fix Stripe Webhook Silent Failures & Deploy Customer Portal
  Description: Implement signature-checked webhook handling with idempotent retry logic for seat upgrades.
  Priority: Urgent (P0)
  Label: Billing / Backend

- Title: [P1] Design Multi-Tenant RBAC Schema (Admin/Member/Viewer)
  Description: Add organization membership table and permission checks across document API endpoints.
  Priority: High (P1)
  Label: Enterprise / Security`,
      key_metrics: {
        total_action_items: 4,
        high_urgency_count: 3,
        estimated_mvp_days: 4,
        clarity_score: 94
      },
      processed_at: "Just now",
      engine: "PulseBrief Neural Heuristic Engine"
    }
  },
  {
    id: "sales-discovery",
    badge: "💼 Enterprise Discovery & Sales Call",
    title: "Global FinTech VP of Engineering Discovery",
    description: "Enterprise discovery conversation regarding strict latency SLAs, on-prem/VPC privacy requirements, and custom SAML SSO.",
    transcript: `[00:10] Marcus (Account Exec): "Thanks for joining, Priya. We wanted to deep dive into your team's compliance and data pipeline requirements for the Q3 rollout."
[00:35] Priya (VP of Engineering): "Our primary blocker with third-party AI tools is data residency and latency. Our traders cannot tolerate more than 350ms roundtrip inference on structured risk summaries. If your API is averaging 1.8 seconds, that's a non-starter."
[01:10] Marcus: "Got it. We support dedicated edge endpoints with sub-250ms p95 latency. How are you handling authentication currently?"
[01:30] Priya: "We require Okta SAML 2.0 with SCIM automated user provisioning. Furthermore, we need an automated daily CSV export of all risk assessments pushed directly to our AWS S3 bucket with KMS encryption."
[02:15] Marcus: "That is already in our enterprise tier roadmap. If we can deliver a dedicated POC with Okta SAML and the S3 webhook sync within 10 days, what is the approval process for the $85,000 annual contract?"
[02:45] Priya: "If the POC passes our InfoSec review and latency benchmarks by the 25th, our procurement committee will sign the MSA before quarter-end. I need your solutions architect to send over the security whitepaper and architectural diagram by tomorrow."
[03:20] Marcus: "Will have that in your inbox by 9 AM tomorrow. I'll also coordinate the custom S3 webhook spec with our lead engineer."`,
    defaultAnalysis: {
      title: "Enterprise FinTech Deal Delivery Specification ($85k ACV)",
      summary: "Discovery call with VP of Engineering establishing the criteria to close an $85,000 annual enterprise agreement. Deal hinges on three non-negotiables: < 350ms p95 inference latency via edge endpoints, Okta SAML 2.0 + SCIM provisioning, and daily encrypted S3 export integration.",
      sentiment: {
        tone: "High Value & Rigorous",
        score: 88,
        urgency: "Critical",
        client_vibe: "High intent enterprise prospect. $85k contract ready to close if 10-day technical POC criteria are validated."
      },
      core_problems: [
        {
          id: "p1",
          problem: "Strict Latency Ceiling (<350ms p95) required for real-time risk assessment workflows",
          severity: "Critical",
          proposed_solution: "Deploy edge-cached inference endpoints with pre-warmed serverless micro-models",
          impact_area: "Performance & Infra"
        },
        {
          id: "p2",
          problem: "Security compliance prerequisite: Okta SAML 2.0 & SCIM automated user lifecycle sync",
          severity: "Critical",
          proposed_solution: "Integrate enterprise SSO gateway (WorkOS / BoxyHQ) with SCIM webhook listeners",
          impact_area: "Auth & Enterprise Security"
        },
        {
          id: "p3",
          problem: "Daily automated risk data push to customer S3 bucket with AWS KMS client-side encryption",
          severity: "High",
          proposed_solution: "Build scheduled cron export pipeline with custom AWS S3 IAM cross-account role assumption",
          impact_area: "Data Integrations"
        }
      ],
      features_requested: [
        {
          id: "f1",
          name: "Edge Accelerated Inference Pipeline (<300ms)",
          priority: "High",
          category: "Infrastructure",
          description: "Deploy Cloudflare / Vercel Edge compute with model response streaming and speculative decoding.",
          estimated_effort: "3-5 Days"
        },
        {
          id: "f2",
          name: "Okta SAML 2.0 & SCIM Provisioning",
          priority: "High",
          category: "Billing / Auth",
          description: "Enterprise directory sync allowing automatic user deprovisioning upon employee offboarding.",
          estimated_effort: "3-5 Days"
        },
        {
          id: "f3",
          name: "Encrypted AWS S3 Export Connector",
          priority: "High",
          category: "Data & AI",
          description: "Nightly batch export of risk metrics formatted in Parquet/CSV and encrypted with customer KMS key.",
          estimated_effort: "1-2 Days"
        }
      ],
      action_items: [
        {
          id: "a1",
          task: "Email SOC2 Type II security whitepaper & architecture diagram to Priya",
          owner_role: "Account Exec / Marcus",
          deadline: "Tomorrow at 9:00 AM",
          priority: "High",
          completed: false
        },
        {
          id: "a2",
          task: "Spin up isolated staging tenant configured with Okta SAML 2.0 test credentials",
          owner_role: "Solutions Architect",
          deadline: "Wednesday, 3:00 PM",
          priority: "High",
          completed: false
        },
        {
          id: "a3",
          task: "Benchmark edge endpoint latency to verify p95 latency under 320ms",
          owner_role: "DevOps Engineer",
          deadline: "Thursday EOD",
          priority: "High",
          completed: false
        },
        {
          id: "a4",
          task: "Prepare draft Master Services Agreement (MSA) for $85,000 ACV procurement review",
          owner_role: "Legal & Sales Ops",
          deadline: "Friday EOD",
          priority: "Medium",
          completed: false
        }
      ],
      markdown_spec: `# Technical Delivery Spec: Enterprise FinTech POC ($85k Contract)

## Deal Context
- **Target Customer:** Tier-1 FinTech Brokerage
- **Contract Value:** $85,000 Annual Subscription
- **POC Target Completion:** Within 10 business days (Prior to 25th)

## Key Technical Requirements
1. **Latency SLA:** < 350ms p95 latency on risk extraction endpoint.
2. **Auth Protocol:** SAML 2.0 Single Sign-On via Okta + SCIM 2.0 directory provisioning.
3. **Storage Pipeline:** Automated 00:00 UTC export to \`s3://customer-risk-vault\` using SSE-KMS.

## Deliverables Checklist
- [ ] Deliver Whitepaper & Architecture Diagram by 9:00 AM Tomorrow.
- [ ] Configure Okta SAML Sandbox.
- [ ] Run 1,000 synthetic requests to prove < 350ms p95 response time.`,
      linear_format: `[Linear Issue Export]
- Title: [Enterprise-POC] Build Okta SAML 2.0 SSO Integration Connector
  Description: Enable single sign-on authentication and SCIM user sync for $85k FinTech POC.
  Priority: Urgent (P0)
  Label: Enterprise / Auth

- Title: [Enterprise-POC] S3 Nightly Batch Sync with AWS KMS Encryption
  Description: Nightly cron job to stream risk summary CSV files to customer-provided S3 bucket.
  Priority: High (P1)
  Label: Integrations / Cloud

- Title: [Infra-P0] Latency Optimization: Deploy Edge Cache & Benchmark <350ms p95
  Description: Profile API response times and establish edge caching to satisfy strict trading SLA.
  Priority: Urgent (P0)
  Label: Performance / Infra`,
      key_metrics: {
        total_action_items: 4,
        high_urgency_count: 3,
        estimated_mvp_days: 5,
        clarity_score: 96
      },
      processed_at: "Just now",
      engine: "PulseBrief Neural Heuristic Engine"
    }
  },
  {
    id: "sprint-sync",
    badge: "🚀 Product & Engineering Sprint Sync",
    title: "V2 Engine Sprint Sync & Blocker Breakdown",
    description: "Fast-paced engineering standup addressing migration to Clerk auth, Supabase connection pool limits, and PDF parsing edge cases.",
    transcript: `[00:05] Elena (Head of Product): "We have 4 days until the public beta launch. Let's do a fast blocker sweep. Ryan, what is the status of the PDF parser crashing on scanned files?"
[00:30] Ryan (Full-Stack Dev): "The OCR worker was running out of memory on files over 15MB. I switched the worker to an asynchronous BullMQ queue with AWS Textract fallback. It handles 50MB files cleanly now. PR is up for review."
[01:05] Elena: "Amazing. Liam, what about the database connection exhaustion we saw in staging?"
[01:25] Liam (Backend Lead): "Our Next.js serverless functions were opening new Postgres connections on every cold start, overwhelming Supabase. I'm swapping the client over to Prisma with PgBouncer connection pooling. That drops active connections by 90%. I will merge this by 2 PM."
[02:00] Elena: "Great. For the frontend, users complained that they can't multi-select items in the export list. Sophia, can we add shift-click multi-select and bulk deletion before Friday?"
[02:30] Sophia (Frontend Lead): "Already drafted the component using Zustand state. Will have the PR ready by 4 PM today."
[02:50] Elena: "Perfect. Action items: Ryan's PR review by Liam by 1 PM, Liam's PgBouncer rollout to staging by 3 PM, Sophia's bulk select merged by EOD."`,
    defaultAnalysis: {
      title: "Beta Launch Readiness & Infrastructure Stabilization",
      summary: "Pre-launch engineering sync resolving three critical launch blockers: large PDF memory crashes, serverless database connection saturation, and missing multi-select UI functionality.",
      sentiment: {
        tone: "High Velocity & Decisive",
        score: 92,
        urgency: "High",
        client_vibe: "Clear technical alignment, sprint blockers effectively diagnosed with direct execution timelines."
      },
      core_problems: [
        {
          id: "p1",
          problem: "OCR worker memory exhaustion on PDFs > 15MB crashing parse pipeline",
          severity: "High",
          proposed_solution: "Queue-backed async processing with AWS Textract fallback for large documents",
          impact_area: "Document Ingestion"
        },
        {
          id: "p2",
          problem: "Next.js serverless cold starts exhausting Postgres connection limits",
          severity: "Critical",
          proposed_solution: "Implement PgBouncer connection pooling and Prisma accelerate client",
          impact_area: "Database Stability"
        },
        {
          id: "p3",
          problem: "Lack of bulk selection in export dashboard creating workflow friction",
          severity: "Medium",
          proposed_solution: "Zustand-powered shift-click multi-select table component with batch delete/export",
          impact_area: "Frontend UX"
        }
      ],
      features_requested: [
        {
          id: "f1",
          name: "Async Queue Document Processor",
          priority: "High",
          category: "Backend / API",
          description: "Decouple heavy OCR tasks from HTTP request lifecycle using Redis queue and S3 presigned URLs.",
          estimated_effort: "1-2 Days"
        },
        {
          id: "f2",
          name: "PgBouncer Connection Pooling",
          priority: "High",
          category: "Infrastructure",
          description: "Maintain a stable 20-connection pool between Vercel serverless functions and Supabase Postgres.",
          estimated_effort: "1-2 Days"
        },
        {
          id: "f3",
          name: "Bulk Multi-Select Export Table",
          priority: "Medium",
          category: "Frontend",
          description: "Keyboard-accessible shift-click selection with floating batch action bar (Export JSON, Archive, Tag).",
          estimated_effort: "1-2 Days"
        }
      ],
      action_items: [
        {
          id: "a1",
          task: "Review and merge Ryan's async OCR worker PR",
          owner_role: "Backend Lead / Liam",
          deadline: "Today, 1:00 PM",
          priority: "High",
          completed: false
        },
        {
          id: "a2",
          task: "Deploy PgBouncer configuration and verify Postgres connection metrics in staging",
          owner_role: "Backend Lead / Liam",
          deadline: "Today, 3:00 PM",
          priority: "High",
          completed: false
        },
        {
          id: "a3",
          task: "Complete QA and merge bulk multi-select table component",
          owner_role: "Frontend Lead / Sophia",
          deadline: "Today, 5:00 PM",
          priority: "Medium",
          completed: false
        },
        {
          id: "a4",
          task: "Execute final end-to-end beta smoke test before Friday public launch",
          owner_role: "Product Lead / Elena",
          deadline: "Thursday, 12:00 PM",
          priority: "High",
          completed: false
        }
      ],
      markdown_spec: `# Sprint Execution Spec: Beta Release Stabilization

## Core Objectives
1. Eliminate all serverless database connection spikes via PgBouncer.
2. Ensure 100% processing reliability for PDFs up to 50MB.
3. Polish UI with keyboard-friendly bulk export actions.

## Deployment Timeline
- **13:00:** PR #142 (Async OCR) Code Review.
- **15:00:** Staging deployment of PgBouncer pool.
- **17:00:** Frontend bulk select UI merge.
- **Thursday:** Full staging regression test.`,
      linear_format: `[Linear Issue Export]
- Title: [Eng-P0] Deploy PgBouncer Connection Pooling for Supabase
  Description: Mitigate serverless function connection leaks during high-traffic surges.
  Priority: Urgent (P0)
  Label: Infrastructure

- Title: [Eng-P1] Merge Async BullMQ OCR Pipeline with AWS Textract Fallback
  Description: Allow graceful processing of documents up to 50MB without worker OOM crashes.
  Priority: High (P1)
  Label: Backend / Worker

- Title: [Eng-P2] Implement Shift-Click Multi-Select in Export Grid
  Description: Add Zustand store logic for batch selecting, exporting, and deleting parsed transcripts.
  Priority: Medium (P2)
  Label: Frontend / UI`,
      key_metrics: {
        total_action_items: 4,
        high_urgency_count: 3,
        estimated_mvp_days: 2,
        clarity_score: 98
      },
      processed_at: "Just now",
      engine: "PulseBrief Neural Heuristic Engine"
    }
  },
  {
    id: "ux-interview",
    badge: "🧪 UX Teardown & User Interview",
    title: "SaaS Power User Feedback & Friction Analysis",
    description: "User testing session uncovering key frustrations in export customization, keyboard shortcuts, and dark mode contrast.",
    transcript: `[00:15] Clara (Design Researcher): "Could you walk us through how you generated your quarterly product summary last Friday?"
[00:40] David (Design Director): "Sure. The extraction quality is top notch, but the UI fights me when I want to customize the output. I wanted to export only the High-priority action items into our company Notion template, but the button just copies raw JSON with everything."
[01:20] Clara: "So you needed granular filtering before export?"
[01:35] David: "Exactly! Give me toggle chips: [x] High Priority, [x] Frontend, [ ] Low Priority. And let me pick between Markdown, Plain Text, or Notion-formatted blocks. Also, on my OLED screen, the contrast between the dark card background (#121212) and the gray text (#666666) is hard to read in bright sunlight."
[02:30] Clara: "What about keyboard navigation?"
[02:45] David: "If I could hit Cmd+K to search action items and Cmd+Shift+C to copy the summary instantly without touching my mouse, I'd use this tool every single day."
[03:10] Clara: "Thank you David, that's incredibly actionable."`,
    defaultAnalysis: {
      title: "UX Optimization & Granular Export Enhancement Spec",
      summary: "Power user feedback session focusing on export ergonomics, accessibility contrast ratios, and power-user keyboard shortcuts (Cmd+K / Cmd+Shift+C).",
      sentiment: {
        tone: "Enthusiastic & High-Signal",
        score: 85,
        urgency: "Medium",
        client_vibe: "Loves core value proposition; high desire for productivity accelerators and tailored export formatting."
      },
      core_problems: [
        {
          id: "p1",
          problem: "All-or-nothing export creates noise when users only need high-urgency items",
          severity: "High",
          proposed_solution: "Add dynamic filter chips (Priority, Department) that selectively modify the exported payload",
          impact_area: "Export Workflow"
        },
        {
          id: "p2",
          problem: "Sub-par text contrast on OLED screens in ambient lighting conditions",
          severity: "Medium",
          proposed_solution: "Upgrade text color tokens to WCAG AAA compliance (#94A3B8 / #F8FAFC)",
          impact_area: "Accessibility & Design"
        },
        {
          id: "p3",
          problem: "Lack of keyboard shortcuts slowing down repetitive daily usage",
          severity: "Medium",
          proposed_solution: "Add global keybinding listeners for Quick Command (Cmd+K) and Instant Copy (Cmd+Shift+C)",
          impact_area: "Productivity"
        }
      ],
      features_requested: [
        {
          id: "f1",
          name: "Granular Export Filter Pills",
          priority: "High",
          category: "Frontend",
          description: "Interactive checkboxes allowing users to toggle inclusion of High, Medium, or Low priority items in export.",
          estimated_effort: "1-2 Days"
        },
        {
          id: "f2",
          name: "WCAG AAA Dark Mode Token Tuning",
          priority: "Medium",
          category: "Frontend",
          description: "Elevate secondary text contrast to minimum 7:1 ratio for sunlight legibility.",
          estimated_effort: "1-2 Days"
        },
        {
          id: "f3",
          name: "Power-User Keyboard Shortcuts Engine",
          priority: "Medium",
          category: "Frontend",
          description: "Add hotkey listeners: Cmd+Enter to Extract, Cmd+Shift+C to Copy, and Esc to Clear.",
          estimated_effort: "1-2 Days"
        }
      ],
      action_items: [
        {
          id: "a1",
          task: "Implement selective filter chips on Export Card UI",
          owner_role: "UI Engineer",
          deadline: "Wednesday",
          priority: "High",
          completed: false
        },
        {
          id: "a2",
          task: "Audit color tokens with Chrome DevTools contrast checker to satisfy WCAG AAA standards",
          owner_role: "Product Designer",
          deadline: "Thursday",
          priority: "Medium",
          completed: false
        },
        {
          id: "a3",
          task: "Register keyboard shortcut handlers (Cmd+Enter, Cmd+Shift+C)",
          owner_role: "Frontend Dev",
          deadline: "Friday",
          priority: "Medium",
          completed: false
        }
      ],
      markdown_spec: `# UX Spec: Export Ergonomics & Accessibility

## Objective
Enable seamless power-user export with zero friction, custom formatting, and high-contrast dark theme accessibility.

## Implementation Details
1. **Interactive Filter Array:** Store active filters in state \`{ high: true, medium: true, low: false }\`.
2. **Dynamic Generator:** Filter \`action_items\` and \`features\` before serializing Markdown/JSON.
3. **Hotkey Registry:** \`useHotkeys('mod+shift+c', copyActiveSpec)\`.`,
      linear_format: `[Linear Issue Export]
- Title: [UX-P1] Add Selective Export Filtering (Urgency & Role Tags)
  Description: Allow users to toggle filter chips to exclude low-priority items from copied clipboard payloads.
  Priority: High (P1)
  Label: Design / UX

- Title: [Design-P2] WCAG AAA Color Contrast Token Refresh
  Description: Refactor secondary text tokens from #666666 to #94A3B8.
  Priority: Medium (P2)
  Label: Design / Accessibility`,
      key_metrics: {
        total_action_items: 3,
        high_urgency_count: 1,
        estimated_mvp_days: 2,
        clarity_score: 95
      },
      processed_at: "Just now",
      engine: "PulseBrief Neural Heuristic Engine"
    }
  }
];
