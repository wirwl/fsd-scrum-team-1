import { FC } from 'react';

import InputDropdown, { IDropListItem, IPlurals } from 'src/components/InputDropdown/InputDropdown';
import { initDropdownState } from 'src/components/FormRoomsFilter/helpers';

type IInputDropdownFilterProps = {
  query: Record<string, string>;
  name: string;
  placeholder: string;
  initValues: IDropListItem[];
  defaultLabel: IPlurals | false,
  onChange: (values: IDropListItem[]) => void;
};

const InputDropdownFilter: FC<IInputDropdownFilterProps> = ({
  query,
  initValues,
  name,
  placeholder,
  defaultLabel,
  onChange,
}) => {
  const values = initDropdownState(query, initValues);
  const conf = initValues.map((item) => {
    const count = values[item.id];
    if (count !== undefined) return { ...item, count };
    return item;
  });

  const handleDropdownChange = (newValues: IDropListItem[]): void => {
    onChange(newValues);
  };

  return (
    <InputDropdown
      name={name}
      placeholder={placeholder}
      defaultLabel={defaultLabel}
      dropList={conf}
      buttons
      onChange={handleDropdownChange}
    />
  );
};

export default InputDropdownFilter;
