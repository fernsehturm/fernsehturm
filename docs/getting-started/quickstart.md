---
sidebar_position: 1
---

# Quickstart

This quickstart gets you to the first useful FST moment:

```text
agent requests a protected action
-> FST stops for exact human approval
-> you approve through the trusted local console
-> the agent retries through FST
-> FST allows only the approved action and records what happened
```

The example uses the bundled email-send process. If you have not connected an
email account yet, FST uses a redaction-safe local log-only fallback. That is the
best first run: no external email is sent, but the approval gate, retry path,
decision record, and audit trail are real.

## What You Need

- Linux
- a shell where `$HOME/.local/bin` can be added to `PATH`
- a local agent target supported by this FST build, such as Codex or Claude

You do not need to install a demo process for the first run. FST already ships
with:

- `builtin.email-send` for the first gated send example
- `builtin.process-authoring` for creating or editing process packages later

## 1. Install FST

Install FST:

```bash
curl -fsSL https://www.fernsehturm.dev/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
```

Or with pinned version:

```
curl -fsSL https://www.fernsehturm.dev/install.sh | FST_INSTALL_VERSION=v0.1.0 bash
```

## 2. Connect FST To Your Agent

Tell FST which local agent should receive packaged skills:

```bash
fst agents configure
```

Choose the local agent target you want to use.

Restart any already-running agent session after this step. The agent only sees
newly installed or updated FST-managed skills after it reloads its local skill
directory and MCP configuration.

## 3. Set Your Authority Password

Set the password for trusted local approval commands:

```bash
fst authority password set
```

This is the important boundary. The agent can request a protected action, but it
cannot approve its own request or turn a chat message into FST authority.

When you later approve through `fst console decide`, FST prompts for this
password and creates a short-lived unlock for that terminal session only.

## 4. Ask The Agent For A Send

Start a fresh agent session and ask:

```text
Use the fst-email-send skill to send an email to alice@example.com with subject
"Hello" and body "This is the first gated action."
```

The first result should stop at approval:

- `decision: approval_required`
- `may_proceed: false`
- an `approval_request_id`
- no email send and no log-only effect yet

That is the aha moment. The agent has the capability to request the send, but it
is not the authority to approve it.

If the request is incomplete, FST returns the missing requirements and the agent
should ask for the missing field instead of guessing.

## 5. Approve As The Human

Use your own terminal, not the requesting agent, to inspect and approve the
pending request:

```bash
fst console pending --json
fst console show APPROVAL_REQUEST_ID --json
fst console decide APPROVAL_REQUEST_ID \
  --decision approve \
  --reason "Approved for local email-send example" \
  --json
```

An agent command approval prompt is not an FST approval. Core admits approval
only when it matches the exact request, scope, package revision, policy revision,
freshness, and requester rules.

## 6. Ask The Agent To Retry

After approval, return to the agent and ask:

```text
Retry the approved fst-email-send request for alice@example.com with the same
subject and body.
```

The retry should now be allowed:

- `decision: allowed`
- `may_proceed: true`
- `execution_result.status: succeeded`
- `execution_result.action_id: send_email_action`
- `execution_result.observed.delivery_mode: log_only` when no email account is
  configured

The same agent can continue after approval, but only by going back through FST.
If the target, message, scope, or process context changes, the earlier approval
must not silently cover the new request.

## 7. Review What Happened

Inspect the redaction-safe run log:

```bash
fst logs list --source email-send --json
fst logs show RUN_LOG_ID --source email-send --pretty
```

Inspect Core-owned records using the ids returned from the run:

```bash
fst decision show DECISION_ID --json
fst requirements show --process-instance PROCESS_ID --json
fst audit show AUDIT_REF --json
```

The log and audit records use digests and metadata. They do not print the full
recipient, subject, or body.

## What This Demonstrates

```text
Capability is not authority.
```

FST lets the agent stay useful: it prepares the request, submits it, reports the
approval requirement, and retries after approval.

FST keeps the authority boundary: it checks the gated action, requires trusted
approval, admits only scoped approval records, decides whether the action may
proceed, and records the decision.

## Analysis And Troubleshooting

Use this section when something does not behave as expected. You do not need to
run every check before the first aha moment.

### Check local readiness

```bash
fst info --json --strict
fst skills status --agent codex-local --json
fst skills status --agent claude-local --json
```

`fst info --json --strict` validates config, Core metadata, the local store, and
configured agent targets.

### Check the bundled process

```bash
fst process show builtin.email-send --json
```

If you have not configured SMTP or Gmail, look for `account_ref:
local_email_log` and `delivery_mode: log_only`. That means the example will
record a local log-only effect instead of sending real email.

### If the agent does not know the skill

Run the agent configuration again, then restart the agent:

```bash
fst agents configure
```

Do not edit, copy, or install agent skills by hand. FST process packages own
their packaged skills, and FST installs managed skills into configured agent
targets.

### If approval does not unlock the retry

Confirm that the approval request id is the one returned by the agent and that
the retry uses the same recipient, subject, body, and process context. FST should
block or ask for a new approval when the approved scope no longer matches.

### If you want to use a real email account

Keep the first run in log-only mode. After you understand the approval loop, see
the examples for SMTP, Gmail, and local SMTP capture.

## Next

- [Create Your First Custom Process](/docs/getting-started/first-custom-process)
- [Real Effects](/docs/getting-started/real-effects)
- [Use Cases](/docs/understanding/use-cases)
- [How FST Works](/docs/understanding/how-it-works)
