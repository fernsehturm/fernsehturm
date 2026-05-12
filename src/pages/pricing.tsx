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
  price: string;
  priceLabel?: string;
  priceNote?: string;
  bullets: string[];
  details: FeatureGroup[];
  cta: string;
  ctaTo?: string;
  badge?: string;
  highlighted?: boolean;
  comingSoon?: boolean;
};

const tiers: Tier[] = [
  {
    id: 'community',
    name: 'COMMUNITY',
    headline: 'Real standalone local processes',
    problem: '"Can I run useful agent workflows locally without paying first?"',
    forWhom:
      'Individuals and small self-managed workflows that need local process packs, evidence, replay, reports, and user-managed tool integration.',
    price: 'Free',
    priceLabel: 'forever',
    priceNote: 'Safety, validation, and local evidence are not paywalled.',
    bullets: [
      'Put real local agent workflows under control',
      'See why each agent step continued or stopped',
      'Catch missing evidence before work counts',
      'Use your own local tools and scripts',
      'Review every run with local replay',
      'Create custom process packs without paying',
    ],
    cta: 'Start Community',
    ctaTo: '/docs/getting-started/quickstart',
    details: [
      {
        title: 'Run real work locally',
        items: [
          'Turn patch review, vendor intake, email prep, or similar workflows into controlled standalone processes',
          'Install multiple packs and switch between standalone processes as the runtime supports them',
        ],
      },
      {
        title: 'Know why work was allowed',
        items: [
          'Validate profiles, evaluate gates, check artifacts, and run materialization preflight before output counts',
          'Write scenarios, execute hooks, record manual approvals, and replay evidence after the run',
        ],
      },
      {
        title: 'Keep your setup self-managed',
        items: [
          'Use local scripts, mock connectors, local report output, and configured tools inside your workspace policy',
          'Stay local without a connector marketplace, shared credential broker, or support contract',
        ],
      },
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    headline: 'Connected personal process systems',
    problem: '"Can I connect my local processes into one controlled workflow?"',
    forWhom:
      'Individuals building a personal agent operating system with process-to-process handoff, multi-agent review, and composite evidence.',
    price: '€29',
    priceLabel: '/mo',
    priceNote: 'Local upgrade boundary; connected-process features can land incrementally.',
    badge: 'Connected workflows',
    highlighted: true,
    bullets: [
      'Connect separate processes into one workflow',
      'Hand off artifacts without losing evidence',
      'Add reviewer agents before approval',
      'Replay the full workflow chain',
      'Create cross-process reports',
      'Run recurring local process batches',
    ],
    cta: 'Start Pro trial',
    ctaTo: '/docs/intro',
    details: [
      {
        title: 'Build a personal process system',
        items: [
          'Connect patch review to test runner, risk review, report rendering, or other local process packs',
          'Move from isolated local runs to one controlled workflow with evidence carried between steps',
        ],
      },
      {
        title: 'Get better second opinions',
        items: [
          'Add critic, reviewer, or second-opinion agent lanes before final user approval',
          'Catch risky outputs earlier with synthetic 4-eyes-style checks for one operator',
        ],
      },
      {
        title: 'Understand the whole chain',
        items: [
          'Use composite replay, cross-process reports, larger local evidence indexing, and shared scenario bundles',
          'Search and explain evidence across your personal local process system',
        ],
      },
    ],
  },
  {
    id: 'teams',
    name: 'TEAMS',
    headline: 'Shared controlled agent work',
    problem: '"Can our team share profiles, approvals, connectors, and evidence?"',
    forWhom:
      'Teams that need shared profiles, human approval routing, team-managed connectors, and a common evidence store.',
    price: 'Coming soon',
    priceNote: 'Roadmap tier, not an active MVP edition.',
    comingSoon: true,
    bullets: [
      'Route approvals to the right people',
      'Share approved profiles across the team',
      'Separate requester and approver roles',
      'Keep one evidence trail for team work',
      'Manage shared connectors centrally',
      'Produce team-ready reports',
    ],
    cta: 'Coming soon',
    details: [
      {
        title: 'Make approvals accountable',
        items: [
          'Route approvals to distinct people and keep profile changes reviewable',
          'Use real human 4-eyes approval, distinct approver roles, and separation of duties',
        ],
      },
      {
        title: 'Operate from one shared record',
        items: [
          'Share profile packs, connector configuration, team reports, and retention settings',
          'Give reviewers and operators one evidence store instead of scattered agent transcripts',
        ],
      },
    ],
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    headline: 'Production enforcement and regulated scale',
    problem: '"Can FST enforce protected effects in production with enterprise controls?"',
    forWhom:
      'Organizations that need production protected connectors, private deployment, SSO, SIEM/audit exports, supported packs, and SLA.',
    price: 'Talk to us',
    priceNote: 'For production enforcement, custom deployment, and supported connectors.',
    bullets: [
      'Enforce controls on production effects',
      'Run in private or customer-hosted environments',
      'Meet SSO, SIEM, and retention requirements',
      'Use supported protected connectors',
      'Adopt maintained production profile packs',
      'Get security review, connector support, and SLA',
    ],
    cta: 'Talk to us',
    details: [
      {
        title: 'Move protected effects behind FST',
        items: [
          'Use approved-real materialization through supported protected connectors',
          'Adopt maintained profile packs for access, data, email, software change, and incident workflows',
        ],
      },
      {
        title: 'Meet enterprise control requirements',
        items: [
          'Use SSO, role-based admin controls, audit export, SIEM export, and retention settings',
          'Get connector SDK support, security review, private deployment help, and support SLA',
        ],
      },
    ],
  },
];

function PriceDisplay({tier}: {tier: Tier}) {
  return (
    <div className={styles.priceBlock}>
      <div className={styles.priceRow}>
        <span className={styles.price}>{tier.price}</span>
        {tier.priceLabel && <span className={styles.priceLabel}>{tier.priceLabel}</span>}
      </div>
      {tier.priceNote && <p className={styles.priceNote}>{tier.priceNote}</p>}
    </div>
  );
}

function TierCard({tier}: {tier: Tier}) {
  return (
    <div className={`${styles.card} ${tier.highlighted ? styles.cardHighlighted : ''}`}>
      {tier.badge && <div className={styles.badge}>{tier.badge}</div>}

      <div className={styles.cardHeader}>
        <div className={styles.tierName}>{tier.name}</div>
        <PriceDisplay tier={tier} />
        <Heading as="h2" className={styles.headline}>{tier.headline}</Heading>
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
      description="Build and run controlled local agent processes for free. Upgrade when your processes become a connected system.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1">Pricing</Heading>
            <p className={styles.heroSub}>
              Build and run controlled local agent processes for free. Upgrade
              when standalone processes become a connected personal system.
              Teams and Enterprise add shared governance and production support.
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
              <strong>Safety is never paywalled.</strong> Community includes
              real standalone local processes, validation, local evidence,
              replay, hooks, scenarios, manual approvals, local MCP, and custom
              process development. Pro starts when one user connects processes
              into a broader workflow.
            </p>
            <Link className={styles.ctaButton} to="/docs/getting-started/quickstart">
              Get started →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
