import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@/components/Button/Button';
import SocialButtons from '@/components/social-buttons/SocialButtons';
import MainLayout from '@/layouts/MainLayout';

import { bookRoom } from '@/redux/booking';

const Main: FC = () => {
  const dispatch = useDispatch();
  return (
    <MainLayout>
      <h1 className="m">Hello, World!</h1>
      <Button />
      <Button theme="white" />
      <Button theme="textual" href="/auth" />
      <Button withArrow size="fluid" />
      <Button href="/auth" />
      <Button caption="Add Order To Store" handleClick={() => dispatch(bookRoom({ id: 1, price: 10 }))} />
      <SocialButtons items={[{ text: 'twitter', link: 'https://twitter.com' }, {
        text: 'facebook-square',
        link: 'https://facebook.com',
      }, { text: 'instagram', link: 'https://instagram.com' }]}
      />
    </MainLayout>
  );
};

export default Main;
