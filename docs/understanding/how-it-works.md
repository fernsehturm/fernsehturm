---
sidebar_position: 2
---

# How FST Works

FST wraps agent work in a deterministic control loop.

```text
agent intent
  -> installed process profile
  -> Core gate evaluation
  -> route decision
  -> evidence record
  -> controlled materialization
```

The agent still reasons and does useful work. FST decides whether the next
controlled boundary may be crossed.

## The Runtime Pieces

```text
Kernel
  Core semantics, profile validation, gate evaluation, artifact acceptance,
  route selection, evidence, replay, materialization preflight, store contract.

Adapters
  local_file store, sqlite store, trace store, local report materializer,
  hook runtime host.

Configuration
  .fst/config.yaml selects store, runtime protocols, profile API, and adapter
  options. .fst/processes/registry.json records installed processes and their
  generated commands.

Process pack
  Business-specific profile, actions, artifacts, gates, hooks, scenarios,
  templates, and skill instructions.
```

The process pack owns business logic. Core owns control semantics.

## The Control Request

An agent submits a closed action name and payload:

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

Core resolves the process from the generated command or explicit process
reference, loads the bound profile version, checks the action, evaluates gates
against current run state and artifacts, and returns a route.

## Gate Types

FST uses three gate types:

```text
Decision gate
  Missing facts, branching, classification, or hard rules.

Approval gate
  Authority increases or risky work that requires a trusted human decision.

Process-conformance gate
  Required valid artifacts before the action can proceed.
```

Gate evaluation is deterministic for the same profile version, run state,
payload, artifacts, approvals, and idempotency key.

## Routes

FST returns one fixed route vocabulary:

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

The route is the boundary. It tells the agent, CLI, orchestrator, and scenario
runner what may happen next.

## Evidence And Replay

Every meaningful decision records evidence:

- profile id, version, and hash
- run id and action
- actor and idempotency key
- gate id and type
- route and reason
- missing artifacts or required approval
- created artifacts and evidence refs
- hook input/output hashes when hooks run

Replay uses stored evidence and run state to explain why FST returned a route.

## Hooks

Process packs may include hook logic. Hooks compute facts, validate artifacts,
or render templates.

Hooks do not decide routes and do not grant authority. If hook output tries to
return a route, approval record, publication, or materialization permission, FST
rejects it.

## Materialization

Materialization is the outside effect: write a report, create a package, mark a
patch ready, send an email, or touch a protected system.

Materialization is local and conservative unless the installed process and
environment explicitly allow a stronger effect:

```text
mock
shadow
approved_real
```

Materialization preflight checks route, artifacts, approvals, scope fields, and
idempotency before any effect.
