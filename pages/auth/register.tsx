import { FC } from 'react';
import { block } from 'bem-cn';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import RegistrationForm, { IUserInfo } from 'src/components/RegistrationForm/RegistrationForm';
import { registration } from '@/redux/user/userActions';
import { IRootState } from '@/redux/reducer';
import Spinner from '@/components/Spinner/Spinner';

import './Register.scss';

const b = block('registration');

const Register: FC = () => {
  const dispatch = useDispatch();
  const { isRequesting, error, user } = useSelector((state: IRootState) => state.user);

  const handleSubmit = (info: IUserInfo): void => {
    dispatch(registration(info));
  };

  if (!isRequesting) {
    if (user !== null) Router.push('/');
    if (error) console.error(error);
  }

  return (
    <MainLayout title="Register">
      <section className={b()}>
        <div className={b('form')}>
          <RegistrationForm onSubmit={handleSubmit} />
        </div>
      </section>
      {
          isRequesting
          && (
            <div className={b('spinner-container')}>
              <div className={b('spinner')}>
                <Spinner />
              </div>
            </div>
          )
        }
    </MainLayout>
  );
};

export default i18n.withTranslation('common')(
  Register,
);
