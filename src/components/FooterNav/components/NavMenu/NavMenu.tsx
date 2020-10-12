import { block } from 'bem-cn';
import Link from 'next/link';

import './NavMenu.scss';

type IMenu = {
  title: string
  links: IMenuLinks[]
}

type IMenuLinks = {
  label: string,
  href: string  
}

const b = block('footer-menu');

const NavMenu: React.FC<IMenu> = ({ title, links }) => {
  return (
    <section className = {b()}>
      <h3 className = {b('title')}> {title} </h3>
      <div className = {b('content')}>
        { 
          links.map(link => {
            return (
              <Link href = {link.href} key = {link.label} >
                <a className = {b('link')}> {link.label} </a>
              </Link>
            )
          })
        }
      </div>
    </section>
  )  
}

export type { IMenu, IMenuLinks };

export default NavMenu;