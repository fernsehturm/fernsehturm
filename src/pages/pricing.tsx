import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './pricing.module.css';

type Tier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  bestFor: string;
  cta: string;
  ctaTo: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Solo',
    price: '€0 / month',
    description: 'For local development and experimentation with AI agents.',
    features: [
      'Local SQLite database',
      'Full core loop (propose → critique → revise)',
      'Code stored in DB + materialization',
      'Single user',
      'Local execution only',
      'Basic feedback and checks',
    ],
    bestFor: 'trying Fernsehturm, personal projects, early prototypes',
    cta: 'Get started',
    ctaTo: '/docs/intro',
  },
  {
    name: 'Solo Cloud',
    price: '€29 / month',
    description: 'Run your system in the cloud and use it directly with AI agents.',
    features: [
      'Hosted database (Postgres)',
      'Remote access from anywhere',
      'Compatible with cloud agents (Codex, Claude, etc.)',
      'Persistent system state',
      'Improved reliability and uptime',
    ],
    bestFor: 'solo developers building real projects with AI',
    cta: 'Get started',
    ctaTo: '/docs/intro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '€79 / seat / month',
    description: 'Work together on shared systems without losing consistency.',
    features: [
      'Multi-user access',
      'Shared system of record',
      'Role-based permissions',
      'Multi-agent workflows',
      'Optional self-hosting',
      'Stronger validation and consistency checks',
    ],
    bestFor: 'teams building and evolving AI-generated systems',
    cta: 'Get started',
    ctaTo: '/docs/intro',
  },
  {
    name: 'Enterprise',
    price: 'Custom pricing',
    description: 'Run production systems with structured feedback and guarantees.',
    features: [
      'Production signal ingestion (logs, metrics, errors)',
      'Runtime feedback → structured critique → guided fixes',
      'Deployment integration',
      'Audit logs and traceability',
      'Strong safety and validation guarantees',
      'Dedicated support and onboarding',
    ],
    bestFor: 'production systems where consistency and reliability matter',
    cta: 'Contact us',
    ctaTo: 'mailto:mail@fernsehturm.dev',
  },
];

function TierCard({tier}: {tier: Tier}) {
  return (
    <div className={`${styles.card} ${tier.highlighted ? styles.cardHighlighted : ''}`}>
      <div className={styles.cardHeader}>
        <Heading as="h2" className={styles.tierName}>{tier.name}</Heading>
        <p className={styles.price}>{tier.price}</p>
        <p className={styles.description}>{tier.description}</p>
      </div>
      <ul className={styles.featureList}>
        {tier.features.map((f) => (
          <li key={f}>
            <span className={styles.bullet}>[*]</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className={styles.cardFooter}>
        <p className={styles.bestFor}>
          <span className={styles.bestForLabel}>Best for: </span>
          {tier.bestFor}
        </p>
        <Link className={`${styles.cta} ${tier.highlighted ? styles.ctaHighlighted : ''}`} to={tier.ctaTo}>
          {tier.cta} →
        </Link>
      </div>
    </div>
  );
}

export default function Pricing(): ReactNode {
  return (
    <Layout
      title="Pricing"
      description="Simple, confidence-based pricing for every stage of development">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1">Pricing</Heading>
            <p className={styles.heroSub}>
              Simple, confidence-based, and progressive. Each tier is a natural step up in where your system lives and how much you can trust it.
            </p>
          </div>
        </section>
        <section className={styles.tiers}>
          <div className="container">
            <div className={styles.grid}>
              {tiers.map((tier) => (
                <TierCard key={tier.name} tier={tier} />
              ))}
            </div>
          </div>
        </section>
        <section className={styles.ctaSection}>
          <div className="container">
            <p className={styles.ctaText}>
              <strong>Start free locally</strong> or upgrade when your system needs to run, scale, and be trusted.
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
