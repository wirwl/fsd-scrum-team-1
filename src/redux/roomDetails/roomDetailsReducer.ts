import type { IRoom } from 'src/services/dto/Rooms';
import {
  IRoomDetailsActionTypes,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_FAIL,
  FETCH_ROOM_FETCHING,
} from './roomDetailsTypes';

export type IRoomDetailsState = {
  item: IRoom | null;
  error: string | null;
  isFetching: boolean;
};

const initState: IRoomDetailsState = {
  item: null,
  error: null,
  isFetching: false,
};

const roomDetailsReducer = (
  state: IRoomDetailsState = initState,
  action: IRoomDetailsActionTypes,
): IRoomDetailsState => {
  switch (action.type) {
    case FETCH_ROOM_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        item: action.payload,
      };
    case FETCH_ROOM_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case FETCH_ROOM_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default roomDetailsReducer;
