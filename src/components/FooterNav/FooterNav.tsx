import { block } from 'bem-cn';

import NavMenu, { IMenu } from 'src/components/FooterNav/components/NavMenu/NavMenu';

import './FooterNav.scss';

type IFooterNav = {
  items: IMenu[]
};

const b = block('footer-nav');

const FooterNav: React.FC<IFooterNav> = ({ items }) => (
  <nav className={b()}>
    {
      items.map((item) => (
        <NavMenu
          title={item.title}
          links={item.links}
          key={item.title}
        />
      ))
    }
  </nav>
);

export default FooterNav;
