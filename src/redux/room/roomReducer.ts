import type { IRoom } from 'src/services/dto/Rooms';
import {
  IRoomsActionTypes,
  FETCH_ROOMS,
} from './roomTypes';

type IRoomsState = IRoom[];

const initState: IRoom[] = [];

const roomReducer = (
  state: IRoomsState = initState,
  action: IRoomsActionTypes,
): IRoomsState => {
  switch (action.type) {
    // for ex, remove after
    case FETCH_ROOMS:
      return state;
    default:
      return state;
  }
};

export default roomReducer;
