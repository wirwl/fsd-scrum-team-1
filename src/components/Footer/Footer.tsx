import { FC } from 'react';
import { block } from 'bem-cn';

import Logo from '@/components/Logo/Logo';
import Input from '@/components/Input/Input';
import SocialButtons from '@/components/social-buttons/SocialButtons';

import NavigationList, { ILink } from './components/NavigationList/NavigationList';

import './Footer.scss';

type INavBlock = {
  title: string;
  links: ILink[];
};

const description = 'Бронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»';

const navBlocks: INavBlock[] = [
  {
    title: 'Навигация',
    links: [
      { name: 'О нас', href: '/404' },
      { name: 'Новости', href: '/404' },
      { name: 'Служба поддержки', href: '/404' },
      { name: 'Услуги', href: '/404' },
    ],
  },
  {
    title: 'О нас',
    links: [
      { name: 'О сервисе', href: '/404' },
      { name: 'Наша команда', href: '/404' },
      { name: 'Вакансии', href: '/404' },
      { name: 'Инвесторы', href: '/404' },
    ],
  },
  {
    title: 'Служба поддержки',
    links: [
      { name: 'Соглашения', href: '/404' },
      { name: 'Сообщества', href: '/404' },
      { name: 'Связь с нами', href: '/404' },
    ],
  },
];

const subscription = {
  title: 'Подписка',
  description: 'Получайте специальные предложения и новости сервиса',
  url: '/subscription-api',
};

const copyright = 'Copyright © 2018 Toxin отель. Все права защищены.';
const socialLinks = [
  { text: 'twitter', link: 'twitter.com' },
  { text: 'facebook-square', link: 'facebook.com' },
  { text: 'instagram', link: 'instagram.com' },
];

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
              <Input type="email" placeholder="Email" withArrow />
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
