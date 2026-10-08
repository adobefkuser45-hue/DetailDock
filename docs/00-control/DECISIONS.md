# Architecture Decision Records (ADR)

## ADR-001: MERN Stack Baseline Selection
- **Status:** ACCEPTED
- **Date:** 2026-10-08
- **Context:** The platform requires a proven, flexible, full-stack JavaScript environment with rapid development speed, JSON-native document model, and extensive community support.
- **Decision:** Adopt MongoDB + Express.js + React + Node.js (MERN) as the non-negotiable technology stack baseline.
- **Consequences:**
  - Standardized tooling and libraries across client and server.
  - Strict server-side schema validation via Mongoose.
  - No client authority over critical business logic, pricing, or auth.

---

## ADR-002: Google Antigravity MERN Master System v1.1 Architecture
- **Status:** ACCEPTED
- **Date:** 2026-10-08
- **Context:** Autonomous and paired AI development requires strict context management, evidence-based verification, and persistent offline/online repository state to prevent "context rot".
- **Decision:** Enforce the 5 Master Files structure:
  1. `GEMINI.md` — Workspace master instruction & pair rules
  2. `docs/reference/MERN_Master_Web_Coding_OS_v1.1.md` — Complete reference OS
  3. `docs/reference/ANTIGRAVITY_PROMPT_PACK.md` — Workflow Prompt Pack
  4. `AGENTS.md` — Concise repository agent rules
  5. `.agent/PLANS.md` — Architectural execution plan contract
- **Consequences:**
  - Continuous project state tracking in `docs/00-control/`.
  - Evidence required before marking any task `VERIFIED`.
  - Seamless continuity across session resets.

---

## ADR-003: Phase-by-Phase Tool Assignment and Free-Tier Optimization Strategy
- **Status:** ACCEPTED
- **Date:** 2026-10-09
- **Context:** Building DetailDock (Smart Auto Detailing & Booking Platform) requires maximizing free-tier cloud infrastructure, ensuring zero unnecessary developer costs, and deploying the best specialized tool for each lifecycle phase.
- **Decision:** Establish strict phase-to-tool assignments:
  1. **Phase 1 (Intake & Requirements):** Superpowers (`brainstorming`, `writing-plans`) + GSD (`gsd-spec-phase`) for boundary definition.
  2. **Phase 2 (Architecture & Schemas):** Official MongoDB Agent Skills (`mongodb-schema-design`, `mongodb-query-optimizer`) + built-in Mermaid for architecture diagrams and ERD.
  3. **Phase 3 (Backend API & Auth):** MongoDB Atlas (M0 Free Tier, 512MB) + Context7 MCP (live docs) + Superpowers (TDD).
  4. **Phase 4 (Frontend UI/UX):** UI UX Pro Max + TasteSkill + Impeccable + 21st.dev + Cloudinary Free Tier (25 credits/mo for car media).
  5. **Phase 5 (Testing & Security):** Strix OWASP Skills + CodeRabbit Reviewer + Playwright E2E.
  6. **Phase 6 (Deployment & SEO):** Vercel Hobby Free Tier (frontend) + Render Free Tier (backend API) + BeyondSEO (Local Auto Detailing Schema.org).
- **Consequences:**
  - $0 total cloud operating cost during development and initial launch.
  - Zero redundant or conflicting tools (e.g., daisyUI eliminated, shadcn/ui standardized).
  - Explicit justification required before proposing any paid upgrade.

