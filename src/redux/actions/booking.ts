import { IOrder, BOOK_ROOM, BookingActionTypes } from '../types/booking';

const bookRoom = (newOrder: IOrder): BookingActionTypes => ({
  type: BOOK_ROOM,
  payload: newOrder,
});

export default bookRoom;
