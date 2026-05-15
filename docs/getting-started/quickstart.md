---
sidebar_position: 1
---

# Quickstart

In this quickstart, you ask an agent to prepare a purchase request and watch FST
control what counts.

You will not run a scenario script. You will:

```text
install FST
-> start the FST agent interface
-> ask your agent for a purchase
-> see the agent work through FST
-> inspect the evidence FST recorded
```

The point should be obvious after the first run: this is still easy for the
user, but it is different from plain chat. The agent can prepare the work. FST
decides whether the process is satisfied.

## What You Need

- Linux
- `curl` or `wget`
- an agent that can use a local MCP server
- a shell where you can add `$HOME/.local/bin` to `PATH`

## 1. Install FST

:::note Coming soon
The public installer is not available yet.
:::

```bash
curl -fsSL https://www.fernsehturm.dev/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
fst version
```

## 2. Set Up The Purchase Process

```bash
fst setup \
  --workspace "$HOME/fst-workspace" \
  --store sqlite \
  --install-process purchase_request_preflight@0.1.0 \
  --no-password
```

This creates a local FST workspace and installs the purchase process:

```text
purchase_request_preflight@0.1.0
```

You will use that process through the agent interface. You do not need to run a
separate process command for the first interaction.

## 3. Start FST And Your Agent

In one terminal, start the local FST MCP server:

```bash
fst mcp start --workspace "$HOME/fst-workspace"
```

Keep that terminal running. It is the local control interface your agent will
use.

Then start your agent and connect it to that MCP server. The exact MCP settings
depend on your agent:

- if the agent connects to a server you started yourself, point it at the
  running FST MCP server
- if the agent launches MCP servers from its config, use
  `fst mcp start --workspace "$HOME/fst-workspace"` as the server command

At the start of the chat, give the agent this rule:

```text
Use FST before controlled purchase actions. Follow the route FST returns.
```

## 4. Ask For A Purchase

In your agent chat, ask for something concrete:

```text
Buy me a 4K monitor, around $400, for design work.
Use my purchase process.
```

The agent should not simply say "done." It should use FST to start or continue
the controlled purchase process.

## 5. What You Should See

A healthy interaction looks like this:

```text
You:
  Buy me a 4K monitor, around $400, for design work.
  Use my purchase process.

Agent:
  I can prepare the purchase request.
  I am checking the purchase process with FST.

FST:
  Missing approval for this purchase.
  Next step: create an exact approval packet.

Agent:
  Approval packet ready:
  item: 4K monitor
  purpose: design work
  budget: around $400
  protected effect: purchase must not happen yet

You:
  Review the packet.
```

What matters is the boundary:

```text
The agent prepares.
FST checks.
The user approves through the trusted path.
Only then may a protected effect proceed.
```

If approval is missing, FST should return a waiting or blocked route. The agent
should stop instead of working around it.

## 6. Inspect The Evidence

After the interaction, inspect what FST recorded:

```bash
fst replay show --latest --workspace "$HOME/fst-workspace"
```

Replay should help answer:

- which purchase process version ran
- what the agent asked FST to do
- what route FST returned
- what evidence or approval was missing
- why no real purchase happened without approval

This is the moment where FST should feel different. You are not only trusting a
chat transcript. You have a process record.

## What You Do

You keep the workflow simple:

```text
install FST
start FST for the agent
ask the agent for a purchase
review what FST says is missing or allowed
inspect replay
```

## What The Agent Does

The agent still does useful work:

- understands the purchase request
- drafts the purchase packet
- submits intended controlled actions to FST
- follows the route FST returns
- asks you when FST needs a fact or approval
- stops when FST says the process is blocked or waiting

The agent can prepare work. It cannot make its own approval count.

## What FST Changes

Without FST:

```text
user asks for purchase
agent prepares something
agent says it is ready or done
user has to trust the transcript
```

With FST:

```text
user asks for purchase
agent prepares the request
FST checks the purchase process
FST records evidence
FST waits or blocks when approval is missing
replay explains the decision
```

That is why FST matters: you can give agents real work without giving them
unchecked authority.

## Next

- [Create Your First Custom Process](/docs/getting-started/first-custom-process)
- [How FST Works](/docs/understanding/how-it-works)
- [FST Structure](/docs/understanding/structure)
- [Process Pack API](/docs/api/overview)
