import { useEffect } from 'react';
import { AppInitialProps, AppContext } from 'next/app';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';

import wrapper from 'src/redux/store';
import Api from 'src/services/Api';
import {
  signInFirebaseSuccess,
  signOutSuccess,
} from 'src/redux/user/userActions';

import 'normalize.css/normalize.css';
import '@styles/root.scss';

const MyApp: NextPage<AppInitialProps> = (
  { Component, pageProps }: AppProps,
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const api = new Api();

    const unsubscribe = api.auth.onAuthStateChanged((user): void => {
      if (user !== null) {
        dispatch(signInFirebaseSuccess(user));
        return;
      }

      dispatch(signOutSuccess());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <Component {...pageProps} />; // eslint-disable-line
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log(ctx.store);
  if (!process.browser) {
    console.log('>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<');
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

// export const getServerSideProps: GetServerSideProps = () => {
//   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//   return {
//     props: {},
//   };
// };

export default wrapper.withRedux(MyApp);
