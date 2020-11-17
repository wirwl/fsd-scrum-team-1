import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

import Api from 'src/services/Api';
import {
  FETCH_ROOM,
  FETCH_ROOM_FETCHING,
} from 'src/redux/roomDetails/roomDetailsTypes';
import {
  fetchRoomDetails,
  fetchRoomDetailsSuccess,
  fetchRoomDetailsFail,
} from 'src/redux/roomDetails/roomDetailsActions';

const api = new Api();

function* fetchRoomDetailsSaga(
  { payload }: ReturnType<typeof fetchRoomDetails>,
): SagaIterator | null {
  yield put({ type: FETCH_ROOM_FETCHING });
  try {
    const room = yield api.searchRoom(payload.id);
    yield put(fetchRoomDetailsSuccess(room));
  } catch (error) {
    yield put(fetchRoomDetailsFail(error.message));
  }
}

function* watchRoomDetailsSaga(): SagaIterator {
  yield takeLatest(FETCH_ROOM, fetchRoomDetailsSaga);
}

export default watchRoomDetailsSaga;
