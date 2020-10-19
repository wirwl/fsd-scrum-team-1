import { FC } from 'react';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import Input from '@components/Input/Input';
import Calendar from '@components/Calendar/Calendar';

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <Input head="text field" placeholder="Email" />
    <Input head="masked text field" placeholder="ДД.ММ.ГГГГ" mask="99.99.9999" />
    <Input head="subscription text field" placeholder="Email" validate="email" withArrow />
    <Calendar />
  </MainLayout>
);

export default Components;
