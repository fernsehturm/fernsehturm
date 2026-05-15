---
sidebar_position: 6
---

# Hook API

Hooks are process-owned logic called by FST. They compute facts, validate
artifacts, or render templates.

Hooks must not decide routes or grant authority.

## Hook Manifest

`hooks.yaml` declares the runtime and exported hooks:

```yaml
runtime:
  id: local_patch_review_python
  kind: python_stdio
  command:
    - python3
    - logic/python/main.py
  timeout_ms: 5000

contract:
  input_protocol: fst.hook.call.v1
  output_protocol: fst.hook.result.v1
  forbidden_output_fields:
    - route
    - approval_record
    - materialization_allowed
    - profile_publication
  allowed_output_fields:
    - status
    - valid
    - facts
    - diagnostics
    - artifacts
    - rendered

hooks:
  - id: validate_generated_profile
    type: artifact.validate
    input_artifact_type: profile_draft_artifact
    description: Check generated profile structure.
```

## Runtime

MVP runtime kinds:

```text
python_stdio
js_ts_stdio
```

The runtime command is relative to the process pack root. It should not require
ambient FST secrets or direct store access.

Timeout is mandatory:

```yaml
timeout_ms: 5000
```

## Hook Types

| Type | Purpose | May produce |
| --- | --- | --- |
| `condition.evaluate` | Compute facts used by gate conditions. | facts, diagnostics |
| `artifact.validate` | Validate artifact payloads. | valid flag, diagnostics, facts |
| `template.render` | Render review packets or reports. | rendered content, diagnostics |

## Hook Call Shape

Runtime hosts should call hooks with JSON records:

```json
{
  "protocol_version": "fst.hook.call.v1",
  "hook_id": "validate_scenario_coverage",
  "run_id": "run_001",
  "profile_id": "process_profile_builder",
  "profile_version": "0.1.0",
  "input_artifact_type": "scenario_suite_artifact",
  "payload": {
    "scenario_ids": ["happy_path", "approval_for_use_requires_approval"]
  }
}
```

## Hook Result Shape

Valid result:

```json
{
  "status": "ok",
  "valid": true,
  "diagnostics": [],
  "facts": {
    "missing": []
  }
}
```

Invalid artifact:

```json
{
  "status": "ok",
  "valid": false,
  "diagnostics": [
    "missing required scenario: idempotency_replay"
  ],
  "facts": {
    "missing": ["idempotency_replay"]
  }
}
```

Hook failure:

```json
{
  "status": "error",
  "valid": false,
  "diagnostics": [
    "hook timeout"
  ]
}
```

## Forbidden Output

Hooks must not return:

```text
route
approval_record
materialization_allowed
profile_publication
```

If a hook returns any forbidden authority field, FST should reject the hook
result and route according to the selected process profile, usually `Blocked`
or `InstructAgent`.

## Stdio Protocol

For `python_stdio` and `js_ts_stdio`, use one JSON object per line:

```text
stdin:  {"hook_id":"validate_process_model","payload":{...}}
stdout: {"status":"ok","valid":true,"diagnostics":[],"facts":{}}
```

Rules:

- stdout must contain valid JSON lines
- stderr may be captured for diagnostics
- no direct store handle is provided
- no approval API is provided
- no materialization API is provided
- timeout failure must be deterministic

## Evidence

FST should record:

- hook id
- runtime id and kind
- entrypoint hash when available
- input hash
- output hash
- diagnostics
- failure status

Replay should show hook metadata without treating hook output as authority.
