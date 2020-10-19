import type { FC } from 'react';
import { useState } from 'react';
import { block } from 'bem-cn';

import './ToggleButton.scss';

const b = block('toggle-button');

type IToggleButtonProps = {
  label: string;
  checked?: boolean;
  onChange?: (newValue: boolean) => void;
  name: string;
};

const ToggleButton: FC<IToggleButtonProps> = ({
  checked,
  onChange,
  label,
  name,
}) => {
  const [isChecked, setChecked] = useState<boolean>(checked || false);

  const handleCheckboxToggle = (): void => {
    const newValue = !isChecked;
    setChecked(newValue);
    onChange && onChange(newValue);
  };

  return (
    <label className={b()}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxToggle}
        className={b('input')}
        name={name}
      />

      <div className={b('toggle')}>
        <div className={b('toggle-inner')} />
      </div>

      <span className={b('label')}>{label}</span>
    </label>
  );
};

export default ToggleButton;
