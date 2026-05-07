---
sidebar_position: 1
---

# Overview

This section gets FST installed, connected to your coding agent, and running on
one project.

It is a how-to section. If you want the background first, read
[FST Use Cases](../understanding/use-cases.md).

## What You Need

- the `fst` CLI on your `PATH`
- a repository where you want your agent to work
- an agent integration, such as the Codex skill
- permission to run normal project commands such as tests or builds

## Where FST Runs

The current Free and Pro product path is local-first:

- the `fst` CLI runs on the same machine as your coding agent
- FST uses a local database on that machine
- `fst init` prepares the selected repository for controlled work
- the agent talks to FST through the installed integration

The future Team plan will add a shared deployable runtime for teams that need a
central FST service.

## What You Will Do

1. Install the CLI.
2. Initialize FST in the repository you want to work on.
3. Install or configure the agent integration.
4. Run `fst doctor`.
5. Start one controlled task from your agent.
6. Answer any concrete setup, scope, or decision prompts the agent presents.
7. Review the result the agent reports.

## Start Here

Continue with the [Quickstart](quickstart.md).
