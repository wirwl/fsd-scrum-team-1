import type { AppProps } from 'next/app';
import { FC } from 'react';

import 'normalize.css/normalize.css';

import '@styles/root.scss';
import { Provider } from 'react-redux';

import store from '../src/redux/store';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default App;
