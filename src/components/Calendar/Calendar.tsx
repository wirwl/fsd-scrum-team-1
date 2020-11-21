import React, { useState, useMemo, useEffect } from 'react';
import { block } from 'bem-cn';

import Button from 'src/components/Button/Button';
import createDaysList, { updateRange } from './lib';
import './Calendar.scss';

type RangeDays = {
  start: Date | null;
  end: Date | null;
};

type CalendarMode = 'start' | 'end' | 'auto';

interface ICalendarProps {
  selectRangeDay?: CalendarMode;
  weekdayNames?: string[];
  monthNames?: string[];
  buttonClear?: string;
  buttonApply?: string;
  range?: RangeDays;
  onRangeUpdate?: (range: RangeDays) => void;
  onApply?: (range: RangeDays) => void;
  onClear?: () => void;
}

const b = block('calendar');

const isCanSwitchBack = (drawnDate: Date, currentDate: Date): boolean => (
  drawnDate.getFullYear() > currentDate.getFullYear()
  || (drawnDate.getFullYear() === currentDate.getFullYear()
  && drawnDate.getMonth() > currentDate.getMonth())
);

const rangeIsEmpty = (range: RangeDays): boolean => (range.start === null && range.end === null);

const getDayClasses = (params: {
  day: Date;
  drawnDate: Date;
  range: RangeDays;
}): string => {
  const {
    day,
    drawnDate,
    range: {
      start,
      end,
    },
  } = params;

  const bemMods: { [index: string]: string | boolean } = { 'not-clickable': false };

  if (day.getMonth() !== drawnDate.getMonth()) bemMods.theme = 'another-month';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (today.getTime() === day.getTime()) bemMods.theme = 'today';
  if (day.getTime() <= today.getTime()) bemMods['not-clickable'] = true;

  const startIsNull = start === null;
  const endIsNull = end === null;
  const rangeIsFull = !startIsNull && !endIsNull;

  if (!startIsNull && (start as Date).getTime() === day.getTime()) {
    bemMods.theme = 'part-of-range';
    if (rangeIsFull) bemMods['inrange-position'] = 'start';
  }

  if (!endIsNull && (end as Date).getTime() === day.getTime()) {
    bemMods.theme = 'part-of-range';
    if (rangeIsFull) bemMods['inrange-position'] = 'end';
  }

  if (rangeIsFull) {
    const isDayMiddleRange = day.getTime() > (start as Date).getTime()
    && day.getTime() < (end as Date).getTime();

    if (isDayMiddleRange) bemMods.theme = 'mid-range';
  }

  return b('day', bemMods);
};

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
    range: initRange = {
      start: null,
      end: null,
    },
    onApply = null,
    onClear = null,
  } = props;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const [drawnDate, setDrawnDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const daysList = useMemo(() => createDaysList(drawnDate), [drawnDate]);
  const [range, setRange] = useState<RangeDays>(() => {
    const isValidRangeStart = initRange.start !== null
    && initRange.start.setHours(0, 0, 0, 0)
    && initRange.start.getTime() > currentDate.getTime();

    const isValidRangeEnd = initRange.end !== null
    && initRange.end.setHours(0, 0, 0, 0)
    && initRange.end.getTime() > currentDate.getTime();

    return {
      start: isValidRangeStart ? initRange.start : null,
      end: isValidRangeEnd ? initRange.end : null,
    };
  });

  useEffect(() => {
    let currentRange = { ...range };

    if (range.start !== null) {
      currentRange = updateRange({ ...range, day: initRange.start as Date, selectMode: 'start' });
    }

    if (range.end !== null) {
      currentRange = updateRange({ ...range, day: initRange.end as Date, selectMode: 'end' });
    }

    setRange(currentRange);
    onApply && onApply(currentRange);
  }, [
    initRange.start ? initRange.start.getTime() : null,
    initRange.end ? initRange.end.getTime() : null,
  ]);

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
        className={getDayClasses({ range, day, drawnDate })}
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
          className={b('change-month', { hidden: !isCanSwitchBack(drawnDate, currentDate) })}
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
        <div className={b('clear-button', { hidden: rangeIsEmpty(range) })}>
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
            handleClick={() => { if (onApply) onApply(range); }}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;

export type {
  RangeDays,
  CalendarMode,
}
