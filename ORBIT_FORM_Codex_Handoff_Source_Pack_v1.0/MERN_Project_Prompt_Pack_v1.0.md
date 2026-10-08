# MERN Project Prompt Pack v1.0

Use this file with:
- `MERN_Master_Web_Coding_OS_v1.1_Final_Candidate.md`
- `ChatGPT_Codex_Master_Instruction_v1.1_Final_Candidate.md`
- `AGENTS_template_v1.1.md`
- `PLANS_template_v1.1.md`

You do not need to manage project documentation manually. ChatGPT should manage the online-first project workflow, repository tracking, task state, testing, verification, and handoffs.

---

# 1. NEW PROJECT — USE THIS IN THE FIRST CHAT

```text
আমাদের Master Web Coding OS follow করে এই নতুন MERN website project শুরু করো।

আমার website idea:
[এখানে আমার idea লিখব]

আমি online-first workflow চাই।
আমি manually documentation, task tracking, project state বা technical files manage করতে চাই না—এগুলো তুমি manage করবে।

Default stack:
MongoDB
Express.js
React
Node.js

এখনই code লেখা শুরু করো না।

প্রথমে:
1. আমার idea properly বুঝো
2. target user, problem এবং goal define করো
3. smallest useful MVP define করো
4. out-of-scope define করো
5. প্রয়োজনীয় research করো
6. architecture এবং design plan করো
7. GitHub repository/documentation/tracking setup করো বা setup plan করো
8. implementation Tasks তৈরি করো
9. আমাকে current stage এবং exact next step বলো

যে কাজ ChatGPT-এ best হবে ChatGPT করো।
যে কাজ Codex-এ materially better হবে Codex-এর জন্য proper handoff তৈরি করো।
Authenticated browser-only কাজ হলে Codex Browser route ব্যবহার করো।
Specialist Skill/Plugin শুধু দরকার হলে ব্যবহার করো।

Evidence ছাড়া কোনো কাজ VERIFIED বলবে না।
```

---

# 2. CONTINUE PROJECT — MOST COMMON PROMPT

```text
Current project state check করো এবং next ready Task continue করো।

Master Web Coding OS এবং project tracking follow করো।

Best executor/tool তুমি decide করো:
ChatGPT / Codex / Codex Browser / Specialist।

Relevant context শুধু load করো; unrelated docs bulk-read করো না।

Task complete হলে:
implement
→ test
→ review
→ fix
→ verify
→ tracking update

Evidence ছাড়া VERIFIED বলবে না।

শেষে আমাকে বলো:
- কী complete হয়েছে
- কী VERIFIED
- কোনো blocker আছে কি না
- exact next Task কী
```

---

# 3. CHAT FULL / NEW CHAT — RESUME PROMPT

Use this when the previous chat becomes too long/full and you open a NEW CHAT inside the SAME ChatGPT Project.

```text
এই project resume করো।

Previous chat history-এর ওপর depend করো না।

GitHub repository এবং project tracking থেকে current state recover করো।

প্রথমে পড়ো:
1. PROJECT_STATE.md
2. current/active Task in TASKS.md
3. AGENTS.md

তারপর current Task-এর জন্য প্রয়োজনীয় relevant:
- Decisions
- Verification records
- Product/technical/design/security/test docs
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
7. Recommended Executor
8. Required Skill/Plugin

State clear হলে আমার নির্দেশে continue করো।
```

---

# 4. SESSION CLOSE — USE BEFORE STOPPING WORK

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

TASKS.md
PROJECT_STATE.md
VERIFICATION.md
SESSION_LOG.md

Permanent architecture/product decision change হলে শুধু তখন DECISIONS.md update করো।

যে project docs actual implementation-এর কারণে stale হয়েছে শুধু সেগুলো update করো।

শেষে আমাকে বলো:

COMPLETED:
VERIFIED:
NOT VERIFIED:
BLOCKERS:
NEXT TASK:
NEXT EXECUTOR:
```

---

# 5. NEW FEATURE REQUEST

```text
আমি existing project-এ এই নতুন feature add করতে চাই:

[FEATURE]

এখন code করো না।

আগে:
1. feature-এর user value বুঝো
2. existing product/architecture-এর সাথে fit check করো
3. BOUNDED না ARCHITECTURAL classify করো
4. user flow impact check করো
5. database/API/security/design impact check করো
6. প্রয়োজনীয় docs/decisions update করো
7. ছোট verifiable Tasks তৈরি করো
8. best executor/tool decide করো
9. আমাকে implementation plan এবং exact next step দেখাও

Approval ছাড়া বড় architectural change implement করো না।
```

---

# 6. BUG / ERROR

```text
এই problem debug করো।

Problem:
[সমস্যা লিখব]

Expected:
[কি হওয়া উচিত]

Actual:
[কি হচ্ছে]

Environment:
[local / preview / production / unknown]

প্রথমে random code change করো না।

আগে:
1. reproduce/evidence collect করো
2. root cause identify করো
3. responsible component/file identify করো
4. smallest safe fix decide করো
5. regression test define করো

তারপর fix implement করো।

Original problem আবার test করো।
Relevant existing tests run করো।
Evidence ছাড়া fixed/VERIFIED বলবে না।
Tracking update করো।
```

---

# 7. PREVIEW DEPLOYMENT

```text
Current VERIFIED release candidate PREVIEW environment-এ deploy করো।

Production-এ deploy করো না।

Before deploy verify:
- correct repository
- branch/commit
- required tests/build
- environment variables
- correct MongoDB/database
- external services

Direct ChatGPT connector first use করো।
Unsupported authenticated dashboard action হলে Codex Browser।
Substantial local build/config work হলে Codex।

After deploy verify:
- deployment success
- application starts
- database connects
- critical page/API responds
- runtime logs-এ blocker নেই
- preview URL works

PROJECT_STATE এবং VERIFICATION update করো।
তারপর Preview QA-এর next step বলো।
```

---

# 8. PRODUCTION READINESS + DEPLOYMENT

```text
Current preview release production-ready কি না evaluate করো।

Check:
- release-scope Tasks VERIFIED?
- preview QA passed?
- security gate passed?
- required compliance consideration complete?
- production env verified?
- production database verified?
- domain/config verified?
- rollback known?
- monitoring ready?

Critical UNKNOWN থাকলে deploy করো না।

READY FOR PRODUCTION হলে production deploy করো।

After deployment:
live smoke test
auth
critical flow
database/API
direct routes
mobile sanity
runtime logs/errors

Live verification ছাড়া PRODUCTION_VERIFIED বলবে না।

Tracking update করো।
```

---

# SIMPLE USAGE MAP

New project:
→ Prompt 1

Normal work:
→ Prompt 2

Old chat full / new chat:
→ Prompt 3

Stopping for today:
→ Prompt 4

New feature:
→ Prompt 5

Bug:
→ Prompt 6

Preview:
→ Prompt 7

Production:
→ Prompt 8

For most days you only need:
Prompt 2 + Prompt 3 + Prompt 4.
