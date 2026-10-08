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
