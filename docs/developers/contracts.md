---
sidebar_position: 2
---

# Working With Contracts

Contracts are the public boundary between FST and the components around it.

They exist so a store, interface, adapter, authorization provider, validator,
process pack, or audit sink can be developed and tested without knowing how FST
works internally.

## Contract Families

FST uses contract families for the main component boundaries:

| Contract family | Used by |
| --- | --- |
| Command | CLI, MCP, REST, SDK, UI, workflow callers |
| Profile | Process profiles and process packs |
| Store | Local, database, or hosted stores |
| Environment | Adapters for external systems and event intake |
| Authorization | Identity, approval, and scope providers |
| Validator | Trusted checks and verification components |
| Materialization | Components that execute approved protected effects |
| Trust/install policy | Component trust and capability declarations |
| Config and secret provider | Host configuration and secret references |
| Artifact storage | Payload and blob storage implementations |
| Export and audit | Evidence export, audit, SIEM, and reporting sinks |

Each family should define:

- versioned schemas
- required and optional fields
- lifecycle states
- capability declarations
- trust declarations where relevant
- idempotency behavior
- error and retry behavior
- compatibility rules
- examples
- fixtures
- conformance tests

## Candidate To Acceptance

FST uses a candidate-to-acceptance model.

```text
component submits a candidate
-> FST checks run, profile, trust, scope, and contract validity
-> FST accepts or rejects the candidate for a specific purpose
-> accepted records become official evidence or state
```

That distinction is important.

A valid artifact is not automatically admitted evidence. A valid approval-shaped
record is not automatically authority. A successful adapter call is not
automatically a completed protected effect.

FST decides whether a submitted record counts for the active run.

## Interface Rule

All actor-facing interfaces should preserve the same command semantics.

For example, these should all represent the same intent:

```text
CLI:  fst run start ...
MCP:  fst.start_run
REST: POST /runs
SDK:  client.startRun(...)
```

The interface may parse input and present friendly output. It must not change
the meaning of the command, route, evidence reference, approval requirement, or
blocked state.

## Adapter Rule

Adapters connect FST to the outside world.

They may:

- receive external events
- normalize source data
- submit artifact or event candidates
- execute an approved materialization grant
- return execution results

They must not:

- treat an external event as approval by default
- mark their own output as admitted evidence
- bypass materialization preflight
- widen scope because a target API allows it
- treat connector credentials as process authority

## Validator Rule

Validators and check runners produce check result candidates.

They make FST stronger because hard gates can depend on trusted execution
rather than agent narration. A validator still does not decide that a process
gate passed. It produces a result that FST can accept or reject for the active
run and gate.

## Store Rule

Stores persist and return official records. They do not decide which records are
official.

A store implementation should preserve record identity, versioning, references,
digests, idempotency, transaction behavior, redaction, and retrieval semantics
defined by the store contract.

## Process Pack Rule

Process packs define process knowledge:

- actions
- artifacts
- gates
- routes
- approval requirements
- scenarios
- materialization rules
- agent instructions

They should never weaken the FST authority boundary. Hooks, templates, and
skills can help produce evidence, but they cannot grant authority by themselves.

## Agentic Development Checklist

When an agent develops a contract-based component, require it to produce:

- a short component purpose statement
- the contract family it implements
- records consumed and emitted
- trust assumptions
- failure behavior
- redaction behavior
- fixture coverage
- conformance command results
- known limitations
- review notes for human approval

The goal is not to make the agent understand FST internals. The goal is to make
the agent produce a component that obeys the public contract boundary.
