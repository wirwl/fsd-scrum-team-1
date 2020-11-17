import './RoomDetailsList.scss';
import block from 'bem-cn';
import { FC } from 'react';

const b = block('room-details-list');

interface IRoomDetail {
  icon: string,
  caption: string,
  description: string
}

interface IRoomDetailsList {
  header: string,
  roomDetails: IRoomDetail[]
}

const RoomDetailsList: FC<IRoomDetailsList> = ({
  header,
  roomDetails,
}) => {
  const roomDetailsItems = roomDetails.map((roomDetail) => {
    const { icon, caption, description } = roomDetail;
    return (
      <li className={b('item')} key={icon}>
        <div className={b('icon').mix('material-icons')}>
          {icon}
        </div>
        <div className={b('wrapper')}>
          <div className={b('caption')}>{caption}</div>
          <p className={b('description')}>{description}</p>
        </div>
      </li>
    );
  });

  return (
    <div className={b()}>
      <h3 className={b('header')}>{header}</h3>
      <ul className={b('list')}>
        {roomDetailsItems}
      </ul>
    </div>
  );
};

export default RoomDetailsList;
