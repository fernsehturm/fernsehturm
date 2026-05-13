---
sidebar_position: 1
---

# Overview

This section gets FST installed, configured, and connected to an agent.

FST ships as a Linux package with a single `fst` binary and bundled process
packs. The public installer downloads the latest GitHub release and installs the
runtime assets. `fst setup` then creates the local workspace, selects the store,
installs or removes bundled processes, generates process commands, configures
the trusted approval console, runs validation, and prepares the local agent
integration.

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
- Python or Node only when an installed process uses that hook runtime

## What You Will Do

1. Install the latest `fst` release with the one-command installer.
2. Run `fst setup`.
3. Select the installed processes for this workspace.
4. Configure the local approval console.
5. Validate the workspace and run process smoke scenarios.
6. Start the local MCP controller.
7. Point your agent at `fst.control`.

## Local Workspace Shape

An initialized workspace contains:

```text
workspace/
  .fst/
    config.yaml
    environment.yaml
    processes/
      registry.json
    commands/
    core-store/
    state/
    trace/
```

The process registry records installed process id, version, profile hash,
installed path, generated command, and generated skill path. There is no
workspace-level active profile. Each run is bound to the process selected by the
generated command or explicit process reference.

## Next

Continue with the [Quickstart](quickstart.md).
