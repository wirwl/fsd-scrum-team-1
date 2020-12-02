import { FC } from 'react';
import { block } from 'bem-cn';

import { IRoom } from '@/services/dto/Rooms';
import RoomCard, { IRoomCardInfo } from '../RoomCard/RoomCard';

import './BookedRoom.scss';

const b = block('booked-room');

interface IBookedRoomProps {
  room: IRoom,
  dateStart: number,
  dateEnd: number,
}

const convertDataForRoomCard = (inputData: IRoom): IRoomCardInfo => {
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

const formatDate = (date: number): string => {
  const monthsInRussian = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
  const d = new Date(date);
  const month = d.getMonth();
  const day = `${d.getDate()}`;

  const monthString = monthsInRussian[month].slice(0, 3);

  return [day, monthString].join(' ');
};

const BookedRoom: FC<IBookedRoomProps> = (props) => {
  const {
    room,
    dateStart,
    dateEnd,
  } = props;

  const arrivalDate = formatDate(dateStart);
  const dateOfDeparture = formatDate(dateEnd);
  const bookingDate = `${arrivalDate} - ${dateOfDeparture}`;
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
