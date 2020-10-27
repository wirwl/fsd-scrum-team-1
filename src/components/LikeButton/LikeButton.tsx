import './LikeButton.scss';
import block from 'bem-cn';
import { FC, useState } from 'react';

const b = block('like-button');

interface ILikeButton {
  liked?: boolean;
  count?: number
  onClick?: (liked: boolean) => void;
}

const LikeButton: FC<ILikeButton> = (props) => {
  const {
    liked: isChecked = false,
    count = 0,
    onClick,
  } = props;

  const [liked, setLiked] = useState(isChecked);

  const handleLikeButtonClick = (): void => {
    const newValue = !liked;
    setLiked(newValue);
    onClick && onClick(newValue);
  };

  return (
    <button type="button" className={b({ checked: liked })} onClick={handleLikeButtonClick}>
      <div className={b('count')}>{count}</div>
    </button>
  );
};

export default LikeButton;
