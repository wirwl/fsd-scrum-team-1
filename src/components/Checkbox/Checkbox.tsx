/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { block } from 'bem-cn';
import SVGInline from 'react-svg-inline';

import CheckMark from './images/check-mark.svg';
import './Checkbox.scss';

interface ICheckboxProps {
  label?: string;
  description?: string;
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean, name: string) => void;
}

const b = block('checkbox');

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const {
    label = '',
    description = '',
    name = '',
    checked: initChecked = false,
    onChange,
  } = props;

  const [checked, setChecked] = useState(initChecked);

  const handleChange = (): void => {
    setChecked(!checked);
    onChange && onChange(!checked, name);
  };

  return (
    <div className={b({ rich: Boolean(description) })}>
      <label className={b('wrapper')}>
        <input
          type="checkbox"
          className={b('input')}
          checked={checked}
          name={name}
          onChange={handleChange}
        />
        <span className={b('new-input')}>
          <SVGInline className={b('check-mark').toString()} svg={CheckMark} />
        </span>
        <span className={b('label')}>{label}</span>
      </label>
      {description ? <p className={b('description')}>{description}</p> : null}
    </div>
  );
};

export default Checkbox;

export type {
  ICheckboxProps,
};
