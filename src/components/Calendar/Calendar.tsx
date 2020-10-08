import React, { useState } from 'react';
import { block } from 'bem-cn';

import createDaysList, { getDayClasses, updateRange } from './lib';
import './calendar.scss';

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

  const handleButtonChangeMonthClick = (ev: React.MouseEvent<HTMLButtonElement>): void => {
    const isNextMonth = ev.currentTarget.dataset.action === 'next-month';
    changeMonth(isNextMonth);
  };

  const handleControlButtonClick = (ev: React.MouseEvent<HTMLButtonElement>): boolean => {
    const { currentTarget } = ev;

    if (currentTarget.dataset.action === 'clear') {
      setRange({ start: null, end: null });
      onClear && onClear();
      return true;
    }

    if (currentTarget.dataset.action === 'apply') {
      onApply && onApply(range);
      return true;
    }

    return true;
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

  const daysElements = createDaysList(drawnDate).map((day) => (
    <div
      className={getDayClasses({
        b,
        day,
        drawnDate,
        ...range,
      })}
      key={day.getTime()}
      onClick={() => handleDayClick(day)}
      role="button"
      onKeyUp={() => handleDayClick(day)}
      tabIndex={0}
    >
      <p className={b('day-inner')}>
        <span className={b('day-number')}>
          {day.getDate()}
        </span>
      </p>
    </div>
  ));

  return (
    <div className={b()}>
      <div className={b('date-navigation')}>
        <button
          type="button"
          className={b('change-month', { hidden: !isCanSwitchBack })}
          data-action="previous-month"
          onClick={handleButtonChangeMonthClick}
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
          onClick={handleButtonChangeMonthClick}
        >
          arrow_forward
        </button>
      </div>
      <div className={b('weekday-names')}>
        { weekdayNames.map((name) => (<p className={b('weekday-name')} key={name}>{name}</p>)) }
      </div>
      <div className={b('days-container')}>{daysElements}</div>
      <div className={b('control-buttons')}>
        <button
          className={b('clear-button', { hidden: rangeIsEmpty })}
          data-action="clear"
          type="button"
          onClick={handleControlButtonClick}
        >
          {buttonClear}
        </button>
        <button
          className={b('apply-button')}
          data-action="apply"
          type="button"
          onClick={handleControlButtonClick}
        >
          {buttonApply}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
