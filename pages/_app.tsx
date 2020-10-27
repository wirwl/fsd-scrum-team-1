import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import wrapper from 'src/redux/store';

import 'normalize.css/normalize.css';
import '@styles/root.scss';

const App: NextPage<AppProps> = (
  { Component, pageProps }: AppProps,
) => <Component {...pageProps} />; // eslint-disable-line

export default wrapper.withRedux(App);
