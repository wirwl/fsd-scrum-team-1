import type { FC, SyntheticEvent } from 'react';

import { block } from 'bem-cn';

import './RadioButton.scss';

const b = block('radio-button');

type IChoice = {
  value: string;
  label: string;
};

type IRadioButtonProps = {
  name: string;
  choices: IChoice[];
  onChange: (value: string) => void;
};

const RadioButton: FC<IRadioButtonProps> = ({ name, choices, onChange }) => {
  const buttons = choices.map(({ value, label }) => (
    <label
      key={`${label}_${value}`}
      className={b('choice')}
    >
      <input
        className={b('input')}
        type="radio"
        name={name}
        value={value}
      />

      <div className={b('custom-radio')}>
        <div className={b('custom-radio-inner')} />
      </div>

      <span>{label}</span>
    </label>
  ));

  const handleRadioButtonChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    onChange(target.value);
  };

  return (
    <div onChange={handleRadioButtonChange} className={b()}>
      { buttons }
    </div>
  );
};

export default RadioButton;
