import { FC, useState, useEffect } from 'react';
import { block } from 'bem-cn';
import { END } from 'redux-saga';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { TFunction, WithTranslation, NextI18NextInternals } from 'next-i18next';

import type { ISearchFilters } from 'src/services/Api';
import type { IFilterStateRecord, IFormRoomFilterState } from 'src/components/FormRoomsFilter/FormRoomsFilter';

import i18n from 'src/services/i18n';
import wrapper, { ISagaStore } from 'src/redux/store';
import { fetchMoreRooms, fetchRooms } from 'src/redux/rooms/roomsActions';
import { IRoomsState } from 'src/redux/rooms/roomsReducer';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import FormRoomsFilter from 'src/components/FormRoomsFilter/FormRoomsFilter';
import {
  initState,
  updateQuery,
} from 'src/components/FormRoomsFilter/helpers';
import RoomsList from 'src/components/RoomsList/RoomsList';
import {
  MIN_PRICE,
  MAX_PRICE,
} from 'src/components/FormRoomsFilter/components/SliderFilter/SliderFilter';

import './RoomsIndex.scss';
import { IncomingMessage } from 'http';

type IRoomsProps = {
  query: Record<string, string>;
  rooms: IRoomsState;
} & WithTranslation;

const b = block('rooms-page');

const getParamsFromState = (state: IFormRoomFilterState): IFilterStateRecord => {
  const result: IFilterStateRecord = {};

  const { price } = state;

  const priceParams: IFilterStateRecord = price === undefined
    ? {}
    : { priceMin: price[0], priceMax: price[1] };

  const allParams = state as IFilterStateRecord;

  Object.keys(state)
    .forEach((key) => {
      const value = allParams[key];
      if (value !== false) result[key] = value;
    });

  return {
    ...priceParams,
    ...result,
  };
};

const getParamsFromQuery = (query: Record<string, string>, t: TFunction): ISearchFilters => {
  const state = initState(query, MIN_PRICE, MAX_PRICE, t);

  const n = 0;

  const stateParams = getParamsFromState(state);

  return { n, ...stateParams };
};

const Rooms: FC<IRoomsProps> = ({ query, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [filters, setFilters] = useState<ISearchFilters>(
    () => getParamsFromQuery(query, t),
  );

  useEffect(() => {
    const { n } = filters;
    if (n === 0) {
      dispatch(fetchRooms(filters));
    } else {
      dispatch(fetchMoreRooms(filters));
    }
  }, [filters]);

  const handleFormRoomsFilterChange = (stateQuery: IFormRoomFilterState): void => {
    const params = getParamsFromState(stateQuery);

    updateQuery('n', '0', router);
    setFilters({ n: 0, ...params });
  };

  const handleLoadMoreButtonClick = (n: number): void => {
    if (!process.browser) return;

    updateQuery('n', (n).toString(), router);
    setFilters((prevState) => ({ ...prevState, n }));
  };

  return (
    <MainLayout title={t('titles.rooms')}>
      <div className={b()}>
        <div className={b('container')}>
          <aside className={b('filters')}>
            <FormRoomsFilter
              query={query}
              onChange={handleFormRoomsFilterChange}
            />
          </aside>

          <section className={b('rooms')}>
            <RoomsList onShowMoreButtonClick={handleLoadMoreButtonClick} />
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query, req }) => {
    const { i18n: _i18n } = req as IncomingMessage & NextI18NextInternals;
    const t = _i18n.t.bind(_i18n);
    const queryParams: ISearchFilters = getParamsFromQuery(
      query as Record<string, string>,
      t,
    );

    store.dispatch(fetchRooms(queryParams));
    store.dispatch(END);
    await (store as ISagaStore).sagaTask?.toPromise();

    return {
      props: { query },
    };
  },
);

export default i18n.withTranslation(['common', 'forms', 'components'])(
  Rooms,
);
