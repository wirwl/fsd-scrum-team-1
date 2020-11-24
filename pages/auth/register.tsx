import { FC } from 'react';
import { block } from 'bem-cn';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import RegistrationForm from 'src/components/RegistrationForm/RegistrationForm';

import './Register.scss';

const b = block('registration');

const Register: FC = () => (
  <MainLayout title="Register">
    <section className={b()}>
      <div className={b('form')}>
        <RegistrationForm onSubmit={() => {}} />
      </div>
    </section>
  </MainLayout>
);

export default Register;
