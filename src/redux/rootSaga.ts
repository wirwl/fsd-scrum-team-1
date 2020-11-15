import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import userSaga from 'src/redux/user/userSaga';
import roomsSaga from 'src/redux/room/roomSaga';

function* rootSaga(): SagaIterator {
  yield fork(userSaga);
  yield fork(roomsSaga);
}

export default rootSaga;
