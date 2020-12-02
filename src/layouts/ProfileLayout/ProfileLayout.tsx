import { FC } from 'react';
import { block } from 'bem-cn';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import NavProfile from 'src/components/NavProfile/NavProfile';

import './ProfileLayout.scss';

type ProfileLayoutProps = {
  title: string;
};

const b = block('profile-layout');

const ProfileLayout: FC<ProfileLayoutProps> = ({ children, title }) => (
  <div className={b()}>
    <MainLayout title={title}>
      <div className={b('inner-container')}>
        <section className={b('nav')}>
          <NavProfile />
        </section>

        { children }
      </div>
    </MainLayout>
  </div>
);

export default ProfileLayout;
