# ORBIT FORM — Milestone 00–01 Pre-Code Plan v1.0

> **For agentic workers:** REQUIRED SUB-SKILL: use the approved execution workflow to perform this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Establish the online-first repository source of truth and lock the product/technical contracts required before any ORBIT FORM product code is written.

**Architecture:** This milestone creates project control files and approved product/technical specifications only. It intentionally does not scaffold React/Express or install dependencies; those actions begin only after the technical-contract gate passes.

**Tech Stack:** MongoDB + Express.js + React + Node.js (implementation details/version choices are researched and locked during this plan).

**Spec:** `docs/03-design/ORBIT_FORM_Final_Design_Spec_v1.0.md`

## Global Constraints

- Online-first: GitHub repository and repo documentation are project truth.
- Do not depend on previous chat history for continuity.
- MERN is fixed.
- Free-first with security/reliability preserved.
- No product code before approved PRD/TRD/Architecture/Data/API/Security/Test contracts.
- Current/version-sensitive technical choices must be verified before lock.
- Evidence is required before `VERIFIED`.

## Review Focus

1. New chat must recover last verified state/current task/next action from repo files.
2. MVP must not accidentally expand into real payments, multi-vendor, courier API, AI, subscriptions, microservices, or enterprise-only features.
3. Data/API contracts must explicitly prevent client-controlled price/stock/role/order-status authority.
4. Auth/authorization must define wrong-user/wrong-role behavior before implementation.
5. Demo copy/assets must not imply unsupported official-seller/customer-count/business claims.

---

### TASK-001 — Create repository control structure

**Files:**
- Create: `AGENTS.md`
- Create: `.agent/PLANS.md`
- Create: `TASKS.md`
- Create: `README.md`
- Create: `.env.example`
- Create: `.gitignore`
- Create: `docs/00-control/PROJECT_STATE.md`
- Create: `docs/00-control/DECISIONS.md`
- Create: `docs/00-control/VERIFICATION.md`
- Create: `docs/00-control/SESSION_LOG.md`
- Create: `docs/01-product/PRD.md`
- Create: `docs/01-product/RESEARCH.md`
- Create: `docs/01-product/USER_FLOWS.md`
- Create: `docs/02-technical/TRD.md`
- Create: `docs/02-technical/ARCHITECTURE.md`
- Create: `docs/02-technical/DATA_MODEL.md`
- Create: `docs/02-technical/API_CONTRACTS.md`
- Create: `docs/03-design/DESIGN.md`
- Create: `docs/03-design/UI_INVENTORY.md`
- Create: `docs/04-quality/TEST_PLAN.md`
- Create: `docs/04-quality/SECURITY.md`
- Create: `docs/04-quality/COMPLIANCE.md`
- Create: `docs/04-quality/LAUNCH_CHECKLIST.md`
- Copy approved spec to: `docs/03-design/ORBIT_FORM_Final_Design_Spec_v1.0.md`
- Copy this roadmap/plan to: `docs/plans/`

**Interfaces:**
- Consumes: approved ORBIT FORM design spec and project operating rules.
- Produces: stable repository locations used by all future ChatGPT/Codex sessions.

- [ ] **Step 1: Create the empty/skeleton repository paths**
  - Check: every required path exists.
- [ ] **Step 2: Write concise root `AGENTS.md`**
  - Must point to `PROJECT_STATE.md` and active `TASKS.md`.
  - Must require task-scoped context, evidence before VERIFIED, no unrelated refactors, plan for architectural work, and external-action safety.
- [ ] **Step 3: Write `.agent/PLANS.md`**
  - Define execution-plan contract for architectural/multi-hour/migration work only.
- [ ] **Step 4: Initialize `PROJECT_STATE.md`**
  - Stage: `00 Project Intake & Bootstrap`
  - Classification: `ARCHITECTURAL`
  - Last Verified: none
  - Current Task: TASK-001
  - Blockers: none unless repository access is unavailable.
- [ ] **Step 5: Initialize `TASKS.md`**
  - Add TASK-001 through TASK-018 with statuses and dependencies from the master roadmap.
- [ ] **Step 6: Initialize evidence/history files**
  - `VERIFICATION.md`: no verification claims yet.
  - `SESSION_LOG.md`: record bootstrap start.
  - `DECISIONS.md`: only already-approved durable decisions.
- [ ] **Step 7: Verify continuity**
  - A fresh-session summary using only `PROJECT_STATE.md`, active task, `AGENTS.md`, and referenced docs must correctly identify stage/current task/next action.
- [ ] **Step 8: Record evidence and set TASK-001 VERIFIED if checks pass**

---

### TASK-010 — Finalize PRD

**Files:**
- Modify: `docs/01-product/PRD.md`
- Modify: `TASKS.md`
- Modify: `docs/00-control/PROJECT_STATE.md`
- Modify: `docs/00-control/VERIFICATION.md`

**Interfaces:**
- Consumes: approved project concept and design spec.
- Produces: approved product scope used by user flows/TRD.

- [ ] **Step 1: Write product problem, target users, goal, portfolio objective**
- [ ] **Step 2: Split scope into Core MVP and Portfolio Enhancements**
- [ ] **Step 3: Preserve explicit out-of-scope**
  - real payment processing;
  - multi-vendor;
  - seller dashboard;
  - real courier API;
  - AI features;
  - subscriptions;
  - complex recommendation engine;
  - microservices;
  - unnecessary enterprise features.
- [ ] **Step 4: Define acceptance-oriented success criteria**
- [ ] **Step 5: Scan for scope contradictions against design spec**
- [ ] **Step 6: Update tracking/evidence**

---

### TASK-011 — Research current technical choices

**Files:**
- Modify: `docs/01-product/RESEARCH.md`
- Modify: `docs/00-control/DECISIONS.md` only for durable accepted choices
- Modify: `TASKS.md`
- Modify: `docs/00-control/VERIFICATION.md`

**Interfaces:**
- Consumes: PRD + fixed MERN baseline.
- Produces: verified inputs for TRD/architecture.

- [ ] **Step 1: Verify current supported React project setup**
- [ ] **Step 2: Verify current Node/Express compatibility**
- [ ] **Step 3: Verify current Mongoose/MongoDB Atlas suitability**
- [ ] **Step 4: Compare auth/session approaches against this portfolio/store use case**
- [ ] **Step 5: Verify image/media options**
- [ ] **Step 6: Verify current preview/portfolio deployment free tiers and restrictions**
- [ ] **Step 7: Record each consequential finding as `VERIFIED FACT`, `REASONED / LIKELY`, `ASSUMPTION`, or `UNKNOWN`**
- [ ] **Step 8: Do not lock a dependency solely because it is popular**
- [ ] **Step 9: Update tracking/evidence**

---

### TASK-012 — Lock user flows

**Files:**
- Modify: `docs/01-product/USER_FLOWS.md`

**Interfaces:**
- Consumes: approved PRD.
- Produces: flows used by API/data/security/test contracts.

For each flow record:
- actor;
- preconditions;
- entry;
- happy path;
- failure path;
- authorization;
- loading/empty/error/success states;
- data touched;
- acceptance criteria.

Required flows:
- browse/search/filter/sort;
- product detail;
- register/login/logout;
- profile;
- cart;
- wishlist;
- checkout;
- COD;
- demo payment;
- order confirmation;
- my orders;
- order detail;
- review create/manage;
- admin product/category/image/inventory/order/customer/review/statistics workflows.

- [ ] **Step 1: Write customer flows**
- [ ] **Step 2: Write admin flows**
- [ ] **Step 3: Add negative wrong-user/wrong-role paths**
- [ ] **Step 4: Verify every Core MVP PRD feature maps to a flow**
- [ ] **Step 5: Update tracking/evidence**

---

### TASK-013 — Write TRD

**Files:**
- Modify: `docs/02-technical/TRD.md`

**Interfaces:**
- Consumes: PRD + Research + User Flows.
- Produces: technical requirements for architecture/data/API.

- [ ] **Step 1: Lock runtime/browser/device requirements**
- [ ] **Step 2: Lock environment model: local/development, preview, production/demo**
- [ ] **Step 3: Define performance/accessibility/security/testing requirements**
- [ ] **Step 4: Define external-service requirements without overengineering**
- [ ] **Step 5: Verify requirements do not introduce out-of-scope enterprise features**
- [ ] **Step 6: Update tracking/evidence**

---

### TASK-014 — Write architecture contract

**Files:**
- Modify: `docs/02-technical/ARCHITECTURE.md`
- Modify: `docs/00-control/DECISIONS.md` when a durable choice is accepted.

**Interfaces:**
- Consumes: TRD + User Flows + design spec.
- Produces: boundaries used by data/API/security planning.

Architecture must define:
- `React UI → API Request → Express Route → Controller → Service → Validation/Auth → Mongoose → MongoDB → Response → UI State → Tests`
- client feature/module boundaries;
- server route/controller/service/model/middleware/validator boundaries;
- media handling;
- error response strategy;
- logging boundary;
- admin authorization boundary.

- [ ] **Step 1: Define client responsibilities**
- [ ] **Step 2: Define server responsibilities**
- [ ] **Step 3: Define request lifecycle**
- [ ] **Step 4: Define error/logging/media boundaries**
- [ ] **Step 5: Record durable decisions**
- [ ] **Step 6: Update tracking/evidence**

---

### TASK-015 — Lock data model

**Files:**
- Modify: `docs/02-technical/DATA_MODEL.md`

**Interfaces:**
- Consumes: user flows + architecture.
- Produces: named entities/ownership/index/query contracts for API design.

Must cover:
- User
- Category
- Product
- Order
- Order item snapshot
- Review
- Wishlist
- any explicitly justified embedded subdocuments

For each:
- fields/types;
- required/optional;
- ownership;
- sensitive values;
- lifecycle/status values;
- relationships;
- query patterns;
- indexes justified by query patterns.

- [ ] **Step 1: Define customer/account entities**
- [ ] **Step 2: Define catalog entities**
- [ ] **Step 3: Define order snapshot/state model**
- [ ] **Step 4: Define review/wishlist**
- [ ] **Step 5: Map indexes to real query patterns**
- [ ] **Step 6: Verify no browser-controlled authority fields**
- [ ] **Step 7: Update tracking/evidence**

---

### TASK-016 — Lock API contracts

**Files:**
- Modify: `docs/02-technical/API_CONTRACTS.md`

**Interfaces:**
- Consumes: user flows + data model + architecture.
- Produces: exact interface contract for later code-level implementation plans.

Every endpoint must define:
- method/path;
- auth/role;
- params/query/body;
- validation;
- success status/body;
- error statuses/bodies;
- ownership rules;
- side effects.

API groups:
- auth;
- products/categories;
- search/filter;
- profile;
- wishlist;
- checkout/orders;
- reviews;
- admin catalog/inventory/orders/customers/reviews/stats;
- media where required.

- [ ] **Step 1: Define public/catalog APIs**
- [ ] **Step 2: Define auth/customer APIs**
- [ ] **Step 3: Define checkout/order APIs**
- [ ] **Step 4: Define review/wishlist APIs**
- [ ] **Step 5: Define admin APIs**
- [ ] **Step 6: Check names/types/status codes are internally consistent**
- [ ] **Step 7: Update tracking/evidence**

---

### TASK-017 — Security model

**Files:**
- Modify: `docs/04-quality/SECURITY.md`
- Modify: `docs/00-control/DECISIONS.md` for accepted durable auth/security decisions.

**Interfaces:**
- Consumes: architecture + data + API.
- Produces: mandatory security acceptance tests for implementation.

- [ ] **Step 1: Define authentication/session strategy**
- [ ] **Step 2: Define authorization and user/admin isolation**
- [ ] **Step 3: Define server authority over price, stock, role, order status**
- [ ] **Step 4: Define validation/injection/XSS/CORS/header controls**
- [ ] **Step 5: Define rate limits and abuse/cost controls**
- [ ] **Step 6: Define image/upload rules**
- [ ] **Step 7: Define secrets/log/error rules**
- [ ] **Step 8: Define required negative tests**
- [ ] **Step 9: Update tracking/evidence**

---

### TASK-018 — Test plan + pre-code gate

**Files:**
- Modify: `docs/04-quality/TEST_PLAN.md`
- Modify: `docs/04-quality/LAUNCH_CHECKLIST.md`
- Modify: `TASKS.md`
- Modify: `docs/00-control/PROJECT_STATE.md`
- Modify: `docs/00-control/VERIFICATION.md`
- Modify: `docs/00-control/SESSION_LOG.md`

**Interfaces:**
- Consumes: all approved product/technical/design/security contracts.
- Produces: pre-code gate and the inputs required to write Milestone 02 code-level plan.

Testing layers:
- lint/build;
- unit;
- service/domain;
- API integration;
- authorization negative tests;
- browser E2E;
- responsive/mobile;
- accessibility;
- security;
- preview/live smoke.

- [ ] **Step 1: Map each MVP acceptance criterion to a test layer**
- [ ] **Step 2: Define release blockers**
- [ ] **Step 3: Cross-check PRD ↔ User Flows ↔ Data Model ↔ API ↔ Security ↔ Design**
- [ ] **Step 4: Resolve contradictions before code**
- [ ] **Step 5: Mark G00/G01–G07 status only with evidence**
- [ ] **Step 6: Set next action to generate Milestone 02 detailed code plan**
- [ ] **Step 7: Close session/update tracking**

---

# Completion Evidence

Milestone 00–01 is complete only when a fresh reviewer can answer, from repository files alone:

- What is ORBIT FORM building?
- What is in/out of MVP?
- Who can do what?
- What are the exact data entities?
- What are the exact API contracts?
- Which rules are server-authoritative?
- What tests prove the system?
- What design/motion rules are binding?
- What is the next implementation task?

If any answer still requires chat-history inference, the pre-code milestone is not VERIFIED.
