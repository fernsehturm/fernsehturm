---
sidebar_position: 5
---

# Glossary

## Agent

The model-backed worker that inspects, drafts, runs tools, and submits intended
actions to FST.

## Artifact

A typed record that may satisfy a process requirement when its schema,
provenance, run binding, profile version, and validation status are correct.

## Approval Gate

A gate that requires trusted human authority before a risky action or authority
increase may proceed.

## Approval Record

A trusted record that grants or denies a specific approval scope. Agents may not
create approval records through ordinary chat.

## Core

The deterministic FST engine that validates profiles, evaluates gates, selects
routes, accepts artifacts, records evidence, runs scenarios, and supports
replay.

## Decision Gate

A gate for missing facts, branching, classification, hard rules, or ambiguity.

## Evidence

Structured records used to explain and replay route decisions. Evidence is not
the agent's final summary.

## Hook

Process-owned logic called by FST to compute facts, validate artifacts, or
render templates. Hooks cannot return routes, approvals, publication, or
materialization authority.

## LocalFile Store

The transparent local store adapter that keeps Core records in inspectable
workspace files.

## Materialization

The controlled effect outside FST, such as writing a review packet, creating a
package, marking a patch ready, or later calling a protected connector.

## Process Pack

A directory or archive containing a process manifest, profile, optional hooks,
schemas, scenarios, templates, and skill instructions.

## Process Profile

The versioned control contract for one workflow: actions, artifacts, gates,
routes, approvals, scenarios, materialization rules, and report shape.

## Process-Conformance Gate

A gate that requires valid artifacts before the run can advance.

## Replay

Inspection of stored run state and evidence to explain why FST returned a
route.

## Route

The fixed result vocabulary returned by FST:

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

## Run

One controlled execution bound to a profile id, version, hash, actor, route
history, artifacts, and evidence refs.

## Scenario

A test fixture that submits actions and expected routes against a profile.
Scenarios prove that process behavior matches intent.

## SQLite Store

The single-file local database store adapter for the MVP product path.

## Workspace

The local directory initialized by `fst init`. It contains `.fst/config.yaml`,
state, profiles, trace records, and store data.
