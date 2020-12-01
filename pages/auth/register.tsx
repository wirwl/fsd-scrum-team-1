import { FC } from 'react';
import { block } from 'bem-cn';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import RegistrationForm from 'src/components/RegistrationForm/RegistrationForm';

import './Register.scss';

const b = block('registration');

const Register: FC<WithTranslation> = ({ t }) => (
  <MainLayout title={t('titles.register')}>
    <section className={b()}>
      <div className={b('form')}>
        <RegistrationForm onSubmit={() => {}} />
      </div>
    </section>
  </MainLayout>
);

export default i18n.withTranslation('common')(
  Register,
);
