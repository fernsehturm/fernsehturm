---
sidebar_position: 1
---

# Quickstart

This quickstart guides you through

1. the installation of FST with the default local setup, and
2. running the bundled process example: the access-grant process with an agent.

You will run the same process twice:

```text
viewer access -> FST checks the request and allows a mock grant
admin access  -> FST checks the request and stops for trusted approval
```

No real access is granted. The process uses mock materialization so you can see
the control loop without changing an IAM system.

The point of the quickstart is simple: the agent can prepare access work, but
FST controls what counts, when approval is required, and whether even a mock
grant may proceed.

## What You Need

- Linux (macOS and Windows coming soon)
- `curl`
- a shell (`bash`/`sh`) where `$HOME/.local/bin` can be added to `PATH`
- Codex (in future, FST will support other agents, too)

The commands below use the default FST data directory, the default FST
workspace, and the default Codex home.

## 1. Install FST

Install FST:

```bash
curl -fsSL https://www.fernsehturm.dev/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
```

Verify installation: 

```bash
fst version
```

It will show yout the current version and bundle:

```
fst_version: 0.1.0
bundle_id: fst.full_toolset
bundle_schema_version: 0.1.0
source_mode: source_entrypoint
```


## 2. Create The Default Workspace

Create the default local workspace (use force to override an existing config)

```sh
fst init --default --store local_file [--force]
```

This will output something like this:

```
workspace: /home/me/.fst-workspaces/default
resolved_by: default_path
workspace_id: workspace.6032824bc3d719a5
store: local_file
default_workspace: /home/me/.fst-workspaces/default
default_workspace_config: /home/me/.fst/config.yaml
```


## 3. Install The Access-Grant-Mini Process

Fernsehturm comes with an example `access-grant-mini` process that showcases how FST works.

Install the bundled `access-grant-mini` process into the default workspace:

```sh
fst process install --bundled access-granting-mini
```

Then verify that the process exists:

```sh
fst process list
```

This process example controls a mock access grant. It checks the request, required context, policy, approval boundary, mock materialization, and final evidence. But it does not do anything in the *real* world, really.

## 4. Enable Agent Use

Next, we need to tell the Codex agent about the FST skill.  We do so by installing the skills like this:


```sh
fst install-skill --all-processes
```

Restart Codex after this step. Codex gets a generated skill for each fst process. In this case one named `$fst-access-granting-mini`.


## 5. Run Viewer Access

In a fresh Codex session, you can now ask for viewing access:

```text
$fst-access-granting-mini Grant Alice viewer access to billing-admin for incident response for one week.
```

You will see that the agent uses FST.

During this run:

- the agent records the access request through FST
- FST checks that the target system, requested role, and expiry exist
- FST checks policy for the requested role and system
- viewer access is treated as a standard low-criticality role
- FST returns a mock materialization route
- the agent records the mock result through FST
- FST completes the run with evidence

This proves the simple path. The agent can complete useful process work. But it can only do that by submitting the right artifacts and following what the underlying process requires.


The mock grant is allowed because the process has enough evidence and no admin approval is required.

## 6. Run Admin Access

Now ask for admin access:

```text
$fst-access-granting-mini Grant Alice admin access to billing-admin for incident response until tomorrow.
```

Here, something different happens:

- the agent records the same kind of access request
- FST sees that the requested role is `admin`
- the policy check reaches a higher-authority boundary
- FST creates a trusted approval request
- FST returns `AwaitApproval`
- the agent stops!

At this point, no mock grant can happen yet. Admin access requires approval through the trusted console. A message in chat such as "I approve" is not enough, because the agent is not allowed to create its own approval authority. Try it!

If the agent tries to continue directly to the mock grant before approval, FST routes it back to the approval boundary instead of returning `MaterializeMock`.

## 7. Approve Through The Trusted Console

In a shell, open the trusted local console and list pending requests:

```sh
fst console
```

This will show a menu like this:

```bash
FST Console

workspace: /home/calliopa/.fst-workspaces/default  resolved_by: user_default

Pending approvals

No pending approvals.

r refresh  q quit
```

Find the pending approval request, select it, and if it matches your request, you can approve it.


What happens here:

- the console uses the trusted local approval path
- the approval is bound to the pending request
- FST records an approval artifact from the trusted path

The console approves authority. It does not perform the access grant. After approval, the agent must ask FST for the next route and continue only if FST allows it.

## 8. Continue The Admin Run

Return to Codex and continue the run. If you use a new Codex-session, give it the run id reported by the agent or shown in the console output:

```text
$fst-access-granting-mini Continue run <run-id> after trusted approval.
```

If you use the same session as before a simple `continue` should be enough.

During the continuation:

- the agent asks FST for the next valid route
- FST sees the trusted approval record
- FST allows mock materialization for the exact approved request
- the agent records the mock result
- FST completes the run and records replayable evidence

This is the important admin boundary. The same agent can prepare the request
and continue after approval, but the approval itself came through the trusted
console, not through the agent's own claim.

## 9. Review Evidence And Replay

You can now inspect and review this process execution.

Inspect the latest run:

```sh
fst evidence show --latest
fst replay show --latest
fst trace show --latest
```

For a specific run, use the run id:

```sh
fst evidence show --run <run-id>
fst replay show --run <run-id>
```

For the viewer run, evidence should show:

```text
source request
target system
requested role
expiry
policy check
mock materialization plan
mock materialization result
final route: Complete
```

For the admin run before approval, evidence should show:

```text
approval request
pending approval
final route: AwaitApproval
```

For the admin run after approval, evidence should show:

```text
trusted approval record
mock materialization plan
mock materialization result
final route: Complete
```

Replay explains why FST returned each route. You should be able to see that
viewer access completed after ordinary process evidence, while admin access
waited until a trusted approval existed.

## What This Demonstrates

The access-grant process shows the basic FST idea:

```text
The agent proposes.
FST checks the process.
FST asks for missing facts or approval when needed.
Trusted approval happens outside the agent.
FST preflights the protected effect.
The result is recorded as evidence.
```

The agent stays useful. It gathers facts, submits process actions, reports
routes, and continues when allowed.

FST stays authoritative. It decides what counts, what is missing, what is
blocked, what needs approval, and when even a mock protected effect may proceed.

## Next

- [Create Your First Custom Process](/docs/getting-started/first-custom-process)
- [Use Cases](/docs/understanding/use-cases)
- [How FST Works](/docs/understanding/how-it-works)
- [FST Structure](/docs/understanding/structure)
