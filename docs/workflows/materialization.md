---
sidebar_position: 2
---

# Materialization

Materialization projects a coherent Composition into concrete output: workspace files, patches, generated directories, migration folders, or deployment targets.

Materialization is not a fourth FST stage. It happens after Compose when there is a checked possible world to project.

## The Rule

Persistent materialization starts from a pinned coherent Composition:

```text
Composition@revision → target sink → recorded result
```

Do not think of materialization as:

```text
write whatever is latest
apply all accepted changes
dump the current Candidate
trust whatever is in the workspace
```

Those inputs are not reproducible.

## What You May Be Asked

FST may ask you before writing concrete output when the write affects risk, policy, or recoverability:

- Write directly to the current workspace or emit a patch?
- Apply a migration or only generate it?
- Delete files or leave deletions as patch output?
- Materialize one Composition or compare two in separate sinks?

Your answer authorizes the write mode. It does not retroactively approve missing Build or Compose evidence.

## Temporary vs Persistent

Agents may temporarily materialize files during Exploration, Build, or Compose to test an idea.

**Temporary materialization:**
- is an execution technique
- does not make anything effective
- does not satisfy a gate by itself

**Persistent materialization:**
- starts from a coherent Composition
- writes to a named sink
- records success or failure
- can be followed by Observations from checks

## Preconditions

Before persistent materialization, FST should know:

- which Composition revision is being materialized
- that the Composition is coherent
- which target sink receives the output
- that required materialization-specific user input is satisfied
- that the target sink still matches the expected base version

## What A Materialization Result Records

A useful materialization record says:

- which Composition revision was projected
- which target sink was used
- which write mode was used
- whether it succeeded
- what artifact, patch, or file set was produced
- what failed if it did not succeed

Materialization failure does not automatically mean the Composition is incoherent. It means the coherent world was not successfully projected into that sink.

## Mental Model

```text
Compose proves the pinned world holds together.
Materialization projects that world into concrete output.
Observations record what happened when that output was checked.
```

For the full API reference, see [API Reference](../concepts/04_api.md).
