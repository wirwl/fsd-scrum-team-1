import { FC, useState, useEffect } from 'react';
import { block } from 'bem-cn';
import { END } from 'redux-saga';
import { useDispatch } from 'react-redux';

import type { ISearchFilters } from 'src/services/Api';
import type { IFilterStateRecord, IFormRoomFilterState } from 'src/components/FormRoomsFilter/FormRoomsFilter';

import wrapper, { ISagaStore } from 'src/redux/store';
import { fetchRooms } from 'src/redux/rooms/roomsActions';
import { IRoomsState } from 'src/redux/rooms/roomsReducer';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import FormRoomsFilter, {
  initState,
  updateQuery,
} from 'src/components/FormRoomsFilter/FormRoomsFilter';
import RoomsList from 'src/components/RoomsList/RoomsList';

import './RoomsIndex.scss';

const ROOMS_PER_PAGE = 12;

type IRoomsProps = {
  query: Record<string, string>;
  rooms: IRoomsState;
};

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

const normalizeN = (n: string): number => {
  const numberN = parseInt(n, 10);
  if (Number.isNaN(numberN)) return 0;
  if (numberN < 0) return 0;
  return numberN;
};

const getParamsFromQuery = (query: Record<string, string>): ISearchFilters => {
  const state = initState(query);

  const n = query.n === undefined ? 0 : normalizeN(query.n);

  const stateParams = getParamsFromState(state);

  return { n, ...stateParams };
};

const Rooms: FC<IRoomsProps> = ({ query }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<ISearchFilters>(() => getParamsFromQuery(query));

  useEffect(() => {
    dispatch(fetchRooms(filters));
  }, [filters]);

  const handleFormRoomsFilterChange = (stateQuery: IFormRoomFilterState): void => {
    const params = getParamsFromState(stateQuery);
    updateQuery('n', '0');
    setFilters({ n: 0, ...params });
  };

  const handleLoadMoreButtonClick = (n: number): void => {
    if (!process.browser) return;

    updateQuery('n', (n).toString());
    setFilters((prevState) => ({ ...prevState, n }));
    window.scrollTo(0, 0);
  };

  return (
    <MainLayout title="Rooms">
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
  async ({ store, query }) => {
    const queryParams: ISearchFilters = getParamsFromQuery(query as Record<string, string>);

    store.dispatch(fetchRooms(queryParams));
    store.dispatch(END);
    await (store as ISagaStore).sagaTask?.toPromise();

    return {
      props: { query },
    };
  },
);

export default Rooms;
