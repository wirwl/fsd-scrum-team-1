import { FC } from 'react';

import DataPicker from '@/components/DatePicker/DatePicker';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Input from '@/components/Input/Input';
import Calendar from '@/components/Calendar/Calendar';
import Checkbox from '@/components/Checkbox/Checkbox';
import Pagination from '@/components/Pagination/Pagination';

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
    <Pagination itemCount={101} limit={12} />
  </MainLayout>
);

export default Components;
