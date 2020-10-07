import { combineReducers } from 'redux';
import booking from './booking';

const rootReducer = combineReducers({ booking });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
