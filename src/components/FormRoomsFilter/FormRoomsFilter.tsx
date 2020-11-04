import { FC } from 'react';
import { block } from 'bem-cn';

import DatePicker from 'src/components/DatePicker/DatePicker';

import './FormRoomsFilter.scss';

const b = block('form-rooms-filter');

const FormRoomsFilter: FC = () => {
  console.log('lll');
  return (
    <div className={b()}>
      <DatePicker onChange={() => {}} />
    </div>
  );
};

export default FormRoomsFilter;
