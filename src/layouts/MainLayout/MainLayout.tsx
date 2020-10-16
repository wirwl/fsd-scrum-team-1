import { FC, StrictMode } from 'react';
import Head from 'next/head';
import { block } from 'bem-cn';

import Header from '@components/Header/Header';

import './MainLayout.scss';

type IMainLayoutProps = {
  [key in 'title' | 'description' | 'keywords']?: string;
};

const b = block('main-layout');

const MainLayout: FC<IMainLayoutProps> = ({
  title = 'Main Page',
  description = 'Tutorial project for learning React, Redux, NextJs',
  keywords = 'toxin,components,hotel,react,redux',
  children,
}) => (
  <>
    <Head>
      <title>{`${title} | Toxin`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta charSet="utf-8" />
    </Head>
    <StrictMode>
      <body className={b()}>
        <Header />

        {children && <main>{children}</main>}

        <footer className={b('footer')}>
          TODO: insert footer here!
        </footer>
      </body>
    </StrictMode>
  </>
);

export default MainLayout;
