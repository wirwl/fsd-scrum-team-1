import { FC } from 'react';
import { block } from 'bem-cn';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import FormSignIn from 'src/components/FormSignIn/FormSignIn';

import 'pages/auth/SignIn.scss';

const b = block('sign-in');

const SignIn: FC<WithTranslation> = ({ t }) => (
  <MainLayout title={t('titles.enter')}>
    <div className={b()}>
      <section className={b('layout')}>
        <FormSignIn />
      </section>
    </div>
  </MainLayout>
);

export default i18n.withTranslation('common')(
  SignIn,
);
