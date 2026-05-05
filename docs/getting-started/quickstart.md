---
sidebar_position: 2
---

# Quickstart

This quickstart covers the local developer path:

```text
Install -> initialize FST -> install the agent skill -> run one controlled task
```

The current product path is local-first. Free and Pro both run against a local
database on the agent machine. The future Team plan will add a shared deployable
runtime.

## 1. Install The CLI

Install `fst` from the release bundle or installer script for your platform.
The installer should leave the `fst` binary on your `PATH`.

Verify it:

```bash
fst version
```

If you are working from a local checkout, build or use the local bundle first,
then make sure the resulting `fst` binary is on your `PATH`.

## 2. Initialize FST In A Project

From the repository you want your agent to work on:

```bash
fst init
```

This creates the local FST configuration and state needed for controlled work.

## 3. Install The Agent Skill

For Codex:

```bash
fst install-skill
```

If you use a custom Codex home:

```bash
fst install-skill --codex-home /path/to/codex-home
```

The skill is the user-facing entry point. It teaches the agent to route work
through FST instead of inventing its own process.

## 4. Check The Setup

Run:

```bash
fst doctor
```

For a deeper check:

```bash
fst doctor --deep
```

## 5. Start A Controlled Task

In your agent, ask for a normal development task through FST:

```text
/fst Add session expiry after 30 minutes of inactivity.
Keep the current server-side session model.
Do not add persistent login.
```

FST should propose the starting context and retained scope before the agent
builds. The agent works inside that box and records what it changed.

## 6. Optional: Add `agents.md`

If your agent supports repository instructions, add an `agents.md` file that
points the agent at the FST workflow. See [Agent Setup](agents.md).

## Next

Run the [Scope-Drift Demo](../fst-in-action/scope-drift.md) to see the first
useful FST moment.
