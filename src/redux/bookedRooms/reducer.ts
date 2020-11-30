import { Reducer } from 'react';
import {
  BookedRoomsAction,
  BOOKING_ROOM,
  BOOKING_ROOM_FAIL,
  BOOKING_ROOM_SUCCESS,
  FETCH_BOOKED_ROOMS,
  FETCH_BOOKED_ROOMS_FAIL,
  FETCH_BOOKED_ROOMS_SUCCESS,
  IBookedRoomsStore,
} from './types';

const initialStore: IBookedRoomsStore = {
  bookingRoomError: '',
  fetchRoomsError: '',
  isBookingRoomInProgress: false,
  isFetchingRoomsInProgress: false,
  rooms: [],
};

const bookedRoomsReducer: Reducer<IBookedRoomsStore, BookedRoomsAction> = (
  store = initialStore,
  action,
) => {
  switch (action.type) {
    case FETCH_BOOKED_ROOMS:
      return { ...store, isFetchingRoomsInProgress: true };

    case FETCH_BOOKED_ROOMS_SUCCESS:
      return { ...store, isFetchingRoomsInProgress: false, rooms: action.payload };

    case FETCH_BOOKED_ROOMS_FAIL:
      return { ...store, isFetchingRoomsInProgress: false, fetchRoomsError: action.payload };

    case BOOKING_ROOM:
      return { ...store, isBookingRoomInProgress: true };

    case BOOKING_ROOM_SUCCESS:
      return { ...store, isBookingRoomInProgress: false };

    case BOOKING_ROOM_FAIL:
      return { ...store, isBookingRoomInProgress: false, bookingRoomError: action.payload };

    default:
      return store;
  }
};

export default bookedRoomsReducer;
