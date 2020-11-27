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
import type { TFunction, WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
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

const MIN_PASS_LENGTH = 6;
const MAX_PASS_LENGTH = 20;

const passwordValidate: CustomValidateFunction = (pass, t: TFunction) => {
  const password = pass as string;
  if (password.length < MIN_PASS_LENGTH) {
    return t('forms:errors.passwordIsShort', { min: MIN_PASS_LENGTH });
  }

  if (password.length > MAX_PASS_LENGTH) {
    return t('forms:errors.passwordIsLong', { max: MAX_PASS_LENGTH });
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

const FormSignIn: FC<WithTranslation> = ({ t }) => {
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
      Router.push('/');
    }
  }, [userStore.user]);

  const setUntouchedErrors = (): void => {
    Object.keys(values).forEach((key) => {
      if (!values[key].isTouched) {
        setValues((prevValue) => ({
          ...prevValue,
          [key]: {
            ...values[key],
            error: t('forms:errors.required'),
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
      <h1 className={b('title')}>{ t('enter') }</h1>

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
          placeholder={t('password')}
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
          caption={t('enter')}
          size="fluid"
          withArrow
        />
      </div>

      <div className={b('register-link-block')}>
        <span className={b('register-link-label')}>
          {t('forms:enter.noAccountQuestion')}
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
              caption={t('create')}
            />
          </span>
        </Link>
      </div>
    </form>
  );
};

export default i18n.withTranslation(['common', 'forms'])(
  FormSignIn,
);
