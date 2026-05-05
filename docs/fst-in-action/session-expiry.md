---
sidebar_position: 2
---

# Example: Session Expiry

This example shows the intended control shape:

```text
request -> WorkContext -> Exploration -> Build -> Compose -> optional Materialization
```

## 1. Request

```text
/fst Add session expiry after 30 minutes of inactivity.
Keep the current server-side session model.
Do not introduce JWT refresh tokens or "remember me" behaviour.
```

## 2. Work-Context Selection

FST decides where Exploration may look.

It may find several possible worlds:

```text
1. current server-side session Composition
2. old JWT refresh-token experiment
3. admin-only session extension variant
```

You confirm the current server-side session Composition. FST records that as
evidence and creates a WorkContext revision.

This does not approve implementation. It only answers:

```text
Where may Exploration look?
```

## 3. Exploration

The agent discovers relevant files, artifacts, decisions, policies, risks, and
unknowns.

FST records the retained scope:

```text
allowed:
- session middleware
- server-side session store
- session expiry tests

excluded:
- JWT refresh tokens
- persistent login
- browser localStorage session state
```

If a product decision is needed, FST asks before Build.

## 4. Build

The agent creates Candidate work inside the retained scope.

The Candidate records:

- the Behaviour being changed
- the Implementation material
- Verification definitions
- Observations from executed checks
- expected and actual touch points

If the agent adds persistent login, the Build gate blocks because that behaviour
is outside the approved box.

## 5. Compose

FST composes the Candidate into a pinned possible world and checks whether it is
coherent.

Compose checks exact revisions, not agent narration.

## 6. Materialization

After a coherent Composition exists, materialization can project the checked
result into a workspace, patch, generated directory, migration folder, or other
target sink.

Materialization is recorded. It is not global acceptance.

For the full long-form walkthrough, see [The Scope-Drift Demo](scope-drift.md).
