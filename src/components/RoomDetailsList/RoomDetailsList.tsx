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
}) => (
  <div className={b()}>
    <h2 className={b('header')}>{header}</h2>
    <ul className={b('list')}>
      {roomDetails.map((roomDetail) => {
        const { icon, caption, description } = roomDetail;
        return (
          <li className={b('item')} key={icon}>
            <div className={`${b('icon')} material-icons`}>
              {roomDetail.icon}
            </div>
            <div className={b('wrapper')}>
              <div className={b('caption')}>{caption}</div>
              <p className={b('description')}>{description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default RoomDetailsList;
