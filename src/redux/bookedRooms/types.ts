import { RangeDays } from '@/components/Calendar/Calendar';
import { IDropListItem } from '@/components/InputDropdown/InputDropdown';
import { IBookedRoom } from '@/services/Api';

export const FETCH_BOOKED_ROOMS = '@toxin-booked-rooms/FETCH_BOOKED_ROOMS';
export const FETCH_BOOKED_ROOMS_SUCCESS = '@toxin-booked-rooms/FETCH_BOOKED_ROOMS_SUCCESS';
export const FETCH_BOOKED_ROOMS_FAIL = '@toxin-booked-rooms/FETCH_BOOKED_ROOMS_FAIL';
export const BOOKING_ROOM = '@toxin-booked-rooms/BOOKING_ROOM';
export const BOOKING_ROOM_SUCCESS = '@toxin-booked-rooms/BOOKING_ROOM_SUCCESS';
export const BOOKING_ROOM_FAIL = '@toxin-booked-rooms/BOOKING_ROOM_FAIL';

export type FetchBookedRoomsAction = {
  type: typeof FETCH_BOOKED_ROOMS;
};

export type FetchBookedRoomsSuccessAction = {
  type: typeof FETCH_BOOKED_ROOMS_SUCCESS;
  payload: IBookedRoom[];
};

export type FetchBookedRoomsFailAction = {
  type: typeof FETCH_BOOKED_ROOMS_FAIL;
  payload: string;
};

export type BookingRoomAction = {
  type: typeof BOOKING_ROOM;
  payload: {
    uid: string;
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
  rooms: IBookedRoom[];
  isFetchingRoomsInProgress: boolean;
  fetchRoomsError: string;
  isBookingRoomInProgress: boolean;
  bookingRoomError: string;
}

export interface IBookingStore {
  residenceTime: RangeDays,
  guests: IDropListItem[] | null
}
