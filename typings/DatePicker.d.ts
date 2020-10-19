interface IDatePickerProps {
  withTwoInputs?: boolean;
  placeholder?: string;
  title?: string;
  startTitle?: string;
  endTitle?: string;
  onChange?: (range: RangeDays) => void;
}
