# ⚡ PulseBrief — AI Document & Meeting Action Engine

> **Turn raw customer calls, messy transcripts, and unstructured voice notes into prioritized product specs, interactive action checklists, and Linear-ready tickets in under 5 seconds.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zero Data Retention](https://img.shields.io/badge/Privacy-Zero%20Data%20Retention-emerald?style=for-the-badge)](https://pulsebrief.vercel.app)

---

## 📖 About PulseBrief

**PulseBrief** is a production-grade, client-facing AI utility engineered to solve the single largest operational bottleneck early-stage founders and product managers face: **losing critical feedback, urgent blockers, and technical requirements in unstructured 30–60 minute meeting notes.**

Rather than spending 2 to 3 hours manually distilling Zoom/Google Meet transcripts into PRDs, PulseBrief executes an in-memory neural extraction in **sub-5 seconds**—outputting clean JSON schemas, prioritized sprint specs, and actionable checklists.

---

## ✨ Key Features & Capabilities

### 1. 🎙️ Zero-Auth Interactive Sandbox
- **Instant Pre-Configured Samples**:
  - *Founder Pitch & Advisory Notes* (12-click onboarding churn, Stripe webhook bugs, SOC2 gates)
  - *Enterprise Discovery Call* ($85k ACV deal, <350ms SLA, Okta SAML 2.0, KMS S3 sync)
  - *Product & Engineering Sprint Sync* (Large PDF OCR crashes, PgBouncer pooling, bulk select)
  - *UX Teardown & User Interview* (Export filters, dark mode WCAG AAA contrast)
- **Multi-Modal Voice Ingestion Suite**:
  - **Live Microphone Recording**: In-browser Speech-to-Text with animated audio equalizer waveform bars.
  - **Audio File Upload**: Upload `.mp3`, `.wav`, or `.m4a` files with an interactive HTML5 audio scrub player.
  - **Audible Speech Playback**: Native speech synthesis to listen to conversational streams out loud.

### 2. 📊 Structured Glassmorphic Output Grid
- **Core Requirements & Problem Matrix**: Severity classification (`Critical`, `High`, `Medium`), problem-to-solution mapping, and estimated dev effort (`1-2 Days`, `3-5 Days`).
- **Interactive Action Item Checklist**: Checkable task boxes with assignee roles, deadline indicators, real-time completion progress calculation, and celebratory confetti on 100% completion.
- **Executive Summary & Sentiment Radar**: Sentiment score, tone analysis, and stakeholder vibe indicator.
- **Production Export Hub**: Switchable tabs between **Formatted Markdown PRD (.md)**, **Clean JSON Schema Tree**, and **Linear / Jira Issue Format**, with 1-click clipboard copy and file downloads.

### 3. 🔒 Enterprise-Grade Ephemeral Privacy (Zero Data Retention)
- **100% In-Memory Processing**: Transcripts, audio files, and generated specs are never stored on databases or used for AI model training.
- **Auto-Purged on Session Close**: All state is ephemeral and wiped upon tab close or refresh.

### 4. 📬 Bulletproof Lead Capture & Booking Engine
- **Direct Cal.com Scheduling**: Instant 1-click booking integration with [`cal.com/ruthvikyem/15min`](https://cal.com/ruthvikyem/15min).
- **Discord Webhook Alerts**: Real-time push notifications sent directly to Discord with formatted embed cards whenever a founder submits a scoping proposal.
- **Zero-Loss Disk Persistence**: Every lead is backed up locally in `data/leads.json` with anti-spam honeypot filtering.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Aceternity-inspired Spotlight glow & dark glassmorphism
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Engine**: Google Gemini API integration with instant intelligent neural heuristic fallback
- **Integrations**: Discord Webhooks, Cal.com Calendar Scheduling

---

## 🚀 Quick Start (Local Setup)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ruthvikyem/PulseBrief.git
cd PulseBrief
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and add your keys:
```bash
cp .env.local.example .env.local
```

```env
# Discord Webhook for Instant Lead Notifications
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# (Optional) Google Gemini API Key for live LLM generation
GEMINI_API_KEY=your_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👨‍💻 About the Developer

Built and architected by **Ruthvik** — Full-Stack AI Engineer & MVP Specialist.

- **Services**: Rapid 5–7 Day AI MVP Development, Next.js Full-Stack Architecture, Data Pipeline Engineering.
- **📅 Schedule a 15-Min Scoping Call**: [cal.com/ruthvikyem/15min](https://cal.com/ruthvikyem/15min)
- **✉️ Direct Inquiries**: [yemmeruthvik16@gmail.com](mailto:yemmeruthvik16@gmail.com)
- **🌐 Live Demo**: [pulsebrief.vercel.app](https://pulsebrief-one.vercel.app)

---

## 📄 License

MIT License © 2026 PulseBrief / Ruthvik. All rights reserved.
