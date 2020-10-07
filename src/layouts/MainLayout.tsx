import React from 'react';
import Head from 'next/head';

type IMainLayoutProps = {
  [key in 'title' | 'description' | 'keywords']?: string;
} & {
  [key in 'header' | 'children' | 'footer']?: React.ReactNode;
};

const MainLayout: React.FC<IMainLayoutProps> = ({
  title = 'Main Page',
  description = 'Tutorial project for learning React, Redux, NextJs',
  keywords = 'toxin,components,hotel,react,redux',
  header,
  children,
  footer,
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta charSet="utf-8" />
    </Head>
    <React.StrictMode>
      {header && <header>{header}</header>}
      {children && <main>{children}</main>}
      {footer && <footer>{footer}</footer>}
    </React.StrictMode>
  </>
);

export default MainLayout;
