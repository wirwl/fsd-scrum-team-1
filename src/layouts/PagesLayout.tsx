import { FC } from 'react';

import MainLayout from './MainLayout';

interface IPagesLayoutProps {
  title: string;
}

const PagesLayout: FC<IPagesLayoutProps> = ({ title, children }) => (
  <MainLayout title={title}>{children}</MainLayout>
);

export default PagesLayout;
