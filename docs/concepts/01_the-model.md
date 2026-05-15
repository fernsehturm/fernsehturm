---
sidebar_position: 1
sidebar_label: "The Model"
---

# The FST Model

FST separates agent capability from process authority.

An agent may be capable of reading files, drafting code, running tests, calling
tools, or preparing packets. FST decides whether the active controlled run
allows the next process step to count.

## Public Concepts

```text
Process profile
  Versioned rules for one process.

Controlled run
  One execution of one process profile.

Gate
  A required condition before progress counts.

Artifact
  Typed evidence submitted for a run.

Approval
  Authority from a trusted person, system, or policy path.

Scope
  Run-bound permission for specific data, tools, targets, or effects.

Route
  FST's answer for what may happen next.

Materialization preflight
  Final check before a protected effect changes the outside world.
```

## Process Profile

A process profile defines:

- metadata and version
- actors and roles
- closed action set
- artifact types
- gates
- routes
- approval requirements
- materialization modes
- scenario fixtures
- report shape

Every run binds to a profile id, version, and hash so replay can explain which
rules controlled the agent.

## Controlled Run

A controlled run is the official process state for one execution.

It records:

- which profile version applies
- what the current route is
- which gates are missing or satisfied
- which artifacts and approvals were submitted
- which evidence was accepted
- which scopes exist
- which protected effects were allowed, blocked, or attempted
- how the run can be replayed

The run should not depend on one agent session. One agent can start the work,
another can resume it, and FST remains the process authority because the state
lives in the controlled run.

## Contracts And Components

FST components communicate through contracts.

```text
interfaces submit commands
adapters submit events, artifacts, or materialization results
validators submit check results
authorization providers submit identity or approval candidates
stores persist official records
process packs define process rules
```

Components do not decide what becomes official FST state. They submit
contract-shaped data. FST accepts or rejects it for the active run.

## Gates

Common gate classes are:

```text
Decision gate
  Guides missing facts, branching, classification, or hard blocks.

Approval gate
  Requires trusted authority before risky work.

Process-conformance gate
  Requires valid artifacts before the run can advance.
```

The agent can create allowed artifacts. It cannot waive the gate.

## Routes

Routes are fixed:

```text
Continue
InstructAgent
AskUser
AwaitApproval
Blocked
MaterializeMock
MaterializeAllowed
Complete
```

The route tells the agent and runtime what may happen next.

## Evidence

FST records decisions, artifacts, approvals, materialization attempts, scenario
results, and completion reports as evidence.

Evidence is not an agent summary. It is structured state used for gate
evaluation and replay.

## The Smallest Useful Loop

```text
1. An actor or agent submits intended action.
2. FST evaluates the active controlled run and process profile.
3. FST returns the next valid route.
4. The agent or workflow follows the route.
5. Candidate artifacts, approvals, or results are submitted.
6. FST accepts or rejects what counts.
7. Evidence is recorded for replay.
```

That loop is the product.
