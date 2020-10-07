import Button from '@components/Button/Button';
import '@styles/index.scss';
import React from 'react';

const Home: React.FC = () => (
  <React.StrictMode>
    <h1 className="m">Hello, World!</h1>
    <Button text="click me" theme="success" />
  </React.StrictMode>
);

export default Home;
