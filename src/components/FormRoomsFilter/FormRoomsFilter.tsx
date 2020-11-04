import { FC } from 'react';
import { block } from 'bem-cn';

import DatePicker from 'src/components/DatePicker/DatePicker';
import InputDropdown from 'src/components/InputDropdown/InputDropdown';
import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
import Slider from 'src/components/Slider/Slider';
import Accordeon from 'src/components/Accordion/Accordion';
import CheckboxGroup from 'src/components/CheckboxGroup/CheckboxGroup';

import './FormRoomsFilter.scss';

const b = block('form-rooms-filter');

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

const extraConvinience = [
  {
    label: 'Завтрак',
    name: 'breakfast',
  },
  {
    label: 'Письменный стол',
    name: 'desk',
  },
  {
    label: 'Стул для кормления',
    name: 'feedingChair',
  },
  {
    label: 'Кроватка',
    name: 'smallBad',
  },
  {
    label: 'Телевизор',
    name: 'tv',
  },
  {
    label: 'Шампунь',
    name: 'shampoo',
  },
];

const rules = [
  { label: 'Можно курить', name: 'smokingAllowed' },
  { label: 'Можно с питомцами', name: 'petsAllowed' },
  {
    label: 'Можно пригласить гостей (до 10 человек)',
    name: 'guestsAllowed',
  },
];

const accessibility = [
  {
    label: 'Широкий коридор',
    name: 'wideCorridor',
    description: 'Ширина коридоров в номере не менее 91 см.',
  },
  {
    label: 'Помощник для инвалидов',
    name: 'assistantForDisabled',
    description: 'На 1 этаже вас встретит специалист  и проводит до номера.',
  },
];

const FormRoomsFilter: FC = () => {
  console.log('lll');

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
          currentValues={[10000, 40000]}
          min={10000}
          max={40000}
          step={100}
          onChange={() => {}}
          description="Стоимость за сутки пребывания в номере"
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <CheckboxGroup
          title="правила дома"
          items={rules}
          onChange={(values) => console.log(values)}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <CheckboxGroup
          title="доступность"
          items={accessibility}
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
          checkboxList={extraConvinience}
          onChange={(values) => {console.log(values)}}
        />
      </section>

    </form>
  );
};

export default FormRoomsFilter;
