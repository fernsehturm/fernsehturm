---
sidebar_position: 4
---

# Actions And Artifacts

Actions are the closed operations an agent may request. Artifacts are the typed
records that prove required work happened.

The process profile should make both explicit.

## Action Schema

```yaml
actions:
  - id: string
    description: string
    allowed_roles:
      - agent
    required_capabilities:
      - string
    required_connectors:
      - string
    produces_artifacts:
      - artifact_type_id
    materialization_mode: mock
    materialization_scope_fields:
      - payload_field
    next_actions:
      - action_id
    completes_run: false
```

## Action Fields

| Field | Required | Meaning |
| --- | ---: | --- |
| `id` | yes | Closed action name submitted through `fst.control`. |
| `description` | recommended | Human-readable purpose. |
| `allowed_roles` | yes | Actors that may request the action. |
| `required_capabilities` | no | Environment capabilities needed. |
| `required_connectors` | no | Connectors/materializers needed. |
| `produces_artifacts` | no | Artifact types this action can create. |
| `materialization_mode` | no | `mock`, `shadow`, or later approved real modes. |
| `materialization_scope_fields` | materializing actions | Payload fields that scope the effect. |
| `next_actions` | recommended | Guidance for process progression. |
| `completes_run` | no | Whether the action completes the run. |

## Action Naming

Use domain prefixes:

```text
patch.preflight.request
repo.diff.inspect
patch.rules.evaluate
patch.review_packet.create
patch.ready_for_review
```

Action names should be stable. Changing an action's meaning should create a
new action id or profile version.

## Artifact Type Schema

```yaml
artifact_types:
  - id: rule_evaluation_artifact
    required_fields:
      - decision
    allowed_sources:
      - agent
      - controller
```

## Artifact Record Shape

Runtime artifacts should have this minimum shape:

```json
{
  "artifact_id": "art_001",
  "type": "rule_evaluation_artifact",
  "run_id": "run_001",
  "profile_version": "0.1.0",
  "created_by": "agent-1",
  "created_via": "fst.control",
  "created_at": "2026-05-11T10:30:00Z",
  "payload": {
    "decision": "pass"
  },
  "valid": true
}
```

FST should accept an artifact for conformance only when:

- `type` matches the requirement
- required fields exist in `payload`
- run id matches
- profile version matches
- creator/source is allowed
- schema validation passes
- artifact is not expired, superseded, or contradictory

## Approval Artifacts

Approval artifacts are special because they grant authority:

```json
{
  "artifact_id": "approval_001",
  "type": "approval_record",
  "run_id": "run_001",
  "profile_version": "0.1.0",
  "created_by": "local_operator",
  "created_via": "fst_cli",
  "decision": "approved",
  "scope": {
    "action": "profile_builder.approve_use.request",
    "process_id": "vendor_onboarding",
    "process_version": "0.1.0"
  },
  "valid": true
}
```

Agent-created approval records must not satisfy approval gates.

## Materialization Scope

Any action that writes or affects something outside FST should declare
`materialization_scope_fields`:

```yaml
materialization_scope_fields:
  - review_packet_path
  - process_id
  - process_version
  - pack_hash
```

Materialization preflight should verify that the approved route and payload
scope match the planned effect.

## Design Checklist

For each action, answer:

- Who may request it?
- What artifacts can it create?
- What artifacts must already exist before it runs?
- Does it affect the outside world?
- If yes, what exact payload fields scope the effect?
- What action should normally come next?
- What evidence should replay show afterward?
