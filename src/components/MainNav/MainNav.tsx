import Link from 'next/link';
import { block } from 'bem-cn';
import SVGInline from 'react-svg-inline';

const expandMoreSVG = (require('./img/expand-more-down.svg')).default as string;

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

console.log(mainNav('item-icon').toString());

const MainNav = () => {
  return (
    <nav className={mainNav()}>
      { items.map((item) => 
        <li key={item.href} className={
          selected === item.href ? mainNavItemSelected : mainNav('item')
        }>
          <Link href={item.href}>
            <>
              <a className={mainNav('item-link')}>{item.label}</a>
              { 
                item.expanded && <SVGInline className={mainNav('item-icon').toString()} svg={expandMoreSVG} />
              }
            </>
          </Link>
        </li>
      )}
    </nav>
  )
}

export default MainNav;