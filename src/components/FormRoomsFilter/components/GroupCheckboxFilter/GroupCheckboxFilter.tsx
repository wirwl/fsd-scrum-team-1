import { FC } from 'react';

import CheckboxGroup from 'src/components/CheckboxGroup/CheckboxGroup';
import { initCheckboxGroupState } from 'src/components/FormRoomsFilter/helpers';

type IGroupCheckboxFilterProps = {
  title: string;
  keyValue: string;
  query: Record<string, string>;
  initValues: ICheckboxProps[];
  onChange: (values: Record<string, boolean>, valueString: string) => void;
};

const GroupCheckboxFilter: FC<IGroupCheckboxFilterProps> = ({
  title,
  keyValue,
  query,
  onChange,
  initValues,
}) => {
  const values = initCheckboxGroupState(keyValue, query, initValues);
  const conf = initValues.map((item) => {
    const { name } = item;
    return { ...item, checked: values[name] };
  });

  const handleCheckboxChange = (value: Record<string, boolean>): void => {
    const valueString = Object
      .keys(value)
      .filter((key) => value[key])
      .join('+');

    onChange(value, valueString);
  };

  return (
    <CheckboxGroup
      title={title}
      items={conf}
      onChange={handleCheckboxChange}
    />
  );
};

export default GroupCheckboxFilter;
