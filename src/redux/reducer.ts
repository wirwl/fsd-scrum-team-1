import {
  AnyAction,
  combineReducers,
} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import roomsReducer from './room/roomReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
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