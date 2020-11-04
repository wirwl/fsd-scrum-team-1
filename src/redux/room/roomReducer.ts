import type { IRoom } from 'src/services/dto/Rooms';
import {
  IRoomsActionTypes,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAIL,
  FETCH_ROOMS_FETCHING,
} from './roomTypes';

export type IRoomsState = {
  items: IRoom[];
  error: string | null;
  isFetching: boolean;
};

const initState: IRoomsState = {
  items: [],
  error: null,
  isFetching: false,
};

const roomReducer = (
  state: IRoomsState = initState,
  action: IRoomsActionTypes,
): IRoomsState => {
  switch (action.type) {
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        items: action.payload,
      };
    case FETCH_ROOMS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case FETCH_ROOMS_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default roomReducer;
