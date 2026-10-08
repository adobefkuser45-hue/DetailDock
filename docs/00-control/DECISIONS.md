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
