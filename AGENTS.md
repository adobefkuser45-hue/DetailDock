# Repository Agent Rules

## Stack
Default to MongoDB + Express.js + React + Node.js unless an accepted ADR explicitly overrides it.

## Session Start
Read:
1. `docs/00-control/PROJECT_STATE.md`
2. the active/current task in `TASKS.md`

Then load only the ADR/spec/test/security sections relevant to the task. Do not bulk-read unrelated project docs.

## Change Classification
Classify meaningful work as:
- `SPIKE` — feasibility investigation; output is a recommendation.
- `BOUNDED` — narrow change to an existing flow.
- `ARCHITECTURAL` — new subsystem/project or cross-cutting interface change.

Architectural work requires an approved design/spec and approved implementation plan before implementation.

## Task Discipline
- Work from a Task ID for meaningful changes.
- Prefer small independently verifiable tasks.
- Follow existing architecture and project patterns.
- Do not refactor unrelated code.
- Do not silently change API/data/architecture contracts.
- Do not add speculative features, abstractions, or dependencies.
- Reuse existing components/services when appropriate.

## Verification
`IMPLEMENTED` is not `TESTED`.
`TESTED` is not `VERIFIED`.

Run the checks required by the task and record actual evidence before claiming completion.

## Legal & Commercial Compliance (Zero Copyright Risk)
All project artifacts, dependencies, libraries, fonts, and assets must strictly adhere to permissive commercial open-source licenses:
- Permitted licenses: `MIT`, `Apache 2.0`, `BSD-2/3`, `ISC`, `SIL Open Font License (OFL)`, `CC0`.
- Strictly Forbidden: Restrictive copyleft (`GPL`, `AGPL`) or non-commercial (`CC-BY-NC`) licenses that would legally restrict selling, licensing, or commercializing the platform.
- Logos & Artwork: Generate 100% original bespoke code-native SVG graphics or licensed permissive assets. No trademark infringement.
- Media: Permissive commercial assets only (Unsplash/Pexels license or user-supplied photography).

## Phase-Specific Tooling Arsenal
- **Product & Requirements:** Superpowers (`brainstorming`, `writing-plans`), GSD (`gsd-spec-phase`), Anthropic `doc-coauthoring`.
- **Branding & Logo Design:** Anthropic `brand-guidelines`, `canvas-design`, procedural vector SVGs.
- **UI Architecture & Styling:** `UI UX Pro Max`, `TasteSkill` (design-taste-frontend), `Impeccable` (v4.5.0), Anthropic `frontend-design`, `21st.dev` (CLI & MCP), `shadcn/ui` (MIT), Tailwind CSS (MIT).
- **Motion & Micro-interactions:** `Design Motion Principles`, `Motion` library (`motion` / MIT).
- **Database & Schemas:** Official `MongoDB Agent Skills` (8 skills), `MongoDB MCP Server` (live cluster inspector).
- **Backend Architecture & Documentation:** Express.js, Mongoose, `Context7 MCP` (live docs), Superpowers `test-driven-development`.
- **Quality & Security Pentesting:** `Strix Security Skills` (OWASP Top 10, API security testing), `CodeRabbit Reviewer`, `Playwright E2E`.
- **Media Optimization:** `Cloudinary MCP` & Node SDK (Free Tier, 25 credits/mo).
- **Deployment & Growth:** `Vercel MCP` (Hobby Free), `Render API` (Free Web Service), `BeyondSEO` (Schema.org AutoRepair).

## Complex Work
For architectural, multi-hour, migration, or major-refactor work, use an execution plan following `.agent/PLANS.md` when present.

Do not create heavyweight plans for trivial/bounded changes.

## Tracking
After meaningful project changes evaluate/update:
- `TASKS.md`
- `docs/00-control/PROJECT_STATE.md`
- `docs/00-control/VERIFICATION.md`
- `docs/00-control/SESSION_LOG.md`

Update `docs/00-control/DECISIONS.md` only for durable decisions.

Update affected specs when implementation intentionally changes their truth.

## Safety
Verify account/workspace/project/environment before consequential external writes.

Obtain explicit approval immediately before high-impact or irreversible actions such as:
- production destructive data writes/deletes;
- deleting databases/projects/services;
- purchases/billing;
- access revocation;
- secret rotation likely to disrupt production;
- irreversible migrations without a validated rollback.

## Handoff
Before ending meaningful work, leave:
- actual status;
- evidence;
- blockers;
- exact next action;
- correct executor recommendation.
