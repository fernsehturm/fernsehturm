---
sidebar_position: 3
---

# Profile Model

`profile.yaml` is the process contract Core evaluates at runtime.

It defines the closed action set, artifact types, gates, routes, approval
requirements, materialization modes, and completion behavior for one process.

## Minimal Shape

```yaml
profile:
  id: local_patch_review
  version: 0.1.0
  purpose: Control local patch preflight before ready-for-review.
  docs_hash: sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  initial_stage: preflight

roles:
  - agent
  - task_user
  - approver
  - system

routes:
  - Continue
  - InstructAgent
  - AskUser
  - AwaitApproval
  - Blocked
  - MaterializeMock
  - MaterializeAllowed
  - Complete

artifact_types: []
actions: []
gates: []
```

## `profile`

| Field | Type | Required | Meaning |
| --- | --- | ---: | --- |
| `id` | string | yes | Stable profile id. Usually same as process id. |
| `version` | semver string | yes | Profile version. |
| `purpose` | string | yes | What this process controls. |
| `docs_hash` | string | generated packs | Hash of docs used to generate/review the profile. |
| `initial_stage` | string | recommended | First domain stage for new runs. |

Every run must bind to profile id, version, and hash. Profile changes should
produce a new version or revision, not mutate existing run semantics.

## Roles

Allowed role ids:

```text
agent
task_user
approver
system
```

`approver` can appear in profile approval requirements, but public agent calls
must not self-declare `actor: "approver"`.

## Routes

The profile may list the route vocabulary it uses. Route values must come from
the fixed FST route set:

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

## Artifact Types

Artifact types define what valid process evidence can look like:

```yaml
artifact_types:
  - id: diff_artifact
    required_fields:
      - changed_files
      - diff_summary

  - id: review_packet_artifact
    required_fields:
      - review_packet_path
    allowed_sources:
      - controller
```

Required fields are evaluated against artifact payloads. `allowed_sources`
limits which component can create an artifact that satisfies gates.

## Actions

Actions are the only process operations agents may request:

```yaml
actions:
  - id: patch.review_packet.create
    description: Create the local review packet after required evidence exists.
    allowed_roles:
      - agent
    required_capabilities:
      - write_report
      - write_evidence
    required_connectors:
      - local_report
    produces_artifacts:
      - review_packet_artifact
    materialization_mode: mock
    materialization_scope_fields:
      - review_packet_path
    next_actions:
      - patch.ready_for_review
```

Unknown action names must be rejected or blocked.

## Gates

Gates evaluate before actions:

```yaml
gates:
  - id: review_packet_requires_rule_evaluation
    type: process_conformance
    before_action: patch.review_packet.create
    condition:
      always: true
    route: InstructAgent
    reason: Review packet creation requires valid preflight artifacts.
    required_artifacts:
      - diff_artifact
      - rule_evaluation_artifact
    next_allowed_actions:
      - repo.diff.inspect
      - patch.rules.evaluate
```

Gate ids must be unique inside a profile.

## Completion

An action can complete a run:

```yaml
actions:
  - id: patch.ready_for_review
    allowed_roles:
      - agent
      - system
    produces_artifacts:
      - ready_for_review_record
    materialization_mode: mock
    completes_run: true
```

Completion should require conformance gates that prove the protected outcome is
valid.

## Validation Requirements

Profile validation should check:

- `profile.id` and `profile.version` exist
- route names are known
- action ids are unique
- gate ids are unique
- every `gate.before_action` references a known action
- every `next_actions` entry references a known action
- every produced artifact references a known artifact type
- every required artifact references a known artifact type
- required materialization scope fields are present in the action payload
- approval gates cannot be satisfied by agent-created approval records
- hooks referenced by gates or validation exist in `hooks.yaml`
