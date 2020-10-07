import { FC } from 'react';
import { GetServerSideProps } from 'next';

import PagesLayout from 'src/layouts/PagesLayout';

type IRoomDetailsProps = { id: string | string[] | undefined };

const RoomDetails: FC<IRoomDetailsProps> = ({ id }) => (
  <PagesLayout title="Room Details">
    <h1>{`Room #${id} Details Page`}</h1>
  </PagesLayout>
);

const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<{ props: IRoomDetailsProps }> => ({
  props: { id: context.query.id },
});

export { getServerSideProps };

export default RoomDetails;
