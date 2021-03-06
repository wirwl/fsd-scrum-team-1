import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import Api from '@/services/Api';

import { IRootState } from '../reducer';
import { BookingRoomAction, BOOKING_ROOM, FETCH_BOOKED_ROOMS } from './types';
import {
  bookingRoomFail,
  bookingRoomSuccess,
  fetchBookedRoomsFail,
  fetchBookedRoomsSuccess,
} from './actions';

const api = new Api();

const selectUserId = (store: IRootState): string => (
  store.user.user ? store.user.user.uid : ''
);

function* fetchBookedRoomsWorker(): SagaIterator {
  try {
    const userId = yield select(selectUserId);
    const rooms = yield call(api.getBookedRooms.bind(api), userId);
    yield put(fetchBookedRoomsSuccess(rooms));
  } catch (error) {
    yield put(fetchBookedRoomsFail(String(error)));
  }
}

export function* bookedRoomsSaga(): SagaIterator {
  yield takeEvery(FETCH_BOOKED_ROOMS, fetchBookedRoomsWorker);
}

function* bookingRoomWorker(action: BookingRoomAction): SagaIterator {
  const {
    uid,
    roomId,
    dateEnd,
    dateStart,
  } = action.payload;

  try {
    yield call(api.booking.bind(api), uid, roomId, dateStart, dateEnd);
    yield put(bookingRoomSuccess());
  } catch (error) {
    yield put(bookingRoomFail(error));
  }
}

export function* bookingRoomSaga(): SagaIterator {
  yield takeEvery(BOOKING_ROOM, bookingRoomWorker);
}
