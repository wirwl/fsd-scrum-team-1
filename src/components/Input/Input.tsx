import InputMask from 'react-input-mask';
import { block } from 'bem-cn';
import { useState } from 'react';

import './Input.scss';

type CustomValidateFunction = (currentValue: string | number) => boolean;

interface IInputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  value?: string | number;
  placeholder?: string;
  withArrow?: boolean;
  mask?: string;
  name: string;
  label?: string;
  validate?: 'email' | CustomValidateFunction;
  errorMessage?: string;
  onChange: (value: string, isValidValue: boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// eslint-disable-next-line no-useless-escape
const regexpEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validateAsEmail = (value: string): boolean => (value.length > 0 && regexpEmail.test(value));

const b = block('input');

const Input: React.FC<IInputProps> = (props) => {
  const {
    type = 'text',
    value: initValue = '',
    mask = '',
    placeholder = '',
    errorMessage = '',
    withArrow = false,
    validate,
    name,
    label,
    onChange,
    onBlur = () => {},
    onFocus = () => {},
  } = props;

  const [value, setValue] = useState<string>(initValue.toString());

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: currentValue } = ev.currentTarget;
    let isValidValue = false;

    if (typeof validate === 'function') isValidValue = validate(currentValue);
    if (validate === 'email') isValidValue = validateAsEmail(currentValue);

    setValue(currentValue);
    onChange(currentValue, isValidValue);
  };

  const bemMods: { [index: string]: string | boolean | undefined } = {
    'validate-with-error': Boolean(errorMessage),
    'with-arrow': withArrow,
  };

  const expandButton = withArrow
    ? <button type="button" className={b('arrow')}>arrow_forward</button>
    : null;

  const labelItem = label ? <h3 className={b('label')}>{label}</h3> : null;

  return (
    <div className={b(bemMods)}>
      {labelItem}
      <div className={b('wrapper')}>
        <InputMask
          className={b('input')}
          placeholder={placeholder}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={handleChange}
          onFocus={onFocus}
          mask={mask}
          maskChar=""
          name={name}
        />
        { expandButton }
      </div>
      { errorMessage && <p className={b('row-with-error')}>{errorMessage}</p> }
    </div>
  );
};

export default Input;
