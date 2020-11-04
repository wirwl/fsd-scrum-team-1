import { FC, useState } from 'react';
import { block } from 'bem-cn';

import DatePicker from 'src/components/DatePicker/DatePicker';
import InputDropdown from 'src/components/InputDropdown/InputDropdown';
import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
import Slider from 'src/components/Slider/Slider';
import Accordeon from 'src/components/Accordion/Accordion';
import CheckboxGroup from 'src/components/CheckboxGroup/CheckboxGroup';

import './FormRoomsFilter.scss';

const b = block('form-rooms-filter');

const MIN_PRICE = 10000;
const MAX_PRICE = 40000;
const SLIDER_STEP = 100;

const dropdownItemsGuests: IDropListItem[] = [
  { label: 'Взрослые', count: 0, plurals: { one: 'гость', two: 'гостя', few: 'гостей' } },
  { label: 'Дети', count: 0, plurals: { one: 'гость', two: 'гостя', few: 'гостей' } },
  {
    label: 'Младенцы',
    count: 0,
    plurals: { one: 'младенец', two: 'младенца', few: 'младенцев' },
    special: true,
  },
];

const dropdownItemsConvinence: IDropListItem[] = [
  { label: 'Спальни', count: 0, plurals: { one: 'спальня', two: 'спальни', few: 'спален' } },
  { label: 'Кровати', count: 0, plurals: { one: 'кровать', two: 'кровати', few: 'кроватей' } },
  {
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
  { label: 'Можно курить', name: 'smokingAllowed', checked: false },
  { label: 'Можно с питомцами', name: 'petsAllowed', checked: false },
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
  dStart?: number;
  dEnd?: number;
  gToddlers?: number;
  gChild?: number;
  gAdult?: number;

  bed: number;
  bedroom: number;
  bathroom: number;

  price: [number, number];
  rules: string[];
  accessibility: string[];
  extraConvinience: string[];
};

type IFormRoomFilterProps = {
  queryString: string;
};

const normalizeQueryNumber = (value: string): number => {
  let result = parseInt(value, 10);
  result = Number.isNaN(result) ? 0 : result;
  return result < 0 ? 0 : result;
};

const isPriceValid = (price: number[]): boolean => (
  price.length === 2
  && price.filter((p) => Number.isNaN(p)).length === 0
  && price[0] >= MIN_PRICE
  && price[1] <= MAX_PRICE
);

// { [key:string]: number | string | boolean }
const initState = (queryString: string): IFormRoomFilterState => {
  const url = new URLSearchParams(queryString);
  const query = {};

  ['dStart', 'dEnd', 'gToddlers', 'gChilds', 'gAdults'].forEach((key) => {
    const value = url.get(key);
    if (value !== null) query[key] = parseInt(value, 10);
  });

  ['bed', 'bedroom', 'bathroom'].forEach((key): void => {
    const value = url.get(key);

    if (value !== null) {
      query[key] = normalizeQueryNumber(value);
      return;
    }

    query[key] = 0;
  });

  const priceValue = url.get('price');
  if (priceValue !== null) {
    const price = priceValue.split(',')
      .map((p) => parseInt(p, 10));

    console.log('>>>', isPriceValid(price));

    if (isPriceValid(price)) query['price'] = price;
  }

  const allRules = ['petsAllowed', 'smokingAllowed', 'guestAllowed'];
  allRules.forEach((key) => {
    query[key] = false;
  });

  const rules = url.get('rules');
  if (rules !== null) {
    rules.split(',').forEach((key) => {
      if (allRules.indexOf(key) >= 0) {
        query[key] = true;
      }
    });
  }

  const allAccessibility = ['wideCorridor', 'assistantForDisabled'];
  allAccessibility.forEach((key) => {
    query[key] = false;
  });

  const accessibility = url.get('accessibility');
  if (accessibility !== null) {
    accessibility.split(',').forEach((key) => {
      if (allAccessibility.indexOf(key) >= 0) {
        query[key] = true;
      }
    });
  }

  const allExtraConvinience = ['breakfast', 'desk', 'feedingChair', 'smallBad', 'tv', 'shampoo'];
  allExtraConvinience.forEach((key) => {
    query[key] = false;
  });

  const extraConvinience = url.get('extraConvinience');
  if (extraConvinience !== null) {
    extraConvinience.split(',').forEach((key) => {
      if (allExtraConvinience.indexOf(key) >= 0) {
        query[key] = true;
      }
    });
  }

  return query;
};

const patchInitConf = (
  state: IFormRoomFilterState,
  items: ICheckboxProps[],
): ICheckboxProps[] => items.map(({ name, label, description }) => ({
  name,
  label,
  description,
  checked: state[name] !== undefined && state[name]
}));

const FormRoomsFilter: FC<IFormRoomFilterProps> = ({ queryString }) => {
  const [state, setState] = useState<IFormRoomFilterState>(
    initState(queryString),
  );

  const extraConvinienceConf = patchInitConf(state, extraConvinienceInit);
  const rulesConf = patchInitConf(state, rulesInit);
  const accessibilityConf = patchInitConf(state, accessibilityInit);
  const { price } = state;

  return (
    <form className={b()}>

      <section className={b('field', { 'with-bottom-18': true })}>
        <DatePicker onChange={() => {}} />
      </section>

      <section className={b('field', { 'with-bottom-30': true })}>
        <h3 className={b('field-title')}>гости</h3>
        <InputDropdown
          name="guests"
          placeholder="Сколько гостей"
          defaultLabel={{ one: 'гость', two: 'гостя', few: 'гостей' }}
          dropList={dropdownItemsGuests}
          buttons
          onChange={() => {}}
        />
      </section>

      <section className={b('field', { 'with-bottom-30': true })}>
        <Slider
          title="диапазон цены"
          currentValues={price}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={SLIDER_STEP}
          onChange={() => {}}
          description="Стоимость за сутки пребывания в номере"
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <CheckboxGroup
          title="правила дома"
          items={rulesConf}
          onChange={(values) => console.log(values)}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <CheckboxGroup
          title="доступность"
          items={accessibilityConf}
          onChange={(values) => console.log(values)}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <h3 className={b('field-title')}>Удобства номера</h3>
        <InputDropdown
          name=""
          placeholder="Удобства номера"
          dropList={dropdownItemsConvinence}
          buttons
          onChange={() => {}}
        />
      </section>

      <section className={b('field')}>
        <Accordeon
          isOpened={false}
          checkboxList={extraConvinienceConf}
          onChange={(values) => {console.log(values)}}
        />
      </section>

    </form>
  );
};

const getKeysFromQuery = (url: URLSearchParams): string[] => {
  const keysIter = url.keys();
  const keys = [];

  for (;;) {
    const { done, value } = keysIter.next();

    if (done) break;
    keys.push(value);
  }

  return keys;
};

export default FormRoomsFilter;
