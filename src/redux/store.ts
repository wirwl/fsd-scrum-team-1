import {
  createStore,
  applyMiddleware,
  Store,
  Reducer,
  Middleware,
  StoreEnhancer,
} from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from 'src/redux/rootSaga';
import reducer, { IRootState } from './reducer';

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
    reducer as Reducer<IRootState>,
    bindMiddleware([sagaMiddleware]),
  );

  (store as ISagaStore).sagaTask = sagaMiddleware.run(rootSaga);

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
