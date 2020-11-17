import { FC } from 'react';
import { block } from 'bem-cn';
import router from 'next/router';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import BannerAndSignature from 'src/components/BannerAndSignature/BannerAndSignature';
import FormLanding from 'src/components/FormLanding/FormLanding';
import type { IDropListItem } from 'src/components/InputDropdown/InputDropdown';

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

const queryToString = (
  query: Record<string, number | string>,
): string => Object.keys(query)
  .reduce((acc, key) => `&${key}=${query[key]}${acc}`, '')
  .slice(1);

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

    const queryString = queryToString(query);

    router.push('/rooms', `/rooms?${queryString}`);
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
