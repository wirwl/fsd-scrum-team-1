import { FC } from 'react';

import MainLayout from 'src/layouts/MainLayout';
import DataPicker from '@components/DatePicker/DatePicker';
import Calendar from '@components/Calendar/Calendar';

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <DataPicker />
    <DataPicker withTwoInputs />
  </MainLayout>
);

export default Components;
