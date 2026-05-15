---
sidebar_position: 1
---

# FST Structure

FST is structured so agents and workflow tools can be useful without becoming
the authority over the process.

The public model is:

```text
actors
  humans, agents, workflows, services
    -> interfaces
       CLI, MCP, REST, SDK, UI
    -> host runtime
       configuration, routing, receivers, plugins
    -> FST process authority
       controlled runs, gates, approvals, evidence, preflight
    -> contract-based components
       stores, adapters, validators, auth providers, profiles, audit sinks
```

You do not need to understand the internal implementation of the FST authority
layer to build with FST. The important point is the boundary: everything around
FST communicates through versioned contracts.

## The Split

FST has five public parts:

| Part | What it does | What it does not do |
| --- | --- | --- |
| Interfaces | Turn user, agent, workflow, or service intent into FST commands | Decide route validity or process authority |
| Host runtime | Wires configuration, receivers, plugins, interfaces, and component execution | Decide official process state |
| FST authority layer | Owns controlled runs, route decisions, evidence admission, approvals, and protected-effect preflight | Replace agents, workflow tools, stores, or adapters |
| Contracts | Define the stable shapes used between FST and components | Become a second process authority |
| Open components | Implement stores, adapters, validators, auth providers, profiles, and exports | Bypass contracts or mark their own output official |

This split lets teams keep the components that match their environment while
keeping one consistent process authority.

## Why Contracts Matter

Contracts are the boundary that makes public components replaceable.

An environment adapter, validator, store, authorization provider, interface, or
process pack should be buildable against contract schemas, fixtures, and
conformance tests. It should not need internal FST implementation details.

The contract rule is:

```text
component produces a command, candidate, fact, or result
-> FST evaluates it against the active run and profile
-> FST admits or rejects it for official process state
```

This protects the system from accidental authority leaks. A GitHub adapter can
report a pull request event. A validator can report a test result. A chat
gateway can report a user message. Those records become official evidence only
when FST accepts them for a specific run, gate, scope, and profile version.

## What Agents See

Agents should not reason about internal FST parts. They should interact through
an interface, usually the FST MCP server or CLI.

An agent asks:

```text
What is the next valid route for this controlled run?
```

FST answers with a route such as:

```text
InstructAgent
AskUser
AwaitApproval
Blocked
MaterializeAllowed
Complete
```

The route tells the agent what is valid next. It also tells the agent what is
missing when the process cannot advance.

## What Component Developers See

Component developers build against contracts.

Examples:

- an interface turns CLI, REST, SDK, UI, or MCP input into a canonical command
- a store persists and returns official records through the store contract
- an environment adapter receives events or executes approved effects
- an authorization provider resolves identity facts or approval candidates
- a validator produces check results
- a process pack defines actions, gates, artifacts, scenarios, and materialization rules
- an audit sink exports evidence for review or compliance

Each component should be testable with contract fixtures and a mock FST
authority harness before it is connected to a real deployment.

See [Component Developers](/docs/developers/overview) for the development path.

## What FST Controls

FST controls what counts inside a run:

- official run state
- profile binding
- next route
- gate satisfaction
- artifact and relation acceptance
- approval acceptance
- scope grants
- evidence records
- materialization preflight
- replayable decision records

FST does not need to execute every action. It needs to control the actions that
count: official transitions, accepted evidence, valid approvals, and protected
effects.

## Why This Is Important

Without this structure, agents and workflow tools tend to collapse capability
and authority into the same place. The same system can plan the work, call the
tools, interpret whether the process was followed, and declare completion.

FST separates those concerns.

```text
Agents do the work.
Workflow tools move the work.
Components connect the environment.
Contracts define the boundary.
FST controls what counts.
```
