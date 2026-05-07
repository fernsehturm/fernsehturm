---
sidebar_position: 3
---

# FST Comparisons

FST does not replace prompts, memory, RAG, sandboxes, orchestrators, CI, or PR
review. Those tools still matter. FST fills the control gap between a user
request and a coherent result.

The short contrast:

```text
Prompts describe intent.
Memory and RAG provide context.
Sandboxes contain execution.
Orchestrators schedule work.
CI runs checks.
PR review inspects a diff.
FST controls the work record that connects intent, scope, decisions,
implementation, verification, evidence, and composition.
```

## Comparison Map

| Comparison | What it is good for | Where it stops | What FST adds |
| --- | --- | --- | --- |
| Prompts | Telling the agent what you want | Prompt text is not a durable gate record | Stage records, retained scope, and gate evidence |
| Memory | Carrying useful facts between sessions | Memory is advisory and can be stale or ignored | Revision-pinned WorkContext and Composition-scoped truth |
| RAG | Finding relevant context | Retrieval does not decide what is accepted or allowed | SearchView, retained scope, and controlled context selection |
| Sandboxes | Isolating execution and filesystem effects | Isolation does not prove the work was authorized | Candidate scope checks and traceability |
| Orchestrators | Dispatching tasks across agents | Scheduling does not make outputs coherent | Composition checks across candidates and decisions |
| CI and PR review | Running tests and reviewing code | They happen after work exists and focus on files | Pre-build authorization and evidence-backed review surface |

## FST Vs Prompts

Prompts are useful for expressing intent, constraints, and preferences. They are
not enough when the work needs to be audited later.

A prompt can say "do not add persistent login." FST turns that constraint into
retained scope, policy, decision evidence, and a Build gate that blocks a
Candidate if persistent login appears anyway.

FST adds:

- a [WorkContext](../concepts/glossary.md#workcontext) before Exploration
- a retained [ExplorationNote](../concepts/glossary.md#explorationnote) before Build
- [Candidate](../concepts/glossary.md#candidate) scope evidence after Build
- [Composition](../concepts/glossary.md#composition) checks before the result moves forward

## FST Vs Memory

Memory helps an agent remember facts, preferences, and prior work. It does not
decide which facts are active in this task.

FST treats truth as Composition-scoped. A decision can be active in one
Composition, absent from another, and replaced in a third. That keeps historical
or experimental knowledge from becoming accidental permission.

FST adds:

- revision-pinned references instead of floating memory
- explicit decision and policy records
- stale-evidence detection
- coherent possible worlds instead of one global memory stream

## FST Vs RAG

RAG improves what an agent can find. It does not make found context safe to use.

FST separates searchable context from approved scope. A [SearchView](../concepts/glossary.md#searchview)
defines what Exploration may inspect. The retained scope inside the
ExplorationNote defines what Build may use, modify, create, and verify.

FST adds:

- controlled Work-Context Selection
- explicit SearchView derivation
- retained scope for Build
- blockers when retrieved context conflicts with accepted decisions or policies

## FST Vs Sandboxes

Sandboxes contain where code can run and what it can touch at runtime. They do
not explain whether the agent should have produced the work in the first place.

An agent can build the wrong feature entirely inside a sandbox. FST checks
authorization and traceability, not just execution containment.

FST adds:

- accepted scope before implementation
- expected versus actual touch-point comparison
- Verification and Observation records
- explicit materialization approval for concrete outputs

## FST Vs Orchestrators

Orchestrators distribute work: run these agents, in this order, with these
inputs, and collect their outputs. That is useful for throughput.

FST controls whether the outputs can compose. Two agents can each produce work
that passes local tests while still making incompatible product decisions,
violating the same contract, or touching the same implementation target in
conflicting ways.

FST adds:

- separate Candidate work packages
- revision-pinned references
- decision, policy, contract, and coverage checks
- Composition findings that explain why a combination is coherent or blocked

## FST Vs CI And PR Review

CI proves that configured checks ran. PR review inspects a diff. Both usually
happen after the work already exists.

FST asks whether the work was allowed before Build starts, then gives CI and PR
review a narrower, evidence-backed surface afterward.

FST adds:

- pre-build scope authorization
- trace links from intent to behaviour, implementation, verification, and observation
- user-input evidence for decisions and exceptions
- coherence checks across the selected system world

## What To Read Next

For the control path, read [How FST Works](./how-it-works.md). For examples,
read the [Session Expiry Demo](../fst-in-action/demo.md). For exact terms, use
the [Glossary](../concepts/glossary.md).
