import { all } from 'redux-saga/effects';

import watchRoomSaga from './room/roomSaga';
import watchRoomDetailsSaga from './roomDetails/roomDetailsSaga';

function* rootSaga(): Generator {
  yield all([
    watchRoomSaga(),
    watchRoomDetailsSaga(),
  ]);
}

export default rootSaga;
