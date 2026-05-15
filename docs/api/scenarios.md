---
sidebar_position: 7
---

# Scenario API

Scenarios are executable examples for a process profile. They prove that the
profile, hooks, artifacts, gates, routes, and materialization preflight behave
as intended.

## Scenario File Shape

```json
{
  "id": "missing-diff-asks-user",
  "profile_id": "local_patch_review",
  "profile_version": "0.1.0",
  "steps": [
    {
      "name": "inspect diff without changed files",
      "action": "repo.diff.inspect",
      "actor": {
        "id": "agent-1",
        "role": "agent"
      },
      "payload": {
        "diff_summary": "The changed files were not supplied."
      },
      "expectation": {
        "status": "nok",
        "route": "AskUser",
        "reason": "Repository diff context is missing."
      }
    }
  ]
}
```

## Top-Level Fields

| Field | Type | Required | Meaning |
| --- | --- | ---: | --- |
| `id` | string | yes | Stable scenario id. |
| `profile_id` | string | yes | Profile under test. |
| `profile_version` | string | yes | Profile version under test. |
| `steps` | array | yes | Ordered control requests and expectations. |

## Step Fields

| Field | Type | Required | Meaning |
| --- | --- | ---: | --- |
| `name` | string | yes | Human-readable step name. |
| `action` | string | yes | Action submitted to `fst.control`. |
| `actor` | object | yes | Actor id and role. |
| `payload` | object | yes | Action payload. |
| `idempotency_key` | string | no | Stable key for replay/conflict tests. |
| `expectation` | object | yes | Expected status, route, and optional details. |

## Expectation Fields

```json
{
  "status": "nok",
  "route": "InstructAgent",
  "gate_id": "review_packet_requires_rule_evaluation",
  "gate_type": "process_conformance",
  "reason": "Review packet creation requires valid preflight artifacts.",
  "missing_artifacts": ["rule_evaluation_artifact"],
  "completion_report_exists": false,
  "idempotent_replay": false
}
```

Use exact expectations where possible. At minimum, assert `status` and `route`.

## Required Scenario Classes

Every serious process pack should include:

```text
happy_path
missing_required_input
blocked_hard_rule
ask_user_case
instruct_agent_case
approval_required
hook_failure
materialization_preflight
idempotency_replay
idempotency_conflict, when supported
```

Generated process packs should also include:

```text
missing_docs_blocked
incomplete_process_model_asks_user
unsafe_hook_authority_blocked
missing_scenario_suite_instructs_agent
invalid_profile_schema_blocked
approval_for_use_requires_approval
```

## Happy Path Example

```json
{
  "id": "source-change-with-tests-ready-for-review",
  "profile_id": "local_patch_review",
  "profile_version": "0.1.0",
  "steps": [
    {
      "name": "record preflight request",
      "action": "patch.preflight.request",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"request": "Prepare the source patch for review."},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "create review packet",
      "action": "patch.review_packet.create",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"review_packet_path": "reports/review.md"},
      "expectation": {"status": "ok", "route": "MaterializeMock"}
    },
    {
      "name": "mark ready for review",
      "action": "patch.ready_for_review",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"decision": "ready_for_review"},
      "expectation": {
        "status": "ok",
        "route": "Complete",
        "completion_report_exists": true
      }
    }
  ]
}
```

The full happy path should include every required artifact-producing action.
The shortened example above shows only the shape.

## Idempotency Scenario

```json
{
  "id": "idempotency_replay",
  "profile_id": "local_patch_review",
  "profile_version": "0.1.0",
  "steps": [
    {
      "name": "first request",
      "action": "patch.preflight.request",
      "idempotency_key": "preflight-1",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"request": "Prepare patch."},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "same request replay",
      "action": "patch.preflight.request",
      "idempotency_key": "preflight-1",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"request": "Prepare patch."},
      "expectation": {
        "status": "ok",
        "route": "Continue",
        "idempotent_replay": true
      }
    }
  ]
}
```

## Scenario Runner Requirements

The runner should record:

- profile id, version, and hash
- scenario id
- ordered steps
- routes returned
- gates fired
- artifacts created or missing
- hook calls and failures
- materialization plans/results
- evidence refs

Scenario results become evidence for review and approval for use.
