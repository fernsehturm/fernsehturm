---
sidebar_position: 3
---

# Local Runtime

FST can run locally with a workspace-owned host runtime.

```text
fst binary
.fst/config.yaml
installed process registry
generated process commands
local FST MCP interface
store component
scenario runner
replayable evidence
```

The local runtime is a way to run controlled processes without setting up team
infrastructure. It still uses the same public model: interfaces submit commands,
components communicate through contracts, and FST controls what counts inside a
run.

## Stores

The store is a contract-based component. It persists and returns official FST
records. It does not decide which records are official.

Use `local_file` when transparency matters:

```bash
fst setup --store local_file
```

Use `sqlite` for the product-shaped local path:

```bash
fst setup --store sqlite
```

Changing the store should not change route decisions. It should only change
where official records are persisted.

## Config

`.fst/config.yaml` selects public runtime settings such as:

- interface versions
- profile and process pack settings
- store provider
- store paths
- trace and evidence paths
- adapter options
- local approval path

Configuration should wire components. It should not make an installed or
healthy component trusted by default.

## Interfaces

The local runtime commonly exposes:

- CLI commands for humans, scripts, and smoke tests
- an FST MCP interface for agent clients
- generated process commands for installed process packs

All interfaces should preserve the same FST command semantics. A CLI action and
an MCP action that express the same intent should reach FST as the same kind of
controlled request.

## Doctor

Run:

```bash
fst doctor
```

Doctor should report workspace health, selected store provider, store
path/schema, installed process registry health, generated command health,
interface readiness, and component availability.
