import { FC } from 'react';

import MainLayout from '@/layouts/MainLayout';
import InputDropdown from '@/components/InputDropdown/InputDropdown';

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <InputDropdown name="guests-input" />
  </MainLayout>
);

export default Components;
