import { FETCH_ROOMS, IRoomsActionTypes } from './roomTypes';

// eslint-disable-next-line
export function fetchRooms(): IRoomsActionTypes {
  return {
    type: FETCH_ROOMS,
  };
}
