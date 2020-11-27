import {
  FC, FormEvent, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import block from 'bem-cn';

import Button from '../Button/Button';
import Input from '../Input/Input';
import ToggleButton from '../ToggleButton/ToggleButton';

import './FormProfile.scss';

const b = block('form-profile');

type IInputNames = 'name' | 'surname' | 'birthday' | 'email';

type IInputInfo = {
  value: string;
  isValid: boolean;
};

type IErrorsState = Record<IInputNames, string>;

type IRegistrationFormState = Record<IInputNames, IInputInfo> & {
  isGetSpecialOffers: boolean;
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
  isGetSpecialOffers: false,
};

const emptyErrorMessage = 'Это поле обязательно. Заполните его пожалуйста';

const validateEmpty = (value: string | number): string => {
  const val = value.toString();

  return val.length === 0 ? emptyErrorMessage : '';
};

const validateBirthday = (value: string | number): string => {
  const date = value.toString();
  const errorEmpty = validateEmpty(date);
  let errorMessage = errorEmpty;

  if (date.length < 10 && date.length > 0) {
    errorMessage = 'Введите полную дату. Например, 12.11.2020';
  }

  if (date.length === 10) {
    const [day, month, year] = date.split('.').map((el) => parseInt(el, 10));
    const tmpDate = new Date(year, month - 1, day);

    const isValidDate = tmpDate.getDate() === day
      && tmpDate.getMonth() + 1 === month && tmpDate.getFullYear() === year;

    errorMessage = !isValidDate ? 'Введите существующую дату.' : '';
  }

  return errorMessage;
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

const FormProfile: FC = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<IRegistrationFormState>(initialState);
  const [errors, setErrors] = useState<IErrorsState>({
    name: '',
    surname: '',
    birthday: '',
    email: '',
  });

  const {
    name: { value: nameValue },
    surname: { value: surnameValue },
    birthday: { value: birthdayValue },
    email: { value: emailValue },
    isGetSpecialOffers,
  } = values;

  const {
    name: nameError,
    surname: surnameError,
    birthday: birthdayError,
    email: emailError,
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

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (isFormValid(values)) {
      // dispatch(ЭКШЕН({
      //   name: nameValue,
      //   surname: surnameValue,
      //   birthday: birthdayValue,
      //   email: emailValue,
      // }));
    } else {
      setEmptyErrors();
    }
  };

  const handleInputChange = (
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

  const handleChangeToggleButton = (checked: boolean): void => {
    setValues((prevState) => ({
      ...prevState,
      isGetSpecialOffers: checked,
    }));
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
      <div className={b('name')}>
        <Input
          name="name"
          placeholder="Имя"
          validate={validateEmpty}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={surnameValue}
          errorMessage={surnameError}
        />
      </div>
      <div className={b('birthday')}>
        <Input
          name="birthday"
          validate={validateBirthday}
          placeholder="ДД.ММ.ГГГГ"
          mask="99.99.9999"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={birthdayValue}
          errorMessage={birthdayError}
        />
      </div>
      <div className={b('email')}>
        <Input
          type="email"
          validate="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={emailValue}
          errorMessage={emailError}
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
        <Button
          type="submit"
          theme="white"
          caption="Применить"
        />
      </div>
    </form>
  );
};

export default FormProfile;
