import type { IRoom } from 'src/services/dto/Rooms';
import type { ISearchFilters } from 'src/services/Api';
import {
  FETCH_ROOMS,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAIL,
  FETCH_MORE_ROOMS,
  FETCH_MORE_ROOMS_SUCCESS,
  FETCH_MORE_ROOMS_FAIL,
  IFetchRoomsAction,
  IFetchRoomsSuccessAction,
  IFetchRoomsFailAction,
  IFetchMoreRoomsAction,
  IFetchMoreRoomsSuccessAction,
  IFetchMoreRoomsFailAction,
} from './roomsTypes';

export const fetchRooms = (
  params: ISearchFilters,
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

export const fetchMoreRooms = (
  params: ISearchFilters,
): IFetchMoreRoomsAction => ({
  type: FETCH_MORE_ROOMS,
  payload: params,
});

export const fetchMoreRoomsSuccess = (
  rooms: IRoom[],
): IFetchMoreRoomsSuccessAction => ({
  type: FETCH_MORE_ROOMS_SUCCESS,
  payload: rooms,
});

export default {
  fetchRooms,
  fetchRoomsSuccess,
  fetchRoomsFail,
  fetchMoreRooms,
};
