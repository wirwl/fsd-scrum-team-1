import block from 'bem-cn';

import './SocialButtons.scss';

const b = block('social-buttons');

interface ISocialButton {
  text: string,
  link: string
}

interface ISocialButtons {
  items: ISocialButton[]
}

const SocialButtons: React.FC<ISocialButtons> = (props) => {
  const { items } = props;

  return (
    <ul className={b()}>
      {items.map((item) => (
        <li className={b('item')} key={item.text}>
          <a className={b('button')} href={item.link} target="_blank" rel="noopener noreferrer">{item.text}</a>
        </li>
      ))}
    </ul>
  );
};

export default SocialButtons;
