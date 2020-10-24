/* eslint-disable */
import './LikeButton.scss';
import block from 'bem-cn';
import { FC, useState } from 'react';

const b = block('like-button');

interface ILikeButton {
  isChecked?: boolean;
  count?: number;
  onChange?: (values: ILikeButton) => void;
}

const LikeButton: FC<ILikeButton> = (props) => {
  const {
    isChecked = false,
    count = 0,
    onChange
  } = props;

  const [state, setState] = useState<ILikeButton>({ isChecked, count });

  const handleLikeButtonClick = (): void => {
    setState((prev) => {
      const {
        isChecked: isCheckedPrev = false,
        count: countPrev = 0
      } = prev;

      const newValue = isCheckedPrev ? countPrev - 1 : countPrev + 1;
      const result = {
        isChecked: !isCheckedPrev,
        count: newValue,
      };

      onChange && onChange(result);

      return result;
    });
  };

  return (
    <button className={b({ checked: state.isChecked })} onClick={handleLikeButtonClick} >
      <div className={b('count')}>{state.count}</div>
    </button >
  );
};

export default LikeButton;
