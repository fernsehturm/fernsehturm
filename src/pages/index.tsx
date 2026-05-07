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
    'I want to move fast and I want you to get it right.',
    "Don't bother me with trivial stuff.",
  ],
  agent: [
    'I can do even more!',
    'I am trained to know that session-based logins support "remember me."',
  ],
  agentRepair: [
    'Understood.',
    'I will remove the inference and stay inside the accepted change.',
  ],
  
  fst: [
    'I keep the agent inside the line you accepted.',
    'Passing tests do not move the line.',
  ],
  developerAccept: [
    "Nice idea, but right now it doesn't fit.",
  ],
  
};

const consoleGroups = [
  {
    speaker: 'Developer',
    tone: 'developer',
    icon: '/img/bob-icon.png',
    lines: [
      '/fst Add session expiry after 30 minutes of inactivity.'
    ],
  },
  {
    speaker: 'Agent',
    tone: 'agent',
    icon: '/img/codey-icon.png',
    lines: [
      'expiry done + inferred remember_me',
      '...tests green',
    ],
  },
  {
    speaker: 'fst',
    tone: 'fst',
    icon: '/img/fst-icon.png',
    lines: [
      'BLOCKED: outside accepted scope!',
      'Split and ask the user',
    ],
  },
  {
    speaker: 'Agent',
    tone: 'agent',
    icon: '/img/codey-icon.png',
    lines: [
      '"remember_me" separated',
      'I finished the work on the expiry. Do you also want "remember me?"'
    ],
  },
  {
    speaker: 'Developer',
    tone: 'developer',
    icon: '/img/bob-icon.png',
    lines: [
      'Only ship the thing I asked for.',
      'Keep the rest for later.',
    ],
  },
];

const features = [
  { title: 'Accepted Work Context', description: 'FST records which exact system world and source revisions Exploration may inspect', link: '/docs/features/control-loop#work-context-selection' },
  { title: 'Bounded agent work', description: 'The agent can only move forward with changes that stay inside the recorded scope', link: '/docs/features/control-loop#exploration' },
  { title: 'Traceable results', description: 'FST records what changed, why it was allowed, and what evidence supports it', link: '/docs/features/traceability-and-evidence#traceability' },
  { title: 'Conflict checks', description: 'FST checks whether the proposed work holds together with the selected system world', link: '/docs/features/traceability-and-evidence#claims-become-checkable-records' },
  { title: 'Evidence-bound decisions', description: 'Important user answers are tied to the exact question they satisfy', link: '/docs/understanding/use-cases#8-cleaner-user-agent-interaction' },
  { title: 'Materialized output', description: 'A coherent Composition can be projected into a workspace, patch, or other target sink', link: '/docs/workflows/materialization' },
  { title: 'Short user loop', description: 'You provide direction, answer real decisions, approve risky writes, and review the trace', link: '/docs/understanding/use-cases#8-cleaner-user-agent-interaction' },
];

const useCases = [
  {
    title: 'Compare alternatives',
    image: '/img/compare.png',
    link: '/blog/compare-alternatives-before-you-choose',
    teaser: 'Explore two product directions side by side before choosing which one should move forward.',
  },
  {
    title: 'Resume long work',
    image: '/img/resume.png',
    link: '/blog/resume-long-running-ai-work',
    teaser: 'Pick up a task days later with the open decisions, checked scope, and remaining blockers still visible.',
  },
  {
    title: 'Recover failed runs',
    image: '/img/fix-broken.png',
    link: '/blog/recover-failed-agent-runs',
    teaser: 'Turn a broken agent attempt into a repair path instead of starting over from a vague chat transcript.',
  },
  {
    title: 'Hand off work',
    image: '/img/hand-off.png',
    link: '/blog/hand-off-ai-work-without-losing-context',
    teaser: 'Let another agent or teammate continue from recorded context, not from memory or guesswork.',
  },
];

function WhatIsSection() {
  return (
    <section className={styles.whatIs}>
      <div className="container">
        <Heading as="h2">What is Fernsehturm?</Heading>
        <p className={styles.whatIsIntro}>
          Fernsehturm is an agent-focused control system. Agents do the nitty-gritty work; FST keeps the work bounded, traceable, evidence-backed, and composable before it moves forward.
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
            FST is most useful when the work is larger than one prompt and the cost of losing context is high.
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
    question: 'My agent already writes code and runs tests. What does FST add?',
    answer: 'Tests tell you the code passes. They do not tell you the agent only touched what you asked. FST records what the agent was authorized to produce — before it produces it — and proves afterward that the two match.',
    readMore: '/blog/what-fst-adds-to-agent-development',
  },
  {
    question: 'What does FST catch when tests pass but the agent built the wrong thing?',
    answer: 'Four things: work outside the agreed scope, product decisions made without your input, behavior nobody asked for, and semantic conflicts between two changes that each pass their own tests. Tests verify code against what was written. FST verifies authorization against what was approved.',
    readMore: '/blog/what-fst-catches-when-tests-pass',
  },
  {
    question: 'Will FST slow me down?',
    answer: 'On a simple change: barely. On a complex one: it makes you faster. The decisions you would have discovered at review time get asked before the agent builds the wrong thing. A few questions upfront. Hours of archaeology saved afterward.',
    readMore: '/blog/does-fst-slow-you-down',
  },
  {
    question: 'What is the smallest useful FST workflow?',
    answer: 'WorkContext → Exploration → Build. The agent proposes what it will touch, you confirm, it works inside that box. No full artifact model required. You get scope control and a traceable Candidate from the first change.',
    readMore: '/blog/smallest-useful-fst-workflow',
  },
  {
    question: 'When does FST interrupt me?',
    answer: 'When the answer changes the outcome: a product choice the requirement does not settle, a conflict with a recorded decision, a scope breach, or a genuine tradeoff. Not for formatting, obvious fixes, or anything the approved scope already constrains.',
    readMore: '/blog/when-does-fst-interrupt-you',
  },
  {
    question: 'What happens if the agent adds behavior I did not request?',
    answer: 'The Build gate blocks it. Every artifact the agent creates must trace to your request or the scope you approved. If it cannot, FST surfaces the blocker and asks whether you want to expand the scope or remove the addition. Nothing sneaks in.',
    readMore: '/blog/agent-scope-drift',
  },
  {
    question: 'What happens if FST blocks work?',
    answer: 'The work is not lost. The blocker tells you exactly what is missing and how to resolve it — add a missing artifact, record a pending decision, or return to Exploration with a larger scope. Once resolved, the agent continues from where it was.',
    readMore: '/blog/what-happens-when-fst-blocks-work',
  },
  {
    question: 'How is FST different from specs, memory, CI, and PR review?',
    answer: 'Specs go stale. Memory is informational — the agent can ignore it. CI checks correctness, not authorization. PR review happens after the fact with no structured context. FST controls the process before the agent writes anything, then gives reviewers a targeted surface instead of a raw diff.',
    readMore: '/blog/fst-vs-specs-memory-ci-pr-review',
  },
  {
    question: 'Can I use FST with my current agent?',
    answer: 'Yes. FST is a single MCP tool — fst.control. Any agent that calls MCP tools can use it without changing your setup. You add FST to the tool set; the agent calls it at stage transitions. No new IDE, no new coding tool.',
    readMore: '/blog/use-fst-with-your-existing-agent',
  },
  {
    question: 'When should I not use FST?',
    answer: 'When the cost of being wrong is low: one-off scripts, throwaway experiments, local spikes that will never enter a shared codebase. FST\'s value scales with consequence. For production systems, shared codebases, or parallel agent work, it pays for itself in the first conflict it prevents.',
    readMore: '/blog/when-not-to-use-fst',
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
            Build Software with AI
            <br />
            without Losing Control.
          </Heading>
          <p className={styles.heroSubtitle}>
            Make AI useful for real software work without leaving you to clean up hidden drift later.
          </p>
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Read the Docs →
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
          <Heading as="h2">Stop an AI agent from shipping plausible but unrequested behavior.</Heading>
          <p>
            The failure mode is familiar: you asked for one thing, the agent touched ten
            files, and something broke somewhere unrelated.
          </p>
          <p>
            This is why you need Fernsehturm: You accept the scope, the agent works inside it, FST enforces the boundary. 
          </p>
        </div>

        <div className={styles.comicStage}>
          <div className={styles.consoleWrap}>
            <div className={styles.consoleStack}>
              {consoleGroups.map((group, index) => (
                <div key={`${group.speaker}-${index}`} className={styles.consoleShell}>
                  <div className={styles.consoleChrome}>
                    <span className={styles.consoleTab}>
                      {group.speaker === 'fst' ? 'fst context' : `${group.speaker.toLowerCase()} input`}
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
                        {heroDialogue.fst.map((line) => (
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
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={`Build Software with AI without Losing Control`}
      description="Build Software with AI without Losing Control. FST keeps agent work bounded by an Accepted Work Context, retained scope, gate evidence, and coherent Compositions.">
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
