import type { AppProps } from 'next/app';

import 'normalize.css/normalize.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App;