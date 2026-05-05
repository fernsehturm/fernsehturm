---
sidebar_position: 1
---

# Working With Agents

FST is designed for developers who already use tools such as Codex, Claude Code,
Cursor, or another AI coding agent.

The intended interaction is:

```text
1. Point FST at the work.
2. Confirm the box when it matters.
3. Let the agent run.
4. Answer only decisions that affect behaviour, scope, policy, risk, or output.
5. Review the trace-backed result.
```

## Start With A Natural Task

```text
/fst Add session expiry after 30 minutes of inactivity.
Keep the current server-side session model.
Do not introduce JWT refresh tokens.
```

The first useful response is not a long form. It is a control summary:

```text
Suggested WorkContext:
- current login/session Composition
- current source revision
- no old JWT experiment

Likely retained scope:
- auth/session/*
- session middleware
- session expiry tests

Decision needed:
- should authenticated API activity reset the inactivity timer?
```

## What You Confirm

- which WorkContext Exploration may use
- which product behaviour is intended
- which Decisions and Policies constrain the work
- whether scope expansion is allowed
- whether coverage may be deferred
- where a coherent result may be materialized

## What Review Looks Like

At the end, review the Candidate and Composition findings:

- what changed
- why it was allowed
- what evidence exists
- what blockers or risks remain

Review becomes targeted evaluation, not archaeology.
