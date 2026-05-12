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
    title: 'A prompt is just text',
    img: require('@site/static/img/agents.png').default,
    description: (
      <>
        You can tell an agent to follow rules. But the agent can still skip, reinterpret, or claim it followed them and do whatever it wants.
        <br /><br />
        Fernsehturm makes work pass through gates before it can proceed.
      </>
    ),
    link: '/docs/understanding/how-it-works',
    storyLabel: 'Read more →',
  },
  {
    title: 'Tool access is not authority control',
    img: require('@site/static/img/changing.png').default,
    description: (
      <>
        Tools let agents act. But they do not define when an action is allowed, what evidence is required, or when to escalate.
        <br /><br />
        Fernsehturm keeps agent actions inside controlled routes.
      </>
    ),
    link: '/docs/fst-in-action/demo',
    storyLabel: 'Read more →',
  },
  {
    title: 'The agent should not audit itself.',
    img: require('@site/static/img/reason.png').default,
    description: (
      <>
        An agent should not be the worker, checker, approver, auditor, and completion judge at the same time.
        <br /><br />
        FST separates doing the work from deciding whether the work is valid.
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
