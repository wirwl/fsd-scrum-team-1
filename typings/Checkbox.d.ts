interface ICheckboxProps {
  label?: string;
  description?: string;
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean, name: string) => void;
}
