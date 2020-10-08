import { FC } from 'react';
import { Provider } from 'react-redux';

import Button from '@components/Button/Button';
import MainLayout from '../src/layouts/MainLayout';

// TODO: Create alias like '@redux/store' if possible
import store from '../src/redux/store';

const Main: FC = () => (
  <Provider store={store}>
    <MainLayout>
      <h1 className="m">Hello, World!</h1>
      <Button text="click me" theme="success" />
    </MainLayout>
  </Provider>
);

export default Main;
