---
sidebar_position: 4
sidebar_label: "API Reference"
---

# API Reference: `fst.control`

FST exposes one agent-facing control surface:

```text
fst.control
```

The tool receives a typed intended action and returns a profile-based route.

## Request Shape

```ts
fst.control({
  protocol_version: string,
  action: string,
  payload: object,
  run_id?: string,
  idempotency_key?: string,
  actor?: "agent" | "task_user" | "system"
})
```

The public actor must not be `approver`. Approvals are recorded through a
trusted approval path, not ordinary agent chat.

## Response Shape

```ts
type FSTRoute =
  | "Continue"
  | "InstructAgent"
  | "AskUser"
  | "AwaitApproval"
  | "Blocked"
  | "MaterializeMock"
  | "MaterializeAllowed"
  | "Complete"

type FSTControlResponse = {
  status: "ok" | "nok" | "error"
  run_id: string
  profile_version: string
  route?: FSTRoute
  reason?: string
  instruction?: string
  gate_id?: string
  gate_type?: "decision" | "approval" | "process_conformance"
  missing_artifacts?: string[]
  required_approval?: object
  created_artifacts?: string[]
  evidence_refs?: string[]
  next_allowed_actions?: string[]
}
```

Response invariant:

```text
status ok    -> route is required
status nok   -> route is required
status error -> route may be absent
```

Gate failure is normally `nok`, not `error`.

## Process Contract

Agents discover process-specific actions through:

```json
{
  "protocol_version": "fst.control.v1",
  "action": "fst.help.process_contract",
  "payload": {}
}
```

The returned process contract includes:

- profile id
- profile version
- available actions
- payload fields
- routes
- gates
- produced artifacts
- required capabilities
- materialization mode
- next actions

The contract guides the agent. It does not satisfy gates by itself.

## Example

```ts
fst.control({
  protocol_version: "fst.control.v1",
  action: "patch.review_packet.create",
  actor: "agent",
  payload: {
    review_packet_path: "reports/review.md"
  },
  idempotency_key: "review-packet-1"
})
```

Possible response:

```json
{
  "status": "nok",
  "run_id": "run_123",
  "profile_version": "0.1.0",
  "route": "InstructAgent",
  "gate_id": "review_packet_requires_rule_evaluation",
  "gate_type": "process_conformance",
  "reason": "Review packet creation requires valid preflight artifacts.",
  "missing_artifacts": ["rule_evaluation_artifact"],
  "next_allowed_actions": ["patch.rules.evaluate"]
}
```

The agent should create or repair the missing artifact, then resubmit the next
allowed action.
