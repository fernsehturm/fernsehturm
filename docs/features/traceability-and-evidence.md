---
sidebar_position: 2
---

# Traceability And Evidence

FST records why a route was returned.

That evidence is what makes agent work inspectable after the fact.

## What Evidence Records

Evidence can include:

- requested action
- payload hash
- actor
- run id
- profile id, version, and hash
- gate id and type
- route
- reason and instruction
- missing artifacts
- required approval
- created artifacts
- hook input and output hashes
- materialization plan and result

## Agent Claims Are Not Enough

Invalid:

```text
The agent says the user approved.
```

Valid:

```text
An approval record exists from a trusted approval surface, scoped to the action.
```

Invalid:

```text
The agent says it ran the checks.
```

Valid:

```text
A test_run_artifact records the command, result, run id, and profile version.
```

## Replay

`fst replay show --latest` should explain:

- which profile version controlled the run
- which action was submitted
- which gate fired
- why the route was returned
- which artifacts or approvals were missing
- which evidence refs were written

Replay is not logging for curiosity. It is how FST proves the route decision was
based on controlled state.
