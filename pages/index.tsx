import { FC } from 'react';

import BannerAndSignature from 'src/components/BannerAndSignature/BannerAndSignature';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import '../src/components/LikeButton/LikeButton';

const PAGE_SIGNATURE = 'Лучшие номера для вашей работы, отдыха и просто вдохновения';
const TITLE = 'Toxin';

const Main: FC = () => (
  <MainLayout title={TITLE}>
    <BannerAndSignature signature={PAGE_SIGNATURE}>
      awesome form
    </BannerAndSignature>
  </MainLayout>
);

export default Main;
