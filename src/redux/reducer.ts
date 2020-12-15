import {
  AnyAction,
  combineReducers,
} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import roomsReducer from 'src/redux/rooms/roomsReducer';
import userReducer from 'src/redux/user/userReducer';
import roomDetailsReducer from './roomDetails/roomDetailsReducer';
import bookedRoomsReducer from './bookedRooms/reducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  user: userReducer,
  roomDetails: roomDetailsReducer,
  bookedRooms: bookedRoomsReducer,
});

type IRootState = ReturnType<typeof rootReducer>;

const reducer = (
  state: IRootState,
  action: AnyAction,
): IRootState => {
  if (action.type === HYDRATE) {
    const _state = state as IRootState & { count: number };
    const nextState = {
      ..._state,
      ...action.payload,
    };

    if (_state.count) nextState.count = _state.count;
    return nextState;
  }

  return rootReducer(state, action);
};

export default reducer;

export type {
  IRootState,
};
