import React, { useState } from 'react';
import { block } from 'bem-cn';

import createDaysList, { getDayClasses, updateRange } from './lib';
import './calendar.scss';

type RangeDays = {
  start: Date | null;
  end: Date | null;
};

interface ICalendarProps {
  selectRangeDay?: 'start' | 'end' | 'auto';
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

  const handleButtonChangeMonthClick = (ev: React.MouseEvent<HTMLButtonElement>): void => {
    const isNextMonth = ev.currentTarget.dataset.action === 'next-month';

    setDrawnDate((prevDate) => {
      const tmpDate = new Date(prevDate);
      tmpDate.setMonth(
        prevDate.getMonth() + (isNextMonth ? 1 : -1),
      );

      return tmpDate;
    });
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

  const addDayInRange = (targetDay: Date): boolean => {
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
      onClick={() => addDayInRange(day)}
      role="button"
      onKeyUp={() => addDayInRange(day)}
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
          className={b('change-month')}
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
          className={b('clear-button')}
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
