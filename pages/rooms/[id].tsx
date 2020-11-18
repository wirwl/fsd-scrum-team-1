import { FC, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { block } from 'bem-cn';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import { fetchRoomDetails } from '@/redux/roomDetails/roomDetailsActions';
import { IRootState } from '@/redux/reducer';
import ReviewsChart from '@/components/ReviewsChart/ReviewsChart';
import Spinner from '@/components/Spinner/Spinner';
import RoomGallery from '@/components/RoomGallery/RoomGallery';
import RoomDetailsList from '@/components/RoomDetailsList/RoomDetailsList';
import Comments from '@/components/Comments/Comments';
import BulletsList from '@/components/BulletsList/BulletsList';
import RoomCancel from '@/components/RoomCancel/RoomCancel';
import FormRoomDetails from '@/components/FormRoomDetails/FormRoomDetails';

import './roomDetails.scss';

type IRoomDetailsProps = { id: string | string[] | undefined };

const b = block('room-details');

const RoomDetails: FC<IRoomDetailsProps> = ({ id }) => {
  const { isFetching, item: room } = useSelector((state: IRootState) => state.roomDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomDetails({ id: String(id) }));
  }, []);

  const pageContent = room === null
    ? <Spinner />
    : (
      <div className={b()}>
        <section className={b('gallery')}>
          <RoomGallery photos={room.pics.map((src) => ({ src, alt: src }))} />
        </section>
        <div className={b('container-content')}>
          <section className={b('room-info')}>
            <section className={b('main-info')}>
              <div className={b('room-advantages')}>
                <RoomDetailsList header="Сведения о номере" roomDetails={room.roomInformation} />
              </div>
              <div className={b('reviews-chart')}>
                <ReviewsChart
                  reviews={{
                    bad: room.impressions.bad,
                    fine: room.impressions.satisfactorily,
                    good: room.impressions.good,
                    veryGood: room.impressions.perfectly,
                  }}
                  title="Впечатления от номера"
                />
              </div>
            </section>
            {
              room.comments.length > 0
              && (
                <section className={b('comments')}>
                  <Comments allComments={room.comments.length} items={room.comments.slice(-2)} />
                </section>
              )
            }
            <section className={b('another-info')}>
              <div className={b('roles')}>
                <h3 className={b('roles-title')}>Правила</h3>
                <BulletsList textList={room.roomRules} />
              </div>
              <div className={b('cancellation-terms')}>
                <RoomCancel />
              </div>
            </section>
          </section>
          <div className={b('form-booking-room')}>
            <FormRoomDetails
              roomNumber={room.roomNumber}
              isLuxury={room.isLux}
              price={room.price}
              discount={room.discount}
              serviceCharge={room.feeForService}
              additionalServiceCharge={room.feeForAdditionalService}
            />
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
