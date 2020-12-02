import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { block } from 'bem-cn';

import wrapper, { ISagaStore } from 'src/redux/store';
import { fetchBookedRooms } from 'src/redux/bookedRooms/actions';
import { IRootState } from 'src/redux/reducer';

import ProfileLayout from 'src/layouts/ProfileLayout/ProfileLayout';
import BookedRoomsList from 'src/components/BookedRoomsList/BookedRoomsList';

import './BookedRooms.scss';

const b = block('booked-rooms');

const BookedRooms: FC = () => {
  const dispatch = useDispatch();
  const { user, isRequesting } = useSelector((store: IRootState) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (!user && !isRequesting) {
      router.push('/auth/sign-in');
    }
  }, [user, isRequesting]);

  useEffect(() => {
    dispatch(fetchBookedRooms());
  }, []);

  return (
    <ProfileLayout title="Забронированные номера">
      <div className={b()}>
        <BookedRoomsList />
      </div>
    </ProfileLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(fetchBookedRooms());
    store.dispatch(END);
    await (store as ISagaStore).sagaTask?.toPromise();
  },
);

export default BookedRooms;
