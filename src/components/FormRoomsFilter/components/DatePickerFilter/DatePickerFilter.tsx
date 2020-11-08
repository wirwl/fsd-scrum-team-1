import {
  FC,
  useState,
} from 'react';
import DatePicker from 'src/components/DatePicker/DatePicker';
import { initDateRangeState } from 'src/components/FormRoomsFilter/helpers';

type IDateRangeFilter = {
  start: number;
  end: number;
};

type IDatePickerFilterProps = {
  query: Record<string, string>;
  onChange: (dateRange: IDateRangeFilter, dateRangeString: string) => void;
};

const DatePickerFilter: FC<IDatePickerFilterProps> = ({ query, onChange }) => {
  // Need initialize DatePicker when this feature will be implemented
  const [_state, setState] = useState(initDateRangeState(query));

  const handleDatePickerChange = ({ start, end }: RangeDays): void => {
    const newValue = {
      start: (new Date(start as Date)).getTime(),
      end: (new Date(end as Date)).getTime(),
    };

    setState(newValue);
    onChange(newValue, `${newValue.start}-${newValue.end}`);
  };

  return (
    <DatePicker onChange={handleDatePickerChange} />
  );
};

export default DatePickerFilter;

export type {
  IDateRangeFilter,
};
