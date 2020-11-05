import { FC } from 'react';
import { block } from 'bem-cn';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import type { ISearchFilters } from 'src/services/Api';
import wrapper, { ISagaStore } from 'src/redux/store';
import { fetchRooms } from 'src/redux/room/roomActions';

import MainLayout from 'src/layouts/MainLayout/MainLayout';
import FormRoomsFilter from 'src/components/FormRoomsFilter/FormRoomsFilter';
import RoomsList from 'src/components/RoomsList/RoomsList';

import './RoomsIndex.scss';

type IRoomsProps = {
  queryString: string;
};

const b = block('rooms-page');

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

// id: number;
// roomsOnPage?: number;
// adults?: number;
// babies?: number;
// priceMin?: number;
// priceMax?: number;
// isLux?: boolean;
// petsAllowed?: boolean;
// smokingAllowed?: boolean;
// guestAllowed?: boolean;
// wideCorridor?: boolean;
// assistantForDisabled?: boolean;
// breakfast?: boolean;
// desk?: boolean;
// feedingChair?: boolean;
// smallBad?: boolean;
// tv?: boolean;
// shampoo?: boolean;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    const url = req.url?.split('?')[1];
    const queryString = url === undefined ? '' : url;

    const queryParams: ISearchFilters = {
      id: 0,
    };

    store.dispatch(fetchRooms(queryParams));
    store.dispatch(END);
    await (store as ISagaStore).sagaTask?.toPromise();

    return {
      props: { queryString },
    };
  },
);

export default Rooms;
