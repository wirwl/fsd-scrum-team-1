interface IDatePickerProps {
  withTwoInputs?: boolean;
  placeholder?: string;
  title?: string;
  startTitle?: string;
  endTitle?: string;
  rangeStart?: Date;
  rangeEnd?: Date;
  onChange?: (range: RangeDays) => void;
}
