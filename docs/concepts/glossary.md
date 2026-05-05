---
sidebar_position: 5
---

# Glossary

This page defines every FST term used in the documentation. All uses of these terms in other pages link back here.

Terms are organized by category. Within each category, they appear in logical reading order.

---

## Stage and Process Terms

### Work-Context Selection

The pre-Exploration phase that establishes where [Exploration](#exploration) is allowed to look.

Work-Context Selection produces a [WorkContext](#workcontext) revision and a [SearchView](#searchview) revision. It records which [Composition](#composition) revisions, source revisions, and discovery policy apply to this work.

Work-Context Selection does **not** grant Build permission. Build is constrained by the [retained scope](#retained-scope) in the [ExplorationNote](#explorationnote) that Exploration produces.

---

### Exploration

The first controlled stage. Exploration discovers what a piece of work actually touches.

Exploration produces an [ExplorationNote](#explorationnote) revision. The most critical output is the [retained scope](#retained-scope) — the box [Build](#build) is allowed to work in.

The Exploration gate checks whether a specific ExplorationNote revision is ready to start Build. If the gate passes, Build may proceed from that pinned ExplorationNote revision.

See also: [The Model: Exploration](./01_the-model.md#exploration)

---

### Build

The second controlled stage. Build creates a [Candidate](#candidate) work package inside the box defined by [Exploration](#exploration).

Build may only read, depend on, modify, create, and verify within the [retained scope](#retained-scope) of the [ExplorationNote](#explorationnote) it uses. If Build discovers that the box is too small, it must return to Exploration — it cannot silently expand scope.

The Build gate checks whether the Candidate stayed inside retained scope and contains enough artifact structure to compose.

See also: [The Model: Build](./01_the-model.md#build)

---

### Compose

The third controlled stage. Compose combines [Candidates](#candidate) into a [Composition](#composition) — a pinned, possible system world.

Compose checks whether the pinned revisions hold together: revision consistency, relation validity, [contract](#contract) compatibility, [decision](#decision) uniqueness, [policy](#policy) satisfaction, [verification](#verification) alignment, coverage, and required user evidence.

See also: [The Model: Compose](./01_the-model.md#compose)

---

### Gate

A gate is a controlled transition between FST stages. Gates check pinned artifact revisions — not agent narration — and produce specific, actionable blockers when they fail.

FST has four gates:

- **Context gate** — WorkContext → Exploration: is the work context valid?
- **Exploration gate** — Exploration → Build: is the ExplorationNote ready to define the Build box?
- **Build gate** — Build → Compose: is the Candidate traceable, bounded, and complete enough to compose?
- **Compose gate** (coherence check) — Compose: does this Composition hold together as a coherent possible world?

```text
Stages are flexible.
Gates are strict.
```

See also: [The Model: The Gate Model](./01_the-model.md#the-gate-model)

---

### Retained Scope

The approved box for [Build](#build), defined inside the [ExplorationNote](#explorationnote).

The retained scope specifies exactly which [artifacts](#artifact) may be read, modified, or created, and which source targets may be touched during Build. Build may not work outside the retained scope.

If Build discovers the box is too small, it returns to Exploration to create a new ExplorationNote revision with an expanded retained scope. Scope expansion is never silent.

---

### Coherence

A [Composition](#composition) is **coherent** when all required checks pass for its pinned revisions.

Coherent means this specific Composition revision holds together under FST's automated and judged checks. It does not mean globally accepted, best solution, or permanently true.

```text
coherent = this pinned world holds together under FST's checks and evidence.
```

The Compose gate outcome is `coherent`, `incoherent`, or `unevaluated`.

---

### Materialization

The projection of a coherent [Composition](#composition) into a concrete sink: a workspace, patch, generated directory, migration folder, deployment manifest, or another target.

Materialization is not a fourth FST stage. It is an execution technique or output representation. Agents may temporarily materialize work during any stage to inspect or test it. Persistent materialization is represented by [Implementation](#implementation) artifacts and [Observations](#observation).

---

## Process Entities

### WorkContext

The approved starting universe for [Exploration](#exploration).

WorkContext records the user request, selected [Composition](#composition) revisions, base source and graph revision references, discovery policy, and conflict policy. It is produced by [Work-Context Selection](#work-context-selection).

WorkContext does not grant Build permission.

See also: [Process Entities: WorkContext](./03_process-entities.md#workcontext)

---

### SearchView

The searchable surface visible to [Exploration](#exploration), derived from the [WorkContext](#workcontext).

SearchView reflects the union, intersection, or selective merge of selected Compositions' content according to the discovery and conflict policies in the WorkContext. It is read-only. It is not the system truth — it is what Exploration is allowed to examine.

---

### ExplorationNote

The output of [Exploration](#exploration). Records the [retained scope](#retained-scope), findings, decision requirements, policy conflicts, blast-radius report, and all user evidence collected during Exploration.

ExplorationNotes are revisioned and immutable. The Build gate checks one pinned ExplorationNote revision, not "the latest exploration."

The retained scope field inside the ExplorationNote is the most critical field — it defines the exact box Build is allowed to work in.

See also: [Process Entities: ExplorationNote](./03_process-entities.md#explorationnote)

---

### Candidate

The output of [Build](#build). The durable work package produced inside the retained scope defined by the [ExplorationNote](#explorationnote).

A Candidate records: the ExplorationNote revision it used, all [system artifacts](#artifact) created or changed (revision-pinned), expected and actual touch points with any differences explained, [Verification](#verification) definitions, [Observations](#observation) from checks that ran, and scope compliance evidence.

Candidates are revisioned and immutable.

See also: [Process Entities: Candidate](./03_process-entities.md#candidate)

---

### Composition

A pinned, possible system world. The output of [Compose](#compose).

A Composition includes [Candidate](#candidate) revisions, direct artifact members, and derived effective member refs. It carries a [coherence](#coherence) state and a list of [CompositionFindings](#compositionfinding).

**A Composition is not a globally accepted system state.** It is one possible world. Multiple Compositions can exist simultaneously with different Candidate combinations, Decisions, and revision choices. None is canonical.

Composition revisions are immutable. Updating a member creates a new Composition revision; the previous one remains as a historical record.

```text
Truth is Composition-scoped.
```

See also: [Process Entities: Composition](./03_process-entities.md#composition)

---

### UserInteraction

A system-recorded evidence record for human input.

A UserInteraction must be:
- **Hash-bound** — tied to the exact content shown to the user, so silent edits invalidate it
- **Meaning-bound** — tied to the specific requirement or question being answered
- **Gate-eligible** — recorded in a mode FST accepts for the gate being checked

Agent narration does not satisfy gates. A UserInteraction record does.

UserInteractions are the mechanism by which decisions, approvals, scope changes, policy exceptions, and other human inputs become part of the evidence graph rather than disappearing into chat history.

See also: [Process Entities: UserInteraction](./03_process-entities.md#userinteraction)

---

### CompositionFinding

A specific issue detected during [Compose](#compose) gate evaluation.

Findings are world-specific — two [artifacts](#artifact) may conflict in one Composition and never meet in another. Findings belong to the Composition, not to the artifact globally.

Common finding types: `revision_inconsistency`, `contract_conflict`, `decision_conflict`, `policy_conflict`, `verification_target_misalignment`, `coverage_gap`, `stale_exploration`, `missing_user_input`.

---

## System Artifact Types

### Artifact

A **system artifact** is a durable, revisioned record about the target system.

Artifacts describe the target system: its purpose, behaviour, meaning, dependencies, concrete material, proof, and evidence. They are not documentation added afterward — they are the structure FST uses to evaluate [coherence](#coherence).

Each artifact has:
- `id` — stable identity of the artifact concept
- `revision_ref` — one exact immutable version of that artifact

Every stored reference to an artifact must pin both `id` and `revision_ref`. There is no stored reference to "latest."

An artifact becomes **effective** only when a coherent [Composition](#composition) includes that exact revision.

See also: [System Artifacts](./02_artifacts.md)

---

### Intent

A system artifact that records *why* something should exist in the target system.

Intent contains one or more named **effects** — claims about what should hold true. Effects are the units FST uses to check coverage in a [Composition](#composition).

```text
Intent: Users can recover account access when they forget their password.
  effect: account-recovery-possible
  effect: recovery-does-not-expose-account-existence
```

A [Behaviour](#behaviour) refines an Intent effect. A Composition is coherent only when each required Intent effect is refined, verified, and supported by passing Observations.

See also: [System Artifacts: Intent](./02_artifacts.md#intent)

---

### Behaviour

A system artifact that records *what* the target system does at an observable level.

Behaviours express testable rules:

```text
Password reset requests must return the same response
for known and unknown email addresses.
```

Behaviours refine [Intent](#intent) effects, use [Domain](#domain) meanings, are implemented by [Implementation](#implementation) artifacts, and are proved by [Verification](#verification) artifacts.

A change that affects observable behavior must produce a new Behaviour revision. If the Verification does not target the new revision, the Composition is incoherent.

See also: [System Artifacts: Behaviour](./02_artifacts.md#behaviour)

---

### Domain

A system artifact that records *what the system's concepts mean*.

Domain captures meaning and invariants at the operating level of the system:

```text
Reset token: a time-limited, single-use credential issued to a verified email address
             that authorizes exactly one password change.
invariant: a reset token becomes invalid after use or after 15 minutes.
```

When a [Behaviour](#behaviour) uses a Domain meaning, the relation is explicit and revision-pinned. If the Domain meaning changes, FST can detect that dependent Verifications are now targeting stale revisions.

See also: [System Artifacts: Domain](./02_artifacts.md#domain)

---

### Contract

A named promise between same-type artifacts.

Same-type artifacts — [Behaviour](#behaviour) to Behaviour, [Implementation](#implementation) to Implementation, [Domain](#domain) to Domain — must never depend on each other directly. They must go through a Contract.

```text
Cross-type relations: direct.
Same-type relations: through Contracts.
```

A Contract names the promise explicitly. [Compose](#compose) checks whether required Contracts are provided and whether providers are compatible.

```text
Contract: reset-token-available
  level: behaviour
  promise: a valid, unexpired reset token exists for the requesting email address
```

See also: [System Artifacts: Contract](./02_artifacts.md#contract)

---

### Implementation

A system artifact that records the concrete system material that carries a [Behaviour](#behaviour).

Implementation corresponds to code, configuration, migrations, infrastructure definitions, and other concrete artifacts. It declares which Behaviour it implements, which [Domain](#domain) invariants it enforces, and which [Policy](#policy) rules it is subject to.

See also: [System Artifacts: Implementation](./02_artifacts.md#implementation)

---

### Verification

A system artifact that defines *how* correctness is checked.

Verification records the definition of a check — not the result. It targets an exact [Behaviour](#behaviour) revision. If the Behaviour changes, the Verification must target the new revision, or [Compose](#compose) detects the misalignment.

[Observations](#observation) record the results of actually running a Verification.

See also: [System Artifacts: Verification](./02_artifacts.md#verification)

---

### Observation

A system artifact that records *what actually happened* when a check was run.

Observations provide evidence. They may support or contradict a [Verification](#verification) or [Behaviour](#behaviour). Observations target exact revisions — an Observation supporting Verification `V@rev2` does not automatically support `V@rev3`.

See also: [System Artifacts: Observation](./02_artifacts.md#observation)

---

### Policy

A system artifact that defines rules the target system must satisfy — the allowed design space.

Policies are evaluated inside a [Composition](#composition) against the artifact revisions included there. A Policy violation is a [CompositionFinding](#compositionfinding) in the Composition — not a global marking on the artifact.

```text
Policy defines the allowed space.
Decision chooses a point inside that space.
```

See also: [Process Entities: Policy](./03_process-entities.md#policy)

---

### Decision

A named choice made within the design space a [Policy](#policy) defines.

Decisions are first-class artifacts. A Decision records the question, the answer, and the scope it applies to. Decisions are [Composition](#composition)-scoped — different Compositions can hold different answers to the same question.

The [Compose](#compose) gate checks Decision uniqueness: at most one effective Decision may answer the same `decision_key` and scope inside one Composition.

```text
Decision: reset-token-expiry
  answer: 15 minutes
  scope: authentication subsystem
```

See also: [Process Entities: Decision](./03_process-entities.md#decision)

---

## Structural Terms

### Revision Pinning

The rule that every stored reference between artifacts must include both the artifact `id` and an exact `revision_ref`.

```text
Nothing is effective by id alone.
Every reference pins a revision.
```

Revision pinning is the most important structural rule in FST. It makes any bundle of references fully determined by what it pins. Nothing about it changes when the broader graph evolves. Updates create new revisions; old revisions remain as immutable historical records.

This is what makes parallel work safe: multiple agents can build Candidates without merging into a shared accepted state, because their references pin exact revisions rather than floating to "latest."

---

### Composition-Scoped Effectiveness

An [artifact](#artifact) becomes effective only when a coherent [Composition](#composition) includes that exact revision.

There is no global acceptance. The same artifact may be effective in one Composition, absent from another, and at a different revision in a third — all at the same time.

```text
Truth is Composition-scoped.
```

---

### Same-Type Dependency

A dependency between two artifacts of the same type.

Same-type dependencies must always go through a [Contract](#contract). Direct same-type dependencies are not allowed:

```text
Allowed:   Behaviour → Contract(level=behaviour) → Behaviour
Not allowed: Behaviour → Behaviour
```

The Contract names the promise. [Compose](#compose) checks that required promises are provided.

---

### Revision

One exact, immutable version of an artifact.

When an artifact's meaning-bearing content changes, FST creates a new revision. Old revisions remain as immutable historical records.

```text
Old worlds stay reconstructable.
New meaning gets a new revision.
```

---

### Blast-Radius Report

A record in the [ExplorationNote](#explorationnote) that describes which parts of the system are affected by the proposed work.

The blast-radius report is required for the Exploration gate to pass. It informs the reviewer and future stage agents about the scope of impact.

---

### Stale Exploration

An [ExplorationNote](#explorationnote) becomes stale when the artifacts or source it referenced have been updated since the ExplorationNote was created.

A stale ExplorationNote blocks the [Compose](#compose) gate (the Composition includes a Candidate based on outdated scope). Staleness can be waived with a gate-eligible [UserInteraction](#userinteraction) that acknowledges the staleness.

---

## API Terms

### `fst.control`

The single agent-facing MCP tool for all FST operations.

Accepts a typed `action` name and `payload`. Returns a structured response with `status`, `outcome`, `blockers`, and optionally `created_refs`, `updated_refs`, `data`, and more.

```ts
fst.control({
  protocol_version: string,
  action: string,
  payload: object,
  run_id?: string,
  idempotency_key?: string,
  actor?: "agent" | "user" | "reviewer_agent" | "system"
})
```

See also: [API Reference](./04_api.md)

---

### TypedVersionedRef

A revision-pinned reference to an artifact or entity:

```ts
type TypedVersionedRef = {
  id: string
  revision_ref: string
  type: string
}
```

Every stored reference in FST uses TypedVersionedRef. References without `revision_ref` produce an `unversioned_reference` blocker.

---

### Actor

The entity making an `fst.control` call. One of: `agent`, `user`, `reviewer_agent`, `system`.

Actor identity matters for gate-eligible evidence. Some gates require evidence from a specific actor (for example, a [UserInteraction](#userinteraction) must come from `user` to be gate-eligible for decisions that require human approval).

---

## Coverage Terms

### Intent Effect Coverage

The status of a named [Intent](#intent) effect in a [Composition](#composition).

For an Intent effect to be covered:
1. The Intent revision must be included in the Composition
2. The effect id must exist in that Intent revision
3. At least one included [Behaviour](#behaviour) revision must refine that exact effect id
4. At least one included [Verification](#verification) revision must target that Behaviour revision
5. Required environments must have passing [Observations](#observation)
6. No failed Observation in a required environment (without exception)

Coverage states: `covered`, `uncovered`, `contradicted`, `stale`.
Requirement states: `required`, `deferred`, `not_applicable`.

---

### Judged Check

A coherence check that requires human or designated-reviewer judgment.

FST records judged checks and requires evidence for them. A judged check may be `passed`, `failed`, or `needs_review`. To pass or fail, it requires recorded judgment evidence from a permitted source. Agent assertion does not satisfy a judged check.

Examples: Behaviour compatibility, Domain semantic compatibility, policy interpretation where the rule cannot be fully computed.

---

### Automated Check

A coherence check FST computes deterministically from the artifact graph.

Automated checks include: revision consistency, relation constraint validation, contract compatibility, decision uniqueness, policy satisfaction (automated parts), implementation target conflicts, verification target alignment, verification coverage, user-input satisfaction, and exploration freshness.

---

*This glossary is the canonical reference for FST terminology. When a term defined here appears in other documentation pages, it links back to this entry.*
