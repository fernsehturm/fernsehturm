---
sidebar_position: 1
sidebar_label: "The Model"
---

# The FST Model

FST separates agent capability from agent authority.

An agent may be capable of reading files, drafting code, running tests, calling
tools, or preparing packets. FST decides whether the active process profile
allows the next controlled action.

## Core Split

```text
FST Kernel
  Reusable control engine.

Environment
  Where FST runs and what adapters/connectors are available.

Process profile
  Versioned process contract for one workflow.

Run state
  Durable record of one controlled execution.
```

The kernel is stable. The process profile changes per workflow.

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

## Gates

FST uses three gate types:

```text
Decision gate
  Guides missing facts, branching, classification, or hard blocks.

Approval gate
  Requires trusted human authority before risky work.

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

The profile maps gate results to these routes. The route tells the agent and
runtime what may happen next.

## Evidence

FST records decisions, artifacts, approvals, materialization attempts, scenario
results, and completion reports as evidence.

Evidence is not an agent summary. It is structured state used for gate
evaluation and replay.

## The Smallest Useful Loop

```text
1. Agent submits intended action.
2. Core loads active profile version.
3. Core validates action and payload.
4. Core evaluates gates against run state.
5. Core returns a route.
6. Core records evidence.
7. Agent follows the route.
```

That loop is the product.
