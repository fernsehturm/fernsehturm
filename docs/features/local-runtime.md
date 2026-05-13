---
sidebar_position: 3
---

# Local Runtime

FST runs locally.

```text
fst binary
.fst/config.yaml
local_file or sqlite store
installed process registry
generated process commands
local MCP controller
scenario runner
replay evidence
```

## Stores

Use `local_file` when transparency matters:

```bash
fst setup --store local_file
```

Use `sqlite` for the product-shaped local path:

```bash
fst setup --store sqlite
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
installed process registry health, generated command health, and runtime
adapter availability.
