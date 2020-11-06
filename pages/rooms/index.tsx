import { FC } from 'react';
import { block } from 'bem-cn';
import { END } from 'redux-saga';

import type { ISearchFilters } from 'src/services/Api';
import wrapper, { ISagaStore } from 'src/redux/store';
import { fetchRooms } from 'src/redux/room/roomActions';
import { IRoomsState } from 'src/redux/room/roomReducer';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import FormRoomsFilter from 'src/components/FormRoomsFilter/FormRoomsFilter';
import RoomsList from 'src/components/RoomsList/RoomsList';

import './RoomsIndex.scss';

type IRoomsProps = {
  queryString: string;
  rooms: IRoomsState;
};

const b = block('rooms-page');

const getParamsFromQuery = (queryString: string): ISearchFilters => {
  const params: ISearchFilters = {
    id: 0,
  };

  const url = new URLSearchParams(queryString);

  const id = url.get('id');
  params.id = id === null ? 0 : parseInt(id, 10);

  const adults = url.get('gAdults');
  if (adults !== null) {
    params.adults = parseInt(adults, 10);
  }

  const babies = url.get('gToddlers');
  if (babies !== null) {
    params.babies = parseInt(babies, 10);
  }

  const priceQuery = url.get('price');
  if (priceQuery !== null) {
    const price = priceQuery.split(',').map((p) => parseInt(p, 10));
    const [min, max] = price;
    params.priceMin = min;
    params.priceMax = max;
  }

  const rulesQuery = url.get('rules');
  const allRules = ['petsAllowed', 'smokingAllowed', 'guestsAllowed'];
  if (rulesQuery !== null) {
    rulesQuery.split(',').forEach(
      (key) => {
        if (allRules.indexOf(key) >= 0) params[key] = true;
      },
    );
  }

  const accessibilityQuery = url.get('accessibility');
  const allAccessibility = ['wideCorridor', 'assistantForDisabled'];
  if (accessibilityQuery !== null) {
    accessibilityQuery.split(',').forEach(
      (key) => {
        if (allAccessibility.indexOf(key) >= 0) params[key] = true;
      },
    );
  }

  const extraConvinienceQuery = url.get('rules');
  const allExtraConvinience = ['breakfast', 'desk', 'feedingChair', 'smallBad', 'tv', 'shampoo'];
  if (extraConvinienceQuery !== null) {
    extraConvinienceQuery.split(',').forEach(
      (key) => {
        if (allExtraConvinience.indexOf(key) >= 0) params[key] = true;
      },
    );
  }

  return params;
};

const Rooms: FC<IRoomsProps> = ({ queryString }) => (
  <MainLayout title="Rooms">
    <div className={b()}>
      <aside className={b('filters')}>
        <FormRoomsFilter queryString={queryString} />
      </aside>

      <section className={b('rooms')}>
        <RoomsList onShowMoreButtonClick={() => {}} />
      </section>
    </div>
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    const url = req.url?.split('?')[1];
    const queryString = url === undefined ? '' : url;

    const queryParams: ISearchFilters = getParamsFromQuery(queryString);

    store.dispatch(fetchRooms(queryParams));
    store.dispatch(END);
    await (store as ISagaStore).sagaTask?.toPromise();

    return {
      props: { queryString },
    };
  },
);

export default Rooms;
