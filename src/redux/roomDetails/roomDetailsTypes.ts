import { IRoom } from 'src/services/dto/Rooms';

export const FETCH_ROOM = '@toxin-roomDetails/FETCH_ROOM';
export const FETCH_ROOM_SUCCESS = '@toxin-roomDetails/FETCH_ROOM_SUCCESS';
export const FETCH_ROOM_FAIL = '@toxin-roomDetails/FETCH_ROOM_FAIL';
export const FETCH_ROOM_FETCHING = '@toxin-roomDetails/FETCH_ROOM_FETCHING';

export type IFetchRoomDetailsParams = {
  id: string;
};

export type IFetchRoomDetailsAction = {
  type: typeof FETCH_ROOM;
  payload: IFetchRoomDetailsParams;
};

export type IFetchRoomDetailsSuccessAction = {
  type: typeof FETCH_ROOM_SUCCESS;
  payload: IRoom;
};

export type IFetchRoomDetailsFailAction = {
  type: typeof FETCH_ROOM_FAIL;
  payload: string;
};

export type IFetchRoomDetailsFetchingAction = {
  type: typeof FETCH_ROOM_FETCHING;
};

export type IRoomDetailsActionTypes =
  IFetchRoomDetailsAction
  | IFetchRoomDetailsSuccessAction
  | IFetchRoomDetailsFailAction
  | IFetchRoomDetailsFetchingAction;
