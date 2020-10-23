/* eslint-disable */
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

  const handleLikeButtonClick = (): void => {
    setState((prev) => {
      const { isChecked: isCheckedPrev, count: countPrev } = prev;

      const newValue = isCheckedPrev ? countPrev - 1 : countPrev + 1;
      return {
        isChecked: !isCheckedPrev,
        count: newValue,
      };
    });
  };

  return (
    <button className={b({ checked: state.isChecked })} onClick={handleLikeButtonClick} >
      <div className={b('count')}>{state.count}</div>
    </button >
  );
};

export default LikeButton;
