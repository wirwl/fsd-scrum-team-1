import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface IOrder {
  id: number,
  price: number,
}

interface IBookingState {
  orders: IOrder[],
}

const initialState = {
  orders: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    bookRoom: (state: Draft<IBookingState>, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { bookRoom } = bookingSlice.actions;
export default bookingSlice.reducer;
