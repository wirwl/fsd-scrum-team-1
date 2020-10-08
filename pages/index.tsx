import { FC } from 'react';

import Button from '@components/Button/Button';
import MainLayout from '../src/layouts/MainLayout';

const Main: FC = () => (
  <MainLayout>
    <h1 className="m">Hello, World!</h1>
    <Button />
    <Button theme="white" />
    <Button theme="textual" type="link" href="/auth" />
    <Button type="link" href="/auth" />
  </MainLayout>
);

export default Main;
