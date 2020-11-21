import { FC } from 'react';

import Accordion from 'src/components/Accordion/Accordion';
import { initCheckboxGroupState } from 'src/components/FormRoomsFilter/helpers';
import type { ICheckboxProps } from 'src/components/Checkbox/Checkbox';

type IAccordionFilterProps = {
  title: string;
  keyValue: string;
  query: Record<string, string>;
  initValues: ICheckboxProps[];
  onChange: (values: Record<string, boolean>, valueString: string) => void;
};

const AccordionFilter: FC<IAccordionFilterProps> = ({
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

  const handleAccordionChange = (value: Record<string, boolean>): void => {
    const valueString = Object
      .keys(value)
      .filter((key) => value[key])
      .join('+');

    onChange(value, valueString);
  };

  return (
    <Accordion
      title={title}
      checkboxList={conf}
      isOpened={false}
      onChange={handleAccordionChange}
    />
  );
};

export default AccordionFilter;
