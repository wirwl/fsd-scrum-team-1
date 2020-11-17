import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import roomsSaga from 'src/redux/rooms/roomsSaga';
import watchRoomDetailsSaga from './roomDetails/roomDetailsSaga';

function* rootSaga(): SagaIterator {
  yield fork(roomsSaga);
  yield fork(watchRoomDetailsSaga);
}

export default rootSaga;