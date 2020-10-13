import type { AppProps } from 'next/app';
import { FC } from 'react';

import 'normalize.css/normalize.css';

import '@styles/root.scss';

// eslint-disable-next-line
const App: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
