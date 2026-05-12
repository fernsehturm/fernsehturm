---
sidebar_position: 1
---

# Overview

This section gets the local FST MVP installed and running.

The MVP is a Linux package with a single `fst` binary. The public installer
downloads the latest GitHub release, installs the command locally, and installs
the bundled process packs. FST initializes a local workspace, selects a store,
runs scenarios, records evidence, and exposes `fst.control` to agents through a
local MCP server.

## Install Command

```bash
curl -fsSL https://www.fernsehturm.dev/install.sh | bash
fst version
```

The installer uses the latest `fernsehturm/fernsehturm` GitHub release and
installs without `sudo` by default.

## What You Need

- Linux
- `curl` or `wget` for the one-command installer
- a workspace directory where FST may write `.fst/`
- an agent that can connect to the local FST MCP controller
- Python or Node only if the active process pack uses that hook runtime

## What You Will Do

1. Install the latest `fst` release with the one-command installer.
2. Initialize a workspace with `local_file` or `sqlite` storage.
3. Validate the workspace with `fst doctor`.
4. Install and activate a process pack.
5. Run the process pack scenarios.
6. Start the local MCP controller.
7. Point your agent at `fst.control`.

## Local Workspace Shape

An initialized workspace contains:

```text
workspace/
  .fst/
    config.yaml
    environment.yaml
    active-profile.yaml
    profiles/
    core-store/
    state/
    trace/
```

The config file selects the store, runtime protocol versions, profile API, and
active runtime behavior.

## Next

Continue with the [Quickstart](quickstart.md).
