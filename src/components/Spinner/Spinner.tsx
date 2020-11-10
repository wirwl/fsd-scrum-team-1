import React, { FC } from 'react';
import { block } from 'bem-cn';
import './Spinner.scss';

const b = block('loader');

const Spinner: FC = () => (
  <div className={b()}>
    <div className={b('container')}>
      <div className={b('arc', { one: true })} />
      <div className={b('arc', { two: true })} />
    </div>
  </div>
);

export default Spinner;
