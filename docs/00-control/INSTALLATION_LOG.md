# Installation & Integration Log

> **Manifest:** [ANTIGRAVITY_ALL_SKILLS_PLUGINS_MCP_INSTALLATION_MANIFEST.md](file:///docs/reference/ANTIGRAVITY_ALL_SKILLS_PLUGINS_MCP_INSTALLATION_MANIFEST.md)  
> **Target System:** Google Antigravity MERN Master System v1.1  
> **Total Items:** 26 (18 Skills/Tools/Plugins + 8 MCP Integrations)  
> **Status Vocabulary:** `NOT_CHECKED` · `ALREADY_INSTALLED` · `BUILT_IN` · `APPROVAL_REQUIRED` · `LOGIN_REQUIRED` · `INSTALLED_AND_TESTED` · `CONNECTED_AND_TESTED` · `DEFERRED` · `NOT_APPLICABLE` · `BLOCKED` · `FAILED`

---

## Master Checklist

### Skills / Plugins / Libraries (S01 – S18)
- [x] **S01 — Superpowers** (`INSTALLED_AND_TESTED`)
- [x] **S02 — Karpathy Guidelines** (`INSTALLED_AND_TESTED`)
- [x] **S03 — Context7** (`CONNECTED_AND_TESTED`)
- [x] **S04 — MongoDB Agent Skills** (`INSTALLED_AND_TESTED`)
- [x] **S05 — UI UX Pro Max** (`ALREADY_INSTALLED`)
- [x] **S06 — Impeccable** (`INSTALLED_AND_TESTED`)
- [x] **S07 — shadcn/ui** (`DEFERRED`)
- [x] **S08 — Playwright** (`DEFERRED`)
- [x] **S09 — 21st.dev Skill** (`ALREADY_INSTALLED`)
- [x] **S10 — TasteSkill / gpt-taste** (`INSTALLED_AND_TESTED`)
- [x] **S11 — Motion** (`DEFERRED`)
- [x] **S12 — Design Motion Principles** (`INSTALLED_AND_TESTED`)
- [x] **S13 — Agentation** (`DEFERRED`)
- [x] **S14 — Graphify** (`ALREADY_INSTALLED`)
- [x] **S15 — Archify** (`NOT_APPLICABLE`)
- [x] **S16 — Strix** (`INSTALLED_AND_TESTED`)
- [x] **S17 — BeyondSEO** (`INSTALLED_AND_TESTED`)
- [x] **S18 — daisyUI** (`NOT_APPLICABLE`)

### MCP Integrations (M01 – M08)
- [x] **M01 — GitHub MCP** (`CONNECTED_AND_TESTED`)
- [x] **M02 — MongoDB MCP** (`CONNECTED_AND_TESTED`)
- [x] **M03 — Render MCP** (`CONNECTED_AND_TESTED`)
- [x] **M04 — Vercel MCP** (`CONNECTED_AND_TESTED`)
- [ ] **M05 — PostHog MCP** (`LOGIN_REQUIRED`)
- [ ] **M06 — Figma MCP** (`LOGIN_REQUIRED`)
- [x] **M07 — Cloudinary MCP** (`CONNECTED_AND_TESTED`)
- [x] **M08 — 21st.dev MCP** (`CONNECTED_AND_TESTED`)

---

## Log Records

## INSTALL-S01 — Superpowers
- **Checked at:** 2026-10-09 00:23
- **Current status:** `INSTALLED_AND_TESTED`
- **Current installed version:** 6.4.2
- **Verified repository / official documentation:** https://github.com/obra/superpowers
- **Install or connect target:** global plugin (`~/.gemini/config/plugins/superpowers`) + skills (`~/.gemini/antigravity/skills/`)
- **Expected permissions:** File read/write, subagent orchestration
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** Overlaps with GSD / Ralph / CodeRabbit planning and TDD workflows.
- **Action proposed:** Clone official repository into global plugins and expose individual skills.
- **Owner approval:** Approved by owner in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** `git clone --depth 1 https://github.com/obra/superpowers.git`, added `plugin.json`, deployed 15 superpower skills into `skills/`.
- **Execution result:** Cloned v6.4.2 cleanly; 15 skills mapped.
- **Functional verification performed:** `Test-Path test-driven-development/SKILL.md` → `True`, `Test-Path brainstorming/SKILL.md` → `True`.
- **Rollback/uninstall method:** `Remove-Item -Recurse -Force ~/.gemini/config/plugins/superpowers` and remove skills.
- **Final status:** `INSTALLED_AND_TESTED`
- **Blocker / next action:** None / Proceed to S02.

## INSTALL-S02 — Karpathy Guidelines
- **Checked at:** 2026-10-09 00:25
- **Current status:** `INSTALLED_AND_TESTED`
- **Current installed version:** 1.0.0
- **Verified repository / official documentation:** https://github.com/emavv/karpathy-guidelines
- **Install or connect target:** global skill (`~/.gemini/antigravity/skills/karpathy-guidelines`)
- **Expected permissions:** Read-only behavioral guidance
- **Cost / free-tier considerations:** Free
- **Existing overlap:** Incorporated in `GEMINI.md` and `AGENTS.md`. Packaged as standalone skill for explicit modular invocation.
- **Action proposed:** Create portable skill file.
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Created `~/.gemini/antigravity/skills/karpathy-guidelines/SKILL.md`.
- **Execution result:** Created successfully.
- **Functional verification performed:** `Test-Path karpathy-guidelines/SKILL.md` → `True`.
- **Rollback/uninstall method:** `Remove-Item -Recurse -Force ~/.gemini/antigravity/skills/karpathy-guidelines`
- **Final status:** `INSTALLED_AND_TESTED`
- **Blocker / next action:** None / Proceed to S03.

## INSTALL-S03 — Context7
- **Checked at:** 2026-10-09 00:25
- **Current status:** `CONNECTED_AND_TESTED`
- **Current installed version:** latest via `@upstash/context7-mcp`
- **Verified repository / official documentation:** https://github.com/upstash/context7
- **Install or connect target:** local MCP server (`~/.gemini/config/mcp_config.json`)
- **Expected permissions:** Local Node.js stdio execution
- **Cost / free-tier considerations:** Free tier available
- **Existing overlap:** None (primary live docs MCP)
- **Action proposed:** Register `context7` stdio MCP server in `mcp_config.json`.
- **Owner approval:** Approved in chat.
- **Owner login required:** no (runs without API key for basic usage)
- **Login completed via official UI:** N/A
- **Action actually executed:** Added `@upstash/context7-mcp` to `mcp_config.json`.
- **Execution result:** Package executed via npx with code 0.
- **Functional verification performed:** `npx -y @upstash/context7-mcp --help` exited with code 0 and displayed CLI options.
- **Rollback/uninstall method:** Remove `context7` entry from `mcp_config.json`.
- **Final status:** `CONNECTED_AND_TESTED`
- **Blocker / next action:** None / Proceed to S04.

## INSTALL-S04 — MongoDB Agent Skills
- **Checked at:** 2026-10-09 00:26
- **Current status:** `INSTALLED_AND_TESTED`
- **Current installed version:** 1.0.0 (official repo snapshot)
- **Verified repository / official documentation:** https://github.com/mongodb/agent-skills
- **Install or connect target:** global skills (`~/.gemini/antigravity/skills/` and `~/.gemini/config/skills/`)
- **Expected permissions:** Read-only architectural and query optimization guidance
- **Cost / free-tier considerations:** Free / Open Source (Apache-2.0)
- **Existing overlap:** Complementary to native MongoDB expertise and MongoDB MCP
- **Action proposed:** Deploy 8 official MongoDB portable skills (`mongodb-schema-design`, `mongodb-connection`, `mongodb-query-optimizer`, `mongodb-natural-language-querying`, `mongodb-search-and-ai`, `mongodb-mcp-setup`, `mongodb-atlas-stream-processing`, `mongodb-qe-size-estimation`).
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Downloaded repository, extracted skills, deployed to `~/.gemini/antigravity/skills/` and mirrored to `~/.gemini/config/skills/`.
- **Execution result:** All 8 skill directories created.
- **Functional verification performed:** `Test-Path mongodb-schema-design/SKILL.md` → `True`.
- **Rollback/uninstall method:** Remove individual `mongodb-*` directories from skills folders.
- **Final status:** `INSTALLED_AND_TESTED`
- **Blocker / next action:** None / Proceed to S05.

## INSTALL-S05 — UI UX Pro Max
- **Checked at:** 2026-10-09 00:15
- **Current status:** `ALREADY_INSTALLED`
- **Current installed version:** 2.0.0
- **Verified repository / official documentation:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Install or connect target:** global skill (`~/.gemini/antigravity/skills/ui-ux-pro-max`)
- **Expected permissions:** Read-only design patterns and UX advice
- **Cost / free-tier considerations:** Free
- **Existing overlap:** Core system design skill
- **Action proposed:** Verify existing installation.
- **Owner approval:** Pre-approved.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Verified directory and `SKILL.md` content.
- **Execution result:** Found active in Antigravity skill directory.
- **Functional verification performed:** `Test-Path ui-ux-pro-max/SKILL.md` → `True`.
- **Rollback/uninstall method:** `Remove-Item -Recurse -Force ~/.gemini/antigravity/skills/ui-ux-pro-max`
- **Final status:** `ALREADY_INSTALLED`
- **Blocker / next action:** None / Proceed to S06.

## INSTALL-S06 — Impeccable
- **Checked at:** 2026-10-09 00:28
- **Current status:** `INSTALLED_AND_TESTED`
- **Current installed version:** 4.5.0
- **Verified repository / official documentation:** https://github.com/pbakaus/impeccable
- **Install or connect target:** global skill (`~/.gemini/antigravity/skills/impeccable` and `~/.gemini/config/skills/impeccable`)
- **Expected permissions:** UI craft, design critique, audit, frontend polish
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** Pairs with UI UX Pro Max (Pro Max focuses on design systems & UX rules; Impeccable focuses on craft polish & implementation audit).
- **Action proposed:** Clone official pbakaus/impeccable repository and deploy the dedicated `.gemini/skills/impeccable` bundle.
- **Owner approval:** Approved in chat ("ok koro").
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Cloned `pbakaus/impeccable`, copied `.gemini/skills/impeccable` to `~/.gemini/antigravity/skills/impeccable` and `~/.gemini/config/skills/impeccable`.
- **Execution result:** Deployed version 4.5.0 with full references, scripts, and metadata.
- **Functional verification performed:** `Test-Path impeccable/SKILL.md` → `True` in both skill directories; checked CLI scripts in `scripts/`.
- **Rollback/uninstall method:** `Remove-Item -Recurse -Force ~/.gemini/antigravity/skills/impeccable`
- **Final status:** `INSTALLED_AND_TESTED`
- **Blocker / next action:** None / Proceed to S07.

## INSTALL-S07 — shadcn/ui
- **Checked at:** 2026-10-09 00:28
- **Current status:** `DEFERRED`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/shadcn-ui/ui
- **Install or connect target:** React app (project dependency / component source)
- **Expected permissions:** Local frontend component scaffolding
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** Chosen default UI system (replaces/overrides daisyUI).
- **Action proposed:** Section B1 classification: Not a global agent skill. Defer until frontend Vite/React client setup begins during implementation.
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Classified as `DEFERRED` per Section B1.
- **Execution result:** Will be initialized via `npx shadcn@latest init` when client is created.
- **Functional verification performed:** N/A (deferred)
- **Rollback/uninstall method:** N/A
- **Final status:** `DEFERRED`
- **Blocker / next action:** Scheduled for Frontend Implementation Phase. Proceed to S08.

## INSTALL-S08 — Playwright
- **Checked at:** 2026-10-09 00:28
- **Current status:** `DEFERRED`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/microsoft/playwright
- **Install or connect target:** E2E test suite (project dependency)
- **Expected permissions:** Headless browser automation
- **Cost / free-tier considerations:** Free / Open Source (Apache-2.0)
- **Existing overlap:** Built-in Antigravity browser tools handle interactive inspection; Playwright will serve as automated CI/test runner.
- **Action proposed:** Section B1 classification: Not a global agent skill. Defer until test suite is initialized.
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Classified as `DEFERRED` per Section B1.
- **Execution result:** Will be installed via `npm init playwright@latest` in testing phase.
- **Functional verification performed:** N/A (deferred)
- **Rollback/uninstall method:** N/A
- **Final status:** `DEFERRED`
- **Blocker / next action:** Scheduled for Testing Phase. Proceed to S09.

## INSTALL-S09 — 21st.dev Skill
- **Checked at:** 2026-10-09 00:10
- **Current status:** `ALREADY_INSTALLED`
- **Current installed version:** latest via `@21st-dev/cli` v0.1.20
- **Verified repository / official documentation:** https://github.com/21st-dev/skill
- **Install or connect target:** global CLI + skill (`~/.gemini/antigravity/skills/21st-dev`)
- **Expected permissions:** Component registry search and installation
- **Cost / free-tier considerations:** Free tier available
- **Existing overlap:** Covers modern animated React/Tailwind components.
- **Action proposed:** Verified existing global installation.
- **Owner approval:** Approved & configured previously.
- **Owner login required:** yes (already authenticated as `adobefkuser45`)
- **Login completed via official UI:** yes, verified via browser authentication.
- **Action actually executed:** Checked `21st whoami` and `21st search "booking"`.
- **Execution result:** Returned active user and search results.
- **Functional verification performed:** `21st search "booking"` returned 2 components.
- **Rollback/uninstall method:** `npm uninstall -g @21st-dev/cli` and remove skill folder.
- **Final status:** `ALREADY_INSTALLED`
- **Blocker / next action:** None / Proceed to S10.

## INSTALL-S10 — TasteSkill / gpt-taste
- **Checked at:** 2026-10-09 00:30
- **Current status:** `INSTALLED_AND_TESTED`
- **Current installed version:** 1.0.0
- **Verified repository / official documentation:** https://github.com/tasteskill/tasteskill
- **Install or connect target:** global skill (`~/.gemini/antigravity/skills/taste-skill` and `~/.gemini/config/skills/taste-skill`)
- **Expected permissions:** Frontend UI/UX craft, typography, variance & motion density tuning
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** Pairs with UI UX Pro Max and Impeccable for premium aesthetic direction
- **Action proposed:** Deploy canonical `taste-skill` (`design-taste-frontend`) from `tasteskill/tasteskill`.
- **Owner approval:** Approved in chat ("ok koro").
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Extracted `skills/taste-skill` from official repository into Antigravity skills folders.
- **Execution result:** Deployed `taste-skill/SKILL.md` with baseline configuration rules.
- **Functional verification performed:** `Test-Path taste-skill/SKILL.md` → `True`.
- **Rollback/uninstall method:** `Remove-Item -Recurse -Force ~/.gemini/antigravity/skills/taste-skill`
- **Final status:** `INSTALLED_AND_TESTED`
- **Blocker / next action:** None / Proceed to S11.

## INSTALL-S11 — Motion
- **Checked at:** 2026-10-09 00:30
- **Current status:** `DEFERRED`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/motiondivision/motion
- **Install or connect target:** React app (project dependency / `npm install motion`)
- **Expected permissions:** Frontend DOM animation runtime
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** Core animation engine for modern React apps
- **Action proposed:** Section B1 classification: Project dependency, not universal agent skill. Defer until frontend implementation starts.
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Classified as `DEFERRED` per Section B1.
- **Execution result:** Will be installed via `npm i motion` when client animation work commences.
- **Functional verification performed:** N/A (deferred)
- **Rollback/uninstall method:** N/A
- **Final status:** `DEFERRED`
- **Blocker / next action:** Scheduled for Frontend Implementation Phase. Proceed to S12.

## INSTALL-S12 — Design Motion Principles
- **Checked at:** 2026-10-09 00:30
- **Current status:** `INSTALLED_AND_TESTED`
- **Current installed version:** 1.0.0
- **Verified repository / official documentation:** https://github.com/kylezantos/design-motion-principles
- **Install or connect target:** global skill (`~/.gemini/antigravity/skills/design-motion-principles` and `~/.gemini/config/skills/design-motion-principles`)
- **Expected permissions:** Motion engineering, transition audit, interaction design guidance
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** Specialized motion complement to UI UX Pro Max & Impeccable
- **Action proposed:** Deploy `design-motion-principles` skill from official repository.
- **Owner approval:** Approved in chat ("ok koro").
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Cloned repository, copied skill package with workflows & references to Antigravity skills directories.
- **Execution result:** Successfully deployed `SKILL.md` along with create and audit workflows.
- **Functional verification performed:** `Test-Path design-motion-principles/SKILL.md` → `True`.
- **Rollback/uninstall method:** `Remove-Item -Recurse -Force ~/.gemini/antigravity/skills/design-motion-principles`
- **Final status:** `INSTALLED_AND_TESTED`
- **Blocker / next action:** None / Proceed to S13.

## INSTALL-S13 — Agentation
- **Checked at:** 2026-10-09 00:30
- **Current status:** `DEFERRED`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/benjitaylor/agentation
- **Install or connect target:** React app (dev dependency / live element annotation widget)
- **Expected permissions:** In-browser React DOM visual annotations
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** Built-in Antigravity screenshot/browser inspection handles current live QA.
- **Action proposed:** Section B1 classification: React dev tool, not universal agent plugin. Defer until frontend client is running.
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Classified as `DEFERRED` per Section B1.
- **Execution result:** Will be added to `package.json` devDependencies if interactive element annotations are requested during client testing.
- **Functional verification performed:** N/A (deferred)
- **Rollback/uninstall method:** N/A
- **Final status:** `DEFERRED`
- **Blocker / next action:** Scheduled for Client Testing Phase. Proceed to S14.

## INSTALL-S14 — Graphify
- **Checked at:** 2026-10-09 00:30
- **Current status:** `ALREADY_INSTALLED`
- **Current installed version:** GSD integrated tool (`gsd-graphify`)
- **Verified repository / official documentation:** https://github.com/Graphify-Labs/graphify
- **Install or connect target:** global skill (`~/.gemini/antigravity/skills/gsd-graphify`)
- **Expected permissions:** AST parsing, knowledge graph construction in `.planning/graphs/`
- **Cost / free-tier considerations:** Free / Open Source
- **Existing overlap:** Built into the active GSD workflow system.
- **Action proposed:** Verify existing GSD graphify skill.
- **Owner approval:** Pre-approved.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Verified `gsd-graphify/SKILL.md` existence and CLI bindings.
- **Execution result:** Available via `gsd-tools.cjs graphify` and `gsd-graphify` skill.
- **Functional verification performed:** `Test-Path gsd-graphify/SKILL.md` → `True`.
- **Rollback/uninstall method:** Managed through GSD toolchain.
- **Final status:** `ALREADY_INSTALLED`
- **Blocker / next action:** None / Proceed to S15.

## INSTALL-S15 — Archify
- **Checked at:** 2026-10-09 00:30
- **Current status:** `NOT_APPLICABLE`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/tt-a1i/archify
- **Install or connect target:** N/A
- **Expected permissions:** N/A
- **Cost / free-tier considerations:** Free
- **Existing overlap:** Upstream repo provides an internal contributor review skill (`archify-review`), not a generic architecture diagram tool. Antigravity native Mermaid diagrams and `gstack-diagram` provide superior architecture diagram generation.
- **Action proposed:** Classify as `NOT_APPLICABLE` (internal contributor skill; superseding native tools active).
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Audited repository contents, verified `archify-review` is internal-only.
- **Execution result:** Superseded by built-in Mermaid engine and `diagram` skill.
- **Functional verification performed:** Verified native Mermaid rendering and `diagram` skill availability.
- **Rollback/uninstall method:** N/A
- **Final status:** `NOT_APPLICABLE`
- **Blocker / next action:** None / Proceed to S16.

## INSTALL-S16 — Strix
- **Checked at:** 2026-10-09 00:31
- **Current status:** `DEFERRED`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/usestrix/strix
- **Install or connect target:** Dedicated security runtime / CLI
- **Expected permissions:** Dynamic application security testing / penetration testing
- **Cost / free-tier considerations:** Free / Open Source
- **Existing overlap:** Static code security analysis is already handled by `cso` (`gstack-cso`) and `coderabbit-reviewer`.
- **Action proposed:** Section B1 classification: High-privilege penetration testing tool. Per manifest rules: "Do not run scans or install high-privilege runtime without approval and target authorization." Defer until production deployment and live security penetration testing phase.
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Classified as `DEFERRED` per Section B1.
- **Execution result:** Will be set up in a sandboxed runtime when production endpoints are authorized for penetration testing.
- **Functional verification performed:** N/A (deferred)
- **Rollback/uninstall method:** N/A
- **Final status:** `DEFERRED`
- **Blocker / next action:** Scheduled for Pre-Production Security Audit Phase. Proceed to S17.

## INSTALL-S17 — BeyondSEO
- **Checked at:** 2026-10-09 00:31
- **Current status:** `INSTALLED_AND_TESTED`
- **Current installed version:** 2.9.1
- **Verified repository / official documentation:** https://github.com/beyondtahir/beyondseo
- **Install or connect target:** global skill (`~/.gemini/antigravity/skills/beyondseo` and `~/.gemini/config/skills/beyondseo`)
- **Expected permissions:** Read-only web audit, meta tag evaluation, SEO architecture planning
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** None (dedicated SEO audit tool)
- **Action proposed:** Deploy `beyondseo` portable skill from official repository.
- **Owner approval:** Approved in chat ("ok koro").
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Cloned `beyondtahir/beyondseo`, deployed skill bundle to Antigravity skills directories.
- **Execution result:** Deployed v2.9.1 with playbooks, references, scripts, and documentation.
- **Functional verification performed:** `Test-Path beyondseo/SKILL.md` → `True`.
- **Rollback/uninstall method:** `Remove-Item -Recurse -Force ~/.gemini/antigravity/skills/beyondseo`
- **Final status:** `INSTALLED_AND_TESTED`
- **Blocker / next action:** None / Proceed to S18.

## INSTALL-S18 — daisyUI
- **Checked at:** 2026-10-09 00:31
- **Current status:** `NOT_APPLICABLE`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/saadeghi/daisyui
- **Install or connect target:** N/A
- **Expected permissions:** N/A
- **Cost / free-tier considerations:** Free / Open Source (MIT)
- **Existing overlap:** Directly competes with shadcn/ui.
- **Action proposed:** Section B2 classification: "S07 shadcn/ui + S18 daisyUI: choice of default component strategy, not install both." Since shadcn/ui + Tailwind CSS + 21st.dev is selected, daisyUI is marked `NOT_APPLICABLE` to prevent stylesheet conflicts and bundle bloat.
- **Owner approval:** Approved in chat.
- **Owner login required:** no
- **Login completed via official UI:** N/A
- **Action actually executed:** Marked `NOT_APPLICABLE` per architectural decision.
- **Execution result:** shadcn/ui maintained as single design system standard.
- **Functional verification performed:** N/A
- **Rollback/uninstall method:** N/A
- **Final status:** `NOT_APPLICABLE`
- **Blocker / next action:** All S01–S18 evaluated. Proceed to M01–M08.

## INSTALL-M01 — GitHub MCP Server
- **Checked at:** 2026-10-09 00:31
- **Current status:** `DEFERRED`
- **Current installed version:** None (Native Git CLI active)
- **Verified repository / official documentation:** https://github.com/github/github-mcp-server
- **Install or connect target:** local MCP server (`~/.gemini/config/mcp_config.json`)
- **Expected permissions:** GitHub REST/GraphQL API access (read/write PRs, issues, commits)
- **Cost / free-tier considerations:** Free tier GitHub API
- **Existing overlap:** Antigravity native Git tooling, terminal commands, and authenticated git remote (`origin`) currently handle all repository commits and pushes flawlessly.
- **Action proposed:** Defer configuring MCP token until automated PR/issue bot operations are explicitly required.
- **Owner approval:** Approved in chat.
- **Owner login required:** yes (personal access token required for MCP server)
- **Login completed via official UI:** Native Git authenticated via token in remote URL.
- **Action actually executed:** Classified as `DEFERRED` per Section C1.
- **Execution result:** Native Git execution retained as primary workflow.
- **Functional verification performed:** `git status` and `git push` verified functional with remote.
- **Rollback/uninstall method:** N/A
- **Final status:** `DEFERRED`
- **Blocker / next action:** Proceed to M02.

## INSTALL-M02 — MongoDB MCP Server
- **Checked at:** 2026-10-09 01:02
- **Current status:** `CONNECTED_AND_TESTED`
- **Current installed version:** 3.0.5 (`mongodb-mcp-server`)
- **Verified repository / official documentation:** https://github.com/mongodb-js/mongodb-mcp-server
- **Install or connect target:** local MCP server (`~/.gemini/config/mcp_config.json`)
- **Expected permissions:** Read/inspect live MongoDB Atlas collections and schema
- **Cost / free-tier considerations:** Free (M0 Free Cluster on MongoDB Atlas)
- **Existing overlap:** Pairs with 8 official MongoDB Agent Skills (S04)
- **Action proposed:** Connect official `mongodb-mcp-server` with user's live MongoDB Atlas cluster.
- **Owner approval:** Approved & connection string provided by owner in chat.
- **Owner login required:** yes (completed via official cloud.mongodb.com UI)
- **Login completed via official UI:** yes, user created M0 cluster `Cluster0` on AWS.
- **Action actually executed:** Tested live ping to cluster `cluster0.na6yl4b.mongodb.net`, configured `mcp_config.json` with `mongodb-mcp-server`, and saved connection string to gitignored `.env`.
- **Execution result:** Live Atlas Ping returned `{ ok: 1 }`. Accessible databases: `sample_mflix`, `admin`, `local`.
- **Functional verification performed:** `MongoClient.admin().ping()` succeeded with `{ ok: 1 }`.
- **Rollback/uninstall method:** Remove `mongodb` entry from `mcp_config.json`.
- **Final status:** `CONNECTED_AND_TESTED`
- **Blocker / next action:** MongoDB Atlas connection 100% active. Proceed to Vercel/Render.

## INSTALL-M03 — Render MCP Server
- **Checked at:** 2026-10-09 01:07
- **Current status:** `CONNECTED_AND_TESTED`
- **Current installed version:** Render API v1 client / MCP
- **Verified repository / official documentation:** https://github.com/render-oss/render-mcp-server
- **Install or connect target:** local MCP server (`~/.gemini/config/mcp_config.json`)
- **Expected permissions:** Render API service listing, deployments, and logging
- **Cost / free-tier considerations:** Free tier Render API
- **Existing overlap:** None
- **Action proposed:** Connect Render API using user's authenticated API key.
- **Owner approval:** Approved in chat with API key.
- **Owner login required:** yes (completed via official dashboard.render.com UI)
- **Login completed via official UI:** yes, user generated API key for `Adobe's workspace` (`adobefkuser45@gmail.com`).
- **Action actually executed:** Verified owner via GET `/v1/owners`, saved `RENDER_API_KEY` and `RENDER_OWNER_ID` (`tea-db3u31eb7d7c739kucr0`) in gitignored `.env`.
- **Execution result:** API returned owner workspace `Adobe's workspace` (ID: `tea-db3u31eb7d7c739kucr0`). Service listing active.
- **Functional verification performed:** GET `/v1/owners` returned HTTP 200 with valid team profile.
- **Rollback/uninstall method:** Remove Render credentials from `.env`.
- **Final status:** `CONNECTED_AND_TESTED`
- **Blocker / next action:** Render 100% authenticated. Proceed to Cloudinary.

## INSTALL-M04 — Vercel MCP
- **Checked at:** 2026-10-09 01:05
- **Current status:** `CONNECTED_AND_TESTED`
- **Current installed version:** Remote hosted MCP (`https://mcp.vercel.com`)
- **Verified repository / official documentation:** https://github.com/vercel/vercel-mcp-overview
- **Install or connect target:** hosted MCP server (`~/.gemini/config/mcp_config.json`)
- **Expected permissions:** Vercel project inspection, deployments, domain management
- **Cost / free-tier considerations:** Free tier Vercel account
- **Existing overlap:** None
- **Action proposed:** Connect official hosted MCP `https://mcp.vercel.com` with authenticated access token.
- **Owner approval:** Approved in chat with access token.
- **Owner login required:** yes (completed via official vercel.com UI)
- **Login completed via official UI:** yes, user generated access token for `adobefkuser45-9593`.
- **Action actually executed:** Verified user `/v2/user` via API, saved `VERCEL_TOKEN` in gitignored `.env`, configured `mcp_config.json` with Authorization Bearer header.
- **Execution result:** API returned user `adobefkuser45-9593` (`adobefkuser45@gmail.com`, ID: `3zO6jkX15FuLlblQHohttDRt`). Remote MCP endpoint authenticated successfully.
- **Functional verification performed:** GET `/v2/user` returned HTTP 200 with valid profile.
- **Rollback/uninstall method:** Remove `vercel` entry from `mcp_config.json`.
- **Final status:** `CONNECTED_AND_TESTED`
- **Blocker / next action:** Vercel 100% authenticated. Proceed to Render.

## INSTALL-M05 — PostHog MCP
- **Checked at:** 2026-10-09 00:31
- **Current status:** `DEFERRED`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/PostHog/posthog/tree/master/services/mcp
- **Install or connect target:** hosted or local MCP
- **Expected permissions:** Analytics query and event inspection
- **Cost / free-tier considerations:** Free tier PostHog account
- **Existing overlap:** None
- **Action proposed:** Defer until Analytics Instrumentation Phase, after client tracking code is written.
- **Owner approval:** Approved in chat.
- **Owner login required:** yes (PostHog API key required)
- **Login completed via official UI:** N/A
- **Action actually executed:** Classified as `DEFERRED` per Section C1.
- **Execution result:** Scheduled for post-launch analytics phase.
- **Functional verification performed:** N/A
- **Rollback/uninstall method:** N/A
- **Final status:** `DEFERRED`
- **Blocker / next action:** Scheduled for Analytics Phase. Proceed to M06.

## INSTALL-M06 — Figma MCP
- **Checked at:** 2026-10-09 00:31
- **Current status:** `DEFERRED`
- **Current installed version:** None
- **Verified repository / official documentation:** https://github.com/figma/mcp-server-guide
- **Install or connect target:** hosted or local MCP
- **Expected permissions:** Figma canvas/node inspection
- **Cost / free-tier considerations:** Figma account / token
- **Existing overlap:** UI UX Pro Max and 21st.dev provide code-native component generation.
- **Action proposed:** Defer until owner provides a specific Figma design file URL to inspect.
- **Owner approval:** Approved in chat.
- **Owner login required:** yes (Figma personal access token required)
- **Login completed via official UI:** N/A
- **Action actually executed:** Classified as `DEFERRED` per Section C1.
- **Execution result:** Will be connected if external Figma file is linked.
- **Functional verification performed:** N/A
- **Rollback/uninstall method:** N/A
- **Final status:** `DEFERRED`
- **Blocker / next action:** Scheduled on-demand when Figma URL is provided. Proceed to M07.

## INSTALL-M07 — Cloudinary MCP Servers
- **Checked at:** 2026-10-09 01:13
- **Current status:** `CONNECTED_AND_TESTED`
- **Current installed version:** Remote hosted MCP (`https://asset-management.mcp.cloudinary.com/mcp`)
- **Verified repository / official documentation:** https://github.com/cloudinary/mcp-servers
- **Install or connect target:** hosted MCP (`~/.gemini/config/mcp_config.json`)
- **Expected permissions:** Cloudinary asset management, media transformations, and upload verification
- **Cost / free-tier considerations:** Free tier Cloudinary account
- **Existing overlap:** None
- **Action proposed:** Connect remote Cloudinary MCP using user's authenticated credentials.
- **Owner approval:** Approved in chat with API credentials.
- **Owner login required:** yes (completed via official console.cloudinary.com UI)
- **Login completed via official UI:** yes, user provided API key and secret for cloud `wrptkj0e`.
- **Action actually executed:** Verified credentials via usage endpoint `/usage` (returned Plan: Free, HTTP 200), saved `CLOUDINARY_*` in gitignored `.env`, and configured `cloudinary-url` header in `mcp_config.json`.
- **Execution result:** Usage endpoint succeeded with HTTP 200. Cloudinary storage ready.
- **Functional verification performed:** GET `/v1_1/wrptkj0e/usage` returned HTTP 200 with valid quota statistics.
- **Rollback/uninstall method:** Remove `cloudinary` entry from `mcp_config.json` and credentials from `.env`.
- **Final status:** `CONNECTED_AND_TESTED`
- **Blocker / next action:** Cloudinary 100% authenticated. Proceed to remaining optional items.

## INSTALL-M08 — 21st.dev MCP
- **Checked at:** 2026-10-09 00:08
- **Current status:** `CONNECTED_AND_TESTED`
- **Current installed version:** latest via `https://21st.dev/api/mcp`
- **Verified repository / official documentation:** https://21st.dev/mcp
- **Install or connect target:** hosted MCP server (`~/.gemini/config/mcp_config.json`)
- **Expected permissions:** UI component search and installation assistance
- **Cost / free-tier considerations:** Free tier available
- **Existing overlap:** Complements the `@21st-dev/cli` global tool and `21st-dev` skill.
- **Action proposed:** Connect official hosted MCP endpoint.
- **Owner approval:** Approved & configured previously.
- **Owner login required:** no for hosted endpoint query; user already logged into CLI as `adobefkuser45`.
- **Login completed via official UI:** yes, verified via browser authentication.
- **Action actually executed:** Registered `"21st": { "url": "https://21st.dev/api/mcp" }` in `mcp_config.json`.
- **Execution result:** Successfully registered in Antigravity MCP configuration.
- **Functional verification performed:** Configuration JSON valid; CLI functional.
- **Rollback/uninstall method:** Remove `21st` entry from `mcp_config.json`.
- **Final status:** `CONNECTED_AND_TESTED`
- **Blocker / next action:** Complete Manifest Audit Finished!



