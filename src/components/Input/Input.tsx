import InputMask from 'react-input-mask';
import { block } from 'bem-cn';
import { useState } from 'react';

import './input.scss';

type CustomValidateFunction = (currentValue: string | number) => boolean;

interface IInputProps {
  type?: 'text' | 'number';
  value?: string | number;
  placeholder?: string;
  withArrow?: boolean;
  mask?: string;
  name?: string;
  head?: string;
  validate?: 'email' | CustomValidateFunction;
  validationErrorMessage?: string;
}

// eslint-disable-next-line no-useless-escape
const regexpEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validateAsEmail = (value: string): boolean => regexpEmail.test(value);

const b = block('input');

const Input: React.FC<IInputProps> = (props) => {
  const {
    type = 'text',
    value: initValue = '',
    mask = '',
    placeholder = '',
    validationErrorMessage = 'Некорректное значение!',
    withArrow = false,
    validate,
    name,
    head,
  } = props;

  const [state, setState] = useState({
    value: initValue,
    isCorrectValue: true,
  });

  const bemMods: { [index: string]: string | boolean } = {
    'validate-with-error': Boolean(validate && !state.isCorrectValue),
    'with-arrow': withArrow,
  };

  const arrowItem = withArrow
    ? <button type="submit" className={b('arrow')}>arrow_forward</button>
    : null;

  const headItem = head ? <h3 className={b('head')}>{head}</h3> : null;

  let errorMessage = '';
  if (validate === 'email') errorMessage = 'Некорректный адрес почты.';
  else if (validate) errorMessage = validationErrorMessage;

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = ev.currentTarget;

    let isCorrectValue = typeof validate === 'function' ? validate(value) : true;
    if (validate === 'email') isCorrectValue = validateAsEmail(value);
    if (value.length === 0) isCorrectValue = true;

    setState({ isCorrectValue, value });
  };

  return (
    <div className={b(bemMods)}>
      {headItem}
      <div className={b('wrapper')}>
        <InputMask
          className={b('input')}
          placeholder={placeholder}
          type={type}
          value={state.value}
          onChange={handleInputChange}
          mask={mask}
          maskChar=""
          name={name}
        />
        { arrowItem }
      </div>
      <p className={b('row-with-error')}>{errorMessage}</p>
    </div>
  );
};

export default Input;
