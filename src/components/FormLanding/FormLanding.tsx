import React, { useState } from 'react';
import { block } from 'bem-cn';

import Button from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import InputDropdown, { IDropListItem } from '@/components/InputDropdown/InputDropdown';
import './FormLanding.scss';

interface ICardEntryExitProps {
  onSubmit: (range: RangeDays, dropdownItems: IDropListItem[]) => void;
}

const b = block('form-landing');

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

const CardEntryExit: React.FC<ICardEntryExitProps> = (props) => {
  const { onSubmit } = props;

  const [dateRange, setDateRange] = useState<RangeDays>({ start: null, end: null });
  const [dropdownItems, setDropdownItems] = useState<IDropListItem[]>(dropdownItemsGuests);

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    onSubmit && onSubmit(dateRange, dropdownItems);
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
          <DatePicker onChange={setDateRange} withTwoInputs />
        </div>
        <div className={b('dropdown-with-guests')}>
          <p className={b('dropdown-title')}>Гости</p>
          <InputDropdown
            name="guests"
            placeholder="Сколько гостей"
            dropList={dropdownItemsGuests}
            defaultLabel={{ one: 'гость', two: 'гостя', few: 'гостей' }}
            buttons
            onChange={setDropdownItems}
          />
        </div>
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

export default CardEntryExit;
