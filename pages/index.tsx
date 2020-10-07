import React from 'react';

import '@styles/index.scss';
import Button from '@components/Button/Button';
import MainLayout from '../src/layouts/MainLayout';

const Main: React.FC = () => (
  <MainLayout>
    <h1 className="m">Hello, World!</h1>
    <Button text="click me" theme="success" />
  </MainLayout>
);

export default Main;
