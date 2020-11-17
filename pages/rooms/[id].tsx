import { FC, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { block } from 'bem-cn';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import { fetchRoomDetails } from '@/redux/roomDetails/roomDetailsActions';
import { IRootState } from '@/redux/reducer';
import ReviewsChart from '@/components/ReviewsChart/ReviewsChart';
import Spinner from '@/components/Spinner/Spinner';

type IRoomDetailsProps = { id: string | string[] | undefined };

const b = block('room-details');

const RoomDetails: FC<IRoomDetailsProps> = ({ id }) => {
  const { isFetching, error, item: room } = useSelector((state: IRootState) => state.roomDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomDetails({ id: String(id) }));
  }, []);

  const pageContent = isFetching && room
    ? <Spinner />
    : (
      <div className={b()}>
        <div className={b('container-content')}>
          <section className={b('room-info')}>
            <section className={b('main-info')}>
              <div className={b('room-advantages')}>
                {/* Добавить преимущества номера */}
              </div>
              <div className={b('reviews-chart')}>
                <ReviewsChart
                  reviews={{
                    bad: 0,
                    fine: 0,
                    good: 0,
                    veryGood: 0,
                  }}
                  title="Впечатления от номера"
                />
              </div>
            </section>
            <section className={b('comments')}>
              {/* Список комментариев */}
            </section>
            <section className={b('another-info')}>
              <div className={b('rooles')}>
                {/* rooles */}
              </div>
              <div className={b('cancellation terms')}>
                {/*  условия отмены */}
              </div>
            </section>
          </section>
          <div className={b('form-booking-room')}>
            {/* Форма с калькулятором */}
          </div>
        </div>
      </div>
    );

  return (
    <MainLayout title={`Room ${isFetching && room ? room.roomNumber : 'Details'}`}>
      {pageContent}
    </MainLayout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { id: context.query.id },
});

export { getServerSideProps };

export default RoomDetails;
