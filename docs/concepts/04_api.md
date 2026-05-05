---
sidebar_position: 4
sidebar_label: "API Reference"
---

# API Reference: `fst.control`

FST exposes one agent-facing control surface:

```text
fst.control
```

All FST operations — creating artifacts, checking gates, recording evidence, querying state — go through this single tool. The tool accepts a typed action name and payload.

---

## Why One Tool

A single entry point is a deliberate design choice.

FST does not expose separate endpoints for separate concerns. One tool means the agent cannot accidentally bypass the coherence model by calling a lower-level endpoint that skips gate checks. Every operation is typed, versioned, and evaluated against the same graph invariants.

```text
One MCP tool.
Many typed internal actions.
No untyped command execution tunnel.
```

---

## Call Shape

```ts
fst.control({
  protocol_version: string,  // e.g. "1.0"
  action: string,            // e.g. "gate.check.exploration_to_build"
  payload: object,           // action-specific fields
  run_id?: string,           // optional process run identifier
  idempotency_key?: string,  // optional deduplication key
  actor?: "agent" | "user" | "reviewer_agent" | "system"
})
```

`action` is not a free-form string. It is a closed, versioned action name resolved to a typed schema and handler. Unknown actions return `invalid_request`.

`actor` tells FST who is making the call. This matters for gate-eligible evidence: [UserInteraction](./glossary.md#userinteraction) records have different authority depending on the actor, and some gates require evidence from a specific actor type.

---

## Response Shape

```ts
type FSTControlResponse = {
  status: "ok" | "nok" | "error"

  action: string
  run_id?: string

  outcome?: {
    kind:
      | "recorded"        // the operation was recorded
      | "allowed"         // the requested operation is permitted
      | "not_allowed"     // the operation is not permitted in current state
      | "gate_passed"     // the gate check passed
      | "gate_blocked"    // the gate check failed with specific blockers
      | "coherent"        // the Composition is coherent
      | "incoherent"      // the Composition has blockers preventing coherence
      | "unevaluated"     // coherence has not been checked
      | "check_results"   // multi-check result set
      | "invalid_request" // action or payload is invalid
      | "not_found"       // the requested entity does not exist

    stage?: "context" | "exploration" | "build" | "compose"
    gate?: "context_to_exploration" | "exploration_to_build" | "build_to_compose" | "compose_coherence"

    code: string     // machine-readable outcome code
    message: string  // human-readable explanation
  }

  blockers?: FSTBlocker[]          // specific actionable obstacles
  missing_inputs?: FSTMissingInput[]
  required_evidence?: FSTRequiredEvidence[]

  created_refs?: TypedVersionedRef[]  // refs created by this call
  updated_refs?: TypedVersionedRef[]  // refs updated by this call
  checked_refs?: TypedVersionedRef[]  // refs evaluated in a check

  graph_effects?: FSTGraphEffect[]    // all graph mutations produced
  next_action_hints?: string[]        // routing guidance for the agent

  data?: object  // structured query results

  error?: {
    code: string
    message: string
    retryable: boolean
  }
}
```

**Status values:**

- `ok` — FST evaluated or recorded the request and the operation is allowed or accepted
- `nok` — FST understood the request but it is not allowed or cannot pass
- `error` — FST failed internally and could not produce a trustworthy evaluation

Gate failure is `nok`, not `error`. An invalid payload is `nok` with `outcome.kind: invalid_request`. `error` is reserved for internal FST failures where the response itself cannot be trusted.

---

## Blockers

When a gate is blocked, FST returns specific, actionable blockers:

```ts
type FSTBlocker = {
  code: string         // machine-readable blocker code
  severity: "blocking" | "warning" | "advisory"
  message: string      // explanation

  subject_refs?: TypedVersionedRef[]  // the artifacts involved
  requirement_ids?: string[]          // requirements that need to be satisfied
  evidence_refs?: string[]            // existing evidence referenced

  resolution_kinds?: string[]         // how this blocker can be resolved
}
```

Common blocker codes:

| Code | What It Means |
|---|---|
| `missing_retained_scope` | [ExplorationNote](./glossary.md#explorationnote) has no retained scope defined |
| `unversioned_reference` | A stored reference does not pin a revision |
| `scope_expansion_required` | [Build](./01_the-model.md#build) needs to touch something outside [retained scope](./glossary.md#retained-scope) |
| `candidate_outside_scope` | [Candidate](./glossary.md#candidate) modifies artifacts not retained for modification |
| `missing_behaviour` | Observable behavior change lacks a [Behaviour](./glossary.md#behaviour) artifact |
| `missing_verification` | Required [Behaviour](./glossary.md#behaviour) claim has no [Verification](./glossary.md#verification) |
| `same_type_direct_relation` | Two same-type artifacts connected directly instead of through a [Contract](./glossary.md#contract) |
| `decision_conflict` | Two [Decisions](./glossary.md#decision) answer the same question with different answers |
| `contract_conflict` | Two providers for the same [Contract](./glossary.md#contract) are incompatible |
| `policy_conflict` | An artifact violates an included [Policy](./glossary.md#policy) |
| `coverage_gap` | A required [Intent](./glossary.md#intent) effect has no covering Behaviour or Verification |
| `verification_target_misalignment` | A [Verification](./glossary.md#verification) targets a stale [Behaviour](./glossary.md#behaviour) revision |
| `stale_exploration` | The [ExplorationNote](./glossary.md#explorationnote) used by a [Candidate](./glossary.md#candidate) is stale |
| `missing_user_input` | A [Decision](./glossary.md#decision) Requirement has no gate-eligible [UserInteraction](./glossary.md#userinteraction) |
| `judgment_required` | A judged check requires recorded judgment evidence |

Resolution kinds indicate how the blocker can be resolved:

```text
provide_missing_input     → record a UserInteraction or Decision
record_gate_eligible_evidence → provide hash-bound user evidence
pin_reference             → add revision to an unversioned reference
revise_exploration        → create a new ExplorationNote revision
revise_candidate          → create a new Candidate revision
revise_composition        → create a new Composition revision
add_contract              → introduce a Contract for a same-type dependency
add_verification          → add a Verification artifact
record_observation        → add an Observation from a check run
record_judgment           → record a human judgment for a judged check
request_scope_expansion   → return to Exploration for a larger scope
waive_with_evidence       → record a gate-eligible waiver UserInteraction
```

---

## Action Categories

Actions are organized around FST's stages and entities. The agent uses actions to move through the FST process.

### Entity Actions (`entity.*`)

Create, revise, and manage artifact lifecycle:

```text
entity.create          → create a new artifact with a new id and first revision
entity.revise          → create a new revision of an existing artifact
entity.get             → retrieve an artifact revision
entity.set_lifecycle   → update lifecycle state (draft, proposed, deprecated, ...)
```

### Relation Actions (`relation.*`)

Manage typed, revision-pinned relations between artifacts:

```text
relation.create        → record a typed relation between two revision-pinned artifacts
relation.validate      → check whether a relation is allowed by the constraint registry
relation.get           → retrieve a relation record
relation.list_for      → list all relations involving an artifact revision
```

### Exploration Actions (`exploration.*`)

Drive the Exploration stage:

```text
exploration.create_note         → create an ExplorationNote revision
exploration.update_scope        → update retained scope items
exploration.record_decision_req → record a DecisionRequirement found during exploration
exploration.record_finding      → record a risk, gap, or conflict finding
exploration.record_blast_radius → record the blast-radius report
exploration.check_gate          → check the Exploration → Build gate for an ExplorationNote revision
```

### Build Actions (`build.*`)

Drive the Build stage:

```text
build.create_candidate         → create a Candidate revision
build.add_artifact_ref         → add a created or changed artifact to a Candidate
build.record_touch_points      → record expected and actual touch points
build.record_observation       → attach an Observation to a Candidate
build.check_scope_compliance   → check whether a Candidate stays inside retained scope
build.check_gate               → check the Build → Compose gate for a Candidate revision
```

### Compose Actions (`compose.*`)

Drive the Compose stage:

```text
compose.create               → create a Composition revision
compose.add_candidate        → include a Candidate revision in a Composition
compose.add_member           → include a direct artifact ref in a Composition
compose.update_member        → update a member to a new revision (creates new Composition revision)
compose.run_automated_checks → run all automated coherence checks
compose.record_judgment      → record a human judgment for a judged check
compose.check_coherence      → evaluate full coherence for a Composition revision
```

### Gate Actions (`gate.*`)

Explicit gate checks (can also be called via stage-specific actions):

```text
gate.check.context_to_exploration  → check whether Exploration may start from a WorkContext
gate.check.exploration_to_build    → check whether Build may start from an ExplorationNote
gate.check.build_to_compose        → check whether a Candidate may enter Compose
gate.check.compose_coherence       → check whether a Composition is coherent
```

### Query Actions (`query.*`)

Read-only state queries:

```text
query.composition.effective_members → list all effective artifact revisions in a Composition
query.composition.findings          → list all findings for a Composition revision
query.composition.coverage          → coverage report for a Composition revision
query.artifact.history              → revision history for an artifact
query.artifact.relations            → all relations involving an artifact revision
query.next_actions                  → hints about what FST expects next (advisory only)
```

### Evidence Actions (`evidence.*`)

Record user input and interactions:

```text
evidence.record_user_interaction   → record a hash-bound, meaning-bound UserInteraction
evidence.validate_gate_eligibility → check whether evidence satisfies a specific gate
```

### Decision and Policy Actions

```text
decision.record              → record a Decision artifact
policy.record                → record a Policy artifact
policy.check_satisfaction    → check whether a Policy is satisfied by a Composition
```

---

## Typed References

FST uses typed, revisioned references throughout:

```ts
type TypedVersionedRef = {
  id: string            // artifact or entity id
  revision_ref: string  // exact revision identifier
  type: string          // artifact type (Intent, Behaviour, Candidate, etc.)
}
```

Every stored reference must include both `id` and `revision_ref`. References without a revision_ref will produce an `unversioned_reference` blocker.

---

## Idempotency

Operations that create or revise entities should be called with an `idempotency_key` when the agent may retry the call:

```ts
fst.control({
  action: "entity.create",
  idempotency_key: "create-reset-behaviour-2024-07-12-session-42",
  payload: { ... }
})
```

FST will return the same response for repeated calls with the same idempotency key, without creating duplicate records.

---

## Stateless Gate Checks

FST does not require the agent to follow a hidden server-side session sequence.

If the agent supplies the required pinned inputs, it may ask any gate question directly:

```ts
// Check whether Build may start from this ExplorationNote
fst.control({
  action: "gate.check.exploration_to_build",
  payload: {
    exploration_note_ref: { id: "EN-reset-flow", revision_ref: "enrev-003", type: "ExplorationNote" }
  }
})

// Check whether a Candidate may enter Compose
fst.control({
  action: "gate.check.build_to_compose",
  payload: {
    candidate_ref: { id: "C-reset-flow", revision_ref: "crev-001", type: "Candidate" },
    exploration_note_ref: { id: "EN-reset-flow", revision_ref: "enrev-003", type: "ExplorationNote" }
  }
})

// Check Composition coherence
fst.control({
  action: "gate.check.compose_coherence",
  payload: {
    composition_ref: { id: "COMP-main", revision_ref: "comprev-007", type: "Composition" }
  }
})
```

Gates check the artifact graph, not an implicit session state. The order of stage progression is encoded by artifact references and gate criteria.

---

## A Minimal Process Walk-Through

This example shows the minimal call sequence for a complete FST process.

**1. Work-Context Selection**
```ts
fst.control({ action: "context.create", payload: {
  user_request: "Add 15-minute expiry to password reset tokens",
  composition_refs: [{ id: "COMP-main", revision_ref: "comprev-006", type: "Composition" }],
  discovery_policy: "default"
}})
// → creates WorkContext@rev1, SearchView@rev1
```

**2. Exploration**
```ts
// Create ExplorationNote
fst.control({ action: "exploration.create_note", payload: {
  work_context_ref: { id: "WC-1", revision_ref: "wcrev-001", type: "WorkContext" },
  user_request: "Add 15-minute expiry to password reset tokens",
  retained_scope: [
    { artifact_ref: { id: "B-reset-token", revision_ref: "brev-002", type: "Behaviour" },
      allowed_operations: ["modify"] },
    { source_target: "auth/reset_token.py", allowed_operations: ["modify"] }
  ]
}})
// → creates ExplorationNote@rev1

// Check gate
fst.control({ action: "gate.check.exploration_to_build", payload: {
  exploration_note_ref: { id: "EN-1", revision_ref: "enrev-001", type: "ExplorationNote" }
}})
// → outcome.kind: "gate_passed"
```

**3. Build**
```ts
// Create Candidate
fst.control({ action: "build.create_candidate", payload: {
  exploration_note_ref: { id: "EN-1", revision_ref: "enrev-001", type: "ExplorationNote" }
}})

// Add revised Behaviour artifact
fst.control({ action: "entity.revise", payload: {
  artifact_ref: { id: "B-reset-token", revision_ref: "brev-002", type: "Behaviour" },
  content: { rule: "Reset tokens expire after 15 minutes from issuance." }
}})
// → creates Behaviour@rev3

// Add to Candidate, add Implementation and Verification...

// Check Build gate
fst.control({ action: "gate.check.build_to_compose", payload: {
  candidate_ref: { id: "CAND-1", revision_ref: "crev-001", type: "Candidate" },
  exploration_note_ref: { id: "EN-1", revision_ref: "enrev-001", type: "ExplorationNote" }
}})
// → outcome.kind: "gate_passed"
```

**4. Compose**
```ts
// Create Composition with updated Candidate
fst.control({ action: "compose.create", payload: {
  base_composition_ref: { id: "COMP-main", revision_ref: "comprev-006", type: "Composition" },
  candidate_refs: [{ id: "CAND-1", revision_ref: "crev-001", type: "Candidate" }]
}})
// → creates Composition@rev7

// Run automated checks
fst.control({ action: "compose.run_automated_checks", payload: {
  composition_ref: { id: "COMP-main", revision_ref: "comprev-007", type: "Composition" }
}})

// Check coherence
fst.control({ action: "gate.check.compose_coherence", payload: {
  composition_ref: { id: "COMP-main", revision_ref: "comprev-007", type: "Composition" }
}})
// → outcome.kind: "coherent"
```

---

## Database Backup and Restore

FST uses TerminusDB as its runtime store. State can be exported and restored:

```bash
# Export state to a snapshot file
fst db export --system System/main --out fst-state/terminusdb/System_main.documents.json

# Verify that a snapshot matches the live database
fst db verify --system System/main --snapshot fst-state/terminusdb/System_main.documents.json

# Restore from a snapshot
fst db restore --in fst-state/terminusdb/System_main.documents.json --system System/main
```

Snapshots are JSON exports of the TerminusDB document store. They can be committed to version control alongside source code to keep system state and source in sync.

---

**Next:** [Glossary](./glossary.md) — Every FST term defined in one place
