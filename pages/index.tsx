import { FC } from 'react';

import Button from '@components/Button/Button';
import MainLayout from '../src/layouts/MainLayout';

const Main: FC = () => (
  <MainLayout>
    <h1 className="m">Hello, World!</h1>
    <Button />
    <Button theme="white" handleClick={() => alert('hi')} />
    <Button theme="textual" href="/auth" />
    <Button href="/auth" />
  </MainLayout>
);

export default Main;
