import { FC, useState } from 'react';
import { block } from 'bem-cn';
import { NextRouter, useRouter } from 'next/router';

import { updateQuery } from 'src/components/FormRoomsFilter/helpers';

import './SelectLang.scss';

const b = block('select-lang');

const LANGS = ['ru', 'en', 'de', 'es'];
const LANG_DEFAULT = 'ru';

const getLangFromRouter = (router: NextRouter): string => {
  const { lang: langRouterRaw } = router.query;

  const langRouterString = langRouterRaw === undefined ? LANG_DEFAULT : langRouterRaw.toString();
  const langRouter = LANGS.indexOf(langRouterString) >= 0 ? langRouterString : LANG_DEFAULT;

  return langRouter;
};

const SelectLang: FC = () => {
  const router = useRouter();

  const [langState, setLangState] = useState<string>(
    () => getLangFromRouter(router),
  );
  const [openState, setOpenState] = useState<boolean>(false);

  const handleLangLabelClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    const target = e.target as HTMLElement;

    const langLabel = target.getAttribute('data-lang');

    if (langLabel === null) return;

    setLangState(langLabel);
    setOpenState(false);
    updateQuery('lang', langLabel, router);
  };

  const handleMouseEnterMainDiv = (e: React.MouseEvent): void => {
    e.preventDefault();
    setOpenState(true);
  };

  const handleMouseLeaveMainDiv = (e: React.MouseEvent): void => {
    e.preventDefault();
    setOpenState(false);
  };

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
