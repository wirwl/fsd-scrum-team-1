import { FC, useState } from 'react';
import { block } from 'bem-cn';
import './input-dropdown.scss';

interface IDropListItem {
  text: string,
  count: number,
}

interface IInputDropdownProps {
  name: string,
  placeholder?: string,
  dropList?: IDropListItem[],
  isExpanded?: boolean,
}

const InputDropdown: FC<IInputDropdownProps> = ({
  name,
  placeholder = 'Выберите удобства',
  dropList = [
    { text: 'Спальни', count: 0 },
    { text: 'Кровати', count: 0 },
    { text: 'Ванные комнаты', count: 0 },
  ],
  isExpanded = false,
}) => {
  const [dropListState, setDropListState] = useState<IDropListItem[]>(dropList);
  const [isExpandedState, setIsExpandedState] = useState<boolean>(isExpanded);

  const changeDropItemCount = (index: number, type: 'dec'|'inc'):void => {
    const items = [...dropListState];
    const item = items[index];
    item.count = type === 'dec'
      ? item.count - 1
      : item.count + 1;
    setDropListState([...items]);
  };

  const bem = block('input-dropdown');
  const modifiers = {
    expanded: isExpandedState,
  };

  const dropElements = dropListState.map((item, index) => (
    <li key={item.text} className={bem('list-item')}>
      <div className={bem('item-name')}>{item.text}</div>
      <div className={bem('counter-buttons')}>
        <button
          type="button"
          className={bem('counter-button', {
            disabled: item.count < 1,
            type: 'dec',
          })}
          onClick={() => changeDropItemCount(index, 'dec')}
        >
          -
        </button>
        <span className={bem('counter')}>{item.count}</span>
        <button
          type="button"
          className={bem('counter-button', { type: 'inc' })}
          onClick={() => changeDropItemCount(index, 'inc')}
        >
          +
        </button>
      </div>
    </li>
  ));

  return (
    <div className={bem(modifiers)}>
      <input
        name={name}
        placeholder={placeholder}
        className={bem('text-input')}
      />
      <button
        className={`${bem('toggle-button')} material-icons`}
        type="button"
        onClick={() => setIsExpandedState(!isExpandedState)}
      >
        keyboard_arrow_down
      </button>
      <ul className={bem('list')}>
        {dropElements}
      </ul>
    </div>
  );
};

export default InputDropdown;
