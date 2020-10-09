import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import booking from './booking';

const rootReducer = combineReducers({ booking });

const sagaMiddleware = createSagaMiddleware();

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
