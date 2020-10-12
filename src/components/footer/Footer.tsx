import { FC } from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';

import Logo from '@components/Logo/Logo';
import Input from '@components/TextField/TextField';
import SocialButtons from '@components/social-buttons/SocialButtons';

import './footer.scss';

type ILink = { name: string; href?: string; };

type IFooterProps = Partial<{
  title: string;
  navBlocks: {
    title: string;
    links: ILink[];
  }[];
  subscription: {
    title: string;
    description: string;
    url?: string;
  },
  copyright: string;
  socialLinks: Partial<Record<'twitterUrl' | 'facebookUrl' | 'instagramUrl', string>>;
}>;

const Footer: FC<IFooterProps> = ({
  title = 'Бронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»',
  navBlocks = [
    {
      title: 'Навигация',
      links: [{ name: 'О нас' }, { name: 'Новости' }, { name: 'Служба поддержки' }, { name: 'Услуги' }],
    },
    {
      title: 'О нас',
      links: [{ name: 'О сервисе' }, { name: 'Наша команда' }, { name: 'Вакансии' }, { name: 'Инвесторы' }],
    },
    {
      title: 'Служба поддержки',
      links: [{ name: 'Соглашения' }, { name: 'Сообщества' }, { name: 'Связь с нами' }],
    },
  ],
  subscription = {
    title: 'Подписка',
    description: 'Получайте специальные предложения и новости сервиса',
  },
  copyright = 'Copyright © 2018 Toxin отель. Все права зачищены.',
  socialLinks = {},
}) => {
  const b = block('footer');
  const urlMock = 'mock-address/change-me';
  const { twitterUrl, facebookUrl, instagramUrl } = socialLinks;

  const navigationList = navBlocks.map(({ title: blockTitle, links: blockLinks }: INavBlock) => (
    <section key={blockTitle} className={b('navigation-section')}>
      <header className={b('section-header')}>
        <p className={b('navigation-section-title')}>{blockTitle}</p>
      </header>
      <ul className={b('navigation-section-list')}>
        {
            blockLinks.map(({ name, href }) => {
              const validHref = href || urlMock;

              return (
                <li key={name} className={b('navigation-section-item')}>
                  <Link href={validHref}>
                    <a href={validHref} className={b('navigation-section-link')}>{name}</a>
                  </Link>
                </li>
              );
            })
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

          <form className={b('subscription-form')} method="post" action={subscription.url || urlMock}>
            <header className={b('section-header')}>
              <p className={b('subscription-form-title')}>{subscription.title}</p>
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
          <ul className={b('social-links')}>
            <SocialButtons
              items={[
                { text: 'twitter', link: twitterUrl || urlMock },
                { text: 'facebook-square', link: facebookUrl || urlMock },
                { text: 'instagram', link: instagramUrl || urlMock }]}
            />
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
