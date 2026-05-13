---
sidebar_position: 3
---

# Agent Setup

Agents interact with FST through one local control surface:

```text
fst.control
```

The MCP controller is started by the `fst` CLI:

```bash
fst mcp start --workspace "$HOME/fst-workspace"
```

## Agent Rule

Before a controlled action, the agent submits intent to FST:

```ts
fst.control({
  protocol_version: "fst.control.v1",
  action: "patch.review_packet.create",
  actor: "agent",
  payload: {
    review_packet_path: "reports/review.md"
  },
  idempotency_key: "stable-key"
})
```

FST returns a route. The agent follows the route.

## Route Behavior

- `Continue`: proceed with the allowed action.
- `AskUser`: ask the task user for the missing fact.
- `InstructAgent`: create or repair the required artifact.
- `AwaitApproval`: stop until the trusted approval path records a decision.
- `Blocked`: stop or repair the request; do not work around the block.
- `MaterializeMock`: write only the allowed mock/draft artifact.
- `MaterializeAllowed`: perform only the approved real effect.
- `Complete`: report evidence and outcome.

## Process Contract Help

Agents should discover current process actions from FST, not from stale docs.
The process is selected by a generated `fst-*` command or by an explicit
process id/version. There is no workspace-level active process.

Use the process contract action:

```text
fst.help.process_contract
```

The contract tells the agent the process id, version, profile hash, actions,
payload fields, routes, gates, required artifacts, and next allowed actions.

## Agent Instructions

When your agent supports repository instructions, keep them short:

```md
# Agent Instructions

Use FST for controlled work.

- Submit intended controlled actions through `fst.control`.
- Treat FST routes as authoritative.
- Ask the task user only for facts.
- Do not claim approval from chat.
- Stop on `AwaitApproval` or `Blocked`.
- Report evidence refs when the run completes.
```

The runtime process contract is authoritative for action names and payload
shapes.
