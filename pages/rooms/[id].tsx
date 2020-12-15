import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { block } from 'bem-cn';
import type { WithTranslation, TFunction } from 'next-i18next';

import i18n from 'src/services/i18n';
import wrapper, { ISagaStore } from '@/redux/store';
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
import { END } from 'redux-saga';
import { bookingRoom } from '@/redux/bookedRooms/actions';
import { RangeDays } from '@/components/Calendar/Calendar';
import Router from 'next/router';
import { IDropListItem } from '@/components/InputDropdown/InputDropdown';
import { IBookingStore } from '@/redux/bookedRooms/types';

type IRoomDetailsProps = { id: string | string[] | undefined } & WithTranslation;

const b = block('room-details');

const spinner = (
  <div className={b('spinner-container')}>
    <div className={b('spinner')}>
      <Spinner />
    </div>
  </div>
);

const getDropdownItemsGuests = (t: TFunction): IDropListItem[] => ([
  {
    id: 'adults',
    label: t('components:guestInputDropdown.guests'),
    count: 1,
    plurals: {
      one: t('components:guestInputDropdown.guestOne'),
      two: t('components:guestInputDropdown.guestTwo'),
      few: t('components:guestInputDropdown.guestFew'),
    },
  },
  {
    id: 'children',
    label: t('components:guestInputDropdown.children'),
    count: 0,
    plurals: {
      one: t('components:guestInputDropdown.guestOne'),
      two: t('components:guestInputDropdown.guestTwo'),
      few: t('components:guestInputDropdown.guestFew'),
    },
  },
  {
    id: 'babies',
    label: t('components:guestInputDropdown.babies'),
    count: 0,
    plurals: {
      one: t('components:guestInputDropdown.babiesOne'),
      two: t('components:guestInputDropdown.babiesTwo'),
      few: t('components:guestInputDropdown.babiesFew'),
    },
    special: true,
  },
]);

const RoomDetails: FC<IRoomDetailsProps> = ({ t }) => {
  const dispatch = useDispatch();
  const { isFetching, item: room } = useSelector(
    (state: IRootState) => state.roomDetails,
  );
  const { user } = useSelector(
    (state: IRootState) => state.user,
  );
  const { isBookingRoomInProgress, bookingRoomError } = useSelector(
    (state: IRootState) => state.bookedRooms,
  );

  let bookingState: IBookingStore = {
    residenceTime: { start: null, end: null },
    guests: getDropdownItemsGuests(t),
  };

  if (typeof window !== 'undefined') {
    bookingState = localStorage.getItem('reduxState')
      ? JSON.parse(localStorage.getItem('reduxState')!)
      : {};
  }

  let residenceTime:RangeDays = { start: null, end: null };
  let guests: IDropListItem[] = getDropdownItemsGuests(t);
  if (bookingState) {
    residenceTime = {
      start: new Date(bookingState.residenceTime.start!),
      end: new Date(bookingState.residenceTime.end!),
    };
    guests = bookingState.guests!;
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isBookingRoomInProgress) {
      return ((): void => { if (!bookingRoomError) Router.push('/auth/profile/booked-rooms'); });
    }
  }, [isBookingRoomInProgress]);

  const handleSubmit = (range: RangeDays): void => {
    if (user && room) {
      dispatch(bookingRoom({
        dateStart: range.start ? range.start.getTime() : 0,
        dateEnd: range.end ? range.end.getTime() : 0,
        roomId: room.id,
        uid: user.uid,
      }));
    }
  };

  const pageContent = isFetching || room === null
    ? spinner
    : (
      <div className={b()}>
        <section className={b('gallery')}>
          <RoomGallery photos={room.pics.slice(-3).map((src) => ({ src, alt: src }))} />
        </section>
        <div className={b('container-content')}>
          <section className={b('room-info')}>
            <section className={b('main-info')}>
              <div className={b('room-advantages')}>
                <RoomDetailsList
                  header={t('room:roomInfo.title')}
                  roomDetails={room.roomInformation}
                />
              </div>
              <div className={b('reviews-chart')}>
                <ReviewsChart
                  reviews={{
                    bad: room.impressions.bad,
                    fine: room.impressions.satisfactorily,
                    good: room.impressions.good,
                    veryGood: room.impressions.perfectly,
                  }}
                  title={t('room:roomImpressions.title')}
                />
              </div>
            </section>
            {
              room.comments.length > 0
              && (
                <section className={b('comments')}>
                  <Comments
                    title={t('room:roomComments.title')}
                    allComments={room.comments.length}
                    items={room.comments.slice(-2)}
                  />
                </section>
              )
            }
            <section className={b('another-info')}>
              <div className={b('roles')}>
                <h3 className={b('roles-title')}>
                  {t('rules')}
                </h3>
                <BulletsList textList={room.roomRules} />
              </div>
              <div className={b('cancellation-terms')}>
                <RoomCancel title={t('cancel')} />
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
              onSubmit={handleSubmit}
              errorBooking={bookingRoomError}
              dates={residenceTime}
              guests={guests}
            />
          </div>
        </div>
        { isBookingRoomInProgress && spinner}
      </div>
    );

  return (
    <MainLayout title={t('titles.roomDetail')}>
      {pageContent}
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
  const { id } = query;
  store.dispatch(fetchRoomDetails({ id: String(id) }));
  store.dispatch(END);
  await (store as ISagaStore).sagaTask?.toPromise();
  return {};
});

export default i18n.withTranslation(['common', 'room'])(
  RoomDetails,
);
