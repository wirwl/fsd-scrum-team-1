import { FC } from 'react';
import { block } from 'bem-cn';

import DatePicker from 'src/components/DatePicker/DatePicker';
import InputDropdown from 'src/components/InputDropdown/InputDropdown';
import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
import { ISliderValues } from 'src/components/Slider/Slider';
import Accordeon from 'src/components/Accordion/Accordion';
import CheckboxGroup from 'src/components/CheckboxGroup/CheckboxGroup';
import SliderFilter from 'src/components/FormRoomsFilter/components/SliderFilter/SliderFilter';

import './FormRoomsFilter.scss';

const b = block('form-rooms-filter');

const MIN_PRICE = 10000;
const MAX_PRICE = 40000;

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

const guestsLabelMap: { [key:string]: string; } = {
  Взрослые: 'gAdults',
  Дети: 'gChilds',
  Младенцы: 'gToddlers',
};

const convinienceLabelMap: { [key:string]: string; } = {
  Спальни: 'bedroom',
  Кровати: 'bed',
  'Ванные комнаты': 'bathroom',
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

    if (isPriceValid(price)) query['price'] = price;
  }

  const allRules = ['petsAllowed', 'smokingAllowed', 'guestsAllowed'];
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

const updateQuery = (param: string, value: string): void => {
  if (!process.browser) return;

  const url = new URLSearchParams(window.location.search);
  if (value !== '') {
    url.set(param, value);
  } else {
    url.delete(param);
  }

  const newUrl = `${window.location.pathname}?${url.toString()}`;
  window.history?.pushState(null, '', newUrl);
};

const FormRoomsFilter: FC<IFormRoomFilterProps> = ({ queryString }) => {
  const state = initState(queryString);

  const extraConvinienceConf = patchInitConf(state, extraConvinienceInit);
  const rulesConf = patchInitConf(state, rulesInit);
  const accessibilityConf = patchInitConf(state, accessibilityInit);
  const { price } = state;

  const handleSliderChange = (values: ISliderValues): void => {
    updateQuery('price', values.map((p) => p.toString()).join(','));
  };

  const handleDatePickerChange = ({ start, end }: RangeDays): void => {
    const dStart = (new Date(start as Date)).getTime();
    const dEnd = (new Date(end as Date)).getTime();

    updateQuery('dStart', dStart.toString());
    updateQuery('dEnd', dEnd.toString());
  };

  const handleCheckboxRulesChange = (
    values: { [key:string]: boolean },
  ): void => {
    const value = Object
      .keys(values)
      .filter((key) => values[key])
      .join(',');

    updateQuery('rules', value);
  };

  const handleCheckboxAccessibilityChange = (
    values: { [key:string]: boolean },
  ): void => {
    const value = Object
      .keys(values)
      .filter((key) => values[key])
      .join(',');

    updateQuery('accessibility', value);
  };

  const handleAccordeonExtraConventionChange = (
    values: { [key:string]: boolean },
  ): void => {
    const value = Object
      .keys(values)
      .filter((key) => values[key])
      .join(',');

    updateQuery('extraConvinience', value);
  };

  const handleGuestsDropdownChange = (values: IDropListItem[]): void => {
    values.forEach(({ label, count }) => {
      const key = guestsLabelMap[label];
      updateQuery(key, count === 0 ? '' : count.toString());
    });
  };

  const handleConvinienceDropdownChange = (values: IDropListItem[]): void => {
    values.forEach(({ label, count }) => {
      const key = convinienceLabelMap[label];
      updateQuery(key, count === 0 ? '' : count.toString());
    });
  };

  return (
    <form className={b()}>

      <section className={b('field', { 'with-bottom-18': true })}>
        <DatePicker onChange={handleDatePickerChange} />
      </section>

      <section className={b('field', { 'with-bottom-30': true })}>
        <h3 className={b('field-title')}>гости</h3>
        <InputDropdown
          name="guests"
          placeholder="Сколько гостей"
          defaultLabel={{ one: 'гость', two: 'гостя', few: 'гостей' }}
          dropList={dropdownItemsGuests}
          buttons
          onChange={handleGuestsDropdownChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-30': true })}>
        <SliderFilter
          price={price}
          onChange={handleSliderChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <CheckboxGroup
          title="правила дома"
          items={rulesConf}
          onChange={handleCheckboxRulesChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <CheckboxGroup
          title="доступность"
          items={accessibilityConf}
          onChange={handleCheckboxAccessibilityChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <h3 className={b('field-title')}>Удобства номера</h3>
        <InputDropdown
          name=""
          placeholder="Удобства номера"
          dropList={dropdownItemsConvinence}
          buttons
          onChange={handleConvinienceDropdownChange}
        />
      </section>

      <section className={b('field')}>
        <Accordeon
          isOpened={false}
          checkboxList={extraConvinienceConf}
          onChange={handleAccordeonExtraConventionChange}
        />
      </section>

    </form>
  );
};

export default FormRoomsFilter;
