export const BOOK_ROOM = 'BOOK_ROOM';

export interface IOrder {
  id: number,
  price: number,
}

export interface IBookingState {
  orders: IOrder[],
}

interface IBookRoomAction {
  type: typeof BOOK_ROOM,
  payload: IOrder,
}

export type BookingActionTypes = IBookRoomAction;
