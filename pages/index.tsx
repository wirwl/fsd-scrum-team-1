import React, { FC } from 'react';
import { Provider } from 'react-redux';

import Button from '@components/Button/Button';
import SocialButtons from '@components/social-buttons/SocialButtons';
import MainLayout from '../src/layouts/MainLayout';

// TODO: Create alias like '@redux/store' if possible
import store from '../src/redux/store';

const Main: FC = () => (
  <Provider store={store}>
    <MainLayout>
      <h1 className="m">Hello, World!</h1>
      <Button />
      <Button theme="white" />
      <Button theme="textual" href="/auth" />
      <Button withArrow size="fluid" />
      <Button href="/auth" />
      <SocialButtons items={[{ text: 'twitter', link: 'https://twitter.com' }, { text: 'facebook-square', link: 'https://facebook.com' }, { text: 'instagram', link: 'https://instagram.com' }]} />
    </MainLayout>
  </Provider>
);

export default Main;
