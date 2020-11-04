import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';

const dropdownGuestsProps: IDropListItem[] = [
  {
    name: 'Взрослые', label: 'gAdults', count: 0, plurals: { one: 'взрослый', two: 'взрослых', few: 'взрослых' },
  },
  {
    name: 'Дети', label: 'gChilds', count: 0, plurals: { one: 'кровать', two: 'кровати', few: 'кроватей' },
  },
  {
    name: 'Младенцы', label: 'gToddlers', count: 0, plurals: { one: 'младенец', two: 'младенца', few: 'младенцев' }, special: true,
  },
];

const dropdownComfortProps: IDropListItem[] = [
  {
    name: 'Спальни', label: 'bedroom', count: 0, plurals: { one: 'спальня', two: 'спальни', few: 'спален' },
  },
  {
    name: 'Кровати', label: 'bed', count: 0, plurals: { one: 'кровать', two: 'кровати', few: 'кроватей' },
  },
  {
    name: 'Ванные комнаты', label: 'bathroom', count: 0, plurals: { one: 'ванная комната', two: 'ванные комнаты', few: 'ванных комнат' },
  },
];

const checkboxListProps: ICheckboxProps[] = [
  {
    name: 'smokingAllowed',
    label: 'Можно курить',
    checked: false,
  },
  {
    name: 'petsAllowed',
    label: 'Можно с питомцами',
    checked: false,
  },
  {
    name: 'guestAllowed',
    label: 'Можно пригласить гостей (до 10 человек)',
    checked: false,
  },
];

const richCheckboxListProps: ICheckboxProps[] = [
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

const accordionProps: ICheckboxProps[] = [
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

export {
  dropdownGuestsProps,
  dropdownComfortProps,
  checkboxListProps,
  richCheckboxListProps,
  accordionProps,
};
