import { block } from 'bem-cn';
import { useState } from 'react';

import Calendar from '@components/calendar/Calendar';
import DropdownInput from './dropdown-input/DropdownInput';
import './date-picker.scss';

interface IDatePickerProps {
  withTwoInputs?: boolean;
  placeholder?: string;
  title?: string;
  startTitle?: string;
  endTitle?: string;
}

interface IState {
  withTwoInputs: boolean;
  expandedDatePicker: boolean;
  expandedDropdownStart: boolean;
  expandedDropdownEnd: boolean;
  dropdownValue: string;
  dropdownStartValue: string;
  dropdownEndValue: string;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  calendarSelectMode: 'start' | 'end' | 'auto';
}

enum DROPDOWNS_NAMES {
  FULL_RANGE = 'full-range',
  RANGE_START = 'range-start',
  RANGE_END = 'range-end'
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
  } = props;

  const [state, setState] = useState<IState>({
    withTwoInputs,
    expandedDatePicker: false,
    expandedDropdownStart: false,
    expandedDropdownEnd: false,
    rangeStart: null,
    rangeEnd: null,
    calendarSelectMode: 'auto',
    dropdownValue: `${placeholder} - ${placeholder}`,
    dropdownStartValue: placeholder,
    dropdownEndValue: placeholder,
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
      dropdownValue: `${placeholder} - ${placeholder}`,
      dropdownStartValue: placeholder,
      dropdownEndValue: placeholder,
    }));
  };

  const handleCalendarApply = (range: RangeDays): void => {
    const dropdownValue = [
      range.start ? dateToString(range.start) : placeholder,
      range.end ? dateToString(range.end) : placeholder,
    ].join(' - ');

    setState((prev) => ({
      ...prev,
      ...range,
      dropdownValue,
      expandedDatePicker: false,
      expandedDropdownEnd: false,
      expandedDropdownStart: false,
      dropdownStartValue: range.start ? dateToString(range.start) : placeholder,
      dropdownEndValue: range.end ? dateToString(range.end) : placeholder,
    }));
  };

  const dropdowns = withTwoInputs
    ? (
      <>
        <div className={b('dropdown')}>
          <DropdownInput
            title={startTitle}
            onClick={handleDropdownInputClick}
            expanded={state.expandedDropdownStart}
            value={state.dropdownStartValue}
            name={DROPDOWNS_NAMES.RANGE_START}
          />
        </div>
        <div className={b('dropdown')}>
          <DropdownInput
            title={endTitle}
            onClick={handleDropdownInputClick}
            expanded={state.expandedDropdownEnd}
            value={state.dropdownEndValue}
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
          value={state.dropdownValue}
          name={DROPDOWNS_NAMES.FULL_RANGE}
        />
      </div>
    );

  return (
    <div className={b({ expanded: state.expandedDatePicker, 'with-two-inputs': withTwoInputs })}>
      <div className={b('head')}>
        {dropdowns}
      </div>
      <div className={b('container')}>
        <div className={b('calendar')}>
          <Calendar
            onClear={handleCalendarClear}
            onApply={handleCalendarApply}
            selectRangeDay={state.calendarSelectMode}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
