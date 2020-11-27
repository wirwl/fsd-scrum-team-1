import { FC, useEffect, useState } from 'react';
import { block } from 'bem-cn';

import './SelectLang.scss';

const b = block('select-lang');

const LANGS = ['ru', 'en', 'de', 'es'];

const SelectLang: FC = () => {
  // TODO: initialize from i18n
  const [langState, setLangState] = useState<string>(() => 'ru');
  const [openState, setOpenState] = useState<boolean>(false);

  const handleLangLabelClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    const target = e.target as HTMLElement;

    const langLabel = target.getAttribute('data-lang');

    if (langLabel === null) return;

    setLangState(langLabel);
    setOpenState(false);
  };

  const handleMouseEnterMainDiv = (e: React.MouseEvent): void => {
    e.preventDefault();
    setOpenState(true);
  };

  const handleMouseLeaveMainDiv = (e: React.MouseEvent): void => {
    e.preventDefault();
    setOpenState(false);
  };

  useEffect(() => {
    // TODO: remove console.log and insert update i18n
    console.log('new lang state', langState); // eslint-disable-line
  }, [langState]);

  const langsItems = LANGS.map((langLabel) => (
    <li
      key={langLabel}
      className={b('item', { hidden: langLabel === langState })}
    >
      <button
        type="button"
        onClick={handleLangLabelClick}
        data-lang={langLabel}
        className={b('item-button')}
      >
        { langLabel }
      </button>
    </li>
  ));

  return (
    <div
      className={b({ open: openState })}
      onMouseEnter={handleMouseEnterMainDiv}
      onMouseLeave={handleMouseLeaveMainDiv}
    >
      <button type="button" className={b('item-button')}>
        { langState }
      </button>

      <ul className={b('item-list')}>
        { langsItems }
      </ul>
    </div>
  );
};

export default SelectLang;
