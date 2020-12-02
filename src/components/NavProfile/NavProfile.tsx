import { FC } from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import Button from 'src/components/Button/Button';

import './NavProfile.scss';

const b = block('nav-profile');

const NavProfile: FC<WithTranslation> = ({ t }) => {
  const router = useRouter();

  const routerPathName = router.pathname;

  const isPathBooking = routerPathName === '/auth/profile/booked-rooms';
  const isPathProfile = routerPathName === '/auth/profile';

  return (
    <ul className={b()}>
      <Link href="/auth/profile">
        <li className={b('link-item')}>
          <Button
            theme={isPathProfile ? 'default' : 'white'}
            caption={t('personalInformation')}
          />
        </li>
      </Link>
      <Link href="/auth/profile/booked-rooms">
        <li className={b('link-item')}>
          <Button
            theme={isPathBooking ? 'default' : 'white'}
            caption={t('bookedRooms')}
          />
        </li>
      </Link>
    </ul>
  );
};

export default i18n.withTranslation('common')(
  NavProfile,
);
