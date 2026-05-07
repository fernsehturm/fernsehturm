---
sidebar_position: 2
---

# How FST Works

FST is the control layer around agentic software work. Your agent still reads,
plans, edits, and tests. FST controls when that work is allowed to move from one
kind of state to the next.

The core path is short:

```text
User request
  |
  v
Work-Context Selection -> Exploration -> Build -> Compose
       |                    |            |        |
       v                    v            v        v
   WorkContext        ExplorationNote  Candidate  Composition
   SearchView         retained scope   evidence   coherence
```

Stages have flexible interiors. Gates have strict exits. The agent can move
quickly inside a stage, but it must produce the right FST record before the next
stage begins.

## The Short Model

| Step | Question | FST record | Why it matters |
| --- | --- | --- | --- |
| Work-Context Selection | Where may Exploration look? | [WorkContext](../concepts/glossary.md#workcontext), [SearchView](../concepts/glossary.md#searchview) | Prevents the agent from treating every reachable file or old experiment as current truth. |
| Exploration | What does this work touch? | [ExplorationNote](../concepts/glossary.md#explorationnote) | Creates the retained scope: the exact box Build must stay inside. |
| Build | What did the agent create or change inside the box? | [Candidate](../concepts/glossary.md#candidate) | Turns implementation work into a bounded, traceable work package. |
| Compose | Do the pinned revisions hold together? | [Composition](../concepts/glossary.md#composition) | Checks whether selected work forms a coherent possible system world. |

## 1. Work-Context Selection

Work-Context Selection chooses the starting universe for the task.

It records which Composition revisions, source revisions, and discovery policy
Exploration may use. This matters because search is not permission. A repo can
contain old experiments, rejected branches, stale docs, and unrelated code. FST
does not let the agent infer that everything it can find is allowed context.

Work-Context Selection produces:

- a [WorkContext](../concepts/glossary.md#workcontext), the approved starting universe
- a [SearchView](../concepts/glossary.md#searchview), the searchable surface derived from it

This does not approve implementation. It only answers:

```text
Where may Exploration look?
```

## 2. Exploration

Exploration discovers the real shape of the work before implementation starts.

It identifies affected behaviours, source areas, policies, decisions, contracts,
verification needs, unknowns, and user input that must be resolved before Build.
Its most important output is retained scope.

```text
retained_scope = the approved box for Build
```

If the task is session expiry, retained scope might allow session middleware,
the server-side session store, and expiry tests while excluding persistent login,
JWT refresh tokens, and browser localStorage.

Exploration produces an [ExplorationNote](../concepts/glossary.md#explorationnote).
The Exploration gate passes only when the note is specific enough for Build to
start.

## 3. Build

Build is where the agent creates the concrete work package.

The agent can implement, revise, run checks, and repair inside the retained
scope. It cannot silently expand that scope. If the work needs a larger box, FST
returns to Exploration so the scope change is explicit.

Build produces a [Candidate](../concepts/glossary.md#candidate). A useful
Candidate records:

- which ExplorationNote revision it used
- which artifacts and source targets changed
- expected and actual touch points
- Verification definitions
- Observations from checks that ran
- scope compliance evidence

The Build gate blocks work that is incomplete, unpinned, unverified, or outside
the retained scope.

## 4. Compose

Compose combines one or more Candidates into a pinned possible world.

FST checks whether the selected revisions hold together: no conflicting
decisions, no incompatible contracts, no missing required coverage, no stale
verification targets, no policy violations, and no incompatible implementation
targets.

Compose produces a [Composition](../concepts/glossary.md#composition).

```text
coherent = this pinned world holds together under FST's checks and evidence
```

A coherent Composition is not global truth. It is one checked possible world.
Different Compositions can hold different decisions, alternatives, and candidate
sets at the same time.

## Where Materialization Fits

[Materialization](../concepts/glossary.md#materialization) projects a coherent
Composition into a concrete sink such as a workspace, patch, generated folder,
migration folder, or deployment manifest.

Materialization is not a fourth stage. It is an output step. The important point
is that the write target is explicit and the projected result traces back to the
Composition that was checked.

## What The User Controls

FST is designed to keep human input focused on decisions that change the safe
path. You do not need to drive every implementation step.

You normally control:

- the request and product intent
- the starting WorkContext when more than one is plausible
- behaviour, policy, scope, and risk decisions
- scope expansion when Build needs a larger box
- materialization into a concrete output target

The agent handles ordinary implementation work inside the approved path.

## What To Read Next

For the formal model, read [The FST Model](../concepts/01_the-model.md). For a
concrete walkthrough, read the [Session Expiry Demo](../fst-in-action/demo.md).
For the full vocabulary, use the [Glossary](../concepts/glossary.md).
