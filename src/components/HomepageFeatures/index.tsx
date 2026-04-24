import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  img: string;
  description: ReactNode;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Keep systems consistent as they grow',
    img: require('@site/static/img/agents.png').default,
    description: (
      <>
        Let agents move fast without quietly changing the product. Fernsehturm keeps requirements, decisions, scope, checks, and code linked, so unapproved behavior is blocked or turned into an explicit proposal before it becomes accepted work.
      </>
    ),
    link: '/blog/keep-systems-consistent-as-they-grow',
  },
  {
    title: 'Make changes without breaking everything',
    img: require('@site/static/img/changing.png').default,
    description: (
      <>
        Change one part of the system and know what else must move. Fernsehturm shows which requirements, decisions, checks, and prior work are affected, and leaves a repairable trace when something drifts, breaks, or needs to be reverified.
      </>
    ),
    link: '/blog/make-changes-without-breaking-everything',
  },
  {
    title: 'Give AI a system it can reason about',
    img: require('@site/static/img/reason.png').default,
    description: (
      <>
        Stop making agents guess from scattered files, tickets, chats, and PRs. Fernsehturm gives them structured accepted intent: what is true, what is proposed, what was rejected, and what must be proven before work can be accepted.
      </>
    ),
    link: '/blog/give-ai-a-system-it-can-reason-about',
  },
];

function Feature({title, img, description, link}: FeatureItem) {
  const content = (
    <>
      <div className="text--center">
        <img src={img} className={styles.featureImg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {link ? <p className={styles.readMore}>Read more...</p> : null}
      </div>
    </>
  );

  return (
    <div className={clsx('col col--4')}>
      {link ? (
        <Link className={styles.featureCardLink} to={link}>
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
