# Complex Execution Plan Contract

Use an ExecPlan only for new subsystems, major refactors, migrations, multi-hour coordinated features, or similarly complex work.

A plan must be self-contained enough for a fresh engineer/agent with the repository—but no previous chat—to continue safely.

## Required Sections

### Goal
State the observable final outcome.

### Current Context
Describe the relevant existing behavior and accepted decisions.

### Scope
List:
- systems/files allowed to change;
- explicit out-of-scope items.

### Interfaces
Document contracts that:
- must remain stable; or
- are deliberately changing.

### Constraints
Record:
- MERN architecture constraints;
- security requirements;
- dependency restrictions;
- compatibility requirements.

### Milestones
Break work into dependency-ordered milestones.

Each milestone must contain:
- objective;
- implementation scope;
- tests/checks;
- evidence needed to mark it complete.

### Verification
Define exact final verification:
- lint/static checks;
- tests;
- build;
- E2E/browser checks;
- security checks;
- deployment checks when relevant.

### Rollback / Recovery
Required for:
- risky migrations;
- production changes;
- irreversible transformations;
- high-impact infrastructure modifications.

### Progress
Maintain:
- completed;
- current;
- blocked;
- new facts/decisions discovered during execution.

### Handoff
Always record:
- exact current state;
- last verified milestone;
- exact next action;
- unresolved risks;
- relevant commit/branch/PR.

## Rules

- Update the plan as reality changes.
- Do not hide failed attempts.
- Do not mark milestones complete without evidence.
- Do not expand scope silently.
- If a durable product/architecture decision changes, update the ADR separately.
