import { block } from 'bem-cn';

import NavMenu, { IMenu } from '@components/FooterNav/components/NavMenu/NavMenu';

import './FooterNav.scss';

type IFooterNav = {
  items: IMenu[]
}

const b = block('footer-nav');

const FooterNav: React.FC<IFooterNav> = ({ items }) => {
  return (
    <nav className = {b()}>
      {
        items.map((item) => {
          return (
            <NavMenu 
              title = {item.title} 
              links = {item.links} 
              key = {item.title}
            />
          )
        })
      }
    </nav>
  )
}

export default FooterNav;

