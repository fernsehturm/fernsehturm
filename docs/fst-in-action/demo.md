---
sidebar_position: 1
---

# Demo: Local Patch Review

The MVP process pack is `local_patch_review`.

It controls when an agent may mark a local patch ready for review.

## The Goal

The agent can inspect a diff, evaluate rules, run checks, and draft a review
packet. FST decides whether the process evidence is sufficient.

Protected outcome:

```text
patch.ready_for_review
```

Only FST should count that outcome after gates pass.

## Setup

```bash
fst init --store sqlite --workspace "$HOME/fst-workspace"
fst store migrate --workspace "$HOME/fst-workspace"
fst process install process-packs/local_patch_review-0.1.0.fstpack --workspace "$HOME/fst-workspace"
fst doctor --workspace "$HOME/fst-workspace"
```

## Happy Path

The agent submits actions such as:

```text
patch.preflight.request
repo.diff.inspect
repo.rules.load
repo.scan
patch.tests.plan
patch.tests.record
patch.rules.evaluate
patch.review_packet.create
patch.ready_for_review
```

FST requires valid artifacts before review packet creation and before
ready-for-review.

## Blocked Cases

Generated file change:

```text
route: Blocked
reason: generated files are blocked by this process
```

Secret literal:

```text
route: Blocked
reason: secret literals block the patch
```

Missing diff context:

```text
route: AskUser
reason: repository diff context is missing
```

Missing rule evaluation:

```text
route: InstructAgent
reason: review packet creation requires valid preflight artifacts
```

## Scenario Commands

```bash
fst scenario run local_patch_review.happy_path --workspace "$HOME/fst-workspace"
fst scenario run local_patch_review.generated_file_blocked --workspace "$HOME/fst-workspace"
fst scenario run local_patch_review.secret_literal_blocked --workspace "$HOME/fst-workspace"
fst replay show --latest --workspace "$HOME/fst-workspace"
```

## What This Shows

The patch is not ready because the agent says so. It is ready only when the
selected process profile, artifacts, hooks, gates, and scenario-backed process
allow it.
