import { FC } from 'react';
import { block } from 'bem-cn';

import './RoomGallery.scss';

const b = block('room-gallery');

interface IPhoto {
  path: string,
  alt: string,
}

interface IRoomGallery {
  photos: IPhoto[]
}

const RoomGallery: FC<IRoomGallery> = ({ photos }) => (
  <div className={b()}>
    {
      photos.map((photo) => (
        <img
          className={b('item')}
          src={photo.path}
          alt={photo.alt}
          key={photo.path}
        />
      ))
    }
  </div>
);

export default RoomGallery;
