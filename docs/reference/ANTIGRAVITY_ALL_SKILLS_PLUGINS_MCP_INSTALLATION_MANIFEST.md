# Google Antigravity — Complete Skills, Plugins, MCP & Tool Installation Manifest

**Version:** 1.0  
**Checked:** 2026-10-09  
**Use with:** `GEMINI.md`, `ANTIGRAVITY_MERN_MASTER_OS.md`, `ANTIGRAVITY_MASTER_INSTRUCTION.md`, and `ANTIGRAVITY_PROMPT_PACK.md`.  
**Scope:** Every unique tool named in the earlier GitHub install list: **18 skills / plugin candidates / development libraries + 8 MCP integrations = 26 entries**.

> **Owner's request:** Prepare all tools for Google Antigravity, process the manifest **one entry at a time**, and ask the owner to complete any required login. **This is an installation queue, not proof that anything has been installed.**
>
> **Important:** Some entries are NOT installable agent skills, and some optional tools directly overlap. For each entry, check compatibility and whether it belongs at the workspace/agent level or inside a specific React/Node project. Mark `NOT APPLICABLE` with a reason when installation would be inappropriate. Do not install conflicting UI systems side by side just to complete the list.

---

## A. Read This Before Starting

### A1. The owner's preferred workflow

- MERN = MongoDB + Express.js + React + Node.js.
- Online-first: keep source and tracking in GitHub when access is available; do not assume saving locally automatically pushes to GitHub.
- Agent performs installation, configuration, verification, documentation and safe handoff where supported. The owner makes product/permission/cost decisions and completes provider login when needed.
- Prefer FREE and genuinely useful FREEMIUM options. Never silently start a free trial, paid plan, chargeable cloud resource, or spend credits.
- Use built-in Antigravity editor, terminal, browser and Git unless a listed specialist provides a specific additional benefit.

### A2. Approval and credential rules — mandatory

1. Before the first installation, **audit** current workspace, available built-in features, installed skills/plugins/MCPs and service connections; save findings.
2. Before **each** third-party installation or new MCP connection, show owner: item name, verified origin, exact intended command or hosted endpoint, install scope, required permissions, costs, risks and rollback/uninstall method; ask for approval.
3. For a provider requiring authentication, **ask the owner to sign in via its official browser/OAuth/login UI**. Do not ask for passwords, OTPs, tokens, API keys, browser cookies or session exports in chat. Never reveal or commit them.
4. If token/API key authentication is the only supported method, guide owner to generate the least-privilege credential, then enter it through a **secure secrets/env/settings UI** (not chat or a tracked file). If that secure path is unavailable, pause this connection and report `BLOCKED — SECURE CREDENTIAL INPUT NEEDED`.
5. Read/install scripts and assess hooks/permissions. Never blindly execute a remote shell script or grant global/unrestricted access.
6. Prefer **workspace-scoped installation** over global. Do not overwrite `GEMINI.md`, `.agents` or existing project configuration. Back up/merge carefully where justified.
7. For MCPs, prefer read-only first; enable mutating permissions only for separately authorized tasks. Never point a testing tool at an unauthorized website.
8. **One at a time** means: assess → approve → install/connect → verify → record result → proceed to next item. On error, diagnose; do not silently skip or claim success.
9. For optional tools that are not relevant yet, recommend `DEFERRED`; if owner explicitly still wants them, explain effects/risks before project-scoped installation.
10. Do not use the label `INSTALLED` unless an actual command/config check and a minimal functional test confirm the installation.

### A3. Status vocabulary

`NOT_CHECKED` · `ALREADY_INSTALLED` · `BUILT_IN` · `APPROVAL_REQUIRED` · `LOGIN_REQUIRED` · `INSTALLED_AND_TESTED` · `CONNECTED_AND_TESTED` · `DEFERRED` · `NOT_APPLICABLE` · `BLOCKED` · `FAILED`

### A4. Safe install order

- **Phase 0:** Discover workspace/agents, Git remote, rule paths, current inventory, package manager, runtime, secrets policy.
- **Phase 1:** Install **portable agent skills/plugins** one by one (entries S01–S06, S09–S10, S12, S14–S17, where compatible).
- **Phase 2:** Review agent guideline entry S02, and platform/project-library entries S07, S08, S11, S13, S18. Do not install app dependencies in an empty or unrelated workspace.
- **Phase 3:** Connect provider MCP servers M01–M08 one by one; ask for login through official UI when actually required. Some will be deferred until provider use begins.
- **Phase 4:** Validate integration; create/update non-secret inventory; report exactly what is ready and what remains.

> The manifest table order is for coverage. Use current provider documentation to determine actual correct commands; **do not assume a generic `npx skills add` works for every entry**.

---

## B. All 18 Skills / Plugins / Libraries / Tools

| ID | Name | True type | GitHub source | Intent and install decision |
|---|---|---|---|---|
| S01 | Superpowers | Antigravity-compatible plugin / skill framework | https://github.com/obra/superpowers | Planning, TDD, debugging, reviews; check existing plugin first. Official README supports `agy plugin install https://github.com/obra/superpowers`, but show owner command/permission before execution. |
| S02 | Karpathy Guidelines | Behavior guidance / possible portable skill adaptation | https://github.com/emavv/karpathy-guidelines | Think before coding; minimal changes. **Not automatically an Antigravity plugin.** Check whether these rules already exist in `GEMINI.md`; avoid duplicate conflicting instructions. |
| S03 | Context7 | MCP documentation service | https://github.com/upstash/context7 | Fresh package docs; configure as MCP, not a local React package. Connection/auth may be needed. Avoid unnecessary calls if native docs suffice. |
| S04 | MongoDB Agent Skills | Official portable skill collection | https://github.com/mongodb/agent-skills | Schema, queries, indexes, search. Install applicable skill(s), not necessarily every bundled skill. Not the same as MongoDB MCP. |
| S05 | UI UX Pro Max | Design skill / optional CLI setup | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | UX, typography, design-system advice. Check repo's current Antigravity install instructions. |
| S06 | Impeccable | Design skill/tool | https://github.com/pbakaus/impeccable | UI craft, polish, audit. Official repo has Antigravity-specific distribution guidance; check actual workspace path before copying. |
| S07 | shadcn/ui | React component source / project dependency | https://github.com/shadcn-ui/ui | Add when frontend starts. **Not an agent skill/MCP.** Default component system if chosen. |
| S08 | Playwright | Browser/E2E test library | https://github.com/microsoft/playwright | Add to test project when required. **Not an Antigravity skill by default.** Built-in browser may already cover simple checks. |
| S09 | 21st.dev Skill | React/shadcn component marketplace skill | https://github.com/21st-dev/skill | Optional component/template search; check current CLI/account access before installing. |
| S10 | TasteSkill / gpt-taste | Visual design skill family | https://github.com/tasteskill/tasteskill | Premium landing page/portfolio. **Repo README may direct installation to `jeettrench/taste-skill`; resolve canonical current upstream before any command.** Do not install every variant. |
| S11 | Motion | React/JS animation library | https://github.com/motiondivision/motion | Add only when advanced UI motion is needed. **Project dependency, not agent plugin.** |
| S12 | Design Motion Principles | Design skill | https://github.com/kylezantos/design-motion-principles | Motion choices, review/audit. Optional if current page uses sophisticated interaction. |
| S13 | Agentation | React live-UI feedback tool | https://github.com/benjitaylor/agentation | Install into a compatible running React project when visual element annotations are valuable. **Not universal agent plugin.** |
| S14 | Graphify | Codebase graph / skill + runtime CLI | https://github.com/Graphify-Labs/graphify | For existing/complex codebase. Repo documents an Antigravity installation path. Check generated rule/workflow behavior against current Antigravity before enabling. |
| S15 | Archify | Architecture diagram skill | https://github.com/tt-a1i/archify | Optional architecture maps. Check Node/runtime and actual Antigravity portable-skill compatibility. |
| S16 | Strix | Standalone authorized security testing tool | https://github.com/usestrix/strix | Specialized security test—not a passive skill. Do **not** run scans or install high-privilege runtime without approval and target authorization. |
| S17 | BeyondSEO | SEO agent tool/skill | https://github.com/beyondtahir/beyondseo | Public site SEO checks; normally relevant before/after launch, not at initial database setup. |
| S18 | daisyUI | Tailwind CSS UI component library | https://github.com/saadeghi/daisyui | Alternative to shadcn strategy. **Do not install into the same project as a second competing default system unless specifically approved.** |

### B1. Notes on non-agent packages

The following are **not** installable universal Antigravity Skills: S07 shadcn/ui, S08 Playwright core, S11 Motion, S13 Agentation, S16 Strix standalone, S18 daisyUI. They may be added to the **application** or separate authorized environment at the appropriate stage. An empty project does not need all of them.

### B2. Two possible duplicates

- S05 UI UX Pro Max + S06 Impeccable: complementary roles (UX planning vs implementation audit), not identical. Check current instructions for overlap before enabling hooks.
- S07 shadcn/ui + S18 daisyUI: **choice of default component strategy**, not “install both.”
- S09 21st.dev Skill + M08 21st MCP: two routes to similar components; prefer only one unless owner has a reason.
- S03 Context7 is itself an MCP entry; do not install it again as a separate duplicate under section C.

---

## C. All 8 Provider / Service MCP Integrations

| ID | MCP / Provider | Official GitHub source | When to connect | Login & access guidance |
|---|---|---|---|---|
| M01 | GitHub MCP Server | https://github.com/github/github-mcp-server | If native Antigravity Git/`git push` is insufficient for GitHub API actions | Owner uses official GitHub login/authorization; grant only needed repository scopes. |
| M02 | MongoDB MCP Server | https://github.com/mongodb-js/mongodb-mcp-server | Atlas collections/queries/DB inspection | Owner authorizes relevant cluster/project in a secure UI; start read-only. Never paste DB URI/password in chat. |
| M03 | Render MCP Server | https://github.com/render-oss/render-mcp-server | Backend hosting/deploy/log access when using Render | Owner authorizes correct Render account/workspace. Do not mutate production on initial connection. |
| M04 | Vercel MCP | https://github.com/vercel/vercel-mcp-overview | If frontend is deployed to Vercel | This GitHub repo is an **overview**, not source code to clone/install. Check hosted MCP `https://mcp.vercel.com`, authorize via official flow. |
| M05 | PostHog MCP | https://github.com/PostHog/posthog/tree/master/services/mcp | Product analytics, errors, funnels after instrumentation | Official MCP service; use its current connection instructions. Keep API credentials in secure settings only. |
| M06 | Figma MCP | https://github.com/figma/mcp-server-guide | Editable Figma design context and work | GitHub link is an official **guide**. Owner signs in to Figma via supported auth flow. Do not assume paid features are free. |
| M07 | Cloudinary MCP Servers | https://github.com/cloudinary/mcp-servers | Only when project uses Cloudinary for uploads/media | Authenticate to the correct Cloudinary cloud/account via secure settings. Avoid exposing API secrets. |
| M08 | 21st.dev MCP | https://github.com/21st-dev/magic-mcp | UI component/template access via MCP | **Legacy compatibility repo.** Current MCP guidance is https://21st.dev/mcp. Prefer latest endpoint and check authorization/usage limits. |

### C1. MCP installation is not necessarily package installation

- Hosted MCP: typically connect an official endpoint and authorize account.
- Local MCP: may require a package/runtime/configuration and environment variables.
- Provider accounts (MongoDB Atlas / Render / Vercel / PostHog / Figma / Cloudinary / GitHub) remain separate; installing a server does **not** automatically log you in.
- Detect whether Antigravity supports each current MCP transport/auth option; if not supported, mark `BLOCKED — INCOMPATIBLE CLIENT/AUTH FLOW` instead of trying workarounds with exposed credentials.

---

## D. One-by-One Execution Checklist

**Antigravity must set the status of each row using actual evidence.** Start with `NOT_CHECKED`.

### D1. Skill / library inventory

- [ ] S01 Superpowers
- [ ] S02 Karpathy Guidelines
- [ ] S03 Context7
- [ ] S04 MongoDB Agent Skills
- [ ] S05 UI UX Pro Max
- [ ] S06 Impeccable
- [ ] S07 shadcn/ui
- [ ] S08 Playwright
- [ ] S09 21st.dev Skill
- [ ] S10 TasteSkill / gpt-taste
- [ ] S11 Motion
- [ ] S12 Design Motion Principles
- [ ] S13 Agentation
- [ ] S14 Graphify
- [ ] S15 Archify
- [ ] S16 Strix
- [ ] S17 BeyondSEO
- [ ] S18 daisyUI

### D2. MCP inventory

- [ ] M01 GitHub
- [ ] M02 MongoDB
- [ ] M03 Render
- [ ] M04 Vercel
- [ ] M05 PostHog
- [ ] M06 Figma
- [ ] M07 Cloudinary
- [ ] M08 21st.dev

### D3. For EVERY item, record this log entry

```markdown
## INSTALL-<ID> — <NAME>
Checked at:
Current status:
Current installed version (if present):
Verified repository / official documentation:
Install or connect target: workspace | global | React app | Node server | hosted MCP | separate security runtime
Expected permissions:
Cost / free-tier considerations:
Existing overlap:
Action proposed:
Owner approval (if required):
Owner login required: yes | no | deferred
Login completed via official UI (if applicable):
Action actually executed:
Execution result (real output):
Functional verification performed:
Rollback/uninstall method:
Final status:
Blocker / next action:
```

Use `docs/00-control/INSTALLATION_LOG.md` when a GitHub repository and project control docs exist. If not, create a non-secret `docs/installation/INSTALLATION_LOG.md` in the workspace and push when GitHub becomes available. Do not store tokens/secrets or sensitive screenshots there.

### D4. Verification examples

- Skill/plugin: recognized in Antigravity's skill/plugin inventory AND a small, harmless invocation behaves as documented.
- Docs MCP: answer one public documentation question through the connected server.
- GitHub MCP: list accessible repositories (read-only).
- MongoDB MCP: list explicitly approved cluster metadata/read-only collections, no writes.
- Render/Vercel: list accessible projects/services, no deployments yet.
- PostHog/Figma/Cloudinary: harmless read-only list/project retrieval.
- React/Node library: detect correct `package.json` dependency and, when relevant, run a focused build/test.

If a functional test is impossible, do not label it `INSTALLED_AND_TESTED`; use `BLOCKED` or `INSTALLED / UNVERIFIED` with an explanation.

---

## E. Paste This Prompt into Google Antigravity

```text
আমাদের project-এর এই file পড়ো:

ANTIGRAVITY_ALL_SKILLS_PLUGINS_MCP_INSTALLATION_MANIFEST.md

এই file-এ উল্লেখ করা ১৮টি Skills/Plugins/Tools এবং ৮টি MCP entry — মোট ২৬টি item — একটা একটা করে audit করে setup করতে চাই।

আমি চাই তুমি যতটা সম্ভব installation/configuration/verification নিজে manage করো, কিন্তু credentials এবং approval আমার নিয়ন্ত্রণে থাকবে।

প্রথমে শুধু environment audit করো:
- Current Antigravity capabilities
- Existing Skills/Plugins/MCPs
- GitHub workspace status
- Already-installed duplicates
- Project vs global install suitability
- Available secure authentication method

তারপর এক নম্বর item থেকে sequentially শুরু করো।

প্রতিটি item-এর জন্য:
1. Official repository/source এবং current instructions verify করো।
2. Existing installation আছে কি না check করো।
3. এটা সত্যিকার Antigravity Skill, plugin, hosted/local MCP, নাকি website-এর React/Node dependency তা classify করো।
4. Required permission, cost এবং conflicts আমাকে জানাও।
5. Install/Connect করার আগে আমার approval চাও।
6. Login লাগলে আমাকে official browser/OAuth/login screen-এ sign in করতে বলো। Chat-এ password, API key, token বা OTP চাইবে না। Secure settings UI না থাকলে credential-dependent setup BLOCKED করো।
7. Approval পেলে supported method-এ install/configure করো।
8. Actual execution result এবং একটি harmless functional test দিয়ে verify করো।
9. INSTALLATION_LOG.md update করো এবং status লিখো।
10. তারপর পরের item-এ যাও।

সব item forced-install করবে না: incompatible, duplicate, paid-only, conflicting UI systems, or project-stage-only packages হলে NOT_APPLICABLE বা DEFERRED status দিয়ে কারণ বলো।

Global/system-level installation, remote scripts, hooks, production write access, destructive operations এবং chargeable plans-এর জন্য সবসময় আলাদা approval লাগবে।

সবশেষে full report দাও:
- Installed and tested
- Connected and tested
- Already installed/built-in
- Owner login pending
- Deferred / not applicable
- Blocked / failed
- Exact next action

এই setup-এর সময় website-এর product code implement করো না।
```

---

## F. Summary for the Owner

1. Place this Markdown file at `docs/reference/ANTIGRAVITY_ALL_SKILLS_PLUGINS_MCP_INSTALLATION_MANIFEST.md` inside the existing Antigravity MERN workspace. It is a **sixth reference file**, not a replacement for your five existing master files.
2. Paste the prompt from section **E** once into Antigravity.
3. For each item, approve or defer as appropriate. If a service needs login, sign in directly on its official page.
4. After the inventory is done, use your original **Prompt S** to start the website and **Prompt N** for normal work.
5. **Do not expect all 26 to become installed**: some are mutually exclusive alternatives, some are app libraries that require a real React project, and some are hosted service connectors.

## G. Source Verification Note

All GitHub repository URLs were checked against publicly available pages on 2026-10-09. A GitHub repo existing does **not** prove that its installer supports the current Antigravity version, that it is risk-free, or that you have access to a provider account. Antigravity must re-check those details before every actual installation.
