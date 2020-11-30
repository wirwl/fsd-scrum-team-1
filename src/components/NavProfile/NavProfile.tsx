import { FC } from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from 'src/components/Button/Button';

import './NavProfile.scss';

const b = block('nav-profile');

const NavProfile: FC = () => {
  const router = useRouter();

  const routerPathname = router.pathname;

  const isPathBooking = routerPathname === '/auth/profile/booked-rooms';
  const isPathProfile = routerPathname === '/auth/profile';

  return (
    <ul className={b()}>
      <Link href="/auth/profile">
        <li className={b('link-item')}>
          <Button
            theme={isPathProfile ? 'default' : 'white'}
            caption="личные данные"
          />
        </li>
      </Link>
      <Link href="/auth/profile/booked-rooms">
        <li className={b('link-item')}>
          <Button
            theme={isPathBooking ? 'default' : 'white'}
            caption="забронированные номера"
          />
        </li>
      </Link>
    </ul>
  );
};

export default NavProfile;
