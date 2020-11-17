import { IRoom } from 'src/services/dto/Rooms';
import {
  FETCH_ROOM,
  FETCH_ROOM_FAIL,
  FETCH_ROOM_SUCCESS,
  IFetchRoomDetailsAction,
  IFetchRoomDetailsFailAction,
  IFetchRoomDetailsParams,
  IFetchRoomDetailsSuccessAction,
} from './roomDetailsTypes';

export const fetchRoomDetails = (
  params: IFetchRoomDetailsParams,
): IFetchRoomDetailsAction => ({
  type: FETCH_ROOM,
  payload: params,
});

export const fetchRoomDetailsSuccess = (
  room: IRoom,
): IFetchRoomDetailsSuccessAction => ({
  type: FETCH_ROOM_SUCCESS,
  payload: room,
});

export const fetchRoomDetailsFail = (
  error: string,
): IFetchRoomDetailsFailAction => ({
  type: FETCH_ROOM_FAIL,
  payload: error,
});

export default {
  fetchRoomDetails,
  fetchRoomDetailsSuccess,
  fetchRoomDetailsFail,
};
