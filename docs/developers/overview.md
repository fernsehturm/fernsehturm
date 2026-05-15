---
sidebar_position: 1
---

# Component Developer Guide

This section is for humans and agents that build FST components.

The development model is contract-first:

```text
read the relevant contract
-> implement one component boundary
-> run contract fixtures and conformance tests
-> connect through the host runtime
-> let FST decide what becomes official state
```

Do not build against FST internals. Do not try to reproduce FST route,
approval, gate, or preflight decisions inside a component. Components submit
contract-shaped commands, candidates, facts, or results. FST decides whether
they count.

## Who This Is For

Use this guide when you are building:

- an interface such as CLI, MCP, REST, SDK, or UI
- a store implementation
- an environment adapter for tickets, email, Git, databases, IAM, or workflow tools
- an authorization provider
- a validator or check runner
- a process profile or process pack
- a plugin trust policy
- an artifact storage provider
- an export or audit sink

Agentic developers should use the same path. An agent can draft code,
fixtures, documentation, and tests, but it should treat the contracts and
conformance expectations as the source of truth.

## The Authority Rule

Every component should preserve this rule:

```text
components submit
FST decides
stores persist official records
adapters execute only after an allowed grant or route
```

Common mistakes:

- an adapter treating a successful API call as admitted FST evidence
- a chat gateway treating a message as approval without validation
- a validator treating its result as a passed gate
- an interface rewriting a blocked route into a softer response
- a store accepting non-official records as if they were FST state
- a process pack giving hooks authority to approve or materialize

Those mistakes make the component an authority. FST is designed so components
stay replaceable and the process authority stays consistent.

## Component Map

| Component | Contract to follow | What it contributes |
| --- | --- | --- |
| Interface | Command and interface contracts | Converts actor intent into FST commands and renders responses |
| Store | Store contract | Persists and returns official records |
| Environment adapter | Environment and materialization contracts | Receives outside events or executes approved effects |
| Authorization provider | Authorization contract | Resolves identity, authority facts, and approval candidates |
| Validator | Validator contract | Produces trusted check result candidates |
| Process pack | Profile contract | Defines actions, artifacts, gates, routes, scenarios, and materialization rules |
| Trust policy | Trust/install policy contract | Declares which components and capabilities are trusted |
| Artifact storage | Artifact storage contract | Stores payloads referenced by FST records |
| Export sink | Export and audit contract | Sends evidence to audit, SIEM, reporting, or compliance destinations |

The public docs describe the contract role. Exact schemas, fixture manifests,
and conformance runners live with the contract artifacts in the implementation
repository.

## Development Workflow

1. Pick one component boundary.
2. Read the contract family for that boundary.
3. Identify the records your component consumes and emits.
4. Implement only that boundary.
5. Add examples for successful, malformed, duplicate, unauthorized, stale, and blocked cases.
6. Run the contract fixtures and conformance tests.
7. Test with the mock FST authority harness when available.
8. Connect through the host runtime.
9. Verify that blocking, waiting, redaction, idempotency, and retry behavior fail closed.
10. Document what the component does, what it does not do, and which authority it does not have.

## What To Avoid

Do not:

- import or depend on closed FST internals
- define a parallel command envelope
- invent new route values
- decide gate satisfaction in a component
- admit evidence directly from an adapter, validator, or interface
- grant approval or scope from an untrusted actor surface
- execute protected effects without materialization preflight
- treat installed, enabled, authenticated, or healthy as trusted by default
- rely on undocumented fields or response meanings

## What Good Looks Like

A good component can answer these questions:

- Which contract family does it implement?
- Which records does it consume?
- Which records does it emit?
- Which cases are covered by fixtures?
- How does it handle retries and idempotency?
- How does it fail closed?
- How are secrets and sensitive fields redacted?
- Which trust policy entry is required before output can be considered?
- Which parts of authority are explicitly not owned by the component?

If an agent is building the component, require it to include these answers in
the review packet before approval for use or publication.
