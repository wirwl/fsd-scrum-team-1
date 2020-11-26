import React, { useState } from 'react';
import Link from 'next/link';
import { block } from 'bem-cn';
import { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import RateButtons from '../RateButton/RateButton';

import './RoomCard.scss';

interface IImage {
  src: string;
  alt?: string;
}

interface IRoomCardInfo {
  images: IImage[];
  roomNumber: number;
  price: number;
  stars: number;
  numberOfReviews: number;
  hrefToRoomInfo: string;
  hrefToReviews: string;
  isLuxury: boolean;
}

interface IRoomCardProps extends WithTranslation {
  info: IRoomCardInfo;
}

const b = block('room-card');

const RoomCard: React.FC<IRoomCardProps> = (props) => {
  const {
    info: {
      images,
      numberOfReviews,
      price,
      roomNumber,
      stars,
      hrefToRoomInfo,
      hrefToReviews,
      isLuxury,
    },
    t,
  } = props;

  const [imageIndex, setImageIndex] = useState(0);

  const handleButtonClick = (isNextImage = false): void => (
    setImageIndex((prev) => {
      let newIndex = prev + (isNextImage ? 1 : -1);
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex > images.length - 1) newIndex = 0;
      return newIndex;
    })
  );

  const imagesItems = images.map(({ src, alt = '' }, index) => (
    <li className={b('image-wrapper', { selected: index === imageIndex })} key={`${src}`}>
      <img
        className={b('image')}
        src={src}
        alt={alt}
      />
    </li>
  ));
  const circles = images.map(({ src }, index) => (
    <li key={`${src}`} className={b('circle-wrapper')}>
      <button
        type="button"
        className={b('circle', { selected: index === imageIndex })}
        onClick={() => setImageIndex(index)}
      />
    </li>
  ));

  return (
    <div className={b()}>
      <div className={b('image-slider')}>
        <ul className={b('image-list')}>{imagesItems}</ul>
        <ul className={b('circles')}>{circles}</ul>
        <button
          type="button"
          className={b('button')}
          onClick={() => handleButtonClick()}
        >
          <span className={b('button-text')}>expand_more</span>
        </button>
        <button
          type="button"
          className={b('button')}
          onClick={() => handleButtonClick(true)}
        >
          <span className={b('button-text')}>expand_more</span>
        </button>
      </div>
      <div className={b('body')}>
        <div className={b('row')}>
          <Link href={hrefToRoomInfo}>
            <a className={b('link-to-room-info')} href={hrefToRoomInfo}>
              <h2 className={b('room-number-wrapper')}>
                №&nbsp;
                <span className={b('room-number')}>{roomNumber}</span>
              </h2>
              {
                isLuxury && (
                  <span className={b('luxury')}>
                    &nbsp;
                    {t('luxe')}
                  </span>
                )
              }
            </a>
          </Link>
          <p className={b('price')}>
            <span className={b('price-number')}>
              {`${(price).toLocaleString()}₽`}
            </span>
            &nbsp;
            {t('perDay')}
          </p>
        </div>
        <div className={b('row')}>
          <RateButtons rate={stars} />
          <Link href={hrefToReviews}>
            <a className={b('link-to-reviews')} href={hrefToReviews}>
              <span className={b('reviews-number')}>{numberOfReviews}</span>
              &nbsp;
              {t('room:roomComments.feedbackFew')}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default i18n.withTranslation(['common', 'room'])(
  RoomCard,
);

export type { IRoomCardProps };
