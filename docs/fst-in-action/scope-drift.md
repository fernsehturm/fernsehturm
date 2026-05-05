---
sidebar_position: 1
---

# The Scope-Drift Demo

The single strongest first use case is:

```text
Stop an AI agent from shipping plausible but unrequested behaviour.
```

## The Request

```text
/fst Add session expiry after 30 minutes of inactivity.
Keep the current server-side session model.
Do not add persistent login.
```

## What The Agent Might Do Without FST

The agent implements session expiry, adds tests, and everything passes.

It also adds "remember me" with `localStorage` because that seemed useful for
login work.

The code may be coherent. The tests may pass. The behaviour is still wrong
because nobody asked for persistent login.

## What FST Blocks

FST blocks the Candidate:

```text
Blocked: unaccepted behaviour introduced.
```

Reason:

- no accepted Behaviour authorizes persistent login
- retained scope excludes login persistence
- active Policy/Decision requires server-side session state
- the new test proves behaviour nobody approved

Options:

1. Remove persistent login from this Candidate.
2. Propose persistent login as separate work.
3. Ask for a user Decision.

## Why This Lands

This is the moment where FST becomes concrete:

```text
The tests passed, but FST still caught that the agent built the wrong thing.
```

The agent still moves fast. FST makes it show the box first, work inside it, and
stop when it tries to move the goalposts.

Next: [Example: Session Expiry](session-expiry.md).
