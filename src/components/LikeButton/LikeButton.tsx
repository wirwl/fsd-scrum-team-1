import './LikeButton.scss';
import block from 'bem-cn';
import { useState } from 'react';

const b = block('like-button');

interface ILikeButton {
  isChecked: boolean;
  count: number;
}

const LikeButton: React.FC<ILikeButton> = (props) => {
  const {
    isChecked = false,
    count = 0,
  } = props;
  const [state, setState] = useState<ILikeButton>({ isChecked, count });

  const onLikeButtonClick = (): void => {
    setState((prev) => {
      const newValue = prev?.isChecked ? prev.count - 1 : prev.count + 1;
      return {
        isChecked: !prev.isChecked,
        count: newValue,
      };
    });
  };

  return (
    <label className={b()}>
      <input className={b('input')} type="checkbox" />
      <div className={b('border')} onClick={onLikeButtonClick} aria-hidden="true">
        <div className={b('count')}>{state.count}</div>
      </div>
    </label>
  );
};

export default LikeButton;
