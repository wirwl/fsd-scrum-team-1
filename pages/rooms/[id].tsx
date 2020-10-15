import { FC } from 'react';
import { GetServerSideProps } from 'next';

import MainLayout from 'src/layouts/MainLayout';

type IRoomDetailsProps = { id: string | string[] | undefined };

const RoomDetails: FC<IRoomDetailsProps> = ({ id }) => (
  <MainLayout title="Room Details">
    <h1>{`Room #${id} Details Page`}</h1>
  </MainLayout>
);

const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { id: context.query.id },
});

export { getServerSideProps };

export default RoomDetails;
