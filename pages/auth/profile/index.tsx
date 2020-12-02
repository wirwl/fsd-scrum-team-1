import { FC, useEffect } from 'react';
import { block } from 'bem-cn';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import type { WithTranslation } from 'next-i18next';

import ProfileLayout from 'src/layouts/ProfileLayout/ProfileLayout';
import i18n from 'src/services/i18n';

import type { IRootState } from 'src/redux/reducer';
import type { IUserState } from 'src/redux/user/userReducer';

import './Profile.scss';

const b = block('profile');

const userSelector = (store: IRootState): IUserState => store.user;

const Profile: FC<WithTranslation> = () => {
  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (user === null) {
      Router.push('/auth/sign-in');
    }
  }, [user]);

  return (
    <ProfileLayout title="Profile Form">
      <div className={b()}>
        <h1>profile form</h1>
      </div>
    </ProfileLayout>
  );
};

export default i18n.withTranslation('common')(
  Profile,
);
