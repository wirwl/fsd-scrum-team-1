import { FC } from 'react';

import MainLayout from 'src/layouts/MainLayout';
import Calendar from '@components/calendar/Calendar';

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <Calendar />
  </MainLayout>
);

export default Components;
