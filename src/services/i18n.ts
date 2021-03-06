import NextI18Next from 'next-i18next';
import NextConfig from 'next/config';
import path from 'path';

const { localeSubpaths } = NextConfig().publicRuntimeConfig;

const DEFAULT_LANG = 'ru';

const OTHER_LANG = ['en', 'de', 'es'];

const i18n = new NextI18Next({
  defaultLanguage: DEFAULT_LANG,
  otherLanguages: OTHER_LANG,
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
  browserLanguageDetection: true,
});

export default i18n;
