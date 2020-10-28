import { FC } from 'react';
import { block } from 'bem-cn';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import BannerAndSignature from 'src/components/BannerAndSignature/BannerAndSignature';
import FormLanding from 'src/components/FormLanding/FormLanding';

import './index.scss';

const PAGE_SIGNATURE = 'Лучшие номера для вашей работы, отдыха и просто вдохновения';
const TITLE = 'Toxin';

const b = block('index');

const Index: FC = () => (
  <MainLayout title={TITLE}>
    <BannerAndSignature signature={PAGE_SIGNATURE}>
      <section className={b()}>
        <FormLanding onSubmit={() => {}} />
      </section>
    </BannerAndSignature>
  </MainLayout>
);

export default Index;
