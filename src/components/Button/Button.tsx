import './button.scss';

import { connect } from 'react-redux';
import bookRoom from '../../redux/actions/booking';
import { IOrder } from '../../redux/types/booking';
import { RootState } from '../../redux/reducers';

interface IButton {
  text?: string;
  theme?: 'success';
}

const Button: React.FC<IButton> = (props) => {
  const { text = '', theme } = props;

  const classes = ['button'];

  if (theme) classes.push(`button_theme_${theme}`);

  const getRandomInt = (min: number, max: number): number => {
    const range = Math.floor(max) - Math.ceil(min) + 1;
    return Math.floor(Math.random() * range + Math.ceil(min));
  };

  const handleClick = ():void => {
    const order: IOrder = {
      id: getRandomInt(1, 10000000),
      price: getRandomInt(1, 5999),
    };
    props.bookRoom(order);
  };

  return (
    <button type="button" className={classes.join(' ')} onClick={handleClick}>{ text }</button>
  );
};

const mapStateToProps = (state: RootState): RootState => ({ booking: state.booking });

export default connect(
  mapStateToProps,
  { bookRoom },
)(Button);
