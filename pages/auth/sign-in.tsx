import { FC } from 'react';
import { block } from 'bem-cn';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import FormSignIn from 'src/components/FormSignIn/FormSignIn';

import 'pages/auth/SignIn.scss';

const b = block('sign-in');

const SignIn: FC = () => (
  <MainLayout title="Sign In">
    <div className={b()}>
      <section className={b('layout')}>
        <FormSignIn onSubmit={() => {}} />
      </section>
    </div>
  </MainLayout>
);

export default SignIn;
