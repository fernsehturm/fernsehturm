import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  img: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Keep systems consistent as they grow',
    img: require('@site/static/img/agents.png').default,
    description: (
      <>
        Fernsehturm stores requirements, decisions, and code together, so AI-generated systems don't drift over time.
      </>
    ),
  },
  {
    title: 'Make changes without breaking everything',
    img: require('@site/static/img/changing.png').default,
    description: (
      <>
        Structured feedback and traceability help agents update features without causing hidden regressions.
      </>
    ),
  },
  {
    title: 'Give AI a system it can reason about',
    img: require('@site/static/img/reason.png').default,
    description: (
      <>
        A database-native source of truth lets agents understand intent instead of guessing from files.
      </>
    ),
  },
];

function Feature({title, img, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={img} className={styles.featureImg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
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
