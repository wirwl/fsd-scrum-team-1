import React, { useState, useEffect, FC } from 'react';
import { block } from 'bem-cn';
import Checkbox from '@/components/Checkbox/Checkbox';

import './Accordion.scss';

const b = block('accordion');

const createCheckboxesInfo = (checkboxList: ICheckboxProps[]): IAccordionCheckboxInfo => {
  const initialState = {} as IAccordionCheckboxInfo;

  checkboxList.forEach(({ name, checked }) => {
    if (name) {
      initialState[name] = !!checked;
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
          onChange={(isChecked) => {
            if (name) {
              const newCheckboxState = {
                [name]: isChecked,
              };
              setCheckboxesInfo((prevState) => ({
                ...prevState,
                ...newCheckboxState,
              }));
              onChange && onChange({ ...checkboxesInfo, ...newCheckboxState });
            }
          }}
        />
      </li>
    );
  });

  return (
    <div className={b({ opened: isOpened })}>
      <div className={b('header')}>
        <p className={b('label')}>{title}</p>
        <button
          className={b('button')}
          type="button"
          onClick={() => setOpened(!isOpened)}
        >
          <span className={b('arrow')}>expand_more</span>
        </button>
      </div>
      <ul className={b('list')}>{checkboxes}</ul>
    </div>
  );
};

export default Accordion;
