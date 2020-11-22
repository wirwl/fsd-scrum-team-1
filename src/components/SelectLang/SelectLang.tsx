import { FC, useState, useEffect } from 'react';
import { block } from 'bem-cn';

import './SelectLang.scss';

const b = block('select-lang');

const LANGS = ['ru', 'en', 'de', 'es'];

type SelectLangProps = {
  lang: string;
  onLangChange: (lang: string) => void;
};

const SelectLang: FC<SelectLangProps> = ({ lang, onLangChange }) => {
  const [langState, setLangState] = useState<string>(lang);
  const [openState, setOpenState] = useState<boolean>(false);

  const handleLangLabelClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const target = e.target as HTMLElement;

    const langLabel = target.getAttribute('data-lang');

    if (langLabel === null) return;

    setLangState(langLabel);
    setOpenState(false);
    onLangChange(langLabel);
  };

  const handleMouseEnterMainDiv = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setOpenState(true);
  };

  const handleMouseLeaveMainDiv = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setOpenState(false);
  };

  useEffect(() => {
    setLangState(lang);
  }, [lang]);

  const langsItems = LANGS.map((langLabel) => (
    langLabel !== langState
      ? (
        <li key={langLabel} className={b('item')}>
          <button
            type="button"
            onClick={handleLangLabelClick}
            data-lang={langLabel}
            className={b('item-button')}
          >
            { langLabel }
          </button>
        </li>
      ) : ''
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
