import type { FC } from 'react';
import { useState } from 'react';
import { block } from 'bem-cn';
import SVGInline from 'react-svg-inline';

import type { IMenuItem } from './components/NavItem/NavItem';
import NavItem, { ItemType } from './components/NavItem/NavItem';

import './main-nav.scss';

import closeSVG from './img/close.svg';
import menuSVG from './img/menu.svg';

type INavMenuProps = {
  items: IMenuItem[];
  currHref: string;
};

const b = block('main-nav');

/**
 * This component implements MainNav
 * It receive 2 props
 * - items: IMenuItem[]
 *   Example items:
 *     const items: IMenuItem[] = [
 *      { type: IItemType.LINK, label: 'О нас', href: '/' },
 *      { type: IItemType.SUBMENU, label: 'Услуги', submenu: [
 *        { type: IItemType.LINK, label: 'Бронирование', href: '/about1' },
 *        { type: IItemType.LINK, label: 'Уведомления о скидках', href: '/about2' },
 *      ] },
 *      { type: IItemType.LINK, label: 'Вакансии', href: '/vacancy' },
 *     ]
 * - currHref: string
 */
const MainNav: FC<INavMenuProps> = ({ items, currHref }) => {
  const [isMenuHidden, toggleMenu] = useState<boolean>(false);

  return (
    <nav className={b({ hidden: isMenuHidden })}>

      <button
        type="button"
        className={b('toggle-btn')}
        onClick={() => toggleMenu(!isMenuHidden)}
      >
        <SVGInline
          className={b('toggle-btn-icon').toString()}
          svg={isMenuHidden ? menuSVG : closeSVG}
        />
      </button>

      {
        items.map(
          (item) => (
            <NavItem
              key={item.label}
              item={item}
              isSelected={
                item.type === ItemType.LINK
                && currHref === item.href
              }
            />
          ),
        )
      }

    </nav>
  );
};

export default MainNav;

export {
  ItemType,
};

export type {
  IMenuItem,
};
