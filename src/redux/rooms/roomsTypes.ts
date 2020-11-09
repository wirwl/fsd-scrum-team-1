import { IRoom } from 'src/services/dto/Rooms';
import type { ISearchFilters } from 'src/services/Api';

export const FETCH_ROOMS = '@toxin/FETCH_ROOMS';
export const FETCH_ROOMS_SUCCESS = '@toxin/FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_FAIL = '@toxin/FETCH_ROOMS_FAIL';
export const FETCH_ROOMS_FETCHING = '@toxin/FETCH_ROOMS_FETCHING';

export type IFetchRoomsAction = {
  type: typeof FETCH_ROOMS;
  payload: ISearchFilters;
};

export type IFetchRoomsSuccessAction = {
  type: typeof FETCH_ROOMS_SUCCESS;
  payload: IRoom[];
};

export type IFetchRoomsFailAction = {
  type: typeof FETCH_ROOMS_FAIL;
  payload: string;
};

export type IFetchRoomsFetchingAction = {
  type: typeof FETCH_ROOMS_FETCHING;
};

export type IRoomsActionTypes =
  IFetchRoomsAction
  | IFetchRoomsSuccessAction
  | IFetchRoomsFailAction
  | IFetchRoomsFetchingAction;
