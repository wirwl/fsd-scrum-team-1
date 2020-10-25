import { FC } from 'react';

import DataPicker from '@/components/DatePicker/DatePicker';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Input from '@/components/Input/Input';
import Calendar from '@/components/Calendar/Calendar';
import Checkbox from '@/components/Checkbox/Checkbox';
import RoomCard from '@/components/RoomCard/RoomCard';
import Pagination from '@/components/Pagination/Pagination';
import Accordion from '@/components/Accordion/Accordion';

const checkboxes = [
  {
    label: 'Завтрак',
    name: 'breakfast',
    checked: true,
  },
  {
    label: 'Письменный стол',
    name: 'desk',
    checked: true,
  },
  {
    label: 'Стул для кормления',
    name: 'feeding_chair',
    checked: false,
  },
  {
    label: 'Кроватка',
    name: 'cot',
    checked: true,
  },
];

const Components: FC = () => (
  <MainLayout title="Components">
    <h1>Components Page</h1>
    <RoomCard
      info={{
        images: [
          { src: 'http://placeimg.com/320/220/tech' },
          { src: 'http://placeimg.com/320/220/nature' },
          { src: 'http://placeimg.com/320/220/animals' },
          { src: 'http://placeimg.com/320/220/sepia' },
        ],
        roomNumber: 888,
        price: 9990,
        stars: 5,
        numberOfReviews: 145,
        hrefToReviews: '',
        hrefToRoomInfo: '',
        isLuxury: true,
      }}
    />
    <DataPicker />
    <DataPicker withTwoInputs />
    <Input head="text field" placeholder="Email" />
    <Input head="masked text field" placeholder="ДД.ММ.ГГГГ" mask="99.99.9999" />
    <Input head="subscription text field" placeholder="Email" validate="email" withArrow />
    <Calendar />
    <Checkbox label="Можно курить" />
    <Checkbox label="Можно пригласить гостей (до 10 человек)" checked />
    <Checkbox label="Широкий коридор" description="Ширина коридоров в номере не менее 91 см." />
    <Pagination totalItemCount={175} limitPerPage={12} />
    <Accordion checkboxList={checkboxes} isOpened />
    <Accordion checkboxList={checkboxes} />
  </MainLayout>
);

export default Components;
