import { FC } from 'react';
import { block } from 'bem-cn';
import Router from 'next/router';
import { WithTranslation } from 'next-i18next';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import BannerAndSignature from 'src/components/BannerAndSignature/BannerAndSignature';
import FormLanding from 'src/components/FormLanding/FormLanding';
import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
import type { RangeDays } from 'src/components/Calendar/Calendar';

import i18n from 'src/services/i18n';

import './index.scss';
import {
  saveGuestsCountAsSharedData,
  saveResidenceTimeAsSharedData,
} from '@/services/SharedData';

const TITLE = 'Toxin';

const b = block('index');

const convertPersons = (
  persons: IDropListItem[],
): Record<string, number> => persons.reduce(
  (acc, { id, count }) => ({ ...acc, [id]: count }),
  {},
);

const Index: FC<WithTranslation> = ({ t }) => {
  const handleFormLandingSubmit = (
    { start, end }: RangeDays,
    persons: IDropListItem[],
  ): void => {
    const _start = start === null ? '' : start;
    const _end = end === null ? '' : end;
    const tStart = (new Date(_start)).getTime();
    const tEnd = (new Date(_end)).getTime();

    // if (typeof window !== 'undefined') {
    //   const residenceTime = { start, end };
    //   const booking = { residenceTime, guests: persons };
    //   localStorage.setItem('reduxState', JSON.stringify(booking));
    // }

    saveResidenceTimeAsSharedData({ start, end });
    saveGuestsCountAsSharedData(persons);

    const query = {
      dateRange: `${tStart}-${tEnd}`,
      ...convertPersons(persons),
    };

    Router.push({
      pathname: '/rooms',
      query,
    });
  };

  return (
    <MainLayout title={TITLE}>
      <BannerAndSignature signature={t('sign')}>

        <section className={b()}>
          <FormLanding onSubmit={handleFormLandingSubmit} />
        </section>

      </BannerAndSignature>
    </MainLayout>
  );
};

export default i18n.withTranslation('common')(Index);
