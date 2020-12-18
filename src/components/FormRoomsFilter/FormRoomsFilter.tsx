import {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { block } from 'bem-cn';
import isEqual from 'lodash/isEqual';
import { useRouter } from 'next/router';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
import type {
  IDateRangeFilter,
} from 'src/components/FormRoomsFilter/components/DatePickerFilter/DatePickerFilter';

import InputDropdownFilter from 'src/components/FormRoomsFilter/components/InputDropdownFilter/InputDropdownFilter';
import { ISliderValues } from 'src/components/Slider/Slider';
import AccordionFilter from 'src/components/FormRoomsFilter/components/AccordionFilter/AccordionFilter';
import GroupCheckboxFilter from 'src/components/FormRoomsFilter/components/GroupCheckboxFilter/GroupCheckboxFilter';
import SliderFilter, {
  MIN_PRICE,
  MAX_PRICE,
} from 'src/components/FormRoomsFilter/components/SliderFilter/SliderFilter';
import DatePickerFilter from 'src/components/FormRoomsFilter/components/DatePickerFilter/DatePickerFilter';
import {
  getDropdownGuestsInit,
  getDropdownConvenienceInit,
  getExtraConvenienceInit,
  getRulesInit,
  getAccessibilityInit,
} from 'src/components/FormRoomsFilter/initValues';
import {
  initState,
  updateQuery,
} from 'src/components/FormRoomsFilter/helpers';

import './FormRoomsFilter.scss';
import { saveGuestsCountAsSharedData, saveResidenceTimeAsSharedData } from '@/services/SharedData';

const b = block('form-rooms-filter');

type IFormRoomFilterState = {
  adults?: number;
  children?: number;
  babies?: number;
  dateRange?: { start: number, end: number };

  bed: number;
  bedroom: number;
  bathroom: number;

  price: [number, number];

  // rules
  petsAllowed: boolean;
  smokingAllowed: boolean;
  guestsAllowed: boolean;

  // accessibility
  wideCorridor: boolean;
  assistantForDisabled: boolean;

  // extraConvenience
  breakfast: boolean;
  desk: boolean;
  feedingChair: boolean;
  smallBad: boolean;
  tv: boolean;
  shampoo: boolean;
};

type IFormRoomFilterProps = {
  query: Record<string, string>;
  onChange: (params: IFormRoomFilterState) => void;
} & WithTranslation;

type IFilterStateRecord = Record<
string,
number | [number, number] | string[] | boolean | IDateRangeFilter
>;

const usePrevious = (
  value: IFormRoomFilterState,
): IFormRoomFilterState | undefined => {
  const ref = useRef<IFormRoomFilterState>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const isStatesEquals = (
  prevFiltersState: IFormRoomFilterState | undefined,
  filters: IFormRoomFilterState,
):boolean => (
  prevFiltersState === undefined || isEqual(prevFiltersState, filters)
);

const FormRoomsFilter: FC<IFormRoomFilterProps> = ({
  query,
  onChange,
  t,
}) => {
  const router = useRouter();
  const [filters, setFilters] = useState<IFormRoomFilterState>(
    initState(query, MIN_PRICE, MAX_PRICE, t),
  );

  const prevFiltersState = usePrevious(filters);

  useEffect(() => {
    if (!isStatesEquals(prevFiltersState, filters)) onChange(filters);
  }, [filters]);

  const handleSliderChange = (
    values: ISliderValues,
    priceString: string,
  ): void => {
    updateQuery('price', priceString, router);
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: values as [number, number],
    }));
  };

  const handleDatePickerChange = (
    dateRange: IDateRangeFilter,
    dateRangeString: string,
  ): void => {
    updateQuery('dateRange', dateRangeString, router);
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateRange,
    }));

    saveResidenceTimeAsSharedData(
      {
        start: new Date(dateRange.start),
        end: new Date(dateRange.end),
      },
    );
  };

  const handleCheckboxRulesChange = (
    rules: Record<string, boolean>,
    rulesString: string,
  ): void => {
    updateQuery('rules', rulesString, router);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...rules,
    }));
  };

  const handleCheckboxAccessibilityChange = (
    accessibility: Record<string, boolean>,
    accessibilityString: string,
  ): void => {
    updateQuery('accessibility', accessibilityString, router);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...accessibility,
    }));
  };

  const handleAccordionExtraConvenienceChange = (
    values: Record<string, boolean>,
    valueString: string,
  ): void => {
    updateQuery('extraConvenience', valueString, router);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...values,
    }));
  };

  const handleGuestsDropdownChange = (values: IDropListItem[]): void => {
    values.forEach(({ id, count }) => {
      updateQuery(id, count === 0 ? '' : count.toString(), router);
    });

    const newState = values
      .reduce((acc, { id, count }) => ({ ...acc, [id]: count }), {});

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newState,
    }));

    saveGuestsCountAsSharedData(values);
  };

  const handleConvenienceDropdownChange = (values: IDropListItem[]): void => {
    values.forEach(({ id, count }) => {
      updateQuery(id, count === 0 ? '' : count.toString(), router);
    });
    const newState = values
      .reduce((acc, { id, count }) => ({ ...acc, [id]: count }), {});

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newState,
    }));
  };

  return (
    <form className={b()}>

      <section className={b('field', { 'with-bottom-18': true })}>
        <DatePickerFilter
          query={query}
          onChange={handleDatePickerChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-30': true })}>
        <h3 className={b('field-title')}>
          {t('components:guestInputDropdown.guests')}
        </h3>
        <InputDropdownFilter
          query={query}
          name="guests"
          placeholder={t('forms:landing.howManyGuests')}
          defaultLabel={{
            one: t('components:guestInputDropdown.guestsOne'),
            two: t('components:guestInputDropdown.guestsTwo'),
            few: t('components:guestInputDropdown.guestsFew'),
          }}
          initValues={getDropdownGuestsInit(t)}
          onChange={handleGuestsDropdownChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-30': true })}>
        <SliderFilter
          query={query}
          onChange={handleSliderChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <GroupCheckboxFilter
          query={query}
          keyValue="rules"
          initValues={getRulesInit(t)}
          title={t('components:rules.title')}
          onChange={handleCheckboxRulesChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <GroupCheckboxFilter
          query={query}
          keyValue="accessibility"
          initValues={getAccessibilityInit(t)}
          title={t('components:accessibility.title')}
          onChange={handleCheckboxAccessibilityChange}
        />
      </section>

      <section className={b('field', { 'with-bottom-24': true })}>
        <h3 className={b('field-title')}>
          {t('components:convenientInputDropdown.title')}
        </h3>
        <InputDropdownFilter
          query={query}
          name="convenience"
          placeholder={t('components:convenientInputDropdown.title')}
          defaultLabel={false}
          initValues={getDropdownConvenienceInit(t)}
          onChange={handleConvenienceDropdownChange}
        />
      </section>

      <section className={b('field')}>
        <AccordionFilter
          query={query}
          keyValue="extraConvenience"
          initValues={getExtraConvenienceInit(t)}
          title={t('components:extraConvenience.title')}
          onChange={handleAccordionExtraConvenienceChange}
        />
      </section>

    </form>
  );
};

export default i18n.withTranslation(['common', 'forms', 'components'])(
  FormRoomsFilter,
);

export {
  initState,
  updateQuery,
};

export type {
  IFormRoomFilterState,
  IFilterStateRecord,
};
