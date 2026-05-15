---
sidebar_position: 1
---

# Control Loop

FST controls boundary crossings in agent work.

```text
agent intent -> FST command -> controlled run -> route -> evidence -> next action
```

The agent can reason freely inside the allowed boundary. FST decides when the
work may cross into a controlled action, approval, package, report, or protected
effect.

## Gates

FST evaluates:

- decision gates
- approval gates
- process-conformance gates

Each gate belongs to the process profile bound to the run.

Agents and adapters can submit candidate artifacts, facts, or approval
requests. FST decides whether those candidates satisfy the gate.

## Routes

Routes are fixed across profiles:

```text
Continue
InstructAgent
AskUser
AwaitApproval
Blocked
MaterializeMock
MaterializeAllowed
Complete
```

The route tells the agent exactly what kind of step is allowed next.

## Why This Matters

Without FST, an agent can say it followed a process. With FST, the process
decides whether the run state satisfies the gate.

That is the control loop.
