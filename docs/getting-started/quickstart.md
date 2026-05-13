---
sidebar_position: 2
---

# Quickstart

The streamlined path is:

```text
install fst -> run fst setup -> run a process -> inspect evidence -> start MCP
```

## 1. Install FST

Install the Linux package with one command:

```bash
curl -fsSL https://www.fernsehturm.dev/install.sh | bash
fst version
```

If your current shell does not see `$HOME/.local/bin`, run:

```bash
export PATH="$HOME/.local/bin:$PATH"
fst version
```

To inspect the installer before running it:

```bash
curl -fsSLO https://www.fernsehturm.dev/install.sh
less install.sh
bash install.sh
```

Raw GitHub fallback:

```bash
curl -fsSL https://raw.githubusercontent.com/fernsehturm/fernsehturm/main/static/install.sh | bash
```

The installer downloads the release asset from GitHub, verifies
`checksums.txt` when `sha256sum` is available, installs `fst` to
`$HOME/.local/bin`, and installs bundled assets to
`${XDG_DATA_HOME:-$HOME/.local/share}/fst`.

Bundled assets include:

```text
fst
INSTALL.md
licenses/
schemas/
core-profiles/catalog.json
process-packs/
examples/
```

Bundled processes may use hook runtimes such as Node. `fst setup` and
`fst doctor` report missing runtimes before process scenarios are used as
readiness evidence.

## 2. Configure The Workspace

Run setup:

```bash
fst setup
```

The setup dialogue creates the workspace, selects the store, manages installed
processes, generates one `fst-*` command per installed process, configures the
trusted approval console, optionally installs agent skills, and validates the
workspace.

The default workspace is local and conservative. Use flags for scripted setup:

```bash
fst setup \
  --workspace "$HOME/fst-workspace" \
  --store sqlite \
  --install-process local_patch_review@0.1.0 \
  --install-process purchase_request_preflight@0.1.0
```

During setup, installed processes are shown as a selectable list:

```text
Installed processes:
  [x] local_patch_review@0.1.0 command=fst-patch-review status=installed
  [x] purchase_request_preflight@0.1.0 command=fst-purchase status=installed

Action for local_patch_review@0.1.0 [keep/deinstall/regenerate]:
```

There is no active-profile switch. Each installed process has its own generated
command and each run is bound to the process id, version, and profile hash used
for that command.

## 3. Run A Process Scenario

Run the local patch review happy path:

```bash
fst scenario run local_patch_review.happy_path \
  --workspace "$HOME/fst-workspace"
```

Run blocked examples:

```bash
fst scenario run local_patch_review.generated_file_blocked \
  --workspace "$HOME/fst-workspace"

fst scenario run local_patch_review.secret_literal_blocked \
  --workspace "$HOME/fst-workspace"
```

Run the purchase request preflight example:

```bash
fst scenario run purchase_request_preflight.happy_path_no_approval \
  --workspace "$HOME/fst-workspace"
```

Scenarios prove that the installed process registry, profile hash, hook logic,
gates, routes, artifacts, and evidence behave as expected.

## 4. Use A Generated Process Command

Setup records generated process commands in `.fst/commands/` and in the process
registry. Typical commands are:

```text
fst-patch-review
fst-purchase
```

List generated commands:

```bash
fst process command list --workspace "$HOME/fst-workspace"
```

Regenerate a command after changing the command name or reinstalling a process:

```bash
fst process command regenerate local_patch_review@0.1.0 \
  --workspace "$HOME/fst-workspace"
```

## 5. Inspect Replay Evidence

Show the latest run:

```bash
fst replay show --latest --workspace "$HOME/fst-workspace"
```

Replay shows which process/profile version ran, which action was requested,
which gate fired, which route was returned, and which evidence was recorded.

## 6. Start The Agent Controller

Start the local MCP server:

```bash
fst mcp start --workspace "$HOME/fst-workspace"
```

Your agent should call the `fst.control` tool before controlled actions. It
should follow returned routes and stop on `AwaitApproval` or `Blocked`.

## Complete Local Check

```bash
tmpdir="$(mktemp -d)"
fst setup --workspace "$tmpdir/workspace" --store sqlite --no-password
fst process list --workspace "$tmpdir/workspace"
fst process command list --workspace "$tmpdir/workspace"
fst scenario run local_patch_review.happy_path --workspace "$tmpdir/workspace"
fst replay show --latest --workspace "$tmpdir/workspace"
```

## Next

Read [Agent Setup](agents.md) to connect an agent, or read
[Local Patch Review](../fst-in-action/demo.md) to see how an installed process
controls a protected outcome.
