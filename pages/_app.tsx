import { useEffect } from 'react';
import type { AppProps, AppContext } from 'next/app';
import { useDispatch } from 'react-redux';
import cookies from 'next-cookies';

import wrapper from 'src/redux/store';
import Api from 'src/services/Api';
import {
  signInFirebaseSuccess,
  signInSuccess,
  signOut,
} from 'src/redux/user/userActions';

import 'normalize.css/normalize.css';
import '@styles/root.scss';

const dev = process.env.NODE_ENV === 'development';

// TODO: get prod host from env
const host = dev ? 'http://localhost:3000' : 'https://toxin.com/';

const MyApp = (
  { Component, pageProps }: AppProps,
): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const api = new Api();

    const unsubscribe = api.auth.onAuthStateChanged((user): void => {
      if (user !== null) {
        dispatch(signInFirebaseSuccess(user));
        return;
      }

      dispatch(signOut());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <Component {...pageProps} />; // eslint-disable-line
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  if (!process.browser) {
    const { store } = ctx;
    const { firebaseToken } = cookies(ctx);

    if (firebaseToken !== undefined) {
      const headers = {
        'Context-Type': 'application/json',
        Authorization: JSON.stringify({ token: firebaseToken }),
      };

      try {
        const { user } = await fetch(
          `${host}/api/utils/check-user`,
          { headers },
        ).then((res) => res.json());

        if (user !== null) {
          store.dispatch(signInSuccess(user));
        }
      } catch (error) {
        console.error('_app.getInitialProps error:', error.message);
      }
    }
  }

  const appProps = (
    Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
  );

  return {
    pageProps: {
      ...appProps,
    },
  };
};

export default wrapper.withRedux(MyApp);
