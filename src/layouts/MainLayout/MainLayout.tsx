import { FC, StrictMode } from 'react';
import Head from 'next/head';
import { block } from 'bem-cn';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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
      <link rel="apple-touch-icon" sizes="76x76" href="favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
      <link rel="manifest" href="favicons/site.webmanifest" />
      <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="favicons/favicon.ico" type="image/x-icon" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <StrictMode>
      <body className={b()}>
        <Header />

        <main className={b('main')}>
          {children}
        </main>

        <div className={b('footer')}>
          <Footer />
        </div>
      </body>
    </StrictMode>
  </>
);

export default MainLayout;
