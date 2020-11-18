import { FC, StrictMode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { block } from 'bem-cn';

import './GuideLayout.scss';

const b = block('guide-layout');

type IGuideLayoutProps = {
  title: string;
};

const GuideLayout: FC<IGuideLayoutProps> = ({ children, title }) => (
  <>
    <Head>
      <title>{`${title} | Toxin`}</title>
      <meta charSet="utf-8" />
      <link rel="apple-touch-icon" sizes="76x76" href="../favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png" />
      <link rel="manifest" href="../favicons/site.webmanifest" />
      <link rel="mask-icon" href="../favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="../favicons/favicon.ico" type="image/x-icon" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

    </Head>
    <StrictMode>
      <div className={b()}>

        <nav className={b('nav')}>
          <Link href="/guide">
            <a className={b('nav-link')} href="/guide">
              Colors and Types
            </a>
          </Link>

          <Link href="/guide/elements">
            <a className={b('nav-link')} href="/guide/elements">Elements</a>
          </Link>

          <Link href="/guide/components">
            <a className={b('nav-link')} href="/guide/components">Compoents</a>
          </Link>
        </nav>

        <main className={b('main')}>
          {children}
        </main>

      </div>
    </StrictMode>
  </>
);

export default GuideLayout;
