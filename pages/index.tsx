import Button from '@components/Button/Button';
import SocialButtons from '@components/social-buttons/social-buttons';
import '@styles/index.scss';
import React from 'react';

const Home: React.FC = () => (
  <React.StrictMode>
    <h1 className="m">Hello, World!</h1>
    <Button text="click me" theme="success" />
    <SocialButtons items={[{ text: 'twitter', link: 'https://twitter.com' }, { text: 'facebook-square', link: 'https://facebook.com' }, { text: 'instagram', link: 'https://instagram.com' }]} />
  </React.StrictMode>
);

export default Home;
