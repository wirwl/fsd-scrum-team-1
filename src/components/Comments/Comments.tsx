import React from 'react';
import { block } from 'bem-cn';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';

import Comment, { ICommentProps, getWordWithEnding } from '../Comment/Comment';

import './Comments.scss';

interface ICommentsProps extends WithTranslation {
  title?: string;
  items: ICommentProps[];
  allComments: number;
}

const b = block('comments');

const Comments: React.FC<ICommentsProps> = ({
  title = 'Отзывы посетителей номера',
  items,
  allComments,
  t,
}) => {
  const count = getWordWithEnding(
    allComments,
    [
      t('room:roomComments.feedbackOne'),
      t('room:roomComments.feedbackTwo'),
      t('room:roomComments.feedbackFew'),
    ],
  );
  const countString = `${allComments} ${count}`;

  const comments = items.map((item) => (
    <li className={b('comment')} key={`${item.author} ${item.date}`}>
      <Comment
        author={item.author}
        date={item.date}
        likeButtonChecked={item.likeButtonChecked}
        likes={item.likes}
        text={item.text}
        onLikeClick={item.onLikeClick}
      />
    </li>
  ));

  return (
    <div className={b()}>
      <div className={b('head')}>
        <h3 className={b('title')}>{title}</h3>
        <p className={b('count')}>{countString}</p>
      </div>
      <ul className={b('list')}>
        {comments}
      </ul>
    </div>
  );
};

export default i18n.withTranslation(['common', 'room'])(
  Comments,
);
