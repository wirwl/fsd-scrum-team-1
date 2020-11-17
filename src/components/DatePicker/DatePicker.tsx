import { block } from 'bem-cn';
import { useCallback, useEffect, useState } from 'react';

import Calendar from 'src/components/Calendar/Calendar';
import DropdownInput from './components/DropdownInput/DropdownInput';
import './DatePicker.scss';

interface IState {
  expandedDatePicker: boolean;
  expandedDropdownStart: boolean;
  expandedDropdownEnd: boolean;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  calendarSelectMode: 'start' | 'end' | 'auto';
}

enum DROPDOWNS_NAMES {
  FULL_RANGE = 'full-range',
  RANGE_START = 'range-start',
  RANGE_END = 'range-end',
}

const b = block('data-picker');

const dateToString = (date: Date): string => ([
  date.getDate().toString().padStart(2, '0'),
  (date.getMonth() + 1).toString().padStart(2, '0'),
  date.getFullYear(),
].join('.'));

const DatePicker: React.FC<IDatePickerProps> = (props) => {
  const {
    withTwoInputs = false,
    title = 'даты пребывания в отеле',
    placeholder = 'ДД.ММ.ГГГГ',
    startTitle = 'прибытие',
    endTitle = 'выезд',
    rangeEnd = null,
    rangeStart = null,
    onChange,
  } = props;

  const [state, setState] = useState<IState>({
    expandedDatePicker: false,
    expandedDropdownStart: false,
    expandedDropdownEnd: false,
    rangeStart: null,
    rangeEnd: null,
    calendarSelectMode: 'auto',
  });

  const handleDropdownInputClick = (name: string): boolean => {
    if (name === DROPDOWNS_NAMES.FULL_RANGE) {
      setState((prev) => ({
        ...prev,
        expandedDatePicker: !prev.expandedDatePicker,
      }));

      return true;
    }

    if (name === DROPDOWNS_NAMES.RANGE_START) {
      setState((prev) => ({
        ...prev,
        expandedDatePicker: !prev.expandedDropdownStart,
        expandedDropdownStart: !prev.expandedDropdownStart,
        expandedDropdownEnd: false,
        calendarSelectMode: 'start',
      }));

      return true;
    }

    if (name === DROPDOWNS_NAMES.RANGE_END) {
      setState((prev) => ({
        ...prev,
        expandedDatePicker: !prev.expandedDropdownEnd,
        expandedDropdownEnd: !prev.expandedDropdownEnd,
        expandedDropdownStart: false,
        calendarSelectMode: 'end',
      }));

      return true;
    }

    return true;
  };

  const handleCalendarClear = (): void => {
    setState((prev) => ({
      ...prev,
      rangeEnd: null,
      rangeStart: null,
      expandedDatePicker: false,
      expandedDropdownEnd: false,
      expandedDropdownStart: false,
    }));

    onChange && onChange({ start: null, end: null });
  };

  const handleCalendarApply = (range: RangeDays): void => {
    setState((prev) => ({
      ...prev,
      rangeStart: range.start,
      rangeEnd: range.end,
      expandedDatePicker: false,
      expandedDropdownEnd: false,
      expandedDropdownStart: false,
    }));

    onChange && onChange(range);
  };

  const handleDocumentClick = useCallback((ev: MouseEvent): void => {
    const path = ev.composedPath() as Element[];

    const targetIsDataPicker = path.some((element): boolean => {
      if (!element.classList) return false;
      return element.classList.contains('data-picker');
    });

    if (!targetIsDataPicker) {
      setState((prev) => ({
        ...prev,
        expandedDatePicker: false,
        expandedDropdownStart: false,
        expandedDropdownEnd: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (state.expandedDatePicker) document.addEventListener('click', handleDocumentClick);
    else document.removeEventListener('click', handleDocumentClick);
  }, [state.expandedDatePicker]);

  const bemMods = {
    expanded: state.expandedDatePicker,
    'with-two-inputs': withTwoInputs,
  };

  const dropdownValue = [
    state.rangeStart ? dateToString(state.rangeStart) : placeholder,
    state.rangeEnd ? dateToString(state.rangeEnd) : placeholder,
  ].join(' - ');

  const dropdownStartValue = state.rangeStart ? dateToString(state.rangeStart) : placeholder;
  const dropdownEndValue = state.rangeEnd ? dateToString(state.rangeEnd) : placeholder;

  const dropdowns = withTwoInputs
    ? (
      <>
        <div className={b('dropdown')}>
          <DropdownInput
            title={startTitle}
            onClick={handleDropdownInputClick}
            expanded={state.expandedDropdownStart}
            value={dropdownStartValue}
            name={DROPDOWNS_NAMES.RANGE_START}
          />
        </div>
        <div className={b('dropdown')}>
          <DropdownInput
            title={endTitle}
            onClick={handleDropdownInputClick}
            expanded={state.expandedDropdownEnd}
            value={dropdownEndValue}
            name={DROPDOWNS_NAMES.RANGE_END}
          />
        </div>
      </>
    ) : (
      <div className={b('dropdown')}>
        <DropdownInput
          title={title}
          onClick={handleDropdownInputClick}
          expanded={state.expandedDatePicker}
          value={dropdownValue}
          name={DROPDOWNS_NAMES.FULL_RANGE}
        />
      </div>
    );

  return (
    <div className={b(bemMods)}>
      <div className={b('head')}>
        {dropdowns}
      </div>
      <div className={b('container')}>
        <div className={b('calendar')}>
          <Calendar
            onClear={handleCalendarClear}
            onApply={handleCalendarApply}
            range={{ start: rangeStart, end: rangeEnd }}
            selectRangeDay={state.calendarSelectMode}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
