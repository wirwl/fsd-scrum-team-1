import Filter from '@/components/Filter/Filter';
import { FC } from 'react';

import MainLayout from 'src/layouts/MainLayout/MainLayout';

const Rooms: FC = () => (
  <MainLayout title="Rooms">
    <div style={{ width: '266px' }}>
      <Filter />
    </div>
  </MainLayout>
);

export default Rooms;
