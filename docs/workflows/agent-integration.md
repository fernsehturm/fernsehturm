---
sidebar_position: 3
---

# Agent Integration

FST exposes one agent-facing control surface:

```text
fst.control
```

The tool receives a typed action and payload:

```ts
fst.control({
  protocol_version: string,
  action: string,
  payload: object,
  run_id?: string,
  idempotency_key?: string,
  actor?: "agent" | "user" | "reviewer_agent" | "system"
})
```

## Operating Rule

Agents must not infer live FST action schemas from local docs during a controlled
run.

If the agent needs current action help, it should call FST help actions through
the same control surface:

```text
fst.help.list_actions
fst.help.describe_action
fst.help.describe_schema
fst.help.explain_result
```

## What Makes An Agent FST-Aware

An FST-aware agent:

- starts controlled work through FST
- records user input as UserInteraction evidence
- creates Candidate work inside retained scope
- calls gates before moving stages
- treats `nok` blockers as repair instructions
- uses runtime help for action shapes

For full API details, see [API Reference](../concepts/04_api.md).
