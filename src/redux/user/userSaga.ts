import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

function* watchUserSaga(): SagaIterator {
  // yield takeLatest(FETCH_ROOMS, fetchRoomsSaga);
}

export default watchUserSaga;
