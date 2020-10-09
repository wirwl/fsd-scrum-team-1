import { block } from 'bem-cn';

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
    <a className={b()} href = {href}>
      <img
        className = {b('image')}
        src = "/images/logo.svg"
        alt = {alt}
        title = {title}
      />
    </a>
  );
};

export default Logo;

