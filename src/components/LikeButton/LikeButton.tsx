import './LikeButton.scss';
import block from 'bem-cn';
import { FC, useState } from 'react';

const b = block('like-button');

interface ILikeButton {
  liked?: boolean;
  onClick?: (liked: boolean) => void;
}

const LikeButton: FC<ILikeButton> = (props) => {
  const {
    liked: isChecked = false,
    onClick,
  } = props;

  const [liked, setLiked] = useState<boolean>(isChecked);

  const handleLikeButtonClick = (): void => {
    const newValue = !liked;
    setLiked(newValue);
    onClick && onClick(newValue);
  };

  return (
    <button type="button" className={b({ checked: liked })} onClick={handleLikeButtonClick}>
      <div className={b('count')}>0</div>
    </button>
  );
};

export default LikeButton;
