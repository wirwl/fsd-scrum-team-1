import { FC } from 'react';

import Accordeon from 'src/components/Accordion/Accordion';
import { initCheckboxGroupState } from 'src/components/FormRoomsFilter/helpers';

type IAccordeonFilterProps = {
  title: string;
  keyValue: string;
  query: Record<string, string>;
  initValues: ICheckboxProps[];
  onChange: (values: Record<string, boolean>, valueString: string) => void;
};

const AcccordeonFilter: FC<IAccordeonFilterProps> = ({
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

  const handleAccordeonChange = (value: Record<string, boolean>): void => {
    const valueString = Object
      .keys(value)
      .filter((key) => value[key])
      .join('+');

    onChange(value, valueString);
  };

  return (
    <Accordeon
      title={title}
      checkboxList={conf}
      isOpened={false}
      onChange={handleAccordeonChange}
    />
  );
};

export default AcccordeonFilter;
