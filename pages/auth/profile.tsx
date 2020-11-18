import { FC, useEffect } from 'react';
import { block } from 'bem-cn';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import { signOut } from 'src/redux/user/userActions';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import Button from 'src/components/Button/Button';

import type { IRootState } from 'src/redux/reducer';
import type { IUserState } from 'src/redux/user/userReducer';

import './Profile.scss';

const b = block('profile');

const userSelector = (store: IRootState): IUserState => store.user;

const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (user === null) {
      Router.push('/auth/sign-in');
    }
  }, [user]);

  const handleSingOutButtonClick = (): void => {
    dispatch(signOut());
  };

  return (
    <MainLayout title="Profile">
      <div className={b()}>
        <section className={b('layout')}>
          <Button
            caption="Выход"
            handleClick={handleSingOutButtonClick}
          />
        </section>
      </div>
    </MainLayout>
  );
};

export default Profile;
