import { FC, StrictMode } from 'react';
import Head from 'next/head';

type IMainLayoutProps = {
  [key in 'title' | 'description' | 'keywords']?: string;
} & {
  [key in 'header' | 'children' | 'footer']?: React.ReactNode;
};

const MainLayout: FC<IMainLayoutProps> = ({
  title = 'Main Page',
  description = 'Tutorial project for learning React, Redux, NextJs',
  keywords = 'toxin,components,hotel,react,redux',
  header,
  children,
  footer,
}) => (
  <>
    <Head>
      <title>{`${title} | Toxin`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta charSet="utf-8" />
    </Head>
    <StrictMode>
      {header && <header>{header}</header>}
      {children && <main>{children}</main>}
      {footer && <footer>{footer}</footer>}
    </StrictMode>
  </>
);

export default MainLayout;
