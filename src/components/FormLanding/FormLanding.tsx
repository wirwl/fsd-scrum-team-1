import React, { useState } from 'react';
import { block } from 'bem-cn';
import type { TFunction, WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import type { RangeDays } from 'src/components/Calendar/Calendar';
import Button from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import InputDropdown, { IDropListItem } from '@/components/InputDropdown/InputDropdown';
import './FormLanding.scss';

interface IFormLandingProps extends WithTranslation {
  t: TFunction;
  onSubmit: (range: RangeDays, dropdownItems: IDropListItem[]) => void;
}

const b = block('form-landing');

const getDropdownItemsGuestsConf = (t: TFunction): IDropListItem[] => ([
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

const FormLanding: React.FC<IFormLandingProps> = ({ onSubmit, t }) => {
  const dropdownItemsGuests = getDropdownItemsGuestsConf(t);
  const [dateRange, setDateRange] = useState<RangeDays>({ start: null, end: null });
  const [dropdownItems, setDropdownItems] = useState<IDropListItem[]>(
    () => getDropdownItemsGuestsConf(t),
  );
  const [validateErrorMessage, setValidateErrorMessage] = useState('');

  const handleSubmit = (ev: React.FormEvent): boolean => {
    ev.preventDefault();

    if (dateRange.start === null) {
      setValidateErrorMessage('Необходимо указать дату прибытия!');
      return false;
    }

    if (dateRange.end === null) {
      setValidateErrorMessage('Необходимо указать дату отъезда!');
      return false;
    }

    const guests = dropdownItems.reduce<number>((prevValue, { count }) => (
      count + prevValue
    ), 0);

    if (guests === 0) {
      setValidateErrorMessage('Необходимо указать количество гостей!');
      return false;
    }

    onSubmit && onSubmit(dateRange, dropdownItems);

    return true;
  };

  return (
    <div className={b()}>
      <h3 className={b('title')}>{ t('forms:landing.title') }</h3>
      <form
        className={b('form')}
        method="POST"
        action="/mask-address/change-me"
        onSubmit={handleSubmit}
      >
        <div className={b('date-picker')}>
          <DatePicker
            onChange={(range) => { setDateRange(range); setValidateErrorMessage(''); }}
            withTwoInputs
            startTitle={t('arrival')}
            endTitle={t('departure')}
          />
        </div>
        <div className={b('dropdown-with-guests')}>
          <p className={b('dropdown-title')}>{t('components:guestInputDropdown.guests')}</p>
          <InputDropdown
            name="guests"
            placeholder={t('forms:landing.howManyGuests')}
            dropList={dropdownItemsGuests}
            defaultLabel={{
              one: t('components:guestInputDropdown.guestsOne'),
              two: t('components:guestInputDropdown.guestsTwo'),
              few: t('components:guestInputDropdown.guestsFew'),
            }}
            buttons
            onChange={(items) => { setDropdownItems(items); setValidateErrorMessage(''); }}
          />
        </div>
        { validateErrorMessage && <p className={b('row-with-error')}>{validateErrorMessage}</p> }
        <div>
          <Button
            type="submit"
            caption={t('forms:landing.pickANumber')}
            theme="default"
            withArrow
            size="fluid"
          />
        </div>
      </form>
    </div>
  );
};

export default i18n.withTranslation(
  ['common', 'components', 'forms'],
)(FormLanding);
