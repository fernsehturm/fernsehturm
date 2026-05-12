---
sidebar_position: 2
---

# Process Builder Agent Guide

This page is for agents helping a user create or adapt an FST process profile.

Your job is to help the user express a real process, then draft a controlled
process pack. You are not the authority that installs, activates, publishes, or
weakens the resulting profile.

## Operating Rule

Use the process builder when the user wants to turn a domain workflow into an
FST process profile.

The core boundary is:

```text
agent drafts process files
FST validates and gates them
trusted human approves install or activation
```

Do not treat conversation as approval. Do not activate a generated profile
because the user said "yes" in chat unless the trusted approval path records it.

## Required Inputs

Before drafting profile files, collect or derive:

- process id and name
- process purpose
- protected outcome
- process owner
- actors and roles
- closed action set
- artifact types and required fields
- missing-fact questions
- decision gates
- approval gates
- process-conformance gates
- blocked effects
- allowed outputs
- materialization modes
- required scenario examples
- FST docs source, version, hash, and sections used

If the docs reference is missing, stop profile generation and resolve docs
first.

## FST Docs Requirement

Generated profiles must be grounded in trusted FST developer documentation.

For the local MVP, use the bundled docs snapshot. Later, use
`https://fernsehturm.dev/docs/`.

Record a docs reference:

```json
{
  "docs_source": "fernsehturm.dev/docs",
  "docs_version": "0.1.0",
  "docs_hash": "sha256:...",
  "sections_used": [
    "profile schema",
    "hook manifest",
    "scenario format",
    "artifact schema",
    "route vocabulary"
  ]
}
```

Rule:

```text
No docs source, no profile generation.
```

## Work In This Order

1. Record the user's plain-language intake.
2. Resolve trusted FST docs.
3. Derive the process model.
4. Ask only for missing business facts.
5. Draft files from templates.
6. Validate the generated pack.
7. Create or repair scenarios.
8. Run scenarios.
9. Render a review packet.
10. Stop before install or activation unless approval is recorded through the trusted path.

Do not start by writing YAML. First make the process model explicit.

## Questions To Ask

Ask short questions that unlock a blocked model field.

Good questions:

- What is the protected outcome?
- Which facts must exist before the agent can continue?
- Which documents or records are required?
- Which effects are always forbidden?
- Which effects need approval?
- Who may approve?
- What may the agent draft but not send, publish, grant, or activate?
- What is a passing example?
- What is a blocked example?
- What is an example where the user must provide more information?

Avoid broad questions such as:

```text
Tell me all your process rules.
```

Prefer focused gaps:

```text
Which vendor documents are required before a review packet can be rendered?
```

## Draft Pack Output

The generated draft pack should contain:

```text
process.manifest.yaml
profile.yaml
hooks.yaml
schemas/
  artifacts/
  hooks/
logic/
  python/
    main.py
scenarios/
templates/
skill/SKILL.md
README.md
validation-report.md
review-packet.md
```

Use template-based generation first. Fill structured fields from the process
model. Do not invent a new pack format.

## Validation Checklist

Before packaging or review, verify:

- profile schema is valid
- action set is closed
- routes use the known route vocabulary
- gates reference existing actions
- required artifacts are defined
- generated profile references the docs hash used
- hook manifest exists
- hook schemas exist
- hooks do not return authority
- scenarios exist
- materialization modes are explicit
- install and activation are approval-gated

If validation fails, route the work back to repair. Do not package or activate.

## Scenario Checklist

A generated profile needs scenarios that prove both ordinary and unsafe paths:

- happy path
- missing docs
- missing required input
- blocked hard-rule case
- ask-user case
- instruct-agent case
- approval-required case
- hook failure
- materialization preflight
- idempotency replay

Scenarios are not documentation only. They are evidence that the profile and
Core behavior match the intended process.

## Hook Boundary

Hooks may compute facts, validate artifacts, and render text.

Hooks may not return:

```text
route
approval_record
materialization_allowed
profile_publication
```

If generated hook code or hook output tries to grant authority, block the draft
and rewrite the hook so it returns facts or diagnostics only.

## Route Handling

When FST returns `AskUser`, ask the task user for the missing fact.

When FST returns `InstructAgent`, create or repair the required artifact.

When FST returns `AwaitApproval`, stop. You may summarize what approval is
needed, but you may not approve it.

When FST returns `Blocked`, stop or repair the draft. Do not work around the
block.

When FST returns `MaterializeMock`, write only the approved draft artifact,
package, report, or review packet.

When FST returns `Complete`, report the evidence refs and remaining review
needs.

## Review Packet

The review packet should be understandable by a domain expert and reviewer. It
should include:

- process name and purpose
- process owner
- protected outcome
- allowed agent actions
- forbidden effects
- artifacts required for conformance
- gates and routes
- approvals required
- scenario coverage and results
- validation diagnostics
- materialization modes
- known limitations
- activation approval requirement

The review packet should not hide risk behind implementation detail.

## Stop Conditions

Stop and ask for guidance or approval when:

- FST docs cannot be resolved
- the process model is missing business facts
- the user asks to bypass validation
- the user asks to skip scenarios
- generated hooks try to return authority
- the profile would weaken kernel rules
- the profile needs new environment permissions
- install or activation is requested

The builder can help draft process authority. Only FST validation plus trusted
approval may publish process authority.
