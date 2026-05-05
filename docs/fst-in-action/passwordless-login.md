---
sidebar_position: 3
---

# Example: Passwordless Login

This example shows how little you need to do while FST keeps the work controlled. The goal is not the exact commands — it is the control shape.

## Scenario

You want to add passwordless login by email magic link, but you do not want the agent to quietly rewrite authentication.

```text
/fst Add passwordless login by email magic link.
Keep the existing password login and session behavior working.
Do not add SMS or social login.
```

This is a good FST task because it has real drift risk:

- auth behavior must not change without approval
- existing sessions must keep working
- token expiration needs a product decision
- email templates may enter scope
- security checks matter

## 1. Work-Context Selection

FST determines where Exploration may look. It may find more than one relevant context:

```text
I found:

1. current login/session system
2. old experimental invite-token flow

Use only the current login/session system as the WorkContext?
```

You answer:

```text
Yes. Use the current login/session system.
Do not use the old invite-token flow.
```

This does not approve the implementation. It only selects the starting context.

## 2. Exploration Asks Only Real Product Questions

The agent inspects, drafts, and tests without asking you about every detail. FST interrupts only when your answer changes the product, risk, or allowed path.

```text
Should a magic link create a new session immediately,
or require confirmation on the same device that requested it?
```

You answer: **Require same-device confirmation.**

```text
Magic links need an expiration time.
Use 15 minutes, 30 minutes, or another value?
```

You answer: **Use 15 minutes.**

FST records both answers against the exact questions. The agent cannot later reduce them to "the user approved the login plan."

## 3. FST Blocks Silent Scope Expansion

During Build, the agent discovers that the email template must change to include the magic-link URL.

Email templates were not part of the original retained scope. FST surfaces this explicitly:

```text
The implementation needs to modify transactional email templates,
which were not in retained scope.

Expand scope to include transactional email templates?
```

You answer: **Yes. Include only the passwordless-login email template.**

The agent now has explicit permission to continue in that area. The expansion is recorded — it does not disappear into the diff.

## 4. Build Inside the Recorded Path

The agent builds the change. You do not drive the internal steps.

FST keeps checking that work stays inside the recorded path:

- current login/session system is the WorkContext
- password login must keep working
- session behavior must remain unchanged
- SMS and social login are out of scope
- magic-link expiration is 15 minutes
- same-device confirmation is required
- only the relevant email template was added to scope

If the agent tries to change token storage, add SMS, or alter session behavior without evidence, FST blocks the work.

## 5. FST Checks Before Materialization

When the proposed work holds together:

```text
The checked result is ready.
Apply it to the workspace or emit a patch?
```

You answer: **Emit a patch.**

That approval means "write this checked result to this target." It does not mean every future login change is accepted.

## 6. Final Report

A useful final report should explain what happened without relying on chat memory:

```text
Added passwordless login by email magic link.

User decisions recorded:
- WorkContext: current login/session system.
- Magic links require same-device confirmation.
- Magic links expire after 15 minutes.
- Scope expanded to include only the passwordless-login email template.

Checked:
- Existing password login still works.
- Existing session behavior is unchanged.
- SMS and social login were not added.
- Expired magic links are rejected.
- Reused magic links are rejected.
- Email template renders the expected link format.

Materialized:
- Patch emitted.

Remaining:
- No blocking items.
```

## The Short Version

```text
Ask for the change.
Confirm the WorkContext if asked.
Answer product and risk decisions.
Approve scope expansion only when it is explicit.
Choose how to materialize the checked result.
Review the evidence-backed report.
```
