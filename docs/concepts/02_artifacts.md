---
sidebar_position: 2
sidebar_label: "System Artifacts"
---

# System Artifacts

System artifacts are the structured description of the target system. They record what the system is for, what it does, what its concepts mean, what concrete material carries it, how correctness is checked, and what has actually been observed.

Artifacts are not documentation added afterward. They are the structure FST uses to evaluate [coherence](./glossary.md#coherence). Keeping them current is the precondition for the [Compose](./01_the-model.md#compose) gate passing.

```text
System artifacts describe the target system.
Process entities describe work around the target system.
```

---

## The Seven Artifact Types

```text
Intent         = why something should hold
Behaviour      = how that truth appears in operation
Domain         = what the system's concepts mean
Contract       = named same-type dependency promise
Implementation = concrete system material
Verification   = how correctness is checked
Observation    = what actually happened
```

These are not stages. They are different views of the same system. A [Candidate](./glossary.md#candidate) may create or modify several of them at once.

---

## Intent

An **[Intent](./glossary.md#intent)** records why something should exist in the system.

Intent answers the question: *what purpose does this serve?*

An Intent contains one or more **effects** — named claims about what should hold true. Effects are the units FST uses to check coverage.

```text
Intent: Users can recover account access when they forget their password.
  effect: account-recovery-possible
  effect: recovery-does-not-expose-account-existence
```

A [Behaviour](./glossary.md#behaviour) refines an Intent effect — it says how that purpose manifests in observable system operation. A [Composition](./glossary.md#composition) is coherent only when each required Intent effect is refined by at least one Behaviour, covered by a Verification, and supported by passing Observations.

**What Intent is not:**
- A task description ("Implement password reset")
- A user story in ticket format
- A requirement that was agreed in a meeting

Intent records system purpose, not work to be done.

---

## Behaviour

A **[Behaviour](./glossary.md#behaviour)** records what the system does at an observable level.

Behaviour answers the question: *given a situation, what does the system do?*

A Behaviour is typically expressed as a testable rule:

```text
Behaviour: Password reset requests must return the same response
           for known and unknown email addresses.

Behaviour: Expired reset tokens must be rejected before the
           password change is applied.
```

Behaviours refine [Intent](./glossary.md#intent) effects. They use [Domain](./glossary.md#domain) meanings. They are implemented by [Implementation](./glossary.md#implementation) artifacts. They are proved by [Verification](./glossary.md#verification) artifacts.

A change that affects observable system behavior must produce a new Behaviour revision. If the [Verification](./glossary.md#verification) does not target the new revision, the [Composition](./glossary.md#composition) is incoherent — the drift is detected, not accumulated.

**Behaviour is not:**
- Code comments describing what a function does
- Vague quality goals ("the system should be fast")
- Test names or test descriptions

A Behaviour must be specific enough to be verified and falsifiable enough to be contradicted by an Observation.

---

## Domain

A **[Domain](./glossary.md#domain)** artifact records what the system's concepts mean.

Domain answers the question: *what do the words in our system actually mean?*

```text
Domain: Reset token
  meaning: a time-limited, single-use credential issued to a verified email address
           that authorizes exactly one password change.
  invariant: a reset token becomes invalid after use or after 15 minutes, whichever occurs first.
```

Domain artifacts capture meaning and invariants that multiple Behaviours rely on. They prevent different parts of the system from encoding contradictory assumptions about what a concept means.

When a [Behaviour](./glossary.md#behaviour) uses a Domain meaning, the relation is explicit and revision-pinned. If the Domain meaning changes, the Behaviour's Verification may need updating — and FST can detect that the Verification is now targeting a stale revision.

**Domain is not:**
- A data schema or database column definition
- Implementation-level field names or types
- Module organization or package structure

Domain records what concepts mean at the system's operating level, not how they are stored.

---

## Contract

A **[Contract](./glossary.md#contract)** is a named promise between same-type artifacts.

Contracts exist because same-type artifacts must never depend on each other directly:

```text
Allowed:   Behaviour → Contract(level=behaviour) → Behaviour
Not allowed: Behaviour → Behaviour
```

The same rule applies to all artifact types: Implementation through Implementation Contracts, Domain through Domain Contracts, Verification through Verification Contracts, Intent through Intent Contracts.

A Contract names the promise explicitly:

```text
Contract: reset-token-available
  level: behaviour
  promise: a valid, unexpired reset token exists for the requesting email address
```

When a Behaviour requires `reset-token-available`, FST checks in Compose whether the Composition includes a Behaviour revision that provides that Contract. If no provider exists, the Composition is incoherent.

**Why Contracts matter:**

Without Contracts, same-type dependencies are invisible. Code can call another module without recording the promise it relies on. When the provider changes, the consumer breaks — and nobody knows which changes are safe.

With Contracts, the promise is a named artifact. Every provider and every consumer is tracked. FST can check in Compose whether required promises are satisfied and whether two providers for the same Contract are compatible.

**Contract is not:**
- An API schema or interface definition (though it may correspond to one)
- A test fixture or mock
- A service-level agreement in the operations sense

A Contract is a named promise at one level of abstraction, used by FST to check that same-type dependencies compose correctly.

---

## Implementation

An **[Implementation](./glossary.md#implementation)** artifact records the concrete system material that carries a [Behaviour](./glossary.md#behaviour).

Implementation is the artifact type that corresponds most directly to code, configuration, migrations, infrastructure definitions, and other concrete system material.

An Implementation artifact:
- References the concrete material (file path, diff, configuration block)
- Declares which Behaviour it implements
- Declares which Domain invariants it enforces
- Declares which [Policy](./glossary.md#policy) rules it is subject to
- Records expected and actual touch points

```text
Implementation: add reset_token column
  implements: Behaviour B-reset-token-can-be-issued@rev2
  enforces: Domain D-reset-token-is-time-limited@rev1
  verified_by: Verification V-token-expiry-migration-safety@rev1
```

The Build gate checks that Implementation artifacts stay inside the [retained scope](./glossary.md#retained-scope) approved in the [ExplorationNote](./glossary.md#explorationnote). An Implementation that touches source outside the retained scope blocks the gate.

**Implementation is not:**
- The code file itself (the artifact references the code; it is not the code)
- A description of what the code should do (that is Behaviour)
- A test (that is Verification)

---

## Verification

A **[Verification](./glossary.md#verification)** artifact defines how correctness is checked.

Verification records the *definition* of how to prove a [Behaviour](./glossary.md#behaviour) claim — not the result of running the check.

```text
Verification: reset-token-expiry-check
  targets: Behaviour B-expired-tokens-rejected@rev3
  method: automated
  description: runs token expiry integration test in CI environment
  required_environments: [ci, staging]
```

A Verification revision is tied to an exact Behaviour revision. If the Behaviour changes, the Verification must be updated to target the new revision — otherwise Compose detects the misalignment and marks the Composition incoherent.

[Observations](./glossary.md#observation) record the results of actually running a Verification. A Verification without supporting Observations is a defined check that has not been executed.

**Verification is not:**
- A test file (the artifact references the check; it is not the test code)
- An Observation (the result of running the check)
- A coverage metric or percentage

---

## Observation

An **[Observation](./glossary.md#observation)** artifact records what actually happened when a check was run.

```text
Observation: reset-token-expiry-test-passed-ci-2024-07-12
  supports: Verification V-reset-token-expiry-check@rev2
  environment: ci
  result: passed
  run_at: 2024-07-12T14:23:11Z
```

Observations are evidence. A [Behaviour](./glossary.md#behaviour) that has a Verification and passing Observations in required environments is covered in the [Composition](./glossary.md#composition) that includes them.

Observations can support or contradict. A contradicting Observation is not a silent failure — it is a concrete, revision-pinned record that a specific check found a specific Behaviour to fail, in a specific environment, at a specific time. FST uses that record in coherence evaluation.

An Observation that supports Verification `V@rev2` does not automatically support Verification `V@rev3`. Evidence must target exact revisions.

---

## How Artifacts Connect

Artifacts gain meaning through typed, revision-pinned relations.

```text
Behaviour refines Intent effect
Behaviour uses Domain meaning
Implementation implements Behaviour
Implementation enforces Domain invariant
Verification verifies Behaviour
Observation supports Verification
Observation contradicts Behaviour
Policy constrains Implementation
Decision informs Behaviour
```

Cross-type relations are direct. Same-type dependencies use [Contracts](./glossary.md#contract).

```text
Cross-type relations: direct.
Same-type relations: through Contracts.
```

Relations are validated by the relation constraint registry. An invalid relation — one the registry does not allow — is a blocker.

---

## The Minimal Artifact Path

For a small but complete change, FST expects at least this path:

```text
Intent → Behaviour → Implementation → Verification → Observation
```

[Domain](./glossary.md#domain) is needed when meaning, terminology, or invariants matter. [Contract](./glossary.md#contract) is needed when same-type dependencies or shared promises matter. [Observation](./glossary.md#observation) is needed when a verification has actually been executed or external evidence exists.

Not every artifact type is mandatory for every [Candidate](./glossary.md#candidate), but missing pieces must be justified by the gate. A Candidate that changes observable behavior without a corresponding Behaviour will fail the Build gate.

---

## Revision Pinning

Every artifact has an `id` (the stable concept identity) and a `revision_ref` (one exact immutable version of that concept).

```text
Intent I@rev1
Behaviour B@rev4
Implementation Impl@rev9
Verification V@rev2
```

Stored references must always pin both. There is no stored reference to "latest."

When an artifact's meaning-bearing content changes, FST creates a new revision. Old revisions remain for historical Compositions:

```text
Old worlds stay reconstructable.
New meaning gets a new revision.
```

This is the structural property that makes parallel work safe: any bundle of pinned references is fully determined by what it pins. Nothing about it changes when the broader graph evolves.

---

## Artifacts Are Not Globally Accepted

An artifact exists in the graph does not mean it is effective anywhere.

An artifact becomes effective only when a coherent [Composition](./glossary.md#composition) includes that exact revision.

```text
Artifact exists ≠ artifact is effective
Artifact is effective = artifact revision included in a coherent Composition
```

The same artifact may be effective in Composition A, absent from Composition B, and at a different revision in Composition C — all at the same time. This is normal. Truth is Composition-scoped.

---

## Common Anti-Patterns

**Artifact as ticket:**
```text
Bad:   Intent: Implement password reset.
Good:  Intent: Users can recover account access when they forget their password.
```

**Implementation without Behaviour:**
```text
Bad:   Implementation: Add reset_token column.
       (no behaviour or domain relation)

Good:  Implementation: Add reset_token column.
       implements → Behaviour B-reset-token-can-be-issued@rev2
       enforces   → Domain D-reset-token-is-time-limited@rev1
```

**Observation without target:**
```text
Bad:   Observation: Tests passed.
Good:  Observation: Password reset expiry test passed in CI.
       supports → Verification V-reset-token-expiry@rev2
```

**Same-type direct dependency:**
```text
Bad:   Behaviour B-send-email depends_on Behaviour B-create-token.

Good:  Behaviour B-create-token provides Contract C-reset-token-available.
       Behaviour B-send-email requires Contract C-reset-token-available.
```

---

**Next:** [Process Entities](./03_process-entities.md) — WorkContext, ExplorationNote, Candidate, Composition, and the rest
