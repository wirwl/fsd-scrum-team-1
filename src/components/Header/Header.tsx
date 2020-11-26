import type { FC } from 'react';
import { useRouter } from 'next/router';
import { block } from 'bem-cn';
import { useSelector, useDispatch } from 'react-redux';

import './Header.scss';

import Logo from 'src/components/Logo/Logo';
import MainNav, { IMenuItem } from 'src/components/MainNav/MainNav';
import HeaderAuth from 'src/components/HeaderAuth/HeaderAuth';
import { signOut } from 'src/redux/user/userActions';

import type { IRootState } from 'src/redux/reducer';
import type { IUserState } from 'src/redux/user/userReducer';

const navItems: IMenuItem[] = [
  { label: 'О нас', href: '/' },
  {
    label: 'Услуги',
    submenu: [
      { label: 'Бронирование', href: '/about1' },
      { label: 'Уведомления о скидках', href: '/about2' },
      { label: 'Доставка багажа', href: '/about3' },
      { label: 'Ловля карасей в бассейне', href: '/about4' },
    ],
  },
  { label: 'Вакансии', href: '/vacancy' },
  { label: 'Новости', href: '/news' },
  {
    label: 'Соглашения',
    submenu: [
      { label: 'Бронирование', href: '/about11' },
      { label: 'Уведомления о скидках', href: '/about22' },
      { label: 'Доставка багажа', href: '/about33' },
      { label: 'Ловля карасей в бассейне', href: '/about44' },
    ],
  },
];

const b = block('header');

const userSelector = (store: IRootState): IUserState => store.user;

const Header: FC = () => {
  const router = useRouter();
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleExitButtonClick = (): void => {
    dispatch(signOut());
  };

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
          <HeaderAuth user={user} onExitClick={handleExitButtonClick} />
        </div>
      </div>
    </header>
  );
};

export default Header;
