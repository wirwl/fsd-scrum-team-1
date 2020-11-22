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

  const handleLangLabelClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const target = e.target as HTMLElement;

    const langLabel = target.getAttribute('data-lang');

    if (langLabel === null) return;

    setLangState(langLabel);
    onLangChange(langLabel);
  };

  useEffect(() => {
    setLangState(lang);
  }, [lang]);

  return (
    <div className={b()}>
      <button type="button" className={b('item-button')}>
        { langState }
      </button>

      <ul className={b('item-list')}>
        { LANGS.map((langLabel) => (
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
        ))}
      </ul>
    </div>
  );
};

export default SelectLang;
