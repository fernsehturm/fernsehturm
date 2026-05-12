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
  storyLabel?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Your process defines the rules',
    img: require('@site/static/img/define-rules.png').default,
    description: (
      <>
        Fernsehturm turns a user-specific process into actions, required facts, gates, approvals, and valid outcomes for the agent to work through.
        <br />
      </>
    ),
    link: '/docs/understanding/how-it-works',
    storyLabel: 'Read more →',
  },
  {
    title: 'Fernsehturm guides and enforces',
    img: require('@site/static/img/guide-and-enforce.png').default,
    description: (
      <>
        Fernsehturm tells the agent the next valid step, asks for missing information, blocks invalid shortcuts, and requires approval before protected work can count.
        <br />
      </>
    ),
    link: '/docs/fst-in-action/demo',
    storyLabel: 'Read more →',
  },
  {
    title: 'Fernsehturm keeps track',
    img: require('@site/static/img/keep-track.png').default,
    description: (
      <>
        Fernsehturm persists run state, records artifacts and route decisions, and creates replayable evidence so the work can be reviewed, resumed, and audited.
        <br />
      </>
    ),
    link: '/docs/features/traceability-and-evidence',
    storyLabel: 'Read more →',
  },
];

function Feature({title, img, description, link, storyLabel}: FeatureItem) {
  const content = (
    <>
      <div className="text--center">
        <img src={img} className={styles.featureImg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {link ? <p className={styles.readMore}>{storyLabel}</p> : null}
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
