import { FC } from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';

import Logo from '@/components/Logo/Logo';
import Input from '@/components/Input/Input';
import SocialButtons from '@/components/social-buttons/SocialButtons';

import './Footer.scss';

type ILink = { name: string; href: string; };
type INavBlock = {
  title: string;
  links: ILink[];
};

const title = 'Бронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»';

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
const socialLinks = {
  twitterUrl: 'twitter.com',
  facebookUrl: 'facebook.com',
  instagramUrl: 'instagram.com',
};

const Footer: FC = () => {
  const b = block('footer');
  const { twitterUrl, facebookUrl, instagramUrl } = socialLinks;

  const navigationList = navBlocks.map(({ title: blockTitle, links: blockLinks }) => (
    <section key={blockTitle} className={b('navigation-section')}>
      <header className={b('section-header')}>
        <p className={b('navigation-section-title')}>{blockTitle}</p>
      </header>

      <ul className={b('navigation-section-list')}>
        {
          blockLinks.map(({ name, href }) => (
            <li key={name} className={b('navigation-section-item')}>
              <Link href={href}>
                <a href={href} className={b('navigation-section-link')}>{name}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  ));

  return (
    <footer className={b()}>
      <div className={b('main-area')}>
        <div className={b('inner-wrapper')}>

          <div className={b('about-us')}>
            <div className={b('logo')}><Logo /></div>
            <p className={b('description')}>{title}</p>
          </div>

          <nav className={b('navigation')}>{navigationList}</nav>

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
            <SocialButtons
              items={[
                { text: 'twitter', link: twitterUrl },
                { text: 'facebook-square', link: facebookUrl },
                { text: 'instagram', link: instagramUrl }]}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
