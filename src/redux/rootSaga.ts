import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import userSaga from 'src/redux/user/userSaga';
import roomsSaga from 'src/redux/rooms/roomsSaga';
import watchRoomDetailsSaga from './roomDetails/roomDetailsSaga';
import { bookedRoomsSaga, bookingRoomSaga } from './bookedRooms/saga';

function* rootSaga(): SagaIterator {
  yield fork(userSaga);
  yield fork(roomsSaga);
  yield fork(watchRoomDetailsSaga);
  yield fork(bookedRoomsSaga);
  yield fork(bookingRoomSaga);
}

export default rootSaga;
