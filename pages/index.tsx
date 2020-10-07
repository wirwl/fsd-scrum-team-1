import Button from '@components/Button/Button';
import '@styles/index.scss';
import React from 'react';

import { Provider } from 'react-redux';
// TODO: Create alias like '@redux/store' if possible
import store from '../src/redux/store';

const Home: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <h1 className="m">Hello, World!</h1>
      <Button text="click me" theme="success" />
    </Provider>
  </React.StrictMode>
);

export default Home;
