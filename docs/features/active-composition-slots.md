---
sidebar_position: 3
---

# Active Composition Slots

A Composition is a pinned possible system world. FST uses Compositions to keep
parallel work and alternative directions separate until they are checked.

## Free Plan

Free includes:

```text
3 active Composition slots
```

The practical model is:

```text
1 base slot
+ 1 working slot per parallel agent
```

So Free supports:

```text
1 base world + 2 parallel agent work worlds
```

## Pro

Pro removes the active Composition slot limit for local use.

It still runs against the local database on the agent machine.

## Team

Team is coming soon. It is for a shared deployable FST runtime, where the
database runs as a Docker container and multiple users or machines share one
system state.

## Important Distinction

The limit is active Composition slots, not immutable Composition revisions.

FST must be able to keep old revisions reconstructable. Updating a Composition
creates a new revision inside the active line; that normal revisioning should
not consume another commercial slot.
