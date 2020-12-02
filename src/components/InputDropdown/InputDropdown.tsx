import {
  FC, useState, useEffect, useCallback,
} from 'react';
import { block } from 'bem-cn';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import Button from '@/components/Button/Button';
import './InputDropdown.scss';

interface IPlurals {
  one: string,
  two: string,
  few: string,
}

interface IDropListItem {
  id: string,
  label: string,
  count: number,
  plurals: IPlurals,
  special?: true
}

interface IInputDropdownProps extends WithTranslation {
  name: string,
  placeholder: string,
  dropList?: IDropListItem[],
  isExpanded?: boolean,
  defaultLabel?: boolean | IPlurals,
  buttons?: boolean,
  reducer?: (items: IDropListItem[]) => string;
  onChange?: (newDropList: IDropListItem[]) => void;
}

const formatCount = (count: number, plurals: IPlurals): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = [plurals.one, plurals.two, plurals.few];

  return titles[
    ((count % 100 > 4) && (count % 100 < 20)) ? 2 : cases[
      (count % 10 < 5) ? count % 10 : 5
    ]
  ];
};

const reduceCountsAndPlurals = (items: IDropListItem[]): string => items.map((item) => (
  item.count && `${item.count} ${formatCount(item.count, item.plurals)}`
)).filter(Boolean).join(', ');

const reduceDefaultPlurals = (
  items: IDropListItem[],
  defaultLabel: IPlurals,
  placeholder: string,
): string => {
  let specialText = '';
  let otherText = '';
  let otherCount = 0;
  let specialCount = 0;

  items.forEach((item) => {
    const isAddedOther = item.count && (!item.special);
    const isAddedSpecial = item.special && item.count;

    if (isAddedOther) {
      otherCount += item.count;
      otherText = `${otherCount} ${formatCount(otherCount, defaultLabel)}`;
    }
    if (isAddedSpecial) {
      specialCount += item.count;
      specialText = `, ${specialCount} ${formatCount(item.count, item.plurals)}`;
    }
  });
  const text = otherCount ? (`${otherText}${specialText}`) : (`${placeholder}`);
  return text;
};

const bemClass = 'input-dropdown';
const bem = block(bemClass);

const InputDropdown: FC<IInputDropdownProps> = ({
  t,
  name,
  placeholder,
  dropList = [
    {
      id: 'bedroom', label: 'Спальни', count: 2, plurals: { one: 'спальня', two: 'спальни', few: 'спален' },
    },
    {
      id: 'bed', label: 'Кровати', count: 2, plurals: { one: 'кровать', two: 'кровати', few: 'кроватей' },
    },
    {
      id: 'bathroom', label: 'Ванные комнаты', count: 0, plurals: { one: 'ванная комната', two: 'ванные комнаты', few: 'ванных комнат' },
    },
  ],
  defaultLabel = false,
  isExpanded = false,
  buttons = false,
  reducer = reduceCountsAndPlurals,
  onChange,
}) => {
  const [dropListState, setDropListState] = useState<IDropListItem[]>(dropList);
  const [isExpandedState, setIsExpandedState] = useState<boolean>(isExpanded);
  const [valueState, setValueState] = useState<string>('');
  const [isHiddenBtn, setIsHiddenBtn] = useState<boolean>(false);

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
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isExpandedState]);

  useEffect(() => {
    const items = [...dropListState];
    const arr = items.map((_, index) => {
      const item = items[index];
      return item.count === 0;
    });
    const allCountersEmpty = arr.indexOf(false) === -1;

    allCountersEmpty ? setIsHiddenBtn(true) : setIsHiddenBtn(false);
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
    const isDec = type === 'dec';

    isDec ? (item.count -= 1) : (item.count += 1);
    setDropListState([...items]);
    onChange && onChange(dropListState);
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
          setIsExpandedState((prev) => !prev);
        }}
        value={valueState || ''}
      />
      <button
        className={`${bem('toggle-button')} material-icons`}
        type="button"
        onClick={() => {
          setIsExpandedState((prev) => !prev);
        }}
      >
        {isExpandedState ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
      </button>
      <div className={bem('menu')}>
        <div className={bem('list')}>
          {dropElements}
        </div>
        {
          buttons && (
            <div className={bem('footer-buttons')}>
              <div className={bem('clear-button')}>
                { !isHiddenBtn && (
                  <Button
                    theme="textual"
                    caption={t('clean')}
                    handleClick={clearInput}
                  />
                )}
              </div>
              <div className={bem('apply-button')}>
                <Button
                  theme="textual"
                  caption={t('apply')}
                  handleClick={() => setIsExpandedState((prev) => !prev)}
                />
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default i18n.withTranslation('common')(InputDropdown);

export type {
  IInputDropdownProps,
  IDropListItem,
  IPlurals,
};
