# Google Antigravity MERN Prompt Pack v1.1

> **Operating System:** Google Antigravity MERN Master System v1.1  
> **Instruction Base:** [GEMINI.md](file:///GEMINI.md)  
> **Master Architecture:** [MERN_Master_Web_Coding_OS_v1.1.md](file:///docs/reference/MERN_Master_Web_Coding_OS_v1.1.md)

Use this Prompt Pack with Google Antigravity. You do not need to manage documentation or tracking manually—Antigravity will maintain the online-first repository workflow, task status, verification records, and session history automatically.

---

## ⚡ PROMPT Q — ONE-TIME SETUP

Use this prompt when initializing the repository or setting up the Google Antigravity MERN Master System for a new project.

```text
আমাদের Google Antigravity MERN Master System v1.1 setup করো।

প্রথমে `GEMINI.md` এবং `docs/reference/ANTIGRAVITY_PROMPT_PACK.md` পড়ো।

Prompt Pack-এর **Prompt Q — ONE-TIME SETUP** execute করো।

৫টা Master File সঠিক জায়গায় আছে কি না verify করো:
1. GEMINI.md (Root)
2. docs/reference/MERN_Master_Web_Coding_OS_v1.1.md
3. docs/reference/ANTIGRAVITY_PROMPT_PACK.md
4. AGENTS.md (Root)
5. .agent/PLANS.md

GitHub repository connection, current branch এবং workspace state check করো।

Existing files overwrite করবে না।
এখন website coding শুরু করবে না।

Setup complete হলে আমাকে status এবং exact next step বলো।
```

---

## 🛠️ PROMPT K — SKILL / PLUGIN / MCP AUDIT & SETUP

Use this prompt to audit available agent skills, plugins, and development tools before kicking off complex milestones.

```text
Prompt Pack-এর **Prompt K — Skill / Plugin / MCP Audit & Setup** follow করো।

আমাদের existing Skills, Plugins, MCP এবং built-in tools check করো।
কোনগুলো already available, কোনগুলো install করা দরকার তা audit করো।

আমাদের MERN workflow-এর জন্য প্রয়োজনীয় tools, compatibility, GitHub source এবং security check করো।
সব দরকারি tools-এর installation plan তৈরি করো।

আমার approval ছাড়া third-party installation বা global configuration change করবে না।
শেষে installed এবং pending tools-এর status জানাও।
```

---

## 🚀 1. NEW PROJECT — IDEA INTAKE & SPECIFICATION

Use this prompt when kicking off a new MERN project from scratch.

```text
আমাদের Master Web Coding OS follow করে এই নতুন MERN website project শুরু করো।

আমার website idea:
[এখানে প্রজেক্টের নাম ও আইডিয়া বিস্তারিত লিখব]

আমি online-first workflow চাই।
আমি manually documentation, task tracking, project state বা technical files manage করতে চাই না—এগুলো তুমি manage করবে।

Default stack:
- MongoDB (Mongoose)
- Express.js
- React
- Node.js

এখনই code লেখা শুরু করো না।

প্রথমে:
1. আমার idea properly বুঝো
2. target user, problem এবং goal define করো
3. smallest useful MVP define করো
4. out-of-scope define করো
5. প্রয়োজনীয় research করো
6. architecture এবং design plan করো
7. GitHub repository/documentation/tracking setup করো বা verify করো
8. implementation Tasks তৈরি করো
9. আমাকে current stage এবং exact next step বলো

প্রয়োজনীয় ক্ষেত্রে GSD workflow, CodeRabbit review, বা specialist skills ব্যবহার করো।
Evidence ছাড়া কোনো কাজ VERIFIED বলবে না।
```

---

## 🔄 2. CONTINUE PROJECT — MOST COMMON PROMPT

Use this prompt for normal, daily sprint work when continuing active tasks.

```text
Current project state check করো এবং next ready Task continue করো।

Master Web Coding OS এবং project tracking follow করো।
Relevant context শুধু load করো; unrelated docs bulk-read করো না।

Task complete হলে:
implement
→ test
→ review (CodeRabbit / peer audit)
→ fix
→ verify
→ tracking update (TASKS.md, PROJECT_STATE.md, VERIFICATION.md)

Evidence ছাড়া VERIFIED বলবে না।

শেষে আমাকে বলো:
- কী complete হয়েছে
- কী VERIFIED
- কোনো blocker আছে কি না
- exact next Task কী
```

---

## 🔁 3. CHAT FULL / NEW CHAT — RESUME PROMPT

Use this prompt when starting a new session or window to seamlessly restore context from repository files.

```text
এই project resume করো।

Previous chat history-এর ওপর depend করো না।
GitHub repository এবং project tracking থেকে current state recover করো।

প্রথমে পড়ো:
1. docs/00-control/PROJECT_STATE.md
2. current/active Task in TASKS.md
3. GEMINI.md

তারপর current Task-এর জন্য প্রয়োজনীয় relevant:
- Decisions (docs/00-control/DECISIONS.md)
- Verification records (docs/00-control/VERIFICATION.md)
- Product/technical/design/security docs touched by the task
- Actual code/runtime state

Unrelated documentation bulk-read করো না।
এখনো কোনো change করো না।

আমাকে শুধু বলো:
1. Current Stage
2. Last VERIFIED Task
3. Current Task
4. Current Task Status
5. Current Blocker
6. Exact Next Action
7. Recommended Executor & Tools

State clear হলে আমার নির্দেশে continue করো।
```

---

## 🛑 4. SESSION CLOSE — STOPPING WORK

Use this prompt before concluding a work session.

```text
এই project session close করো।

নতুন implementation শুরু করো না।

আজকে:
- কী change হয়েছে
- কী IMPLEMENTED
- কী TESTED
- কী VERIFIED
- কী incomplete
- কী blocker
- exact next action কী
check করো।

তারপর project tracking update করো:
- TASKS.md
- docs/00-control/PROJECT_STATE.md
- docs/00-control/VERIFICATION.md
- docs/00-control/SESSION_LOG.md

Permanent architecture/product decision change হলে শুধু তখন DECISIONS.md update করো।
Actual implementation-এর কারণে stale হওয়া project docs update করো।

শেষে আমাকে বলো:
COMPLETED:
VERIFIED:
NOT VERIFIED:
BLOCKERS:
NEXT TASK:
```

---

## ✨ 5. NEW FEATURE REQUEST

Use this prompt when introducing a feature to an existing project.

```text
আমি existing project-এ এই নতুন feature add করতে চাই:

[ফিচারের বিবরণ লিখব]

এখন code করো না।

আগে:
1. feature-এর user value বুঝো
2. existing product/architecture-এর সাথে fit check করো
3. BOUNDED না ARCHITECTURAL classify করো
4. user flow impact check করো
5. database/API/security/design impact check করো
6. প্রয়োজনীয় docs/decisions update করো
7. ছোট verifiable Tasks তৈরি করো
8. আমাকে implementation plan এবং exact next step দেখাও

Approval ছাড়া বড় architectural change implement করো না।
```

---

## 🐛 6. BUG / ERROR INVESTIGATION

Use this prompt for systematic root-cause debugging.

```text
এই problem debug করো।

Problem:
[সমস্যা লিখব]

Expected:
[কী হওয়া উচিত]

Actual:
[কী হচ্ছে]

Environment:
[local / preview / production]

প্রথমে random code change করো না।

আগে:
1. reproduce/evidence collect করো
2. root cause identify করো
3. responsible component/file identify করো
4. smallest safe fix decide করো
5. regression test define করো

তারপর fix implement করো।
Original problem আবার test করো।
Evidence ছাড়া fixed/VERIFIED বলবে না।
Tracking update করো।
```

---

## 🌐 7. PREVIEW DEPLOYMENT

Use this prompt when deploying a release candidate to preview (Render, Vercel, Railway, etc.).

```text
Current VERIFIED release candidate PREVIEW environment-এ deploy করো।
Production-এ deploy করো না।

Before deploy verify:
- correct repository & commit
- required tests/build pass
- environment variables configured
- correct database connection (MongoDB Atlas)

After deploy verify:
- application starts
- database connects
- critical pages & APIs respond
- no runtime errors in logs
- preview URL accessible

PROJECT_STATE.md এবং VERIFICATION.md update করো।
তারপর Preview QA-এর next step বলো।
```

---

## 🚢 8. PRODUCTION READINESS & DEPLOYMENT

Use this prompt for release audit and production rollout.

```text
Current preview release production-ready কি না evaluate করো।

Check:
- release-scope Tasks VERIFIED?
- preview QA passed?
- security audit passed (NoSQL injection, rate-limits, auth check)?
- production environment variables verified?
- production database isolated & verified?
- rollback strategy ready?

Critical UNKNOWN থাকলে deploy করো না।
READY FOR PRODUCTION হলে production deploy করো।

Deploy-এর পর live smoke test করো।
Live verification ছাড়া PRODUCTION_VERIFIED বলবে না।
Tracking update করো।
```

---

## 📑 MASTER PROMPT REFERENCE SUMMARY

| Code | Intent | When to Use |
| :--- | :--- | :--- |
| **Prompt Q** | One-Time Setup | First-time repository initialization & master files check |
| **Prompt K** | Tools Audit | Auditing skills, plugins, MCP, and environment readiness |
| **Prompt 1** | New Project | Greenfield idea intake, scoping, PRD/TRD creation |
| **Prompt 2** | Continue | Standard sprint task implementation & verification |
| **Prompt 3** | Resume | Resuming after context reset or opening a new chat window |
| **Prompt 4** | Session Close | Daily wrap-up, updating tracking & session log |
| **Prompt 5** | New Feature | Scoping and planning a new feature safely |
| **Prompt 6** | Bug / Debug | Root-cause analysis and surgical bug fixing |
| **Prompt 7** | Preview Deploy | Deploying staging/preview build with smoke test |
| **Prompt 8** | Production Deploy | Production release checklist and live verification |
