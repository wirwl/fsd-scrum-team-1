import {
  createStore,
  applyMiddleware,
  Store,
  Reducer,
  Middleware,
  StoreEnhancer,
  CombinedState,
} from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer, { IRootState } from './reducer';
import roomSaga from './room/roomSaga';

type ISagaStore = Store & {
  sagaTask?: Task;
};

const isProd = process.env.NODE_ENV === 'production';

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (!isProd) {
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
