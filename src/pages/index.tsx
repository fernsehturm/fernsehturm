import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const heroDialogue = {
  developer: [
    'Can you get me a 4K monitor?',
    'Use my purchase process.',
  ],
  agent: [
    'I found one.',
    'The purchase request is ready to submit.',
  ],
  agentRepair: [
    'Approval packet ready.',
    'Waiting for CLI approval.',
  ],

  fst: [
    'Orders above $50 need real approval',
  ],
  fstOrder: [
    'Approval matches the packet.',
    'Ordering this exact item now.',
  ],
  developerAccept: [
    'Approved in CLI.',
    'Submit this exact request.',
  ],

};

const consoleGroups = [
  {
    speaker: 'User',
    tone: 'developer',
    icon: '/img/bob-icon.png',
    lines: [
      '/fst buy me a 4K monitor, around $400, for design work',
    ],
  },
  {
    speaker: 'Agent',
    tone: 'agent',
    icon: '/img/codey-icon.png',
    lines: [
      'purchase_request_ready',
    ],
  },
  {
    speaker: 'Fernsehturm',
    tone: 'fst',
    icon: '/img/fst-icon.png',
    lines: [
      'BLOCKED: missing approval',
      'NEXT: create exact approval packet',
    ],
  },
  {
    speaker: 'Agent',
    tone: 'agent',
    icon: '/img/codey-icon.png',
    lines: [
      'approval_packet_created:',
      'id: purchase_request_482',
      'item: 4K monitor',
      'vendor: Dell',
      'amount: $399',
      'reason: design work',
    ],
  },
  {
    speaker: 'User',
    tone: 'developer',
    icon: '/img/bob-icon.png',
    lines: [
      'fst approve purchase_request_482',
      '--item "4K monitor"',
      '--amount "$399"',
    ],
  },
  {
    speaker: 'Fernsehturm',
    tone: 'fst',
    icon: '/img/fst-icon.png',
    lines: [
      'MATERIALIZE_ALLOWED: approval matched',
      'ORDER_PLACED: Dell 4K monitor',
      'evidence: order id recorded',
    ],
  },
];

const features = [
  { title: 'Your process becomes executable', description: 'Turn a personal or company workflow into actions, gates, approvals, evidence, and protected outcomes.', link: '/docs/features/process-packs' },
  { title: 'The agent gets the next valid step', description: 'Fernsehturm tells the agent what is missing, what it may do next, and when it must ask or wait.', link: '/docs/getting-started/agents' },
  { title: 'Protected work cannot skip control', description: 'Submitting, ordering, sending, merging, or marking work complete can require approval and evidence before it counts.', link: '/docs/fst-in-action/demo' },
  { title: 'The run is replayable', description: 'Fernsehturm keeps state, artifacts, routes, approvals, and evidence so the work can be reviewed, resumed, or audited.', link: '/docs/features/traceability-and-evidence' },
];

const painPoints = [
  {
    title: 'Prompting is not control',
    description: 'A prompt can tell an agent to follow rules, but it cannot prove the rules were followed or stop a protected action when the agent skips ahead.',
  },
  {
    title: 'Context gets lost',
    description: 'Long tasks, restarts, handoffs, and tool calls make agents lose track of the current stage, missing facts, approvals, and required evidence.',
  },
  {
    title: 'Tool access becomes too much authority',
    description: 'Once an agent can send, order, merge, delete, or change systems, "be careful" is not enough. The process has to decide when action is allowed.',
  },
  {
    title: 'Done is self-certified',
    description: 'Agents can say the work is complete, but users and organizations need artifacts, approvals, route decisions, and replay before they can trust it.',
  },
];

function WhatIsSection() {
  return (
    <section className={styles.whatIs}>
      <div className="container">
        <Heading as="h2">What is Fernsehturm?</Heading>
        <p className={styles.whatIsIntro}>
          Fernsehturm is the process runtime between your agent and the work it wants to make count.
        </p>
        <p className={styles.whatIsIntro}>
          You define the process: allowed actions, required facts, approvals, gates, and valid outcomes. Fernsehturm guides the agent through that process, enforces the rules, and records what happened.
        </p>
        <ul className={styles.featureList}>
          {features.map(({title, description, link}) => (
            <li key={title}>
              <Link className={styles.featureItemLink} to={link}>
                <span className={styles.bullet}>[*]</span>
                <span className={styles.featureTitle}>{title}</span>
                <span className={styles.featureDesc}>{description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className={styles.readDocs} to="/docs/intro">
          Read docs →
        </Link>
        <p className={styles.whatIsClose}>
          The agent does the work. Your process decides what counts.
        </p>
      </div>
    </section>
  );
}

function PainPointsSection() {
  return (
    <section className={styles.useCases}>
      <div className="container">
        <div className={styles.useCasesIntro}>
          <Heading as="h2">Why agents still need babysitting</Heading>
          <div className={styles.painIntroLayout}>
            <div className={styles.painIntroText}>
              <p>
                Would you give a new colleague a short instruction sheet and then let her buy equipment, approve requests, change systems, or declare work complete on her own?
              </p>
              <p>
                That is often how agents are used today: a prompt, tool access, and trust that the process will be followed.
              </p>
              <p>
                The problem is not that agents cannot help. The problem is that real work needs process memory, authority boundaries, and proof.
              </p>
            </div>
            <img
              src="/img/new-employee.png"
              alt="A new employee being given too much responsibility from one short instruction sheet"
              className={styles.painIntroImage}
            />
          </div>
        </div>
        <div className={styles.useCaseGrid}>
          {painPoints.map(({title, description}) => (
            <div key={title} className={styles.useCaseCard}>
              <Heading as="h3">{title}</Heading>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: 'Is Fernsehturm an agent?',
    answer: 'No. Fernsehturm is the process runtime an agent works through. The agent can request work; Fernsehturm checks the active process, required facts, gates, approvals, and evidence before returning the next route.',
    readMore: '/docs/understanding/how-it-works',
  },
  {
    question: 'Why is this different from prompting?',
    answer: 'A prompt can describe rules. Fernsehturm makes those rules executable. It can tell the agent what is missing, block invalid shortcuts, require approval, and record why work was allowed or stopped.',
    readMore: '/docs/concepts/api',
  },
  {
    question: 'Who defines the rules?',
    answer: 'Your process does. A process profile defines allowed actions, required facts, approval gates, protected outcomes, and what evidence must exist before work can count.',
    readMore: '/docs/concepts/api',
  },
  {
    question: 'Can an agent approve its own work?',
    answer: 'No. The agent can prepare an approval packet, but approval must come through the configured trusted path. In the purchase example, the order only moves forward after the user approves the exact packet in the CLI.',
    readMore: '/docs/understanding/how-it-works',
  },
  {
    question: 'Must I approve everything?',
    answer: 'No. Routine progress can be allowed by process conformance: the required evidence exists, artifacts validate, and gates are satisfied. Approval is for protected decisions or effects.',
    readMore: '/docs/features/traceability-and-evidence',
  },
  {
    question: 'Can Fernsehturm actually do the action?',
    answer: 'Yes, when the process allows it and the materialization path exists. The important part is that acting is separate from deciding. Fernsehturm checks the route, approval, scope, and exact artifact before ordering, sending, merging, or another protected action is allowed.',
    readMore: '/docs/concepts/api',
  },
  {
    question: 'What happens when context gets lost?',
    answer: 'Fernsehturm persists run state outside the chat. A later agent or a restarted session can ask what stage the run is in, what is missing, which approvals exist, and what the next valid step is.',
    readMore: '/docs/features/traceability-and-evidence',
  },
  {
    question: 'Is this for individuals or companies?',
    answer: 'Both suffer from the same failure mode: agents do work they think is useful, but the work was not authorized by the process. Individuals need agents that can move forward without constant babysitting. Companies need approvals, handoff, replay, and audit before agent work can count.',
    readMore: '/docs/understanding/use-cases',
  },
  {
    question: 'Does Fernsehturm prevent every agent mistake?',
    answer: 'No. Fernsehturm controls work routed through it. It helps prevent specific protected outcomes from moving forward when the process blocks them, approval is missing, or required evidence does not exist.',
    readMore: '/docs/features/traceability-and-evidence',
  },
  {
    question: 'Where is Fernsehturm hosted?',
    answer: 'Fernsehturm is hosted on your machine. It runs your process, stores your run state and evidence locally, and keeps process authority outside the agent prompt.',
    readMore: '/docs/getting-started/overview',
  },
  {
    question: 'How do I get started?',
    answer: 'Start with one process you already babysit today. Install Fernsehturm locally, run the quickstart, and try the demo process to see how an agent request becomes a route, evidence, and a controlled outcome.',
    readMore: '/docs/getting-started/quickstart',
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className={styles.faq}>
      <div className="container">
        <Heading as="h2">FAQ</Heading>
        <ul className={styles.faqList}>
          {faqs.map(({question, answer, readMore}, i) => {
            const open = openIndex === i;
            return (
              <li key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className={styles.faqToggle}>{open ? '−' : '+'}</span>
                  <span className={open ? styles.faqQuestionTextOpen : styles.faqQuestionText}>{question}</span>
                </button>
                {open && (
                  <div className={styles.faqAnswer}>
                    <p>{answer}</p>
                    <Link className={styles.faqReadMore} to={readMore}>Read more →</Link>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const videoUrl = useBaseUrl('/video/fst-hero.mp4');

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className={styles.heroOverlay} />

      <div className={clsx('container', styles.heroContent)}>
        <div className={styles.heroIntro}>
          <Heading as="h1" className={styles.heroTitle}>
            Stop babysitting agents
          </Heading>
          <p className={styles.heroSubtitle}>
            Create AI agents that follow your rules instead of doing whatever they want
          </p>
        </div>
        <div className={styles.buttons}>
         
          <Link
            className="button button--secondary button--lg"
            to="/docs/fst-in-action/demo">
            Control Your Agents →
          </Link>
        </div>
      </div>
    </header>
  );
}

function HowItWorksSection() {
  return (
    <section className={styles.howItWorks}>
      <div className="container">
        <div className={styles.howItWorksIntro}>
          <Heading as="h2">Agents can help with the work. FST decides what counts.</Heading>
          <p>
            Today, creating an agent often means writing a longer prompt, giving it tools,
            and hoping it follows the process.
          </p>
          <p>
            That asks the model to be the worker, rule interpreter, evidence creator,
            approver, auditor, and completion judge. FST separates those jobs.
          </p>
        </div>

        <div className={styles.comicStage}>
          <div className={styles.consoleWrap}>
            <div className={styles.consoleStack}>
              {consoleGroups.map((group, index) => (
                <div key={`${group.speaker}-${index}`} className={styles.consoleShell}>
                  <div className={styles.consoleChrome}>
                    <span className={styles.consoleTab}>
                      {group.tone === 'fst' ? 'fernsehturm route' : `${group.speaker.toLowerCase()} input`}
                    </span>
                    <div className={styles.consoleLights} aria-hidden="true">
                      <span className={styles.consoleLightRed} />
                      <span className={styles.consoleLightYellow} />
                      <span className={styles.consoleLightGreen} />
                    </div>
                  </div>
                  <div className={styles.consoleGroup}>
                    <div className={styles.consoleCodeBlock}>
                      {group.lines.map((line) => (
                        <div key={line} className={styles.consoleLine}>
                          <span className={styles.consoleToken}>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <img
                    src={group.icon}
                    alt={`${group.speaker} icon`}
                    className={clsx(
                      styles.shellIcon,
                      group.tone === 'developer' && styles.shellIconTopLeft,
                      group.tone !== 'developer' && styles.shellIconTopRight,
                      group.tone === 'developer' && styles.shellIconDev,
                      group.tone === 'fst' && styles.shellIconFst,
                      group.tone === 'agent' && styles.shellIconAgent,
                    )}
                  />
                  {index === 0 ? (
                    <div className={clsx(styles.shellBubble, styles.shellBubbleAboveLeft, styles.speechBubble, styles.speechBubbleWarm)}>
                      <svg className={styles.bubbleSvg} viewBox="0 0 420 220" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          className={styles.bubblePath}
                          d="M82 10
                             C38 10, 12 38, 12 78
                             C12 126, 42 158, 98 164
                             C88 184, 72 204, 38 214
                             C84 206, 118 188, 142 168
                             L332 168
                             C384 168, 408 134, 408 88
                             C408 42, 378 10, 326 10
                             Z"
                        />
                      </svg>
                      <div className={styles.bubbleText}>
                        {heroDialogue.developer.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {index === 4 ? (
                    <div className={clsx(styles.shellBubble, styles.shellBubbleAboveLeft, styles.speechBubble, styles.speechBubbleWarm)}>
                      <svg className={styles.bubbleSvg} viewBox="0 0 420 220" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          className={styles.bubblePath}
                          d="M82 10
                             C38 10, 12 38, 12 78
                             C12 126, 42 158, 98 164
                             C88 184, 72 204, 38 214
                             C84 206, 118 188, 142 168
                             L332 168
                             C384 168, 408 134, 408 88
                             C408 42, 378 10, 326 10
                             Z"
                        />
                      </svg>
                      <div className={styles.bubbleText}>
                        {heroDialogue.developerAccept.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {group.tone === 'fst' ? (
                    <div className={clsx(styles.shellBubble, styles.shellBubbleAboveRight, styles.speechBubble, styles.speechBubbleNeutral)}>
                      <svg className={styles.bubbleSvg} viewBox="0 0 420 220" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          className={styles.bubblePath}
                          d="M94 10
                             C42 10, 12 42, 12 88
                             C12 134, 36 168, 88 168
                             L278 168
                             C302 188, 336 206, 382 214
                             C348 204, 332 184, 322 164
                             C378 158, 408 126, 408 78
                             C408 38, 382 10, 338 10
                             Z"
                        />
                      </svg>
                      <div className={styles.bubbleText}>
                        {(index === 5 ? heroDialogue.fstOrder : heroDialogue.fst).map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {group.tone === 'agent' && index === 1 ? (
                    <div className={clsx(styles.shellBubble, styles.shellBubbleAboveRight, styles.speechBubble, styles.speechBubbleCool)}>
                      <svg className={styles.bubbleSvg} viewBox="0 0 420 220" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          className={styles.bubblePath}
                          d="M94 10
                             C42 10, 12 42, 12 88
                             C12 134, 36 168, 88 168
                             L278 168
                             C302 188, 336 206, 382 214
                             C348 204, 332 184, 322 164
                             C378 158, 408 126, 408 78
                             C408 38, 382 10, 338 10
                             Z"
                        />
                      </svg>
                      <div className={styles.bubbleText}>
                        {heroDialogue.agent.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {group.tone === 'agent' && index === 3 ? (
                    <div className={clsx(styles.shellBubble, styles.shellBubbleAboveRight, styles.speechBubble, styles.speechBubbleCool)}>
                      <svg className={styles.bubbleSvg} viewBox="0 0 420 220" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          className={styles.bubblePath}
                          d="M94 10
                             C42 10, 12 42, 12 88
                             C12 134, 36 168, 88 168
                             L278 168
                             C302 188, 336 206, 382 214
                             C348 204, 332 184, 322 164
                             C378 158, 408 126, 408 78
                             C408 38, 382 10, 338 10
                             Z"
                        />
                      </svg>
                      <div className={styles.bubbleText}>
                        {heroDialogue.agentRepair.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.dialogueImageWrap}>
          <img
            src="/img/delivery.png"
            alt="A user receiving an approved 4K monitor order"
            className={styles.dialogueImage}
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={`Do Not Prompt Agents to Follow Your Process`}
      description="FST is a local control layer for AI agent work: closed actions, gates, typed artifacts, approvals, evidence, replay, and route decisions.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HowItWorksSection />
        <WhatIsSection />
        <PainPointsSection />
        <FaqSection />
      </main>
    </Layout>
  );
}
