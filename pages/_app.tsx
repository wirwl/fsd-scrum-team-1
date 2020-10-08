import type { AppProps } from 'next/app';
import { FC } from 'react';

import 'normalize.css/normalize.css';
import '@styles/root.scss';
import 'material-design-icons/iconfont/material-icons.css';

const App: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
