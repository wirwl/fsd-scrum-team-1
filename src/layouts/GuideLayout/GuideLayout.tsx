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
