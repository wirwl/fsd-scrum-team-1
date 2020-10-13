import { FC } from 'react';

import MainLayout from 'src/layouts/MainLayout';
import Input from '@components/input/Input';

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <Input head="text field" placeholder="Email" />
    <Input head="masked text field" placeholder="ДД.ММ.ГГГГ" mask="99.99.9999" icon="expand" />
    <Input head="masked text field" placeholder="ДД.ММ.ГГГГ" mask="99.99.9999" icon="expand" selected readonly />
    <Input head="subscription text field" placeholder="Email" validate="email" icon="arrow" />
  </MainLayout>
);

export default Components;
