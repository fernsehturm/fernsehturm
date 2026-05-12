---
sidebar_position: 2
---

# Artifacts

Artifacts are typed records that can satisfy process requirements.

FST does not treat a file, chat message, or agent claim as conformance by
itself. A process-conformance gate requires a valid artifact.

## Minimum Shape

```json
{
  "artifact_id": "art_001",
  "type": "policy_check",
  "run_id": "run_001",
  "profile_version": "0.1.0",
  "created_by": "agent_001",
  "created_at": "2026-05-11T10:30:00Z",
  "payload": {},
  "valid": true
}
```

## Validity Rules

An artifact can satisfy a gate only when:

- its type matches the requirement
- required fields are present
- schema version is supported
- run id matches the controlled run
- profile version matches the controlling profile
- creator/source is allowed for that artifact type
- validation status is valid
- it is not expired, superseded, or contradicted by stronger evidence

## Common Artifact Types

Examples:

- source request
- requester identity
- diff artifact
- rule evaluation
- test run result
- review packet
- approval request
- approval record
- materialization plan
- materialization result
- completion report

Process packs define their own artifact types and required fields.

## Approval Is Stricter

Approval artifacts grant authority, so they require a trusted source.

The public agent-facing `fst.control` request must not self-declare approver
authority. Approvals enter through a trusted approval surface, such as a CLI
console or a later team approval UI.

## Artifacts In Scenarios

Scenarios exercise artifact requirements. A good scenario proves both:

- the route succeeds when the right valid artifact exists
- the route blocks, asks, or instructs when the artifact is missing or invalid
