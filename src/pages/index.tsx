import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const features = [
  { title: 'Database-native source of truth', description: 'Code, requirements, and decisions live in a structured database, not scattered across files' },
  { title: 'Agent steering', description: 'Agents propose changes, Fernsehturm provides feedback, detects gaps, and keeps the system aligned' },
  { title: 'Materialized workspaces', description: 'Generate runnable code from the current system state at any time' },
  { title: 'Traceable evolution', description: 'Every change is linked back to goals, requirements, and decisions' },
  { title: 'Consistency over time', description: 'Prevent drift as features accumulate and systems grow' },
  { title: 'Refinement loop', description: 'Build, critique, revise—iterate with structured feedback instead of patchwork fixes' },
  { title: 'CLI + agent interface', description: 'Use directly in the terminal or through coding agents like Codex or Claude' },
];

function WhatIsSection() {
  return (
    <section className={styles.whatIs}>
      <div className="container">
        <Heading as="h2">What is Fernsehturm?</Heading>
        <p className={styles.whatIsIntro}>
          Fernsehturm is an agent-focused development system that stores requirements, decisions, and code as structured artifacts, so AI can build and evolve software without losing consistency.
        </p>
        <ul className={styles.featureList}>
          {features.map(({title, description}) => (
            <li key={title}>
              <span className={styles.bullet}>[*]</span>
              <span className={styles.featureTitle}>{title}</span>
              <span className={styles.featureDesc}>{description}</span>
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

const faqs = [
  {
    question: 'How do I use Fernsehturm?',
    answer: 'Install the CLI, create a request, and let your coding agent interact with fst to derive, refine, and run your system.',
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
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Fernsehturm Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`The AI-agentic Workspace`}
      description="Fernsehturm helps AI agents build software that stays consistent as it grows">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <WhatIsSection />
        <FaqSection />
      </main>
    </Layout>
  );
}
