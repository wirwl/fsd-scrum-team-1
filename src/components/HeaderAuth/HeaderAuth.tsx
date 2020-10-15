import type { FC } from 'react';
import Link from 'next/link';
import { block } from 'bem-cn';

import Button from '@components/Button/Button';

import './HeaderAuth.scss';

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
          <Link href="/auth/sign-in">
            <a className={b('link')} href="/auth/sign-in">
              <Button
                theme="white"
                caption="Вход"
              />
            </a>
          </Link>
        </div>

        <div className={b('action')}>
          <Link href="/auth/register">
            <a className={b('link')} href="/auth/register">
              <Button
                theme="default"
                caption="Зарегистрироваться"
              />
            </a>
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
