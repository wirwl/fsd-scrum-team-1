import type { FC, SyntheticEvent } from 'react';

import { block } from 'bem-cn';

import './RadioButton.scss';

const b = block('radio-button');

type IChoice = {
  value: string;
  label: string;
  checked?: boolean;
};

type IRadioButtonProps = {
  name: string;
  choices: IChoice[];
  onChange: (value: string) => void;
};

const isCheckedChoicesInvalid = (
  choices: IChoice[],
): boolean => choices.filter(
  ({ checked }) => checked !== undefined && checked,
).length > 1;

/**
 * RadioButton component
 * @param {String} name input name
 * @param {Array} choices array of choice {
 *    value: string;
 *    label: string;
 *    checked?: boolean;
 * }
 * @param {Function} onChange callback (value: string) => void
 */
const RadioButton: FC<IRadioButtonProps> = ({
  name,
  choices,
  onChange,
}) => {
  if (isCheckedChoicesInvalid(choices)) {
    throw new Error('RadioButton error. Invalid choices: checked choice should only one');
  }

  const buttons = choices.map(({ value, label, checked }) => (
    <label
      key={`${label}_${value}`}
      className={b('choice')}
    >
      <input
        className={b('input')}
        type="radio"
        name={name}
        value={value}
        defaultChecked={checked}
      />

      <div className={b('custom-radio')}>
        <div className={b('custom-radio-inner')} />
      </div>

      <span className={b('label')}>{label}</span>
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
