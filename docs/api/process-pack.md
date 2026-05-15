---
sidebar_position: 2
---

# Process Pack Manifest

`process.manifest.yaml` describes the process pack as an installable unit.

It tells FST which profile and hook files to load, which API versions the pack
targets, which capabilities the environment must provide, and which authority
boundaries must remain forbidden.

## Minimal Manifest

```yaml
process:
  id: local_patch_review
  version: 0.1.0
  display_name: Local Patch Review
  description: Control local patch review before ready-for-review.
  profile_api: fst.profile.v1
  logic_api: fst.process_logic.v1
  profile_path: profile.yaml
  hooks_path: hooks.yaml
  skill_path: skill/SKILL.md

package:
  kind: directory
  mvp_status: draft
  output_archive: generated-processes/local_patch_review-0.1.0.fstpack

requires:
  capabilities:
    - read_repo
    - inspect_diff
    - run_allowed_command
    - write_report
    - write_evidence
  materialization_modes:
    - mock

forbidden:
  capabilities:
    - modify_fst_authority_rules
    - modify_environment_permissions
  hook_outputs:
    - route
    - approval_record
    - materialization_allowed
    - profile_publication
```

## `process`

Required fields:

| Field | Type | Required | Meaning |
| --- | --- | ---: | --- |
| `id` | string | yes | Stable process id. Lowercase snake case. |
| `version` | semver string | yes | Process pack version. |
| `display_name` | string | yes | Human-readable name. |
| `description` | string | yes | One-sentence purpose. |
| `profile_api` | string | yes | Profile API version, normally `fst.profile.v1`. |
| `logic_api` | string | yes | Hook/process logic API version, normally `fst.process_logic.v1`. |
| `profile_path` | path | yes | Relative path to `profile.yaml`. |
| `hooks_path` | path | no | Relative path to `hooks.yaml` when hooks exist. |
| `skill_path` | path | no | Relative path to agent instructions. |

Rules:

- `id` and `version` together identify the installable process revision.
- Paths are relative to the pack root.
- Do not use absolute paths.
- Do not use paths that escape the pack root with `..`.

## `package`

Recommended fields:

| Field | Type | Meaning |
| --- | --- | --- |
| `kind` | `directory` or `archive` | Current pack representation. |
| `mvp_status` | string | Draft/review status for MVP packs. |
| `output_archive` | path | Expected package artifact when packed. |

`output_archive` is a draft packaging target. It is not publication.

## `docs`

Generated packs should record the trusted docs source used during generation:

```yaml
docs:
  required: true
  trusted_source:
    id: fst_developer_docs
    current_adapter: local_bundled_docs
    local_path: docs/
    future_remote_url: https://fernsehturm.dev/docs/
  required_sections:
    - profile schema
    - process manifest
    - hook manifest
    - hook result contract
    - artifact schema
    - route vocabulary
    - scenario format
    - materialization rules
```

Generated profiles must also reference the docs hash used. If the docs source
cannot be resolved, profile generation should stop.

## `requires`

`requires.capabilities` lists environment capabilities the pack expects:

```yaml
requires:
  capabilities:
    - read_repo
    - inspect_diff
    - run_allowed_command
    - write_report
    - write_evidence
```

Capabilities are not automatic permission. The environment still decides which
adapters, tools, and connectors are available.

`requires.materialization_modes` limits the modes this pack expects:

```yaml
requires:
  materialization_modes:
    - mock
    - shadow
```

For the MVP, prefer `mock` and `shadow`.

## `forbidden`

Use `forbidden` to make authority boundaries explicit:

```yaml
forbidden:
  capabilities:
    - auto_approve_profile_for_use
    - auto_publish_profile
    - modify_fst_authority_rules
    - modify_environment_permissions
  hook_outputs:
    - route
    - approval_record
    - materialization_allowed
    - profile_publication
```

Validation should reject packs that request forbidden capabilities or hooks that
return forbidden authority fields.

## `approval_for_use`

Packs that can install generated processes or approve them for use should
declare approval:

```yaml
approval_for_use:
  install_action: profile_builder.install.request
  approve_use_action: profile_builder.approve_use.request
  required_approval:
    role: workspace_admin
    scope: approve_process_profile_for_use
```

Installation and approval for use are authority decisions. Do not infer them
from chat.

## Install Contract

Install should fail before profile import when:

- manifest is missing
- `process.id` or `process.version` is missing
- API version is unsupported
- entrypoint path is missing
- path escapes the pack root
- required profile file is invalid
- hook manifest is invalid
- scenarios are missing when required by policy

Activation should fail or route to approval when:

- process version is not installed
- profile hash cannot be computed
- required approval is missing
- profile validation or scenario evidence is missing
