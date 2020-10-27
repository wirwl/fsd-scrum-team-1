import { IRoom } from 'src/services/dto/Rooms';
import {
  FETCH_ROOMS,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAIL,
  IFetchRoomsParams,
  IFetchRoomsAction,
  IFetchRoomsSuccessAction,
  IFetchRoomsFailAction,
} from './roomTypes';

export const fetchRooms = (
  params: IFetchRoomsParams,
): IFetchRoomsAction => ({
  type: FETCH_ROOMS,
  payload: params,
});

export const fetchRoomsSuccess = (
  rooms: IRoom[],
): IFetchRoomsSuccessAction => ({
  type: FETCH_ROOMS_SUCCESS,
  payload: rooms,
});

export const fetchRoomsFail = (
  error: string,
): IFetchRoomsFailAction => ({
  type: FETCH_ROOMS_FAIL,
  payload: error,
});

export default {
  fetchRooms,
  fetchRoomsSuccess,
  fetchRoomsFail,
};
