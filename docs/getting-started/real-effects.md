---
sidebar_position: 4
---

# Real Effects

The quickstart starts in log-only mode on purpose. It proves the authority loop
without sending real email:

```text
agent requests send_email
-> FST checks the gated action
-> FST requires scoped human approval
-> FST allows only the approved retry
-> FST writes an audit-safe local action record
```

A real effect is the next step. It means FST is connected to a target system that
can change external state, such as an SMTP account, Gmail account, ticketing
system, repository, deployment tool, or billing system.

## What Changes With A Real Effect

The authority boundary does not change:

```text
Caller requests action.
FST Core decides whether the action may proceed.
The target system executes only after Core allows it.
```

What changes is the connector and credential setup. The protected action now has
a real target, so you should add it only after the log-only run is clear.

## Before You Connect One

Make sure you can already complete the quickstart loop:

- the agent can request the bundled email send
- FST can return `approval_required`
- you can approve through the trusted local console
- the agent can retry the exact same request
- FST can return `may_proceed: true`
- you can inspect the resulting log, decision, requirements, and audit records

Do not connect a real account just to understand FST. The log-only path is the
right first proof.

## Start Narrow

When you are ready, connect one low-risk effect first:

```text
one protected action
one target account
one constrained scope
one approval path
one audit story
```

For email, that usually means one sending account and a test recipient. Keep the
approval rule exact: a changed recipient, subject, body, attachment, account, or
send mode should require a fresh decision.

## What FST Does Not Replace

FST does not replace your agent, workflow tool, identity provider, email
provider, repository host, or deployment system. It wraps the protected action
with a procedural permission check.

The agent can prepare and request work. FST decides whether the requested action
may proceed. The target system performs the effect only after FST allows it.

## Troubleshooting Real Effects

If a real effect does not run, check in this order:

1. Did the action reach FST, or did the agent fail before submitting it?
2. Did FST return missing requirements, `approval_required`, blocked, or allowed?
3. If approval was required, did the approval match the exact request and scope?
4. If FST allowed the action, did the connector receive the allowed scope?
5. Did the target system reject the effect because of credentials, provider
   policy, network access, or account limits?
6. Did the audit record show the same request you expected?

Unknown state should block. Treat an unclear failure as a reason to inspect the
records, not as permission to bypass FST.

## Next

- [Quickstart](/docs/getting-started/quickstart)
- [Create Your First Custom Process](/docs/getting-started/first-custom-process)
- [How FST Works](/docs/understanding/how-it-works)
