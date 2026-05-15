---
sidebar_position: 8
---

# Lifecycle And Validation

This page defines the expected lifecycle for process packs from draft to
installed, approved use.

## Lifecycle States

```text
draft
  Files exist locally but are not installed.

validated
  Manifest, profile, hooks, schemas, and scenarios pass validation.

scenario_passed
  Required scenario suite ran successfully.

reviewed
  Review packet was rendered and accepted by the reviewer.

installed
  Pack is imported into the workspace process registry.

approved_for_use
  New runs may use this process version through its generated command or
  explicit process reference.
```

Approval for use is not the same as installation. Installation imports a pack.
Approval determines whether that installed process version may be used for new
controlled runs.

## Commands

Expected MVP commands:

```bash
fst process inspect process-packs/local_patch_review
fst process install process-packs/local_patch_review-0.1.0.fstpack
fst scenario run local_patch_review.happy_path
fst replay show --latest
```

If a process profile requires approval before use, that approval must be
recorded through the configured trusted approval path. Do not infer it from the
install command or from chat.

Workspace-aware form:

```bash
fst process install process-packs/local_patch_review-0.1.0.fstpack \
  --workspace "$HOME/fst-workspace"
```

## Validation Order

Validate in this order:

1. Manifest shape and paths.
2. Supported API versions.
3. Profile shape.
4. Action closure.
5. Artifact type references.
6. Gate references.
7. Route vocabulary.
8. Hook manifest and hook exports.
9. Hook forbidden output fields.
10. Artifact schemas.
11. Scenario presence and coverage.
12. Materialization scope fields.
13. Approval requirements for install and approval for use.

Stop on safety or authority violations.

## Pack Validation Report

Validation should produce a structured report:

```json
{
  "valid": false,
  "process_id": "vendor_onboarding",
  "process_version": "0.1.0",
  "profile_api": "fst.profile.v1",
  "logic_api": "fst.process_logic.v1",
  "diagnostics": [
    {
      "severity": "error",
      "code": "unknown_route",
      "path": "profile.yaml:gates[2].route",
      "message": "Route HumanInterventionRequired is not valid in fst.profile.v1."
    }
  ]
}
```

Diagnostics should include enough path information for an agent to repair the
pack.

## Review Packet

Before install or approval for use, render a review packet with:

- process id, version, and purpose
- docs source/hash used
- allowed actions
- blocked effects
- artifact requirements
- gates and routes
- hooks and runtime
- scenario coverage and results
- materialization modes
- risks remaining
- approval required

The review packet is human-readable evidence. It does not itself grant
authority.

## Install Rules

Install may write pack files and import profile records only when:

- manifest validates
- profile validates
- hook manifest validates, if present
- required schemas exist
- required scenarios exist
- pack hash can be computed

Install should record:

- process id/version
- profile id/version/hash
- pack hash
- install time
- installing actor
- validation report ref

## Activation Rules

Approval for use requires:

- installed process version
- valid profile hash
- passed scenario evidence, when required by policy
- trusted approval when the profile declares approval-for-use requirements

Existing runs must continue with the process id, version, and profile hash they
started with.

## Failure Modes

Fail closed when:

- selected process/profile cannot be loaded
- profile version hash does not match stored hash
- action is unknown
- route cannot be produced
- hook runtime is missing for a required hook
- hook returns invalid JSON
- hook returns forbidden authority fields
- approval record source is untrusted
- materialization preflight cannot verify scope

`error` should mean FST could not produce a trustworthy route. Ordinary gate
failure should be `nok` with a route such as `AskUser`, `InstructAgent`,
`AwaitApproval`, or `Blocked`.

## Agent Repair Loop

When validation fails, agents should repair the pack by reading diagnostics:

```text
diagnostic path -> locate file -> apply minimal fix -> rerun validation
```

Agents must not:

- remove gates to make scenarios pass
- change routes to weaker routes without process justification
- delete required scenarios
- remove docs hash requirements
- move approval into chat
- make hooks return authority

## Approval Boundary

The process-building agent may draft process authority.

Only FST validation plus trusted approval may make that authority available for
new controlled runs.
