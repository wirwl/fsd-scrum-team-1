import InputMask from 'react-input-mask';
import { block } from 'bem-cn';
import { useState } from 'react';

import './Input.scss';

type CustomValidateFunction = (currentValue: string | number) => string | null;

interface IInputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  value?: string | number;
  placeholder?: string;
  withArrow?: boolean;
  mask?: string;
  name: string;
  label?: string;
  validate?: 'email' | CustomValidateFunction;
  errorMessage?: string | null;
  onChange: (value: string, name: string, errorValidate: string | null) => void;
  onBlur?: (name: string, errorValidate: string | null) => void;
  onFocus?: (name: string, errorValidate: string | null) => void;
}

// eslint-disable-next-line no-useless-escape
const regexpEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validateAsEmail = (value: string): boolean => (value.length > 0 && regexpEmail.test(value));

const b = block('input');

const validateValue = (value: string, validate?: 'email' | CustomValidateFunction): string | null => {
  if (typeof validate === 'function') return validate(value);
  if (validate === 'email' && !validateAsEmail(value)) return 'Некорректный email';
  return null;
};

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

    setValue(currentValue);
    onChange(currentValue, name, validateValue(currentValue, validate));
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
          onBlur={(ev) => onBlur(name, validateValue(ev.target.value, validate))}
          onChange={handleChange}
          onFocus={(ev) => onFocus(name, validateValue(ev.target.value, validate))}
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
