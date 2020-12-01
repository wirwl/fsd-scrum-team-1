import { FC, useEffect, useState } from 'react';
import { block } from 'bem-cn';

import i18n from 'src/services/i18n';

import './SelectLang.scss';

const b = block('select-lang');

const LANGS = ['ru', 'en', 'de', 'es'];

const SelectLang: FC = () => {
  const [langState, setLangState] = useState<string>(() => i18n.i18n.language);
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
    i18n.i18n.changeLanguage(langState);
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
