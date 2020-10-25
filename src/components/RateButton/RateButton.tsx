/* eslint-disable jsx-a11y/label-has-associated-control */
import './RateButton.scss';
import block from 'bem-cn';

const b = block('rate-button');

interface IRateButton {
  id: string,
  totalCount?: number,
  selectedCount: number
}

const RateButtons: React.FC<IRateButton> = (props) => {
  const {
    id,
    totalCount = 5,
    selectedCount,
  } = props;

  const content = [];
  const total = totalCount + 1;
  for (let n = 1; n < total; n += 1) {
    content.push(<input key={`input ${id}${n}`} className={b('input')} id={id + (total - n)} type="radio" name={id} defaultChecked={selectedCount === total - n} />);
    content.push(<label key={`label ${id}${n}`} className={b('label')} htmlFor={id + (total - n)} />);
  }

  return (
    <div className={b()}>
      {content}
    </div>
  );
};

export default RateButtons;
