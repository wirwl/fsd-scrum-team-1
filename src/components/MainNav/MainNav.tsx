import Link from 'next/link';
import { block } from 'bem-cn';

import "./MainNav.scss";

const items = [
  { label: 'О нас', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Вакансии', href: '/vacancy' },
  { label: 'Новости', href: '/news' },
  { label: 'Соглашения', href: '/arrangements' }
];

const mainNav = block('main-nav');
const mainNavItemSelected = mainNav('item', { selected: true });

const selected = '/about';

const MainNav = () => {
  return (
    <nav className={mainNav()}>
      { items.map((item) => 
        <li key={item.href} className={selected === item.href ? mainNavItemSelected : mainNav('item')}>
          <Link href={item.href}>
            <a className={mainNav('item-link')}>{item.label}</a>
          </Link>
        </li>
      )}
    </nav>
  )
}

export default MainNav;