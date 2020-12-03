import React, { FC, FormEvent, useState } from 'react';
import Link from 'next/link';
import { block } from 'bem-cn';
import type { TFunction, WithTranslation } from 'next-i18next';

import type { IChoice } from 'src/components/RadioButton/RadioButton';
import i18n from 'src/services/i18n';
import Input from 'src/components/Input/Input';
import ToggleButton from 'src/components/ToggleButton/ToggleButton';
import RadioButton from 'src/components/RadioButton/RadioButton';
import Button from 'src/components/Button/Button';

import './RegistrationForm.scss';

interface IRegistrationFormProps extends WithTranslation {
  onSubmit: (data: IUserInfo) => void;
  registrationError?: string;
}

type IInputNames = 'name' | 'surname' | 'birthday' | 'email' | 'password';

type IUserInfo = Record<IInputNames, string> & {
  gender: string;
  isGetSpecialOffers: boolean;
};

type IInputInfo = {
  value: string;
  isValid: boolean;
};

type IRegistrationFormState = Record<IInputNames, IInputInfo> & {
  isGetSpecialOffers: boolean;
  gender: string;
};

type IErrorsState = Record<IInputNames, string>;

const MIN_PASS_LENGTH = 6;
const MAX_PASS_LENGTH = 20;

const b = block('form-registration');

const getChoices = (t: TFunction): IChoice[] => ([
  { value: 'man', label: t('man'), checked: true },
  { value: 'woman', label: t('woman') },
]);

const validateEmpty = (value: string | number, t: TFunction): string => {
  const val = value.toString();

  return val.length === 0 ? t('forms:errors.required') : '';
};

const validateBirthday = (value: string | number, t: TFunction): string => {
  const date = value.toString();
  const errorEmpty = validateEmpty(date, t);
  let errorMessage = errorEmpty;

  if (date.length < 10 && date.length > 0) {
    errorMessage = t('forms:errors.enterFullDate');
  }

  if (date.length === 10) {
    const [day, month, year] = date.split('.').map((el) => parseInt(el, 10));
    const tmpDate = new Date(year, month - 1, day);

    const isValidDate = tmpDate.getDate() === day
      && tmpDate.getMonth() + 1 === month && tmpDate.getFullYear() === year;

    errorMessage = !isValidDate ? t('forms:errors.enterExistDate') : '';
  }

  return errorMessage;
};

const validatePassword = (value: string | number, t: TFunction): string => {
  const password = value.toString();
  const errorEmpty = validateEmpty(password, t);

  if (errorEmpty) return errorEmpty;

  if (password.length > 20) {
    return t('forms:errors.passwordIsLong', { max: MAX_PASS_LENGTH });
  }
  if (password.length < 6 && password.length > 0) {
    return t('forms:errors.passwordIsShort', { min: MIN_PASS_LENGTH });
  }

  return '';
};

const initialState: IRegistrationFormState = {
  name: {
    value: '',
    isValid: false,
  },
  surname: {
    value: '',
    isValid: false,
  },
  birthday: {
    value: '',
    isValid: false,
  },
  email: {
    value: '',
    isValid: false,
  },
  password: {
    value: '',
    isValid: false,
  },
  isGetSpecialOffers: false,
  gender: 'man',
};

const isFormValid = (values: IRegistrationFormState): boolean => (
  Object.values(values).every((val) => {
    if (typeof val === 'object') {
      const { isValid: isValidInput } = val;
      return isValidInput;
    }
    return true;
  })
);

const RegistrationForm: FC<IRegistrationFormProps> = ({ onSubmit, t, registrationError }) => {
  const [values, setValues] = useState<IRegistrationFormState>(initialState);
  const [errors, setErrors] = useState<IErrorsState>({
    name: '',
    surname: '',
    birthday: '',
    email: '',
    password: '',
  });

  const {
    name: { value: nameValue },
    surname: { value: surnameValue },
    birthday: { value: birthdayValue },
    email: { value: emailValue },
    password: { value: passwordValue },
    isGetSpecialOffers,
    gender,
  } = values;

  const {
    name: nameError,
    surname: surnameError,
    birthday: birthdayError,
    email: emailError,
    password: passwordError,
  } = errors;

  const setEmptyErrors = (): void => {
    Object.entries(values).forEach(([name, val]) => {
      if (typeof val === 'object') {
        const { value, isValid } = val;
        if (value.length === 0 && !isValid) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: t('forms:errors.required'),
          }));
        }
      }
    });
  };

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    const formValues = {
      name: nameValue,
      surname: surnameValue,
      birthday: birthdayValue,
      email: emailValue,
      password: passwordValue,
      gender,
      isGetSpecialOffers,
    };

    isFormValid(values) ? onSubmit(formValues) : setEmptyErrors();
  };

  const handleChangeRadioButton = (value: string): void => {
    setValues((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  const handleChangeToggleButton = (checked: boolean): void => {
    setValues((prevState) => ({
      ...prevState,
      isGetSpecialOffers: checked,
    }));
  };

  const handleChange = (
    value: string,
    targetName: string,
    error: string | null,
  ): void => {
    const inputName = targetName as IInputNames;
    const isValid = !error;

    setValues((prevState) => ({
      ...prevState,
      [inputName]: {
        value,
        isValid,
      },
    }));

    if (isValid) {
      setErrors((prevState) => ({
        ...prevState,
        [inputName]: '',
      }));
    }
  };

  const handleBlur = (targetName: string, error: string | null): void => {
    const inputName = targetName as IInputNames;
    setErrors((prevState) => ({
      ...prevState,
      [inputName]: error,
    }));
  };

  const choices = getChoices(t);

  return (
    <form className={b()} onSubmit={handleSubmit}>
      <h1 className={b('title')}>
        {t('forms:register.title')}
      </h1>
      <div className={b('name')}>
        <Input
          name="name"
          placeholder={t('name')}
          validate={validateEmpty}
          onChange={handleChange}
          onBlur={handleBlur}
          value={nameValue}
          errorMessage={nameError}
        />
      </div>
      <div className={b('surname')}>
        <Input
          name="surname"
          placeholder={t('lastname')}
          validate={validateEmpty}
          onChange={handleChange}
          onBlur={handleBlur}
          value={surnameValue}
          errorMessage={surnameError}
        />
      </div>
      <div className={b('radio-buttons')}>
        <RadioButton
          name="gender"
          choices={choices}
          onChange={handleChangeRadioButton}
        />
      </div>
      <div className={b('birthday')}>
        <Input
          name="birthday"
          validate={validateBirthday}
          mask="99.99.9999"
          label={t('birthday')}
          placeholder={t('dateMaskPlaceholder')}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={birthdayError}
          value={birthdayValue}
        />
      </div>
      <div className={b('email')}>
        <Input
          type="email"
          validate="email"
          name="email"
          label={t('forms:register.loginInformation')}
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={emailError}
          value={emailValue}
        />
      </div>
      <div className={b('password')}>
        <Input
          type="password"
          name="password"
          placeholder={t('password')}
          validate={validatePassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={passwordError}
          value={passwordValue}
        />
      </div>
      <div className={b('toggle-button')}>
        <ToggleButton
          label={t('getSpecial')}
          name="specialOffers"
          checked={isGetSpecialOffers}
          onChange={handleChangeToggleButton}
        />
      </div>
      <div className={b('submit-button')}>
        <Button
          type="submit"
          withArrow
          size="fluid"
          caption={t('register')}
        />
      </div>
      { registrationError && <p className={b('registration-error')}>{registrationError}</p> }
      <div className={b('footer')}>
        <p className={b('have-account')}>
          {t('forms:register.alreadyHaveAccountQuestion')}
        </p>
        <Link href="/auth/sign-in">
          <div role="link" className={b('login-button')}>
            <Button size="fluid" theme="white" caption={t('enter')} />
          </div>
        </Link>
      </div>
    </form>
  );
};

export default i18n.withTranslation(['common', 'forms'])(
  RegistrationForm,
);

export type { IUserInfo };
