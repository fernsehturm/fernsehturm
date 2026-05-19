---
sidebar_position: 3
---

# Simple Custom Process

This workflow is for an agent that needs to create the smallest useful custom
FST process pack.

Use it when the user says something like:

```text
Create a custom FST process that controls a simple review workflow.
```

The goal is not to build a production integration. The goal is to create a
runnable process pack with:

- a protected outcome
- a closed action set
- typed artifacts
- one missing-fact gate
- one blocked condition
- one mock materialization boundary
- scenarios that prove the expected routes
- a generated Codex skill
- evidence and replay after execution

## Agent Operating Rules

If you are an agent following this page:

1. Keep the first process small.
2. Create a directory process pack.
3. Keep `process.manifest.yaml`, `profile.yaml`, and `core-profile.json`
   consistent.
4. Do not invent new FST routes or file formats.
5. Do not give hooks route, approval, materialization, or store-write authority.
6. Validate the profile before claiming it works.
7. Run at least one happy path and one negative route scenario.
8. Install the skill only after the pack installs and validates.
9. Report the exact evidence and replay commands to the user.

For the first process, avoid real external effects. Use `MaterializeMock`.

## Minimum Pack

Create this directory shape:

```text
simple_review/
  process.manifest.yaml
  profile.yaml
  core-profile.json
  scenarios/
    happy_path.scenario.json
    missing_target_asks_user.scenario.json
    high_risk_blocked.scenario.json
  skill/
    SKILL.md
```

The process will control a tiny review workflow:

```text
simple.request.record
-> simple.context.collect
-> simple.policy.check
-> simple.packet.render
-> simple.completion.record
```

Routes proved by the scenarios:

```text
happy path:
  Continue -> Continue -> Continue -> MaterializeMock -> Complete

missing target:
  Continue -> AskUser

high risk:
  Continue -> Continue -> Continue -> Blocked
```

## Create The Files

Set local paths:

```sh
export FST_BIN="${FST_BIN:-fst}"
export PACK=/tmp/fst-simple-review-pack/simple_review
export WORKSPACE=/tmp/fst-simple-review-workspace

mkdir -p "$PACK/scenarios" "$PACK/skill"
```

Create `process.manifest.yaml`:

```yaml
process:
  id: simple_review
  version: 0.1.0
  display_name: Simple Review
  description: Minimal process pack for proving custom process creation.
  command:
    name: fst-simple-review
  profile_api: fst.profile.v1
  logic_api: fst.process_logic.v1
  profile_path: profile.yaml
  core_profile_path: core-profile.json
  skill_path: skill/SKILL.md

package:
  kind: directory
  mvp_status: example

requires:
  capabilities:
    - write_evidence

forbidden:
  hook_outputs:
    - route
    - approval_record
    - materialization_allowed
    - store_writes
```

Create `profile.yaml`:

```yaml
profile:
  id: simple_review
  version: 0.1.0
  purpose: Prepare a small review packet after required context and policy evidence exist.

roles:
  - id: agent
  - id: task_user
  - id: approver
  - id: system

routes:
  - name: Continue
  - name: InstructAgent
  - name: AskUser
  - name: Blocked
  - name: MaterializeMock
  - name: Complete

artifacts:
  - type: source_request
  - type: target_record
  - type: policy_check
  - type: materialization_plan
  - type: materialization_result

actions:
  - name: simple.request.record
    creates_artifacts:
      - source_request

  - name: simple.context.collect
    creates_artifacts:
      - target_record

  - name: simple.policy.check
    creates_artifacts:
      - policy_check

  - name: simple.packet.render
    creates_artifacts:
      - materialization_plan
    required_capabilities:
      - write_evidence
    materialization_mode: mock
    materialization_route: MaterializeMock
    materialization_scope_fields:
      - target
      - packet_path

  - name: simple.completion.record
    creates_artifacts:
      - materialization_result
    required_capabilities:
      - write_evidence

gates:
  - id: target_required
    type: decision
    before_action: simple.policy.check
    condition:
      field: target
      op: missing
    route: AskUser
    message: Ask which target the review packet applies to.
    next_allowed_actions:
      - simple.context.collect

  - id: high_risk_blocked
    type: decision
    before_action: simple.packet.render
    condition:
      field: risk
      op: equals
      value: high
    route: Blocked
    message: High-risk requests are blocked in this minimum process.

  - id: packet_requires_artifacts
    type: process_conformance
    before_action: simple.packet.render
    condition:
      field: ""
      op: always
    route: InstructAgent
    message: Packet rendering requires request, target, and policy evidence.
    requires_artifacts:
      - source_request
      - target_record
      - policy_check
    next_allowed_actions:
      - simple.request.record
      - simple.context.collect
      - simple.policy.check

  - id: completion_requires_plan
    type: process_conformance
    before_action: simple.completion.record
    condition:
      field: ""
      op: always
    route: Blocked
    message: Completion requires an allowed materialization plan.
    requires_artifacts:
      - materialization_plan
    next_allowed_actions:
      - simple.packet.render

scenarios:
  - scenarios/happy_path.scenario.json
  - scenarios/missing_target_asks_user.scenario.json
  - scenarios/high_risk_blocked.scenario.json

completion_report:
  required:
    - materialization_result
```

Create `core-profile.json`:

```json
{
  "id": "simple_review",
  "version": "0.1.0",
  "purpose": "Prepare a small review packet after required context and policy evidence exist.",
  "initial_stage": "intake",
  "roles": ["agent", "task_user", "approver", "system"],
  "artifact_types": [
    {
      "id": "source_request",
      "required_fields": ["request"]
    },
    {
      "id": "target_record",
      "required_fields": ["target"]
    },
    {
      "id": "policy_check",
      "required_fields": ["target", "risk"]
    },
    {
      "id": "materialization_plan",
      "allowed_sources": ["controller"]
    },
    {
      "id": "materialization_result"
    }
  ],
  "actions": [
    {
      "id": "simple.request.record",
      "description": "Record the raw review request.",
      "allowed_roles": ["agent"],
      "produces_artifacts": ["source_request"],
      "next_actions": ["simple.context.collect"]
    },
    {
      "id": "simple.context.collect",
      "description": "Record the target for the review.",
      "allowed_roles": ["agent"],
      "produces_artifacts": ["target_record"],
      "next_actions": ["simple.policy.check"]
    },
    {
      "id": "simple.policy.check",
      "description": "Record the minimum policy classification.",
      "allowed_roles": ["agent"],
      "produces_artifacts": ["policy_check"],
      "next_actions": ["simple.packet.render"]
    },
    {
      "id": "simple.packet.render",
      "description": "Render a mock review packet after required evidence exists.",
      "allowed_roles": ["agent", "system"],
      "produces_artifacts": ["materialization_plan"],
      "required_capabilities": ["write_evidence"],
      "materialization_mode": "mock",
      "materialization_scope_fields": ["target", "packet_path"],
      "next_actions": ["simple.completion.record"]
    },
    {
      "id": "simple.completion.record",
      "description": "Record that the mock packet was produced.",
      "allowed_roles": ["agent", "system"],
      "produces_artifacts": ["materialization_result"],
      "required_capabilities": ["write_evidence"],
      "completes_run": true
    }
  ],
  "gates": [
    {
      "id": "target_required",
      "type": "decision",
      "before_action": "simple.policy.check",
      "condition": {
        "payload_missing": "target"
      },
      "route": "AskUser",
      "reason": "Target is missing.",
      "instruction": "Ask which target the review packet applies to.",
      "next_allowed_actions": ["simple.context.collect"]
    },
    {
      "id": "high_risk_blocked",
      "type": "decision",
      "before_action": "simple.packet.render",
      "condition": {
        "payload_equals": {
          "risk": "high"
        }
      },
      "route": "Blocked",
      "reason": "High-risk requests are blocked in this minimum process.",
      "instruction": "Do not render the packet; ask for a lower-risk scoped process."
    },
    {
      "id": "packet_requires_artifacts",
      "type": "process_conformance",
      "before_action": "simple.packet.render",
      "condition": {
        "always": true
      },
      "route": "InstructAgent",
      "reason": "Packet rendering requires request, target, and policy evidence.",
      "required_artifacts": ["source_request", "target_record", "policy_check"],
      "next_allowed_actions": [
        "simple.request.record",
        "simple.context.collect",
        "simple.policy.check"
      ]
    },
    {
      "id": "completion_requires_plan",
      "type": "process_conformance",
      "before_action": "simple.completion.record",
      "condition": {
        "always": true
      },
      "route": "Blocked",
      "reason": "Completion requires an allowed materialization plan.",
      "instruction": "Run the packet render action and record its controller response.",
      "required_artifacts": ["materialization_plan"],
      "next_allowed_actions": ["simple.packet.render"]
    }
  ]
}
```

Create `scenarios/happy_path.scenario.json`:

```json
{
  "id": "happy_path",
  "profile_id": "simple_review",
  "profile_version": "0.1.0",
  "steps": [
    {
      "name": "record request",
      "action": "simple.request.record",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"request": "Prepare a demo review packet."},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "collect context",
      "action": "simple.context.collect",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"target": "demo-system"},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "check policy",
      "action": "simple.policy.check",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"target": "demo-system", "risk": "low"},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "render packet",
      "action": "simple.packet.render",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {
        "target": "demo-system",
        "risk": "low",
        "packet_path": "reports/simple-review/demo.md"
      },
      "expectation": {"status": "ok", "route": "MaterializeMock"}
    },
    {
      "name": "record completion",
      "action": "simple.completion.record",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {
        "result": {
          "status": "mock_packet_rendered",
          "packet_path": "reports/simple-review/demo.md"
        }
      },
      "expectation": {
        "status": "ok",
        "route": "Complete",
        "completion_report_exists": true
      }
    }
  ]
}
```

Create `scenarios/missing_target_asks_user.scenario.json`:

```json
{
  "id": "missing_target_asks_user",
  "profile_id": "simple_review",
  "profile_version": "0.1.0",
  "steps": [
    {
      "name": "record request",
      "action": "simple.request.record",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"request": "Prepare a review packet."},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "policy check without target",
      "action": "simple.policy.check",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"risk": "low"},
      "expectation": {"status": "ok", "route": "AskUser"}
    }
  ]
}
```

Create `scenarios/high_risk_blocked.scenario.json`:

```json
{
  "id": "high_risk_blocked",
  "profile_id": "simple_review",
  "profile_version": "0.1.0",
  "steps": [
    {
      "name": "record request",
      "action": "simple.request.record",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"request": "Prepare a risky review packet."},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "collect context",
      "action": "simple.context.collect",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"target": "production-admin"},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "check policy",
      "action": "simple.policy.check",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {"target": "production-admin", "risk": "high"},
      "expectation": {"status": "ok", "route": "Continue"}
    },
    {
      "name": "blocked packet render",
      "action": "simple.packet.render",
      "actor": {"id": "agent-1", "role": "agent"},
      "payload": {
        "target": "production-admin",
        "risk": "high",
        "packet_path": "reports/simple-review/high.md"
      },
      "expectation": {"status": "ok", "route": "Blocked"}
    }
  ]
}
```

Create `skill/SKILL.md`:

````md
---
name: simple-review
description: Run the simple_review FST process.
---

# Simple Review

Use this skill when the user asks to run the `simple_review` process.

Call `fst.control` only. Ask FST for the process contract first, then follow the
returned routes exactly.

Process:

```text
simple_review@0.1.0
```

Order:

```text
simple.request.record
simple.context.collect
simple.policy.check
simple.packet.render
simple.completion.record
```

Stop on `AskUser`, `Blocked`, and `Complete`. After `MaterializeMock`, record
the mock result with `simple.completion.record`.
````

## Initialize Or Install

For a new workspace, initialize directly from the custom profile pack:

```sh
"$FST_BIN" init --profile-pack "$PACK" \
  --workspace "$WORKSPACE" \
  --force
```

For an existing initialized workspace, install the process pack:

```sh
"$FST_BIN" process install "$PACK" \
  --workspace "$WORKSPACE" \
  --command fst-simple-review \
  --force
```

`process install` expects an existing FST workspace. If the workspace does not
have `fst.profile.yaml`, initialize it first.

## Validate

Inspect the installed process:

```sh
"$FST_BIN" process inspect simple_review@0.1.0 \
  --workspace "$WORKSPACE"
```

Validate the runtime profile:

```sh
"$FST_BIN" profile validate simple_review@0.1.0 \
  --workspace "$WORKSPACE"
```

Expected output:

```text
ok profile valid
```

## Run Scenarios

Run the happy path:

```sh
"$FST_BIN" scenario run simple_review.happy_path \
  --workspace "$WORKSPACE"
```

Expected final route:

```text
final_route: Complete
```

Run the missing-fact scenario:

```sh
"$FST_BIN" scenario run simple_review.missing_target_asks_user \
  --workspace "$WORKSPACE"
```

Expected final route:

```text
final_route: AskUser
```

Run the blocked scenario:

```sh
"$FST_BIN" scenario run simple_review.high_risk_blocked \
  --workspace "$WORKSPACE"
```

Expected final route:

```text
final_route: Blocked
```

The scenario runner may print `status: failed` for negative scenarios that stop
at `AskUser` or `Blocked`. For these scenarios, inspect `final_route` and the
event route. The expected route is the proof.

## Expose The Process To Codex

Install the generated skill into Codex:

```sh
"$FST_BIN" install-skill \
  --workspace "$WORKSPACE" \
  --codex-home /home/calliopa/.codex \
  --fst-bin "$FST_BIN" \
  --all-processes
```

Check the MCP endpoint:

```sh
"$FST_BIN" mcp start \
  --workspace "$WORKSPACE" \
  --preflight
```

Restart the Codex CLI so it loads the updated skill and MCP config.

Then ask Codex:

```text
$fst-simple-review Prepare a review packet for demo-system. Risk is low.
```

The agent should ask FST for the process contract first, then call only the
actions allowed by the route sequence.

## Inspect Evidence

After a run, inspect evidence:

```sh
"$FST_BIN" evidence show \
  --workspace "$WORKSPACE" \
  --latest
```

Inspect replay:

```sh
"$FST_BIN" replay show \
  --workspace "$WORKSPACE" \
  --latest
```

The evidence should show the requested action, route, artifacts, and final
route. Do not claim the process works unless replay matches the expected route
sequence.

## Adapting This Example

To turn this into a real custom process:

1. Replace `simple_review` with a stable process id.
2. Replace `simple.*` action names with domain-specific action names.
3. Replace artifact types with the records the process really needs.
4. Add missing-fact gates for required user facts.
5. Add blocked gates for requests that should never proceed.
6. Add approval gates for authority increases.
7. Keep real external effects out until mock materialization is proven.
8. Add scenarios for every route you claim the process supports.

If you add hooks, read the hook API first. Hooks may compute or validate facts.
They must not approve, route, materialize, publish, or write directly to the
FST store.

## Done Criteria

A simple custom process is ready for local agent use when:

- the pack installs from a clean workspace
- `profile validate` returns `ok profile valid`
- the happy path reaches `Complete`
- a missing-fact scenario reaches `AskUser`
- a forbidden request reaches `Blocked`
- `install-skill` updates Codex
- MCP preflight passes
- evidence and replay show the route sequence you expect

Only after those checks should the user point an agent at the process command.
