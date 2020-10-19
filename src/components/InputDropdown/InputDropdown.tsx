import {
  FC, useState, useEffect, useCallback,
} from 'react';
import { block } from 'bem-cn';
import './InputDropdown.scss';

interface IPlurals {
  one: string,
  two: string,
  few: string,
}

interface IDropListItem {
  label: string,
  count: number,
  plurals: IPlurals,
  special?: true
}

interface IInputDropdownProps {
  name: string,
  placeholder?: string,
  dropList?: IDropListItem[],
  isExpanded?: boolean,
  defaultLabel?: boolean | IPlurals,
  buttons?: boolean,
  reducer?: (items: IDropListItem[]) => string;
}

const formatCount = (count: number, plurals: IPlurals): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = [plurals.one, plurals.two, plurals.few];

  return titles[
    (count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]
  ];
};

const reduceCountsAndPlurals = (items: IDropListItem[]): string => items.map((item) => (
  item.count > 0
    ? `${item.count} ${formatCount(item.count, item.plurals)}`
    : ''
)).filter(Boolean).join(', ');

const reduceDefaultPlurals = (
  items: IDropListItem[],
  defaultLabel: IPlurals,
  placeholder: string,
): string => {
  let specialText = '';
  let sum = 0;
  let special = 0;
  items.forEach((item) => {
    item.count > 0 && (sum += item.count);
    if (item.special && item.count > 0) {
      special += item.count;
      specialText = `, ${special} ${formatCount(item.count, item.plurals)}`;
    }
  });
  const text = sum > 0 ? `${sum} ${formatCount(sum, defaultLabel)}${specialText}` : `${placeholder}`;
  return text;
};

const bemClass = 'input-dropdown';
const bem = block(bemClass);

const InputDropdown: FC<IInputDropdownProps> = ({
  name,
  placeholder = 'Выберите удобства',
  dropList = [
    { label: 'Спальни', count: 2, plurals: { one: 'спальня', two: 'спальни', few: 'спален' } },
    { label: 'Кровати', count: 2, plurals: { one: 'кровать', two: 'кровати', few: 'кроватей' } },
    { label: 'Ванные комнаты', count: 0, plurals: { one: 'ванная комната', two: 'ванные комнаты', few: 'ванных комнат' } },
  ],
  defaultLabel = false,
  isExpanded = false,
  buttons = false,
  reducer = reduceCountsAndPlurals,
}) => {
  const [dropListState, setDropListState] = useState<IDropListItem[]>(dropList);
  const [isExpandedState, setIsExpandedState] = useState<boolean>(isExpanded);
  const [valueState, setValueState] = useState<string>();
  const [isHiddenBtnState, setIsHiddenBtnState] = useState<boolean>();

  const handleDocumentClick = useCallback((event: MouseEvent): void => {
    const path = event.composedPath() as Element[];

    const targetIsInputDropdown = path.some((element): boolean => {
      if (!element.classList) return false;
      return element.classList.contains(bemClass);
    });

    if (!targetIsInputDropdown) {
      setIsExpandedState(false);
    }
  }, []);

  useEffect(() => {
    if (defaultLabel) {
      setValueState(reduceDefaultPlurals(
        dropListState,
        defaultLabel as IPlurals,
        placeholder,
      ));
    } else {
      setValueState(reducer(dropListState));
    }
  });

  useEffect(() => {
    if (isExpandedState) document.addEventListener('click', handleDocumentClick);
    else document.removeEventListener('click', handleDocumentClick);
  }, [isExpandedState]);

  useEffect(() => {
    const items = [...dropListState];
    const arr = items.map((_, index) => {
      const item = items[index];
      return item.count === 0;
    });
    arr.indexOf(false) === -1 ? setIsHiddenBtnState(true) : setIsHiddenBtnState(false);
  });

  const clearInput = ():void => {
    const items = [...dropListState];
    items.forEach((_, index) => {
      const item = items[index];
      item.count = 0;
    });
    setDropListState([...items]);
    setValueState(reducer([...items]));
  };

  const changeDropItemCount = (index: number, type: 'dec'|'inc'):void => {
    const items = [...dropListState];
    const item = items[index];
    item.count = type === 'dec'
      ? item.count - 1
      : item.count + 1;
    setDropListState([...items]);
  };

  const modifiers = {
    expanded: isExpandedState,
  };

  const dropElements = dropListState.map((item, index) => (
    <div key={item.label} className={bem('list-item')}>
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
    </div>
  ));

  return (
    <div className={bem(modifiers)}>
      <input
        name={name}
        placeholder={placeholder}
        className={bem('text-input')}
        readOnly
        onClick={() => {
          setIsExpandedState(!isExpandedState);
        }}
        value={valueState || ''}
      />
      <button
        className={`${bem('toggle-button')} material-icons`}
        type="button"
        onClick={() => {
          setIsExpandedState(!isExpandedState);
        }}
      >
        {isExpandedState ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
      </button>
      <div className={bem('menu')}>
        <div className={bem('list')}>
          {dropElements}
        </div>
        {
          buttons ? (
            <div className={bem('footer-buttons')}>
              <div
                className={bem('clear-button', { hidden: isHiddenBtnState })}
                onClick={() => clearInput()}
                onKeyDown={() => clearInput()}
                role="button"
                tabIndex={0}
              >
                Очистить
              </div>
              <div
                className={bem('apply-button')}
                onClick={() => setIsExpandedState(!isExpandedState)}
                onKeyDown={() => setIsExpandedState(!isExpandedState)}
                role="button"
                tabIndex={0}
              >
                Применить
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  );
};

export default InputDropdown;
