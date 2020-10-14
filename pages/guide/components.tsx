import { FC } from 'react';

import MainLayout from 'src/layouts/MainLayout';
import DataPicker from '@components/date-picker/DatePicker';

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <DataPicker />
    <DataPicker withTwoInputs />
  </MainLayout>
);

export default Components;
