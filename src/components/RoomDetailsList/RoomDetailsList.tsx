import block from 'bem-cn';
import { FC } from 'react';
import { TFunction, WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import { IRoomInformation } from 'src/services/dto/Rooms';

import './RoomDetailsList.scss';

const b = block('room-details-list');

interface IRoomDetail {
  icon: string;
  caption: string;
  description: string;
}

interface IRoomDetailsListProps extends WithTranslation {
  header: string;
  roomDetails: IRoomInformation[];
}

type RoomDetailedMap = Record<IRoomInformation, IRoomDetail>;

const getRoomDetailedMap = (t: TFunction): RoomDetailedMap => ({
  comfort: {
    icon: 'insert_emoticon',
    caption: t('room:roomInfo.comfort.title'),
    description: t('room:roomInfo.comfort.description'),
  },
  convinience: {
    icon: 'location_city',
    caption: t('room:roomInfo.convenience.title'),
    description: t('room:roomInfo.convenience.description'),
  },
  cozy: {
    icon: 'whatshot',
    caption: t('room:roomInfo.cozy.title'),
    description: t('room:roomInfo.cozy.description'),
  },
});

const RoomDetailsList: FC<IRoomDetailsListProps> = ({
  header,
  roomDetails,
  t,
}) => {
  const roomDetailMap = getRoomDetailedMap(t);
  const roomDetailsItems = roomDetails.map((roomDetail) => {
    const { icon, caption, description } = roomDetailMap[roomDetail];

    return (
      <li className={b('item')} key={icon}>
        <div className={b('icon-container')}>
          <span className={b('icon')}>{icon}</span>
        </div>
        <div className={b('wrapper')}>
          <h4 className={b('caption')}>{caption}</h4>
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

export default i18n.withTranslation(['common', 'room'])(
  RoomDetailsList,
);
