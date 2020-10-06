import './button.scss';

interface IButton {
  text?: string;
  theme?: 'success';
}

const Button: React.FC<IButton> = (props) => {
  const { text = '', theme } = props;

  const classes = ['button'];

  if (theme) classes.push(`button_theme_${theme}`);

  return (
    <button type="button" className={classes.join(' ')}>{ text }</button>
  );
};

export default Button;
