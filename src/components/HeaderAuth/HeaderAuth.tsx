import type { FC } from 'react';
import Link from 'next/link';
import { block } from 'bem-cn';

import Button from 'src/components/Button/Button';
import type { IUser } from 'src/services/dto/User';

import './HeaderAuth.scss';

type IHeaderAuthProps = {
  user: IUser | null;
  onExitClick: () => void;
};

const b = block('header-auth');

const HeaderAuth: FC<IHeaderAuthProps> = ({ user, onExitClick }) => {
  const content = (user !== null)
    ? (
      <div className={b('profile')}>

        <Link href="/auth/profile">
          <span className={b('user-name-link')} tabIndex={0} role="link">
            {user.name}
            &nbsp;
            {user.lastname}
          </span>
        </Link>

        &nbsp;
        &nbsp;

        <span className={b('profile-exit')}>
          <Button
            handleClick={onExitClick}
            caption="Выход"
          />
        </span>
      </div>
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
