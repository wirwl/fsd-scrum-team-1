import type { FC } from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { block } from 'bem-cn';
import SVGInline from 'react-svg-inline';

const expandMoreSVG = (require('./img/expand-more-down.svg')).default as string;
const closeSVG = (require('./img/close.svg')).default as string;
const menuSVG = (require('./img/menu.svg')).default as string;

import "./MainNav.scss";

enum IItemType {
  LINK,
  SUBMENU
}

type IMenuLink = {
  type: IItemType.LINK;
  label: string;
  href: string;
}

type IMenuSubmenu = {
  type: IItemType.SUBMENU;
  label: string;
  submenu: IMenuLink[];
}

type IMenuItem = IMenuLink | IMenuSubmenu;

const selectedHref = '/about';

const items: IMenuItem[] = [
  { type: IItemType.LINK, label: 'О нас', href: '/about' },
  { type: IItemType.SUBMENU, label: 'Услуги', submenu: [
    { type: IItemType.LINK, label: 'Бронирование', href: '/about1' },
    { type: IItemType.LINK, label: 'Уведомления о скидках', href: '/about2' },
    { type: IItemType.LINK, label: 'Доставка багажа', href: '/about3' },
    { type: IItemType.LINK, label: 'Ловля карасей в бассейне', href: '/about4' },
  ] },
  { type: IItemType.LINK, label: 'Вакансии', href: '/vacancy' },
  { type: IItemType.LINK, label: 'Новости', href: '/news' },
  { type: IItemType.SUBMENU, label: 'Соглашения', submenu: [
    { type: IItemType.LINK, label: 'Бронирование', href: '/about11' },
    { type: IItemType.LINK, label: 'Уведомления о скидках', href: '/about22' },
    { type: IItemType.LINK, label: 'Доставка багажа', href: '/about33' },
    { type: IItemType.LINK, label: 'Ловля карасей в бассейне', href: '/about44' },
  ]}
];

const mainNav = block('main-nav');
const mainNavItemSelected = mainNav('item', { selected: true });

type INavItemProps = {
  item: IMenuItem;
  isSelected: boolean;
}

const NavItem: FC<INavItemProps> = ({ item, isSelected }) => {
  const _isSelected = item.type === IItemType.LINK && isSelected;

  const content = item.type === IItemType.LINK
    ? (
        <Link href={item.href}>
          <a tabIndex={0} className={mainNav('item-link')}>
            {item.label}
          </a>
        </Link>
    )
    : (
      <div tabIndex={0} className={mainNav('item-link')}>
        {item.label}
        {
          <SVGInline
            className={mainNav('item-icon').toString()}
            svg={expandMoreSVG}
          />
        }
        {
          <ul className={mainNav('submenu')}>
            { item.submenu.map((item) => 
              <li className={mainNav('submenu-item')} key={item.href}>
                <Link href={item.href}>
                  <a tabIndex={0} className={mainNav('item-link')}>{item.label}</a>
                </Link>
              </li>
            )}
          </ul>
        }
      </div>
    );

  return (
    <li className={ _isSelected ? mainNavItemSelected : mainNav('item') }>
        { content }
    </li>
  );
}

const MainNav = () => {
  const [isMenuHidden, toggleMenu] = useState<boolean>(false);

  return (
    <nav className={mainNav({ hidden: isMenuHidden })}>
      <button
        className={mainNav('toggle-btn')}
        onClick={() => toggleMenu(!isMenuHidden)}>
        <SVGInline
          className={mainNav('toggle-btn-icon').toString()}
          svg={isMenuHidden ? menuSVG : closeSVG} />
      </button>
      { 
        items.map(
          (item) => <NavItem
            key={item.label}
            item={item}
            isSelected={item.type === IItemType.LINK && selectedHref === item.href} />
        )
      }
    </nav>
  )
}

export default MainNav;