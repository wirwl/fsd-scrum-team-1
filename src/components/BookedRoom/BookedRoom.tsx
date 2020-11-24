import { FC } from 'react';
import { block } from 'bem-cn';

import { IRoom } from '@/services/dto/Rooms';
import RoomCard, { IRoomCardProps } from '../RoomCard/RoomCard';

import './BookedRoom.scss';

const b = block('booked-room');

interface IBookedRoomProps {
  room: IRoom,
  dateStart: number,
  dateEnd: number,
}

const convertDataForRoomCard = (inputData: IRoom): IRoomCardProps => {
  const {
    picsPreview,
    comments,
    price,
    roomNumber,
    rate,
    isLux,
    id,
  } = inputData;

  const roomCardData = {
    images: picsPreview.map((img) => ({
      src: img,
      alt: '',
    })),
    numberOfReviews: comments.length,
    price,
    roomNumber,
    stars: rate,
    isLuxury: isLux,
    hrefToReviews: `/rooms/${id}#reviews`,
    hrefToRoomInfo: `/rooms/${id}`,
  };

  return roomCardData;
};

const convertDateForBookedRoom = (dateStart: number, dateEnd: number): string => {
  const options = { day: 'numeric', month: 'short' };
  const dateArrival = (new Date(dateStart)).toLocaleDateString('ru-RU', options);
  const departure = (new Date(dateEnd)).toLocaleDateString('ru-RU', options);

  return `${dateArrival} - ${departure}`;
};

const BookedRoom: FC<IBookedRoomProps> = (props) => {
  const {
    room,
    dateStart,
    dateEnd,
  } = props;

  const bookingDate = convertDateForBookedRoom(dateStart, dateEnd);
  const roomData = convertDataForRoomCard(room);

  return (
    <div className={b()}>
      <div className={b('date')}>
        {bookingDate}
      </div>
      <div className={b('room-card')}>
        <RoomCard info={roomData} />
      </div>
    </div>
  );
};

export default BookedRoom;
