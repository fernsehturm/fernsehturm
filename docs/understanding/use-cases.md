---
sidebar_position: 1
---

# FST Use Cases

This page explains what FST is for by starting with the problems it is meant to
solve.

It is not a setup guide. If you want to install FST and run your first task,
start with the [Quickstart](../getting-started/quickstart.md).

## Use-Case Map

| Use case | Main pain point | Best next read |
| --- | --- | --- |
| [Keeping growing code controllable](#1-keeping-growing-code-controllable) | Requirements, decisions, checks, and code drift apart as the system grows. | [Keep Systems Consistent as They Grow](/blog/keep-systems-consistent-as-they-grow) |
| [Safe experimentation](#2-safe-experimentation) | Plausible experiments quietly become product reality because they compile or pass tests. | [Compare Alternatives Before You Choose](/blog/compare-alternatives-before-you-choose) |
| [Changeable product development](#3-changeable-product-development) | Old assumptions remain hidden when product direction changes. | [Make Changes Without Breaking Everything](/blog/make-changes-without-breaking-everything) |
| [Massive parallel agent development](#4-massive-parallel-agent-development) | Separate agent outputs pass locally but conflict when combined. | [FST Comparisons](./comparisons.md#fst-vs-orchestrators) |
| [Traceable vertical-slice delivery](#5-traceable-vertical-slice-delivery) | Fast slices lose the line from product intent to implementation proof. | [Give AI a System It Can Reason About](/blog/give-ai-a-system-it-can-reason-about) |
| [Completeness and backlog awareness](#6-completeness-and-backlog-awareness) | Agent work leaves unclear coverage, deferred checks, blockers, and unknowns. | [What Happens When FST Blocks Work](/blog/what-happens-when-fst-blocks-work) |
| [Controlled alternatives and decisions](#7-controlled-alternatives-and-decisions) | Product alternatives collapse into one accidental branch of truth too early. | [Compare Alternatives Before You Choose](/blog/compare-alternatives-before-you-choose) |
| [Cleaner user-agent interaction](#8-cleaner-user-agent-interaction) | Users get asked too much trivia and too few meaningful decisions. | [When Does FST Interrupt You?](/blog/when-does-fst-interrupt-you) |

For the mechanism behind these use cases, read [How FST Works](./how-it-works.md).
For a concrete walkthrough, read the [Session Expiry Demo](../fst-in-action/demo.md).

## 1. Keeping Growing Code Controllable

As a system grows, the connection between why something exists and what the code
does tends to dissolve. Requirements move into chats, decisions hide in pull
requests, and tests prove behaviour without always showing who asked for it.

FST addresses this by keeping work connected to its reason. A change is not just
a diff. It is tied to the goal, the affected behaviour, the concrete
implementation, the verification that was expected, and the evidence that was
observed.

The important parts are:

- [Exploration](../features/control-loop.md) to identify what the task touches
- trace links between purpose, behaviour, implementation, verification, and
  evidence
- [Compose](../features/control-loop.md) to check whether the proposed work
  still holds together with the rest of the selected system world

The result is a codebase whose growth leaves a map behind. Reviewers can ask
why a change exists, what behaviour it claims to support, and what evidence
backs it.

## 2. Safe Experimentation

AI agents make experimentation cheap. That is useful until experiments quietly
become part of the working system just because they compiled, passed tests, or
were left in a branch.

FST treats exploratory and candidate work as controlled work, not as automatic
truth. An agent can investigate, prototype, and propose alternatives, but the
work must still be checked before it becomes part of a coherent result.

The important parts are:

- a controlled task boundary before implementation starts
- candidate work that can be evaluated without becoming globally accepted
- composition checks that decide whether a proposed combination of work is
  coherent
- materialization as an explicit projection of checked work into files or other
  output

This gives teams room to try ideas without letting every plausible idea leak
into the product.

## 3. Changeable Product Development

Products change. The risk is not change itself; the risk is that old assumptions
stay implicit while new work builds on top of them.

FST keeps choices and constraints visible. Decisions, policies, contracts,
coverage, and evidence make it easier to see what a new direction affects. When
a product choice changes, FST can show which behaviours need revalidation, which
checks may be stale, and which previous decisions may need to be replaced.

The important parts are:

- recorded decisions for product choices
- policies for constraints the system must honour
- contracts for promises shared across parts of the system
- coverage and evidence that can become stale when the underlying claim changes

This turns product evolution into explicit revision work instead of implicit
legacy drift.

## 4. Massive Parallel Agent Development

It is easy to start several agents at once. It is harder to make their results
converge.

Two agents can both produce useful work and still conflict. They may choose
different behaviours, touch the same implementation surface, rely on different
domain meanings, or make incompatible policy choices.

FST addresses this by letting agents create separate candidate work and then
bringing that work together at composition time. The question is not only
whether each agent's branch passes tests. The question is whether the selected
candidate work forms one coherent possible system.

The important parts are:

- separate candidate work packages for separate agent efforts
- revision-pinned references so each result is reproducible
- composition checks for decision conflicts, contract conflicts, policy
  conflicts, coverage gaps, and implementation target conflicts
- findings that explain why a combination does or does not hold together

This makes parallel work safer than ordinary merge-by-files workflows because
the convergence point checks meaning, not only text.

## 5. Traceable Vertical-Slice Delivery

Vertical slices help teams move quickly. The danger is that the slice becomes
only an implementation slice: code and tests without a clear line back to the
user goal or system behaviour.

FST keeps the slice traceable across levels. A useful slice can connect the
reason for the change to the behaviour it changes, the implementation material,
the checks that should prove it, and the observations from those checks.

The important parts are:

- intent or goal records for why the work exists
- behaviour records for observable system changes
- implementation records for concrete material such as code, patches, schemas,
  or configuration
- verification and observation records for proof definitions and check results

This lets teams deliver quickly while still preserving the path from purpose to
proof.

## 6. Completeness And Backlog Awareness

Agent work can produce a lot of local progress while leaving uncertainty about
what is actually done. Some goals are covered, some are partially covered, some
are blocked, and some are still only assumptions.

FST makes that state visible. Coverage, blockers, deferred checks, stale
evidence, and unresolved decisions are part of the work record instead of being
spread across prompts and review comments.

The important parts are:

- coverage records for required claims
- blockers for missing decisions, missing evidence, or unresolved conflicts
- observations that show what was actually checked
- findings that explain why work cannot move forward yet

This gives the project a live picture of what is solved, what remains open, and
where further discovery is needed.

## 7. Controlled Alternatives And Decisions

Software projects often need alternatives to coexist. One version may choose
email-only reset. Another may explore SMS reset. A third may test an admin reset
flow. Treating one branch as global truth too early makes this harder.

FST keeps alternatives as separate possible worlds. Different compositions can
hold different decisions, different candidate work, and different revisions.
They do not conflict simply because they exist. They conflict only when one
selected world includes incompatible effective choices.

The important parts are:

- composition-scoped decisions
- explicit policies and policy exceptions
- contracts for shared promises across alternatives
- immutable revisions so older evaluated worlds remain reconstructable

This supports branching product direction without pretending that every
experiment has already become the product.

## 8. Cleaner User-Agent Interaction

The best user-agent interaction is not a long form, and it is not a free-running
agent that asks for approval after the fact.

The user defines the goal, scope, constraints, and verification expectations.
The agent works inside that boundary. FST interrupts when a decision matters:
ambiguity, conflict, scope expansion, missing evidence, policy risk, or output
authorization.

The important parts are:

- setup prompts that ask for product choices in product language
- recorded user decisions instead of agent summaries of approval
- blockers that explain what must be resolved before work can move on
- final reports that show what changed, what evidence exists, and what remains
  unresolved

This keeps the user in control of meaningful choices while leaving ordinary
implementation work to the agent.

## What To Read Next

For practical setup, go to [Getting Started](../getting-started/overview.md).
For the control flow, read [How FST Works](./how-it-works.md). For concrete
examples, see [FST In Action](../fst-in-action/demo.md). For the model
reference, see [The FST Model](../concepts/01_the-model.md).
