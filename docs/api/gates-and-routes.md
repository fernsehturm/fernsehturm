---
sidebar_position: 5
---

# Gates And Routes

Gates decide whether a controlled action may proceed. Routes tell the agent and
runtime what happens next.

## Gate Schema

```yaml
gates:
  - id: string
    type: decision
    before_action: action_id
    condition:
      always: true
    route: InstructAgent
    reason: Human-readable reason.
    instruction: Human-readable next step.
    required_artifacts:
      - artifact_type_id
    required_approval:
      role: workspace_admin
      scope: activate_process_profile
    next_allowed_actions:
      - action_id
```

## Gate Types

```text
decision
  Missing facts, branching, classification, or hard rules.

approval
  Trusted human authority required before risky work.

process_conformance
  Required valid artifacts before the action can proceed.
```

## Route Vocabulary

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

Use routes consistently:

| Situation | Route |
| --- | --- |
| Action is allowed and has no materialization boundary | `Continue` |
| Agent must create or repair artifacts | `InstructAgent` |
| Task user must provide a normal fact | `AskUser` |
| Trusted approval is required | `AwaitApproval` |
| Request violates a hard rule | `Blocked` |
| Local draft/mock effect is allowed | `MaterializeMock` |
| Real approved effect is allowed | `MaterializeAllowed` |
| Protected outcome is complete | `Complete` |

## Conditions

The MVP profile condition vocabulary is intentionally small.

### Always

```yaml
condition:
  always: true
```

Use for conformance gates that always require artifacts before an action.

### Payload Missing

```yaml
condition:
  payload_missing: changed_files
```

Use when a missing input should route to `AskUser` or `InstructAgent`.

### Payload Equals

```yaml
condition:
  payload_equals:
    finding: secret_literal
```

Use for hard blocks or deterministic branches.

### Payload Contains Any

```yaml
condition:
  payload_contains_any:
    - route
    - approval_record
    - materialization_allowed
```

Use for authority-bypass checks in generated content or hook outputs.

## Required Artifacts

```yaml
required_artifacts:
  - diff_artifact
  - rule_evaluation_artifact
```

The gate passes only when valid artifacts of those types exist for the current
run and profile version.

## Required Approval

```yaml
required_approval:
  role: workspace_admin
  scope: activate_process_profile
```

Approval gates route to `AwaitApproval` until a trusted approval record exists.

Do not model approval as a normal task-user answer.

## Examples

### Missing Context

```yaml
- id: diff_required
  type: decision
  before_action: repo.diff.inspect
  condition:
    payload_missing: changed_files
  route: AskUser
  reason: Repository diff context is missing.
  instruction: Ask for the changed files or inspect the local diff.
  next_allowed_actions:
    - repo.diff.inspect
```

### Hard Block

```yaml
- id: secret_literal_blocks
  type: decision
  before_action: patch.rules.evaluate
  condition:
    payload_equals:
      finding: secret_literal
  route: Blocked
  reason: Secret literals block the patch.
  instruction: Remove the secret and rerun preflight before continuing.
```

### Conformance

```yaml
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

### Approval

```yaml
- id: activation_requires_workspace_admin_approval
  type: approval
  before_action: profile_builder.activate.request
  condition:
    always: true
  route: AwaitApproval
  reason: Generated process activation requires workspace-admin approval.
  required_approval:
    role: workspace_admin
    scope: activate_process_profile
```

## Validation Checklist

Gate validation should fail when:

- `id` is missing or duplicated
- `type` is unknown
- `before_action` does not reference an action
- `route` is unknown
- `required_artifacts` references unknown artifact types
- `next_allowed_actions` references unknown actions
- approval gates do not declare a `required_approval`
- materialization gates allow effects without scope fields
