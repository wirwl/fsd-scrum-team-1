import './RoomDetailsList.scss';
import block from 'bem-cn';
import { FC } from 'react';
import { IRoomInformation } from 'src/services/dto/Rooms';

const b = block('room-details-list');

interface IRoomDetail {
  icon: string;
  caption: string;
  description: string;
}

interface IRoomDetailsList {
  header: string;
  roomDetails: IRoomInformation[];
}

type RoomDetailedMap = Record<IRoomInformation, IRoomDetail>;

const roomDetailedMap: RoomDetailedMap = {
  comfort: {
    icon: 'tag_faces',
    caption: 'Комфорт',
    description: 'Шумопоглощающие стены',
  },
  convinience: {
    icon: 'location_city',
    caption: 'Удобство',
    description: 'Окно в каждой из спален',
  },
  cozy: {
    icon: 'whatshot',
    caption: 'Уют',
    description: 'Номер оснащён камином',
  },
};

const RoomDetailsList: FC<IRoomDetailsList> = ({ header, roomDetails }) => {
  const roomDetailsItems = roomDetails.map((roomDetail) => {
    const { icon, caption, description } = roomDetailedMap[roomDetail];
    return (
      <li className={b('item')} key={icon}>
        <div className={b('icon').mix('material-icons')}>{icon}</div>
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
      <ul className={b('list')}>{roomDetailsItems}</ul>
    </div>
  );
};

export default RoomDetailsList;
