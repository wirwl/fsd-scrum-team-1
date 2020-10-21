import type { FC } from 'react';
import { useState } from 'react';
import { block } from 'bem-cn';
import SVGInline from 'react-svg-inline';

import type { IMenuItem } from './components/NavItem/NavItem';
import NavItem from './components/NavItem/NavItem';

import './MainNav.scss';

import closeSVG from './img/close.svg';
import menuSVG from './img/menu.svg';

type INavMenuProps = {
  items: IMenuItem[];
  currHref: string;
};

const b = block('main-nav');
const isHrefSelected = (item: IMenuItem, currHref: string): boolean => ('href' in item && currHref === item.href);

/**
 * This component implements MainNav
 * It receive 2 props
 * - items: IMenuItem[]
 *   Example items:
 *     const items: IMenuItem[] = [
 *      { label: 'О нас', href: '/' },
 *      { label: 'Услуги', submenu: [
 *        { label: 'Бронирование', href: '/about1' },
 *        { label: 'Уведомления о скидках', href: '/about2' },
 *      ] },
 *      { label: 'Вакансии', href: '/vacancy' },
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
          (item, index) => (
            <NavItem
              key={item.label}
              item={item}
              isSelected={isHrefSelected(item, currHref)}
              isRightHalfItem={index > items.length / 2}
            />
          ),
        )
      }

    </nav>
  );
};

export default MainNav;

export type {
  IMenuItem,
};
