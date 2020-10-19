import React, { FC } from 'react';

import '@styles/index.scss';
import Button from '@/components/Button/Button';
import MainLayout from '@/layouts/MainLayout';
import SocialButtons from '@/components/social-buttons/SocialButtons';

const Main: FC = () => (
  <MainLayout>
    <h1 className="m">Hello, World!</h1>
    <Button />
    <Button theme="white" />
    <Button theme="textual" href="/auth" />
    <Button withArrow size="fluid" />
    <Button href="/auth" />
    <SocialButtons items={[{ text: 'twitter', link: 'https://twitter.com' }, { text: 'facebook-square', link: 'https://facebook.com' }, { text: 'instagram', link: 'https://instagram.com' }]} />
  </MainLayout>
);

export default Main;
