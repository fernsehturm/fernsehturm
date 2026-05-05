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
  ctaTo?: string;
  badge?: string;
  highlighted?: boolean;
  isFree?: boolean;
  comingSoon?: boolean;
};

const tiers: Tier[] = [
  {
    id: 'free',
    name: 'FREE',
    headline: 'Run the full FST loop locally',
    problem: '"Can I keep one agent workflow under control?"',
    forWhom:
      'Individual developers trying FST, running one local system, or coordinating a small amount of parallel agent work.',
    monthlyPrice: null,
    priceLabel: 'forever',
    isFree: true,
    bullets: [
      '3 active Composition slots',
      'Base world plus 2 parallel agent work worlds',
      'Full WorkContext -> Exploration -> Build -> Compose loop',
      'Local database on the agent machine',
    ],
    cta: 'Start free',
    ctaTo: '/docs/intro',
    details: [
      {
        title: 'Complete control loop',
        items: [
          'Create a WorkContext, explore scope, build Candidates, and compose coherent worlds',
          'Automated gates, traceability, evidence records, and local snapshots included',
        ],
      },
      {
        title: 'Composition slots',
        items: [
          'One slot for your base world',
          'Two slots for safe parallel agent work or temporary alternatives',
        ],
      },
      {
        title: 'Local-first runtime',
        items: [
          'Runs on your machine',
          'No shared server or cloud dependency required',
        ],
      },
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    headline: 'Remove the Composition slot limit',
    problem: '"I need more possible worlds active at once."',
    forWhom:
      'Developers running several agents, keeping alternatives alive, or managing serious local work that needs more than 3 active Composition slots.',
    monthlyPrice: 29,
    priceLabel: '/mo',
    badge: 'Most popular',
    highlighted: true,
    bullets: [
      'Unlimited active Composition slots',
      'Run more parallel agent work safely',
      'Keep experiments and repair worlds active',
      'Still local-first on the agent machine',
    ],
    cta: 'Start Pro trial',
    ctaTo: '/docs/intro',
    details: [
      {
        title: 'Unlimited active worlds',
        items: [
          'Open more live Composition lines without archiving work',
          'Compare alternatives and keep failed worlds available for repair',
        ],
      },
      {
        title: 'More parallel capacity',
        items: [
          'Agent capacity scales with active Composition slots',
          'Use the base world plus as many live agent work worlds as you need',
        ],
      },
      {
        title: 'Same local runtime',
        items: [
          'Uses the local database on the agent machine',
          'Designed for individual Pro use',
        ],
      },
    ],
  },
  {
    id: 'team',
    name: 'TEAM',
    headline: 'Shared FST runtime for teams',
    problem: '"Can we run this together?"',
    forWhom:
      'Teams that need a shared database, multiple users, and a deployable FST runtime instead of one local agent-machine database.',
    monthlyPrice: null,
    priceLabel: '',
    comingSoon: true,
    bullets: [
      'Deployable Docker database/runtime',
      'Shared state across users and machines',
      'Team collaboration and reviewer workflows',
      'Central operational setup',
    ],
    cta: 'Coming soon',
    details: [
      {
        title: 'Shared deployment',
        items: [
          'Run the FST database as a deployable Docker container',
          'Keep one shared system state across agents, developers, and machines',
        ],
      },
      {
        title: 'Team operation',
        items: [
          'Built for shared work rather than one local machine',
          'Designed for future team roles, reviewers, and operational controls',
        ],
      },
    ],
  },
];

function PriceDisplay({tier}: {tier: Tier}) {
  if (tier.comingSoon) {
    return (
      <div className={styles.priceBlock}>
        <span className={styles.price}>Coming soon</span>
      </div>
    );
  }

  if (tier.isFree) {
    return (
      <div className={styles.priceBlock}>
        <span className={styles.price}>Free</span>
        <span className={styles.priceLabel}>{tier.priceLabel}</span>
      </div>
    );
  }

  return (
    <div className={styles.priceBlock}>
      <div className={styles.priceRow}>
        <span className={styles.price}>€{tier.monthlyPrice}</span>
        <span className={styles.priceLabel}>{tier.priceLabel}</span>
      </div>
      <p className={styles.priceNote}>7-day free trial</p>
    </div>
  );
}

function TierCard({tier}: {tier: Tier}) {
  return (
    <div className={`${styles.card} ${tier.highlighted ? styles.cardHighlighted : ''}`}>
      {tier.badge && <div className={styles.badge}>{tier.badge}</div>}

      <div className={styles.cardHeader}>
        <div className={styles.tierName}>{tier.name}</div>
        <Heading as="h2" className={styles.headline}>{tier.headline}</Heading>
        <PriceDisplay tier={tier} />
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
        {tier.ctaTo ? (
          <Link
            className={`${styles.cta} ${tier.highlighted ? styles.ctaHighlighted : ''}`}
            to={tier.ctaTo}>
            {tier.cta} →
          </Link>
        ) : (
          <span className={`${styles.cta} ${styles.ctaDisabled}`}>
            {tier.cta}
          </span>
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
  return (
    <Layout
      title="Pricing"
      description="Start free with 3 active Composition slots. Upgrade to Pro when you need more live possible worlds.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1">Pricing</Heading>
            <p className={styles.heroSub}>
              Start free with the full FST loop. Upgrade only when you need more
              active Composition slots for parallel agent work.
            </p>
          </div>
        </section>

        <section className={styles.tiers}>
          <div className="container">
            <div className={styles.grid}>
              {tiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container">
            <p className={styles.ctaText}>
              <strong>Start free.</strong> Free includes your base world plus 2
              parallel agent work worlds. Pro removes the active Composition
              slot limit for local use.
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
