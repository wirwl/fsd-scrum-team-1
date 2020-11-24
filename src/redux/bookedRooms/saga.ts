import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import Api from '@/services/Api';

import {
  BookingRoomAction,
  BOOKING_ROOM,
  FetchBookedRoomsAction,
  FETCH_BOOKED_ROOMS,
} from './types';
import {
  bookingRoomFail,
  bookingRoomSuccess,
  fetchBookedRoomsFail,
  fetchBookedRoomsSuccess,
} from './actions';

const api = new Api();

function* fetchBookedRoomsWorker(action: FetchBookedRoomsAction): SagaIterator {
  try {
    const rooms = yield call(api.getBookedRooms, action.payload);
    yield put(fetchBookedRoomsSuccess(rooms));
  } catch (error) {
    yield put(fetchBookedRoomsFail(error));
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
    yield call(api.booking, uid, roomId, dateStart, dateEnd);
    yield put(bookingRoomSuccess());
  } catch (error) {
    yield put(bookingRoomFail(error));
  }
}

export function* bookingRoomSaga(): SagaIterator {
  yield takeEvery(BOOKING_ROOM, bookingRoomWorker);
}
