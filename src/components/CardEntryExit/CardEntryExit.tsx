import React, { useState } from 'react';
import { block } from 'bem-cn';

import Button from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import './CardEntryExit.scss';

interface ICardEntryExitProps {
  onSubmit?: (range: RangeDays) => void;
}

const b = block('card-entry-exit');

const CardEntryExit: React.FC<ICardEntryExitProps> = (props) => {
  const { onSubmit } = props;

  const [dateRange, setDateRange] = useState<RangeDays>({ start: null, end: null });

  const handleSubmit = (): void => {
    onSubmit && onSubmit(dateRange);
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
            dropList={[
              { label: 'Взрослые', count: 0, plurals: { one: 'гость', two: 'гостя', few: 'гостей' } },
              { label: 'Дети', count: 0, plurals: { one: 'гость', two: 'гостя', few: 'гостей' } },
              {
                label: 'Младенцы',
                count: 0,
                plurals: { one: 'младенец', two: 'младенца', few: 'младенцев' },
                special: true,
              },
            ]}
            defaultLabel={{ one: 'гость', two: 'гостя', few: 'гостей' }}
            buttons
          />
        </div>
        <div>
          <Button caption="подобрать номер" theme="default" withArrow size="fluid" />
        </div>
      </form>
    </div>
  );
};

export default CardEntryExit;
