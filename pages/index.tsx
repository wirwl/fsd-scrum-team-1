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

type IRangeDays = {
  start: Date | null;
  end: Date | null;
};

const b = block('index');

const labelsMap: { [key:string]: string; } = {
  Взрослые: 'gAdults',
  Дети: 'gChilds',
  Младенцы: 'gToddlers',
};

const convertPersons = (
  persons: IDropListItem[],
): { [key:string]: number } => persons.reduce(
  (acc, { label, count }) => ({ ...acc, [labelsMap[label]]: count }),
  {},
);

const queryToString = (
  query: { [key:string]: number | string },
): string => Object.keys(query)
  .reduce((acc, key) => `&${key}=${query[key]}${acc}`, '')
  .slice(1);

const Index: FC = () => {
  const handleFormLandingSubmit = (
    { start, end }: IRangeDays,
    persons: IDropListItem[],
  ): void => {
    const _start = start === null ? '' : start;
    const _end = end === null ? '' : end;

    const query = {
      dStart: (new Date(_start)).getTime(),
      dEnd: (new Date(_end)).getTime(),
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
