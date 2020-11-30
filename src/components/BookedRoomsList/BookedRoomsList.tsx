import React, { FC, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { block } from 'bem-cn';

import { IRootState } from 'src/redux/reducer';

import BookedRoom from 'src/components/BookedRoom/BookedRoom';
import Button from 'src/components/Button/Button';
import Spinner from 'src/components/Spinner/Spinner';

import './BookedRoomsList.scss';

const b = block('booked-rooms');

const BookedRoomsList: FC = () => {
  const {
    isFetchingRoomsInProgress: isFetching,
    rooms: bookedRooms,
    fetchRoomsError: error,
  } = useSelector(
    (state: IRootState) => state.bookedRooms,
    shallowEqual,
  );

  const [currentPage, setPage] = useState(1);

  const handleClick = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const needCountRooms = currentPage * 12;

  const roomCards = bookedRooms.slice().splice(0, needCountRooms).map((bookedRoom) => {
    const { room, dateStart, dateEnd } = bookedRoom;

    return (
      <li className={b('item')} key={room.id}>
        <BookedRoom room={room} dateStart={dateStart} dateEnd={dateEnd} />
      </li>
    );
  });

  const isFailLoad = error && !isFetching;
  const isEmpty = bookedRooms.length === 0;
  const isVisibleShowMore = !isEmpty && needCountRooms < bookedRooms.length && !isFetching;

  const getCorrectElement = (): JSX.Element => {
    if (isFetching) return <div className={b('spinner')}><Spinner /></div>;

    if (isFailLoad) return <div>{error}</div>;

    if (isEmpty) {
      return (
        <div>
          Вы не забронировали ни одного номера.
        </div>
      );
    }

    return <ul className={b('list')}>{roomCards}</ul>;
  };

  return (
    <section className={b()}>
      <h2 className={b('title')}>Забронированные номера</h2>
      {getCorrectElement()}
      {isVisibleShowMore && (
        <div className={b('show-more')}>
          <Button theme="default" caption="Показать еще" handleClick={handleClick} />
        </div>
      )}
    </section>
  );
};

export default BookedRoomsList;
