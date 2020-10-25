import React, { useState, useEffect, FC } from 'react';
import { block } from 'bem-cn';
import Checkbox from '@/components/Checkbox/Checkbox';

import './Accordion.scss';

const b = block('accordion');

interface IAccordionCheckboxInfo {
  [key: string]: boolean;
}

interface IAccordionProps {
  title?: string;
  checkboxList?: ICheckboxProps[];
  isOpened?: boolean,
  onChange?: (chekboxes: IAccordionCheckboxInfo) => void;
  onInit?: (chekboxes: IAccordionCheckboxInfo) => void;
}

const createCheckboxesInfo = (checkboxList: ICheckboxProps[]): IAccordionCheckboxInfo => {
  const initialState = {} as IAccordionCheckboxInfo;

  checkboxList.forEach(({ name, checked }) => {
    if (name) {
      initialState[name] = checked !== undefined && checked;
    } else {
      throw new Error('checkbox must be named');
    }
  });

  return initialState;
};

const Accordion: FC<IAccordionProps> = (props) => {
  const {
    title = 'Expandable checkbox list',
    checkboxList = [],
    isOpened: initOpened = false,
    onChange,
    onInit,
  } = props;

  const [isOpened, setOpened] = useState(initOpened);

  const [checkboxesInfo, setCheckboxesInfo] = useState(() => {
    const initialState = createCheckboxesInfo(checkboxList);
    return initialState;
  });

  useEffect(() => {
    onInit && onInit(checkboxesInfo);
  }, []);

  const handleChange = (name: string, isChecked: boolean): void => {
    const newCheckboxState = {
      [name]: isChecked,
    };
    setCheckboxesInfo((prevState) => ({
      ...prevState,
      ...newCheckboxState,
    }));
    onChange && onChange({ ...checkboxesInfo, ...newCheckboxState });
  };

  const checkboxes = checkboxList.map((checkbox) => {
    const {
      label,
      checked,
      description,
      name,
    } = checkbox;
    return (
      <li key={`${label}_${name}`} className={b('item')}>
        <Checkbox
          label={label}
          description={description}
          name={name}
          checked={checked}
          onChange={(isChecked) => (name ? handleChange(name, isChecked) : null)}
        />
      </li>
    );
  });

  const toggleAccordion = (): void => setOpened(!isOpened);

  return (
    <div className={b({ opened: isOpened })}>
      <div className={b('header')}>
        <h3 className={b('label')}>
          <button type="button" className={b('label-button')} onClick={toggleAccordion}>
            {title}
          </button>
        </h3>
        <button
          className={b('button')}
          type="button"
          onClick={toggleAccordion}
        >
          <span className={b('arrow')}>expand_more</span>
        </button>
      </div>
      <ul className={b('list')}>{checkboxes}</ul>
    </div>
  );
};

export default Accordion;
