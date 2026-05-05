---
sidebar_position: 3
sidebar_label: "Process Entities"
---

# Process Entities

Process entities describe work happening around the target system. They record scope, work packages, possible worlds, requirements, evidence, findings, and the connections between them.

```text
System artifacts describe the target system.
Process entities describe work around the target system.
```

Process entities are the governance layer. They are what FST uses to track stages, enforce gates, and record the evidence that makes outcomes falsifiable.

---

## WorkContext

A **[WorkContext](./glossary.md#workcontext)** is the approved starting universe for [Exploration](./01_the-model.md#exploration).

Every FST process begins with Work-Context Selection, which produces a WorkContext revision. The WorkContext records:

- The user request
- Selected [Composition](./glossary.md#composition) revisions to explore from
- Base source and graph revision references
- Discovery policy (what Exploration is allowed to search)
- Conflict policy (how to handle differing worlds)
- Context-selection user evidence (if the user made a selection choice)

The WorkContext does not grant Build permission. It only answers:

```text
Where may Exploration look?
```

---

## SearchView

A **[SearchView](./glossary.md#searchview)** is derived from the [WorkContext](./glossary.md#workcontext) and represents the actual searchable surface visible to [Exploration](./01_the-model.md#exploration).

The SearchView reflects the union, intersection, or selective merge of the selected Compositions' content according to the discovery and conflict policies in the WorkContext.

The SearchView is a read-only derived view. It is not the system truth — it is what Exploration is allowed to examine.

---

## ExplorationNote

An **[ExplorationNote](./glossary.md#explorationnote)** is the output of [Exploration](./01_the-model.md#exploration).

It is the document that defines the Build box — the approved scope for the next [Build](./01_the-model.md#build) stage. It records:

- User request
- Base graph and source references
- **Retained scope** — which artifacts may be read, modified, or created, and which source targets may be touched
- Observed [Decisions](./glossary.md#decision) already effective in the context
- [Decision](./glossary.md#decision) requirements — inputs needed before Build may proceed
- [Policy](./glossary.md#policy) requirements and conflicts discovered
- Findings — risks, gaps, unknowns, unresolved conflicts
- Blast-radius report — which parts of the system are affected
- Freshness state
- Recorded user evidence (gate-eligible [UserInteractions](./glossary.md#userinteraction))

The retained scope is the most critical field. It defines the box Build is allowed to work in:

```text
retained_scope = the allowed box for Build
```

Build may only read, depend on, modify, create, and verify within the retained scope. If Build discovers the box is too small, it returns to Exploration — it cannot silently expand.

ExplorationNotes are revisioned and immutable. Updating one produces a new ExplorationNote revision. The Build gate checks one pinned ExplorationNote revision — not "the latest exploration," but one specific, frozen record.

---

## Candidate

A **[Candidate](./glossary.md#candidate)** is the output of [Build](./01_the-model.md#build).

It is the durable work package produced inside the scope defined by the [ExplorationNote](./glossary.md#explorationnote). It records:

- The ExplorationNote revision it used (revision-pinned)
- All [System Artifacts](./02_artifacts.md) created or changed in this Build (revision-pinned)
- Expected touch points (what Exploration said might be touched)
- Actual touch points (what Build actually touched)
- Any difference between expected and actual touch points, with explanation
- [Verification](./glossary.md#verification) definitions for claims made
- [Observations](./glossary.md#observation) from checks that ran during Build
- Scope compliance evidence

A Candidate is a coherent slice — it may span [Intent](./glossary.md#intent), [Behaviour](./glossary.md#behaviour), [Domain](./glossary.md#domain), [Contract](./glossary.md#contract), [Implementation](./glossary.md#implementation), [Verification](./glossary.md#verification), and [Observation](./glossary.md#observation) artifacts — all linked and revision-pinned.

The Build gate checks the Candidate against the ExplorationNote it used. If the Candidate touches things outside the retained scope, the gate blocks. If required artifact structure is missing (for example, a Behaviour for an observable behavior change), the gate blocks.

Candidates are revisioned and immutable. If Build needs to revise a Candidate, it creates a new Candidate revision.

---

## Composition

A **[Composition](./glossary.md#composition)** is a pinned, possible system world.

It is the output of [Compose](./01_the-model.md#compose). It records:

- Pinned Candidate revisions (the work packages that form this world)
- Direct member artifact refs (Policies, Decisions, Observations included directly)
- Derived effective member refs (all artifact revisions transitively included)
- Automated check results
- Judged check results
- Coherence state (`unevaluated`, `coherent`, `incoherent`)
- Blockers and findings

A Composition is **not a globally accepted system state**. It is one possible world. Multiple Compositions can exist simultaneously, each with different Candidate combinations, different Decisions, and different revision combinations. None is canonical.

An artifact revision is effective in a Composition when the Composition includes it — directly or transitively through an included Candidate. The same artifact may be effective in Composition A, absent from Composition B, and at a different revision in Composition C.

Composition revisions are immutable. Updating a member creates a new Composition revision:

```text
C@rev1 includes B@rev2.
To use B@rev3, create C@rev2.
```

C@rev1 remains as an immutable historical record. This is what makes branching alternatives, parallel agent work, and reproducible evaluation possible without fighting over a shared accepted state.

**Composition coherence** means all required checks pass for the pinned revisions in this Composition. It does not mean globally accepted, best solution, or canonical branch.

---

## Decision

A **[Decision](./glossary.md#decision)** is an explicit choice made within the design space a [Policy](./glossary.md#policy) defines.

Decisions are first-class artifacts in FST, not notes in chat. A Decision records:

- The question being answered (decision key)
- The answer
- The scope it applies to
- The [Composition](./glossary.md#composition) it is effective in

```text
Decision: reset-token-expiry
  question: How long should a password reset token remain valid?
  answer: 15 minutes
  scope: authentication subsystem
```

Decisions are Composition-scoped, not global. Different Compositions can hold different answers to the same question. This is how alternative product directions, experimental variants, or parallel work streams coexist without conflict.

The Compose gate checks Decision uniqueness: at most one effective Decision may answer the same `decision_key` and scope inside one Composition. Two Decisions with the same key and scope generate either a duplicate finding or a decision conflict, depending on whether the answers agree.

**Decision vs. Policy:**

```text
Policy defines the allowed design space.
Decision chooses a point inside that space.
```

A Policy says "the token expiry must be between 5 and 60 minutes." A Decision says "we chose 15 minutes." Both are first-class artifacts. Both are Composition-scoped.

---

## Policy

A **[Policy](./glossary.md#policy)** defines rules the target system must satisfy — the allowed design space.

Policies constrain [Artifacts](./glossary.md#artifact). A Policy may apply to artifact revisions by type, scope, tag, target pattern, environment, or condition:

```text
Policy: security-no-account-enumeration
  applies_to: Behaviour (tag: public_auth_flow)
  rule: password reset and login responses must not reveal whether
        an email address belongs to an account.
```

Policies are evaluated inside a Composition against the artifact revisions included there. A Policy violation is not stored on the artifact — it is recorded as a CompositionFinding in the Composition where the violation occurs.

Policies are themselves revisioned artifacts. Different Compositions can include different Policy revisions. Policy exceptions require gate-eligible user evidence.

---

## UserInteraction

A **[UserInteraction](./glossary.md#userinteraction)** records evidence of human input in a way that gates can rely on.

Because the agent narrates everything FST sees, FST cannot trust agent claims about what the user said or agreed to. User input that satisfies a gate must come from system-recorded evidence that is:

- **Hash-bound** — tied to the exact content of what was shown to the user, so silent edits after the fact invalidate the evidence
- **Meaning-bound** — tied to the specific question or requirement being answered, so a user's "yes" is anchored to what they actually said yes to
- **Gate-eligible** — recorded in a mode that FST recognizes as sufficient for the gate being checked

```text
Agent narration does not satisfy gates.
A UserInteraction record does.
```

Gate-eligible binding modes (strongest to weakest):

- `structured_response` — explicit key-value pair: `requirement_id = DR-reset-expiry, answer = 15_minutes`
- `prompt_reply_pair` — the exact prompt shown to the user, plus the exact reply
- `literal_answer_match` — the answer matches a defined set of valid answers

A quoted transcript span may support review but is not gate-eligible by default.

Every FST interruption — scope approval, Decision input, policy exception, coverage deferral — produces a UserInteraction record with the hash of the content and the specific requirement it satisfies.

---

## Requirement

A **Requirement** (sometimes a Decision Requirement) is a process artifact recording that a specific input is needed before a gate can pass.

Requirements are created during [Exploration](./01_the-model.md#exploration) when the agent discovers that a [Decision](./glossary.md#decision) or user input is needed before Build can proceed. They are created during [Build](./01_the-model.md#build) when an issue arises that requires human judgment.

A Requirement is satisfied when a gate-eligible [UserInteraction](./glossary.md#userinteraction) record exists that is meaning-bound to that requirement's id.

---

## CompositionFinding

A **CompositionFinding** records a specific issue detected during [Compose](./01_the-model.md#compose) gate evaluation.

Findings are world-specific. Two [Artifacts](./glossary.md#artifact) may conflict in one Composition and never meet in another. Therefore conflict belongs to the CompositionFinding, not to the artifact globally.

```text
Composition C@rev5 includes Behaviour A@rev2 and Behaviour B@rev7.
They conflict because their required outcomes are incompatible.
```

Common finding types:
- `revision_inconsistency` — two revisions of the same entity id are effective
- `contract_conflict` — two providers for the same Contract are incompatible
- `decision_conflict` — two Decisions answer the same question with different answers
- `policy_conflict` — an artifact violates an included Policy
- `verification_target_misalignment` — a Verification targets a stale Behaviour revision
- `coverage_gap` — a required Intent effect has no covering Behaviour or Verification
- `stale_exploration` — an ExplorationNote used by a Candidate is stale
- `missing_user_input` — a Decision Requirement has no gate-eligible UserInteraction

---

## Process Entities Summary

| Entity | Produced By | Records |
|---|---|---|
| WorkContext | Work-Context Selection | The approved search universe for Exploration |
| SearchView | Work-Context Selection | Derived searchable surface for Exploration |
| ExplorationNote | Exploration | Retained scope and all Exploration findings |
| Candidate | Build | Work package: artifacts created/changed, evidence, scope compliance |
| Composition | Compose | Pinned possible world: Candidates + coherence state + findings |
| Decision | Build or Compose | A named choice within the policy-defined design space |
| Policy | Any stage | Rules the target system must satisfy |
| UserInteraction | Any gate requiring user input | Hash-bound, meaning-bound human evidence |
| Requirement | Exploration or Build | Pending input needed before a gate can pass |
| CompositionFinding | Compose | A specific coherence issue in a Composition revision |

---

**Next:** [API Reference](./04_api.md) — Using `fst.control` from your agent
