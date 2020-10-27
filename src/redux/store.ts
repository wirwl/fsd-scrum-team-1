import {
  createStore,
  applyMiddleware,
  Store,
  AnyAction,
  Reducer,
  Middleware,
  StoreEnhancer,
  CombinedState,
} from 'redux';
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { IRootState } from './rootReducer';
import roomSaga from './room/roomSaga';

type ISagaStore = Store & {
  sagaTask?: Task;
};

const isProd = process.env.NODE_ENV === 'production';

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

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (isProd) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore<IRootState> = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer as Reducer<CombinedState<IRootState>>,
    bindMiddleware([sagaMiddleware]),
  );

  (store as ISagaStore).sagaTask = sagaMiddleware.run(roomSaga);

  return store;
};

const wrapper = createWrapper<IRootState>(
  makeStore,
  { debug: !isProd },
);

export default wrapper;

export type {
  ISagaStore,
};
