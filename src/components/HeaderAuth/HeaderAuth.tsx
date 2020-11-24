import type { FC } from 'react';
import Link from 'next/link';
import { block } from 'bem-cn';
import i18n from 'src/services/i18n';
import type { TFunction } from 'next-i18next';

import Button from 'src/components/Button/Button';
import type { IUser } from 'src/services/dto/User';

import './HeaderAuth.scss';

type IHeaderAuthProps = {
  user: IUser | null;
  t: TFunction;
};

const b = block('header-auth');

const HeaderAuth: FC<IHeaderAuthProps> = ({ user, t }) => {
  const content = (user !== null)
    ? (
      <span className={b('user-name')}>
        {user.name}
        &nbsp;
        {user.lastname}
      </span>
    )
    : (
      <>
        <div className={b('action')}>
          <Link href="/auth/sign-in">
            <a className={b('link')} href="/auth/sign-in">
              <Button
                theme="white"
                caption={t('enter')}
              />
            </a>
          </Link>
        </div>

        <div className={b('action')}>
          <Link href="/auth/register">
            <a className={b('link')} href="/auth/register">
              <Button
                theme="default"
                caption={t('register')}
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

export default i18n.withTranslation('common')(HeaderAuth);
