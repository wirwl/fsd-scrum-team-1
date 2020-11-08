import { FC, useState, useEffect } from 'react';
import { block } from 'bem-cn';

import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
import type {
  IDateRangeFilter,
} from 'src/components/FormRoomsFilter/components/DatePickerFilter/DatePickerFilter';

import InputDropdownFilter from 'src/components/FormRoomsFilter/components/InputDropdownFilter/InputDropdownFilter';
import { ISliderValues } from 'src/components/Slider/Slider';
import AccordeonFilter from 'src/components/FormRoomsFilter/components/AccordeonFilter/AccordeonFilter';
import GroupCheckboxFilter from 'src/components/FormRoomsFilter/components/GroupCheckboxFilter/GroupCheckboxFilter';
import SliderFilter, {
  MIN_PRICE,
  MAX_PRICE,
} from 'src/components/FormRoomsFilter/components/SliderFilter/SliderFilter';
import DatePickerFilter from 'src/components/FormRoomsFilter/components/DatePickerFilter/DatePickerFilter';
import {
  initDateRangeState,
  initPriceState,
  initCheckboxGroupState,
  initDropdownState,
} from 'src/components/FormRoomsFilter/helpers';

import './FormRoomsFilter.scss';

const b = block('form-rooms-filter');

const dropdownGuestsInit: IDropListItem[] = [
  {
    id: 'adults',
    label: 'Взрослые',
    count: 0,
    plurals: { one: 'гость', two: 'гостя', few: 'гостей' },
  },
  {
    id: 'children',
    label: 'Дети',
    count: 0,
    plurals: { one: 'гость', two: 'гостя', few: 'гостей' },
  },
  {
    id: 'babies',
    label: 'Младенцы',
    count: 0,
    plurals: { one: 'младенец', two: 'младенца', few: 'младенцев' },
    special: true,
  },
];

const dropdownItemsConvinenceInit: IDropListItem[] = [
  {
    id: 'bedroom',
    label: 'Спальни',
    count: 0,
    plurals: { one: 'спальня', two: 'спальни', few: 'спален' },
  },
  {
    id: 'bed',
    label: 'Кровати',
    count: 0,
    plurals: { one: 'кровать', two: 'кровати', few: 'кроватей' },
  },
  {
    id: 'bathroom',
    label: 'Ванные комнаты',
    count: 0,
    plurals: { one: 'ванная комната', two: 'ванные комнаты', few: 'ванных комнат' },
    special: true,
  },
];

const extraConvinienceInit = [
  {
    label: 'Завтрак',
    name: 'breakfast',
    checked: false,
  },
  {
    label: 'Письменный стол',
    name: 'desk',
    checked: false,
  },
  {
    label: 'Стул для кормления',
    name: 'feedingChair',
    checked: false,
  },
  {
    label: 'Кроватка',
    name: 'smallBad',
    checked: false,
  },
  {
    label: 'Телевизор',
    name: 'tv',
    checked: false,
  },
  {
    label: 'Шампунь',
    name: 'shampoo',
    checked: false,
  },
];

const rulesInit = [
  {
    label: 'Можно курить',
    name: 'smokingAllowed',
    checked: false,
  },
  {
    label: 'Можно с питомцами',
    name: 'petsAllowed',
    checked: false,
  },
  {
    label: 'Можно пригласить гостей (до 10 человек)',
    name: 'guestsAllowed',
    checked: false,
  },
];

const accessibilityInit = [
  {
    label: 'Широкий коридор',
    name: 'wideCorridor',
    description: 'Ширина коридоров в номере не менее 91 см.',
    checked: false,
  },
  {
    label: 'Помощник для инвалидов',
    name: 'assistantForDisabled',
    description: 'На 1 этаже вас встретит специалист  и проводит до номера.',
    checked: false,
  },
];

type IFormRoomFilterState = {
  adults?: number;
  children?: number;
  babies?: number;
  dateRange?: { start: number, end: number };

  bed: number;
  bedroom: number;
  bathroom: number;

  price: [number, number];

  // rules
  petsAllowed: boolean;
  smokingAllowed: boolean;
  guestsAllowed: boolean;

  // accessibility
  wideCorridor: boolean;
  assistantForDisabled: boolean;

  // extraConvinience
  breakfast: boolean;
  desk: boolean;
  feedingChair: boolean;
  smallBad: boolean;
  tv: boolean;
  shampoo: boolean;
};

type IFormRoomFilterProps = {
  query: Record<string, string>;
  onChange: (params: IFormRoomFilterState) => void;
};

type IFilterStateRecord =Record<
string,
number | [number, number] | string[] | boolean | IDateRangeFilter
>;

const initState = (query: Record<string, string>): IFormRoomFilterState => {
  let result: IFilterStateRecord = {};

  result.price = initPriceState(query, MIN_PRICE, MAX_PRICE);

  const dateRange = initDateRangeState(query);
  if (dateRange !== null) result.dateRange = dateRange;

  const guests = initDropdownState(query, dropdownGuestsInit);
  const convinience = initDropdownState(query, dropdownItemsConvinenceInit);
  result = { ...result, ...guests, ...convinience };

  const rules = initCheckboxGroupState('rules', query, rulesInit);
  Object.keys(rules).forEach((key) => { result[key] = rules[key]; });

  const accessibility = initCheckboxGroupState('accessiblility', query, accessibilityInit);
  Object.keys(accessibility).forEach((key) => { result[key] = accessibility[key]; });

  const extraConvinience = initCheckboxGroupState('extraConvinience', query, extraConvinienceInit);
  Object.keys(extraConvinience).forEach((key) => { result[key] = extraConvinience[key]; });

  return result as IFormRoomFilterState;
};

const updateQuery = (param: string, value: string): void => {
  if (!process.browser) return;

  const url = new URLSearchParams(window.location.search);
  if (value !== '') {
    url.set(param, value);
  } else {
    url.delete(param);
  }

  const newUrl = `${window.location.pathname}?${url}`;
  // window.history?.pushState(null, '', decodeURIComponent(newUrl));
  window.history?.pushState(null, '', newUrl);
};

const FormRoomsFilter: FC<IFormRoomFilterProps> = ({ query, onChange }) => {
  const [state, setState] = useState<IFormRoomFilterState>(initState(query));

  useEffect(() => {
    onChange(state);
  }, [state]);

  const handleSliderChange = (
    values: ISliderValues,
    priceString: string,
  ): void => {
    updateQuery('price', priceString);
    setState((prevState) => ({
      ...prevState,
      price: values as [number, number],
    }));
  };

  const handleDatePickerChange = (
    dateRange: IDateRangeFilter,
    dateRangeString: string,
  ): void => {
    updateQuery('dateRange', dateRangeString);
    setState((prevState) => ({
      ...prevState,
      dateRange,
    }));
  };

  const handleCheckboxRulesChange = (
    rules: Record<string, boolean>,
    rulesString: string,
  ): void => {
    updateQuery('rules', rulesString);
    setState((prevState) => ({
      ...prevState,
      ...rules,
    }));
  };

  const handleCheckboxAccessibilityChange = (
    accessibilities: Record<string, boolean>,
    accessibilityString: string,
  ): void => {
    updateQuery('accessibility', accessibilityString);
    setState((prevState) => ({
      ...prevState,
      ...accessibilities,
    }));
  };

  const handleAccordeonExtraConventienceChange = (
    values: Record<string, boolean>,
    valueString: string,
  ): void => {
    updateQuery('extraConvinience', valueString);
    setState((prevState) => ({
      ...prevState,
      ...values,
    }));
  };

  const handleGuestsDropdownChange = (values: IDropListItem[]): void => {
    values.forEach(({ id, count }) => {
      updateQuery(id, count === 0 ? '' : count.toString());
    });

    const newState = values
      .reduce((acc, { id, count }) => ({ ...acc, [id]: count }), {});

    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleConvinienceDropdownChange = (values: IDropListItem[]): void => {
    values.forEach(({ id, count }) => {
      updateQuery(id, count === 0 ? '' : count.toString());
    });
    const newState = values
      .reduce((acc, { id, count }) => ({ ...acc, [id]: count }), {});

    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <form className={b()}>

      <section className={b('field', { 'with-bottom-18': true })}>
        <DatePickerFilter query={query} onChange={handleDatePickerChange} />
      </section>

      <section className={b('field', { 'with-bottom-30': true })}>
        <h3 className={b('field-title')}>гости</h3>
        <InputDropdownFilter
          query={query}
          name="guests"
          placeholder="Сколько гостей"
          defaultLabel={{ one: 'гость', two: 'гостя', few: 'гостей' }}
          initValues={dropdownGuestsInit}
          onChange={handleGuestsDropdownChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-30': true })}>
        <SliderFilter
          query={query}
          onChange={handleSliderChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <GroupCheckboxFilter
          query={query}
          keyValue="rules"
          initValues={rulesInit}
          title="правила дома"
          onChange={handleCheckboxRulesChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <GroupCheckboxFilter
          query={query}
          keyValue="accessibility"
          initValues={accessibilityInit}
          title="доступность"
          onChange={handleCheckboxAccessibilityChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <h3 className={b('field-title')}>Удобства номера</h3>
        <InputDropdownFilter
          query={query}
          name="convinience"
          placeholder="Удобства номера"
          defaultLabel={false}
          initValues={dropdownItemsConvinenceInit}
          onChange={handleConvinienceDropdownChange}
        />
      </section>

      <section className={b('field')}>
        <AccordeonFilter
          query={query}
          keyValue="extraConvinience"
          initValues={extraConvinienceInit}
          title="дополнительные удобства"
          onChange={handleAccordeonExtraConventienceChange}
        />
      </section>

    </form>
  );
};

export default FormRoomsFilter;
