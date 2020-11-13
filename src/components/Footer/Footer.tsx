import { FC } from 'react';
import { block } from 'bem-cn';

import Logo from '@/components/Logo/Logo';
import Input from '@/components/Input/Input';
import SocialButtons from '@/components/social-buttons/SocialButtons';

import {
  navBlocks,
  description,
  subscription,
  copyright,
  socialLinks,
} from 'config/footer.json';
import NavigationList from './components/NavigationList/NavigationList';

import './Footer.scss';

const b = block('footer');

const Footer: FC = () => {
  const navigationList = navBlocks.map(
    ({ title, links }) => <NavigationList key={title} title={title} links={links} />,
  );

  return (
    <footer className={b()}>
      <div className={b('main-area')}>
        <div className={b('inner-wrapper')}>

          <div className={b('about-us')}>
            <div className={b('logo')}><Logo /></div>
            <p className={b('description')}>{description}</p>
          </div>

          <nav className={b('navigation')}>
            {navigationList}
          </nav>

          <form
            className={b('subscription-form')}
            method="post"
            action={subscription.url}
          >
            <header className={b('section-header')}>
              <p className={b('subscription-form-title')}>
                {subscription.title}
              </p>
            </header>

            <p className={b('subscription-form-description')}>{subscription.description}</p>

            <div className={b('footer__text-input')}>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                onChange={() => {}}
                onBlur={() => {}}
                onFocus={() => {}}
                withArrow
              />
            </div>
          </form>

        </div>
      </div>

      <div className={b('copyright-area')}>
        <div className={b('inner-wrapper')}>
          <p className={b('copyright')}>{copyright}</p>

          <div className={b('social-links')}>
            <SocialButtons items={socialLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
