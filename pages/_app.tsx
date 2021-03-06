import { useEffect } from 'react';
import type { AppProps, AppContext } from 'next/app';
import { useDispatch } from 'react-redux';
import cookies from 'next-cookies';
import i18n from 'src/services/i18n';

import wrapper from 'src/redux/store';
import Api from 'src/services/Api';
import {
  signInFirebaseSuccess,
  signInSuccess,
} from 'src/redux/user/userActions';

import 'normalize.css/normalize.css';
import '@styles/root.scss';

const HOST = `http://${process.env.HOST}`;

const MyApp = (
  { Component, pageProps }: AppProps,
): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const api = new Api();

    const unsubscribe = api.auth.onAuthStateChanged((user): void => {
      if (user !== null) {
        dispatch(signInFirebaseSuccess(user));
      }
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
          `${HOST}/api/utils/check-user`,
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

export default wrapper.withRedux(
  i18n.appWithTranslation(MyApp),
);
