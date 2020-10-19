import type { FC } from 'react';
import { useState } from 'react';
import { block } from 'bem-cn';

import './ToggleButton.scss';

const b = block('toggle-button');

type IToggleButtonProps = {
  id: string;
  label: string;
  initialValue?: boolean;
  onChange: (newValue: boolean) => void;
};

const ToggleButton: FC<IToggleButtonProps> = ({
  initialValue,
  onChange,
  id,
  label,
}) => {
  const [checked, setChecked] = useState<boolean>(initialValue || false);

  const handleCheckboxToggle = (): void => {
    const newValue = !checked;
    setChecked(newValue);
    onChange(newValue);
  };

  return (
    <label htmlFor={id} className={b()}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxToggle}
        className={b('input')}
      />

      <div className={b('toggle')}>
        <div className={b('toggle-inner')} />
      </div>

      <span className={b('label')}>{label}</span>
    </label>
  );
};

export default ToggleButton;
