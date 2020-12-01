import {
  FC,
} from 'react';
import { WithTranslation } from 'next-i18next';

import type { RangeDays } from 'src/components/Calendar/Calendar';
import i18n from 'src/services/i18n';
import DatePicker from 'src/components/DatePicker/DatePicker';
import { initDateRangeState } from 'src/components/FormRoomsFilter/helpers';

type IDateRangeFilter = {
  start: number;
  end: number;
};

type IDatePickerFilterProps = {
  query: Record<string, string>;
  onChange: (dateRange: IDateRangeFilter, dateRangeString: string) => void;
} & WithTranslation;

const DatePickerFilter: FC<IDatePickerFilterProps> = ({ t, query, onChange }) => {
  const conf = initDateRangeState(query);

  let rangeStart;
  let rangeEnd;

  if (conf !== null) {
    rangeStart = new Date(conf.start);
    rangeEnd = new Date(conf.end);
  }

  const handleDatePickerChange = ({ start, end }: RangeDays): void => {
    if (start === null && end === null) return;

    const newValue = {
      start: (new Date(start as Date)).getTime(),
      end: (new Date(end as Date)).getTime(),
    };

    onChange(newValue, `${newValue.start}-${newValue.end}`);
  };

  return (
    <DatePicker
      rangeStart={rangeStart}
      rangeEnd={rangeEnd}
      onChange={handleDatePickerChange}
      title={t('components:dateRange.title')}
      placeholder={t('dateMaskPlaceholder')}
    />
  );
};

export default i18n.withTranslation(['common', 'components'])(
  DatePickerFilter,
);

export type {
  IDateRangeFilter,
};
