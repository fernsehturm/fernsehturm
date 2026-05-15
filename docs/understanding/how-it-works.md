---
sidebar_position: 2
---

# How FST Works

FST wraps process-sensitive agent work in a control loop.

```text
actor or agent intent
-> FST command
-> controlled run state
-> process profile rules
-> route
-> evidence
-> preflight before protected effects
```

The agent still reasons and does useful work. FST decides whether the next
controlled boundary may be crossed.

## The Public Runtime Pieces

You can understand FST through four public pieces:

| Piece | Purpose |
| --- | --- |
| Interface | CLI, MCP, REST, SDK, or UI surface that sends FST commands |
| Host runtime | Local or hosted runtime that wires config, receivers, plugins, and components |
| Controlled run | Persistent official state for one execution of one process profile |
| Contract-based components | Stores, adapters, validators, authorization providers, process packs, and exports |

The internal implementation of the FST authority layer is not a public
extension point. Components interact through contracts.

## The Control Request

An agent submits an intended controlled action through an interface:

```ts
fst.control({
  protocol_version: "fst.control.v1",
  action: "patch.rules.evaluate",
  actor: "agent",
  payload: {
    decision: "pass"
  },
  run_id: "run_123",
  idempotency_key: "rules-run-1"
})
```

FST evaluates the request against the active run and process profile, then
returns a route. The route is the boundary the agent must follow.

## Gates

A gate is a condition that must be satisfied before progress counts.

Common gate classes are:

```text
decision gate
  missing facts, branching, classification, or hard rules

approval gate
  authority increases or risky work that requires trusted approval

process-conformance gate
  required valid artifacts before the run can advance
```

The process profile defines the gates. The agent can submit candidate
artifacts, ask for facts, or request approval. It cannot declare a gate
satisfied by narration.

## Routes

FST returns a fixed route vocabulary:

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

The route tells the agent, CLI, workflow, scenario runner, or UI what is valid
next. It can also explain why work is missing, blocked, waiting, or complete.

## Evidence And Replay

Every meaningful process decision should leave evidence:

- profile id, version, and hash
- run id and action
- actor and idempotency key
- gate or route reason
- missing artifacts or required approval
- submitted candidates and accepted evidence refs
- materialization preflight decisions
- scenario and validation results where relevant

Replay explains why FST returned a route using recorded process state and
evidence. Replay is not a transcript of agent thoughts. It is the official
process record.

## External Events And Adapters

Adapters can bring outside events into FST:

```text
email received
ticket updated
GitHub event received
webhook received
workflow trigger fired
file appeared
```

An event can become an input, artifact candidate, or run trigger. It is not
authority by default.

For example, an email saying "approved" should not automatically become an
approval unless the configured process validates the sender, authentication,
scope, expiry, and relation to the run.

## Materialization

Materialization is a protected effect: something changes outside the controlled
run.

Examples:

- send an email
- write a report
- create a ticket
- grant access
- query sensitive data
- merge a pull request
- deploy a service
- create a purchase order

Before a protected effect, FST performs materialization preflight. The question
is:

```text
Is this exact effect allowed in this run,
under this profile version,
for this actor,
with this scope,
with this evidence,
and with this approval path?
```

If the answer is no, the effect should not happen.

## Why This Matters

Without FST, an agent can be asked to follow a process and then self-report
that it did. With FST, the process has persistent state, gates, evidence,
approvals, and preflight.

That gives agents more useful access without giving them unchecked authority.
