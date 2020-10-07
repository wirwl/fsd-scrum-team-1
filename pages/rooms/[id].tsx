import React from 'react';
import { NextPageContext } from 'next';

import PagesLayout from 'src/layouts/PagesLayout';

type IRoomDetailsProps = { id: string | string[] | undefined };

const RoomDetails: React.FC<IRoomDetailsProps> = ({ id }) => (
  <PagesLayout title="Room Details">
    <h1>{`Room #${id} Details Page`}</h1>
  </PagesLayout>
);

const getServerSideProps = async (
  context: NextPageContext,
): Promise<{ props: IRoomDetailsProps }> => ({
  props: { id: context.query.id },
});

export { getServerSideProps };

export default RoomDetails;
