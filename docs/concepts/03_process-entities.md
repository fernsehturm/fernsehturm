---
sidebar_position: 3
---

# Process Entities

Process entities are the durable records FST uses to control a run.

They do not replace the external system of record. They record the facts,
requirements, checks, approvals, routes, and outcomes needed to decide what may
happen next.

## Entity Families

```text
Run
Context
Requirement
Gate
Route
Approval
Artifact
Materialization
Scenario
Report
Evidence
```

## Run

A run records one controlled execution:

```text
run_id
profile_id
profile_version
profile_hash
agent_id
requester
requested_action
status
route_history
evidence_refs
```

Every run stays bound to the profile version it started with.

## Requirement

A requirement says what must be satisfied before work can advance:

- decision requirement
- approval requirement
- artifact requirement
- evidence requirement
- materialization requirement

If the meaning changes, create a new requirement. Do not let old evidence
silently satisfy a changed question.

## Gate And Route

A gate evaluates a condition before an action.

A route tells the agent or runtime what happens next:

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

## Approval

Approval entities include:

- approval request
- approval decision
- approval record
- approval scope
- approval expiry

The agent may summarize an approval request. It may not create the approval
record that grants authority.

## Materialization

Materialization entities record attempts to affect the outside world:

- materialization plan
- mode
- connector reference
- target scope
- preflight result
- materialization result

The MVP focuses on `mock` and `shadow` modes. Real approved materialization
requires explicit profile and environment support.

## Evidence

Evidence records explain why FST returned a route and what state was accepted.
Replay depends on these records.
