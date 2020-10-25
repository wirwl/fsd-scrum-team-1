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
      <div className={b('star')}>
        {i <= selectedCount ? 'star' : 'star_border'}
      </div>,
    );
  }

  return (
    <div className={b()}>
      {stars}
    </div>
  );
};

export default RateButton;
