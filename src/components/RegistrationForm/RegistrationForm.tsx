import React, { FC, FormEvent, useState } from 'react';
import Link from 'next/link';
import { block } from 'bem-cn';

import Input from 'src/components/Input/Input';
import ToggleButton from 'src/components/ToggleButton/ToggleButton';
import RadioButton from 'src/components/RadioButton/RadioButton';
import Button from 'src/components/Button/Button';

import './RegistrationForm.scss';

interface IRegistrationFormProps {
  onSubmit: (data: IUserInfo) => void;
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

const b = block('form-registration');

const choices = [
  { value: 'man', label: 'Мужчина', checked: true },
  { value: 'woman', label: 'Женщина' },
];

const emptyErrorMessage = 'Это поле обязательно. Заполните его пожалуйста';

const validateEmpty = (value: string | number): string => {
  const val = value.toString();
  if (val.length === 0) {
    return emptyErrorMessage;
  }
  return '';
};

const validateBirthday = (value: string | number): string => {
  const date = value.toString();
  const errorEmpty = validateEmpty(date);
  let errorMessage = errorEmpty;

  if (date.length < 10 && date.length > 0) {
    errorMessage = 'Введите полную дату. Например, 12.11.2020';
  }

  if (date.length === 10) {
    const dateArr = date.split('.') as [string, string, string];
    const day = +(dateArr)[0];
    const month = +(dateArr)[1];

    const isValidDate = (day > 0 && day <= 31) && (month > 0 && month <= 12);
    errorMessage = !isValidDate ? 'Введите существующую дату.' : '';
  }

  return errorMessage;
};

const validatePassword = (value: string | number): string => {
  const password = value.toString();
  const errorEmpty = validateEmpty(password);

  if (errorEmpty) return errorEmpty;

  if (password.length > 20) {
    return 'Пароль слишком длинный(более 20 символов)';
  }
  if (password.length < 6 && password.length > 0) {
    return 'Пароль слишком короткий(менее 6 символов)';
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

const RegistrationForm: FC<IRegistrationFormProps> = ({ onSubmit }) => {
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
            [name]: emptyErrorMessage,
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

  return (
    <form className={b()} onSubmit={handleSubmit}>
      <h1 className={b('title')}>Регистрация аккаунта</h1>
      <div className={b('name')}>
        <Input
          name="name"
          placeholder="Имя"
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
          placeholder="Фамилия"
          validate={validateEmpty}
          onChange={handleChange}
          onBlur={handleBlur}
          value={surnameValue}
          errorMessage={surnameError}
        />
      </div>
      <div className={b('radio-buttons')}>
        <RadioButton name="gender" choices={choices} onChange={handleChangeRadioButton} />
      </div>
      <div className={b('birthday')}>
        <Input
          name="birthday"
          validate={validateBirthday}
          mask="99.99.9999"
          label="Дата рождения"
          placeholder="ДД.ММ.ГГГГ"
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
          label="Данные для входа в сервис"
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
          placeholder="Пароль"
          validate={validatePassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={passwordError}
          value={passwordValue}
        />
      </div>
      <div className={b('toggle-button')}>
        <ToggleButton
          label="Получать спецпредложения"
          name="specialOffers"
          checked={isGetSpecialOffers}
          onChange={handleChangeToggleButton}
        />
      </div>
      <div className={b('submit-button')}>
        <Button type="submit" withArrow size="fluid" caption="Зарегистрироваться" />
      </div>
      <div className={b('footer')}>
        <p className={b('have-account')}>Уже есть аккаунт на Toxin</p>
        <Link href="/auth/sign-in">
          <div role="link" className={b('login-button')}>
            <Button size="fluid" theme="white" caption="Войти" />
          </div>
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
export type { IUserInfo };
