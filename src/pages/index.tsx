import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const heroDialogue = {
  developer: [
    'I want the speed, not the cleanup.',
    'Can we change auth without quietly changing the product?',
  ],
  developerAccept: [
    'That matches the product.',
    'Use this Accepted Work Context.',
  ],
  fst: [
    'I inspected the codebase first.',
    'Here is the likely context and the one decision that matters.',
  ],
  agent: [
    'Point me at the work.',
    'I will stay inside the retained scope and stop for real decisions.',
  ],
};

const consoleGroups = [
  {
    speaker: 'Developer',
    tone: 'developer',
    icon: '/img/bob-icon.png',
    lines: [
      '/fst Add session expiry after 30 minutes',
      'Constraint: do not introduce JWT refresh flow.',
    ],
  },
  {
    speaker: 'fst',
    tone: 'fst',
    icon: '/img/fst-icon.png',
    lines: [
      'Investigated the codebase: existing session middleware found',
      'Accepted Work Context: current auth session Composition',
      'Need your decision: should authenticated API activity reset the timer?',
    ],
  },
  {
    speaker: 'Agent',
    tone: 'agent',
    icon: '/img/codey-icon.png',
    lines: [
      'Retained scope: session middleware and verification',
      'Build only inside the recorded scope',
    ],
  },
  {
    speaker: 'Developer',
    tone: 'developer',
    icon: '/img/bob.png',
    lines: [
      'Confirm Accepted Work Context',
      'Start guarded run',
    ],
  },
];

const features = [
  { title: 'Accepted Work Context', description: 'FST records which exact system world and source revisions Exploration may inspect', link: '/docs/how-fst-keeps-control#accepted-work-context' },
  { title: 'Bounded agent work', description: 'The agent can only move forward with changes that stay inside the recorded scope', link: '/docs/how-fst-keeps-control#exploration' },
  { title: 'Traceable results', description: 'FST records what changed, why it was allowed, and what evidence supports it', link: '/docs/why-trust-fst#what-a-good-final-report-should-show' },
  { title: 'Conflict checks', description: 'FST checks whether the proposed work holds together with the selected system world', link: '/docs/why-trust-fst#confidence-comes-from-checks-not-narration' },
  { title: 'Evidence-bound decisions', description: 'Important user answers are tied to the exact question they satisfy', link: '/docs/what-you-have-to-do#what-counts-as-evidence' },
  { title: 'Materialized output', description: 'A coherent Composition can be projected into a workspace, patch, or other target sink', link: '/docs/materialization' },
  { title: 'Short user loop', description: 'You provide direction, answer real decisions, approve risky writes, and review the trace', link: '/docs/what-you-have-to-do#your-five-responsibilities' },
];

const useCases = [
  {
    title: 'Compare alternatives',
    image: '/img/fst-icon.png',
    link: '/blog/compare-alternatives-before-you-choose',
    teaser: 'Explore two product directions side by side before choosing which one should move forward.',
  },
  {
    title: 'Resume long work',
    image: '/img/claudric-icon.png',
    link: '/blog/resume-long-running-ai-work',
    teaser: 'Pick up a task days later with the open decisions, checked scope, and remaining blockers still visible.',
  },
  {
    title: 'Recover failed runs',
    image: '/img/codey-icon.png',
    link: '/blog/recover-failed-agent-runs',
    teaser: 'Turn a broken agent attempt into a repair path instead of starting over from a vague chat transcript.',
  },
  {
    title: 'Hand off work',
    image: '/img/bob-icon.png',
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
          Fernsehturm is an agent-focused control system. Agents do the software work; FST keeps the work bounded, traceable, evidence-backed, and composable before it moves forward.
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
    question: 'How do I use Fernsehturm?',
    answer: 'Describe the work, confirm the Accepted Work Context when asked, answer real decisions, approve risky materialization, and review the evidence-backed result.',
  },
  {
    question: 'Can I use my existing AI subscriptions with Fernsehturm?',
    answer: 'Yes. You can connect it to agents like Codex, Claude, or others and use your existing accounts.',
  },
  {
    question: 'How much does Fernsehturm cost?',
    answer: 'Fernsehturm has a free local version and paid tiers for cloud, team, and enterprise use.',
  },
  {
    question: 'What about data and privacy?',
    answer: 'In the local version, everything stays on your machine. Cloud and enterprise setups give you control over hosting and data handling.',
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className={styles.faq}>
      <div className="container">
        <Heading as="h2">FAQ</Heading>
        <ul className={styles.faqList}>
          {faqs.map(({question, answer}, i) => {
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
                {open && <p className={styles.faqAnswer}>{answer}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
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
          <Heading as="h2">How It Works</Heading>
          <p>
            Start from the work you already have. FST records the Accepted Work Context,
            bounds the agent with retained scope, and pulls you back in only when judgment is required.
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
                  {index === 3 ? (
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
                  {group.tone === 'agent' ? (
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
