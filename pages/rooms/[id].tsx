import React from 'react';
import { useRouter } from 'next/router';

import PagesLayout from 'src/layouts/PagesLayout';

const RoomDetails: React.FC = () => {
  const router = useRouter();

  return (
    <PagesLayout title="Room Details">
      <h1>{`Room #${router.query.id} Details Page`}</h1>
    </PagesLayout>
  );
};

export default RoomDetails;
