import { FC, FormEvent, useState } from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';

import Input, { CustomValidateFunction } from 'src/components/Input/Input';
import Button from 'src/components/Button/Button';

import './FormSignIn.scss';

type IFormSignInProps = {
  onSubmit: (email: string, password: string) => void;
};

const b = block('form-sign-in');

type IValueState = {
  value: string;
  isTouched: boolean;
  error: string | null;
};

type IInputValuesState = Record<string, IValueState>;

const passwordValidate: CustomValidateFunction = (pass) => {
  const password = pass as string;
  if (password.length < 6) {
    return 'Пароль слишком короткий (меньше 6 символов)';
  }

  if (password.length > 20) {
    return 'Пароль слишком длинный (больше 20 символов)';
  }

  return null;
};

const isFormValid = (values: IInputValuesState): boolean => (
  Object.keys(values).reduce(
    (acc: boolean, key: string) => (
      acc && values[key].error === null && values[key].isTouched
    ),
    true,
  )
);

const initValues = {
  email: {
    value: '',
    isTouched: false,
    error: null,
  },
  password: {
    value: '',
    isTouched: false,
    error: null,
  },
};

const normalizeErrorMessage = (
  error: string | null,
): string | undefined => (
  error === null ? undefined : error
);

const FormSignIn: FC<IFormSignInProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<IInputValuesState>(
    initValues,
  );

  const { password, email } = values;

  const setUntouchedErrors = (): void => {
    Object.keys(values).forEach((key) => {
      if (!values[key].isTouched) {
        setValues((prevValue) => ({
          ...prevValue,
          [key]: {
            ...values[key],
            error: 'Это поле обязательно для заполнения',
          },
        }));
      }
    });
  };

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setUntouchedErrors();
    if (isFormValid(values)) {
      onSubmit(email.value, password.value);
    }
  };

  const handleInputChange = (
    value: string,
    name: string,
    error: string | null,
  ): void => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        value,
        isTouched: true,
        error,
      },
    }));
  };

  return (
    <form className={b()} onSubmit={handleFormSubmit}>
      <h1 className={b('title')}>Войти</h1>

      <div className={b('input')}>
        <Input
          type="email"
          name="email"
          onChange={handleInputChange}
          placeholder="Email"
          validate="email"
          errorMessage={normalizeErrorMessage(email.error)}
        />
      </div>

      <div className={b('input')}>
        <Input
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Пароль"
          validate={passwordValidate}
          errorMessage={normalizeErrorMessage(password.error)}
        />
      </div>

      <div className={b('submit-button')}>
        <Button
          type="submit"
          theme="default"
          caption="Войти"
          size="fluid"
          withArrow
        />
      </div>

      <div className={b('register-link-block')}>
        <span className={b('register-link-label')}>
          Нет аккаунта на Toxin?
        </span>
        <Link href="/auth/register">
          <div
            className={b('register-link')}
            role="link"
            tabIndex={0}
          >
            <Button
              type="button"
              theme="white"
              caption="создать"
            />
          </div>
        </Link>
      </div>
    </form>
  );
};

export default FormSignIn;
