import { BookingAction, IBookingStore } from './types';

const initialStore: IBookingStore = {
  residenceTime: { start: null, end: null },
  guests: null,
};

const bookingReducer = (store = initialStore, action: BookingAction): IBookingStore => {
  const dates = { start: new Date('December 14, 2020'), end: new Date('December 19, 2020') };
  const newStore: IBookingStore = {
    residenceTime: dates,
    guests: null,
  };

  switch (action.type) {
    case 'SET_BOOKING':
      // console.log(`Abcd1: ${action.booking.residenceTime.start}`);
      // console.log(`Abcd2: ${action.booking.guests[0].count}`);
      return { ...action.booking };
    default:
      return store;
  }
};

export default bookingReducer;
