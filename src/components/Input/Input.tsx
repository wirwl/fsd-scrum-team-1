import InputMask from 'react-input-mask';
import { block } from 'bem-cn';
import { useState } from 'react';
import { TFunction, WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import './Input.scss';

type CustomValidateFunction = (currentValue: string | number, t: TFunction) => string | null;

interface IInputProps extends WithTranslation {
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

const validateValue = (
  value: string,
  t: TFunction,
  validate?: 'email' | CustomValidateFunction,
): string | null => {
  if (typeof validate === 'function') return validate(value, t);
  if (validate === 'email' && !validateAsEmail(value)) return t('forms:errors.emailInvalid');
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
    t,
  } = props;

  const [value, setValue] = useState<string>(initValue.toString());

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: currentValue } = ev.currentTarget;

    setValue(currentValue);
    onChange(currentValue, name, validateValue(currentValue, t, validate));
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
          onBlur={(ev) => onBlur(name, validateValue(ev.target.value, t, validate))}
          onChange={handleChange}
          onFocus={(ev) => onFocus(name, validateValue(ev.target.value, t, validate))}
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

export default i18n.withTranslation(['common', 'forms'])(
  Input,
);

export type {
  CustomValidateFunction,
};
