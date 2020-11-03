/* eslint-disable */

import { FC } from 'react';
import { block } from 'bem-cn';

import getQueryProps from './helpers';

import Accordion from 'src/components/Accordion/Accordion';
// import Checkbox from 'src/components/Checkbox/Checkbox';
import DataPicker from 'src/components/DatePicker/DatePicker';
import InputDropdown from 'src/components/InputDropdown/InputDropdown';
import Slider from 'src/components/Slider/Slider';

import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
// import type { ISliderValues } from 'src/components/Slider/Slider';
import {
  dropdownGuestsProps,
  dropdownComfortProps,
  // checkboxListProps,
  // richCheckboxListProps,
  accordionProps,
} from 'src/components/Filter/options';

import './Filter.scss';
// import DatePicker from 'src/components/DatePicker/DatePicker';

const b = block('filter');

const labelsMap: { [key:string]: string; } = {
  Взрослые: 'gAdults',
  Дети: 'gChilds',
  Младенцы: 'gToddlers',
};

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
  const queryProps = getQueryProps();
  const {
    dStart,
    dEnd,
    gAdults,
    gChilds,
    gToddlers,
    // smokingAllowed,
    // petsAllowed,
    // guestAllowed,
  } = queryProps

  let newDropdownGuestsProps;
  // let newCheckboxListProps;

  const isDatePickerInitialized = (): boolean => {
    if ((dStart === undefined) && (dEnd === undefined)) {
      return false
    }

    return true
  }

  const isGuestsDropdownInitialized = (): boolean => {
    if ((gAdults === undefined) && (gChilds === undefined) && (gToddlers === undefined)) {
      return false
    }

    newDropdownGuestsProps = JSON.parse(JSON.stringify(dropdownGuestsProps));
    const arrLabelsKeys = Object.keys(labelsMap);


    newDropdownGuestsProps.forEach((item: IDropListItem, index: number) => {
      if (item.label === arrLabelsKeys[index]) {
        const newCount = queryProps[`${labelsMap[item.label]}`]
        newCount === undefined ? item.count : item.count = Number(newCount)
      }
    })

    return true
  }

  // const isCheckboxInitialized = (): boolean => {
  //   if ((gAdults === smokingAllowed) && (gChilds === undefined) && (gToddlers === undefined)) {
  //     return false
  //   }

  //   return true
  // }
  // const [queryProps, setQueryProps] = useState({});
  // const [guestsProps, setGuestsProps] = useState<IDropListItem[]>(dropdownGuestsProps)
  // const router = useRouter();

  // useEffect(() => {
  //   if (router.asPath !== router.route) {
  //     const props = router.query;
  //     setQueryProps((prev) => ({
  //       ...prev,
  //       ...props,
  //     }));  
  //   }
  // }, [router]);

  // useEffect(() => {
  //   setGuestsProps([
  //     { label: 'Взрослые', count: 2, plurals: { one: 'взрослый', two: 'взрослых', few: 'взрослых' } },
  //     { label: 'Дети', count: 2, plurals: { one: 'кровать', two: 'кровати', few: 'кроватей' } },
  //     {
  //       label: 'Младенцы', count: 2, plurals: { one: 'младенец', two: 'младенца', few: 'младенцев' }, special: true,
  //     },
  //   ])
  // }, [queryProps])

  // useEffect(() => {
    // console.log('useEffect guestsProps')
  // }, [guestsProps])

  // useEffect(() => {
  //   const queryString = queryToString(query);
  //   router.push('/rooms', `/rooms?${queryString}`);
  // }, [query]);

  // const handleDataPickerChange = (
    // { start, end }: RangeDays,
  // ): void => {
    // const _start = start === null ? '' : start;
    // const _end = end === null ? '' : end;

    // console.log(propsTest);

    // setQuery((prev) => (
    //   {
    //     ...prev,
    //     dStart: (new Date(_start)).getTime(),
    //     dEnd: (new Date(_end)).getTime(),
    //   }
    // ));
  // };

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
        {isDatePickerInitialized() ? <DataPicker /> : <DataPicker />}
      </div>
      <div className={b('guests')}>
        <h3 className={b('guests-title')}>гости</h3>
        <InputDropdown 
            name="guests"
            placeholder="Сколько гостей"
            defaultLabel={{ one: 'гость', two: 'гостя', few: 'гостей' }}
            dropList={isGuestsDropdownInitialized() ? newDropdownGuestsProps : dropdownGuestsProps}
            buttons
            onChange={handleGuestsChange}
          /> 
      </div>
      <div className={b('slider')}>
        <Slider
          title="диапазон цены"
          description="Стоимость за сутки пребывания в номере"
          min={10000}
          max={40000}
          currentValues={[10000, 40000]}
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
