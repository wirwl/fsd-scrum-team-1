import './social-buttons.scss';
import block from 'bem-cn';

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
      {items.map((item, index) => (
        <li className={b('item')} key={index}>
          <a className={b('button')} href={item.link} target="_blank" rel="noopener noreferrer">{item.text}</a>
        </li>
      ))}
    </ul>
  );
};

export default SocialButtons;
