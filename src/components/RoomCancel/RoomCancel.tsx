import { block } from 'bem-cn';
import { FC } from 'react';

import './RoomCancel.scss';

const b = block('room-cancel');

interface IRoomCancel {
  title?: string;
  description?: string
}

const RoomCancel: FC<IRoomCancel> = (props) => {
  const {
    title = 'Отмена',
    description = 'Бесплатная отмена в течение 48 ч. После этого при отмене не позднее чем за 5 дн. до прибытия вы получите полный возврат за вычетом сбора за услуги.',
  } = props;

  return (
    <div className={b()}>
      <h2 className={b('title')}>{title}</h2>
      <p className={b('description')}>{description}</p>
    </div>
  );
};

export default RoomCancel;
