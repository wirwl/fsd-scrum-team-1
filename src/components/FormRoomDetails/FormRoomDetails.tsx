import React, { useState } from 'react';
import { block } from 'bem-cn';

import Button from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import InputDropdown, { IDropListItem } from '@/components/InputDropdown/InputDropdown';
import './FormRoomDetails.scss';

interface IFormRoomDetails {
  onSubmit?: (range: RangeDays, dropdownItems: IDropListItem[]) => void;
  roomNumber: number,
  isLuxury: boolean,
  price: number,
  serviceCharge: number,
  discount: number,
  additionalServiceCharge: number,
}

const b = block('form-room-details');

const MS_PER_DAY = 1000 * 60 * 60 * 24;

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

const formateString = (price: number): string => {
  const output: string[] = [];

  price.toString().split('').reverse().forEach((num, i) => {
    if (i % 3 === 0 && i > 0) output.push(' ');
    output.push(num);
  });

  return output.reverse().join('').trim();
};

const FormRoomDetails: React.FC<IFormRoomDetails> = (props) => {
  const {
    onSubmit,
    roomNumber,
    isLuxury,
    price,
    serviceCharge,
    discount,
    additionalServiceCharge,
  } = props;

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

  const getDays = (range: RangeDays): number => {
    const { start, end } = range;
    let daysCount = 1;
    if (start && end) {
      daysCount = (end.getTime() - start.getTime()) / MS_PER_DAY;
    }
    return daysCount;
  };

  const toolTip = (text: string): JSX.Element => (
    <div className={b('tooltip')} title={text}>i</div>
  );

  const totalPrice = price * getDays(dateRange) + serviceCharge + additionalServiceCharge;

  return (
    <div className={b()}>
      <form
        className={b('form')}
        method="POST"
        action="/mask-address/change-me"
        onSubmit={handleSubmit}
      >
        <h3 className={b('header')}>
          <p className={b('room-number-luxury')}>
            <span className={b('room-number-wrapper')}>
              №&nbsp;
              <span className={b('room-number')}>{roomNumber}</span>
            </span>
            {isLuxury && <span className={b('luxury')}>люкс</span>}
          </p>
          <p className={b('price')}>
            <span className={b('price-number')}>
              {`${formateString(price)}₽`}
            </span>
            &nbsp;в&nbsp;сутки
          </p>
        </h3>
        <div className={b('date-picker')}>
          <DatePicker
            onChange={(range) => {
              setDateRange(range);
              setValidateErrorMessage('');
            }}
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
        <div className={b('row')}>
          <div className={b('row-text')}>
            {`${formateString(price)}₽ x ${getDays(dateRange)} суток`}
          </div>
          <div className={b('row-value')}>
            {`${formateString(price * getDays(dateRange))}₽`}
          </div>
        </div>
        <div className={b('row')}>
          <div className={b('row-text')}>
            {`Сбор за услуги: скидка ${formateString(discount)}₽`}
          </div>
          <div className={b('tooltip-wrapper')}>
            {toolTip('Скидка 20%')}
          </div>
          <div className={b('row-value')}>
            {`${formateString(serviceCharge - discount)}₽`}
          </div>
        </div>
        <div className={b('row', { last: true })}>
          <div className={b('row-text')}>
            Сбор за дополнительные услуги
          </div>
          <div className={b('tooltip-wrapper')}>
            {toolTip('Виды дополнительных услуг: уборка, массаж пяток')}
          </div>
          <div className={b('row-value')}>
            {`${additionalServiceCharge}₽`}
          </div>
        </div>
        <div className={b('total-price')}>
          <span className={b('total-price-text')}>Итого </span>
          <span className={b('total-price-dots')} />
          <span className={b('total-number')}>{`${formateString(totalPrice - discount)}₽`}</span>
        </div>
        { validateErrorMessage && <p className={b('row-with-error')}>{validateErrorMessage}</p> }
        <div>
          <Button
            type="submit"
            caption="забронировать"
            theme="default"
            withArrow
            size="fluid"
          />
        </div>
      </form>
    </div>
  );
};

export default FormRoomDetails;
