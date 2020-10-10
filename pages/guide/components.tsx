import { FC } from 'react';

import MainLayout from 'src/layouts/MainLayout';
import TextField from '@components/TextField/TextField';

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <TextField head="text field" placeholder="Email" />
    <TextField head="masked text field" placeholder="ДД.ММ.ГГГГ" mask="99.99.9999" />
    <TextField head="subscription text field" placeholder="Email" validate="email" withArrow />
  </MainLayout>
);

export default Components;
