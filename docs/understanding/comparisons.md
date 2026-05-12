---
sidebar_position: 3
---

# Comparisons

FST does not replace prompts, guardrails, MCP, sandboxes, CI, PR review, or
orchestrators. It adds a process-control layer around agent work.

```text
Prompts describe behavior.
MCP exposes tools.
Sandboxes constrain execution.
CI runs checks.
PR review inspects output.
FST decides whether a process gate allows the next action.
```

## FST Vs Prompts

A prompt can say:

```text
Do not touch generated files.
Do not introduce secrets.
Create a review packet before marking ready.
```

FST turns those instructions into profile gates, required artifacts, route
decisions, scenarios, and replayable evidence.

## FST Vs Guardrails

Guardrails usually sit around model input, output, or tool calls. They are
useful, but they often lack durable process state.

FST checks the run against a process profile:

- which action is being requested
- which artifacts are valid
- which approvals exist
- which route is allowed
- which evidence is recorded

## FST Vs MCP

MCP lets agents discover and call tools. FST can expose an MCP tool, but the
tool is not an untyped command tunnel.

The agent calls:

```text
fst.control
```

FST evaluates the active profile before allowing, blocking, asking, or
materializing.

## FST Vs Sandboxes

A sandbox can limit filesystem or network access. It does not prove the action
is part of the approved process.

FST answers a different question:

```text
Given this profile, run state, artifacts, and approvals, may this action happen?
```

## FST Vs CI And PR Review

CI proves configured checks ran. PR review inspects a diff.

FST records why the work was allowed to reach that point:

- source request
- active profile version
- gate decisions
- required artifacts
- approval records
- scenario results
- materialization preflight

CI and review become stronger when they receive this evidence.

## FST Vs Orchestrators

Orchestrators schedule work across agents and tools. They do not necessarily
own process authority.

FST can sit under an orchestrator as the route authority for controlled actions.
The orchestrator asks for work; FST decides whether that work can cross the
process boundary.
