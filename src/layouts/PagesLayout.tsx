import React from 'react';

import MainLayout from './MainLayout';

interface IPagesLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const PagesLayout: React.FC<IPagesLayoutProps> = ({ title, children }) => (
  <MainLayout title={title}>{children}</MainLayout>

  // Также нужно тут будет добавить хэдер и футер, когда они будут готовы
);

export default PagesLayout;
