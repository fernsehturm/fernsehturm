---
sidebar_position: 2
---

# Demo: Process Builder

The process builder is a meta-process: it controls the creation of other
process profiles.

It helps a domain expert describe a workflow and turns that description into a
draft process pack.

## Example Request

```text
I want an agent to help review vendor onboarding requests.
It should check required documents, flag missing tax info, and draft a review
packet.
```

## What The Builder Produces

```text
process.manifest.yaml
profile.yaml
hooks.yaml
schemas/
scenarios/
templates/
skill/SKILL.md
validation report
review packet
```

## Required Control

The builder must:

- resolve trusted FST docs before profile generation
- derive a structured process model
- ask for missing business facts
- draft from templates
- validate generated profile and hooks
- reject hooks that return authority
- generate and run scenarios
- render a review packet
- stop before install or approval for use

## Boundary

The builder may draft process authority. It may not publish it.

```text
No docs source, no profile generation.
No validated pack, no install.
No passed scenarios, no approval for use.
No trusted approval, no publication.
```

For the user-facing process-design guide, read
[Developing A Process](../workflows/developing-a-process.md).
