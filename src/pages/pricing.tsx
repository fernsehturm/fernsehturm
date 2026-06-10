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
  audience: string;
  buyReason: string;
  reasonLabel?: string;
  price: string;
  priceLabel?: string;
  priceNote?: string;
  benefits: string[];
  details: FeatureGroup[];
  cta: string;
  ctaTo?: string;
  badge?: string;
  highlighted?: boolean;
};

type AuthorityStep = {
  name: string;
  description: string;
};

const COMING_SOON = 'Coming soon';
const GITHUB_URL = 'https://github.com/fernsehturm/fernsehturm';

const tiers: Tier[] = [
  {
    id: 'personal-free',
    name: 'PERSONAL FREE',
    headline: 'Local controlled runs for one user',
    audience:
      'Individual agent users who want to learn and use controlled agent runs locally.',
    buyReason:
      'you want the agent to follow a real process, ask for local approval, and leave replayable evidence before work counts.',
    reasonLabel: 'Use when',
    price: '$0',
    priceNote: 'One local user. Unlimited local controlled runs. No external event intake.',
    benefits: [
      'Use the local FST runtime for one authority user',
      'Run unlimited local controlled runs',
      'Start official work from the local user or local agent',
      'Keep local process profiles, evidence, and replay',
      'Approve through the local CLI',
      'Use mock or basic protected-effect preflight',
    ],
    cta: 'Get started',
    ctaTo: '/docs/getting-started/quickstart',
    details: [
      {
        title: 'Authority boundary',
        items: [
          'One user, one local machine, one agent environment, and local authority only',
          'Runs are started locally by the user or by an agent acting through the local FST interface',
          'No external event intake, shared authority, or team roles',
        ],
      },
      {
        title: 'Included',
        items: [
          'Local FST runtime, process profiles, MCP tools, agent skill instructions, evidence store, and replay',
          'Local CLI approvals, scope checks, gate checks, profile validation basics, and evidence writing',
          'Mock or shadow materialization and basic protected-effect preflight',
        ],
      },
      {
        title: 'Upgrade when',
        items: [
          'External systems need to start or update runs',
          'Multiple people need shared roles, shared evidence, or approval separation',
        ],
      },
    ],
  },
  {
    id: 'personal-pro',
    name: 'PERSONAL PRO',
    headline: 'External event intake without external authority',
    audience:
      'Power users and solo operators who want local FST connected to email, webhooks, workflow tools, tickets, files, or chat gateways.',
    buyReason:
      'work should begin from the outside world, but approval and protected effects still need to stay under your local authority.',
    price: '$29',
    priceLabel: '/mo',
    priceNote: 'or $24/mo billed annually.',
    badge: 'Personal automation',
    highlighted: true,
    benefits: [
      'Run unlimited local controlled runs',
      'Receive webhooks, email, workflow triggers, tickets, and file events',
      'Use a local receiver, adapter registry, signed webhooks, and source allowlists',
      'Normalize external events into controlled run inputs and artifacts',
      'Keep event received separate from approval granted',
    ],
    cta: COMING_SOON,
    details: [
      {
        title: 'Authority boundary',
        items: [
          'One user, one local FST runtime, and local approval authority',
          'External events can create inputs, artifacts, or run triggers',
          'External events do not become approvals unless the profile validates identity, scope, expiry, and format',
        ],
      },
      {
        title: 'Included',
        items: [
          'Everything in Personal Free',
          'Local receiver, webhook intake, email intake, workflow-tool trigger intake, and adapter registry',
          'Event normalization, event-to-artifact mapping, adapter evidence, idempotency, allowlists, signed webhook support, and local adapter config',
          'Personal/local receiver and adapter scope',
        ],
      },
      {
        title: 'Upgrade when',
        items: [
          'More than one person needs authority inside the same process',
          'You need shared profiles, role-based approvals, or a team evidence store',
        ],
      },
    ],
  },
  {
    id: 'team',
    name: 'TEAM',
    headline: 'Shared FST with role-based authority',
    audience:
      'Engineering, operations, support, and compliance teams that need multiple people and agents working from the same controlled process.',
    buyReason:
      'requesters, operators, reviewers, approvers, profile authors, and admins must be distinct roles instead of one local user.',
    price: '$499',
    priceLabel: '/mo',
    priceNote: 'or $429/mo billed annually. Includes 10 authority users.',
    benefits: [
      'Use 10 included authority users',
      'Add authority users for $29/user/mo',
      'Run unlimited shared controlled runs',
      'Run shared controlled work in a self-hosted FST service',
      'Route approvals by role, scope, process, and environment',
      'Prevent people from approving their own protected effects',
      'Publish governed profile versions for team use',
      'Share run state, adapters, evidence, handoffs, and audit export',
    ],
    cta: COMING_SOON,
    details: [
      {
        title: 'Authority boundary',
        items: [
          'Multiple users, multiple agents, shared runtime, shared run state, and shared evidence',
          'Role-bound approvals with requester, operator, reviewer, approver, profile author, profile publisher, and admin roles',
          'Team policy can enforce that a user cannot approve their own protected effect',
        ],
      },
      {
        title: 'Included',
        items: [
          'Everything in Personal Pro',
          'Docker or self-hosted deployment, shared run store, team process profile catalog, profile versioning, publication gates, and admin UI or API',
          'Shared adapters, team evidence store, run handoff, audit export, and environment separation for dev, staging, and production',
          'Standard evidence retention, with additional retention and environments priced separately',
        ],
      },
      {
        title: 'Upgrade when',
        items: [
          'FST needs to follow organization identity, central policy, retention, legal hold, or compliance rules',
          'Many teams or environments need governed controls from one place',
        ],
      },
    ],
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    headline: 'Org-scale governance and audit',
    audience:
      'Organizations that need FST inside their identity, policy, audit, retention, deployment, and compliance controls.',
    buyReason:
      'FST must become part of the organization control plane across teams, identities, systems, and environments.',
    price: 'Contact sales',
    priceNote: 'Custom annual contract for governed deployment, compliance, support, and SLA.',
    benefits: [
      'Run unlimited controlled runs under contracted deployment terms',
      'Bind FST authority to SSO, SCIM, IAM, directory groups, and policy',
      'Control who can define, publish, approve, and materialize work',
      'Separate controls by team, system, and environment',
      'Export audit data to SIEM and compliance workflows',
      'Retain evidence with custom retention, legal hold, and signed bundles',
      'Run with private deployment, HA, backup, KMS options, support, and SLA',
    ],
    cta: 'Contact sales',
    ctaTo: 'mailto:mail@fernsehturm.dev',
    details: [
      {
        title: 'Authority boundary',
        items: [
          'Many teams, many environments, central identity, central policy, central audit, and regulated evidence',
          'IAM-backed roles and policy decide who can approve authority and which systems can be touched',
          'Environment controls decide where real materialization is allowed',
        ],
      },
      {
        title: 'Included',
        items: [
          'Everything in Team',
          'SAML or OIDC SSO, SCIM provisioning, IAM integration, directory-group mapping, org-level RBAC or ABAC, and centralized policy controls',
          'SIEM and log export, custom retention, legal hold, audit reports, signed evidence bundles, KMS options, private deployment, high availability, backup and restore, admin approval workflows, and enterprise support',
          'Contract-defined authority users, protected systems, deployments, environments, support plan, and retention terms',
        ],
      },
    ],
  },
];

const authoritySteps: AuthorityStep[] = [
  {
    name: 'Personal Free',
    description: 'Local user or local agent can start official work.',
  },
  {
    name: 'Personal Pro',
    description: 'Outside events can enter local FST without becoming approval.',
  },
  {
    name: 'Team',
    description: 'Multiple users, agents, roles, and approvals share official state.',
  },
  {
    name: 'Enterprise',
    description: 'Org identity, policy, audit, retention, and deployment govern authority.',
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
        <div className={styles.tierName}>{tier.headline}</div>
        <PriceDisplay tier={tier} />
        <Heading as="h2" className={styles.headline}>{tier.name}</Heading>
        <p className={styles.audience}>
          <strong>For</strong> {tier.audience}
        </p>
      </div>

      <p className={styles.buyReason}>
        <strong>{tier.reasonLabel ?? 'Buy when'}</strong> {tier.buyReason}
      </p>

      <ul className={styles.featureList}>
        {tier.benefits.map((b) => (
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
        <summary className={styles.detailsSummary}>Authority and features</summary>
        <div className={styles.detailsBody}>
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
      description="Choose a Fernsehturm tier by who or what can influence official process state: one local user, external events, a team, or the organization.">
      <main>
        <section className={styles.interestBanner}>
          <div className="container">
            <p>
              Are you interested in this? Help me with a{' '}
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                star on GitHub
              </a>
              .
            </p>
          </div>
        </section>

        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1">Pricing</Heading>
            <p className={styles.heroSub}>
              Choose the tier by who or what can influence official process state.
              Controlled runs are unlimited because the point is to put more work
              inside the control loop, not to ration it. You pay for authority,
              connections, shared roles, governance, and deployment needs.
            </p>
          </div>
        </section>

        <section className={styles.authority}>
          <div className="container">
            <div className={styles.authorityBox}>
              <p className={styles.authorityIntro}>
                The upgrade path is about authority and connections, not run volume.
              </p>
              <div className={styles.authorityGrid}>
                {authoritySteps.map((step) => (
                  <div key={step.name} className={styles.authorityStep}>
                    <strong>{step.name}</strong>
                    <span>{step.description}</span>
                  </div>
                ))}
              </div>
            </div>
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
              <strong>Safety is the baseline.</strong> Unsafe-route blocking,
              scope checks, evidence writing, profile validation basics,
              materialization preflight, replay basics, and local CLI approvals
              stay in the core control loop. Scale, integrations, shared authority,
              governance, deployment, retention, and support are the business.
            </p>
            <Link className={styles.ctaButton} to="/docs/getting-started/quickstart">
              Get started →
            </Link>
            <Link className={styles.secondaryButton} to="/compare">
              See how FST complements other tools →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
