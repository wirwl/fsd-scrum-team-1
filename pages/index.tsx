import React, { FC } from 'react';

import Button from '@/components/Button/Button';
import MainLayout from '@/layouts/MainLayout';
import SocialButtons from '@/components/social-buttons/SocialButtons';
import BulletsList from '@/components/BulletsList/BulletsList';
import RateButton from '@/components/RateButton/RateButton';
import LikeButton from '@/components/LikeButton/LikeButton';

const Main: FC = () => (
  <MainLayout>
    <h1 className="m">Hello, World!</h1>
    <Button />
    <Button theme="white" />
    <Button theme="textual" href="/auth" />
    <Button withArrow size="fluid" />
    <Button href="/auth" />
    <SocialButtons items={[{ text: 'twitter', link: 'https://twitter.com' }, { text: 'facebook-square', link: 'https://facebook.com' }, { text: 'instagram', link: 'https://instagram.com' }]} />
    <BulletsList textList={['Нельзя с питомцами', 'Без вечеринок и мероприятий', 'Время прибытия — после 13:00, а выезд до 12:00']} />
    <RateButton id="rb1" selectedCount={4} />
    <LikeButton isChecked={false} count={0} />
  </MainLayout>
);

export default Main;
