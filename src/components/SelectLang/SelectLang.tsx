import { FC } from 'react';
import { block } from 'bem-cn';

import './SelectLang.scss';

const b = block('select-lang');

const SelectLang: FC = () => {
  return (
    <div className={b()}>
      Hello there
    </div>
  )
}

export default SelectLang;
