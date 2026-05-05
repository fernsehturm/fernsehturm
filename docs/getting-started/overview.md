---
sidebar_position: 1
---

# Overview

FST is a control system for AI-assisted software development.

It does not replace your coding agent. It gives the agent a controlled path to
work inside:

```text
Work-Context Selection -> Exploration -> Build -> Compose
```

You give the direction. The agent does the work. FST records the box, checks the
exits, and blocks work that is not traceable, bounded, or coherent.

The practical promise:

```text
Let the agent move fast inside the box.
Stop or record it when it tries to move the box.
```

## What You Do

| Responsibility | When | What a good answer looks like |
|---|---|---|
| State the goal | At the start | "Add 30-minute session expiry without JWT refresh tokens." |
| Choose context | When multiple starting worlds make sense | "Use the current email-only reset Composition, not the SMS experiment." |
| Resolve decisions | When behavior, policy, or tradeoffs are ambiguous | "Reset on authenticated API activity, not on background refresh checks." |
| Authorize risk | When scope, policy, coverage, or materialization needs approval | "Allow this migration as patch output only." |
| Review the result | At the end | "Show the Composition, checks, decisions, and remaining blockers." |

## What FST Does

- records where Exploration may look
- records what Build may touch
- records what the agent created as a Candidate
- checks exact pinned revisions in a Composition
- records evidence instead of relying on agent narration

## What FST Does Not Ask You To Do

You should not need to:

- maintain a requirements spreadsheet
- manually list every file the agent may touch
- review every generated line just to find scope drift
- remember what you approved earlier
- trust an agent summary as proof of agreement

## What Counts As Evidence

For gate-relevant input, agent narration is not enough. FST binds your answer to the specific question:

```text
Question:
Should API activity reset the session timer?

Answer:
Yes, for authenticated API requests only.

Evidence binding:
This answer satisfies DecisionRequirement DR-session-activity-reset.
```

That binding prevents later drift. The agent cannot replace it with "the user approved the timeout plan."

## Start Here

Continue with the [Quickstart](quickstart.md), then run the
[Scope-Drift Demo](../fst-in-action/scope-drift.md).

For the full model reference, see [The FST Model](../concepts/01_the-model.md).
