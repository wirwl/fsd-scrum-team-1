import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';

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

const dropdownConvinenceInit: IDropListItem[] = [
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

export {
  dropdownGuestsInit,
  dropdownConvinenceInit,
  extraConvinienceInit,
  rulesInit,
  accessibilityInit,
};
