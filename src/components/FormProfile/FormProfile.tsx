import {
  FC, FormEvent, useEffect, useState,
} from 'react';

import block from 'bem-cn';

import Button from '../Button/Button';
import Input from '../Input/Input';
import ToggleButton from '../ToggleButton/ToggleButton';

import './FormProfile.scss';

const b = block('form-profile');

interface IFormProfileProps {
  info: IInfoProps;
  onSubmit: (data: IUserInfo) => void;
}

type IInputNames = 'name' | 'lastname' | 'birthday' | 'email';

type IInfoProps = {
  name: string,
  lastname: string,
  birthday: number,
  email: string,
  isGetSpecialOffers: boolean,
};

type IUserInfo = {
  name: string,
  lastname: string,
  birthday: number,
  email: string,
  getSpecialOffers: boolean;
};

type IErrorsState = Record<IInputNames, string>;

type IRegistrationFormState = {
  name: {
    value: string,
    isValid: true,
  },
  lastname: {
    value: string,
    isValid: true,
  },
  birthday: {
    value: string,
    isValid: true,
  },
  email: {
    value: string,
    isValid: true,
  },
  getSpecialOffers: boolean;
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

const convertDate = (date: number): string => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const dateString = (new Date(date)).toLocaleDateString('ru-RU', options);

  return `${dateString}`;
};

const convertUTC = (date: string): number => {
  const string = date.replace(/[\s.]/g, '');
  const d = Number(string.slice(0, 2));
  const m = Number(string.slice(2, 4)) - 1;
  const y = Number(string.slice(-4));

  return Date.UTC(y, m, d);
};

const FormProfile: FC<IFormProfileProps> = ({
  info: {
    name, lastname, birthday, email, isGetSpecialOffers,
  }, onSubmit,
}) => {
  const [values, setValues] = useState<(IRegistrationFormState)>({
    name: {
      value: name,
      isValid: true,
    },
    lastname: {
      value: lastname,
      isValid: true,
    },
    birthday: {
      value: convertDate(birthday),
      isValid: true,
    },
    email: {
      value: email,
      isValid: true,
    },
    getSpecialOffers: isGetSpecialOffers,
  });

  const [isChanged, setIsChanged] = useState<boolean>(false);

  const [errors, setErrors] = useState<IErrorsState>({
    name: '',
    lastname: '',
    birthday: '',
    email: '',
  });

  const {
    name: { value: nameValue },
    lastname: { value: lastnameValue },
    birthday: { value: birthdayValue },
    email: { value: emailValue },
    getSpecialOffers: isGetSpecialOffersValue,
  } = values;

  const {
    name: nameError,
    lastname: lastnameError,
    birthday: birthdayError,
    email: emailError,
  } = errors;

  const [fieldsChanged, setFieldsChanged] = useState({
    name: '',
    lastname: '',
    birthday: '',
    email: '',
    isGetSpecialOffers: false,
  });

  const changeColorField = (inputInfo: { title: string, isFieldChanged: boolean}): void => {
    if (inputInfo.isFieldChanged) {
      setFieldsChanged((prevState) => ({
        ...prevState,
        [inputInfo.title]: `${b('field_isChanged')}`,
      }));
    } else {
      setFieldsChanged((prevState) => ({
        ...prevState,
        [inputInfo.title]: '',
      }));
    }
  };

  const isInputChanged = (
    inputName: string, newValue: string | boolean,
  ): {title: string, isFieldChanged: boolean} => {
    const initialValues = {
      name, lastname, birthday: convertDate(birthday), email, isGetSpecialOffers,
    };
    const fieldInfo = {
      title: '',
      isFieldChanged: false,
    };

    Object.entries(initialValues).forEach(([title, val]) => {
      if (title === inputName) {
        fieldInfo.title = title;

        if (val !== newValue) {
          fieldInfo.isFieldChanged = true;
        }
      }
    });

    return fieldInfo;
  };

  const deepEqual = (): boolean => {
    const initValues = {
      name, lastname, birthday: convertDate(birthday), email, isGetSpecialOffers,
    };

    const newValues = {
      name: values.name.value,
      lastname: values.lastname.value,
      birthday: values.birthday.value,
      email: values.email.value,
      isGetSpecialOffers: values.getSpecialOffers,
    };

    return JSON.stringify(initValues) !== JSON.stringify(newValues);
  };

  useEffect(() => {
    if (deepEqual()) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [values]);

  const setEmptyErrors = (): void => {
    Object.entries(values).forEach(([title, val]) => {
      if (typeof val === 'object') {
        const { value, isValid } = val;
        if (value.length === 0 && !isValid) {
          setErrors((prevState) => ({
            ...prevState,
            [title]: emptyErrorMessage,
          }));
        }
      }
    });
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const formValues = {
      name: nameValue,
      lastname: lastnameValue,
      birthday: convertUTC(birthdayValue),
      email: emailValue,
      getSpecialOffers: isGetSpecialOffersValue,
    };

    isFormValid(values) ? onSubmit(formValues) : setEmptyErrors();
  };

  const handleInputChange = (
    value: string,
    targetName: string,
    error: string | null,
  ): void => {
    const inputName = targetName as IInputNames;
    const isValid = !error;

    const changedField = isInputChanged(inputName, value);
    changeColorField(changedField);

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
    const changedField = isInputChanged('isGetSpecialOffers', checked);
    changeColorField(changedField);

    setValues((prevState) => ({
      ...prevState,
      getSpecialOffers: checked,
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
      <div className={b(`field ${fieldsChanged.name}`)}>
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
      <div className={b(`field ${fieldsChanged.lastname}`)}>
        <Input
          name="lastname"
          placeholder="Фамилия"
          validate={validateEmpty}
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={lastnameValue}
          errorMessage={lastnameError}
        />
      </div>
      <div className={b(`field ${fieldsChanged.birthday}`)}>
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
      <div className={b(`field ${fieldsChanged.email}`)}>
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
      <div className={b(`field ${fieldsChanged.isGetSpecialOffers}`)}>
        <ToggleButton
          label="Получать спецпредложения"
          name="specialOffers"
          checked={isGetSpecialOffersValue}
          onChange={handleChangeToggleButton}
        />
      </div>
      {isChanged && (
        <div className={b('submit-button')}>
          <Button
            type="submit"
            theme="white"
            caption="Применить"
          />
        </div>
      )}
    </form>
  );
};

export default FormProfile;
