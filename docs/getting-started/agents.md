---
sidebar_position: 3
---

# Agent Setup

Use this page to connect an agent to an already installed `fst` CLI.

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

For other agents, configure the agent so it can call the FST MCP tool.

The public tool name is:

```text
fst.control
```

The agent should use FST's runtime help actions for FST API details. It should
not infer live action payloads from local markdown files.

## Optional `agents.md`

Use a short repository-level instruction file when your agent supports it:

```md
# Agent Instructions

Use FST for controlled development work.

- Start user-requested changes through `/fst` when available.
- Do not claim user approval. Record user decisions through FST.
- If FST API details are unclear, ask FST's runtime help through `fst.control`.
- Do not use local docs as a fallback for live FST API construction.
```

Keep this file short. The runtime FST help surface is authoritative for action
schemas and current payload shapes.
