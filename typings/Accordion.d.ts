interface IAccordionCheckboxInfo {
  [key: string]: boolean;
}

interface IAccordionProps {
  title?: string;
  checkboxList?: ICheckboxProps[];
  isOpened?: boolean,
  onChange?: (chekboxes: IAccordionCheckboxInfo) => void;
  onInit?: (chekboxes: IAccordionCheckboxInfo) => void;
}
