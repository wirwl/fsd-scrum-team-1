import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

import Api, { ISearchFilters } from 'src/services/Api';
import { FETCH_ROOMS, FETCH_ROOMS_FETCHING } from 'src/redux/room/roomTypes';
import { fetchRoomsSuccess, fetchRoomsFail } from 'src/redux/room/roomActions';

function* fetchRooms(api: Api, filters: ISearchFilters): SagaIterator | null {
  yield put({ type: FETCH_ROOMS_FETCHING });
  try {
    const rooms = yield api.searchRooms(filters);
    yield put(fetchRoomsSuccess(rooms));
  } catch (error) {
    yield put(fetchRoomsFail(error.message));
  }
}

function* watchRoomSaga(filters: ISearchFilters): SagaIterator {
  const api = new Api();
  yield takeLatest(FETCH_ROOMS, fetchRooms, api, filters);
}

export default watchRoomSaga;
