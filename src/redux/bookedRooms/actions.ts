import { IBookedRoom } from '@/services/Api';
import {
  BookedRoomsAction,
  BOOKING_ROOM,
  BOOKING_ROOM_FAIL,
  BOOKING_ROOM_SUCCESS,
  FETCH_BOOKED_ROOMS,
  FETCH_BOOKED_ROOMS_FAIL,
  FETCH_BOOKED_ROOMS_SUCCESS,
} from './types';

export const fetchBookedRooms = (): BookedRoomsAction => ({
  type: FETCH_BOOKED_ROOMS,
});

export const fetchBookedRoomsSuccess = (rooms: IBookedRoom[]): BookedRoomsAction => ({
  type: FETCH_BOOKED_ROOMS_SUCCESS,
  payload: rooms,
});

export const fetchBookedRoomsFail = (error: string): BookedRoomsAction => ({
  type: FETCH_BOOKED_ROOMS_FAIL,
  payload: error,
});

export const bookingRoom = (info: {
  uid: string;
  roomId: string;
  dateStart: number;
  dateEnd: number;
}): BookedRoomsAction => ({
  type: BOOKING_ROOM,
  payload: info,
});

export const bookingRoomSuccess = (): BookedRoomsAction => ({
  type: BOOKING_ROOM_SUCCESS,
});

export const bookingRoomFail = (error: string): BookedRoomsAction => ({
  type: BOOKING_ROOM_FAIL,
  payload: error,
});
