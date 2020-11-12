import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import roomsSaga from 'src/redux/rooms/roomsSaga';

function* rootSaga(): SagaIterator {
  yield fork(roomsSaga);
}

export default rootSaga;
