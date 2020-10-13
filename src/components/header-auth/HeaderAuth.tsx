import type { FC } from 'react';
import Link from 'next/link';
import { block } from 'bem-cn';

import Button from '@components/button/Button';

import './header-auth.scss';

type IUser = {
  name: string
  lastName: string
};

type IHeaderAuthProps = {
  user: IUser | null
};

const b = block('header-auth');

const HeaderAuth: FC<IHeaderAuthProps> = ({ user }) => {
  const content = (user !== null)
    ? (
      <span className={b('user-name')}>
        {user.name}
        &nbsp;
        {user.lastName}
      </span>
    )
    : (
      <>
        <div className={b('action')}>
          <Link href="/auth/register">
            <Button
              href="/auth/register"
              theme="default"
              caption="Зарегистрироваться"
            />
          </Link>
        </div>

        <div className={b('action')}>
          <Link href="/auth/sign-in">
            <Button
              href="/auth/sign-in"
              theme="white"
              caption="Вход"
            />
          </Link>
        </div>
      </>
    );

  return (
    <div className={b()}>
      {content}
    </div>
  );
};

export default HeaderAuth;
