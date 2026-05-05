---
sidebar_position: 2
---

# Traceability And Evidence

FST does not ask you to trust the agent's final summary. It records the work as
linked evidence.

## Traceability

Every meaningful change should connect to:

- the user request
- the WorkContext
- the ExplorationNote retained scope
- the Candidate that contains the work
- the system artifacts changed or created
- the Verification definitions and Observations
- the Composition where the result is checked

## Evidence

Gate-relevant user input must be system-recorded, hash-bound, and meaning-bound.

Invalid:

```text
Agent says the user approved.
```

Valid:

```text
UserInteraction records the exact prompt and reply.
The content hash matches.
The answer is bound to the specific requirement it satisfies.
```

## Claims Become Checkable Records

FST does not ask you to trust the agent's confidence. It turns agent claims into checkable records:

| Agent claim | FST checks |
|---|---|
| "I stayed in scope." | Does the Candidate modify only retained scope from the pinned ExplorationNote? |
| "The tests passed." | Which Verification revision was run, and which Observation records the result? |
| "The user approved it." | Which UserInteraction is hash-bound and meaning-bound to the required question? |
| "It does not conflict." | Does the Composition pass automated and judged checks for the pinned revisions? |

## What FST Can Verify Automatically

- every effective reference is revision-pinned
- relations are allowed by the relation rules
- same-type dependencies go through Contracts
- a Composition does not include conflicting revisions of the same entity
- Decisions are unique inside the Composition
- Policies are satisfied where the rule is computable
- Verifications target the effective revisions they claim to cover
- required coverage exists or is explicitly deferred
- user evidence exists when a gate needs it

## Why It Matters

When review happens later, the question is no longer:

```text
Can I reconstruct what happened from the patch?
```

It becomes:

```text
Which exact recorded intent, scope, decisions, and evidence does this patch trace to?
```

For deeper reference, see [System Artifacts](../concepts/02_artifacts.md) and
[Process Entities](../concepts/03_process-entities.md).
