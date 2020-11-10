import React, { useState } from 'react';
import { block } from 'bem-cn';

import Button from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import InputDropdown, { IDropListItem } from '@/components/InputDropdown/InputDropdown';
import './FormLanding.scss';

interface IFormLandingProps {
  onSubmit: (range: RangeDays, dropdownItems: IDropListItem[]) => void;
}

const b = block('form-landing');

const dropdownItemsGuests: IDropListItem[] = [
  {
    id: 'gAdults', label: 'Взрослые', count: 0, plurals: { one: 'гость', two: 'гостя', few: 'гостей' },
  },
  {
    id: 'gChilds', label: 'Дети', count: 0, plurals: { one: 'гость', two: 'гостя', few: 'гостей' },
  },
  {
    id: 'gToddlers',
    label: 'Младенцы',
    count: 0,
    plurals: { one: 'младенец', two: 'младенца', few: 'младенцев' },
    special: true,
  },
];

const FormLanding: React.FC<IFormLandingProps> = (props) => {
  const { onSubmit } = props;

  const [dateRange, setDateRange] = useState<RangeDays>({ start: null, end: null });
  const [dropdownItems, setDropdownItems] = useState<IDropListItem[]>(dropdownItemsGuests);
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
      <h3 className={b('title')}>Найдём номера под ваши пожелания</h3>
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
          />
        </div>
        <div className={b('dropdown-with-guests')}>
          <p className={b('dropdown-title')}>Гости</p>
          <InputDropdown
            name="guests"
            placeholder="Сколько гостей"
            dropList={dropdownItemsGuests}
            defaultLabel={{ one: 'гость', two: 'гостя', few: 'гостей' }}
            buttons
            onChange={(items) => { setDropdownItems(items); setValidateErrorMessage(''); }}
          />
        </div>
        { validateErrorMessage && <p className={b('row-with-error')}>{validateErrorMessage}</p> }
        <div>
          <Button
            type="submit"
            caption="подобрать номер"
            theme="default"
            withArrow
            size="fluid"
          />
        </div>
      </form>
    </div>
  );
};

export default FormLanding;
