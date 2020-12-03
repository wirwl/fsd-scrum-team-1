import { FC, useEffect } from 'react';
import { block } from 'bem-cn';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import type { WithTranslation } from 'next-i18next';

import ProfileLayout from 'src/layouts/ProfileLayout/ProfileLayout';
import i18n from 'src/services/i18n';
import FormProfile from 'src/components/FormProfile/FormProfile';

import type { IUserInfo } from 'src/components/FormProfile/FormProfile';
import type { IRootState } from 'src/redux/reducer';
import type { IUserState } from 'src/redux/user/userReducer';

import './Profile.scss';
import { updateUser } from '@/redux/user/userActions';

const b = block('profile');

const userSelector = (store: IRootState): IUserState => store.user;

const Profile: FC<WithTranslation> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (user === null) {
      Router.push('/auth/sign-in');
    }
  }, [user]);

  const handleUpdateProfileSubmit = (newUserInfo: IUserInfo): void => {
    dispatch(updateUser(newUserInfo));
  };

  return (
    <ProfileLayout title="Profile Form">
      <div className={b()}>
        {
          user !== null
            ? (
              <FormProfile
                onSubmit={handleUpdateProfileSubmit}
                user={user}
              />
            )
            : ''
        }
      </div>
    </ProfileLayout>
  );
};

export default i18n.withTranslation('common')(
  Profile,
);
