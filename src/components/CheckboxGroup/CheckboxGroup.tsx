import { FC, useEffect, useState } from 'react';
import { block } from 'bem-cn';

import Checkbox from 'src/components/Checkbox/Checkbox';
import type { ICheckboxProps } from 'src/components/Checkbox/Checkbox';

import './CheckboxGroup.scss';

const b = block('checkbox-group');

type ICheckboxValue = { [key:string]: boolean };

type ICheckboxGroupProps = {
  title: string;
  items: ICheckboxProps[];
  onChange: (values: ICheckboxValue) => void;
};

const CheckboxGroup: FC<ICheckboxGroupProps> = ({ title, items, onChange }) => {
  const [state, setState] = useState<ICheckboxValue>(
    () => items.reduce(
      (acc, { name, checked }: ICheckboxProps) => ({
        ...acc,
        [name]: checked !== undefined && checked,
      }),
      {},
    ),
  );

  const handleCheckboxChange = (value: boolean, name: string): void => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    onChange(state);
  }, [state]);

  const checkboxItems = items.map((item: ICheckboxProps) => {
    const {
      label,
      name,
      description,
      checked,
    } = item;

    const componentItem = (
      <Checkbox
        label={label}
        name={name}
        description={description}
        checked={checked}
        onChange={handleCheckboxChange}
      />
    );

    return <li className={b('item')} key={label}>{ componentItem }</li>;
  });

  return (
    <div className={b()}>
      <h3 className={b('title')}>{ title }</h3>

      <ul className={b('list')}>
        { checkboxItems }
      </ul>
    </div>
  );
};

export default CheckboxGroup;
