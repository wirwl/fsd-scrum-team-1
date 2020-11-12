import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';

import wrapper from 'src/redux/store';
import Api from 'src/services/Api';
import {
  signInFirebaseSuccess,
  signInSuccess,
  signOutSuccess,
} from 'src/redux/user/userActions';

import 'normalize.css/normalize.css';
import '@styles/root.scss';

const App: NextPage<AppProps> = (
  { Component, pageProps }: AppProps,
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const api = new Api();

    api.auth.onAuthStateChanged((user): void => {
      console.log('_app user state changed');
      if (user !== null && user.email !== null) {
        console.log('user signed in');
        console.log(user.email);
        const { email } = user;
        dispatch(signInFirebaseSuccess(email));
        return;
      }

      dispatch(signOutSuccess());
    });
  }, []);

  return <Component {...pageProps} />; // eslint-disable-line
};

export default wrapper.withRedux(App);
