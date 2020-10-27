import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

import { FETCH_ROOMS } from 'src/redux/room/roomTypes';

const wait = (s: number): Promise<void> => new Promise((resolve) => setTimeout(() => resolve(), s));

// eslint-disable-next-line
function* fetchCurrentUser(): SagaIterator | null {
  // eslint-disable-next-line
  console.log('fetch room saga');
  yield wait(1000);
  yield put({
    type: 'FETCH_ROOMS_SUCCESS',
  });
}

function* watchRoomSaga(): SagaIterator {
  yield takeLatest(FETCH_ROOMS, fetchCurrentUser);
}

export default watchRoomSaga;
