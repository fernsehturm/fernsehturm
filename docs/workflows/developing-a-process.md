---
sidebar_position: 1
---

# Developing A Process

A process is the control path an agent must work through before its work counts.

Start with the work, not the prompt. A prompt can tell an agent what the process
is. A process profile makes the process executable: allowed actions, required
evidence, gates, approvals, routes, scenarios, and completion rules.

## What Matters

The most important design choice is the protected outcome.

Good protected outcomes are specific:

- a vendor onboarding review packet is ready
- a patch is ready for review
- an access grant may be mocked
- an email send may be requested
- a production data access request is blocked or escalated

Weak protected outcomes are vague:

- help with vendors
- improve code quality
- handle email
- be careful with access

FST works best when the process has visible boundaries, repeatable examples,
and clear moments where work should continue, ask, stop, or require approval.

## The Building Blocks

A useful process profile defines:

- **Goal:** what result the process protects.
- **Actors:** task user, agent, approver, reviewer, system.
- **Actions:** the closed set of things the agent may request.
- **Artifacts:** typed records that prove required work happened.
- **Decision gates:** missing facts, branching, classification, or ambiguity.
- **Approval gates:** authority increases or risky effects that need a trusted human.
- **Process-conformance gates:** required valid artifacts before the next step.
- **Routes:** what FST returns to the agent.
- **Scenarios:** positive and negative examples that prove the profile behaves.
- **Materialization rules:** what may be written, sent, changed, mocked, or blocked.

Do not treat files, chat messages, or agent claims as evidence by themselves.
For FST, evidence is a typed record bound to a run, profile version, actor, and
requirement.

## How A Process Runs

At runtime, the agent submits an intended action:

```text
agent intent -> FST gate -> route -> evidence -> controlled materialization
```

FST evaluates the active process profile and returns a route:

```text
Continue
  The action is allowed to proceed.

AskUser
  The task user needs to provide a normal business fact.

InstructAgent
  The agent needs to create missing artifacts, run a check, or repair the draft.

AwaitApproval
  A trusted approval path must decide before work can continue.

Blocked
  The action violates the profile or cannot be made safe in this process.

MaterializeMock
  FST may write a mock, draft, packet, or local non-real effect.

MaterializeAllowed
  FST may perform an approved real effect, if the environment supports it.

Complete
  The process reached its controlled outcome.
```

The agent does not decide that a gate passed. It can create candidate artifacts
or ask for facts, but FST decides whether the recorded state satisfies the
profile.

## Designing Without The Process Builder Agent

Manual process development is direct but requires technical care.

1. Pick the protected outcome.
2. List actors and separate task users from authorized approvers.
3. Define the closed action set.
4. Define the artifact types and required fields.
5. Add decision gates for missing facts and branching.
6. Add approval gates for authority or risky effects.
7. Add process-conformance gates for required artifacts.
8. Map every gate to a route.
9. Define materialization modes and limits.
10. Write scenarios for happy path, missing facts, blocked cases, approvals, and idempotency.
11. Validate the profile.
12. Run scenarios and inspect evidence.
13. Install and approve for use only after review.

Manual development is useful when the team already understands FST profile
shape, hook contracts, and scenario format.

For a runnable file-level starter, use
[Simple Custom Process](/docs/workflows/simple-custom-process). It contains a
minimum process pack with `process.manifest.yaml`, `profile.yaml`,
`core-profile.json`, scenarios, skill instructions, install commands,
validation commands, and evidence review commands.

## Designing With The Process Builder Agent

The process builder agent helps a domain expert create a process without
needing to know the technical profile format.

The user describes the process in plain language:

```text
I want an agent to help review vendor onboarding requests.
It should check required documents, flag missing tax info, and draft a review
packet.
```

The builder agent then works through the controlled builder process:

1. Records the plain-language intake.
2. Reads trusted FST developer documentation.
3. Derives a structured process model.
4. Asks the user for missing business facts.
5. Drafts profile, hooks, schemas, scenarios, templates, and skill instructions.
6. Validates the generated pack.
7. Runs the generated scenario suite.
8. Packages a local draft.
9. Renders a review packet.
10. Stops at install or approval for use until trusted approval exists.

The builder agent can draft process authority. It cannot publish that authority.

## Questions A Domain Expert Should Expect

Good builder questions are concrete:

- What is the protected outcome?
- Who owns this process?
- Which facts are required before work can continue?
- Which artifacts prove the work happened?
- What should block the process?
- What should ask the user for more information?
- What should require approval?
- Who is allowed to approve?
- What may the agent draft?
- What may the agent never do?
- What examples should pass, block, ask, or await approval?

The builder should not ask the domain expert to write YAML unless the user wants
to inspect or edit the draft directly.

## Review Before Activation

Before a generated process is approved for use, a reviewer should see:

- process name and purpose
- what the agent may do
- what the agent may not do
- required artifacts
- gates and routes
- scenario results
- validation diagnostics
- materialization modes
- remaining risks
- required approval

Approval for use changes what future agents may do. Treat it as an authority
decision, not as a normal file write.

## Rules Of Thumb

- Build the smallest process that protects a real outcome.
- Keep action names closed and boring.
- Make evidence typed and inspectable.
- Ask users for facts, not approval shortcuts.
- Keep approvals on trusted surfaces.
- Use scenarios to prove both allowed and blocked behavior.
- Do not let hooks grant authority.
- Do not approve profiles for use unless they have passed validation and scenarios.
