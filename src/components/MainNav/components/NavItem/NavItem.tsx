import type { FC } from 'react';
import SVGInline from 'react-svg-inline';
import { block } from 'bem-cn';
import Link from 'next/link';

import './nav-item.scss';

const expandMoreSVG = (require('./img/expand-more-down.svg')).default as string;

enum ItemType {
  LINK,
  SUBMENU
}

type IMenuLink = {
  type: ItemType.LINK;
  label: string;
  href: string;
};

type IMenuSubmenu = {
  type: ItemType.SUBMENU;
  label: string;
  submenu: IMenuLink[];
};

type IMenuItem = IMenuLink | IMenuSubmenu;

const b = block('main-nav-item');
const bItemSelected = b({ selected: true });

type INavItemProps = {
  item: IMenuItem;
  isSelected: boolean;
};

const NavItem: FC<INavItemProps> = ({ item, isSelected }) => {
  const content = item.type === ItemType.LINK
    ? (
      <Link href={item.href}>
        <span role="link" className={b('link')}>
          {item.label}
        </span>
      </Link>
    )
    : (
      <div role="link" tabIndex={0} className={b('link')}>
        {item.label}

        <SVGInline
          className={b('icon').toString()}
          svg={expandMoreSVG}
        />

        <ul className={b('submenu')}>
          {item.submenu.map((_item) => (
            <li className={b('submenu-item')} key={_item.href}>
              <Link href={_item.href}>
                <span role="link" className={b('link')}>{_item.label}</span>
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

export {
  ItemType,
};

export type {
  IMenuSubmenu,
  IMenuLink,
  IMenuItem,
};
