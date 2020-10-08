import './logo.scss';
import { block } from 'bem-cn';

const b = block('logo');

const Logo: React.FC = () => {
  return (
    <a className={b()} href="/">
      <img
        className={b('image')}
        src="/images/logo.svg"
        alt="Toxin"
        title="Toxin"
      />
    </a>
  );
};

export default Logo;

