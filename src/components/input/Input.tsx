import InputMask from 'react-input-mask';
import { block } from 'bem-cn';
import { useState } from 'react';

import './input.scss';

type CustomValidateFunction = (currentValue: string | number) => boolean;

interface IInputProps {
  type?: 'text' | 'number';
  value?: string | number;
  placeholder?: string;
  icon?: 'arrow' | 'expand';
  readonly?: boolean;
  selected?: boolean;
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
    selected,
    readonly,
    icon,
    validate,
    name,
    head,
  } = props;

  const [value, setValue] = useState(initValue);

  let isCorrectValue = typeof validate === 'function' ? validate(value) : true;
  if (validate === 'email') isCorrectValue = validateAsEmail(value.toString());
  if (value.toString().length === 0) isCorrectValue = true;

  const bemMods: { [index: string]: string | boolean | undefined } = {
    'validate-with-error': Boolean(validate && !isCorrectValue),
    'with-icon': Boolean(icon),
    selected,
  };

  let iconItem = null;
  if (icon === 'arrow') iconItem = <button type="submit" className={b('icon', { arrow: true })}>arrow_forward</button>;
  if (icon === 'expand') iconItem = <button type="button" className={b('icon', { expand: true })}>expand_more</button>;

  const headItem = head ? <h3 className={b('head')}>{head}</h3> : null;

  let errorMessage = '';
  if (validate === 'email') errorMessage = 'Некорректный адрес почты.';
  else if (validate) errorMessage = validationErrorMessage;

  return (
    <div className={b(bemMods)}>
      {headItem}
      <div className={b('wrapper')}>
        <InputMask
          className={b('input')}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(ev) => setValue(ev.currentTarget.value)}
          mask={mask}
          maskChar=""
          name={name}
          readOnly={readonly}
        />
        { iconItem }
      </div>
      <p className={b('row-with-error')}>{errorMessage}</p>
    </div>
  );
};

export default Input;
