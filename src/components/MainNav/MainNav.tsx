import { useState } from 'react';

import Link from 'next/link';
import { block } from 'bem-cn';
import SVGInline from 'react-svg-inline';

const expandMoreSVG = (require('./img/expand-more-down.svg')).default as string;
const closeSVG = (require('./img/close.svg')).default as string;
const menuSVG = (require('./img/menu.svg')).default as string;

import "./MainNav.scss";

const items = [
  { label: 'О нас', href: '/about', expanded: false },
  { label: 'Услуги', href: '/services', expanded: true },
  { label: 'Вакансии', href: '/vacancy', expanded: false },
  { label: 'Новости', href: '/news', expanded: false },
  { label: 'Соглашения', href: '/arrangements', expanded: true }
];

const mainNav = block('main-nav');
const mainNavItemSelected = mainNav('item', { selected: true });

const selected = '/about';

const MainNav = () => {
  const [isMenuHidden, toggleMenu] = useState<boolean>(false);

  return (
    <nav className={mainNav({ hidden: isMenuHidden })}>
      <button
        className={mainNav('toggle-btn')}
        onClick={() => toggleMenu(!isMenuHidden)}>
        <SVGInline className={mainNav('toggle-btn-icon')} svg={isMenuHidden ? menuSVG : closeSVG} />
      </button>
      { items.map((item) => 
        <li key={item.href} className={
          selected === item.href ? mainNavItemSelected : mainNav('item')
        }>
          <Link href={item.href}>
            <a tabIndex={0} className={mainNav('item-link')}>
              {item.label}
              {
                item.expanded && <SVGInline
                  className={mainNav('item-icon').toString()}
                  svg={expandMoreSVG}
                />
              }
            </a>
          </Link>
        </li>
      )}
    </nav>
  )
}

export default MainNav;