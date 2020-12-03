import {
  FC, FormEvent, useEffect, useState,
} from 'react';
import { isEqual } from 'lodash';
import block from 'bem-cn';
import type { WithTranslation, TFunction } from 'next-i18next';

import i18n from 'src/services/i18n';
import type { IUser } from 'src/services/dto/User';
import Button from '../Button/Button';
import Input from '../Input/Input';
import ToggleButton from '../ToggleButton/ToggleButton';

import './FormProfile.scss';

const b = block('form-profile');

interface IFormProfileProps extends WithTranslation {
  user: IUser;
  onSubmit: (data: IUserInfo) => void;
}

type IInputNames = 'name' | 'lastname' | 'birthday' | 'email';

type IUserInfo = Partial<Omit<IUser, 'uid' | 'sex'>>;

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

const initUser = ({
  name,
  lastname,
  birthday,
  email,
  getSpecialOffers,
}: IUser): IRegistrationFormState => ({
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
  getSpecialOffers,
});

const FormProfile: FC<IFormProfileProps> = ({
  user,
  onSubmit,
  t,
}) => {
  const {
    name, lastname, birthday, email, getSpecialOffers,
  } = user;
  const [values, setValues] = useState<IRegistrationFormState>(() => initUser(user));

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
    getSpecialOffers: getSpecialOffersValue,
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
    getSpecialOffers: '',
  });

  useEffect(() => {
    setValues(initUser(user));
    setFieldsChanged({
      name: '',
      lastname: '',
      birthday: '',
      email: '',
      getSpecialOffers: '',
    });
  }, [user]);

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
      name, lastname, birthday: convertDate(birthday), email, getSpecialOffers,
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
      name, lastname, birthday: convertDate(birthday), email, getSpecialOffers,
    };

    const newValues = {
      name: values.name.value,
      lastname: values.lastname.value,
      birthday: values.birthday.value,
      email: values.email.value,
      getSpecialOffers: values.getSpecialOffers,
    };

    return isEqual(initValues, newValues);
  };

  useEffect(() => {
    if (deepEqual()) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
  }, [values]);

  const setEmptyErrors = (): void => {
    Object.entries(values).forEach(([title, val]) => {
      if (typeof val === 'object') {
        const { value, isValid } = val;
        if (value.length === 0 && !isValid) {
          setErrors((prevState) => ({
            ...prevState,
            [title]: t('forms:errors.required'),
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
      getSpecialOffers: getSpecialOffersValue,
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
    const changedField = isInputChanged('getSpecialOffers', checked);
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
          placeholder={t('name')}
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
          placeholder={t('lastname')}
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
          placeholder={t('dateMaskPlaceholder')}
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
      <div className={b(`field ${fieldsChanged.getSpecialOffers}`)}>
        <ToggleButton
          label={t('getSpecial')}
          name="specialOffers"
          checked={getSpecialOffersValue}
          onChange={handleChangeToggleButton}
        />
      </div>
      {isChanged && (
        <div className={b('submit-button')}>
          <Button
            type="submit"
            theme="white"
            caption={t('apply')}
          />
        </div>
      )}
    </form>
  );
};

export default i18n.withTranslation(['common', 'forms'])(
  FormProfile,
);

export type {
  IUserInfo,
};
