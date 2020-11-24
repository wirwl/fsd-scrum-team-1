import NextI18Next from 'next-i18next';
import NextConfig from 'next/config';
import path from 'path';

const { localeSubpaths } = NextConfig().publicRuntimeConfig;

const DEFAULT_LANG = 'ru';

const i18n = new NextI18Next({
  defaultLanguage: DEFAULT_LANG,
  otherLanguages: ['en'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
  browserLanguageDetection: true,
});

export default i18n;
