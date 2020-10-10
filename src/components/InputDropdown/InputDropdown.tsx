import { FC, useState, useEffect } from 'react';
import { block } from 'bem-cn';
import './input-dropdown.scss';

interface IPlurals {
  few: string,
  one: string,
  two: string,
}

interface IDropListItem {
  label: string,
  count: number,
  plurals: IPlurals,
}

interface IInputDropdownProps {
  name: string,
  placeholder?: string,
  dropList?: IDropListItem[],
  isExpanded?: boolean,
  reducer?: (items: IDropListItem[]) => string;
}

const formatCount = (count: number, plurals: IPlurals): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = [plurals.one, plurals.two, plurals.few];

  return titles[
    (count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]
  ];
};

const reduceCountsAndPlurals = (items: IDropListItem[]): string => {
  return items.map((item) => (item.count > 0
    ? `${item.count} ${formatCount(item.count, item.plurals)}`
    : '')).filter(Boolean).join(', ');
};

const InputDropdown: FC<IInputDropdownProps> = ({
  name,
  placeholder = 'Выберите удобства',
  dropList = [
    { label: 'Спальни', count: 2, plurals: { few: 'спален', one: 'спальня', two: 'спальни' } },
    { label: 'Кровати', count: 2, plurals: { few: 'кроватей', one: 'кровать', two: 'кровати' } },
    { label: 'Ванные комнаты', count: 0, plurals: { few: 'ванных комнат', one: 'ванная комната', two: 'ванные комнаты' } },
  ],
  isExpanded = false,
  reducer = reduceCountsAndPlurals,
}) => {
  const [dropListState, setDropListState] = useState<IDropListItem[]>(dropList);
  const [isExpandedState, setIsExpandedState] = useState<boolean>(isExpanded);
  const [valueState, setValueState] = useState<string>();

  useEffect(() => {
    setValueState(reducer(dropListState));
  });

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
    <li key={item.label} className={bem('list-item')}>
      <div className={bem('item-name')}>{item.label}</div>
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
        readOnly
        value={valueState || ''}
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
