# MERN Master Web Coding OS v1.1 — Final Candidate

**Purpose:** A zero-to-production operating system for building professional MERN applications with ChatGPT, Codex, specialist Skills/Plugins, evidence-based verification, and persistent project tracking.

**Baseline stack:** MongoDB + Express.js + React + Node.js  
**Operating model:** ChatGPT-first, Codex for heavy/local/browser execution, specialists only when materially better.  
**Truth model:** Repository/runtime evidence > project tracking docs > approved specs > task queue > session history > chat history.  
**Version date:** 2026-10-07  
**Status:** Final Candidate after structure, context-efficiency, safety, continuity, and executor-routing audit.

---

# PART 0 — How to Use This System

## 0.1 Core rule

Do not use:

`IDEA → AI → DEPLOY`

Use:

`READ → UNDERSTAND → RESEARCH → PLAN → SELECT EXECUTOR → IMPLEMENT → TEST → REVIEW → FIX → VERIFY → TRACK → COMMIT → NEXT`

A stage is not complete because code exists, a build succeeds, or an AI says “done.” It completes only when its exit criteria are supported by evidence.

## 0.2 Official work states

- `PROPOSED` — identified but not started.
- `ATTEMPTED` — work started.
- `IMPLEMENTED` — code/config exists.
- `TESTED` — required checks actually ran.
- `VERIFIED` — acceptance criteria passed with evidence.
- `BLOCKED` — explicit dependency/problem prevents progress.
- `REJECTED` — deliberately abandoned.

**Only `VERIFIED` means finished.**

For stage/release gates:

- `NOT_STARTED`
- `IN_PROGRESS`
- `BLOCKED`
- `FAILED`
- `PASSED`
- `PASSED_WITH_ACCEPTED_RISK`

## 0.3 Truth labels

Use:

- `VERIFIED FACT`
- `REASONED / LIKELY`
- `ASSUMPTION`
- `UNKNOWN`

Never silently convert an assumption into a fact.

## 0.4 Golden quality rule

At every meaningful stage ask:

> What evidence would convince an experienced engineer who did not perform the work that this stage is actually complete?

If that evidence does not exist, the work is not verified.

## 0.5 Change classification and approval depth

Classify meaningful changes before implementation:

### `SPIKE`
A feasibility investigation whose output is an answer, not production code.

Use when:
- the question is “can we?” or “is this possible?”;
- uncertainty is high;
- throwaway experimentation is cheaper than design.

Required:
- define the question and probe;
- obtain approval for the probe when it will perform external/meaningful actions;
- report findings and recommendation;
- do not silently keep throwaway code as production implementation.

### `BOUNDED`
A well-scoped change to an existing flow/component/API.

Use when:
- existing behavior can be inspected;
- scope is narrow;
- interfaces remain mostly stable.

Required:
- inspect current implementation;
- state the short design/approach when behavior changes;
- define tests/evidence;
- implement after the bounded approach is accepted where approval is required.

No full architectural plan document is necessary unless complexity grows.

### `ARCHITECTURAL`
A new project, subsystem, cross-cutting interface change, or major restructuring.

Required:
1. understand intent and constraints;
2. compare viable approaches;
3. write/approve the design/spec;
4. write/approve an implementation plan;
5. only then implement.

If hidden complexity appears, upgrade the classification. Do not downgrade mid-task merely to skip process.

## 0.6 Context-budget rule

Persistent documentation exists to reduce repeated explanation, not to force every agent to read every document on every edit.

Use **progressive context loading**:

1. start with `PROJECT_STATE.md` and the active Task entry;
2. follow references from that task;
3. load only relevant ADR/spec/test/security sections;
4. inspect actual code/runtime evidence;
5. expand context only when ambiguity or risk requires it.

Examples:

- CSS typo → component + DESIGN rule; do not load the full database spec.
- Mongo schema change → DATA_MODEL + relevant ADR/API/security; DESIGN is unnecessary.
- production deployment → PROJECT_STATE + release evidence + deployment/security config; unrelated feature specs are unnecessary.

This rule protects context quality, speed, and model/credit efficiency.

## 0.7 Action-safety rule

Classify external mutations by risk.

### Read-only
Inspect/search/log/query/compare operations may proceed within the authorized task.

### Reversible, bounded mutation
Branch creation, bounded file edits, preview deploys, non-destructive config changes and similar actions may proceed when explicitly in task scope and their target is verified.

### High-impact / irreversible
Require explicit confirmation immediately before the consequential action when it involves:
- production data deletion/bulk destructive writes;
- deleting projects/databases/services;
- purchases/billing;
- access revocation;
- secret rotation that may break production;
- production-destructive infrastructure change;
- irreversible migration without validated rollback.

Always verify account/workspace/project/environment before consequential external writes.

---

# PART 1 — Quick Start

## 1.1 New project

1. Bootstrap tracking.
2. Define problem, user, outcome, MVP, out-of-scope.
3. Research material unknowns.
4. Write PRD and user flows.
5. Write technical requirements.
6. Design architecture, data model and API contracts.
7. Lock design system.
8. Break work into milestones/features/tasks.
9. Setup repo/environment.
10. Implement vertical slices.
11. Test, review and verify every task.
12. Preview deploy.
13. Run release QA, security and compliance gates.
14. Production deploy.
15. Live production verification.
16. SEO/discovery where relevant.
17. Monitoring and iteration.

## 1.2 Existing project

Read first:

1. `docs/00-control/PROJECT_STATE.md`
2. the active/current entry in `TASKS.md`

Then follow only the references needed for that task:
- relevant ADRs from `DECISIONS.md`;
- relevant verification records from `VERIFICATION.md`;
- relevant product/technical/design/security/test specs.

Inspect repository/runtime reality before trusting stale narrative state.

Report:

- current stage;
- last VERIFIED task;
- current task and status;
- blockers;
- exact next action;
- recommended executor/tool.

Do not modify anything before resolving material state conflicts.

## 1.3 Daily task loop

`Pick TASK → Read relevant context → Execute bounded work → Test → Review → Verify → Update trackers → Commit`

## 1.4 New chat/session recovery

Project continuity must never depend on chat history. A completely new ChatGPT or Codex session must be able to recover the project using repository documentation.

---

# PART 2 — Executor Operating Model

## 2.1 Selection priority

Choose by:

`QUALITY → VERIFIABILITY → SAFETY → TASK FIT → FREE ELIGIBILITY → MERN COMPATIBILITY → RELIABILITY → SIMPLICITY → CREDIT EFFICIENCY`

Cost matters, but never outranks quality or safety.

## 2.2 ChatGPT — default project agent

Prefer ChatGPT for:

- product thinking and research;
- PRD/TRD/user flows;
- architecture and data modeling;
- design reasoning;
- bounded code modifications;
- GitHub branch/commit/PR/review operations;
- MongoDB queries/index/schema operations;
- Render/Vercel supported actions;
- Figma-connected workflows;
- Cloudinary/PostHog connected work;
- code review;
- debugging diagnosis;
- small fixes;
- security analysis;
- SEO analysis;
- tracking/documentation.

Keep work in ChatGPT when it is clearly scoped, independently testable, supported by available tools/connectors, and not expected to require a long local edit/run loop.

## 2.3 Codex — heavy execution engine

Use Codex when:

- many tightly coupled files must change together;
- a repository-wide refactor/migration is required;
- local workspace state matters heavily;
- dependency upgrades produce long conflict loops;
- sustained terminal/edit/test/build iteration is expected;
- splitting the task would materially reduce engineering quality.

Do **not** use Codex merely because coding is involved.

## 2.4 Codex Browser

Use when:

- a required operation is only available in an authenticated web dashboard;
- direct connector support is insufficient;
- existing signed-in browser state is helpful;
- real web UI interaction is required.

Passwords should be entered by the user in the browser, not placed in prompts or project files.

For destructive actions (delete project/database, purchase, revoke access, production-destructive settings), obtain explicit approval before the irreversible action.

## 2.5 Specialist tools

Use a specialist only when materially better than generic ChatGPT/Codex.

Examples:

- Context7 — current package/library docs.
- UI UX Pro Max — evidence-backed UX/design decisions.
- Impeccable — UI redesign/polish/audit.
- Motion — advanced interaction implementation.
- Design Motion Principles — motion design/audit.
- Graphify — existing codebase graph/comprehension.
- diagram-design — architecture/process diagrams.
- Playwright — browser/E2E verification.
- Strix — authorized security testing.
- MongoDB skills — schema, query, optimization, search.
- BeyondSEO — SEO audit/planning.

## 2.6 Executor router

```text
Can ChatGPT execute it safely and verifiably?
├─ YES → CHATGPT
└─ NO
   ↓
Can it be split into independent verified tasks?
├─ YES → SPLIT → CHATGPT
└─ NO
   ↓
Is authenticated/manual browser UI required?
├─ YES → CODEX_BROWSER
└─ NO
   ↓
Is sustained local coordinated execution required?
├─ YES → CODEX
└─ NO → BEST SPECIALIST
```

---

# PART 3 — Persistent Project Control & Live Tracking

## 3.1 Recommended structure

```text
project/
├── docs/
│   ├── 00-control/
│   │   ├── PROJECT_STATE.md
│   │   ├── DECISIONS.md
│   │   ├── VERIFICATION.md
│   │   └── SESSION_LOG.md
│   ├── 01-product/
│   │   ├── PRD.md
│   │   ├── RESEARCH.md
│   │   └── USER_FLOWS.md
│   ├── 02-technical/
│   │   ├── TRD.md
│   │   ├── ARCHITECTURE.md
│   │   ├── DATA_MODEL.md
│   │   └── API_CONTRACTS.md
│   ├── 03-design/
│   │   ├── DESIGN.md
│   │   └── UI_INVENTORY.md
│   ├── 04-quality/
│   │   ├── TEST_PLAN.md
│   │   ├── SECURITY.md
│   │   ├── COMPLIANCE.md
│   │   └── LAUNCH_CHECKLIST.md
│   └── plans/
│       └── YYYY-MM-DD-feature-name.md
├── .agent/
│   └── PLANS.md              # optional: complex/multi-hour execution-plan contract
├── AGENTS.md                 # short repo-level instructions for Codex/agents
├── TASKS.md
├── README.md
├── .env.example
└── .gitignore
```

## 3.2 Source-of-truth hierarchy

1. observed repository/runtime/deployment/database reality;
2. `PROJECT_STATE.md`;
3. `DECISIONS.md`;
4. approved PRD/TRD/Architecture/Data/Design specs;
5. `TASKS.md`;
6. `VERIFICATION.md`;
7. `SESSION_LOG.md`;
8. chat history.

Do not silently rewrite a spec to match accidental code. First determine whether code or spec is wrong.

## 3.3 `PROJECT_STATE.md`

Keep roughly 1–2 pages.

```markdown
# PROJECT STATE

Last Updated:
Updated By:

## Project
Name:
Repository:
Primary Environment:

## Current Position
Stage:
Milestone:
Current Task:
Task Status:

## Progress
MVP Features:
Verified:
In Progress:
Blocked:

## Last Verified
Task:
Commit/PR:
Verification Reference:

## Currently Working On
[1–3 sentences]

## Blockers
- None

## Next Action
[one exact action]

## Next 3 Tasks
1.
2.
3.

## Active Environments
Local:
Preview:
Production:

## Important Active Constraints
-

## Relevant Decisions
- ADR-xxx

## Health
Build:
Tests:
Security:
Deployment:
```

Update when stage/task/blocker/deployment state changes.

## 3.4 `TASKS.md`

```markdown
### TASK-042 — Feature Name

Stage:
Milestone:

Goal:

Primary Executor:
CHATGPT | CODEX | CODEX_BROWSER | SPECIALIST

Primary Tools:
-

Dependencies:
-

Relevant Specs:
-

Likely Files:
-

Acceptance Criteria:
- [ ]
- [ ]

Required Tests:
- [ ]

Required Verification:
- [ ]

Codex Escalation Condition:
-

Status:
PROPOSED

Implementation Evidence:
-

Test Evidence:
-

Review Evidence:
-

Verification Reference:
-

Commit / PR:
-

Next Task:
-
```

A task should be independently implementable, testable and reviewable. Split oversized work unless splitting harms coherence/quality.

## 3.5 `DECISIONS.md`

```markdown
## ADR-001 — Decision Title

Date:
Status: PROPOSED | ACCEPTED | SUPERSEDED | REJECTED

Context:
Decision:
Reason:

Alternatives Considered:
- ...

Tradeoffs:
-

Consequences:
-

Related Files:
-

Supersedes:
None
```

Use ADRs for durable choices, not tiny fixes.

## 3.6 `VERIFICATION.md`

```markdown
## VERIFY-042

Date:
Task: TASK-042
Commit / PR:
Environment: LOCAL | PREVIEW | PRODUCTION

Acceptance Criteria:
- PASS —
- PASS —
- FAIL —

Checks Executed:

### Lint
Command/Action:
Result:

### Tests
Command/Action:
Result:

### Build
Command/Action:
Result:

### Browser / E2E
Tool:
Result:

### Security
Tool/Method:
Result:

Observed Evidence:
-

Known Limitations:
-

Final Result:
VERIFIED | FAILED | PARTIAL

Verified By:
CHATGPT | CODEX | PLAYWRIGHT | HUMAN | OTHER
```

Never state a test passed unless it actually ran and the result was observed.

## 3.7 `SESSION_LOG.md`

```markdown
## SESSION-YYYY-MM-DD-NN

Started With:
TASK-xxx

Executor:
CHATGPT | CODEX | MIXED

Work Completed:
-

Files Changed:
-

Tests/Checks:
-

Verified:
-

Not Completed:
-

Problems Found:
-

Decisions Created:
-

Tracking Updated:
-

Next Action:
-
```

Append only. `PROJECT_STATE` is current state; `SESSION_LOG` is history.

## 3.8 Session close

After meaningful work:

1. update `TASKS.md`;
2. update `PROJECT_STATE.md`;
3. add evidence to `VERIFICATION.md`;
4. append `SESSION_LOG.md`;
5. update `DECISIONS.md` only for durable choices;
6. update affected specs if their truth changed;
7. commit tracking changes where possible.

A session that changes project state but leaves tracking stale is incomplete.

## 3.9 `AGENTS.md` — short repository operating contract

Keep repo-level agent instructions **small and durable**. Do not paste this entire Master OS into `AGENTS.md`.

Recommended responsibilities:

- identify MERN as the default stack;
- point to `PROJECT_STATE.md` and `TASKS.md`;
- require task-scoped context loading;
- require evidence before `VERIFIED`;
- identify when complex work must use an execution plan;
- prohibit unrelated refactors and silent architecture changes;
- reference project-specific commands (`test`, `lint`, `build`) when stable.

Codex can automatically load `AGENTS.md` instructions from the repository hierarchy, so this file should contain high-value rules that must travel with the codebase.

Use deeper directory `AGENTS.md` or override instructions only when a subdirectory genuinely needs different rules.

## 3.10 `.agent/PLANS.md` — optional complex-work contract

Use an execution-plan contract only for substantial work such as:

- new subsystem;
- multi-hour feature;
- major refactor;
- migration;
- multi-step change that must remain coherent across context compaction/handoff.

Do **not** require an ExecPlan for trivial or bounded changes.

Feature-specific plans remain in `docs/plans/`; `.agent/PLANS.md` defines what a complex execution plan must contain.

## 3.11 Missing-capability protocol

When a required capability appears unavailable:

1. check native ChatGPT capability;
2. check installed Skills;
3. check connected Plugins/connectors;
4. check whether Codex/local/browser can perform it;
5. search for an external plugin only if it materially improves the task;
6. prefer free or practically useful freemium options;
7. ask the user to install/connect something only when it is actually required.

Never claim a capability is unavailable without checking the current environment.

---

# PART 4 — Documentation System

## PRD — WHAT and WHY

Required:

- problem;
- target users;
- outcome;
- success criteria;
- MVP;
- out-of-scope;
- functional requirements;
- user states;
- constraints;
- assumptions/open questions;
- release criteria.

## RESEARCH

Store only material evidence:

- question;
- why it matters;
- VERIFIED/LIKELY/ASSUMPTION/UNKNOWN findings;
- source/evidence;
- project impact;
- risks;
- recommendation;
- decision triggered.

## USER_FLOWS

For each flow:

- actor;
- entry/precondition;
- happy path;
- alternative/failure paths;
- authorization;
- success state;
- screens/routes/APIs;
- acceptance criteria.

## TRD

Define:

- MERN runtime requirements;
- dependencies;
- external services;
- auth;
- APIs;
- file/media needs;
- performance/security constraints;
- browsers/devices;
- dev/preview/prod strategy;
- explicit non-requirements.

## ARCHITECTURE

Baseline vertical flow:

`React UI → API Client → Express Route → Controller → Service → Validation/Auth → Mongoose → MongoDB → Response → UI State`

Document component responsibilities, boundaries, external services, errors, logging, folder structure and ADRs.

## DATA_MODEL

For each collection document:

- purpose/owner;
- fields/types;
- relationships;
- validation;
- sensitive fields;
- indexes;
- retention/lifecycle;
- embed-vs-reference;
- isolation rules.

Do not create speculative indexes.

## API_CONTRACTS

For each endpoint:

- method/path;
- purpose;
- auth;
- request;
- validation;
- success;
- errors;
- authorization;
- side effects;
- tests.

## DESIGN

Lock:

- personality/principles;
- typography;
- colors;
- spacing;
- grid/breakpoints;
- component rules;
- loading/empty/error states;
- accessibility;
- responsive rules;
- motion policy;
- anti-patterns.

DESIGN.md remains canonical even when Figma contributes.

## UI_INVENTORY

Track reusable components, variants, pages, paths and status to avoid duplication.

## TEST_PLAN

Define unit/integration/API/E2E strategy, responsive/browser coverage, negative cases and release blockers.

## SECURITY

Track requirements for secrets, auth, authorization, isolation, validation, injection, XSS, CORS, headers, rate limits, abuse/cost, uploads, payments, DB, logs, dependencies, backups/restore and security testing.

## COMPLIANCE

Keep legal/compliance concerns separate from security: privacy, cookies, analytics, marketing, minors, subscriptions, copyright, jurisdictions and human/legal review.

## LAUNCH_CHECKLIST

Cover functionality, UI, security, web metadata, forms, performance, compliance, deployment, post-launch verification.

## `.env.example`

Names and safe examples only; never live secrets.

---

# PART 5 — Zero-to-Production Lifecycle

Each stage uses:

**Goal → Input → Do → Primary Executor → Specialist → Prompt → Output → Evidence → Exit Gate → Tracking → Next**

## STAGE 00 — Project Intake & Bootstrap

**Goal:** persistent source of truth before feature work.  
**Primary:** ChatGPT.  
**Use:** Superpowers brainstorming for new architectural work; Karpathy principles for simplicity.

Do:
1. classify new/existing/recovery;
2. inspect repo/files if present;
3. create/normalize control docs;
4. create a short root `AGENTS.md` for repo-level agent rules;
5. add `.agent/PLANS.md` only when complex execution-plan conventions are needed;
6. identify current stage;
7. create first task.

Exit: control system exists and agrees with observed reality.

## STAGE 01 — Idea Definition

Define problem, target user, outcome, MVP, out-of-scope and observable success criteria.  
Primary: ChatGPT.  
Avoid premature implementation/tool selection.

Exit: another engineer can explain success without guessing.

## STAGE 02 — Research

Primary: ChatGPT.

Use:
- native web for current public info;
- Context7 for current technical docs;
- Agent Reach for cross-platform/social research;
- Consensus for academic evidence only when needed.

Label findings with truth status and record impact.

Exit: no major decision rests on a hidden assumption.

## STAGE 03 — Product Specification

Create PRD + USER_FLOWS with actors, permissions, states, failure paths and acceptance criteria.

Exit: implementation does not need to invent product behavior.

## STAGE 04 — Technical Requirements

Primary: ChatGPT.  
Specialists: Context7; diagram-design if a visual materially helps.

Baseline: React + Express + Node + MongoDB/Mongoose.

Output: TRD.

Exit: technical capabilities/constraints are known.

## STAGE 05 — Architecture, Data & API

Primary: ChatGPT.

Specialists:
- MongoDB Schema Design;
- MongoDB Connection;
- Graphify for existing/complex repo;
- diagram-design for controlled diagrams;
- Archify only for interactive architecture presentation.

Define frontend/backend/service/data boundaries, APIs, auth, schema, ownership, indexes, errors/logging.

Output: ARCHITECTURE, DATA_MODEL, API_CONTRACTS, ADRs.

Exit: tasks can be written without redesigning the system.

## STAGE 06 — UX & Design System

Primary: ChatGPT.

Tool roles:
- UI UX Pro Max → UX/design-system reasoning;
- Awesome Claude Design → inspiration when useful;
- gpt-taste → bold/premium visual exploration when justified;
- Figma → editable design artifact;
- DESIGN.md → final source of truth.

Solve hierarchy/navigation/states/responsive/accessibility before visual polish.

Exit: coder does not need to invent fundamental UI rules.

## STAGE 07 — Implementation Planning

Primary: ChatGPT.  
Use Superpowers Writing Plans for substantial/architectural work.

Break milestone → feature → independently testable Task ID.

For architectural/multi-hour work, persist an execution plan under `docs/plans/` and follow the repo's `.agent/PLANS.md` contract when present. For bounded changes, do not create unnecessary plan bureaucracy.

Each task gets executor, acceptance criteria, tests, evidence and Codex escalation condition.

Exit: next task is executable without architectural guessing.

## STAGE 08 — Repository & Environment Setup

Primary: ChatGPT for bounded setup; Codex if local setup becomes heavily iterative.

Configure React, Express/Node, Mongo/Mongoose, lint/format, tests, env, Git and CI basics.

Evidence:
- install succeeds;
- lint/test runner works;
- app boots;
- env documented;
- secrets absent.

## STAGE 09 — Vertical-Slice Development

Default slice:

`React UI → API Request → Express Route → Controller → Service → Validation/Auth → Mongoose → MongoDB → Response → UI State → Tests`

Primary: ChatGPT for bounded tasks.  
Escalate to Codex for large coupled changes/migrations/long local loops.

Rules:
- smallest correct solution;
- no unrelated refactor;
- reuse existing logic;
- no speculative abstraction;
- preserve architecture;
- security review whenever touching auth/data/admin/payment/upload.

After code: status is `IMPLEMENTED`, not VERIFIED.

## STAGE 10 — UI Implementation & Polish

Component default: shadcn/ui.

Use 21st.dev for richer/special components when genuinely useful; never make architecture depend on marketplace availability.

Motion:
- simple → CSS;
- advanced gestures/layout/enter-exit/scroll → Motion;
- motion-quality decision/audit → Design Motion Principles.

Polish:
- Impeccable → craft/polish/audit;
- Agentation → exact DOM/element feedback;
- Floto → optional usability/persona/design diff.

Exit: representative mobile/desktop UI works and is checked.

## STAGE 11 — Testing

Use smallest sufficient evidence.

Typical ladder:

`Lint → Static/Type Check → Unit → Integration → API → E2E → Production Build`

Playwright for real browser flows. Codex for sustained local loops.

Exit: required checks actually executed and relevant failures resolved/recorded.

## STAGE 12 — Debugging

Use:

`Error → Expected → Actual → Reproduction → Constraints`

Then:

`Evidence → Root cause → Responsible component → Smallest fix → Regression test → Reverify`

Primary reasoning: ChatGPT/systematic-debugging.  
Codex: long local cycles.  
Codex Browser: browser-only authenticated reproduction.

## STAGE 13 — Security & Compliance

Security checks based on actual threat surface:

secrets, auth, authorization, isolation, admin, validation, NoSQL/SQL/template/command injection where applicable, XSS, CORS, headers, rate limits, spending caps, uploads, payments, DB, logs, dependencies, backup/restore, wrong-user/wrong-role negative tests.

Strix for authorized specialist testing when justified.

Compliance remains separate: privacy/cookies/marketing/minors/subscriptions/copyright/jurisdictions.

Exit: no unresolved release-blocking security issue and required human/legal review is acknowledged.

## STAGE 14 — Code Review

Review:
correctness, spec match, architecture, security, authorization, isolation, errors, edge cases, performance, accessibility, responsive behavior, duplication, complexity, tests and documentation drift.

Severity:
BLOCKER / HIGH / MEDIUM / LOW / NON-ISSUE.

First pass reports findings before edits.

## STAGE 15 — Preview Deployment

Default:
- Express/Node → Render.
- MongoDB → Atlas.
- React frontend → Render Static or Vercel based on requirements.

Use direct connectors first. Codex Browser only for unsupported authenticated UI actions.

Verify ref/build/env/DB before deploy; record URL/deployment/log evidence after.

## STAGE 16 — Preview QA

Treat preview as release candidate.

Test:
auth, core feature, CRUD, permissions, direct URLs, refresh, invalid input, logged-out state, loading/empty/error, mobile/desktop, 404, forms, metadata, sitemap/robots for public sites, accessibility, performance sanity, security negatives.

Primary browser evidence: Playwright.

Result:
`RELEASE_CANDIDATE_READY` or `RELEASE_CANDIDATE_BLOCKED`.

## STAGE 17 — Production

Require:
- correct commit/ref;
- all release-scope tasks VERIFIED;
- preview QA;
- security;
- required compliance consideration;
- prod env/DB known;
- rollback known;
- monitoring ready.

Deployment success is not completion.

Immediately smoke test app/auth/core feature/DB/API/routes/logged-out/mobile/runtime.

Only then: `PRODUCTION_VERIFIED`.

## STAGE 18 — SEO, Monitoring & Iteration

Public/indexable sites:
HTTPS, title/meta/OG/favicon, sitemap, robots, canonical where needed, alt, performance, Search Console/indexing, internal links, relevant content, credible backlinks/listings.

Do not encode unverified “AI visibility” or “submit to ChatGPT” promises.

PostHog:
events, funnels, errors, replay where appropriate, flags/experiments when useful.

Render/Vercel:
deploy state, runtime logs/errors, infrastructure metrics.

Every actionable observation becomes a Task ID and re-enters the development loop.



---

# PART 6 — Feature Playbooks

## 6.1 Authentication

1. Define signup/login/logout/reset scope.
2. Define user schema and ownership.
3. Choose session/JWT strategy and record durable choice.
4. Add server-side validation.
5. Hash passwords appropriately.
6. Enforce authorization server-side.
7. Add rate limits/abuse controls appropriate to risk.
8. Build React form/loading/error states.
9. Test:
   - valid signup/login;
   - invalid credentials;
   - unauthenticated route;
   - invalid/expired token;
   - wrong user/role;
   - rate limit where required.
10. Run Playwright for critical auth journey.
11. Security review.
12. Verify and track.

## 6.2 Dashboard

1. Define information hierarchy.
2. Define required data/API calls.
3. Model loading/empty/error states.
4. Create/reuse components.
5. Implement each section as a vertical slice.
6. Verify responsive behavior.
7. Check expensive queries/rendering.
8. Test critical interactions.

## 6.3 CRUD Resource

For each resource:

- define ownership;
- schema + validation;
- API contracts;
- service/data access;
- UI states;
- two-user isolation;
- invalid input;
- happy-path E2E.

## 6.4 Admin Panel

Mandatory:

- role authorization on server;
- dangerous-operation confirmation;
- explicit resource scope;
- wrong-role tests;
- no trust in hidden/disabled client controls;
- auditability when risk warrants it.

## 6.5 File Upload

Use Cloudinary/object storage only when needed.

Check:

- allowed types;
- max size;
- filename/metadata;
- quota/rate;
- private/public intention;
- authorization for read/delete;
- malware/content scanning when risk warrants;
- lifecycle cleanup.

## 6.6 Payments

Treat client payment state as untrusted.

Require:

- server verification;
- webhook signature validation;
- idempotency;
- explicit payment states;
- authorization;
- failure/retry behavior;
- secret handling;
- test-mode evidence.

## 6.7 Landing / Marketing Page

Recommended flow:

`PRD/User Intent → UI UX Pro Max → optional premium visual direction → optional Figma → shadcn/21st components → React → purposeful Motion → Impeccable → Playwright responsive QA → SEO`

---

# PART 7 — Tool / Skill Handbook

## 7.1 Selection rule

For one job aim for:

**1 Primary + at most 1 Specialist + at most 1 Fallback**

Do not keep five competing tools because all are interesting.

## 7.2 Current working stack

| Capability | Classification | Cost posture | Exact job |
|---|---|---|---|
| ChatGPT | CORE | Existing Business plan | Default control plane + bounded execution |
| Codex | CORE | Existing allowance | Heavy local/coordinated implementation |
| Codex Browser | CORE escalation | Existing capability | Authenticated browser/dashboard work |
| Superpowers | CORE | Available | Brainstorm/spec/plan/TDD/debug/review/verification discipline |
| Karpathy Guidelines | CORE | Available | Think first, simplicity, surgical changes, prove success |
| Context7 | CORE specialist | FREEMIUM — useful free allowance | Current library/API docs |
| GitHub | CORE connector | Connected | Repo, branch, commit, PR, review, merge |
| MongoDB Atlas + Mongo skills | CORE | Free tier available | Data/schema/query/index/search work |
| Render | CORE deployment | FREEMIUM; free non-prod/hobby | Conventional Node/Express hosting |
| Vercel | SPECIALIST deployment | Hobby restrictions | Frontend/preview/serverless-oriented deployment |
| PostHog | CORE post-launch | FREEMIUM — strong free tier | Product analytics, errors, flags, experiments |
| UI UX Pro Max | CORE design specialist | Available | UX/design-system reasoning |
| Impeccable | CORE design specialist | Open-source | UI craft, redesign, polish, audit |
| shadcn/ui | CORE component source | Open-source | Project-owned accessible React primitives |
| Motion | CORE when advanced motion needed | Open-source core | React/JS interaction animation |
| Design Motion Principles | SPECIALIST | Available | Motion design/audit |
| Figma | SPECIALIST | Freemium | Editable design/design-to-code |
| 21st.dev | SPECIALIST | Current free Builder path | Rich components/templates/search |
| Agentation | SPECIALIST | Free for internal use | Exact live UI annotation |
| Floto | OPTIONAL | Useful free tier | Usability/persona/design-diff |
| Graphify | SPECIALIST | Open-source core | Codebase knowledge graph |
| Archify | OPTIONAL specialist | Open-source | Interactive architecture presentation |
| diagram-design | SPECIALIST | Available | Controlled architecture/process diagrams |
| Playwright | CORE QA | Open-source | Browser/E2E/trace/screenshot verification |
| Strix | SPECIALIST | Re-check exact current OSS/cloud terms | Authorized adversarial security testing |
| BeyondSEO | CORE SEO specialist | Available | SEO audit/planning |
| Semrush | OPTIONAL | Freemium/limited | Quantitative keyword/backlink/traffic data |
| Cloudinary | SPECIALIST | Freemium | Media upload/transform/CDN |
| Namecheap | OPTIONAL | Connected | Domain availability/pricing |
| GSC Wizard | OPTIONAL, not baseline | Paid/trial dependency possible | GSC/GA workflow |
| daisyUI | FALLBACK | Open-source | Only when project already uses/chooses it |
| Base44/Apper-style builders | EXCLUDE CORE | Varies | Can conflict with strict MERN ownership |

### Pricing/availability policy

Terms change. Before making a project depend on a free tier, verify official current pricing, usage restrictions, quotas and commercial-use rules.

## 7.3 Overlap decisions

### UI UX Pro Max vs Impeccable
- UI UX Pro Max = decide UX/design direction.
- Impeccable = build/refine/audit implementation quality.

### gpt-taste vs Impeccable
- gpt-taste = bold/premium exploration.
- Impeccable = broader production craft/polish.

### Figma vs UI UX Pro Max
- UI UX Pro Max = reasoning.
- Figma = editable artifact.

### Graphify vs Archify vs diagram-design
- Graphify = understand source/code relationships.
- Archify = interactive presentation.
- diagram-design = deliberate documentation diagram.

### Agentation vs Playwright
- Agentation = identify exact visual element/problem.
- Playwright = prove behavior.

### Strix vs Playwright
- Playwright = expected user/browser behavior.
- Strix = adversarial security behavior.

### PostHog vs Render/Vercel
- PostHog = user/product behavior.
- Render/Vercel = runtime/infrastructure behavior.

## 7.4 Installation rule

Do not install everything upfront.

Examples:

- reusable component needed → shadcn;
- advanced interaction → Motion;
- exact live annotation → Agentation;
- media upload → Cloudinary;
- codebase graph → Graphify;
- E2E → Playwright.

Keep dependencies and operational surface minimal.

---

# PART 8 — Master Prompt Library

Replace placeholders. Keep work bounded.

## P01 — New Project Bootstrap

```text
Initialize this production-quality MERN project.

Do not start coding yet.

GOAL
Establish product scope, source of truth, tracking, and first executable task.

BASELINE
React + Express + Node.js + MongoDB/Mongoose.

1. Understand problem, target user and outcome.
2. Define smallest useful MVP.
3. Define explicit out-of-scope.
4. Identify VERIFIED FACT / REASONED-LIKELY / ASSUMPTION / UNKNOWN items.
5. Identify research required.
6. Initialize documentation/tracking.
7. Determine current stage.
8. Propose first task.

Do not add unnecessary technology.

Report:
Product understanding
MVP
Out-of-scope
Unknowns
Required research
Documents created/updated
Current stage
Recommended next task
```

## P02 — Resume Project

```text
Resume strictly from repository state.

READ FIRST:
docs/00-control/PROJECT_STATE.md
the active/current entry in TASKS.md

THEN LOAD ONLY WHAT THE ACTIVE TASK REQUIRES:
relevant ADR(s)
relevant prior verification record(s)
relevant PRD/TRD/Architecture/Data/API/Design/Test/Security sections

Do not bulk-read unrelated project docs.

Do not modify anything yet.

Compare repository/runtime reality with tracking.

Report:
CURRENT STAGE
LAST VERIFIED TASK
CURRENT TASK + STATUS
BLOCKERS
RELEVANT DECISIONS
EXACT NEXT ACTION
RECOMMENDED EXECUTOR
RECOMMENDED TOOL/SKILL

If reality conflicts with documentation, report conflict first.
Do not use old chat history as source of truth.
```

## P02A — Classify Change Before Implementation

```text
Classify this request before implementation:

[REQUEST]

Use one:
SPIKE
BOUNDED
ARCHITECTURAL

Base the classification on repository impact, interface changes, uncertainty and coordination—not on how familiar the task sounds.

Report:
CLASSIFICATION
WHY
REQUIRED DESIGN/APPROVAL DEPTH
EXPECTED EXECUTOR
REQUIRED CONTEXT
REQUIRED EVIDENCE

If hidden complexity appears later, upgrade the classification.
Do not downgrade merely to skip process.
```

## P03 — Research

```text
Research:
[QUESTION]

WHY IT MATTERS:
[DECISION]

Use strongest available sources.
For version-sensitive technical APIs prefer official docs/Context7.
For current public facts use current web research.
For scientific claims use authoritative/peer-reviewed evidence when appropriate.

Classify:
VERIFIED FACT
REASONED / LIKELY
ASSUMPTION
UNKNOWN

For each:
finding
evidence/source
confidence
project impact

End:
RECOMMENDATION
DECISION AFFECTED
RISKS
OPEN QUESTIONS

Update RESEARCH.md when material.
Create/update ADR if a durable decision changes.
```

## P04 — Plan Feature

```text
Plan:
[FEATURE]

READ:
PROJECT_STATE
the active/related TASK entries

Then load only the product/technical/design/security/test documents that the feature actually touches.
Examples:
- UI-only: PRD/User Flow/DESIGN/UI Inventory.
- API/data: PRD/TRD/Architecture/Data/API/Security.
- auth/payment/admin: include Security/Test Plan.
- cross-cutting architectural change: load all affected contracts and ADRs.

DO NOT IMPLEMENT.

Confirm:
user outcome
current architecture
dependencies
security boundary
UI states
current implementation

Break into smallest independently testable tasks.

Each:
TASK ID
GOAL
LIKELY FILES/MODULES
DEPENDENCIES
INTERFACES
PRIMARY EXECUTOR
TOOLS
ACCEPTANCE CRITERIA
TESTS
VERIFICATION
CODEX ESCALATION CONDITION

Prefer ChatGPT.
For large work first attempt safe decomposition.
Use Codex only when splitting reduces quality or sustained local execution is materially better.

Update TASKS.md.
```

## P05 — Implement Bounded Task

```text
Implement TASK-[ID].

Read PROJECT_STATE, TASKS and relevant specs.

Before changing:
confirm goal
acceptance criteria
current implementation
allowed scope
dependencies
verification requirements

Prefer ChatGPT if bounded.
If unexpectedly large, split safely or escalate to Codex.

Rules:
follow architecture
smallest correct solution
reuse existing components/services
no duplicate logic
no unrelated refactor
no speculative feature
validate inputs
respect authorization
follow DESIGN.md and SECURITY.md

Run required tests.
Review against acceptance criteria, architecture, security, errors, accessibility/responsive where relevant.

Fix confirmed issues.

Do not mark VERIFIED without evidence.

After success update:
TASKS
PROJECT_STATE
VERIFICATION
SESSION_LOG
DECISIONS only if durable choice changed

Report:
STATUS
FILES CHANGED
IMPLEMENTATION
TESTS
RESULTS
REVIEW FINDINGS
VERIFICATION
LIMITATIONS
COMMIT/PR
NEXT ACTION
```

## P06 — Debug

```text
Investigate before changing code.

ERROR:
[...]
EXPECTED:
[...]
ACTUAL:
[...]
REPRODUCTION:
[...]
ENVIRONMENT:
[...]
CONSTRAINTS:
[...]

Determine:
1. what fails
2. where
3. root cause vs symptom
4. smallest safe correction
5. regression test

Gather logs/code/database/browser/network evidence where possible.

Bounded fix → ChatGPT.
Long local loop → Codex.
Authenticated browser-only reproduction → Codex Browser.

Implement smallest fix.
Reproduce original problem, verify it is gone, run regression and affected tests.

Report:
ROOT CAUSE
RESPONSIBLE COMPONENT
FIX
REGRESSION TEST
EXECUTED EVIDENCE
STATUS
```

## P07 — Code Review

```text
Review [TASK/COMMIT/PR] without modifying first.

Compare with relevant PRD/TRD/Architecture/Data/API/Design/Security/Test specs.

Check:
correctness
architecture
security
authorization/isolation
validation
errors
edge cases
performance
accessibility
responsive behavior
duplication
complexity
tests
documentation drift

Classify:
BLOCKER
HIGH
MEDIUM
LOW
NON-ISSUE

For each finding:
evidence
file/component
impact
smallest fix
verification

End:
READY
READY WITH MINOR FIXES
NOT READY
```

## P08 — Security Review

```text
Security-review [FEATURE/RELEASE] using actual architecture.

Check relevant:
secrets
auth
authorization
user isolation
admin
validation
injection
XSS
CORS/headers
rate limits
abuse/cost controls
uploads
payments
DB
logs/debug
dependencies
backup/restore
negative paths

Classify:
CONFIRMED VULNERABILITY
LIKELY RISK
HARDENING
COMPLIANCE CONCERN
NON-ISSUE

For confirmed issue:
Evidence
Attack/failure path
Impact
Severity
Smallest fix
Required test

Use Strix only when authorized and justified.
Do not claim a scan ran unless it ran.
Do not claim legal compliance.
```

## P09 — UI/UX Design

```text
Design/refine:
[PAGE/FEATURE]

Read PRD, USER_FLOWS, DESIGN, UI_INVENTORY and task/spec.

Solve UX first:
hierarchy
goal
navigation
states
responsive
accessibility
interaction clarity

Then visual system:
typography
color
spacing
components
motion

Use tools only with distinct jobs:
UI UX Pro Max → reasoning
Figma → editable artifact
gpt-taste → premium exploration when justified
shadcn → base components
21st.dev → specialist components/inspiration
Motion → advanced interaction
Design Motion Principles → motion audit
Impeccable → craft/polish
Agentation → exact live feedback

Preserve DESIGN.md as canonical.

Output:
UX DECISIONS
DESIGN DECISIONS
COMPONENTS
STATES
RESPONSIVE
ACCESSIBILITY
MOTION
IMPLEMENTATION NOTES
VERIFICATION PLAN
```

## P10 — MongoDB Task

```text
Perform MongoDB task:
[TASK]

Read DATA_MODEL, ARCHITECTURE, SECURITY and relevant API contracts.

Check:
collection/schema
ownership
indexes
query pattern
expected scale
sensitive data

Use Mongo specialist skill appropriate to the job.

Prefer ChatGPT + MongoDB connector for bounded schema/query/index/explain operations.
Use Codex for large coordinated migrations/scripts.

For destructive writes verify target database/environment first.
Do not modify production data without appropriate authorization.

Verify query/index work with explain/performance evidence where relevant.
Update DATA_MODEL/API_CONTRACTS/DECISIONS/VERIFICATION when affected.
```

## P11 — Preview Deployment

```text
Deploy the current release candidate to PREVIEW only.

Verify:
repository
branch/ref
build
tests
env vars
database target
external services

Use direct connector first.
Use Codex Browser only for unsupported authenticated dashboard action.
Use Codex for substantial local deployment work.

After:
deployment complete
service starts
DB connects
core endpoint/page responds
logs show no launch blocker
preview URL recorded

Update PROJECT_STATE and VERIFICATION.
```

## P12 — Codex Browser Task

```text
WEBSITE:
[...]
GOAL:
[...]
TRACKING TASK:
TASK-[ID]

If login is required, user enters credentials directly in browser.
Never request passwords in chat.

ALLOWED ACTIONS:
[...]

DO NOT:
modify unrelated settings
purchase/delete/revoke/change production-critical items outside scope

DESTRUCTIVE ACTION:
YES/NO

If YES, stop before irreversible action and obtain explicit approval.

SUCCESS CRITERIA:
[...]

EVIDENCE:
final state
resulting config
relevant URL/identifier
screenshot/state evidence when useful

Return:
ACTIONS PERFORMED
FINAL STATE
EVIDENCE
UNRESOLVED ISSUES
```

## P13 — Codex Heavy Handoff

```text
TASK:
TASK-[ID]

GOAL:
[...]

READ FIRST:
PROJECT_STATE
TASKS
relevant specs

ALLOWED SCOPE:
[...]

DO NOT MODIFY:
[...]

ARCHITECTURE CONSTRAINTS:
[...]

ACCEPTANCE CRITERIA:
[...]

REQUIRED TESTS/CHECKS:
[...]

Use smallest coherent implementation.
No unrelated refactor.
Do not change product/architecture decisions without escalating back.

Return:
files changed
implementation summary
commands executed
exact test/build results
remaining issues
diff/commit
items requiring ChatGPT review
```

## P14 — Pre-Production Review

```text
Evaluate preview as production candidate.

Read PROJECT_STATE, VERIFICATION, TEST_PLAN, SECURITY, COMPLIANCE, LAUNCH_CHECKLIST.

Verify:
core functionality
auth/permissions
CRUD/forms
states
responsive/accessibility
security
metadata/404/sitemap/robots
performance
env
monitoring
rollback

Create/reference a task for each failure.

Decision:
READY FOR PRODUCTION
READY WITH NON-BLOCKING ISSUES
NOT READY
```

## P15 — Production Deployment

```text
Promote VERIFIED release candidate to production.

Before:
release candidate
commit/ref
preview verification
security gate
env vars
production DB
domain
rollback

Prefer direct connector.
Codex Browser for authenticated UI-only action.
Codex for substantial local deployment work.

After:
production smoke test
app load
core flow
auth
DB
direct routes
logged-out behavior
critical API
mobile sanity
runtime errors/logs

Update PROJECT_STATE, VERIFICATION, SESSION_LOG.
Do not mark production VERIFIED before live checks.
```

## P16 — Monitoring

```text
Review live product evidence.

PRODUCT / PostHog:
events
funnels
errors
replay where appropriate
flags/experiments

INFRA:
Render/Vercel deploy health
runtime errors/logs
metrics

SEO:
indexing
technical/content issues

DATABASE:
query/index health where relevant

Classify:
INCIDENT
BUG
PERFORMANCE
UX
SEO
OPPORTUNITY
INSUFFICIENT EVIDENCE

Turn actionable findings into Task IDs.
Do not change product behavior from one metric without context.
```

## P17 — Session Close

```text
Close this work session. Do not start new implementation.

Review:
starting task
actual changes
implemented
tested
VERIFIED
incomplete
new decisions
blockers
exact next action

Update:
TASKS
PROJECT_STATE
VERIFICATION
SESSION_LOG
DECISIONS if required

Check drift in relevant PRD/ARCHITECTURE/DATA/API/DESIGN/TEST/SECURITY/README.

Report:
STARTED WITH
COMPLETED
VERIFIED
NOT VERIFIED
FILES CHANGED
TEST EVIDENCE
COMMIT/PR
BLOCKERS
NEXT ACTION
NEXT EXECUTOR
```

## P18 — Emergency State Recovery

```text
Recover true project state. Do not implement/deploy.

Compare:
repository code
branch/commit
PROJECT_STATE
TASKS
DECISIONS
VERIFICATION
recent SESSION_LOG
deployment state where relevant

Identify:
DOCUMENTATION DRIFT
UNCOMMITTED WORK
UNVERIFIED CLAIMS
STALE TASK STATUS
ARCHITECTURE CONFLICT
UNKNOWN STATE

Produce:
ACTUAL CURRENT STATE
LAST TRUSTWORTHY VERIFIED POINT
STALE DOCS
SAFE RECOVERY ACTIONS
RECOMMENDED NEXT TASK

Do not silently rewrite history.
```

---

# PART 9 — Quality Gate System

## Gate 00 — Control Ready
Persistent tracking exists, stage/task known, docs agree with observed reality.

## Gate 01 — Product Definition
Problem, target user, outcome, MVP, out-of-scope and success criteria explicit.

## Gate 02 — Research Confidence
Material unknowns resolved/tracked; no major choice rests on hidden assumption.

## Gate 03 — Product Specification
MVP features have actors, flows, states, authorization and acceptance criteria.

## Gate 04 — Technical Architecture
Frontend/backend/data/auth/environment boundaries are clear enough for implementation planning.

## Gate 05 — Data Model
Ownership, schema, relationships, validation, sensitive fields, indexes and isolation explicit.

## Gate 06 — Design Ready
Hierarchy, components, typography, colors, spacing, responsive, accessibility and motion policy defined.

## Gate 07 — Implementation Plan Ready
Next task independently implementable/testable/reviewable with executor/tests/evidence.

## Gate 08 — Implementation
Scope implemented without unrelated drift → `IMPLEMENTED`.

## Gate 09 — Testing
Required checks actually ran and relevant failures resolved/recorded → `TESTED`.

## Gate 10 — Code Review
Unresolved BLOCKER findings block verification; HIGH normally fixed before verification.

## Gate 11 — Task Verification
All acceptance criteria + evidence pass → `VERIFIED`.

## Gate 12 — UI Quality
User-facing work passes functional, responsive, accessibility and visual checks.

## Gate 13 — Security
Release blockers include confirmed auth bypass, authorization bypass, cross-user exposure, exposed private secrets, critical exploitable injection/RCE, critical admin exposure and serious data-loss risk.

## Gate 14 — Compliance
Applicable obligations identified; required human/legal review acknowledged/completed.

## Gate 15 — Preview Deployment
Correct ref/env/DB known; preview live without immediate blocker.

## Gate 16 — Preview QA
All release-blocking flows pass → release candidate ready.

## Gate 17 — Production Readiness
Correct commit, preview QA, security, env, DB, rollback and monitoring known.

## Gate 18 — Production Deployment
Deployment action completed; not yet production verified.

## Gate 19 — Production Verification
Live smoke tests and runtime evidence pass.

## Gate 20 — SEO / Discovery
Only public/indexable sites; private apps do not block on irrelevant SEO.

## Gate 21 — Observability
Production has a reasonable answer to “how will we know if it breaks?”

## Gate 22 — Iteration Intake
Every actionable observation becomes a tracked task.

### Failure routing

Fix at earliest responsible layer:

- product → PRD/flows;
- architecture → Architecture/Data/API;
- design → DESIGN;
- implementation → task;
- testing → debugging;
- security → security fix;
- preview → owning feature;
- production → incident/rollback/fix.



---

# PART 10 — Testing Handbook

## 10.1 Standard ladder

When applicable:

1. Lint
2. Static/type checks
3. Unit tests
4. Integration tests
5. API tests
6. Browser/E2E tests
7. Production build
8. Security-specific tests
9. Production smoke tests

Not every task needs every layer. Use the smallest sufficient evidence set.

## 10.2 Evidence proportionality

Examples:

- CSS copy/spacing tweak → focused visual check + relevant build/test.
- MongoDB index → representative query + `explain`.
- Authentication → unit/integration/API + E2E + security negative paths.
- Payment webhook → integration + signature + idempotency + failure/retry tests.

## 10.3 Negative-test bank

Use where relevant:

- unauthenticated user;
- wrong user;
- wrong role;
- invalid/expired token;
- malformed body;
- unexpected fields;
- empty values;
- oversized values/files;
- repeated requests/rate limits;
- direct route refresh;
- network/API failure;
- two-user isolation;
- server error without sensitive leakage.

## 10.4 Browser QA

Playwright is the default browser verification specialist for:

- auth;
- navigation;
- forms;
- CRUD;
- responsive behavior;
- screenshots;
- traces;
- console/network inspection.

Do not claim Playwright executed unless actual output was observed.

---

# PART 11 — Security Handbook

## 11.1 Automatic trigger

Security review is mandatory when a task touches:

- authentication;
- authorization;
- sessions/tokens;
- admin;
- user-owned data;
- database writes;
- payments;
- uploads;
- API keys;
- webhooks;
- email;
- password reset.

## 11.2 Secrets

- Never expose private keys/secrets to React/client code.
- Ignore real `.env`.
- Commit `.env.example` only.
- If exposure occurred, inspect history and rotate the secret; deleting the current line is not enough.
- Use least privilege.
- Avoid secrets/tokens/PII in logs.

## 11.3 Authentication

- Appropriate password hashing.
- Session/token validation.
- Expiration/revocation strategy as needed.
- Reset/change flows.
- Abuse/brute-force controls.
- Avoid unbounded expensive hash/crypto work from uncontrolled input.

## 11.4 Authorization & isolation

Client UI is not authorization.

Every protected server action checks role/ownership.

Where user-owned data exists, explicitly test:

`User A → User B resource`

for read and write.

## 11.5 Input / injection

Validate body/params/query on server.

Threats may include:

- NoSQL injection;
- SQL injection if SQL exists;
- template injection;
- command injection;
- schema/prototype pollution;
- ReDoS/resource exhaustion;
- XSS/script injection.

Apply only relevant threats; avoid cargo-cult checklists.

## 11.6 File upload

Check:

- file type;
- size;
- quotas;
- filename/metadata;
- intended public/private access;
- authorization;
- malware/content scanning if risk warrants;
- deletion/lifecycle.

## 11.7 API and cost protection

Consider:

- rate limiting;
- concurrency;
- pagination/maximum result sizes;
- AI/API spending caps;
- bounded upload/body size;
- generic error responses;
- no stack traces/secrets in production.

## 11.8 Database

- private credentials;
- secure connection/TLS as appropriate;
- least privilege;
- no frontend DB connection string;
- validated query inputs;
- indexes where abuse/performance demands;
- backups;
- documented restore;
- restore testing for critical systems.

## 11.9 Security execution model

`Threat checklist → automated negative tests → specialist scan/pentest when justified → remediation → retest`

A prompt is not a pentest. A scan is not proof of security.

---

# PART 12 — Deployment Handbook

## 12.1 Environment progression

Always distinguish:

`LOCAL → PREVIEW → QA → PRODUCTION → LIVE VERIFICATION`

Do not test first in production.

## 12.2 Default MERN deployment boundary

### Backend
Render is the default conventional host for Express/Node web services.

### Database
MongoDB Atlas.

### Frontend
Render Static or Vercel according to project requirements.

Do not force Vercel for a conventional long-running backend when Render is simpler. Record any deliberate override as an ADR.

## 12.3 Connector-first rule

For Render/Vercel/MongoDB:

1. direct ChatGPT connector;
2. Codex Browser if the required dashboard action is unavailable;
3. Codex if substantial local build/config work is required.

## 12.4 Deployment evidence

Record:

- repository;
- branch/ref/commit;
- environment;
- database target;
- deployment ID;
- URL;
- build status;
- runtime/log evidence;
- verification reference;
- rollback path.

## 12.5 Free-tier reality

Free-first is a development/tooling policy, not a promise that serious production infrastructure remains $0 forever.

Current verified posture at this document version:

- MongoDB Atlas: free M0 shared tier available.
- Render: free web services are positioned for testing/hobby/preview and not recommended by Render for production.
- Vercel: Hobby is intended for personal/non-commercial use.
- PostHog: substantial recurring free allowances exist.
- Context7: limited free monthly API allowance exists.
- shadcn/ui: open source/open code.
- Motion core: open source.
- Impeccable: open source.
- Agentation: free for internal individual/company use.
- Floto: recurring free credits.
- Archify: open-source/MIT.
- 21st.dev: current free Builder/marketplace path exists.

Re-verify official terms before locking any external dependency.

---

# PART 13 — SEO & Discovery Handbook

## 13.1 Pre-launch essentials

For public/indexable sites verify:

- HTTPS;
- no accidental `noindex`;
- page titles;
- meta descriptions;
- Open Graph;
- favicon/site identity;
- canonical host/URL strategy where relevant;
- sitemap;
- robots;
- alt text;
- useful 404;
- working internal/external links;
- performance;
- responsive behavior;
- accessibility;
- forms, spam protection and success states.

## 13.2 Post-launch

Consider:

- Google Search Console;
- sitemap submission/verification;
- URL inspection/indexing where warranted;
- Bing/IndexNow where useful;
- analytics;
- Google Business Profile only for relevant local businesses;
- service/topic/content pages based on real user demand;
- internal links;
- performance;
- credible listings/backlinks;
- external traffic/distribution.

## 13.3 Tools

- BeyondSEO — primary audit/planning specialist.
- Semrush — optional quantitative keyword/backlink/traffic data.
- GSC Wizard — optional connected workflow; not required by free-first baseline.

## 13.4 AI-search claims

Do not encode viral claims such as “AI visibility setting” or “submit to ChatGPT” as guaranteed indexing/ranking tactics without current official evidence.

---

# PART 14 — Observability & Iteration

## 14.1 PostHog — product layer

Track only meaningful events and avoid unnecessary sensitive data.

Common events:

- signup/login success;
- activation;
- core feature use;
- completion/conversion;
- critical error;
- retention action.

Use, where valuable:

- analytics;
- funnels;
- error tracking;
- replay with privacy care;
- flags;
- experiments.

## 14.2 Render/Vercel — runtime layer

Use for:

- deploy failures;
- runtime logs;
- runtime error clusters;
- service health;
- CPU/memory/response metrics where available.

## 14.3 MongoDB — data layer

Investigate as needed:

- slow queries;
- explain plans;
- indexes;
- connection pressure;
- storage;
- abnormal usage.

## 14.4 Iteration loop

`Observe → Classify → Create TASK → Plan → Implement → Verify → Deploy → Measure`

Never change product behavior solely because one metric moved without context.

---

# PART 15 — Incident & Recovery Playbook

## 15.1 Severity

### P0 — Critical
Production unavailable, data loss, auth bypass, cross-user data exposure, payment/security catastrophe.

Action: stop normal work.

### P1 — High
Major feature broken or serious security/reliability risk.

### P2 — Medium
Meaningful issue with limited impact/workaround.

### P3 — Low
Polish/minor issue.

## 15.2 Incident loop

1. Detect.
2. Stabilize.
3. Preserve evidence.
4. Identify blast radius.
5. Roll back or apply smallest safe fix.
6. Verify.
7. Root-cause analysis.
8. Create prevention tasks.
9. Update tracking/docs.

---

# PART 16 — Anti-Patterns

Do not:

- `IDEA → AI → DEPLOY`;
- ask AI to “build the whole app” in one task;
- use multiple tools for the same job without distinct value;
- trust frontend authorization;
- place private secrets in client code;
- place Mongo connection URI in frontend;
- accept giant unreviewable tasks;
- refactor unrelated code;
- create speculative abstractions;
- deploy local directly to production without preview QA;
- treat build success as QA;
- treat one security prompt/scan as proof;
- treat AI output as legal certification;
- depend on chat history for project state;
- use Codex for tiny work simply because it is code;
- force ChatGPT through giant coordinated changes merely to save credits;
- add motion everywhere;
- mix component systems as competing defaults;
- accumulate tools without a unique job.

---

# PART 17 — Cost & Free-First Policy

Classify every new dependency:

- `FREE` → allow.
- `FREEMIUM — FREE TIER PRACTICAL` → allow; paid optional.
- `FREE TRIAL ONLY` → exclude baseline.
- `PAID ONLY` → exclude free-first core.
- `FREE BUT TOO LIMITED` → exclude baseline.

Before locking an external service:

1. verify official current pricing/limits;
2. confirm free tier supports exact use;
3. check MERN compatibility;
4. check lock-in/exportability;
5. compare against existing ChatGPT/Codex capability;
6. add only if materially valuable.

Reliability/security/quality take priority over staying at $0.

---

# PART 18 — Project Profiles

## 18.1 Tiny

Minimum:

- PROJECT_STATE
- PRD
- TASKS
- README
- `.env.example`
- tests/security notes appropriate to risk

## 18.2 Standard MERN

Use:

- all control docs;
- PRD/Research/User Flows;
- TRD/Architecture/Data/API;
- Design/UI Inventory;
- Test Plan/Security;
- Launch Checklist.

## 18.3 Production / critical

Add/strengthen:

- Compliance;
- formal gates;
- specialist security testing;
- rollback/incident plan;
- backup/restore verification;
- observability;
- explicit release records.

---

# PART 19 — Handoff & Record Templates

## 19.1 Codex heavy implementation handoff

```markdown
# CODEX IMPLEMENTATION HANDOFF

Task:
Goal:

Read:
-

Allowed Scope:
-

Do Not Modify:
-

Architecture Constraints:
-

Acceptance Criteria:
- [ ]

Required Tests:
-

Required Evidence:
-

Return:
1. files changed
2. implementation summary
3. commands executed
4. exact test/build results
5. remaining issues
6. commit/diff
7. items requiring ChatGPT review
```

## 19.2 Codex browser handoff

```markdown
# CODEX BROWSER TASK

Website:
Goal:
Tracking Task:

User Login Required:
YES / NO

Allowed Actions:
-

Do Not:
-

Destructive Action:
YES / NO

Success Criteria:
-

Required Evidence:
-

Return:
Actions performed
Final state
Evidence
Unresolved issues
```

## 19.3 Gate record

```markdown
## GATE-[ID]

Date:
Stage:
Target:
Environment:
Gate:

Required Checks:
- [ ]

Evidence:
-

Failures:
-

Accepted Risks:
-

Decision:
PASSED | FAILED | BLOCKED | PASSED_WITH_ACCEPTED_RISK

Reviewer/Executor:
Next Action:
```

---

## 19.4 Root `AGENTS.md` starter

```markdown
# Repository Agent Rules

## Stack
Default to MongoDB + Express + React + Node.js unless an accepted ADR says otherwise.

## Start Here
At the start of a new work session, read:
1. `docs/00-control/PROJECT_STATE.md`
2. the active task in `TASKS.md`

Then load only the ADR/spec/test/security sections relevant to that task.

## Task Discipline
- Work from a Task ID for meaningful changes.
- Prefer small independently verifiable changes.
- Do not refactor unrelated code.
- Do not silently change architecture or API/data contracts.
- Do not add speculative dependencies/features.
- Follow existing project patterns.

## Verification
`IMPLEMENTED` is not `VERIFIED`.
Run the checks required by the task and record evidence before claiming completion.

## Complex Work
For architectural, multi-hour, migration or major-refactor work, use an execution plan that follows `.agent/PLANS.md` when that file exists.

## Tracking
After meaningful changes evaluate/update:
- `TASKS.md`
- `docs/00-control/PROJECT_STATE.md`
- `docs/00-control/VERIFICATION.md`
- `docs/00-control/SESSION_LOG.md`

Update `DECISIONS.md` only for durable choices.

## Safety
Verify target environment before external writes.
Require explicit approval before irreversible/high-impact production, billing, deletion or access-revocation actions.
```

## 19.5 Optional `.agent/PLANS.md` starter

```markdown
# Complex Execution Plan Contract

Use an ExecPlan for new subsystems, major refactors, migrations, or other multi-hour coordinated work.

An ExecPlan must be self-contained enough for an engineer/agent with the repository and this plan—but no prior chat—to continue the work.

Required sections:

## Goal
Observable final outcome.

## Context
Relevant current behavior, constraints and accepted decisions.

## Scope
Files/subsystems allowed to change and explicit out-of-scope items.

## Interfaces
Contracts that must remain stable or are intentionally changing.

## Milestones
Small verifiable milestones in dependency order.

## Verification
Exact tests/checks/evidence required per milestone and for final completion.

## Rollback / Recovery
Required for risky migrations or production-impacting changes.

## Progress
Update this section as work proceeds:
- completed;
- current;
- blocked;
- decisions discovered.

## Handoff
Record exact next step so another session can resume without chat history.
```

---

# PART 20 — Master Release Checklist

## Product

- [ ] Problem/user/outcome clear
- [ ] MVP/out-of-scope clear
- [ ] Acceptance criteria clear

## Architecture

- [ ] MERN boundaries documented
- [ ] API contracts documented
- [ ] data ownership/isolation documented
- [ ] durable decisions recorded

## Design

- [ ] design system locked
- [ ] loading/empty/error states covered
- [ ] mobile/desktop behavior defined
- [ ] accessibility considered
- [ ] motion purposeful

## Development

- [ ] release-scope tasks VERIFIED
- [ ] no silent architecture drift
- [ ] no unrelated unfinished refactor

## Testing

- [ ] required lint/static checks
- [ ] required unit/integration/API
- [ ] critical E2E
- [ ] production build
- [ ] negative paths

## Security

- [ ] secrets
- [ ] auth
- [ ] authorization
- [ ] user isolation
- [ ] validation/injection/XSS
- [ ] rate/cost controls
- [ ] uploads/payments where applicable
- [ ] DB/log/dependency checks
- [ ] backup/restore appropriate to risk

## Preview

- [ ] correct commit/env/DB
- [ ] preview live
- [ ] release QA passed
- [ ] no release blocker

## Web / SEO

- [ ] HTTPS
- [ ] 404
- [ ] title/meta/OG/favicon
- [ ] sitemap/robots/indexability where relevant
- [ ] alt/performance
- [ ] forms/spam/success states

## Production

- [ ] prod env verified
- [ ] prod DB verified
- [ ] rollback known
- [ ] monitoring ready
- [ ] live smoke verification passed

## Tracking

- [ ] root AGENTS.md current and concise
- [ ] context loading is task-scoped, not indiscriminate
- [ ] PROJECT_STATE current
- [ ] TASKS current
- [ ] VERIFICATION contains evidence
- [ ] SESSION_LOG appended
- [ ] DECISIONS/specs updated where needed

When all applicable release-blocking checks pass:

`READY FOR PRODUCTION`

After deployment and live verification:

`PRODUCTION VERIFIED`

---

# APPENDIX A — Source Integration

This operating system preserves the strongest principles from the supplied beginner-to-production guide:

- plan before coding;
- define problem/user/outcome/MVP/out-of-scope;
- project documentation before feature generation;
- PRD = what/why;
- Architecture = how;
- durable decisions separate from current state;
- small tasks;
- structured prompts;
- vertical slices;
- testing ladder;
- root-cause debugging;
- Git throughout;
- preview before production;
- environment separation;
- post-deploy verification;
- monitoring and iteration;
- continuous documentation maintenance.

The original guide’s Next.js/Supabase-oriented defaults are deliberately replaced by the fixed MERN source of truth.

---

# APPENDIX B — Video / Reel Findings Integrated

Useful recurring findings were merged rather than copied blindly:

1. **Design process:** site structure → locked design system → section-by-section implementation.
2. **Planning docs:** PRD/TRD/App Flow/UI-UX brief/backend schema/implementation plan expanded into the canonical doc system.
3. **Premium UI tools:** roles separated instead of stacking every design tool.
4. **Impeccable:** UI craft/audit/polish.
5. **UI UX Pro Max:** UX/design reasoning.
6. **shadcn + 21st.dev:** shadcn default; 21st specialist/inspiration.
7. **Motion + Design Motion Principles:** implementation vs quality/audit.
8. **Agentation + Floto:** exact element feedback vs usability/design diff.
9. **Security prompt reels:** converted to threat/test banks; prompts alone are not proof.
10. **Node attack examples:** NoSQL injection, ReDoS/resource abuse, template/command/injection-style risks mapped to relevant review.
11. **Launch checklists:** consolidated into one launch/release gate.
12. **Domain/indexing/SEO:** mapped to real launch/post-launch work.
13. **Superpowers + Karpathy:** planning, simplicity, surgical changes, evidence.
14. **Graphify + Archify:** codebase understanding vs visual architecture presentation.
15. **18-step vibe workflow:** merged with the uploaded guide instead of duplicated.
16. **Legal/compliance:** kept separate from security; sensational fine claims excluded.
17. **“Get listed on ChatGPT” / generic AI-visibility claims:** excluded as guaranteed tactics without official evidence.
18. **Apper/Base44-style backend replacement:** excluded from strict MERN core unless deliberately chosen for a separate prototype.

---

# APPENDIX C — Current Dependency Notes

These are snapshots, not permanent promises.

- MongoDB Atlas currently provides a free M0 shared tier.
- Render free web services currently exist but are explicitly positioned for testing/hobby/preview rather than production.
- Vercel Hobby is intended for personal/non-commercial projects.
- PostHog currently provides substantial recurring free allowances across analytics and related products.
- Context7 currently provides a limited free API allowance.
- shadcn/ui is open-source/open-code.
- Motion core is open source; paid/private add-ons are not baseline requirements.
- Impeccable is open source (Apache-2.0 at this version).
- Agentation is free for internal individual/company use; redistribution has separate terms.
- Floto currently provides recurring free credits.
- Archify is open-source/MIT at this version.
- Graphify has an open-source core; verify exact package/license/version when installing.
- 21st.dev currently exposes a free Builder/marketplace path.

---

# APPENDIX D — v1.1 Audit Corrections

v1.1 specifically corrects these weaknesses found in v1.0:

1. **Codex repository instructions:** added a concise root `AGENTS.md` strategy rather than relying only on external prompts.
2. **Context efficiency:** replaced “read all major docs” behavior with progressive, task-triggered context loading.
3. **Complex planning:** added optional `.agent/PLANS.md` for multi-hour/architectural work while keeping bounded tasks lightweight.
4. **Change classification:** added `SPIKE / BOUNDED / ARCHITECTURAL` so process depth matches risk/complexity.
5. **Approval depth:** architectural changes require design/spec + implementation-plan approval before implementation; bounded work stays lighter.
6. **External-action safety:** unified read-only, reversible mutation and high-impact/irreversible action rules.
7. **Capability recovery:** added a check-native → skills → plugins → Codex/browser → install protocol before declaring a missing tool.
8. **Prompt efficiency:** Resume and Feature Plan prompts now load only relevant docs rather than the whole documentation tree.
9. **Continuity:** complex plans now carry their own progress/handoff state in addition to project-level tracking.
10. **Pricing durability:** exact quotas remain snapshots; current official terms must be rechecked before dependency lock.

---

# Final Operating Principle

The goal is not maximum AI usage or maximum tool usage.

The goal is software that is:

- correct;
- understandable;
- secure;
- testable;
- maintainable;
- evidence-verified;
- resumable across sessions;
- deployable;
- observable after launch.

The shortest safe path wins.

When ChatGPT can do the task well, use ChatGPT.  
When a large coherent execution genuinely needs Codex, use Codex.  
When an authenticated website must be operated, use Codex Browser.  
When a specialist is materially better, use the specialist.  
When evidence is missing, do not call the work complete.
