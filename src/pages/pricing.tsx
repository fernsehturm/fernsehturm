import {useState} from 'react';
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './pricing.module.css';

type FeatureGroup = {
  title: string;
  items: string[];
};

type Tier = {
  id: string;
  name: string;
  headline: string;
  problem: string;
  forWhom: string;
  monthlyPrice: number | null;
  priceLabel: string;
  bullets: string[];
  details: FeatureGroup[];
  cta: string;
  ctaTo: string;
  badge?: string;
  highlighted?: boolean;
  isFree?: boolean;
  hasTrial: boolean;
};

const tiers: Tier[] = [
  {
    id: 'build',
    name: 'BUILD',
    headline: 'Build scalable systems with AI',
    problem: '"Can I build this?"',
    forWhom: 'Individual developers starting out, experimenting with agentic workflows, building first real systems — anyone who wants full capability without commitment.',
    monthlyPrice: null,
    priceLabel: '',
    isFree: true,
    hasTrial: false,
    bullets: [
      'Full system building with AI agents',
      'Code, requirements & decisions as a unified system',
      'Runs locally — no setup or cloud required',
      'Scales to real projects, not a toy',
    ],
    cta: 'Start building free',
    ctaTo: '/docs/intro',
    details: [
      {
        title: 'Full agent loop',
        items: [
          'Create goals → derive requirements → implement → verify',
          'No artificial limits on system size or features',
        ],
      },
      {
        title: 'Database-native system',
        items: [
          'Code, requirements, and decisions live together',
          'Consistent structure from the beginning',
        ],
      },
      {
        title: 'Local-first',
        items: [
          'Runs entirely on your machine',
          'No dependency on external services',
        ],
      },
      {
        title: 'Basic consistency checks',
        items: [
          'Detect obvious gaps and conflicts',
          'Ensure minimum system integrity',
        ],
      },
    ],
  },
  {
    id: 'control',
    name: 'CONTROL',
    headline: 'Build safely, even with multiple agents',
    problem: '"Will this break?"',
    forWhom: 'Solo developers using multiple agents, developers working on real projects, anyone hitting "things overwrite each other", early teams coordinating shared work.',
    monthlyPrice: 29,
    priceLabel: '/mo',
    hasTrial: true,
    badge: 'Most popular',
    highlighted: true,
    bullets: [
      'Safe parallel development with multiple agents',
      'Prevent conflicts and accidental overwrites',
      'Controlled changes to shared system artifacts',
      'Understand impact before applying changes',
    ],
    cta: 'Start free trial',
    ctaTo: '/docs/intro',
    details: [
      {
        title: 'Safe writes (proposal-based changes)',
        items: [
          'Agents propose changes instead of writing directly',
          'System validates before accepting',
          'Prevents accidental overwrites',
        ],
      },
      {
        title: 'Conflict detection',
        items: [
          'Detects when multiple agents modify the same artifact',
          'Highlights incompatible changes early',
          'Prevents silent inconsistencies',
        ],
      },
      {
        title: 'Artifact ownership & control',
        items: [
          'Define who/what can modify parts of the system',
          'Optional strict enforcement',
          'Prevents uncontrolled changes',
        ],
      },
      {
        title: 'Parallel workflows',
        items: [
          'Agents work in isolated revision sets',
          'Merge changes safely',
          'No stepping on each other',
        ],
      },
      {
        title: 'Impact-aware changes',
        items: [
          'Analyze what a change affects before applying it',
          'Detect risk across features',
          'Avoid breaking unrelated parts',
        ],
      },
      {
        title: 'Write policies',
        items: [
          'Enforce consistency rules automatically',
          'Ensure changes follow system constraints',
        ],
      },
    ],
  },
  {
    id: 'trust',
    name: 'TRUST',
    headline: 'Understand, control, and trust your system',
    problem: '"Do I understand this?"',
    forWhom: 'Developers building complex systems, long-running projects, anyone who feels "I don\'t fully understand what\'s happening anymore", advanced solo devs and serious teams.',
    monthlyPrice: 79,
    priceLabel: '/mo',
    hasTrial: true,
    bullets: [
      'Full visibility into how your system works',
      'Control how AI makes decisions',
      'Predict impact before changes happen',
      'System improves itself over time',
    ],
    cta: 'Start free trial',
    ctaTo: '/docs/intro',
    details: [
      {
        title: 'Trainer (controlled delegation)',
        items: [
          'Define how the agent behaves',
          'Control ambiguity handling and decision authority',
          'Configure escalation rules and critique strictness',
          'Profiles: fast prototyping · balanced · strict engineering · compliance mode',
        ],
      },
      {
        title: 'System explainability',
        items: [
          'Understand what your system does',
          'See how features connect',
          'Understand why decisions were made',
        ],
      },
      {
        title: 'Impact analysis',
        items: [
          'Predict what will break before changing anything',
          'Identify affected requirements and features',
          'Safe refactoring planning',
        ],
      },
      {
        title: 'System health & risk detection',
        items: [
          'Identify inconsistencies',
          'Detect fragile areas',
          'Highlight duplication and drift',
        ],
      },
      {
        title: 'Deep traceability',
        items: [
          'Trace from requirement → code → runtime',
          'Explain why something exists',
          'Debug by reasoning, not guessing',
        ],
      },
      {
        title: 'Self-improvement',
        items: [
          'System learns from past loops',
          'Improves prompts and workflows',
          'Identifies recurring problems and proposes better ways to build',
        ],
      },
    ],
  },
  {
    id: 'foundation',
    name: 'FOUNDATION',
    headline: 'Run your own shared, evolving system',
    problem: '"Can we run this together long-term?"',
    forWhom: 'Teams working on the same system, individuals running multiple machines, developers building long-term or production systems, anyone creating their own "agentic organization".',
    monthlyPrice: 20,
    priceLabel: '/seat/mo',
    hasTrial: true,
    bullets: [
      'One shared system across machines and users',
      'Persistent system memory beyond one device',
      'Multiple developers and agents working together',
      'Centralized governance and learning',
    ],
    cta: 'Start free trial',
    ctaTo: '/docs/intro',
    details: [
      {
        title: 'Shared system state',
        items: [
          'Single source of truth across all machines',
          'All agents operate on the same system',
          'No divergence between environments',
        ],
      },
      {
        title: 'Multi-machine access',
        items: [
          'Connect from multiple devices',
          'Work seamlessly across environments',
          'System is no longer tied to one machine',
        ],
      },
      {
        title: 'Multi-user collaboration',
        items: [
          'Multiple developers contribute to the same system',
          'Shared artifacts, decisions, and requirements',
          'Unified development flow',
        ],
      },
      {
        title: 'Centralized agent coordination',
        items: [
          'Agents across machines remain aligned',
          'Shared policies and constraints',
          'Unified decision model',
        ],
      },
      {
        title: 'Persistent organizational memory',
        items: [
          'System remembers decisions, requirements, feedback, and improvements',
          'Knowledge accumulates over time',
        ],
      },
      {
        title: 'Shared self-improvement',
        items: [
          'All loops contribute to system learning',
          'Improvements apply globally',
          'System evolves as a whole',
        ],
      },
      {
        title: 'Foundation for agentic organizations',
        items: [
          'Run your own system as a long-lived entity',
          'Coordinate many agents and developers',
          'System becomes a shared asset',
        ],
      },
    ],
  },
];

function PriceDisplay({tier, yearly}: {tier: Tier; yearly: boolean}) {
  if (tier.isFree) {
    return (
      <div className={styles.priceBlock}>
        <span className={styles.price}>Free</span>
        <span className={styles.priceLabel}>forever</span>
      </div>
    );
  }

  const monthly = tier.monthlyPrice!;
  const yearlyTotal = monthly * 10;
  const yearlyMonthlyEquiv = Math.round(yearlyTotal / 12);
  const isFoundation = tier.id === 'foundation';

  if (!yearly) {
    return (
      <div className={styles.priceBlock}>
        <div className={styles.priceRow}>
          <span className={styles.price}>€{monthly}</span>
          <span className={styles.priceLabel}>{tier.priceLabel}</span>
        </div>
        {isFoundation && (
          <p className={styles.priceNote}>Min. 5 seats · from €{monthly * 5}/mo</p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.priceBlock}>
      <div className={styles.priceRow}>
        <span className={styles.price}>€{yearlyMonthlyEquiv}</span>
        <span className={styles.priceLabel}>{tier.priceLabel}</span>
      </div>
      <p className={styles.yearlyBilled}>
        Paid annually · €{isFoundation ? `${yearlyTotal}/seat` : yearlyTotal}/year
      </p>
      {isFoundation && (
        <p className={styles.priceNote}>Min. 5 seats · from €{yearlyMonthlyEquiv * 5}/mo</p>
      )}
    </div>
  );
}

function TierCard({tier, yearly}: {tier: Tier; yearly: boolean}) {
  return (
    <div className={`${styles.card} ${tier.highlighted ? styles.cardHighlighted : ''}`}>
      {tier.badge && <div className={styles.badge}>{tier.badge}</div>}

      <div className={styles.cardHeader}>
        <div className={styles.tierName}>{tier.name}</div>
        <Heading as="h2" className={styles.headline}>{tier.headline}</Heading>
        <PriceDisplay tier={tier} yearly={yearly} />
        {tier.hasTrial && (
          <div className={styles.trialBadge}>7-day free trial</div>
        )}
      </div>

      <p className={styles.problem}>{tier.problem}</p>

      <ul className={styles.featureList}>
        {tier.bullets.map((b) => (
          <li key={b}>
            <span className={styles.check}>✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className={styles.cardFooter}>
        <Link
          className={`${styles.cta} ${tier.highlighted ? styles.ctaHighlighted : ''}`}
          to={tier.ctaTo}>
          {tier.cta} →
        </Link>
        {tier.hasTrial && (
          <p className={styles.trialNote}>Cancel anytime before trial ends. No charge.</p>
        )}
      </div>

      <details className={styles.details}>
        <summary className={styles.detailsSummary}>Feature details</summary>
        <div className={styles.detailsBody}>
          <p className={styles.forWhom}>{tier.forWhom}</p>
          {tier.details.map((group) => (
            <div key={group.title} className={styles.featureGroup}>
              <strong className={styles.featureGroupTitle}>{group.title}</strong>
              <ul className={styles.featureGroupList}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

export default function Pricing(): ReactNode {
  const [yearly, setYearly] = useState(false);

  return (
    <Layout
      title="Pricing"
      description="Each tier removes a specific pain. Start free, upgrade when you need to.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1">Pricing</Heading>
            <p className={styles.heroSub}>
              Each tier removes a specific pain. Start free — upgrade when your system needs to scale, be trusted, or be shared.
            </p>
          </div>
        </section>

        <section className={styles.toggleSection}>
          <div className="container">
            <div className={styles.toggleWrapper}>
              <button
                className={`${styles.toggleBtn} ${!yearly ? styles.toggleActive : ''}`}
                onClick={() => setYearly(false)}>
                Monthly
              </button>
              <button
                className={`${styles.toggleBtn} ${yearly ? styles.toggleActive : ''}`}
                onClick={() => setYearly(true)}>
                Yearly
                <span className={styles.savingsBadge}>2 months free</span>
              </button>
            </div>
          </div>
        </section>

        <section className={styles.tiers}>
          <div className="container">
            <div className={styles.grid}>
              {tiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} yearly={yearly} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container">
            <p className={styles.ctaText}>
              <strong>Start free.</strong> No credit card required for BUILD. Paid tiers include a 7-day free trial — cancel before it ends and you won't be charged.
            </p>
            <Link className={styles.ctaButton} to="/docs/intro">
              Get started →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
