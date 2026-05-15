import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './compare.module.css';

type Principle = {
  title: string;
  body: string;
};

type QuestionPair = {
  existing: string;
  fst: string;
};

type ToolComparison = {
  name: string;
  category: string;
  does: string;
  boost: string;
  blogPath: string;
};

type FlowStep = {
  title: string;
  body: string;
};

const principles: Principle[] = [
  {
    title: 'Capability is not authority',
    body: 'An agent may be able to call a tool, draft a change, or request a deployment. FST decides whether that step is allowed inside the active process.',
  },
  {
    title: 'Keep the tools that do the work',
    body: 'Agent frameworks, workflow tools, MCP servers, and chat gateways remain useful. FST gives them controlled runs, gates, approvals, and evidence.',
  },
  {
    title: 'Trust comes before the effect',
    body: 'Observability can explain what happened. FST checks scope, artifacts, approvals, and preflight before protected work is allowed to count.',
  },
];

const questionPairs: QuestionPair[] = [
  {
    existing: 'Agent frameworks ask: how should the task be done?',
    fst: 'FST asks: is this process step valid?',
  },
  {
    existing: 'Workflow tools ask: what runs next?',
    fst: 'FST asks: what must be true before progress counts?',
  },
  {
    existing: 'MCP exposes: which tools are available?',
    fst: 'FST checks: is this tool use authorized in this run?',
  },
  {
    existing: 'Observability asks: what happened?',
    fst: 'FST asks: was it allowed before it happened?',
  },
];

const tools: ToolComparison[] = [
  {
    name: 'Plain agents',
    category: 'Codex, Claude, Gemini, Kimi, opencode',
    does: 'Plain agents reason, draft, inspect systems, write code, and request tool calls.',
    boost:
      'FST makes their work more trustworthy by giving them official run state, scoped authority, required gates, typed artifacts, approval checks, and replayable evidence.',
    blogPath: '/blog/fst-with-plain-agents',
  },
  {
    name: 'LangGraph',
    category: 'Stateful agent graphs',
    does: 'LangGraph gives agents durable graph execution, checkpoints, and structured paths through complex tasks.',
    boost:
      'FST makes LangGraph stronger by acting as the process authority at graph checkpoints. A graph node can ask FST what is missing before the graph advances or touches a protected system.',
    blogPath: '/blog/fst-with-langgraph',
  },
  {
    name: 'CrewAI',
    category: 'Multi-agent crews and flows',
    does: 'CrewAI coordinates agents, tasks, roles, and flows so multiple agents can collaborate on work.',
    boost:
      'FST makes crews safer by providing shared process state and gatekeeping across agents. A crew can submit work, while FST decides whether the evidence satisfies the process.',
    blogPath: '/blog/fst-with-crewai',
  },
  {
    name: 'n8n and workflow tools',
    category: 'Triggers, integrations, handoffs, app actions',
    does: 'Workflow tools move data between systems, react to triggers, run automations, and execute app actions.',
    boost:
      'FST makes workflow automation more trustworthy by checking whether an agent-generated artifact, approval, or protected effect is ready before the workflow executes the action.',
    blogPath: '/blog/fst-with-n8n-and-workflow-tools',
  },
  {
    name: 'MCP and tool layers',
    category: 'Tools, resources, prompts, adapters',
    does: 'MCP lets agents discover and call tools through a common interface.',
    boost:
      'FST can expose MCP tools, but the value is behind the interface: profile lookup, gate evaluation, scope authorization, approval validation, evidence writes, and replay.',
    blogPath: '/blog/fst-with-mcp-and-tool-layers',
  },
  {
    name: 'Chat gateways',
    category: 'OpenClaw, chat channels, assistant gateways',
    does: 'Chat gateways connect users to assistants through Slack, Teams, Telegram, WhatsApp, or other channels.',
    boost:
      'FST makes chat-driven work trustworthy by preventing a message from automatically becoming authority. Messages can become requests or approval candidates only when the process validates them.',
    blogPath: '/blog/fst-with-chat-gateways',
  },
  {
    name: 'Observability',
    category: 'Logs, traces, monitoring, run inspection',
    does: 'Observability tools help teams understand what happened after systems and agents ran.',
    boost:
      'FST complements observability by controlling what is allowed before it happens, then producing process evidence that logs and audits can reference afterward.',
    blogPath: '/blog/fst-with-observability',
  },
  {
    name: 'Memory systems',
    category: 'Context, recall, knowledge, long-running work',
    does: 'Memory systems help agents remember facts, preferences, prior messages, and task context.',
    boost:
      'FST makes memory process-relevant by maintaining official run state: active profile, satisfied gates, missing evidence, approvals, scopes, routes, and next allowed action.',
    blogPath: '/blog/fst-with-memory-systems',
  },
];

const flowSteps: FlowStep[] = [
  {
    title: '1. Trigger',
    body: 'A user, agent, webhook, ticket, chat message, or workflow starts controlled work.',
  },
  {
    title: '2. Execute',
    body: 'Your agent framework or workflow tool drafts, gathers, reviews, and coordinates the work.',
  },
  {
    title: '3. Check',
    body: 'FST evaluates the active profile, current run state, scopes, artifacts, gates, and approvals.',
  },
  {
    title: '4. Authorize',
    body: 'FST returns the next valid route, asks for missing evidence, blocks progress, or allows materialization.',
  },
  {
    title: '5. Prove',
    body: 'The run keeps evidence and replay so the team can understand why the work was trusted.',
  },
];

function PrincipleSection() {
  return (
    <section className={styles.principle}>
      <div className="container">
        <div className={styles.principleGrid}>
          {principles.map((principle) => (
            <div className={styles.principleItem} key={principle.title}>
              <strong>{principle.title}</strong>
              <span>{principle.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitSection() {
  return (
    <section className={styles.split}>
      <div className="container">
        <div className={styles.splitGrid}>
          <div className={styles.sectionIntro}>
            <Heading as="h2">FST is the control point, not the worker.</Heading>
            <p>
              Use whatever agent or workflow system you like. FST gives it a
              persistent, enforceable process to work inside.
            </p>
          </div>
          <div className={styles.questionList}>
            {questionPairs.map((pair) => (
              <div className={styles.questionRow} key={pair.existing}>
                <strong>{pair.existing}</strong>
                <span>{pair.fst}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolSection() {
  return (
    <section className={styles.tools}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <Heading as="h2">How FST complements the tools you already use</Heading>
          <p>
            FST does not compete on model quality, workflow integrations, chat
            channels, or generic tool exposure. It makes those systems more
            useful for process-sensitive work by separating capability from
            authority.
          </p>
        </div>
        <div className={styles.toolGrid}>
          {tools.map((tool) => (
            <article className={styles.toolCard} key={tool.name}>
              <Heading as="h3">{tool.name}</Heading>
              <p className={styles.toolMeta}>{tool.category}</p>
              <p className={styles.toolText}>{tool.does}</p>
              <p className={styles.toolBoost}>
                <strong>How FST makes it stronger:</strong> {tool.boost}
              </p>
              <Link className={styles.toolLink} to={tool.blogPath}>
                Read the detailed post
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowSection() {
  return (
    <section className={styles.flow}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <Heading as="h2">The combined stack</Heading>
          <p>
            Agents do the work. Workflow tools move it. MCP exposes interfaces.
            FST controls what counts.
          </p>
        </div>
        <div className={styles.flowSteps}>
          {flowSteps.map((step) => (
            <div className={styles.flowStep} key={step.title}>
              <strong>{step.title}</strong>
              <span>{step.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Compare(): ReactNode {
  return (
    <Layout
      title="Compare FST"
      description="FST complements agent frameworks, workflow tools, MCP, chat gateways, observability, and memory by adding process authority, gates, approvals, evidence, and preflight.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>Compare FST</p>
                <Heading as="h1" className={styles.heroTitle}>
                  FST does not replace your agent stack. It makes it trustworthy.
                </Heading>
                <p className={styles.heroSub}>
                  Agent frameworks run agents. Workflow tools move work between
                  systems. MCP exposes tools, resources, and prompts. Chat
                  gateways connect users to assistants. FST controls the process
                  the agent is working inside.
                </p>
                <div className={styles.heroActions}>
                  <Link className={styles.primaryCta} to="/docs/getting-started/quickstart">
                    Try the quickstart
                  </Link>
                  <Link className={styles.secondaryCta} to="/pricing">
                    See pricing
                  </Link>
                </div>
              </div>
              <figure className={styles.heroImageWrap}>
                <img
                  className={styles.heroImage}
                  src="/img/compare.png"
                  alt="Agents comparing work across systems with a trusted approval path"
                />
              </figure>
            </div>
          </div>
        </section>

        <PrincipleSection />
        <SplitSection />
        <ToolSection />
        <FlowSection />

        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaBox}>
              <Heading as="h2">Use the best tool for the work. Use FST for what counts.</Heading>
              <p>
                FST is strongest when agents are useful enough to touch real
                workflows, but the team needs scoped authority, trusted evidence,
                valid approvals, and preflight before protected effects.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryCta} to="/blog">
                  Read detailed posts
                </Link>
                <Link className={styles.secondaryCta} to="/docs/features/control-loop">
                  Explore the control loop
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
