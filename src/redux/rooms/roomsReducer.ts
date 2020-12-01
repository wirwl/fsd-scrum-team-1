import type { IRoom } from 'src/services/dto/Rooms';
import {
  IRoomsActionTypes,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAIL,
  FETCH_ROOMS_FETCHING,
  FETCH_MORE_ROOMS_SUCCESS,
  FETCH_ROOMS,
} from './roomsTypes';

type IRoomsState = {
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
    case FETCH_ROOMS:
      return {
        ...state,
        error: null,
        items: [],
      };
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
    case FETCH_MORE_ROOMS_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        items: state.items.concat(action.payload),
      };
    default:
      return state;
  }
};

export default roomReducer;

export type {
  IRoomsState,
};
