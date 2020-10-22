import React, { useState, useReducer, FC } from 'react';
import { block } from 'bem-cn';
import Checkbox from '@/components/Checkbox/Checkbox';

import './Accordion.scss';

const b = block('accordion');

const Accordion: FC<IAccordionProps> = (props) => {
  const {
    title = 'Expandable checkbox list',
    checkboxList = [],
    isOpened: initOpened = false,
    onChange,
  } = props;

  const [isOpened, setOpened] = useState(initOpened);
  const [checkboxesState, setCheckboxesList] = useState<IAccordionCheckboxInfo>({});

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
      <ul className={b('list')}>
        {checkboxList.map((checkbox) => {
          const { label, checked, description, name } = checkbox;
          return (
            <li key={`${label}_${name}`} className={b('item')}>
              <Checkbox
                label={label}
                description={description}
                name={name}
                checked={checked}
                onChange={(isChecked) => {
                  console.log(`${name} with checked state: ${isChecked}`);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Accordion;
