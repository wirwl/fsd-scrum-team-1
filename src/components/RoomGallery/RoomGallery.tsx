import { FC } from 'react';
import { block } from 'bem-cn';

import './RoomGallery.scss';

const b = block('room-gallery');

interface IPhoto {
  src: string,
  alt: string,
}

interface IRoomGallery {
  photos: IPhoto[]
}

const generateKey = (pre: number): string => `${pre}_${new Date().getTime()}`;

const RoomGallery: FC<IRoomGallery> = ({ photos }) => (
  <figure className={b()}>
    {
      photos.map((photo, index) => (
        <img
          className={b('item')}
          src={photo.src}
          alt={photo.alt}
          key={generateKey(index)}
        />
      ))
    }
  </figure>
);

export default RoomGallery;
