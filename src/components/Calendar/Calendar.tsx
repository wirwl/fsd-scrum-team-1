import React, { useState, useMemo } from 'react';
import { block } from 'bem-cn';

import Button from '@/components/Button/Button';
import createDaysList, { getDayClasses, updateRange } from './lib';
import './Calendar.scss';

interface ICalendarProps {
  selectRangeDay?: CalendarMode;
  weekdayNames?: string[];
  monthNames?: string[];
  buttonClear?: string;
  buttonApply?: string;
  onRangeUpdate?: (range: RangeDays) => void;
  onApply?: (range: RangeDays) => void;
  onClear?: () => void;
}

const Calendar: React.FC<ICalendarProps> = (props) => {
  const {
    weekdayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    monthNames = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    buttonClear = 'очистить',
    buttonApply = 'применить',
    selectRangeDay = 'auto',
    onApply = null,
    onClear = null,
  } = props;

  const [drawnDate, setDrawnDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  });
  const daysList = useMemo(() => createDaysList(drawnDate), [drawnDate]);
  const [range, setRange] = useState<RangeDays>(() => ({ start: null, end: null }));

  const b = block('calendar');

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const isCanSwitchBack = drawnDate.getFullYear() > currentDate.getFullYear()
  || (drawnDate.getFullYear() === currentDate.getFullYear()
  && drawnDate.getMonth() > currentDate.getMonth());
  const rangeIsEmpty = range.start === null && range.end === null;

  const changeMonth = (isNextMonth = false): void => {
    setDrawnDate((prevDate) => {
      const tmpDate = new Date(prevDate);
      tmpDate.setMonth(
        prevDate.getMonth() + (isNextMonth ? 1 : -1),
      );

      return !isCanSwitchBack && !isNextMonth ? prevDate : tmpDate;
    });
  };

  const handleClearButtonClick = (): void => {
    setRange({ start: null, end: null });
    onClear && onClear();
  };

  const handleDayClick = (targetDay: Date): boolean => {
    const isAnotherMonth = targetDay.getMonth() !== drawnDate.getMonth();

    if (isAnotherMonth) {
      const isNextMonth = targetDay.getDate() < 8;
      changeMonth(isNextMonth);
    }

    setRange((prevRange) => updateRange({
      day: targetDay,
      selectMode: selectRangeDay,
      ...prevRange,
    }));

    return true;
  };

  const weekdayNamesElements = weekdayNames.map((name) => (
    <li key={name} className={b('day-wrapper')}>
      <div className={b('day', { theme: 'weekday-name', 'not-clickable': true })}>
        <p className={b('day-inner')}>
          <span className={b('day-label')}>{name}</span>
        </p>
      </div>
    </li>
  ));

  const daysElements = daysList.map((day) => (
    <li className={b('day-wrapper')} key={day.getTime()}>
      <button
        className={getDayClasses({
          b,
          day,
          drawnDate,
          ...range,
        })}
        type="button"
        onClick={() => handleDayClick(day)}
        tabIndex={-1}
      >
        <p className={b('day-inner')}>
          <span className={b('day-label')}>
            {day.getDate()}
          </span>
        </p>
      </button>
    </li>
  ));

  return (
    <div className={b()}>
      <div className={b('date-navigation')}>
        <button
          type="button"
          className={b('change-month', { hidden: !isCanSwitchBack })}
          data-action="previous-month"
          onClick={() => changeMonth()}
        >
          arrow_back
        </button>
        <h2 className={b('drawn-date')}>
          {`${monthNames[drawnDate.getMonth()]} ${drawnDate.getFullYear()}`}
        </h2>
        <button
          type="button"
          className={b('change-month')}
          data-action="next-month"
          onClick={() => changeMonth(true)}
        >
          arrow_forward
        </button>
      </div>
      <ul className={b('weekday-names')}>{weekdayNamesElements}</ul>
      <ul className={b('days-container')}>{daysElements}</ul>
      <div className={b('control-buttons')}>
        <div className={b('clear-button', { hidden: rangeIsEmpty })}>
          <Button
            theme="textual"
            caption={buttonClear}
            handleClick={handleClearButtonClick}
          />
        </div>
        <div className={b('apply-button')}>
          <Button
            theme="textual"
            caption={buttonApply}
            handleClick={(): boolean => Boolean(onApply && onApply(range))}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
