import './RateButton.scss';
import block from 'bem-cn';

const b = block('rate-button');

interface IRateButton {
  maxRate?: number,
  rate: number
}

const RateButton: React.FC<IRateButton> = (props) => {
  const {
    maxRate: totalCount = 5,
    rate: selectedCount,
  } = props;

  const stars = [];
  for (let i = 1; i <= totalCount; i += 1) {
    stars.push(
      <li className={b('star')} key={i}>
        {i <= selectedCount ? 'star' : 'star_border'}
      </li>,
    );
  }

  return (
    <ul className={b()}>
      {stars}
    </ul>
  );
};

export default RateButton;
