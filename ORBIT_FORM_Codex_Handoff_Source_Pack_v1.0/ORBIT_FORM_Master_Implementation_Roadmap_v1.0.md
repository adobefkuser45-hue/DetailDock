# ORBIT FORM — Master Implementation Roadmap v1.0

> **For agentic workers:** REQUIRED SUB-SKILL at execution time: use the approved task-execution workflow and follow `AGENTS.md`, `PROJECT_STATE.md`, `TASKS.md`, and the relevant milestone plan. Implement task-by-task; do not skip verification gates.

**Goal:** Build and verify a premium, single-vendor MERN electronics e-commerce portfolio application from approved design through preview and production/demo deployment.

**Architecture:** Online-first MERN modular monolith. React client communicates with an Express REST API; server-side validation/auth/authorization owns privileged rules; Mongoose persists to MongoDB. Exact API contracts, data models, and dependency choices are locked in Stage 01 before product code.

**Tech Stack:** MongoDB + Express.js + React + Node.js. Supporting libraries/services are selected only after current-version/free-tier verification and recorded in project decisions.

**Spec:** `docs/03-design/ORBIT_FORM_Final_Design_Spec_v1.0.md`

## Global Constraints

- MERN is the fixed baseline stack.
- Free-first, but never trade away security/reliability for $0.
- Online-first workflow; project state lives in repository documentation, not chat history.
- `PROPOSED → ATTEMPTED → IMPLEMENTED → TESTED → VERIFIED`.
- Evidence is required before `VERIFIED`.
- Orange = ACT; Lime = DISCOVER; White = EDITORIAL / CONTEXT; Black = COMMERCE / IMMERSION.
- Orbit Form Lab is a recurring signature design concept.
- Product/shop/cart/checkout remain familiar and conversion-oriented.
- Motion is concentrated in hero/Lab/product-story moments; repetitive commerce interactions remain restrained.
- `prefers-reduced-motion` must preserve all information and functionality.
- No unsupported trust/business claims.
- Real-brand assets must be licensed/appropriate or replaced with fictional/demo-safe assets.
- High-impact production actions require explicit confirmation immediately before execution.

## Review Focus

1. **Mobile density:** desktop editorial compositions must become commerce-first mobile layouts rather than shrink proportionally.
2. **Accessibility:** orange/lime accents, icon controls, keyboard navigation, labels, contrast, and reduced-motion behavior must remain usable.
3. **Commerce correctness:** prices, stock, totals, authorization, and order state must be server-controlled and never trusted from the browser.
4. **Demo honesty:** fake customer counts, official-seller claims, unsupported ratings, or misleading guarantees must not ship.
5. **Performance:** cinematic media/motion must not make browsing, search, product grids, or checkout feel slow.

---

## Repository Target Structure

```text
orbit-form/
├── AGENTS.md
├── TASKS.md
├── README.md
├── .env.example
├── .gitignore
├── .agent/
│   └── PLANS.md
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
│   │   ├── ORBIT_FORM_Final_Design_Spec_v1.0.md
│   │   ├── DESIGN.md
│   │   └── UI_INVENTORY.md
│   ├── 04-quality/
│   │   ├── TEST_PLAN.md
│   │   ├── SECURITY.md
│   │   ├── COMPLIANCE.md
│   │   └── LAUNCH_CHECKLIST.md
│   └── plans/
│       └── milestone plans...
├── client/
└── server/
```

---

# Milestone 00 — Project Control / Online-First Bootstrap

**Exit result:** A new session can recover project state without chat history.

### TASK-001 — Create repository and control structure
- Create repo-level instructions/tracking skeleton.
- Add approved design spec to `docs/03-design/`.
- Create initial README and environment example.
- No product code.

### TASK-002 — Initialize project state
- Record project classification: `ARCHITECTURAL`.
- Record current gate, approved visual direction, working brand, blockers, next action.
- Initialize evidence ledger/session log.

**Gate:** G00 Control Ready.

---

# Milestone 01 — Product + Technical Contracts

**Exit result:** Developers no longer need to guess core product behavior, data ownership, APIs, security, or test expectations.

### TASK-010 — Finalize PRD
- Problem, users, goals, MVP, phase-2 portfolio enhancements, out-of-scope, success criteria.

### TASK-011 — Research dependency/runtime/deployment choices
- Verify current React/Node/Express/Mongoose/auth/image/deployment options from current official sources.
- Record only choices that materially affect implementation.

### TASK-012 — Lock user flows
- Guest browsing.
- Search/filter/sort.
- Product detail.
- Register/login/logout/profile.
- Cart/wishlist.
- Checkout.
- COD/demo payment.
- Order confirmation/history/details.
- Reviews.
- Admin catalog/inventory/orders/customers/reviews.

### TASK-013 — Write TRD
- Runtime, browser support, performance baseline, external services, environment model, deployment model.

### TASK-014 — Write architecture contract
- Client feature boundaries.
- API/service boundaries.
- Validation/auth/error/logging boundaries.
- Admin separation.
- Media pipeline.

### TASK-015 — Lock data model
- User, Category, Product, Order, Review, Wishlist and any necessary embedded subdocuments.
- Ownership, index rationale, sensitive fields, order-item snapshot rules.

### TASK-016 — Lock API contracts
- Exact route names, methods, bodies, responses, status codes, auth/role requirements.

### TASK-017 — Security model
- Auth/session strategy.
- Authorization/user isolation.
- Price/stock server authority.
- Rate limits/abuse control.
- input validation.
- XSS/injection/CORS/security headers.
- secrets/logging/media upload rules.
- negative tests.

### TASK-018 — Test plan
- Unit/integration/API/E2E/browser/responsive/accessibility/security/release gates.

**Gate:** Product + technical specs approved before product-code setup.

---

# Milestone 02 — Engineering Foundation

**Exit result:** React and Express applications boot, tests/lint/build run, MongoDB connection is verified in non-production environment.

### TASK-020 — Client foundation
- React application scaffold.
- Router, app shell, design tokens, global styles, error boundary.
- Test runner and linting.

### TASK-021 — Server foundation
- Express application bootstrap.
- Environment validation.
- structured error handling.
- health endpoint.
- test runner/linting.

### TASK-022 — MongoDB integration
- Mongoose connection module.
- startup/shutdown behavior.
- connection failure test.
- safe environment separation.

### TASK-023 — Shared quality baseline
- CI/build checks as appropriate.
- stable test/lint/build commands recorded in `AGENTS.md`.
- no secrets committed.

**Gate:** Foundation `VERIFIED`.

---

# Milestone 03 — Catalog Vertical Slice

**Exit result:** A user can browse real database-backed categories/products from homepage/shop to product detail.

### TASK-030 — Category model + read API
### TASK-031 — Product model + indexes + read API
### TASK-032 — Catalog seed/demo data
### TASK-033 — Homepage commerce shell
### TASK-034 — Category rail
### TASK-035 — Featured/New Arrivals product rails
### TASK-036 — Shop listing
### TASK-037 — Search/filter/sort
### TASK-038 — Product detail
### TASK-039 — Catalog E2E + responsive verification

**Gate:** Catalog feature `VERIFIED`.

---

# Milestone 04 — Authentication + Customer Account

**Exit result:** Customers can securely register/login/logout and access only their own account data.

### TASK-040 — User model + password handling
### TASK-041 — Registration API + tests
### TASK-042 — Login/logout/session API + tests
### TASK-043 — Authentication middleware
### TASK-044 — Role/authorization middleware
### TASK-045 — Registration/login UI
### TASK-046 — Profile API/UI
### TASK-047 — Auth negative/E2E tests

**Gate:** Authentication + account `VERIFIED`.

---

# Milestone 05 — Cart + Wishlist

**Exit result:** Users can build a cart and wishlist without trusting browser-calculated business data.

### TASK-050 — Cart domain/state contract
### TASK-051 — Add/update/remove cart UI
### TASK-052 — Cart page + totals display
### TASK-053 — Wishlist data/API
### TASK-054 — Wishlist UI
### TASK-055 — Cart/wishlist persistence and edge-case tests

**Gate:** Cart + wishlist `VERIFIED`.

---

# Milestone 06 — Checkout + Orders

**Exit result:** Authenticated users can place a valid COD/demo order; server revalidates products, prices, and stock.

### TASK-060 — Order model + order-item snapshot
### TASK-061 — Checkout validation API
### TASK-062 — Server-authoritative order total calculation
### TASK-063 — Safe stock update/order creation transaction strategy
### TASK-064 — Checkout UI
### TASK-065 — COD + clearly labelled Demo Payment
### TASK-066 — Order success
### TASK-067 — My Orders
### TASK-068 — Order details/status
### TASK-069 — Order negative/concurrency/E2E tests

**Gate:** Checkout/order workflow `VERIFIED`.

---

# Milestone 07 — Reviews + Portfolio Enhancements

**Exit result:** Verified review/wishlist enhancements work without compromising core store stability.

### TASK-070 — Review model/API
### TASK-071 — Review ownership/moderation rules
### TASK-072 — Product review UI
### TASK-073 — Review negative tests
### TASK-074 — Portfolio-safe demo content cleanup

**Gate:** Enhancements `VERIFIED`.

---

# Milestone 08 — Admin Commerce

**Exit result:** Admin can manage store operations through server-enforced role permissions.

### TASK-080 — Admin shell + route protection
### TASK-081 — Product create/edit/archive
### TASK-082 — Category management
### TASK-083 — Product image management
### TASK-084 — Inventory management
### TASK-085 — Order list/detail
### TASK-086 — Order-status transitions
### TASK-087 — Customer list
### TASK-088 — Review moderation
### TASK-089 — Basic order/sales statistics
### TASK-090 — Admin authorization + E2E tests

**Gate:** Admin `VERIFIED`.

---

# Milestone 09 — Orbit Form Design + Motion Finish

**Exit result:** Implemented product matches the approved design system across desktop/mobile without degrading commerce UX.

### TASK-100 — Finalize `DESIGN.md` tokens/components from approved spec
### TASK-101 — Header/navigation polish
### TASK-102 — Hero implementation and responsive motion
### TASK-103 — Orbit Form Lab signature module
### TASK-104 — Product-story module system
### TASK-105 — Product-card polish
### TASK-106 — Shop/PDP/cart/checkout responsive polish
### TASK-107 — Reduced-motion and accessibility pass
### TASK-108 — Visual regression / browser QA

**Gate:** UI Quality `PASSED`.

---

# Milestone 10 — Security + Release QA

**Exit result:** No known launch-blocking functional/security/accessibility defects remain.

### TASK-110 — Full code review
### TASK-111 — Security negative tests
### TASK-112 — Dependency/config/secrets review
### TASK-113 — Accessibility/browser/mobile QA
### TASK-114 — Performance sanity
### TASK-115 — Release-candidate checklist
### TASK-116 — Fix blockers and reverify

**Gate:** Release Candidate Ready.

---

# Milestone 11 — Preview → Production/Demo → Portfolio Finish

**Exit result:** A verified portfolio deployment exists and is demonstrably healthy.

### TASK-120 — Preview deployment
### TASK-121 — Preview smoke/E2E QA
### TASK-122 — Production-readiness review
### TASK-123 — Production/demo deployment
### TASK-124 — Live smoke verification
### TASK-125 — SEO/discovery baseline
### TASK-126 — Analytics/monitoring baseline
### TASK-127 — Portfolio README + architecture/case-study material

**Gate:** `PRODUCTION_VERIFIED` / portfolio demo verified.

---

# Executor Routing

| Work | Default |
|---|---|
| Product/technical specs | ChatGPT |
| Current technical research | ChatGPT + official sources |
| MongoDB modeling/query/index work | ChatGPT + MongoDB specialist when useful |
| Bounded coding | ChatGPT |
| Large tightly-coupled/local build loops | Codex |
| Authenticated dashboard UI not exposed by connector | Codex Browser |
| Browser flows | Playwright |
| UX/design reasoning | UI UX Pro Max |
| Final UI craft/audit | Impeccable |
| Motion decisions | Design Motion Principles / Motion when materially useful |
| Adversarial security | Strix when justified |
| SEO | BeyondSEO |
| Product behavior analytics | PostHog |

---

# Plan Generation Strategy

This roadmap deliberately does **not** invent unapproved endpoint names, model fields, dependency versions, or authentication details that are not locked in the approved design source.

Sequence:

1. Execute Milestone 00.
2. Execute Milestone 01 and approve the resulting PRD/TRD/Architecture/Data/API/Security/Test contracts.
3. Generate a detailed code-level plan for Milestone 02 from those approved technical contracts.
4. Repeat detailed planning milestone-by-milestone, keeping every plan testable and small enough to review.
5. Never implement a later milestone by guessing around a missing contract.

---

# Current State

- Visual direction: APPROVED
- Written design spec: APPROVED by user for planning
- Master roadmap: PROPOSED — user review required
- Product code: NOT STARTED
- Next executable milestone: **Milestone 00 — Project Control / Online-First Bootstrap**
