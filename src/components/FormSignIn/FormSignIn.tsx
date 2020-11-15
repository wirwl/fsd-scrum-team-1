import {
  FC,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { signIn } from 'src/redux/user/userActions';
import Input, { CustomValidateFunction } from 'src/components/Input/Input';
import Button from 'src/components/Button/Button';
import Spinner from 'src/components/Spinner/Spinner';

import './FormSignIn.scss';
import { IRootState } from '@/redux/reducer';
import { IUserState } from '@/redux/user/userReducer';

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
  Object.keys(values)
    .every(
      (key) => values[key].isTouched && values[key].error === null,
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

const userSelector = (store: IRootState): IUserState => store.user;

const FormSignIn: FC = () => {
  const dispatch = useDispatch();
  const userStore = useSelector(userSelector);
  const { isRequesting } = userStore;

  const [values, setValues] = useState<IInputValuesState>(
    initValues,
  );

  const [serverError, setServerError] = useState<string | null>(null);

  const { password, email } = values;

  useEffect(() => {
    setServerError(userStore.error);
  }, [userStore.error]);

  useEffect(() => {
    if (userStore.user !== null) {
      Router.push('/rooms');
    }
  }, [userStore.user]);

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
      setServerError(null);
      dispatch(signIn({
        email: email.value,
        password: password.value,
      }));
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
          errorMessage={email.error}
        />
      </div>

      <div className={b('input')}>
        <Input
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Пароль"
          validate={passwordValidate}
          errorMessage={password.error}
        />
      </div>

      <div className={b('server-error')}>
        { serverError }
      </div>

      {
        isRequesting
          ? (
            <div className={b('spinner')}>
              <div className={b('spinner-container')}>
                <Spinner />
              </div>
            </div>
          ) : ''
      }

      <div className={b('submit-button')}>
        <Button
          type="submit"
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
          <span
            className={b('register-link')}
            role="link"
            tabIndex={0}
          >
            <Button
              href="/auth/register"
              type="button"
              theme="white"
              caption="создать"
            />
          </span>
        </Link>
      </div>
    </form>
  );
};

export default FormSignIn;
