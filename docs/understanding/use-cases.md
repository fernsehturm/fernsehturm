---
sidebar_position: 1
---

# Use Cases

FST is useful when an agent can help with real work but should not decide its
own authority.

## Local Patch Review

The MVP process pack is `local_patch_review`.

It lets an agent inspect a local diff, evaluate process rules, create a review
packet, and mark a patch ready for review only when required artifacts exist and
blocking findings are absent.

FST can block:

- generated file changes
- secret literals
- missing diff evidence
- missing rule evaluation
- review packets without required artifacts

## Process Profile Creation

The process builder helps a domain expert create a process profile without
knowing FST YAML, hook manifests, scenario formats, or route vocabulary.

It drafts a process pack, validates it, runs scenarios, and renders a review
packet. It does not install or activate the profile without trusted approval.

## Access And Permission Workflows

Agents are good at collecting context and preparing packets. They should not
grant access because they say the request looks reasonable.

FST can require:

- requester identity
- target system
- requested role
- policy check
- approval record
- expiry

Self-approval and missing expiry can be blocked by profile gates.

## Email And External Effects

An agent may draft a reply or prepare a send queue. FST should only allow the
exact approved message to be sent.

The profile can require a draft hash, approved recipients, current approval,
and idempotency key before an SMTP materializer is allowed.

## Vendor And Operations Reviews

Many operational processes have clear inputs and review packets:

- vendor onboarding
- production data access
- security triage
- incident update drafting
- customer-data handling

FST turns these into process profiles with actions, artifacts, gates, routes,
scenarios, and review packets.

## When Not To Use FST

FST is not necessary for low-risk free-form drafting where no tool action,
approval, protected effect, or audit trail matters.

Use FST when the agent crosses a boundary:

- changes files that matter
- calls tools with consequences
- prepares a reviewable operational packet
- requests approval
- touches protected data
- writes evidence that future decisions depend on
