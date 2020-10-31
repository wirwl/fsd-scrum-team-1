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

type IInputValuesState = {
  email: string;
  isEmailValid: boolean;
  password: string;
  isPasswordValid: boolean;
};

const isFormValid = (
  { isEmailValid, isPasswordValid }: IInputValuesState,
): boolean => isEmailValid && isPasswordValid;

const FormSignIn: FC<IFormSignInProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<IInputValuesState>({
    email: '',
    isEmailValid: false,
    password: '',
    isPasswordValid: false,
  });

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();

    isFormValid(values) && onSubmit(values.email, values.password);
  };

  const passwordValidate: CustomValidateFunction = (password) => {
    if (password.toString().length < 6) {
      return 'Пароль слишком короткий (меньше 6 символов)';
    }

    if (password.toString().length > 20) {
      return 'Пароль слишком длинный (больше 20 символов)';
    }

    return null;
  };

  const handleEmailInputChange = (
    email: string,
    isInvalid: boolean,
  ): void => {
    setValues((prevValues) => ({
      ...prevValues,
      email,
      isEmailValid: !isInvalid,
    }));
  };

  const handlePasswordInputChange = (
    password: string,
    isInvalid: boolean,
  ): void => {
    setValues((prevValues) => ({
      ...prevValues,
      password,
      isPasswordValid: !isInvalid,
    }));
  };

  return (
    <form className={b()} onSubmit={handleFormSubmit}>
      <h1 className={b('title')}>Войти</h1>

      <div className={b('input')}>
        <Input
          type="email"
          onChange={handleEmailInputChange}
          placeholder="Email"
          validate="email"
          emailValidationErrorMessage="Не правильный email"
        />
      </div>

      <div className={b('input')}>
        <Input
          type="password"
          onChange={handlePasswordInputChange}
          placeholder="Пароль"
          validate={passwordValidate}
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
