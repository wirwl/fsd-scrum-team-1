import { IRoom } from '@/services/dto/Rooms';

export const FETCH_BOOKED_ROOMS = '@toxin-booked-rooms/FETCH_BOOKED_ROOMS';
export const FETCH_BOOKED_ROOMS_SUCCESS = '@toxin-booked-rooms/FETCH_BOOKED_ROOMS_SUCCESS';
export const FETCH_BOOKED_ROOMS_FAIL = '@toxin-booked-rooms/FETCH_BOOKED_ROOMS_FAIL';
export const BOOKING_ROOM = '@toxin-booked-rooms/BOOKING_ROOM';
export const BOOKING_ROOM_SUCCESS = '@toxin-booked-rooms/BOOKING_ROOM_SUCCESS';
export const BOOKING_ROOM_FAIL = '@toxin-booked-rooms/BOOKING_ROOM_FAIL';

export type FetchBookedRoomsAction = {
  type: typeof FETCH_BOOKED_ROOMS;
  payload: string;
};

export type FetchBookedRoomsSuccessAction = {
  type: typeof FETCH_BOOKED_ROOMS_SUCCESS;
  payload: IRoom[];
};

export type FetchBookedRoomsFailAction = {
  type: typeof FETCH_BOOKED_ROOMS_FAIL;
  payload: string;
};

export type BookingRoomAction = {
  type: typeof BOOKING_ROOM;
  payload: {
    roomId: string;
    dateStart: number;
    dateEnd: number;
  }
};

export type BookingRoomSuccessAction = {
  type: typeof BOOKING_ROOM_SUCCESS;
};

export type BookingRoomFailAction = {
  type: typeof BOOKING_ROOM_FAIL;
  payload: string;
};

export type BookedRoomsAction = FetchBookedRoomsAction
| FetchBookedRoomsSuccessAction
| FetchBookedRoomsFailAction
| BookingRoomAction
| BookingRoomSuccessAction
| BookingRoomFailAction;

export interface IBookedRoomsStore {
  rooms: IRoom[];
  isFetchingRoomsInProgress: boolean;
  fetchRoomsError: string;
  isBookingRoomInProgress: boolean;
  bookingRoomError: string;
}
