import { FC } from 'react';
import { block } from 'bem-cn';
import Router from 'next/router';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import BannerAndSignature from 'src/components/BannerAndSignature/BannerAndSignature';
import FormLanding from 'src/components/FormLanding/FormLanding';
import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';
import type { RangeDays } from 'src/components/Calendar/Calendar';

import './index.scss';

const PAGE_SIGNATURE = 'Лучшие номера для вашей работы, отдыха и просто вдохновения';
const TITLE = 'Toxin';

const b = block('index');

const convertPersons = (
  persons: IDropListItem[],
): Record<string, number> => persons.reduce(
  (acc, { id, count }) => ({ ...acc, [id]: count }),
  {},
);

const Index: FC = () => {
  const handleFormLandingSubmit = (
    { start, end }: RangeDays,
    persons: IDropListItem[],
  ): void => {
    const _start = start === null ? '' : start;
    const _end = end === null ? '' : end;
    const tStart = (new Date(_start)).getTime();
    const tEnd = (new Date(_end)).getTime();

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
      <BannerAndSignature signature={PAGE_SIGNATURE}>

        <section className={b()}>
          <FormLanding onSubmit={handleFormLandingSubmit} />
        </section>

      </BannerAndSignature>
    </MainLayout>
  );
};

export default Index;
