import type { IDateRangeFilter } from 'src/components/FormRoomsFilter/components/DatePickerFilter/DatePickerFilter';
import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';

const isPriceValid = (
  price: number[],
  min: number,
  max: number,
): boolean => (
  price.length === 2
  && price.filter((p) => Number.isNaN(p)).length === 0
  && price[0] >= min
  && price[1] <= max
);

const initPriceState = (
  query: Record<string, string>,
  min: number,
  max: number,
): [number, number] => {
  const defaultPrice: [number, number] = [min, max];
  const priceValue = query.price;
  if (priceValue === undefined) return defaultPrice;

  const price = priceValue.split('-')
    .map((p) => parseInt(p, 10));

  if (price.length !== 2) return defaultPrice;

  if (!isPriceValid(price, min, max)) defaultPrice;

  return price as [number, number];
};

const isDateRangeValid = (dateRange: number[]): boolean => (
  dateRange.length === 2
  && dateRange.filter((d) => Number.isNaN(d)).length === 0
  && dateRange.filter((d) => d <= 0).length === 0
);

const initDateRangeState = (
  { dateRange }: Record<string, string>,
): IDateRangeFilter | null => {
  if (dateRange === undefined) return null;

  const dateRangeValues = dateRange.split('-')
    .map((p) => parseInt(p, 10));

  if (!isDateRangeValid(dateRangeValues)) return null;

  const [tStart, tEnd] = dateRangeValues;

  return {
    start: tStart,
    end: tEnd,
  };
};

const initCheckboxGroupState = (
  queryKey: string,
  query: Record<string, string>,
  initConf: ICheckboxProps[],
): Record<string, boolean> => {
  const result: Record<string, boolean> = {};

  initConf.forEach(({ name }) => {
    result[name] = false;
  });

  const rawValue = query[queryKey];
  const names = initConf.map(({ name }) => name);
  if (rawValue !== undefined) {
    rawValue.split('+').forEach((key) => {
      if (names.indexOf(key) >= 0) {
        result[key] = true;
      }
    });
  }

  return result;
};

const normalizeQueryNumber = (value: string): number => {
  let result = parseInt(value, 10);
  result = Number.isNaN(result) ? 0 : result;
  return result < 0 ? 0 : result;
};

const initDropdownState = (
  query: Record<string, string>,
  initConf: IDropListItem[],
): Record<string, number> => {
  const result: Record<string, number> = {};

  initConf.forEach(({ id }): void => {
    const value = query[id];
    if (value === undefined) return;

    const valueNumber = normalizeQueryNumber(value);

    result[id] = valueNumber;
  });

  return result;
};

export {
  initPriceState,
  initDateRangeState,
  initCheckboxGroupState,
  initDropdownState,
};
