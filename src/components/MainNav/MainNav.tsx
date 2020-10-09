import type { FC } from 'react';
import { useState } from 'react';
import type { IMenuItem } from './components/NavItem/NavItem';
import { block } from 'bem-cn';
import { useRouter } from 'next/router';

import NavItem, { IItemType } from './components/NavItem/NavItem';
import SVGInline from 'react-svg-inline';

const closeSVG = (require('./img/close.svg')).default as string;
const menuSVG = (require('./img/menu.svg')).default as string;

import "./MainNav.scss";

type INavMenuProps = {
  items: IMenuItem[];
}

const b = block('main-nav');

/**
 * This component implements MainNav
 * It receive one prop `items` with type IMenuItem[]
 * Example items:
 *   const items: IMenuItem[] = [
 *    { type: IItemType.LINK, label: 'О нас', href: '/' },
 *    { type: IItemType.SUBMENU, label: 'Услуги', submenu: [
 *      { type: IItemType.LINK, label: 'Бронирование', href: '/about1' },
 *      { type: IItemType.LINK, label: 'Уведомления о скидках', href: '/about2' },
 *    ] },
 *    { type: IItemType.LINK, label: 'Вакансии', href: '/vacancy' },
 *   ]
 */
const MainNav: FC<INavMenuProps> = ({ items }) => {
  const [isMenuHidden, toggleMenu] = useState<boolean>(false);
  const router = useRouter();

  return (
    <nav className={b({ hidden: isMenuHidden })}>
      <button
        className={b('toggle-btn')}
        onClick={() => toggleMenu(!isMenuHidden)}>
        <SVGInline
          className={b('toggle-btn-icon').toString()}
          svg={isMenuHidden ? menuSVG : closeSVG} />
      </button>
      {
        items.map(
          (item) => <NavItem
            key={item.label}
            item={item}
            isSelected={
              item.type === IItemType.LINK
              && router.pathname === item.href
            } />
        )
      }
    </nav>
  )
}

export default MainNav;

export {
  IItemType,
}

export type {
  IMenuItem,
}