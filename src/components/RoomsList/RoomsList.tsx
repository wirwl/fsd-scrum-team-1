import React, { FC, MouseEvent } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { block } from 'bem-cn';

import { IRootState } from 'src/redux/reducer';
import { IRoom } from 'src/services/dto/Rooms';
import RoomCard, { IRoomCardProps } from 'src/components/RoomCard/RoomCard';
import Button from 'src/components/Button/Button';
import './RoomsList.scss';

const b = block('rooms');

interface IRoomsListProps {
  onShowMoreButtonClick: () => void;
}

const convertDataForRoomCard = (inputData: IRoom): IRoomCardProps => {
  const {
    picsPreview,
    comments,
    price,
    roomNumber,
    rate,
    isLux,
    n,
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
    hrefToReviews: `/rooms/${n}#reviews`,
    hrefToRoomInfo: `/rooms/${n}`,
  };

  return roomCardData;
};

const RoomsList: FC<IRoomsListProps> = (props) => {
  const { onShowMoreButtonClick } = props;

  const { isFetching, items: rooms, error } = useSelector(
    (state: IRootState) => state.rooms,
    shallowEqual,
  );

  const roomCards = rooms.map((room) => {
    const roomData = convertDataForRoomCard(room);

    return (
      <li className={b('item')} key={room.n}>
        <RoomCard info={roomData} />
      </li>
    );
  });

  const isFailLoad = error && !isFetching;
  const isEmpty = rooms.length === 0;

  const handleClick = (evt: MouseEvent): void => {
    evt.preventDefault();
    onShowMoreButtonClick();
  };

  const getCorrectElement = (): JSX.Element => {
    if (isFetching) return <div>Loading...</div>;

    if (isEmpty) {
      return (
        <div>
          К сожалению, у нас нет номеров, которые соответствовали бы всем вашим критериям.
          Постарайтесь изменить фильтры.
        </div>
      );
    }

    if (isFailLoad) return <div>{error}</div>;

    return <ul className={b('list')}>{roomCards}</ul>;
  };

  return (
    <section className={b()}>
      <h2 className={b('title')}>Номера, которые мы для вас подобрали</h2>
      {getCorrectElement()}
      {!isEmpty && (
        <div className={b('show-more')}>
          <Button theme="textual" caption="Показать еще" handleClick={handleClick} />
        </div>
      )}
    </section>
  );
};

export default RoomsList;
