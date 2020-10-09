import React, { FC } from 'react';

import Button from '@components/button/Button';
import SocialButtons from '@components/social-buttons/SocialButtons';
import MainLayout from '../src/layouts/MainLayout';

const Main: FC = () => (
  <MainLayout>
    <h1 className="m">Hello, World!</h1>
    <Button />
    <Button theme="white" />
    <Button theme="textual" href="/auth" />
    <Button href="/auth" />
    <SocialButtons items={[{ text: 'twitter', link: 'https://twitter.com' }, { text: 'facebook-square', link: 'https://facebook.com' }, { text: 'instagram', link: 'https://instagram.com' }]} />
  </MainLayout>
);

export default Main;
