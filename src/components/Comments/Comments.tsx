import React from 'react';
import { block } from 'bem-cn';

import Comment, { ICommentProps, getWordWithEnding } from '../Comment/Comment';

import './Comments.scss';

interface ICommentsProps {
  title?: string;
  items: ICommentProps[];
}

const b = block('comments');

const Comments: React.FC<ICommentsProps> = ({ title = 'Отзывы посетителей номера', items }) => {
  const count = `${items.length} ${getWordWithEnding(items.length, ['отзыв', 'отзыва', 'отзывов'])}`;

  const comments = items.map((item) => (
    <li className={b('comment')} key={`${item.author} ${item.date.getTime()}`}>
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
        <p className={b('count')}>{count}</p>
      </div>
      <ul className={b('list')}>
        {comments}
      </ul>
    </div>
  );
};

export default Comments;
