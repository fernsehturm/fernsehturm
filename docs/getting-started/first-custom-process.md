---
sidebar_position: 2
---

# Create Your First Custom Process

After the quickstart, use the bundled process-authoring support to turn one of
your own repeated agent tasks into a small FST-controlled process.

Do not start with a large workflow. Start with one claim the agent often makes
and one protected action or decision boundary you care about.

```text
you describe what should count
-> the agent drafts a process package
-> FST checks the package evidence
-> you review and approve what becomes authoritative
-> future agent work follows that process
```

## 1. Pick One Process Boundary

Choose something concrete and low-risk first. Good first examples are:

- "this draft is ready for review"
- "this customer reply may be sent"
- "this support record may be updated"
- "this repository change may be proposed"

The important question is not "what should the agent do?" It is:

```text
What must be true before the agent's work counts?
```

## 2. Describe The Process In Plain Language

Ask the agent to use the process-authoring support:

```text
Use the fst-process-author skill to create an FST process package at
./spec-readiness. The protected claim is that a spec is ready for review.

Before that claim counts, FST should require:
- a requirements summary
- a draft spec
- every critical requirement linked to a spec section
- a risk or policy check result
- my decision record

If a normal business fact is missing, ask me.
If evidence is missing, instruct the agent to produce it.
If the risk check fails, wait for approval or block.
The agent may draft the spec and review packet.
The agent must not approve the spec for review by itself.
```

This is enough to start. The first version should be narrow and obvious.

## 3. Review What The Agent Drafts

The agent should produce a process package, not just prose. Review the plain
language first:

- Is the protected claim specific?
- Are the gates things FST can check from evidence?
- Is approval required for authority, not because the agent sounds confident?
- Does every unsafe or incomplete case have a route?
- Are the scenarios small enough to understand?

Keep the first process boring. A boring process that blocks the right thing is
more useful than a broad process that nobody can verify.

## 4. Check The Package

Run the authoring check before you treat the process as usable:

```bash
fst process author check ./spec-readiness --json
```

Fix any missing schemas, scenarios, routes, or evidence definitions before you
publish or install the process.

## 5. Prove It With Scenarios

A useful first process should have scenarios like these:

```text
complete packet
  all required evidence exists
  expected result: allowed or complete

missing draft spec
  requirements exist but no spec exists
  expected result: instruct the agent to produce the draft

missing requirement link
  a critical requirement has no linked spec section
  expected result: instruct the agent to repair the evidence

failed risk check
  risk check fails and no exception is approved
  expected result: await approval or block

agent tries to approve its own work
  decision record is agent-created
  expected result: blocked
```

The goal is to see the process handle incomplete and unsafe cases before you use
it on real work.

## 6. Publish Or Install Only After Review

Publishing or installing a process changes what future agent work may rely on.
Treat that as an authority decision:

```text
plain-language draft
-> checked process package
-> passing scenarios
-> human-reviewed version
-> installed process
```

After installation, runs should show which process version controlled them. That
matters because later edits should not silently change the meaning of earlier
runs.

## What This Demonstrates

Without FST, a custom process is usually a prompt:

```text
Please make sure the spec is ready for review.
```

With FST, the process becomes a versioned control surface:

```text
claim
-> gates
-> evidence that counts
-> scenarios
-> route returned to the agent
-> replayable decision
```

That is the step from "the agent followed my instruction" to "the work met the
process I approved."

## Analysis And Troubleshooting

### If the package check fails

Read the check output as a to-do list. Fix the smallest missing piece first:
schema, route, scenario, or evidence definition.

### If the agent wants to approve its own work

Stop and revise the process. Approval must come from a trusted authority path,
not from the same caller that requested the action.

### If the process is getting large

Split it. FST works best when a process package controls a concrete boundary.
Start with one gated action or claim, then expand after the first version is
understandable and testable.

## Next

- [Real Effects](/docs/getting-started/real-effects)
- [Developing A Process](/docs/workflows/developing-a-process)
- [Process Builder Agent Guide](/docs/workflows/process-builder-agent)
- [Process Pack API](/docs/api/overview)
