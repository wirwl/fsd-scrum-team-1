import type { FC } from 'react';
import { useRouter } from 'next/router';
import { block } from 'bem-cn';
import { useSelector } from 'react-redux';
import { TFunction } from 'next-i18next';

import './Header.scss';

import Logo from 'src/components/Logo/Logo';
import MainNav, { IMenuItem } from 'src/components/MainNav/MainNav';
import HeaderAuth from 'src/components/HeaderAuth/HeaderAuth';
import i18n from 'src/services/i18n';

import type { IRootState } from 'src/redux/reducer';
import type { IUserState } from 'src/redux/user/userReducer';

const getNavItems = (t: TFunction): IMenuItem[] => ([
  { label: t('nav.aboutUs'), href: '/' },
  {
    label: t('nav.services'),
    submenu: [
      { label: t('nav.booking'), href: '/about1' },
      { label: t('nav.discountNotification'), href: '/about2' },
      { label: t('nav.luggageDelivery'), href: '/about3' },
      { label: t('nav.carpsFishing'), href: '/about4' },
    ],
  },
  { label: t('nav.jobs'), href: '/vacancy' },
  { label: t('nav.news'), href: '/news' },
  {
    label: t('nav.agreements'),
    submenu: [
      { label: t('nav.booking'), href: '/about1' },
      { label: t('nav.discountNotification'), href: '/about2' },
      { label: t('nav.luggageDelivery'), href: '/about3' },
      { label: t('nav.carpsFishing'), href: '/about4' },
    ],
  }]
);

const b = block('header');

const userSelector = (store: IRootState): IUserState => store.user;

type HeaderProps = {
  t: TFunction;
};

const Header: FC<HeaderProps> = ({ t }) => {
  const router = useRouter();
  const { user } = useSelector(userSelector);

  const navItems = getNavItems(t);

  return (
    <header className={b()}>
      <div className={b('center')}>
        <div className={b('logo')}>
          <Logo />
        </div>

        <div className={b('nav')}>
          <MainNav items={navItems} currHref={router.pathname} />
        </div>

        <div className={b('auth-block')}>
          <HeaderAuth user={user} />
        </div>
      </div>
    </header>
  );
};

export default i18n.withTranslation('common')(Header);
