import React from 'react';
import { block } from 'bem-cn';

import { IRoomComment } from '@/services/dto/Rooms';
import LikeButton from '@/components/LikeButton/LikeButton';

import './Comment.scss';
import { type } from 'os';

interface ICommentProps extends IRoomComment {
  likeButtonChecked: boolean;
  onLikeClick?: (checked: boolean) => void;
}

const b = block('comment');

const getWordWithEnding = (value: number, words: [string, string, string]): string => {
  const tens = Math.floor(value / 10) % 10;
  const units = value % 10;
  const isUnitsEqualToOne = units === 1;
  const isTensEqualToOne = tens === 1;
  const isUnitsBetweenOneAndFive = units > 1 && units < 5;

  if (isUnitsEqualToOne && !isTensEqualToOne) return words[0];
  if (isUnitsBetweenOneAndFive && !isTensEqualToOne) return words[1];
  return words[2];
};

const Comment: React.FC<ICommentProps> = (props) => {
  const {
    author,
    date,
    likeButtonChecked,
    likes,
    text,
    onLikeClick = () => {},
  } = props;

  const today = new Date();
  const differenceOfDays = Math.ceil((today.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
  const publicationDate = `${differenceOfDays} ${getWordWithEnding(differenceOfDays, ['день', 'дня', 'дней'])} назад`;

  return (
    <div className={b()}>
      <div className={b('column')}>
        <img
          className={b('avatar')}
          src={author.avatar}
          alt={author.name}
        />
        <div className={b('like-button')}>
          <LikeButton liked={likeButtonChecked} count={likes} onClick={onLikeClick} />
        </div>
      </div>
      <div className={b('main')}>
        <div className={b('head')}>
          <p className={b('user-name')}>{author.name}</p>
          <p className={b('publication-date')}>{publicationDate}</p>
        </div>
        <p className={b('body')}>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
export { getWordWithEnding };
export type { ICommentProps };
