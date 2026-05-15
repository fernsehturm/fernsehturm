---
sidebar_position: 1
---

# Process Pack API

This API section is the technical reference for developing FST process packs.
It is written for humans and agents that generate, review, or maintain process
profiles.

The public goal is simple:

```text
turn a domain process into a versioned, testable control pack
```

The technical output is:

```text
process.manifest.yaml
profile.yaml
hooks.yaml
schemas/
scenarios/
templates/
skill/SKILL.md
README.md
```

For stores, adapters, interfaces, validators, authorization providers, and
other replaceable components, start with [Component Developers](/docs/developers/overview).

## Runtime Invariants

These invariants are not style preferences. A process pack that violates them
should fail validation or review.

```text
FST owns route decisions.
Process packs own business-specific policy.
Hooks compute facts; hooks do not grant authority.
Artifacts satisfy gates only when typed, valid, and admitted for the run.
Approvals enter through trusted approval surfaces, not agent narration.
Materialization happens only after FST preflight allows the exact effect.
Scenarios are required evidence that the profile behaves as intended.
```

## API Versions

Process packs declare the APIs they target:

```yaml
process:
  profile_api: fst.profile.v1
  logic_api: fst.process_logic.v1
```

Hook calls use:

```text
fst.hook.call.v1
fst.hook.result.v1
```

Agent control calls use:

```text
fst.control.v1
```

Do not invent new API behavior inside a process pack. If the docs and runtime
do not define a field or route, the pack must not rely on it.

## Development Flow

Create a process pack in this order:

1. Define the protected outcome.
2. Define actors and authority boundaries.
3. Define closed action names.
4. Define artifact types and required fields.
5. Define gates and routes.
6. Define materialization modes and scope fields.
7. Add optional hooks for facts, validation, or rendering.
8. Add schemas for artifacts and hook calls.
9. Add scenarios for positive and negative behavior.
10. Validate the pack.
11. Run scenarios.
12. Render a review packet.
13. Install and approve for use only after approval.

## Required Pack Layout

```text
process-packs/<process_id>/
  process.manifest.yaml
  profile.yaml
  hooks.yaml
  schemas/
    artifacts/
    hooks/
  logic/
    python/
      main.py
  scenarios/
  templates/
  skill/
    SKILL.md
  README.md
```

`hooks.yaml`, `logic/`, and hook schemas are optional only for packs that do not
use hook-backed behavior.

## Naming Rules

Use stable, lowercase identifiers:

```text
process id:      local_patch_review
version:         0.1.0
action id:       patch.review_packet.create
artifact type:   review_packet_artifact
gate id:         review_packet_requires_rule_evaluation
scenario id:     generated_file_blocked
```

Use dot-separated action names and underscore-separated ids for process,
artifact, gate, and scenario identifiers.

## Actor Model

The public `fst.control` actor may be:

```text
agent
task_user
system
```

It must not be:

```text
approver
```

Approver authority is recorded through trusted approval surfaces. An agent can
request approval or summarize a pending approval. It cannot create the approval
record that grants authority.

## Route Vocabulary

Profiles must use only these routes:

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

Unknown routes are invalid.

## Runtime Boundary

The process pack is not the FST authority layer. It may define actions,
artifacts, gates, hooks, scenarios, templates, and skills. It may not modify
route semantics, store behavior, environment permissions, approval authority,
or materialization preflight.

## Reference Pages

- [Process Pack Manifest](./process-pack.md)
- [Profile Model](./profile.md)
- [Actions And Artifacts](./actions-and-artifacts.md)
- [Gates And Routes](./gates-and-routes.md)
- [Hook API](./hooks.md)
- [Scenario API](./scenarios.md)
- [Lifecycle And Validation](./lifecycle.md)
