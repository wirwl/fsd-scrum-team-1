import { FC } from 'react';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import Calendar from '@components/Calendar/Calendar';

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <Calendar />
  </MainLayout>
);

export default Components;
