import React, { useState } from 'react';
import { block } from 'bem-cn';
import type { WithTranslation } from 'next-i18next';

import type { RangeDays } from 'src/components/Calendar/Calendar';
import i18n from 'src/services/i18n';
import Button from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import InputDropdown, { IDropListItem } from '@/components/InputDropdown/InputDropdown';
import './FormRoomDetails.scss';
import applyActualCurrencyToValue from '@/services/Currencies';

interface IFormRoomDetailsProps extends WithTranslation {
  onSubmit?: (range: RangeDays, dropdownItems: IDropListItem[]) => void;
  roomNumber: number,
  isLuxury: boolean,
  price: number,
  serviceCharge: number,
  discount: number,
  additionalServiceCharge: number,
  errorBooking?: string,
  dates: RangeDays,
  guests: IDropListItem[]
}

const b = block('form-room-details');

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const formateString = (price: number): string => {
  const output: string[] = [];

  price.toString().split('').reverse().forEach((num, i) => {
    if (i % 3 === 0 && i > 0) output.push(' ');
    output.push(num);
  });

  return output.reverse().join('').trim();
};

const FormRoomDetails: React.FC<IFormRoomDetailsProps> = (props) => {
  const {
    onSubmit,
    roomNumber,
    isLuxury,
    price,
    serviceCharge,
    discount,
    additionalServiceCharge,
    errorBooking,
    t,
    i18n: langs,
    dates,
    guests,
  } = props;

  const [dateRange, setDateRange] = useState<RangeDays>(dates);
  const [dropdownItems, setDropdownItems] = useState<IDropListItem[]>(
    guests,
  );
  const [validateErrorMessage, setValidateErrorMessage] = useState('');

  langs.on('languageChanged', () => setValidateErrorMessage(''));

  const handleSubmit = (ev: React.FormEvent): boolean => {
    ev.preventDefault();

    if (dateRange.start === null) {
      setValidateErrorMessage(t('forms:errors.arrivalDateRequired'));
      return false;
    }

    if (dateRange.end === null) {
      setValidateErrorMessage(t('forms:errors.checkoutDateRequired'));
      return false;
    }

    const guestsCount = dropdownItems.reduce<number>((prevValue, { count }) => (
      count + prevValue
    ), 0);

    if (guestsCount === 0) {
      setValidateErrorMessage(t('forms:errors.guestsNumberRequired'));
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
            {isLuxury && (
              <span className={b('luxury')}>
                &nbsp;
                {t('luxe')}
              </span>
            )}
          </p>
          <p className={b('price')}>
            <span className={b('price-number')}>
              {`${formateString(applyActualCurrencyToValue(price, langs.language))}${t('currencySign')}`}
            </span>
            &nbsp;
            {t('perDay')}
          </p>
        </h3>
        <div className={b('date-picker')}>
          <DatePicker
            onChange={(range) => {
              setDateRange(range);
              setValidateErrorMessage('');
            }}
            withTwoInputs
            startTitle={t('arrival')}
            endTitle={t('departure')}
            placeholder={t('dateMaskPlaceholder')}
            rangeStart={dateRange.start ? dateRange.start : undefined}
            rangeEnd={dateRange.end ? dateRange.end : undefined}
          />
        </div>
        <div className={b('dropdown-with-guests')}>
          <p className={b('dropdown-title')}>{t('components:guestInputDropdown.guests')}</p>
          <InputDropdown
            name="guests"
            placeholder={t('forms:landing.howManyGuests')}
            dropList={dropdownItems}
            defaultLabel={{
              one: t('components:guestInputDropdown.guestsOne'),
              two: t('components:guestInputDropdown.guestsTwo'),
              few: t('components:guestInputDropdown.guestsFew'),
            }}
            buttons
            onChange={(items) => { setDropdownItems(items); setValidateErrorMessage(''); }}
          />
        </div>
        <div className={b('row')}>
          <div className={b('row-text')}>
            {`${formateString(applyActualCurrencyToValue(price, langs.language))}${t('currencySign')} x ${getDays(dateRange)} ${t('forms:bookingForm.day')}`}
          </div>
          <div className={b('row-value')}>
            {`${formateString(applyActualCurrencyToValue(price, langs.language) * getDays(dateRange))}${t('currencySign')}`}
          </div>
        </div>
        <div className={b('row')}>
          <div className={b('row-text')}>
            {`${t('forms:bookingForm.feeServiceDiscount')} ${formateString(applyActualCurrencyToValue(discount, langs.language))}${t('currencySign')}`}
          </div>
          <div className={b('tooltip-wrapper')}>
            {toolTip('Скидка 20%')}
          </div>
          <div className={b('row-value')}>
            {`${formateString(applyActualCurrencyToValue(serviceCharge - discount, langs.language))}${t('currencySign')}`}
          </div>
        </div>
        <div className={b('row', { last: true })}>
          <div className={b('row-text')}>
            {t('forms:bookingForm.feeAdditionalService')}
          </div>
          <div className={b('tooltip-wrapper')}>
            {toolTip('Виды дополнительных услуг: уборка, массаж пяток')}
          </div>
          <div className={b('row-value')}>
            {`${applyActualCurrencyToValue(additionalServiceCharge, langs.language)}${t('currencySign')}`}
          </div>
        </div>
        <div className={b('total-price')}>
          <span className={b('total-price-text')}>
            {t('forms:bookingForm.subtotal')}
          </span>
          <span className={b('total-price-dots')} />
          <span className={b('total-number')}>{`${formateString(applyActualCurrencyToValue(totalPrice - discount, langs.language))}${t('currencySign')}`}</span>
        </div>
        { validateErrorMessage && <p className={b('row-with-error')}>{validateErrorMessage}</p> }
        { errorBooking && <p className={b('row-with-error')}>{errorBooking}</p> }
        <div>
          <Button
            type="submit"
            caption={t('forms:bookingForm.toBook')}
            theme="default"
            withArrow
            size="fluid"
          />
        </div>
      </form>
    </div>
  );
};

export default i18n.withTranslation(['common', 'forms'])(
  FormRoomDetails,
);
