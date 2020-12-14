import { RangeDays } from '@/components/Calendar/Calendar';
import { IDropListItem } from '@/components/InputDropdown/InputDropdown';

export interface IBookingStore {
  residenceTime: RangeDays,
  guests: IDropListItem[] | null
}

export type BookingAction = {
  type: string,
  booking: IBookingStore
};

export const setBookingAction = (booking:IBookingStore): BookingAction => ({
  type: 'SET_BOOKING',
  booking,
});
