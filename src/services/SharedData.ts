import { RangeDays } from '@/components/Calendar/Calendar';
import { IDropListItem } from '@/components/InputDropdown/InputDropdown';

type LocalStorageValue = RangeDays | IDropListItem[] | null;

const KEYS = {
  residenceTime: 'residenceTime',
  guestsCount: 'guestsCount',
};

const getValueFromLocalStorage = (key: string): LocalStorageValue => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};

const setValueToLocalStorage = (key: string, value: LocalStorageValue): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const saveResidenceTimeAsSharedData = (value: RangeDays): void => (
  setValueToLocalStorage(KEYS.residenceTime, value)
);

const saveGuestsCountAsSharedData = (value: IDropListItem[]): void => (
  setValueToLocalStorage(KEYS.guestsCount, value)
);

const getResidenceTimeFromSharedData = (): RangeDays => {
  const value: RangeDays = getValueFromLocalStorage(KEYS.residenceTime) as RangeDays;
  return {
    start: value ? new Date(value.start ? value.start : '') : null,
    end: value ? new Date(value.end ? value.end : '') : null,
  };
};

const getGuestsCountFromSharedData = (): IDropListItem[] => (
  getValueFromLocalStorage(KEYS.guestsCount) as IDropListItem[]
);

export {
  saveResidenceTimeAsSharedData,
  saveGuestsCountAsSharedData,
  getResidenceTimeFromSharedData,
  getGuestsCountFromSharedData,
};
