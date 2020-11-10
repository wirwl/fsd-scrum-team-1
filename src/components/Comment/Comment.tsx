import React from 'react';
import { block } from 'bem-cn';
import LikeButton from '../LikeButton/LikeButton';

import './Comment.scss';

interface ICommentProps {
  userName: string;
  publicationDate: string;
  avatar: { src: string; alt: string; };
  likes: number;
  likeButtonChecked: boolean;
  text: string;
  onLikeClick?: (checked: boolean) => void;
}

const b = block('comment');

const Comment: React.FC<ICommentProps> = (props) => {
  const {
    avatar,
    likeButtonChecked,
    likes,
    publicationDate,
    text,
    userName,
    onLikeClick = () => {},
  } = props;

  return (
    <div className={b()}>
      <div className={b('column')}>
        <img
          className={b('avatar')}
          src={avatar.src}
          alt={avatar.alt}
        />
        <div className={b('like-button')}>
          <LikeButton liked={likeButtonChecked} count={likes} onClick={onLikeClick} />
        </div>
      </div>
      <div className={b('main')}>
        <div className={b('head')}>
          <p className={b('user-name')}>{userName}</p>
          <p className={b('publication-date')}>{publicationDate}</p>
        </div>
        <p className={b('body')}>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
