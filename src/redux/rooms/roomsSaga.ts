import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

import Api from 'src/services/Api';
import {
  FETCH_ROOMS,
  FETCH_ROOMS_FETCHING,
} from 'src/redux/rooms/roomsTypes';
import {
  fetchRooms,
  fetchRoomsSuccess,
  fetchRoomsFail,
} from 'src/redux/rooms/roomsActions';

const api = new Api();

function* fetchRoomsSaga(
  { payload }: ReturnType<typeof fetchRooms>,
): SagaIterator | null {
  yield put({ type: FETCH_ROOMS_FETCHING });
  try {
    const rooms = yield api.searchRooms(payload);
    yield put(fetchRoomsSuccess(rooms));
  } catch (error) {
    yield put(fetchRoomsFail(error.message));
  }
}

function* watchRoomSaga(): SagaIterator {
  yield takeLatest(FETCH_ROOMS, fetchRoomsSaga);
}

export default watchRoomSaga;
