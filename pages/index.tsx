import React, { FC } from 'react';

import Button from '@components/Button/Button';
import SocialButtons from '@components/social-buttons/social-buttons';
import MainLayout from '../src/layouts/MainLayout';

const Main: FC = () => (
  <MainLayout>
    <h1 className="m">Hello, World!</h1>
    <Button text="click me" theme="success" />
    <SocialButtons items={[{ text: 'twitter', link: 'https://twitter.com' }, { text: 'facebook-square', link: 'https://facebook.com' }, { text: 'instagram', link: 'https://instagram.com' }]} />
  </MainLayout>
);

export default Main;
