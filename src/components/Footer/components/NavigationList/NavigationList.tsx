import type { FC } from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';

import './NavigationList.scss';

type ILink = { name: string; href: string; };
type INavigationListProps = {
  title: string;
  links: ILink[];
};

const b = block('navigation-list');

const NavigationList: FC<INavigationListProps> = ({ title, links }) => (
  <section key={title} className={b()}>
    <header className={b('header')}>
      <h3 className={b('title')}>
        {title}
      </h3>
    </header>

    <ul className={b('list')}>
      {
        links.map(({ name, href }) => (
          <li key={name} className={b('item')}>
            <Link href={href}>
              <a href={href} className={b('link')}>
                {name}
              </a>
            </Link>
          </li>
        ))
      }
    </ul>
  </section>
);

export default NavigationList;
export type {
  ILink,
};
