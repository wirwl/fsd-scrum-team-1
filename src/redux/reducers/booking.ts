import {
  BOOK_ROOM,
  BookingActionTypes,
  IBookingState,
} from '../types/booking';

const initialState: IBookingState = {
  orders: [],
};

export default function bookingReducer(
  state = initialState,
  action: BookingActionTypes,
): IBookingState {
  switch (action.type) {
    case BOOK_ROOM:
      return {
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
}
