import type { FC } from 'react';
import SVGInline from 'react-svg-inline';
import { block } from 'bem-cn';
import Link from 'next/link';

import './NavItem.scss';

import expandMoreSVG from './img/expand-more-down.svg';

type IMenuLink = {
  label: string;
  href: string;
};

type IMenuSubmenu = {
  label: string;
  submenu: IMenuLink[];
};

type IMenuItem = IMenuLink | IMenuSubmenu;

const b = block('main-nav-item');
const bItemSelected = b({ selected: true });

type INavItemProps = {
  item: IMenuItem;
  isSelected: boolean;
  isRightHalfItem: boolean;
};

const NavItem: FC<INavItemProps> = ({ item, isSelected, isRightHalfItem }) => {
  const content = ('href' in item)
    ? (
      <Link href={item.href}>
        <span
          tabIndex={0}
          role="link"
          className={b('link')}
        >
          {item.label}
        </span>
      </Link>
    )
    : (
      <div
        role="link"
        tabIndex={0}
        className={b('link', { 'with-right-position': isRightHalfItem })}
      >
        {item.label}

        <SVGInline
          className={b('icon').toString()}
          svg={expandMoreSVG}
        />

        <ul className={b('submenu')}>
          {item.submenu.map((_item) => (
            <li className={b('submenu-item')} key={_item.href}>
              <Link href={_item.href}>
                <span tabIndex={0} role="link" className={b('link')}>{_item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    );

  return (
    <li className={isSelected ? bItemSelected : b()}>
      { content }
    </li>
  );
};

export default NavItem;

export type {
  IMenuSubmenu,
  IMenuLink,
  IMenuItem,
};
