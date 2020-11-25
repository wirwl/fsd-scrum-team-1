import { TFunction } from 'next-i18next';

import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
import type { ICheckboxProps } from 'src/components/Checkbox/Checkbox';

const getDropdownGuestsInit = (t: TFunction): IDropListItem[] => ([
  {
    id: 'adults',
    label: t('components:guestInputDropdown.guests'),
    count: 0,
    plurals: {
      one: t('components:guestInputDropdown.guestOne'),
      two: t('components:guestInputDropdown.guestTwo'),
      few: t('components:guestInputDropdown.guestFew'),
    },
  },
  {
    id: 'children',
    label: t('components:guestInputDropdown.children'),
    count: 0,
    plurals: {
      one: t('components:guestInputDropdown.guestOne'),
      two: t('components:guestInputDropdown.guestTwo'),
      few: t('components:guestInputDropdown.guestFew'),
    },
  },
  {
    id: 'babies',
    label: t('components:guestInputDropdown.babies'),
    count: 0,
    plurals: {
      one: t('components:guestInputDropdown.babiesOne'),
      two: t('components:guestInputDropdown.babiesTwo'),
      few: t('components:guestInputDropdown.babiesFew'),
    },
    special: true,
  },
]);

const getDropdownConvenienceInit = (t: TFunction): IDropListItem[] => ([
  {
    id: 'bedroom',
    label: t('components:convenientInputDropdown.children'),
    count: 0,
    plurals: {
      one: t('components:convenientInputDropdown.bedroomOne'),
      two: t('components:convenientInputDropdown.bedroomsTwo'),
      few: t('components:convenientInputDropdown.bedroomsFew'),
    },
  },
  {
    id: 'bed',
    label: t('components:convenientInputDropdown.beds'),
    count: 0,
    plurals: {
      one: t('components:convenientInputDropdown.bedOne'),
      two: t('components:convenientInputDropdown.bedsTwo'),
      few: t('components:convenientInputDropdown.bedsFew'),
    },
  },
  {
    id: 'bathroom',
    label: t('components:convenientInputDropdown.bathrooms'),
    count: 0,
    plurals: {
      one: t('components:convenientInputDropdown.bathroomOne'),
      two: t('components:convenientInputDropdown.bathroomsTwo'),
      few: t('components:convenientInputDropdown.bathroomsFew'),
    },
    special: true,
  },
]);

const getExtraConvenienceInit = (t: TFunction): ICheckboxProps[] => ([
  {
    label: t('components:extraConvenience.breakfast'),
    name: 'breakfast',
    checked: false,
  },
  {
    label: t('components:extraConvenience.desk'),
    name: 'desk',
    checked: false,
  },
  {
    label: t('components:extraConvenience.feedingChair'),
    name: 'feedingChair',
    checked: false,
  },
  {
    label: t('components:extraConvenience.smallBad'),
    name: 'smallBad',
    checked: false,
  },
  {
    label: t('components:extraConvenience.tv'),
    name: 'tv',
    checked: false,
  },
  {
    label: t('components:extraConvenience.shampoo'),
    name: 'shampoo',
    checked: false,
  },
]);

const getRulesInit = (
  t: TFunction,
): ICheckboxProps[] => ([
  {
    label: t('components:rules.smokingAllowed'),
    name: 'smokingAllowed',
    checked: false,
  },
  {
    label: t('components:rules.petsAllowed'),
    name: 'petsAllowed',
    checked: false,
  },
  {
    label: t('components:rules.guestAllowed'),
    name: 'guestsAllowed',
    checked: false,
  },
]);

const getAccessibilityInit = (
  t: TFunction,
): ICheckboxProps[] => ([
  {
    label: t('components:accessibility.wideCorridor.label'),
    name: 'wideCorridor',
    description: t('components:accessibility.wideCorridor.description'),
    checked: false,
  },
  {
    label: t('components:accessibility.assistantForDisabled.label'),
    name: 'assistantForDisabled',
    description: t(
      'components:accessibility.assistantForDisabled.description',
    ),
    checked: false,
  },
]);

export {
  getDropdownGuestsInit,
  getDropdownConvenienceInit,
  getExtraConvenienceInit,
  getRulesInit,
  getAccessibilityInit,
};
