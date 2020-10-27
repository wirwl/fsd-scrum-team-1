import { combineReducers } from 'redux';

import roomsReducer from './room/roomReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
});

type IRootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export type {
  IRootState,
};
