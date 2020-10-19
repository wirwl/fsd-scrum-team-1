import { block } from 'bem-cn';
import Link from 'next/link';

import './logo.scss';

const b = block('logo');

interface ILogo {
  href?: string;
  alt?: string;
  title?: string;
}

const Logo: React.FC<ILogo> = (props) => {
  const { href = '/', alt = 'Toxin', title = 'Toxin' } = props;

  return (
    <Link href={href}>
      <a href={href} className={b()}>
        <img
          className={b('image')}
          src="/images/logo.svg"
          alt={alt}
          title={title}
        />
      </a>
    </Link>
  );
};

export default Logo;
