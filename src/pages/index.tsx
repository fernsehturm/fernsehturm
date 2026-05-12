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
  { title: 'Local Linux runtime', description: 'Install FST locally and initialize a workspace with local_file or sqlite storage', link: '/docs/features/local-runtime' },
  { title: 'Process packs', description: 'Install and activate process packs without compiling process-specific business logic into Core', link: '/docs/features/process-packs' },
  { title: 'Closed action set', description: 'local_patch_review knows patch.request, repo.diff.record, patch.rules.evaluate, patch.review_packet.render, and patch.ready_for_review', link: '/docs/fst-in-action/demo' },
  { title: 'Hooks compute facts', description: 'JS/TS or Python hooks can compute findings and summaries, but they cannot grant approval or choose final routes', link: '/docs/concepts/api' },
  { title: 'Scenario runner', description: 'Run happy-path and blocked-path scenarios before trusting a pack with live agent work', link: '/docs/getting-started/quickstart' },
  { title: 'Replayable evidence', description: 'Replay records the profile, store, hook hashes, artifacts, evidence, gate, and route decision', link: '/docs/features/traceability-and-evidence' },
  { title: 'MCP control surface', description: 'Agents call FST for route decisions instead of deciding for themselves that protected work may proceed', link: '/docs/getting-started/agents' },
];

const useCases = [
  {
    title: 'local_patch_review',
    image: '/img/compare.png',
    link: '/docs/fst-in-action/demo',
    teaser: 'Control whether an AI-generated local patch can be marked ready for review.',
  },
  {
    title: 'Scenario matrix',
    image: '/img/resume.png',
    link: '/docs/getting-started/quickstart',
    teaser: 'Run happy-path, generated-file-blocked, and secret-literal-blocked cases before relying on a process pack.',
  },
  {
    title: 'Evidence and replay',
    image: '/img/fix-broken.png',
    link: '/docs/fst-in-action/demo',
    teaser: 'Inspect why FST returned Continue, InstructAgent, AskUser, Blocked, MaterializeMock, or Complete.',
  },
  {
    title: 'MCP agent control',
    image: '/img/hand-off.png',
    link: '/docs/getting-started/agents',
    teaser: 'Put an agent-facing control surface between tool-using agents and protected outcomes.',
  },
];

function WhatIsSection() {
  return (
    <section className={styles.whatIs}>
      <div className="container">
        <Heading as="h2">What is FST?</Heading>
        <p className={styles.whatIsIntro}>
          FST is a local control layer that makes AI agents work through executable processes instead of relying on prompts to remember the rules. The MVP proves that path with local patch review, process packs, hooks, scenarios, evidence, replay, and MCP integration.
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
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className={styles.useCases}>
      <div className="container">
        <div className={styles.useCasesIntro}>
          <Heading as="h2">Where It Helps</Heading>
          <p>
            The first release is intentionally narrow: a local, Linux-first technical preview for AI coding-agent work. It proves the control pattern before extending it to broader workflows.
          </p>
        </div>
        <div className={styles.useCaseGrid}>
          {useCases.map(({title, image, teaser, link}) => (
            <Link key={title} className={styles.useCaseCard} to={link}>
              <img src={image} alt="" className={styles.useCaseImage} aria-hidden="true" />
              <Heading as="h3">{title}</Heading>
              <p>{teaser}</p>
              <span className={styles.useCaseReadMore}>Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: 'Is FST an agent?',
    answer: 'No. FST is the control layer an agent works through. The agent requests actions; FST checks the process profile, required artifacts, gates, hooks, and evidence before returning a route.',
    readMore: '/docs/understanding/how-it-works',
  },
  {
    question: 'Is this a prompt library?',
    answer: 'No. Prompts tell an agent what to do. FST decides what actions and protected outcomes the process allows, outside the model prompt.',
    readMore: '/docs/concepts/api',
  },
  {
    question: 'What ships in the local MVP?',
    answer: 'A local Linux package, local_file and sqlite stores, fst.config.v1, process pack install and activation, hook-backed process logic, local_patch_review scenarios, local evidence, replay, and an MCP control path.',
    readMore: '/docs/getting-started/overview',
  },
  {
    question: 'Why start with patch review?',
    answer: 'It is small, local, and easy to verify. An AI coding agent may claim a patch is ready; FST decides whether patch.ready_for_review is allowed by the configured process.',
    readMore: '/docs/fst-in-action/demo',
  },
  {
    question: 'What routes can FST return?',
    answer: 'The MVP route language includes Continue, InstructAgent, AskUser, AwaitApproval, Blocked, MaterializeMock, and Complete. MaterializeMock means local/mock output, not production deployment, push, merge, email send, or spend.',
    readMore: '/docs/concepts/api',
  },
  {
    question: 'Can hooks decide routes?',
    answer: 'No. Hooks compute facts, issues, normalized fields, and evidence summaries. Core owns final route authority, approval authority, materialization preflight, evidence writes, and replay.',
    readMore: '/docs/concepts/api',
  },
  {
    question: 'Does FST prevent all agent breaches?',
    answer: 'No. FST controls actions routed through FST. It prevents specific controlled effects from moving forward when the process profile blocks them or required evidence is missing.',
    readMore: '/docs/features/traceability-and-evidence',
  },
  {
    question: 'Are email and purchasing included?',
    answer: 'No. They are useful examples of the same control pattern, but the launch-safe MVP ships local patch review. Production connectors, sending, spending, and team approval routing are post-MVP.',
    readMore: '/docs/understanding/use-cases',
  },
  {
    question: 'Is this enterprise-ready?',
    answer: 'No. The MVP is a local technical preview. Hosted deployment, team approvals, enterprise identity, supported production connectors, audit integrations, and SLAs are out of scope.',
    readMore: '/docs/understanding/comparisons',
  },
  {
    question: 'When should I not use the MVP?',
    answer: 'Do not present it as a hosted governance platform or a universal agent-safety product. Use it when you want to test the local control path for coding-agent patch review.',
    readMore: '/docs/understanding/comparisons',
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
        <UseCasesSection />
        <FaqSection />
      </main>
    </Layout>
  );
}
