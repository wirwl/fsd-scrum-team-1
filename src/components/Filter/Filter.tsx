/* eslint-disable */

import { FC, useEffect, useState } from 'react';
import { block } from 'bem-cn';
import { useRouter } from 'next/router';

import Accordion from 'src/components/Accordion/Accordion';
// import Checkbox from 'src/components/Checkbox/Checkbox';
import DataPicker from 'src/components/DatePicker/DatePicker';
import InputDropdown from 'src/components/InputDropdown/InputDropdown';
import Slider from 'src/components/Slider/Slider';

// import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
// import type { ISliderValues } from 'src/components/Slider/Slider';
import {
  dropdownGuestsProps,
  dropdownComfortProps,
  // checkboxListProps,
  // richCheckboxListProps,
  accordionProps,
} from 'src/components/Filter/options';

import './Filter.scss';

const b = block('filter');

// const labelsMap: { [key:string]: string; } = {
//   Взрослые: 'gAdults',
//   Дети: 'gChilds',
//   Младенцы: 'gToddlers',
// };

// const comfortMap: { [key:string]: string; } = {
//   Спальни: 'cBedrooms',
//   Кровати: 'cBeds',
//   'Ванные комнаты': 'cBathrooms',
// };

// const convertPersons = (
//   persons: IDropListItem[],
//   labels: {[key:string]: string},
// ): { [key:string]: number } => persons.reduce(
//   (acc, { label, count }) => ({ ...acc, [labels[label]]: count }),
//   {},
// );

// const queryToString = (
//   query: { [key:string]: number | string },
// ): string => Object.keys(query)
//   .reduce((acc, key) => `&${key}=${query[key]}${acc}`, '')
//   .slice(1);

const Filter: FC = () => {
  const router = useRouter();
  const [queryProps, setQueryProps] = useState({});

  useEffect(() => {
    if (router.asPath !== router.route) {
      const props = router.query;
      setQueryProps((prev) => ({
        ...prev,
        ...props,
      }));
    }
  }, [router]);

  // useEffect(() => {
  //   const queryString = queryToString(query);
  //   router.push('/rooms', `/rooms?${queryString}`);
  // }, [query]);

  const handleDataPickerChange = (
    // { start, end }: RangeDays,
  ): void => {
    // const _start = start === null ? '' : start;
    // const _end = end === null ? '' : end;

    console.log(queryProps);

    // setQuery((prev) => (
    //   {
    //     ...prev,
    //     dStart: (new Date(_start)).getTime(),
    //     dEnd: (new Date(_end)).getTime(),
    //   }
    // ));
  };

  const handleGuestsChange = (
    // persons: IDropListItem[],
  ): void => {

    // setQuery((prev) => (
    //   {
    //     ...prev,
    //     ...convertPersons(persons, labelsMap),
    //   }
    // ));
  };

  const handleComfortChange = (
    // persons: IDropListItem[],
  ): void => {
    // setQuery((prev) => (
    //   {
    //     ...prev,
    //     ...convertPersons(persons, comfortMap),
    //   }
    // ));
  };

  const handleSliderChange = (
    // range: ISliderValues
    ): void => {
    // setQuery((prev) => (
    //   {
    //     ...prev,
    //     priceTo: range[1],
    //     priceFrom: range[0],
    //   }
    // ));
  };

  const handleCheckboxListChange = (
    // newCheckboxState: {[key:string]: boolean},
  ): void => {
    // setQuery((prev) => (
    //   {
    //     ...prev,
    //     ...newCheckboxState,
    //   }
    // ));
  };

  // const checkboxListChange = (name: string, isChecked: boolean): void => {
  //   const newCheckboxState = {
  //     [name]: isChecked,
  //   };
  //   handleCheckboxListChange(newCheckboxState);
  // };

  // const checkboxes = checkboxListProps.map((checkbox) => {
  //   const {
  //     label,
  //     checked,
  //     description,
  //     name,
  //   } = checkbox;
  //   return (
  //     <div key={`${label}_${name}`} className={b('checkbox-list-item')}>
  //       <Checkbox
  //         label={label}
  //         description={description}
  //         name={name}
  //         checked={checked}
  //         onChange={(isChecked) => (name ? checkboxListChange(name, isChecked) : null)}
  //       />
  //     </div>
  //   );
  // });

  // const richCheckboxes = richCheckboxListProps.map((checkbox) => {
  //   const {
  //     label,
  //     checked,
  //     description,
  //     name,
  //   } = checkbox;
  //   return (
  //     <div key={`${label}_${name}`} className={b('rich-checkbox-list-item')}>
  //       <Checkbox
  //         label={label}
  //         description={description}
  //         name={name}
  //         checked={checked}
  //         onChange={(isChecked) => (name ? checkboxListChange(name, isChecked) : null)}
  //       />
  //     </div>
  //   );
  // });

  return (
    <div
      className={b()}
    >
      <div className={b('date-of-stay')}>
        <DataPicker onChange={handleDataPickerChange} />
      </div>
      <div className={b('guests')}>
        <h3 className={b('guests-title')}>гости</h3>
        <InputDropdown
          name="guests"
          placeholder="Сколько гостей"
          defaultLabel={{ one: 'гость', two: 'гостя', few: 'гостей' }}
          dropList={dropdownGuestsProps}
          buttons
          onChange={handleGuestsChange}
        />
      </div>
      <div className={b('slider')}>
        <Slider
          title="диапазон цены"
          description="Стоимость за сутки пребывания в номере"
          currentValues={[5000, 10000]}
          onChange={handleSliderChange}
        />
      </div>
      <div className={b('checkbox-list')}>
        <h3 className={b('checkbox-list-title')}>правила дома</h3>
        {/* {checkboxes} */}
      </div>
      <div className={b('rich-checkbox-list')}>
        <h3 className={b('rich-checkbox-list-title')}>доступность</h3>
        {/* {richCheckboxes} */}
      </div>
      <div className={b('conveniences')}>
        <h3 className={b('conveniences-title')}>удобства номера</h3>
        <InputDropdown
          name="conveniences"
          placeholder="Удобства"
          dropList={dropdownComfortProps}
          onChange={handleComfortChange}
        />
      </div>
      <div className={b('accordion')}>
        <Accordion
          title="дополнительные удобства"
          checkboxList={accordionProps}
          onChange={handleCheckboxListChange}
        />
      </div>

    </div>
  );
};

export default Filter;
