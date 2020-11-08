import { FC, useState, useEffect } from 'react';
import { block } from 'bem-cn';
import { END } from 'redux-saga';
import { useDispatch } from 'react-redux';

import type { ISearchFilters } from 'src/services/Api';
import type { IFilterStateRecord, IFormRoomFilterState } from 'src/components/FormRoomsFilter/FormRoomsFilter';

import wrapper, { ISagaStore } from 'src/redux/store';
import { fetchRooms } from 'src/redux/room/roomActions';
import { IRoomsState } from 'src/redux/room/roomReducer';

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

const normalizeId = (id: string): number => {
  const numberId = parseInt(id, 10);
  if (Number.isNaN(numberId)) return 0;
  if (numberId < 0) return 0;
  return numberId;
};

const getParamsFromQuery = (query: Record<string, string>): ISearchFilters => {
  const state = initState(query);

  const id = query.id === undefined ? 0 : normalizeId(query.id);

  const stateParams = getParamsFromState(state);

  return { id, ...stateParams };
};

const Rooms: FC<IRoomsProps> = ({ query }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<ISearchFilters>(() => getParamsFromQuery(query));

  useEffect(() => {
    dispatch(fetchRooms(filters));
  }, [filters]);

  const handleFormRoomsFilterChange = (stateQuery: IFormRoomFilterState): void => {
    const params = getParamsFromState(stateQuery);
    updateQuery('id', '');
    setFilters({ id: 0, ...params });
  };

  const handleLoadMoreButtonClick = (): void => {
    if (!process.browser) return;
    const url = new URLSearchParams(window?.location.search);
    const idString = url.get('id');
    const id = (idString === null ? 0 : normalizeId(idString)) + ROOMS_PER_PAGE;

    updateQuery('id', (id).toString());
    setFilters((prevState) => ({ ...prevState, id }));
  };

  return (
    <MainLayout title="Rooms">
      <div className={b()}>
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
