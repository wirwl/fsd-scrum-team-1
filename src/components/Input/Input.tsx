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
  name?: string;
  head?: string;
  validate?: 'email' | CustomValidateFunction;
  isForceValidate?: boolean;
  emailValidationErrorMessage?: string;
  onChange?: (value: string, isValidValue: boolean) => void;
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
    emailValidationErrorMessage = 'Некорректный адрес почты.',
    isForceValidate = false,
    withArrow,
    validate,
    name,
    head,
    onChange,
  } = props;

  const [value, setValue] = useState(initValue);
  const [isFirstFocus, setFirstFocus] = useState(false);
  const [isFirstInput, setFirstInput] = useState(false);

  let errorValidate: string | null = null;

  const isFirstUse = isFirstFocus && isFirstInput;

  if (isFirstUse || isForceValidate) {
    errorValidate = typeof validate === 'function' ? validate(value) : null;
    if (
      validate === 'email' && !validateAsEmail(value.toString())
    ) errorValidate = emailValidationErrorMessage;
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    !isFirstInput && setFirstInput(true);
    const { value: currentValue } = ev.currentTarget;
    setValue(currentValue);
    onChange && onChange(currentValue, Boolean(errorValidate));
  };

  const bemMods: { [index: string]: string | boolean | undefined } = {
    'validate-with-error': Boolean(validate && errorValidate),
    'with-arrow': Boolean(withArrow),
  };

  const expandButton = withArrow
    ? <button type="button" className={b('arrow')}>arrow_forward</button>
    : null;

  const headItem = head ? <h3 className={b('head')}>{head}</h3> : null;

  return (
    <div className={b(bemMods)}>
      {headItem}
      <div className={b('wrapper')}>
        <InputMask
          onFocus={() => setFirstFocus(true)}
          className={b('input')}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={handleChange}
          mask={mask}
          maskChar=""
          name={name}
        />
        { expandButton }
      </div>
      <p className={b('row-with-error')}>{errorValidate}</p>
    </div>
  );
};

export default Input;
