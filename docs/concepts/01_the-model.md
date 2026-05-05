---
sidebar_position: 1
sidebar_label: "The FST Model"
---

# The FST Model

FST organizes agent-driven work into a controlled path with strict exits and free interiors.

```text
Work-Context Selection → Exploration → Build → Compose
```

The agent is free inside each stage. FST controls whether the result may move to the next stage.

```text
Stages are flexible.
Gates are strict.
```

A stage does not prove that the work is good. A gate proves that the work is traceable, bounded, falsifiable, and ready for the next kind of evaluation.

---

## Work-Context Selection

Work-Context Selection establishes where [Exploration](#exploration) is allowed to look.

It answers:

```text
Which Composition revisions, source revisions, and graph context may Exploration search?
What discovery policy applies?
Which SearchView is derived for Exploration?
```

Work-Context Selection produces a [WorkContext](./glossary.md#workcontext) revision and a [SearchView](./glossary.md#searchview) revision.

The most important thing Work-Context Selection does is set the starting universe explicitly:

```text
WorkContext = the approved starting universe for Exploration
```

Work-Context Selection does **not** grant Build permission. Build is constrained later by the [ExplorationNote](./glossary.md#explorationnote) retained scope.

Without a WorkContext, Exploration has no defined universe to search. The selection is the precondition for the rest.

---

## Exploration

Exploration discovers what a piece of work actually touches.

It answers:

```text
What does this work touch?
What existing artifacts matter?
What source areas are involved?
What decisions and policies apply?
What user input is required before Build can start?
What risks, gaps, or unknowns exist?
What is Build allowed to change?
```

Exploration produces an [ExplorationNote](./glossary.md#explorationnote) revision.

The most important output of Exploration is the **retained scope**:

```text
retained_scope = the approved box for Build
```

The retained scope specifies exactly what Build may read, depend on, modify, create, and verify. If Build later discovers that the box is too small, it cannot silently expand it. It must return to Exploration and produce a new ExplorationNote revision.

The Exploration gate checks whether an ExplorationNote revision is ready to start Build:

- User request is recorded
- Retained scope exists and is revision-pinned
- Relevant decisions and policies are identified
- Required user input has gate-eligible evidence
- Blast-radius report exists
- Freshness is current, or a staleness waiver is in place

If any of these fail, Exploration returns blockers rather than silently allowing Build to start in an undefined state.

---

## Build

Build creates [Candidate](./glossary.md#candidate) work inside the box Exploration defined.

It answers:

```text
What concrete work package was created?
Which artifacts were created or changed?
Which behaviours, meanings, contracts, implementations, verifications, and observations are involved?
Does the work stay inside the retained scope?
Is the Candidate traceable and complete enough to compose?
```

Build produces a [Candidate](./glossary.md#candidate) revision.

A Candidate is the durable work package. It records:

- The ExplorationNote revision it used
- Which [System Artifacts](./glossary.md#artifact) were created or changed (with revision-pinned references)
- Expected and actual touch points, with any differences explained
- [Verification](./glossary.md#verification) definitions and [Observations](./glossary.md#observation) from checks that ran

The Build gate checks whether the Candidate stayed inside the retained scope and contains enough structure to compose:

- All references are revision-pinned
- Modified artifacts were retained for modification in the ExplorationNote
- Same-type dependencies use [Contracts](./glossary.md#contract), not direct relations
- [Intent](./glossary.md#intent) exists where purpose must be represented
- [Behaviour](./glossary.md#behaviour) exists where observable behavior changes
- [Implementation](./glossary.md#implementation) carries the concrete proposed material
- [Verification](./glossary.md#verification) defines how correctness is checked
- Required user input for Build is satisfied with gate-eligible evidence

If the Build gate returns `needs_exploration`, the retained scope is too small or wrong, and the work must go back to Exploration.

---

## Compose

Compose combines Candidates into a [Composition](./glossary.md#composition) — a pinned, possible system world.

It answers:

```text
Do the pinned revisions hold together as a possible system world?
Are the relations valid?
Do contracts compose without conflict?
Are decisions unique inside this world?
Are policies satisfied?
Do verifications target the right revisions?
Is required coverage present?
Is the Composition coherent?
```

Compose produces a [Composition](./glossary.md#composition) revision.

A Composition is not a globally accepted state. It is an immutable possible world made from exact revisions. Multiple Compositions can exist simultaneously — different choices, different revision combinations, different product directions. None is canonical.

The Compose gate checks [coherence](./glossary.md#coherence):

**Automated checks** (computed from the graph):
- Revision consistency — no two revisions of the same entity id are effective in the same Composition
- Relation constraints — relations match the allowed constraint registry
- Contract compatibility — required Contract promises are provided and not invalidated
- Decision uniqueness — at most one effective [Decision](./glossary.md#decision) answers the same question in this Composition
- Policy satisfaction — included [Policies](./glossary.md#policy) are satisfied by the effective artifacts
- Implementation target conflicts — no two Candidates affect the same concrete target incompatibly
- Verification target alignment — Verifications target the exact Behaviour revision they are used to prove
- Verification coverage — required claims have proof and evidence
- User-input satisfaction — required user input is system-recorded, hash-bound, and meaning-bound

**Judged checks** (require human or designated-reviewer judgment):
- Behaviour compatibility — included behaviours semantically fit together
- Domain semantic compatibility — domain meanings are compatible
- Policy interpretation — policies are satisfied where the rule cannot be fully computed

A Composition is coherent when all required checks pass for its pinned revisions.

```text
coherent = this pinned world holds together under FST's checks and evidence.
```

Coherent does not mean globally accepted, best solution, or permanently true. It means this specific Composition revision holds together.

---

## The Gate Model

FST uses gates at each stage transition to decide whether work is ready to move forward.

```text
User request
  ↓
Work-Context Selection (produces WorkContext, SearchView)
  ↓
Context gate
  ↓
Exploration (produces ExplorationNote)
  ↓
Exploration gate
  ↓
Build (produces Candidate)
  ↓
Build gate
  ↓
Compose (produces Composition)
  ↓
Compose gate (coherence check)
```

**Exploration gate results:**
- `ready_for_build` — Build may start from this ExplorationNote revision
- `blocked` — blockers must be resolved before Build may start

**Build gate results:**
- `ready_for_compose` — Candidate is complete and bounded enough to compose
- `blocked` — Candidate is incomplete or invalid inside current scope
- `needs_exploration` — the allowed box is too small or wrong

**Compose gate results:**
- `coherent` — the Composition revision holds together internally
- `incoherent` — one or more blockers remain (specific findings are listed)
- `unevaluated` — coherence has not been checked yet

Gates check pinned revisions, not agent narration. A gate result is reproducible from the artifact graph.

---

## When FST Interrupts You

FST does not interrupt you for low-risk implementation details, formatting choices, or obvious local fixes.

There are five valid reasons FST should interrupt you:

1. **Behaviour Ambiguity** — an implementation choice affects observable behavior and the requirement is underspecified. You need to clarify what the system should do.

2. **Decision Conflict** — the proposed path conflicts with an active [Decision](./glossary.md#decision). You need to either update the Decision or adjust the approach.

3. **Scope Breach** — the agent discovered it needs to touch something outside the approved [retained scope](./glossary.md#retained-scope). You need to either approve the scope expansion (triggering a new Exploration) or constrain the approach.

4. **Verification Gap** — the agent cannot produce the required evidence for a [Behaviour](./glossary.md#behaviour) claim. You need to decide how to handle the coverage gap.

5. **Meaningful Tradeoff** — two paths are both acceptable, but the choice affects risk, compliance, or maintenance in a way only you can evaluate.

Every interruption produces a [UserInteraction](./glossary.md#userinteraction) record that is hash-bound to the exact question and content. Your answer becomes gate-eligible evidence.

---

## Returning to Earlier Stages

The flow is not strictly linear. Work may return to earlier stages.

**Build returns to Exploration when:**
- The retained scope is too small
- A new source area must be modified
- A required policy or decision was missed
- The ExplorationNote is stale

Result: a new ExplorationNote revision is created.

**Compose returns to Build when:**
- A Candidate is incomplete
- A Verification is missing
- Contracts do not compose
- Coverage is insufficient but scope is correct

Result: a new Candidate revision is created.

**Compose returns to Exploration when:**
- A composition failure is caused by wrong or missing scope
- A policy conflict reveals broader impact
- A required Decision was not discovered during Exploration
- Staleness requires rediscovery

Result: a new ExplorationNote revision is created.

**Compose requires user input when:**
- A Decision requirement is unsatisfied
- A policy exception needs approval
- A judged check requires review evidence
- A stale exploration waiver is requested

Result: a gate-eligible UserInteraction record is created, then the gate is re-run.

---

## The Two Artifact Layers

FST keeps two layers of artifacts strictly separate.

**[System artifacts](./02_artifacts.md)** describe the target system: what it is for, what it does, what its concepts mean, how correctness is checked, what has been observed. System truth lives in system artifacts.

**[Process entities](./03_process-entities.md)** describe work being done around the system: scope, work packages, possible worlds, requirements, recorded interactions, findings. Process state lives in process entities.

```text
System artifacts describe the target system.
Process entities describe work around the target system.
```

The two never bleed into each other. A system artifact must not contain process state. A process entity must not contain system truth.

---

## The Strongest Invariants

These rules underpin everything else. Any feature, any flow, any decision is checkable against this list.

```text
1. Nothing is effective by id alone — every reference pins a revision.
2. Nothing is globally accepted — effectiveness is Composition-scoped.
3. Artifacts are effective only inside coherent Composition revisions.
4. Same-type artifacts never connect directly — only through Contracts.
5. Stage exits require gate satisfaction; stage interiors are agent-controlled.
6. User input satisfies a gate only with hash-bound, meaning-bound,
   system-recorded evidence.
7. Old Composition revisions never mutate; updates produce new revisions.
8. Judged checks require designated judgment evidence, not agent assertion.
9. System artifacts and process artifacts are kept separate.
```

These invariants are why FST can let agents move quickly inside a stage while preventing their output from quietly becoming uncontrolled system behaviour.

---

**Next:** [System Artifacts](./02_artifacts.md) — Intent, Behaviour, Domain, Contract, Implementation, Verification, Observation
