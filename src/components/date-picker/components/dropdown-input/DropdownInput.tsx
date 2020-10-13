import { block } from 'bem-cn';

import './dropdown-input.scss';

interface IDropdownProps {
  title?: string;
  value?: string;
  name?: string;
  expanded?: boolean;
  onClick?: (name: string) => void;
}

const b = block('dropdown-input');

const DropdownInput: React.FC<IDropdownProps> = (props) => {
  const {
    title = '',
    value = '',
    name = '',
    expanded = false,
    onClick = null,
  } = props;

  const titleElement = title ? <h3 className={b('title')}>{title}</h3> : null;

  const handleClick = (): void | null => (onClick && onClick(name));

  return (
    <div className={b({ expanded })}>
      { titleElement }
      <div className={b('wrapper')}>
        <input
          className={b('input')}
          type="text"
          value={value}
          onClick={handleClick}
          name={name}
          readOnly
        />
        <button type="button" className={b('expand-button')}>expand_more</button>
      </div>
    </div>
  );
};

export default DropdownInput;
