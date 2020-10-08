import type { AppProps } from 'next/app';
import { FC } from 'react';

import 'normalize.css/normalize.css';
import '@styles/root.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App;