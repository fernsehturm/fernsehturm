---
sidebar_position: 3
---

# Local Runtime

The MVP runs locally.

```text
fst binary
.fst/config.yaml
local_file or sqlite store
installed process packs
local MCP controller
scenario runner
replay evidence
```

## Stores

Use `local_file` when transparency matters:

```bash
fst init --store local_file
```

Use `sqlite` for the product-shaped local path:

```bash
fst init --store sqlite
fst store migrate
```

Both stores should provide the same Core semantics. Changing the store must not
change route decisions.

## Config

`.fst/config.yaml` selects:

- runtime protocol versions
- profile API
- logic API
- store provider
- store paths
- trace paths
- adapter options

## Doctor

Run:

```bash
fst doctor
```

Doctor should report config health, selected store provider, store path/schema,
active profile, and runtime adapter availability.
