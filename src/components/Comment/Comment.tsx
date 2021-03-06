import React from 'react';
import { block } from 'bem-cn';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import { IRoomComment } from '@/services/dto/Rooms';
import LikeButton from '@/components/LikeButton/LikeButton';

import './Comment.scss';

interface IComment extends IRoomComment {
  likeButtonChecked?: boolean;
  onLikeClick?: (checked: boolean) => void;
}

interface ICommentProps extends IComment, WithTranslation {}

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

const ruToKeyTranslateMap: Record<string, string> = {
  день: 'daysAgoOne',
  дня: 'daysAgoTwo',
  дней: 'daysAgoFew',
};

const Comment: React.FC<ICommentProps> = (props) => {
  const {
    author,
    date,
    likeButtonChecked = false,
    likes,
    text,
    onLikeClick = () => {},
    t,
  } = props;

  const differenceOfDays = Math.ceil((Date.now() - date) / (24 * 60 * 60 * 1000));
  const dateEnding = getWordWithEnding(differenceOfDays, ['день', 'дня', 'дней']);

  const dateEndingT = t(
    `room:roomComments.${ruToKeyTranslateMap[dateEnding]}`,
  );

  const publicationDateT = `${differenceOfDays} ${dateEndingT}`;

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
          <p className={b('publication-date')}>{publicationDateT}</p>
        </div>
        <p className={b('body')}>{text}</p>
      </div>
    </div>
  );
};

export default i18n.withTranslation(['common', 'room'])(
  Comment,
);

export { getWordWithEnding };

export type { IComment };
