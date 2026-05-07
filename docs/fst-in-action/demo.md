---
sidebar_position: 0
---

# Demo: Session Expiry Scope Control

This demo shows how FST keeps a useful agent fast without letting it ship
plausible but unrequested behaviour.

The scenario is deliberately ordinary: add session expiry after inactivity. The
risk is that the agent treats nearby login ideas as permission to change session
semantics.

## User Request

```text
/fst Add session expiry after 30 minutes of inactivity.
Keep the current server-side session model.
Do not introduce JWT refresh tokens or remember-me behaviour.
```

The user has specified the goal, an important constraint, and two exclusions.
FST now records the path from request to checked result.

## WorkContext

FST first decides where Exploration may look.

It may find several plausible contexts:

```text
1. current server-side session Composition
2. old JWT refresh-token experiment
3. admin-only session extension variant
```

The user confirms:

```text
Use the current server-side session Composition.
Do not use the JWT experiment or admin extension variant.
```

FST records a [WorkContext](../concepts/glossary.md#workcontext) and derives a
[SearchView](../concepts/glossary.md#searchview). This still does not approve
implementation. It only establishes the starting universe for Exploration.

## ExplorationNote

The agent explores the selected context and discovers what the work touches.
FST records an [ExplorationNote](../concepts/glossary.md#explorationnote).

Example retained scope:

```text
allowed:
- session middleware
- server-side session store
- session expiry configuration
- session expiry tests

excluded:
- JWT refresh tokens
- remember-me behaviour
- browser localStorage session state
- persistent login UI
```

The ExplorationNote also records relevant decisions, policies, risks, and any
needed user input. If the agent needs a product decision before Build, FST asks
there, before implementation begins.

## Candidate

The agent builds inside the retained scope and produces a
[Candidate](../concepts/glossary.md#candidate).

The Candidate records:

- the ExplorationNote revision it used
- the Behaviour revision for inactivity expiry
- the Implementation material for middleware and session store changes
- Verification definitions for active, expired, and renewed sessions
- Observations from checks that ran
- expected and actual touch points
- evidence that remember-me and JWT work were not added

If the agent adds persistent login because it seems useful, the Build gate
blocks the Candidate. Passing tests are not enough, because the extra behaviour
does not trace to the approved request or retained scope.

## Composition

FST composes the Candidate into a pinned possible world and checks whether it is
coherent.

The [Composition](../concepts/glossary.md#composition) check asks:

- does the Candidate use the exact WorkContext and ExplorationNote revisions?
- are the session behaviours compatible with active policies and decisions?
- do Verifications target the effective Behaviour revisions?
- do Observations support the required checks?
- are there any implementation target conflicts?
- did the work stay inside retained scope?

A coherent Composition means this exact possible world holds together. It does
not make every future session change accepted.

## Optional Materialization

After the Composition is coherent, the user can choose how to materialize it:

```text
Apply to workspace
Emit patch
Generate migration folder
Keep as candidate only
```

[Materialization](../concepts/glossary.md#materialization) is explicit. It is
recorded as a projection of the checked Composition into a concrete target.

## What This Demo Shows

This is the practical value of FST:

- the agent can move quickly once scope is accepted
- search context and Build permission stay separate
- user decisions are recorded as evidence, not summarized by the agent
- tests support the work but do not authorize extra behaviour
- output is materialized only after the checked Composition exists

Next: read [Example: Session Expiry](session-expiry.md) for the same scenario in
shorter stage form, or [Example: Passwordless Login](passwordless-login.md) for a
larger workflow with explicit scope expansion.
