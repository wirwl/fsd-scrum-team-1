import { BemItem, Block } from 'bem-cn';

const getDaysInMonth = (date: Date): number => (
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
);

const createDaysList = (renderDate: Date): Date[] => {
  const days: Date[] = [];

  const previousMonth = new Date(renderDate);
  previousMonth.setMonth(renderDate.getMonth() - 1);
  const daysInPrevMonth = getDaysInMonth(previousMonth);
  previousMonth.setDate(daysInPrevMonth);

  let dayOfWeek = (previousMonth.getDay() || 7); // Monday - 1, Sunday - 7
  if (dayOfWeek < 7) { // last day of the previous month is not Sunday
    for (
      let dayOfMonth = daysInPrevMonth;
      dayOfWeek > 0;
      dayOfWeek -= 1, dayOfMonth -= 1
    ) {
      const date = new Date(previousMonth);
      date.setDate(dayOfMonth);
      days.unshift(date);
    }
  }

  const currentMonth = new Date(renderDate);
  const daysInMonth = getDaysInMonth(currentMonth);
  for (let i = 1; i <= daysInMonth; i += 1) {
    const date = new Date(currentMonth);
    date.setDate(i);
    days.push(date);
  }

  const nextMonth = new Date(renderDate);
  nextMonth.setMonth(renderDate.getMonth() + 1);
  nextMonth.setDate(1);

  let dayOfWeekFirstDay = (nextMonth.getDay() || 7); // Monday - 1, Sunday - 7
  if (dayOfWeekFirstDay > 1) {
    for (let dayOfMonth = 1; dayOfWeekFirstDay <= 7; dayOfWeekFirstDay += 1, dayOfMonth += 1) {
      const date = new Date(nextMonth);
      date.setDate(dayOfMonth);
      days.push(date);
    }
  }

  return days;
};

const getDayClasses = (params: {
  day: Date;
  drawnDate: Date;
  start: Date | null;
  end: Date | null;
  b: Block;
}): BemItem & string => {
  const {
    day,
    drawnDate,
    end,
    start,
    b,
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

const updateRange = (params: {
  day: Date;
  start: Date | null;
  end: Date | null;
  selectMode: CalendarMode;
}): RangeDays => {
  const {
    day,
    end,
    start,
    selectMode,
  } = params;

  const targetDate = new Date(day);
  targetDate.setHours(0, 0, 0, 0);
  const targetDateInMilliseconds = targetDate.getTime();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const newRange = { start, end };
  const startIsNull = start === null;
  const endIsNull = end === null;

  if (targetDateInMilliseconds <= currentDate.getTime()) return newRange;

  if (selectMode === 'start' || selectMode === 'end') {
    if (selectMode === 'start') {
      newRange.start = targetDate;
      const inNeedResetRangeEnd = !endIsNull && (targetDate.getTime() >= (end as Date).getTime());
      if (inNeedResetRangeEnd) newRange.end = null;
    } else {
      const isTargetDateCanBeSetToEnd = !startIsNull
      && (targetDateInMilliseconds > (start as Date).getTime());
      if (startIsNull || isTargetDateCanBeSetToEnd) newRange.end = targetDate;
    }

    return newRange;
  }

  const rangeIsEmpty = startIsNull && endIsNull;
  const rangeIsFull = !startIsNull && !endIsNull;

  if (rangeIsEmpty || rangeIsFull) return { start: targetDate, end: null };
  if (targetDateInMilliseconds !== (start as Date).getTime()) {
    if (targetDateInMilliseconds < (start as Date).getTime()) {
      newRange.end = start;
      newRange.start = targetDate;
    } else {
      newRange.end = targetDate;
    }
  }

  return newRange;
};

export default createDaysList;
export { getDayClasses, updateRange };
