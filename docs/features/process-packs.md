---
sidebar_position: 4
---

# Process Packs

A process pack is the unit of process-specific control.

It contains:

```text
process.manifest.yaml
profile.yaml
hooks.yaml
schemas/
scenarios/
templates/
skill/SKILL.md
```

## Manifest

The manifest declares process id, version, profile API, logic API, entrypoints,
required capabilities, and activation requirements.

## Profile

The profile defines actions, artifacts, gates, routes, approvals, and
materialization rules.

## Hooks

Hooks provide process-specific logic. They compute facts, validate artifacts,
or render templates. Hooks do not return route or approval authority.

## Scenarios

Scenarios prove the pack behaves:

- happy path
- missing input
- blocked case
- ask-user case
- instruct-agent case
- approval-required case
- hook failure
- idempotency replay

## Lifecycle

```bash
fst process install process-packs/local_patch_review-0.1.0.fstpack
fst process activate local_patch_review@0.1.0
fst scenario run local_patch_review.happy_path
```

Activation affects new runs only. Existing runs remain bound to their original
profile version.
