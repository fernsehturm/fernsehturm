---
sidebar_position: 1
---

# Control Loop

FST controls one context-selection phase and three work stages:

```text
Work-Context Selection -> Exploration -> Build -> Compose
```

The agent is free inside a stage. FST controls whether a pinned result may leave
the stage.

## Work-Context Selection

Answers:

```text
Where may Exploration look?
```

It creates a WorkContext and usually a SearchView.

## Exploration

Answers:

```text
What does this work touch?
```

It creates an ExplorationNote. The retained scope is the box Build must stay
inside.

## Build

Answers:

```text
What did the agent create or change inside the box?
```

It creates a Candidate.

## Compose

Answers:

```text
Do these pinned revisions hold together as one possible world?
```

It creates a Composition and checks coherence.

For the full reference, see [The FST Model](../concepts/01_the-model.md).
