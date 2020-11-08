import {
  FC,
} from 'react';
import DatePicker from 'src/components/DatePicker/DatePicker';

type IDateRangeFilter = {
  start: number;
  end: number;
};

type IDatePickerFilterProps = {
  query: Record<string, string>;
  onChange: (dateRange: IDateRangeFilter, dateRangeString: string) => void;
};

const DatePickerFilter: FC<IDatePickerFilterProps> = ({ onChange }) => {
  const handleDatePickerChange = ({ start, end }: RangeDays): void => {
    const newValue = {
      start: (new Date(start as Date)).getTime(),
      end: (new Date(end as Date)).getTime(),
    };

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
