import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

import Api from 'src/services/Api';
import {
  FETCH_ROOMS,
  FETCH_ROOMS_FETCHING,
} from 'src/redux/room/roomTypes';
import {
  fetchRooms,
  fetchRoomsSuccess,
  fetchRoomsFail,
} from 'src/redux/room/roomActions';

const api = new Api();

function* fetchRoomsSaga(
  { payload }: ReturnType<typeof fetchRooms>,
): SagaIterator | null {
  yield put({ type: FETCH_ROOMS_FETCHING });
  try {
    const rooms = yield api.searchRooms({ id: payload.dEnd });
    yield put(fetchRoomsSuccess(rooms));
  } catch (error) {
    yield put(fetchRoomsFail(error.message));
  }
}

function* watchRoomSaga(): SagaIterator {
  yield takeLatest(FETCH_ROOMS, fetchRoomsSaga);
}

export default watchRoomSaga;
