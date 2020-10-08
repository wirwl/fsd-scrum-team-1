import { block } from 'bem-cn';

import './button.scss';

type IButtonProps = Partial<{
  theme: 'default' | 'white' | 'textual';
  size: 'fluid';
  caption: string,
  type: 'button' | 'submit',
  href: string,
  withArrow: boolean,
}>;

const Button: React.FC<IButtonProps> = ({
  theme = 'default',
  size,
  caption = 'click me',
  type = 'button',
  href,
  withArrow,
}) => {
  const modifiers = {
    theme,
    size,
    'with-arrow': withArrow,
  };

  const b = block('button');

  const buttonInner = (
    <span className={b('inner-wrapper')}>
      <span className={b('caption')}>{caption}</span>
      {withArrow && <span className={`${b('arrow')} material-icons`}>arrow_forward</span>}
    </span>
  );

  return (
    !href
      ? <button type={type === 'button' ? 'button' : 'submit'} className={b(modifiers)}>{buttonInner}</button>
      : <a href={href} className={b(modifiers)}>{buttonInner}</a>
  );
};

export default Button;
