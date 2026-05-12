---
sidebar_position: 2
---

# Quickstart

This quickstart follows the MVP installation path:

```text
install fst -> init workspace -> install process pack -> run scenarios -> start MCP
```

## 1. Install FST

Install the latest Linux package with one command:

```bash
curl -fsSL https://www.fernsehturm.dev/install.sh | bash
fst version
```

If your current shell does not yet see `$HOME/.local/bin`, run:

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

The installer downloads the latest release asset from GitHub, verifies
`checksums.txt` when `sha256sum` is available, installs `fst` to
`$HOME/.local/bin`, and installs bundled assets to
`${XDG_DATA_HOME:-$HOME/.local/share}/fst`.

The MVP package includes:

```text
fst
INSTALL.md
licenses/
schemas/
process-packs/local_patch_review-0.1.0.fstpack
process-packs/purchase_request_preflight-0.1.0.fstpack
examples/
```

The bundled process packs use JS hooks, so `node` must be available on `PATH`
before running their scenarios.

## 2. Initialize A Workspace

Set reusable paths:

```bash
export FST_DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/fst"
export FST_WORKSPACE="$HOME/fst-workspace"
```

Use SQLite for the product-shaped local path:

```bash
fst init --store sqlite --workspace "$FST_WORKSPACE"
fst store migrate --workspace "$FST_WORKSPACE"
```

Use `local_file` when you want inspectable file-backed state:

```bash
fst init --store local_file --workspace "$FST_WORKSPACE"
```

Check the workspace:

```bash
fst doctor --workspace "$FST_WORKSPACE" --fst-bin "$(command -v fst)"
```

## 3. Install The MVP Process Pack

Install and activate the local patch review pack:

```bash
fst process install "$FST_DATA_DIR/process-packs/local_patch_review-0.1.0.fstpack" \
  --workspace "$FST_WORKSPACE"

fst process activate local_patch_review@0.1.0 \
  --workspace "$FST_WORKSPACE"
```

Activation changes the default profile for new runs. Existing runs stay bound
to the profile version they started with.

## 4. Run A Scenario

Run the happy path:

```bash
fst scenario run local_patch_review.happy_path \
  --workspace "$FST_WORKSPACE"
```

Run blocked examples as well:

```bash
fst scenario run local_patch_review.generated_file_blocked \
  --workspace "$FST_WORKSPACE"

fst scenario run local_patch_review.secret_literal_blocked \
  --workspace "$FST_WORKSPACE"
```

Scenarios prove that the active profile, hook logic, gates, routes, artifacts,
and evidence behave as expected.

## 5. Inspect Replay Evidence

Show the latest run:

```bash
fst replay show --latest --workspace "$FST_WORKSPACE"
```

Replay should show which profile version ran, which action was requested, which
gate fired, which route was returned, and which evidence was recorded.

## 6. Start The Agent Controller

Start the local MCP server:

```bash
fst mcp start --workspace "$FST_WORKSPACE"
```

Your agent should call the `fst.control` tool before controlled actions. It
should follow returned routes and stop on `AwaitApproval` or `Blocked`.

## 7. Expected MVP Smoke

A complete local smoke looks like:

```bash
tmpdir="$(mktemp -d)"
export FST_DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/fst"
fst version
fst init --store sqlite --workspace "$tmpdir/sqlite"
fst store migrate --workspace "$tmpdir/sqlite"
fst doctor --workspace "$tmpdir/sqlite" --fst-bin "$(command -v fst)"
fst process install "$FST_DATA_DIR/process-packs/local_patch_review-0.1.0.fstpack" --workspace "$tmpdir/sqlite"
fst process activate local_patch_review@0.1.0 --workspace "$tmpdir/sqlite"
fst scenario run local_patch_review.happy_path --workspace "$tmpdir/sqlite"
fst replay show --latest --workspace "$tmpdir/sqlite"
```

## Next

Read [Agent Setup](agents.md) to connect an agent, or read
[Local Patch Review](../fst-in-action/demo.md) to see what the MVP process
controls.
