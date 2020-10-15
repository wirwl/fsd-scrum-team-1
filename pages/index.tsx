import { FC } from 'react';

import BannerAndSignature from '@components/BannerAndSignature/BannerAndSignature';
import MainLayout from 'src/layouts/MainLayout/MainLayout';

const PAGE_SIGNATURE = 'Лучшие номера для вашей работы, отдыха и просто вдохновения';

const Main: FC = () => (
  <MainLayout title="Toxin">
    <BannerAndSignature signature={PAGE_SIGNATURE}>
      awesome form
    </BannerAndSignature>
  </MainLayout>
);

export default Main;
