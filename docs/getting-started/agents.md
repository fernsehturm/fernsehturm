---
sidebar_position: 3
---

# Agent Setup

FST works with agents through a controlled tool surface and a small operating
rule:

```text
The agent does the work.
FST controls stage exits, evidence, scope, and coherence.
```

## Codex

Install the FST skill:

```bash
fst install-skill
```

Then invoke FST from a normal task:

```text
/fst Add session expiry after 30 minutes of inactivity.
```

## Other Agents

For other agents, the integration requirement is the same:

- the agent must be able to call the FST MCP tool
- the public control tool is `fst.control`
- the agent must use FST help actions for API details instead of reading local
  target docs during a controlled run
- the agent must not treat its own summary as gate evidence

## Optional `agents.md`

Use a short repository-level instruction file when your agent supports it:

```md
# Agent Instructions

Use FST for controlled development work.

- Start user-requested changes through `/fst` when available.
- Treat Work-Context Selection, Exploration, Build, and Compose as the control
  loop.
- Work freely inside a stage, but call FST before crossing a gate.
- Do not claim user approval. Record gate-relevant user input through FST.
- If an action shape is unclear, ask `fst.help.*` through `fst.control`.
```

Keep this file short. The runtime FST help surface is authoritative for action
schemas and current payload shapes.
