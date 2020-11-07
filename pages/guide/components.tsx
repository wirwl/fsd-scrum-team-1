/* eslint-disable no-console */
import { FC } from 'react';

import GuideLayout from '@/layouts/GuideLayout/GuideLayout';

import DataPicker from '@/components/DatePicker/DatePicker';
import Input from '@/components/Input/Input';
import Calendar from '@/components/Calendar/Calendar';
import Checkbox from '@/components/Checkbox/Checkbox';
import FormLanding from '@/components/FormLanding/FormLanding';
import Accordion from '@/components/Accordion/Accordion';
import RoomCard from '@/components/RoomCard/RoomCard';
import Slider from '@/components/Slider/Slider';
import Pagination from '@/components/Pagination/Pagination';

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
  <GuideLayout title="Components">
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
    <Checkbox label="Можно курить" name="smokingAllowed" />
    <Checkbox label="Можно пригласить гостей (до 10 человек)" name="smokingAllowed" checked />
    <Checkbox label="Широкий коридор" name="smokingAllowed" description="Ширина коридоров в номере не менее 91 см." />
    <FormLanding onSubmit={console.log} />
    <Accordion checkboxList={checkboxes} isOpened />
    <Accordion checkboxList={checkboxes} />
    <Slider currentValues={[5000, 10000]} onChange={() => {}} />
    <Pagination totalItemCount={175} limitPerPage={12} />
  </GuideLayout>
);

export default Components;
