import { FC } from 'react';

import DataPicker from '@/components/DatePicker/DatePicker';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Input from '@/components/Input/Input';
import Calendar from '@/components/Calendar/Calendar';
import Checkbox from '@/components/Checkbox/Checkbox';
import CardEntryExit from '@/components/CardEntryExit/CardEntryExit';
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
    <DataPicker />
    <DataPicker withTwoInputs />
    <Input head="text field" placeholder="Email" />
    <Input head="masked text field" placeholder="ДД.ММ.ГГГГ" mask="99.99.9999" />
    <Input head="subscription text field" placeholder="Email" validate="email" withArrow />
    <Calendar />
    <Checkbox label="Можно курить" />
    <Checkbox label="Можно пригласить гостей (до 10 человек)" checked />
    <Checkbox label="Широкий коридор" description="Ширина коридоров в номере не менее 91 см." />
    <CardEntryExit />
    <Accordion checkboxList={checkboxes} isOpened />
    <Accordion checkboxList={checkboxes} />
  </MainLayout>
);

export default Components;
