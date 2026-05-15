---
sidebar_position: 2
---

# Create Your First Custom Process

After the purchase quickstart, create one small process of your own.

Do not start by writing YAML. Start with a process you already ask an agent to
follow, then use Canvas to turn that process into gates, evidence, routes, and
scenarios.

The shape is:

```text
describe the process
-> review the structured draft
-> add scenarios
-> publish a version
-> ask the agent to use it
-> inspect the run evidence
```

Canvas is not a workflow builder. You are not drawing every step the agent will
take. You are defining what must be true before the agent's work counts.

## 1. Open Canvas

Use the same workspace from the quickstart:

```bash
fst ui --workspace "$HOME/fst-workspace"
```

Open the local URL that FST prints.

On the first screen, choose **Describe a process**.

## 2. Describe A Real Process

Use a small, low-risk example first. This one creates a process for deciding
whether a design spec is ready for review:

```text
Create a custom process called Spec Readiness.

Before an agent says a spec is ready for review, FST should require:
- a requirements summary
- a draft spec
- every critical requirement linked to a spec section
- a risk or policy check result
- a decision record from me

If a normal business fact is missing, ask me.
If evidence is missing, instruct the agent to produce it.
If the risk check fails, wait for approval or block.

The agent may draft the spec and review packet.
The agent must not approve the spec for review by itself.
```

This is enough to start. The first version should be narrow and obvious.

## 3. Review The Draft

Canvas should turn the description into a structured process draft:

```text
Claim
Spec is ready for review

Gates
- Requirements summary exists
- Draft spec exists
- Critical requirements are linked to spec sections
- Risk or policy check passed
- User decision record exists

Routes
- missing business fact -> AskUser
- missing evidence -> InstructAgent
- failed check -> AwaitApproval or Blocked
- all gates satisfied -> Continue or Complete
```

Review the draft in plain language first. The important questions are:

- Is the claim specific?
- Are the gates things FST can check from evidence?
- Is approval required for authority, not just because the agent sounds confident?
- Does every unsafe or incomplete case have a route?

Keep the advanced profile details closed unless you need them.

## 4. Define What Counts

For each gate, tell Canvas what evidence can satisfy it.

For the spec example:

```text
Requirements summary exists
  counts when a RequirementsSummary artifact is recorded

Draft spec exists
  counts when a Specification artifact is recorded

Critical requirements are linked to spec sections
  counts when every critical requirement has a refined_by link to a spec section

Risk or policy check passed
  counts when a RiskCheckResult is recorded as passed

User decision record exists
  counts when the task user records the decision
```

That third gate is the reason this is different from a checklist. FST should not
only see that requirements and a spec exist. It should see that the important
requirements are connected to the spec.

## 5. Add Scenarios

Scenarios prove that the process behaves before it controls real work.

Add these first:

```text
Complete packet
  all required evidence exists
  expected route: Complete

Missing draft spec
  requirements exist but no spec exists
  expected route: InstructAgent

Missing requirement link
  a critical requirement has no spec section link
  expected route: InstructAgent

Failed risk check
  risk check fails and no exception is approved
  expected route: AwaitApproval or Blocked

Agent tries to approve its own work
  decision record is agent-created
  expected route: Blocked
```

Run the scenarios from Canvas. Do not publish the process until the scenarios
match what you expect.

## 6. Publish The First Version

When the draft reads correctly and the scenarios pass, publish the first local
version.

Publishing is the point where the process becomes something agents can use. It
should be treated as an authority decision:

```text
plain-language draft
-> reviewed structured process
-> passing scenarios
-> published version
```

After publication, runs should show which version controlled them. That matters
because later edits should not silently change the meaning of earlier runs.

## 7. Ask The Agent To Use It

Start FST for your agent if it is not already running:

```bash
fst mcp start --workspace "$HOME/fst-workspace"
```

Then ask your agent:

```text
Use FST with my Spec Readiness process.
Prepare docs/search-redesign.md for review.
Follow the route FST returns.
```

The interaction should feel familiar from the purchase quickstart:

```text
You ask for the work.
The agent prepares candidate evidence.
FST checks what counts.
FST returns a route.
The agent continues, asks, waits, or stops.
Replay shows why.
```

## What You Do

You describe the process, review the structured draft, decide what counts, add
scenarios, and publish the version when it is ready.

## What The Agent Does

The agent can help draft the spec, produce missing artifacts, repair links, run
checks, and explain what FST says is missing.

It cannot approve its own work or decide that the process is satisfied.

## What FST Changes

Without FST, the custom process is usually just a prompt:

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

## Next

- [Developing A Process](/docs/workflows/developing-a-process)
- [Process Builder Agent Guide](/docs/workflows/process-builder-agent)
- [Process Pack API](/docs/api/overview)
